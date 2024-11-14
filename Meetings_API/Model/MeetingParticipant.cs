using System.Text.Json.Serialization;

namespace Meetings_API.Model
{
    public class MeetingParticipant
    {
        public int Id { get; set; }
        public int MeetingId { get; set; }
        public string UserId { get; set; }
        public bool HasAccepted { get; set; }
        [JsonIgnore]
        public virtual Meeting Meeting { get; set; }
    }
}
