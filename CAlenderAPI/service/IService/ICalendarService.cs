using CAlenderAPI.Model;

namespace CAlenderAPI.service.IService
{
    public enum CalendarPermission
    {
        ViewOnly,
        Edit,
        FullAccess
    }
    public interface ICalendarService
    {
        Task<Meeting> CreateMeetingAsync(Meeting meeting);
        Task<Meeting> UpdateMeetingAsync(Guid id, Meeting meeting);
        Task<bool> DeleteMeetingAsync(Guid id);
        Task<Meeting> GetMeetingAsync(Guid id);
        Task<List<Meeting>> GetUserMeetingsAsync(string userId, DateTime start, DateTime end);
        Task<UserAvailability> GetUserAvailabilityAsync(string userId, DateTime start, DateTime end);
        Task<bool> ShareCalendarAsync(string userId, string targetUserId, CalendarPermission permission);
        Task SendMeetingRemindersAsync();
    }
}
