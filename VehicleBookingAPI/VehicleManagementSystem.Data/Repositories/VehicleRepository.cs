using Dapper;
using VehicleManagementSystem.Core.Models;
using VehicleManagementSystem.Data.DbHelper;
using VehicleManagementSystem.Data.RepositoryInterfaces;

namespace VehicleManagementSystem.Data.Repositories
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly SqlConnectionFactory _connectionFactory;

        public VehicleRepository(SqlConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<IEnumerable<Vehicle>> GetVehiclesAsync(
            DateTime? startDate,
            DateTime? endDate,
            string? vehicleType)
        {
            using var connection = _connectionFactory.CreateConnection();

            return await connection.QueryAsync<Vehicle>(
                "SP_GetAvailableVehicles",
                new
                {
                    StartDate = startDate,
                    EndDate = endDate,
                    VehicleType = vehicleType
                },
                commandType: System.Data.CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<Vehicle>> GetAllVehiclesAsync()
        {
            using var connection = _connectionFactory.CreateConnection();

            return await connection.QueryAsync<Vehicle>(
                "SP_GetAllVehicles",
                commandType: System.Data.CommandType.StoredProcedure);
        }

        public async Task<Vehicle?> GetVehicleByIdAsync(int vehicleId)
        {
            using var connection = _connectionFactory.CreateConnection();

            return await connection.QueryFirstOrDefaultAsync<Vehicle>(
                "SP_GetVehicleById",
                new
                {
                    VehicleId = vehicleId
                },
                commandType: System.Data.CommandType.StoredProcedure);
        }

        public async Task<int> AddVehicleAsync(Vehicle vehicle)
        {
            using var connection = _connectionFactory.CreateConnection();

            return await connection.ExecuteAsync(
                "SP_AddVehicle",
                new
                {
                    vehicle.VehicleName,
                    vehicle.VehicleType,
                    vehicle.RegistrationNumber,
                    vehicle.DailyRate
                },
                commandType: System.Data.CommandType.StoredProcedure);
        }

        public async Task<int> UpdateVehicleAsync(Vehicle vehicle)
        {
            using var connection = _connectionFactory.CreateConnection();

            return await connection.ExecuteAsync(
                "SP_UpdateVehicle",
                new
                {
                    vehicle.VehicleId,
                    vehicle.VehicleName,
                    vehicle.VehicleType,
                    vehicle.RegistrationNumber,
                    vehicle.DailyRate,
                    vehicle.Status
                },
                commandType: System.Data.CommandType.StoredProcedure);
        }
    }
}