using System.ComponentModel.DataAnnotations;

namespace Meetings_API.Model.DTOs
{
    public class AssignParticipantDto
    {
        [Required]
        public string UserId { get; set; }
    }
}
