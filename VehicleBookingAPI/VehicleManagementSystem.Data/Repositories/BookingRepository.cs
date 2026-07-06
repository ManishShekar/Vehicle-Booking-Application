//using Dapper;
//using VehicleManagementSystem.Data.DbHelper;
//using VehicleManagementSystem.Data.RepositoryInterfaces;

//namespace VehicleManagementSystem.Data.Repositories
//{
//    public class BookingRepository : IBookingRepository
//    {
//        private readonly SqlConnectionFactory _connectionFactory;

//        public BookingRepository(SqlConnectionFactory connectionFactory)
//        {
//            _connectionFactory = connectionFactory;
//        }

//        public async Task<int> CreateBookingAsync(
//            int userId,
//            int vehicleId,
//            DateTime startDate,
//            DateTime endDate)
//        {
//            using var connection = _connectionFactory.CreateConnection();

//            return await connection.ExecuteAsync(
//                "SP_CreateBooking",
//                new
//                {
//                    UserId = userId,
//                    VehicleId = vehicleId,
//                    StartDate = startDate,
//                    EndDate = endDate
//                },
//                commandType: System.Data.CommandType.StoredProcedure);
//        }

//        public async Task<int> CancelBookingAsync(int bookingId)
//        {
//            using var connection = _connectionFactory.CreateConnection();

//            return await connection.ExecuteAsync(
//                "SP_CancelBooking",
//                new
//                {
//                    BookingId = bookingId
//                },
//                commandType: System.Data.CommandType.StoredProcedure);
//        }

//        public async Task<IEnumerable<dynamic>> GetMyBookingsAsync(
//            int userId)
//        {
//            using var connection = _connectionFactory.CreateConnection();

//            return await connection.QueryAsync(
//                "SP_GetMyBookings",
//                new
//                {
//                    UserId = userId
//                },
//                commandType: System.Data.CommandType.StoredProcedure);
//        }

//        public async Task<IEnumerable<dynamic>> GetAllBookingsAsync(
//            string? status)
//        {
//            using var connection = _connectionFactory.CreateConnection();

//            return await connection.QueryAsync(
//                "SP_GetAllBookings",
//                new
//                {
//                    Status = status
//                },
//                commandType: System.Data.CommandType.StoredProcedure);
//        }
//    }
//}


using Dapper;
using VehicleManagementSystem.Core.DTOs;
using VehicleManagementSystem.Data.DbHelper;
using VehicleManagementSystem.Data.RepositoryInterfaces;

namespace VehicleManagementSystem.Data.Repositories
{
    public class BookingRepository : IBookingRepository
    {
        private readonly SqlConnectionFactory _connectionFactory;

        public BookingRepository(SqlConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<int> CreateBookingAsync(
            int userId,
            int vehicleId,
            DateTime startDate,
            DateTime endDate)
        {
            using var connection = _connectionFactory.CreateConnection();

            return await connection.ExecuteAsync(
                "SP_CreateBooking",
                new
                {
                    UserId = userId,
                    VehicleId = vehicleId,
                    StartDate = startDate,
                    EndDate = endDate
                },
                commandType: System.Data.CommandType.StoredProcedure);
        }

        public async Task<int> CancelBookingAsync(int bookingId)
        {
            using var connection = _connectionFactory.CreateConnection();

            return await connection.ExecuteAsync(
                "SP_CancelBooking",
                new
                {
                    BookingId = bookingId
                },
                commandType: System.Data.CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<BookingResponseDto>> GetMyBookingsAsync(
            int userId)
        {
            using var connection = _connectionFactory.CreateConnection();

            return await connection.QueryAsync<BookingResponseDto>(
                "SP_GetMyBookings",
                new
                {
                    UserId = userId
                },
                commandType: System.Data.CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<AdminBookingResponseDto>> GetAllBookingsAsync(
            string? status)
        {
            using var connection = _connectionFactory.CreateConnection();

            return await connection.QueryAsync<AdminBookingResponseDto>(
                "SP_GetAllBookings",
                new
                {
                    Status = status
                },
                commandType: System.Data.CommandType.StoredProcedure);
        }
    }
}