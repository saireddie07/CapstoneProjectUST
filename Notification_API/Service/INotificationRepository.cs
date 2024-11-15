using Notification_API.Model;

namespace Notification_API.Service
{
    public interface INotificationRepository
    {
        Task<List<Notification>> GetUserNotificationsAsync(int userId);
        Task<Notification> GetByIdAsync(int id);
        Task<Notification> CreateAsync(Notification notification);
        Task<bool> MarkAsReadAsync(int id);
        Task<bool> DeleteAsync(int id);
    }
}
