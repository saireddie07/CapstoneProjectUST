namespace TaskManagemenetAPI.Model
{
    public class CreateTaskDto
    {
        public string TaskTitle { get; set; }
        public string TaskDescription { get; set; }
        public DateTime TaskDeadline { get; set; }
        public string UserName { get; set; }  // Assigned user
    }
}
