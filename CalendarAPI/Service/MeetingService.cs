using CalendarAPI.Models;

namespace CalendarAPI.Service
{
    public class MeetingService
    {
        private readonly IMeetingRepository _meetingRepository;

        public MeetingService(IMeetingRepository meetingRepository)
        {
            _meetingRepository = meetingRepository;
        }

        public async Task<Meeting> ScheduleMeetingAsync(Meeting meeting)
        {
            return await _meetingRepository.AddMeetingAsync(meeting);
        }

        public async Task<Meeting> GetMeetingAsync(int id) // Changed Guid to int
        {
            return await _meetingRepository.GetMeetingByIdAsync(id);
        }

        public async Task<IEnumerable<Meeting>> GetAllMeetingsAsync()
        {
            return await _meetingRepository.GetAllMeetingsAsync();
        }

        public async Task<Meeting> UpdateMeetingAsync(Meeting meeting)
        {
            return await _meetingRepository.UpdateMeetingAsync(meeting);
        }

        public async Task DeleteMeetingAsync(int id) // Changed Guid to int
        {
            await _meetingRepository.DeleteMeetingAsync(id);
        }

        public async Task<bool> CheckAvailabilityAsync(Meeting meeting)
        {
            foreach (var participant in meeting.Participants)
            {
                bool isAvailable = participant.AvailableSlots.Any(slot =>
                    slot.Start <= meeting.StartTime && slot.End >= meeting.EndTime);

                if (!isAvailable)
                {
                    return false; // Return false if any participant is not available
                }
            }
            return true;
        }
    }


}
