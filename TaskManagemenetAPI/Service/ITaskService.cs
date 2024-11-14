using TaskManagemenetAPI.Model;

namespace TaskManagemenetAPI.Service
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskDetails>> GetAllTasksAsync();
        Task<TaskDetails> GetTaskByIdAsync(int id);
        Task<TaskDetails> CreateTaskAsync(TaskDetails task);
        Task<TaskDetails> UpdateTaskStatusAsync(int id, string status, string remarks);
    }
}
