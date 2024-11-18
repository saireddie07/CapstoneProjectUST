using Meetings_API.Model.DTOs;
using Meetings_API.Model;
using Meetings_API.Data;
using Microsoft.EntityFrameworkCore;

namespace Meetings_API.Services
{
    public class MeetingService : IMeetingService
    {
        private readonly ApplicationDbContext _context;

        public MeetingService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Meeting> CreateMeetingAsync(Meeting meeting)
        {
            _context.Meetings.Add(meeting);  // Add the meeting (with an auto-generated Id)
            await _context.SaveChangesAsync();  // This saves the meeting and auto-generates the Id
            return meeting;
        }
        public async Task<bool> UpdateMeetingStatusAsync(int meetingId, string status)
        {
            var meeting = await _context.Meetings.FindAsync(meetingId);

            if (meeting == null || !meeting.IsActive)
                return false;

            meeting.Status = status;
            meeting.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Meeting>> GetAllMeetingsAsync()
        {
            return await _context.Meetings
                .Include(m => m.Participants) // Include participants if needed
                .Where(m => m.IsActive)        // Optional: Filter only active meetings
                .OrderBy(m => m.StartTime)     // Optional: Sort by start time
                .ToListAsync();
        }

        public async Task<Meeting> GetMeetingByIdAsync(int id)
        {
            return await _context.Meetings
                .FirstOrDefaultAsync(m => m.Id == id && m.IsActive);
        }
        public async Task<Meeting> UpdateMeetingAsync(int id, CreateMeetingDto meetingDto)
        {
            var meeting = await _context.Meetings
                .Include(m => m.Participants)
                .FirstOrDefaultAsync(m => m.Id == id && m.IsActive);

            if (meeting == null)
                throw new KeyNotFoundException($"Meeting with ID {id} not found");

            // Update meeting properties
            meeting.Title = meetingDto.Title;
            meeting.Description = meetingDto.Description;
            meeting.StartTime = meetingDto.StartTime;
            meeting.EndTime = meetingDto.EndTime;
            meeting.Location = meetingDto.Location;
            meeting.UpdatedAt = DateTime.UtcNow;

            // Save changes without modifying participants
            await _context.SaveChangesAsync();
            return await GetMeetingByIdAsync(meeting.Id);
        }

        public async Task<bool> DeleteMeetingAsync(int id)
        {
            var meeting = await _context.Meetings.FindAsync(id);
            if (meeting == null || !meeting.IsActive)
                return false;

            meeting.IsActive = false;
            meeting.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> AssignParticipantToMeetingAsync(int meetingId, string userId)
        {
            var meeting = await _context.Meetings
                .Include(m => m.Participants)
                .FirstOrDefaultAsync(m => m.Id == meetingId && m.IsActive);

            if (meeting == null)
                return false;

            // Check if participant already exists
            if (meeting.Participants.Any(p => p.UserId == userId))
                return true;

            var participant = new MeetingParticipant
            {
                MeetingId = meetingId,
                UserId = userId,
                HasAccepted = false
            };

            _context.MeetingParticipants.Add(participant);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Meeting>> GetMeetingsByUserIdAsync(string userId)
        {
            return await _context.Meetings
                .Include(m => m.Participants)
                .Where(m => m.IsActive && (
                    m.OrganizerId == userId ||
                    m.Participants.Any(p => p.UserId == userId)
                ))
                .OrderBy(m => m.StartTime)
                .ToListAsync();
        }

        public Task<Meeting> CreateMeetingAsync(CreateMeetingDto meetingDto, string organizerId)
        {
            throw new NotImplementedException();
        }
    }
}
