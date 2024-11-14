namespace CalendarAPI.Models
{
    public class Meeting
    {
        public int Id { get; set; } 
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string TimeZone { get; set; } // IANA time zone ID, e.g., "America/New_York"
        public bool IsRecurring { get; set; }
        public string RecurrencePattern { get; set; } // e.g., "Daily", "Weekly"
        public List<Participant> Participants { get; set; } = new List<Participant>();
    }

}
