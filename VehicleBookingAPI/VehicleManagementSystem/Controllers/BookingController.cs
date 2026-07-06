using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.NetworkInformation;
using System.Security.Claims;
using VehicleManagementSystem.Core.DTOs;
using VehicleManagementSystem.Data.RepositoryInterfaces;

namespace VehicleManagementSystem.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingRepository _bookingRepository;

        public BookingController(
            IBookingRepository bookingRepository)
        {
            _bookingRepository = bookingRepository;
        }

        [HttpPost]
        public async Task<IActionResult> CreateBooking(
            CreateBookingDto request)
        {
            int userId =
                Convert.ToInt32(
                    User.FindFirst("UserId")?.Value);

            try
            {
                await _bookingRepository
                    .CreateBookingAsync(
                        userId, 
                        request.VehicleId,
                        request.StartDate,
                        request.EndDate);

                return Ok("Booking created successfully.");
            }
            catch
            {
                return BadRequest("Vehicle is not available for the selected dates.");
            }
        }

        [HttpGet("my-bookings")]
        public async Task<IActionResult> GetMyBookings()
        {
            int userId =
                Convert.ToInt32(
                    User.FindFirst("UserId")?.Value);

            var bookings =
                await _bookingRepository
                    .GetMyBookingsAsync(userId);

            return Ok(bookings);
        }


        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllBookings()
        {
            var bookings =
                await _bookingRepository
                    .GetAllBookingsAsync(null);

            return Ok(bookings);
        }

        [HttpPut("cancel/{id}")]
        public async Task<IActionResult> CancelBooking(
            int id)
        {
            await _bookingRepository
                .CancelBookingAsync(id);

            return Ok("Booking cancelled.");
        }
    }
}