using CAlenderAPI.Model;
using CAlenderAPI.service.IService;

namespace CAlenderAPI.service
{
    public class CalendarService : ICalendarService
    {
        private readonly IRepository<Meeting> _meetingRepository;
        private readonly INotificationService _notificationService;
        private readonly IUserService _userService;
        private readonly ILogger<CalendarService> _logger;

        public CalendarService(
            IRepository<Meeting> meetingRepository,
            INotificationService notificationService,
            IUserService userService,
            ILogger<CalendarService> logger)
        {
            _meetingRepository = meetingRepository;
            _notificationService = notificationService;
            _userService = userService;
            _logger = logger;
        }

        public async Task<Meeting> CreateMeetingAsync(Meeting meeting)
        {
            // Validate meeting times
            if (meeting.StartTime >= meeting.EndTime)
                throw new InvalidOperationException("Meeting end time must be after start time");

            // Check participant availability
            var availability = await CheckParticipantsAvailabilityAsync(
                meeting.ParticipantIds,
                meeting.StartTime,
                meeting.EndTime);

            if (!availability.AllAvailable)
                throw new InvalidOperationException("Some participants are not available");

            // Handle recurring meetings
            if (meeting.IsRecurring)
            {
                var recurringMeetings = GenerateRecurringMeetings(meeting);
                await _meetingRepository.AddRangeAsync(recurringMeetings);
            }
            else
            {
                await _meetingRepository.AddAsync(meeting);
            }

            // Send notifications
            await NotifyParticipantsAsync(meeting, NotificationType.MeetingCreated);

            // Schedule reminders
            await ScheduleRemindersAsync(meeting);

            return meeting;
        }

        public async Task<UserAvailability> GetUserAvailabilityAsync(string userId, DateTime start, DateTime end)
        {
            var meetings = await _meetingRepository.GetUserMeetingsInRangeAsync(userId, start, end);

            var busySlots = meetings.Select(m => new TimeSlot
            {
                Start = m.StartTime,
                End = m.EndTime
            }).ToList();

            var availableSlots = CalculateAvailableSlots(busySlots, start, end);

            return new UserAvailability
            {
                UserId = userId,
                AvailableSlots = availableSlots,
                BusySlots = busySlots
            };
        }

        private List<TimeSlot> CalculateAvailableSlots(List<TimeSlot> busySlots, DateTime start, DateTime end)
        {
            var availableSlots = new List<TimeSlot>();
            var currentTime = start;

            // Sort busy slots by start time
            busySlots = busySlots.OrderBy(s => s.Start).ToList();

            foreach (var busySlot in busySlots)
            {
                if (currentTime < busySlot.Start)
                {
                    availableSlots.Add(new TimeSlot
                    {
                        Start = currentTime,
                        End = busySlot.Start
                    });
                }
                currentTime = busySlot.End;
            }

            if (currentTime < end)
            {
                availableSlots.Add(new TimeSlot
                {
                    Start = currentTime,
                    End = end
                });
            }

            return availableSlots;
        }

        private async Task NotifyParticipantsAsync(Meeting meeting, NotificationType type)
        {
            foreach (var participantId in meeting.ParticipantIds)
            {
                var notification = new Notification
                {
                    UserId = participantId,
                    Type = type,
                    Content = $"Meeting: {meeting.Title}",
                    MeetingId = meeting.Id,
                    TimeStamp = DateTime.UtcNow
                };

                await _notificationService.SendNotificationAsync(notification);
            }
        }

        private List<Meeting> GenerateRecurringMeetings(Meeting meeting)
        {
            var meetings = new List<Meeting>();
            var currentDate = meeting.StartTime;
            var pattern = meeting.RecurrencePattern;

            while (currentDate <= pattern.EndDate)
            {
                var newMeeting = CloneMeeting(meeting, currentDate);
                meetings.Add(newMeeting);

                currentDate = pattern.Type switch
                {
                    RecurrenceType.Daily => currentDate.AddDays(pattern.Interval),
                    RecurrenceType.Weekly => currentDate.AddDays(7 * pattern.Interval),
                    RecurrenceType.Monthly => currentDate.AddMonths(pattern.Interval),
                    RecurrenceType.Yearly => currentDate.AddYears(pattern.Interval),
                    _ => throw new NotSupportedException($"Recurrence type {pattern.Type} not supported")
                };
            }

            return meetings;
        }

        private Meeting CloneMeeting(Meeting original, DateTime newStartTime)
        {
            var duration = original.EndTime - original.StartTime;
            return new Meeting
            {
                Id = Guid.NewGuid(),
                Title = original.Title,
                Description = original.Description,
                StartTime = newStartTime,
                EndTime = newStartTime.Add(duration),
                TimeZone = original.TimeZone,
                Location = original.Location,
                ParticipantIds = original.ParticipantIds,
                OrganizerId = original.OrganizerId,
                IsRecurring = false // Individual instances aren't marked as recurring
            };
        }
    }
}
