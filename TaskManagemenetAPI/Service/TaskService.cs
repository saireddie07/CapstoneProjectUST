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
            return await _context.Tasks.ToListAsync();
        }

        public async Task<TaskDetails> GetTaskByIdAsync(int id)
        {
            return await _context.Tasks.FindAsync(id);
        }

        public async Task<TaskDetails> CreateTaskAsync(TaskDetails task)
        {
            task.TaskAssignedDate = DateTime.UtcNow;
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task<TaskDetails> UpdateTaskStatusAsync(int id, string status, string remarks)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
                return null;

            task.TaskStatus = status;
            task.TaskRemarks = remarks;
            await _context.SaveChangesAsync();
            return task;
        }
    }
}
