namespace Meetings_API.Model.DTOs
{
    public class CreateMeetingDto
    {
        
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Location { get; set; }
        public string TimeZone { get; set; }  // New Field
        public string MeetingLink { get; set; }  // New Field
        

    }
}
