namespace CalendarAPI.Models
{
    public class Participant
    {
        public int Id { get; set; } 
        public string Name { get; set; }
        public string Email { get; set; }
        public List<TimeSlot> AvailableSlots { get; set; } = new List<TimeSlot>();
    }
}
