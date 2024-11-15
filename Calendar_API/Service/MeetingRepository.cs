using Calendar_API.Data;
using Calendar_API.Model;
using Microsoft.EntityFrameworkCore;

namespace Calendar_API.Service
{
    public class MeetingRepository : IMeetingRepository
    {
        private readonly ApplicationDbContext _context;

        public MeetingRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Meeting> GetMeetingByIdAsync(int id) =>
            await _context.Meetings.Include(m => m.Participants).FirstOrDefaultAsync(m => m.Id == id);

        public async Task<IEnumerable<Meeting>> GetAllMeetingsAsync() =>
            await _context.Meetings.Include(m => m.Participants).ToListAsync();

        public async Task<Meeting> AddMeetingAsync(Meeting meeting)
        {
            _context.Meetings.Add(meeting);
            await _context.SaveChangesAsync();
            return meeting;
        }

        public async Task<Meeting> UpdateMeetingAsync(Meeting meeting)
        {
            _context.Meetings.Update(meeting);
            await _context.SaveChangesAsync();
            return meeting;
        }

        public async Task DeleteMeetingAsync(int id)
        {
            var meeting = await _context.Meetings.FindAsync(id);
            if (meeting != null)
            {
                _context.Meetings.Remove(meeting);
                await _context.SaveChangesAsync();
            }
        }

        public async Task AssignMeetingToParticipant(int meetingId, Participant participant)
        {
            participant.MeetingId = meetingId;
            _context.Participants.Add(participant);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Meeting>> GetMeetingsByUserIdAsync(int userId)
        {
            return await _context.Meetings
                .Include(m => m.Participants)
                .Where(m => m.Participants.Any(p => p.Id == userId))
                .ToListAsync();
        }
    }



}
