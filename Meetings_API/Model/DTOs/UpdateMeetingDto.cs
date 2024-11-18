namespace Meetings_API.Model.DTOs
{
    public class UpdateMeetingDto
    {
        public int MeetingId { get; set; }
        public string Status { get; set; }  // Update only the status
    }

}
