using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using VehicleManagementSystem.Core.DTOs;
using VehicleManagementSystem.Core.Models;
using VehicleManagementSystem.Data.RepositoryInterfaces;
using VehicleManagementSystem.Utilities.JWT;

namespace VehicleManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly JWTTokenGenerator _jwtTokenGenerator;

        public AuthController(
            IUserRepository userRepository,
            JWTTokenGenerator jwtTokenGenerator)
        {
            _userRepository = userRepository;
            _jwtTokenGenerator = jwtTokenGenerator;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(
            RegisterRequestDto request)
        {
            var existingUser =
                await _userRepository.GetByEmailAsync(
                    request.Email);

            if (existingUser != null)
            {
                return BadRequest(
                    "Email already exists.");
            }

            string passwordHash =
                BCrypt.Net.BCrypt.HashPassword(
                    request.Password);

            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                PasswordHash = passwordHash,
                Role = "Customer"
            };

            await _userRepository.RegisterAsync(user);

            return Ok("Registration successful.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(
            LoginRequestDto request)
        {
            var user =
                await _userRepository.GetByEmailAsync(
                    request.Email);

            if (user == null)
            {
                return Unauthorized(
                    "Invalid Email or Password.");
            }

            bool isValidPassword =
                BCrypt.Net.BCrypt.Verify(
                    request.Password,
                    user.PasswordHash);

            if (!isValidPassword)
            {
                return Unauthorized(
                    "Invalid Email or Password.");
            }

            string token =
                _jwtTokenGenerator.GenerateToken(
                    user.UserId,
                    user.Email,
                    user.Role);

            return Ok(new
            {
                Token = token,
                UserId = user.UserId,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role
            });
        }
    }
}