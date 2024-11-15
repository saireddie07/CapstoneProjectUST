namespace Notification_API.Model
{
   
        public class Notification
        {
            public int Id { get; set; }
            public string Title { get; set; }
            public string Message { get; set; }
            public string Type { get; set; }  // "Message", "Task", "Meeting"
            public int UserId { get; set; }
            public bool IsRead { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime? ReadAt { get; set; }
            public DateTime? ScheduledFor { get; set; }  // For reminders
        }
    }
