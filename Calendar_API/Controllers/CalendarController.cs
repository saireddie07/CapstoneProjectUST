using Calendar_API.Model;
using Calendar_API.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Calendar_API.Controllers
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
            var scheduledMeeting = await _meetingService.ScheduleMeetingAsync(meeting);
            return CreatedAtAction(nameof(GetMeeting), new { id = scheduledMeeting.Id }, scheduledMeeting);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMeeting(int id)
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
        public async Task<IActionResult> UpdateMeeting(int id, [FromBody] Meeting meeting)
        {
            if (id != meeting.Id)
            {
                return BadRequest("Meeting ID mismatch.");
            }
            var updatedMeeting = await _meetingService.UpdateMeetingAsync(meeting);
            return Ok(updatedMeeting);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMeeting(int id)
        {
            await _meetingService.DeleteMeetingAsync(id);
            return NoContent();
        }

        [HttpPost("{meetingId}/assign-participant")]
        public async Task<IActionResult> AssignMeetingToParticipant(int meetingId, [FromBody] Participant participant)
        {
            await _meetingService.AssignMeetingToParticipantAsync(meetingId, participant);
            return Ok();
        }

        [HttpGet("user/{userId}/meetings")]
        public async Task<IActionResult> GetMeetingsByUserId(int userId)
        {
            var meetings = await _meetingService.GetMeetingsByUserIdAsync(userId);
            return Ok(meetings);
        }
    }



}
