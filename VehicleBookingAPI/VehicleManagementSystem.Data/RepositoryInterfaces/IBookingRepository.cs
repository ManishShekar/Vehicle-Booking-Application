//namespace VehicleManagementSystem.Data.RepositoryInterfaces
//{
//    public interface IBookingRepository
//    {
//        Task<int> CreateBookingAsync(
//            int userId,
//            int vehicleId,
//            DateTime startDate,
//            DateTime endDate);

//        Task<int> CancelBookingAsync(
//            int bookingId);

//        Task<IEnumerable<dynamic>> GetMyBookingsAsync(
//            int userId);

//        Task<IEnumerable<dynamic>> GetAllBookingsAsync(
//            string? status);


//    }
//}


using VehicleManagementSystem.Core.DTOs;

namespace VehicleManagementSystem.Data.RepositoryInterfaces
{
    public interface IBookingRepository
    {
        Task<int> CreateBookingAsync(
            int userId,
            int vehicleId,
            DateTime startDate,
            DateTime endDate);

        Task<int> CancelBookingAsync(
            int bookingId);

        Task<IEnumerable<BookingResponseDto>> GetMyBookingsAsync(
            int userId);

        Task<IEnumerable<AdminBookingResponseDto>> GetAllBookingsAsync(
            string? status);


    }
}