using AuthAPI.Data;
using AuthAPI.Models.Dto;
using AuthAPI.Models;
using Microsoft.AspNetCore.Identity;

namespace AuthAPI.service.IService
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly RoleManager<IdentityRole> _roleManager;
        public AuthService(AppDbContext db, UserManager<ApplicationUser> userManager, IJwtTokenGenerator jwtTokenGenerator, RoleManager<IdentityRole> roleManager)
        {
            _db = db;
            _userManager = userManager;
            _jwtTokenGenerator = jwtTokenGenerator;
            _userManager = userManager;
            _roleManager = roleManager;
        }
        public async Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto)
        {
            var user = _db.applicationUsers.FirstOrDefault(u => u.UserName.ToLower() == loginRequestDto.UserName.ToLower());
            bool isValid = await _userManager.CheckPasswordAsync(user, loginRequestDto.Password);
            var token = _jwtTokenGenerator.GenerateToken(user);
            if (user == null || isValid == false)
            {
                return new LoginResponseDto() { User = null, Token = "" };
            }
            UserDto userDto = new()
            {
                Email = user.Email,
                ID = user.Id,
                Name = user.Name,
                PhoneNumber = user.PhoneNumber
            };
            LoginResponseDto loginResponseDto = new LoginResponseDto()
            {

                User = userDto,
                Token = token
            };
            return loginResponseDto;

        }
        public async Task<string> Register(RegistrationRequestDto registrationRequestDto)

        {

            ApplicationUser user = new()

            {

                UserName = registrationRequestDto.Email,

                Email = registrationRequestDto.Email,

                NormalizedEmail = registrationRequestDto.Email.ToUpper(),

                Name = registrationRequestDto.Name,

                PhoneNumber = registrationRequestDto.PhoneNumber

            };

            try

            {

                var result = await _userManager.CreateAsync(user, registrationRequestDto.Password);

                if (result.Succeeded)

                {

                    var userToReturn = _db.applicationUsers.First(u => u.UserName == registrationRequestDto.Email);

                    UserDto userDto = new()

                    {

                        Email = userToReturn.Email,

                        ID = userToReturn.Id,

                        Name = userToReturn.Name,

                        PhoneNumber = userToReturn.PhoneNumber

                    };

                    return "";

                }

                else

                {

                    return result.Errors.FirstOrDefault().Description;

                }

            }

            catch (Exception ex)

            {

            }

            return "Error Encountered";

        }
        public async Task<bool> AssignRole(string email, string roleName)
        {
            var user = _db.applicationUsers.FirstOrDefault(u => u.Email.ToLower() == email.ToLower());
            if (user != null)
            {
                if (!_roleManager.RoleExistsAsync(roleName).GetAwaiter().GetResult())
                {
                    _roleManager.CreateAsync(new IdentityRole(roleName)).GetAwaiter().GetResult();
                }
                await _userManager.AddToRoleAsync(user, roleName);
                return true;

            }
            return false;

        }

    }
}
