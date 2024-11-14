using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManagemenetAPI.Model;
using TaskManagemenetAPI.Service;

namespace TaskManagemenetAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskDetails>>> GetAllTasks()
        {
            var tasks = await _taskService.GetAllTasksAsync();
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskDetails>> GetTask(int id)
        {
            var task = await _taskService.GetTaskByIdAsync(id);
            if (task == null)
                return NotFound();
            return Ok(task);
        }

        [HttpPost]
        public async Task<ActionResult<TaskDetails>> CreateTask(TaskDetails task)
        {
            var createdTask = await _taskService.CreateTaskAsync(task);
            return CreatedAtAction(nameof(GetTask), new { id = createdTask.TaskId }, createdTask);
        }

        [HttpPut("{id}/status")]
        public async Task<ActionResult<TaskDetails>> UpdateTaskStatus(int id, [FromBody] UpdateTaskStatusDto dto)
        {
            var updatedTask = await _taskService.UpdateTaskStatusAsync(id, dto.Status, dto.Remarks);
            if (updatedTask == null)
                return NotFound();
            return Ok(updatedTask);
        }
    }

    // DTOs/UpdateTaskStatusDto.cs
    public class UpdateTaskStatusDto
    {
        public string Status { get; set; }
        public string Remarks { get; set; }
    }
}
