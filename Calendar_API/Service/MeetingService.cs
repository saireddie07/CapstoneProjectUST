using Calendar_API.Model;

namespace Calendar_API.Service
{
    public class MeetingService
    {
        private readonly IMeetingRepository _meetingRepository;

        public MeetingService(IMeetingRepository meetingRepository)
        {
            _meetingRepository = meetingRepository;
        }

        public Task<Meeting> ScheduleMeetingAsync(Meeting meeting) => _meetingRepository.AddMeetingAsync(meeting);
        public Task<Meeting> GetMeetingAsync(int id) => _meetingRepository.GetMeetingByIdAsync(id);
        public Task<IEnumerable<Meeting>> GetAllMeetingsAsync() => _meetingRepository.GetAllMeetingsAsync();
        public Task<Meeting> UpdateMeetingAsync(Meeting meeting) => _meetingRepository.UpdateMeetingAsync(meeting);
        public Task DeleteMeetingAsync(int id) => _meetingRepository.DeleteMeetingAsync(id);
        public Task AssignMeetingToParticipantAsync(int meetingId, Participant participant) =>
            _meetingRepository.AssignMeetingToParticipant(meetingId, participant);
        public Task<IEnumerable<Meeting>> GetMeetingsByUserIdAsync(int userId) => _meetingRepository.GetMeetingsByUserIdAsync(userId);
    }





}
