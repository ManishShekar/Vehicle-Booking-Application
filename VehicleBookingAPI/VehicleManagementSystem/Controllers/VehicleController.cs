using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using VehicleManagementSystem.Core.Models;
using VehicleManagementSystem.Data.RepositoryInterfaces;

namespace VehicleManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly IVehicleRepository _vehicleRepository;

        public VehicleController(
            IVehicleRepository vehicleRepository)
        {
            _vehicleRepository = vehicleRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetVehicles(
            DateTime? startDate,
            DateTime? endDate,
            string? vehicleType)
        {
            var vehicles =
                await _vehicleRepository.GetVehiclesAsync(
                    startDate,
                    endDate,
                    vehicleType);

            return Ok(vehicles);
        }



        [Authorize(Roles = "Admin")]
        [HttpGet("admin")]
        public async Task<IActionResult> GetAllVehicles()
        {
            var vehicles =
                await _vehicleRepository.GetAllVehiclesAsync();

            return Ok(vehicles);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetVehicleById(
            int id)
        {
            var vehicle =
                await _vehicleRepository
                    .GetVehicleByIdAsync(id);

            if (vehicle == null)
            {
                return NotFound();
            }

            return Ok(vehicle);
        }



        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> AddVehicle(
            Vehicle vehicle)
        {
            await _vehicleRepository
                .AddVehicleAsync(vehicle);

            return Ok("Vehicle added successfully.");
        }


        

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(
            int id,
            Vehicle vehicle)
        {
            vehicle.VehicleId = id;

            try
            {
                await _vehicleRepository.UpdateVehicleAsync(vehicle);

                return Ok();
            }
            catch (SqlException ex)
            {
                return BadRequest("Registration Number Aready Exist");
            }
        }
    }
}