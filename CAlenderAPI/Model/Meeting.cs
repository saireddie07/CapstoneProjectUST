namespace CAlenderAPI.Model
{
    public class Meeting
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string TimeZone { get; set; }
        public string Location { get; set; }
        public bool IsRecurring { get; set; }
        public RecurrencePattern RecurrencePattern { get; set; }
        public List<string> ParticipantIds { get; set; } = new();
        public string OrganizerId { get; set; }
        public List<MeetingNote> Notes { get; set; } = new();
        public MeetingStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public enum MeetingStatus
    {
        Scheduled,
        Cancelled,
        Completed
    }

    public class RecurrencePattern
    {
        public RecurrenceType Type { get; set; }
        public int Interval { get; set; }
        public DayOfWeek[] DaysOfWeek { get; set; }
        public DateTime EndDate { get; set; }
    }

    public enum RecurrenceType
    {
        Daily,
        Weekly,
        Monthly,
        Yearly
    }

    public class MeetingNote
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    // Models/UserAvailability.cs
    public class UserAvailability
    {
        public string UserId { get; set; }
        public List<TimeSlot> AvailableSlots { get; set; } = new();
        public List<TimeSlot> BusySlots { get; set; } = new();
    }

    public class TimeSlot
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }

}
