using Microsoft.AspNetCore.Mvc;
using TaskManagemenetAPI.Model;

namespace TaskManagemenetAPI.Service
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskDetails>> GetAllTasksAsync();  // Method to get all tasks
        Task<TaskDetails> GetTaskByIdAsync(int id);  // Method to get task by ID
        Task<TaskDetails> CreateTaskAsync(CreateTaskDto taskDto);  // Method to create task and assign user
        Task<TaskDetails> UpdateTaskStatusAsync(int id, UpdateTaskStatusDto dto);  // Method to update task status
        Task<IEnumerable<TaskDetails>> GetTasksByAssignedUserAsync(string username);
        Task<bool> DeleteTaskAsync(int id);// Method to get tasks by username
    }

}
