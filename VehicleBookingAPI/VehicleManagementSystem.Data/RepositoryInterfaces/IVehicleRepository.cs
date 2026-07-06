using VehicleManagementSystem.Core.Models;

namespace VehicleManagementSystem.Data.RepositoryInterfaces
{
    public interface IVehicleRepository
    {
        Task<IEnumerable<Vehicle>> GetVehiclesAsync(
            DateTime? startDate,
            DateTime? endDate,
            string? vehicleType);

        Task<IEnumerable<Vehicle>> GetAllVehiclesAsync();

        Task<Vehicle?> GetVehicleByIdAsync(int vehicleId);

        Task<int> AddVehicleAsync(Vehicle vehicle);

        Task<int> UpdateVehicleAsync(Vehicle vehicle);
    }
}