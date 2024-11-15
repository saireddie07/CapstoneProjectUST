using CalendarAPI.Models;

namespace CalendarAPI.Service
{
    public class MeetingRepository : IMeetingRepository
    {
        private readonly List<Meeting> _meetings = new List<Meeting>();

        public async Task<Meeting> GetMeetingByIdAsync(int id) => _meetings.FirstOrDefault(m => m.Id == id);

        public async Task<IEnumerable<Meeting>> GetAllMeetingsAsync() => _meetings;

        public async Task<Meeting> AddMeetingAsync(Meeting meeting)
        {
            _meetings.Add(meeting);
            return meeting;
        }

        public async Task<Meeting> UpdateMeetingAsync(Meeting meeting)
        {
            var existingMeeting = await GetMeetingByIdAsync(meeting.Id);
            if (existingMeeting != null)
            {
                _meetings.Remove(existingMeeting);
                _meetings.Add(meeting);
            }
            return meeting;
        }

        public async Task DeleteMeetingAsync(int id) => _meetings.RemoveAll(m => m.Id == id);
    }

}
