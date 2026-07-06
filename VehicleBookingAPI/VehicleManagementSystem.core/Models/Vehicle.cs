namespace VehicleManagementSystem.Core.Models
{
    public class Vehicle
    {
        public int VehicleId { get; set; }

        public string VehicleName { get; set; }

        public string VehicleType { get; set; }

        public string RegistrationNumber { get; set; }

        public decimal DailyRate { get; set; }

        public string Status { get; set; }
    }
}