using CalendarAPI.Models;
using CalendarAPI.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CalendarAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalendarController : ControllerBase
    {
        private readonly MeetingService _meetingService;

        public CalendarController(MeetingService meetingService)
        {
            _meetingService = meetingService;
        }

        [HttpPost("schedule")]
        public async Task<IActionResult> ScheduleMeeting([FromBody] Meeting meeting)
        {
            if (!await _meetingService.CheckAvailabilityAsync(meeting))
            {
                return BadRequest("One or more participants are not available during the proposed time.");
            }
            var scheduledMeeting = await _meetingService.ScheduleMeetingAsync(meeting);
            return CreatedAtAction(nameof(GetMeeting), new { id = scheduledMeeting.Id }, scheduledMeeting);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMeeting(int id) // Changed Guid to int
        {
            var meeting = await _meetingService.GetMeetingAsync(id);
            return meeting == null ? NotFound() : Ok(meeting);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMeetings()
        {
            var meetings = await _meetingService.GetAllMeetingsAsync();
            return Ok(meetings);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMeeting(int id, [FromBody] Meeting meeting) // Changed Guid to int
        {
            if (id != meeting.Id)
            {
                return BadRequest("Meeting ID mismatch.");
            }
            var updatedMeeting = await _meetingService.UpdateMeetingAsync(meeting);
            return Ok(updatedMeeting);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMeeting(int id) // Changed Guid to int
        {
            await _meetingService.DeleteMeetingAsync(id);
            return NoContent();
        }

        [HttpPost("{id}/add-participant")]
        public async Task<IActionResult> AddParticipant(int id, [FromBody] Participant participant) // Changed Guid to int
        {
            var meeting = await _meetingService.GetMeetingAsync(id);
            if (meeting == null) return NotFound();

            meeting.Participants.Add(participant);
            await _meetingService.UpdateMeetingAsync(meeting);

            return Ok(meeting);
        }

        [HttpPost("{id}/remove-participant/{participantId}")]
        public async Task<IActionResult> RemoveParticipant(int id, int participantId) // Changed Guid to int
        {
            var meeting = await _meetingService.GetMeetingAsync(id);
            if (meeting == null) return NotFound();

            meeting.Participants.RemoveAll(p => p.Id == participantId);
            await _meetingService.UpdateMeetingAsync(meeting);

            return Ok(meeting);
        }
    }

}
