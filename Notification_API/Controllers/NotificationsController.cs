using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Notification_API.Model;
using Notification_API.Service;

namespace Notification_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationRepository _repository;

        public NotificationsController(INotificationRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<List<NotificationResponseDto>>> GetUserNotifications(int userId)
        {
            var notifications = await _repository.GetUserNotificationsAsync(userId);
            var response = notifications.Select(n => new NotificationResponseDto
            {
                Id = n.Id,
                Title = n.Title,
                Message = n.Message,
                Type = n.Type,
                IsRead = n.IsRead,
                CreatedAt = n.CreatedAt,
                ScheduledFor = n.ScheduledFor
            }).ToList();

            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<NotificationResponseDto>> Create(CreateNotificationDto dto)
        {
            var notification = new Notification
            {
                Title = dto.Title,
                Message = dto.Message,
                Type = dto.Type,
                UserId = dto.UserId,
                ScheduledFor = dto.ScheduledFor
            };

            var created = await _repository.CreateAsync(notification);
            var response = new NotificationResponseDto
            {
                Id = created.Id,
                Title = created.Title,
                Message = created.Message,
                Type = created.Type,
                IsRead = created.IsRead,
                CreatedAt = created.CreatedAt,
                ScheduledFor = created.ScheduledFor
            };

            return CreatedAtAction(nameof(GetUserNotifications), new { userId = created.UserId }, response);
        }

        [HttpPut("{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            var result = await _repository.MarkAsReadAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _repository.DeleteAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}
