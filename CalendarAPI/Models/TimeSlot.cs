using System.ComponentModel.DataAnnotations;

namespace CalendarAPI.Models
{
    public class TimeSlot
    {
        [Key]
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
