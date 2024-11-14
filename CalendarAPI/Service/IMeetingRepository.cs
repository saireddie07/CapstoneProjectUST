using CalendarAPI.Models;

namespace CalendarAPI.Service
{
    public interface IMeetingRepository
    {
        Task<Meeting> GetMeetingByIdAsync(int id);
        Task<IEnumerable<Meeting>> GetAllMeetingsAsync();
        Task<Meeting> AddMeetingAsync(Meeting meeting);
        Task<Meeting> UpdateMeetingAsync(Meeting meeting);
        Task DeleteMeetingAsync(int id);
    }

}
