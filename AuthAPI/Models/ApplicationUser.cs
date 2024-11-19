using Microsoft.AspNetCore.Identity;

namespace AuthAPI.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
        public string Role { get; set; }
        public bool? IsApproved { get; set; } = false;
        public string? currentStatus { get; set; } = "Available";

        public string? TimeZone { get; set; } = "UTC+05:30(IST)";


    }
}
