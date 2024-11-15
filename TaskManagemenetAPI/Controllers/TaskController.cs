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

        // Get all tasks endpoint
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<TaskDetails>>> GetAllTasks()
        {
            var tasks = await _taskService.GetAllTasksAsync();
            return Ok(tasks);
        }

        // Get task by taskId endpoint
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskDetails>> GetTask(int id)
        {
            var task = await _taskService.GetTaskByIdAsync(id);
            if (task == null)
                return NotFound();
            return Ok(task);
        }

        // Create task and assign user endpoint
        [HttpPost]
        public async Task<ActionResult<TaskDetails>> CreateTask([FromBody] CreateTaskDto taskDto)
        {
            var createdTask = await _taskService.CreateTaskAsync(taskDto);
            return CreatedAtAction(nameof(GetTask), new { id = createdTask.TaskId }, createdTask);
        }

        // Update task status and remarks endpoint
        [HttpPut("{id}/status")]
        public async Task<ActionResult<TaskDetails>> UpdateTaskStatus(int id, [FromBody] UpdateTaskStatusDto dto)
        {
            var updatedTask = await _taskService.UpdateTaskStatusAsync(id, dto);
            if (updatedTask == null)
                return NotFound();
            return Ok(updatedTask);
        }

        // Get tasks assigned to a specific user
        [HttpGet("byusername/{username}")]
        public async Task<ActionResult<IEnumerable<TaskDetails>>> GetTasksByAssignedUser(string username)
        {
            var tasks = await _taskService.GetTasksByAssignedUserAsync(username);
            if (tasks == null || !tasks.Any())
                return NotFound();
            return Ok(tasks);
        }
    }

}
