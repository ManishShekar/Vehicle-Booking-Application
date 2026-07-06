namespace VehicleManagementSystem.Core.DTOs
{
    public class CreateBookingDto
    {
        public int VehicleId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}