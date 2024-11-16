using System.ComponentModel.DataAnnotations;

namespace TaskManagemenetAPI.Model
{
    public class TaskDetails
    {
        [Key]
        public int TaskId { get; set; }
        public string TaskTitle { get; set; }
        public string TaskDescription { get; set; }
        public DateTime TaskAssignedDate { get; set; }
        public DateTime TaskDeadline { get; set; }
        public string? TaskStatus { get; set; } = "TODO";
        public string? TaskRemarks { get; set; }
        public string UserName { get; set; }
    }
}
