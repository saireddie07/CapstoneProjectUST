using AuthAPI.Models.Dto;
using AuthAPI.service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthAPIController : ControllerBase
    {
        private readonly IAuthService _authService;

        protected ResponseDto _response;

        public AuthAPIController(IAuthService authService)

        {

            _authService = authService;

            _response = new();

        }



        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegistrationRequestDto model)
        {
            var errorMessage = await _authService.Register(model);
            if (!string.IsNullOrEmpty(errorMessage))
            {
                _response.IsSuccess = false;
                _response.Message = errorMessage;
                return BadRequest(errorMessage);
            }
            return Ok(_response);
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto model)

        {
            var loginResponse = await _authService.Login(model);
            if (loginResponse.User == null)
            {
                _response.IsSuccess = false;
                _response.Message = "Username or Password Incorrect";
                return BadRequest(_response);
            }
            _response.Result = loginResponse;
            return Ok(_response);
        }
        [HttpPut("updateIsApproved/{username}")]
        public async Task<IActionResult> UpdateIsApproved(string username, [FromBody] bool isApproved)
        {
            var isUpdated = await _authService.UpdateIsApproved(username, isApproved);
            if (!isUpdated)
            {
                _response.IsSuccess = false;
                _response.Message = "Error encountered while updating user approval status";
                return BadRequest(_response);
            }

            return Ok(_response);
        }

        [HttpGet("unapproved-users")]
        public async Task<IActionResult> GetUnapprovedUsers()
        {
            var users = await _authService.GetUnapprovedUsersAsync();
            return Ok(users.Select(user => new
            {
                user.Id,
                user.UserName,
                user.Email,
                user.Name,
                user.PhoneNumber,
                user.Role,
                user.IsApproved
            }));
        }
        [HttpGet("getUser/{username}")]
        public async Task<IActionResult> GetUserByUsername(string username)
        {
            var userDetails = await _authService.GetUserDetailsByUsername(username);
            if (userDetails == null)
            {
                _response.IsSuccess = false;
                _response.Message = "User not found";
                return NotFound(_response);
            }

            _response.Result = userDetails;
            return Ok(_response);
        }

        [HttpPost("AssignRole")]
        public async Task<IActionResult> AssignRole([FromBody] RegistrationRequestDto model)
        {
            var assignRoleSuccessful = await _authService.AssignRole(model.Email, model.Role.ToUpper());
            if (!assignRoleSuccessful)
            {
                _response.IsSuccess = false;
                _response.Message = "Error encountered";
                return BadRequest(_response);
            }
            return Ok(_response);
        }
    }
}
