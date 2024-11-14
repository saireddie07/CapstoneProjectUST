using Calendar_API.Model;

namespace Calendar_API.Service
{
    public interface IMeetingRepository
    {
        Task<Meeting> GetMeetingByIdAsync(int id);
        Task<IEnumerable<Meeting>> GetAllMeetingsAsync();
        Task<Meeting> AddMeetingAsync(Meeting meeting);
        Task<Meeting> UpdateMeetingAsync(Meeting meeting);
        Task DeleteMeetingAsync(int id);
        Task AssignMeetingToParticipant(int meetingId, Participant participant);
        Task<IEnumerable<Meeting>> GetMeetingsByUserIdAsync(int userId);
    }



}
