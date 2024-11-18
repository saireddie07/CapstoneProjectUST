using Meetings_API.Model;
using Meetings_API.Model.DTOs;

namespace Meetings_API.Services
{
    public interface IMeetingService
    {
        Task<Meeting> CreateMeetingAsync(Meeting meeting);
        Task<Meeting> GetMeetingByIdAsync(int id);
        Task<Meeting> UpdateMeetingAsync(int id, CreateMeetingDto meetingDto);
        Task<bool> DeleteMeetingAsync(int id);
        Task<bool> AssignParticipantToMeetingAsync(int meetingId, string userId);
        Task<IEnumerable<Meeting>> GetMeetingsByUserIdAsync(string userId);
        Task<List<Meeting>> GetAllMeetingsAsync();
        Task<bool> UpdateMeetingStatusAsync(int meetingId, string status);
    }
}
