using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagemenetAPI.Data;
using TaskManagemenetAPI.Model;

namespace TaskManagemenetAPI.Service
{
    public class TaskService : ITaskService
    {
        private readonly ApplicationDbContext _context;

        public TaskService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TaskDetails>> GetAllTasksAsync()
        {
            return await _context.Tasks.ToListAsync(); // Retrieve all tasks from the database
        }

        public async Task<TaskDetails> GetTaskByIdAsync(int id)
        {
            return await _context.Tasks.FindAsync(id);
        }

        // Creating task and assigning user to it
        public async Task<TaskDetails> CreateTaskAsync(CreateTaskDto taskDto)
        {
            var task = new TaskDetails
            {
                TaskTitle = taskDto.TaskTitle,
                TaskDescription = taskDto.TaskDescription,
                TaskAssignedDate = DateTime.UtcNow,
                TaskDeadline = taskDto.TaskDeadline,
                UserName = taskDto.UserName // Assigning the user at the time of task creation
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return task;
        }

        // Updating task status and remarks
        public async Task<TaskDetails> UpdateTaskStatusAsync(int id, UpdateTaskStatusDto dto)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
                return null;  // Task not found

            if (dto.Status != null)
                task.TaskStatus = dto.Status;
            if (dto.Remarks != null)
                task.TaskRemarks = dto.Remarks;

            await _context.SaveChangesAsync();
            return task;
        }

        // Get tasks by assigned user
        public async Task<IEnumerable<TaskDetails>> GetTasksByAssignedUserAsync(string username)
        {
            return await _context.Tasks
                .Where(t => t.UserName == username)
                .ToListAsync();
        }
    }

}
