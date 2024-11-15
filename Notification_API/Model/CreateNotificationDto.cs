namespace Notification_API.Model
{
    public class CreateNotificationDto
    {
        public string Title { get; set; }
        public string Message { get; set; }
        public string Type { get; set; }
        public int UserId { get; set; }
        public DateTime? ScheduledFor { get; set; }
    }
}
