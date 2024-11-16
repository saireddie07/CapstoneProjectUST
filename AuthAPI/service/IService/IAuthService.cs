using AuthAPI.Models.Dto;

namespace AuthAPI.service.IService
{
    public interface IAuthService
    {
        Task<string> Register(RegistrationRequestDto registrationRequestDto);
        Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto);
        Task<bool> AssignRole(string email, string rolename);
        Task<UserDto> GetUserDetailsByUsername(string username);
        Task<bool> UpdateIsApproved(string username, bool isApproved);
    }
}
