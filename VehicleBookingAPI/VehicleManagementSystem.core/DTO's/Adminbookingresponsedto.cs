namespace VehicleManagementSystem.Core.DTOs
{
    public class AdminBookingResponseDto
    {
        public int BookingId { get; set; }

        public string CustomerName { get; set; }

        public string VehicleName { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public decimal TotalCost { get; set; }

        public string Status { get; set; }
    }
}