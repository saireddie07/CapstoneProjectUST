using Meetings_API.Model;
using Meetings_API.Model.DTOs;
using Meetings_API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Meetings_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MeetingController : ControllerBase
    {
        private readonly IMeetingService _meetingService;
        private readonly ILogger<MeetingController> _logger;

        public MeetingController(IMeetingService meetingService, ILogger<MeetingController> logger)
        {
            _meetingService = meetingService;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> CreateMeeting([FromBody] CreateMeetingDto meetingDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                // Validate meeting times
                if (meetingDto.StartTime <= DateTime.UtcNow)
                    return BadRequest("Meeting start time must be in the future");

                if (meetingDto.EndTime <= meetingDto.StartTime)
                    return BadRequest("Meeting end time must be after start time");

                // In a real application, get the organizerId from the authenticated user
                string organizerId = "sample-user-id";  // Replace this with actual authenticated user's ID

                var meeting = new Meeting
                {
                    Title = meetingDto.Title,
                    Description = meetingDto.Description,
                    StartTime = meetingDto.StartTime,
                    EndTime = meetingDto.EndTime,
                    Location = meetingDto.Location,
                    TimeZone = meetingDto.TimeZone,
                    MeetingLink = meetingDto.MeetingLink,
                    OrganizerId = organizerId,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                };
                // Add the meeting to the database and let the database auto-generate the Id
                var createdMeeting = await _meetingService.CreateMeetingAsync(meeting);

                // Return the created meeting along with its generated ID
                return CreatedAtAction(nameof(GetMeetingById), new { id = createdMeeting.Id }, createdMeeting);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating meeting");
                return StatusCode(500, "An error occurred while creating the meeting");
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetAllMeetings()
        {
            try
            {
                var meetings = await _meetingService.GetAllMeetingsAsync();
                return Ok(meetings);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all meetings");
                return StatusCode(500, "An error occurred while retrieving meetings");
            }
        }



        [HttpGet("{id}")]
        public async Task<IActionResult> GetMeetingById(int id)
        {
            try
            {
                var meeting = await _meetingService.GetMeetingByIdAsync(id);
                if (meeting == null)
                    return NotFound($"Meeting with ID {id} not found");

                return Ok(meeting);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving meeting");
                return StatusCode(500, "An error occurred while retrieving the meeting");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMeeting(int id, [FromBody] CreateMeetingDto meetingDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                // Validate meeting times
                if (meetingDto.EndTime <= meetingDto.StartTime)
                    return BadRequest("Meeting end time must be after start time");

                var meeting = await _meetingService.UpdateMeetingAsync(id, meetingDto);
                return Ok(meeting);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating meeting");
                return StatusCode(500, "An error occurred while updating the meeting");
            }
        }
       

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMeeting(int id)
        {
            try
            {
                var result = await _meetingService.DeleteMeetingAsync(id);
                if (!result)
                    return NotFound($"Meeting with ID {id} not found");

                return Ok(new { message = "Meeting successfully deleted" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting meeting");
                return StatusCode(500, "An error occurred while deleting the meeting");
            }
        }

        [HttpPost("{id}/participants")]
        public async Task<IActionResult> AssignParticipant(int id, [FromBody] AssignParticipantDto participantDto)
        {
            try
            {
                var result = await _meetingService.AssignParticipantToMeetingAsync(id, participantDto.UserId);
                if (!result)
                    return NotFound($"Meeting with ID {id} not found");

                return Ok(new { message = "Participant successfully assigned to meeting" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error assigning participant to meeting");
                return StatusCode(500, "An error occurred while assigning the participant");
            }
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetMeetingsByUserId(string userId)
        {
            try
            {
                var meetings = await _meetingService.GetMeetingsByUserIdAsync(userId);
                return Ok(meetings);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving user meetings");
                return StatusCode(500, "An error occurred while retrieving the meetings");
            }
        }
    }
}
