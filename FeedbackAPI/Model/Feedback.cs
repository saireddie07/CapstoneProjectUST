namespace FeedbackAPI.Model
{
    public class Feedback
    {
        public int FeedbackId { get; set; }
        public int MeetingId { get; set; }
        public int UserId { get; set; }
        public int Rating { get; set; }
        public string? Comments { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
