using System.Text.Json.Serialization;

namespace Calendar_API.Model
{
    public class Meeting
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public ICollection<Participant>? Participants { get; set; } = new List<Participant>();
    }

    public class Participant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int MeetingId { get; set; }
        public Meeting Meeting { get; set; }
    }




}
