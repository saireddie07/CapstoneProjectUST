namespace AuthAPI.Models.Dto
{
    public class UserDto
    {
        public string ID { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Role { get; set; }
        public bool? IsApproved { get; set; } = false;
        public string? currentStatus { get; set; } = "Available";

        public string? TimeZone { get; set; } = "UTC+05:30(IST)";


    }
}
