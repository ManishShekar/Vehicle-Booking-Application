public class Booking
{
    public int BookingId { get; set; }

    public int UserId { get; set; }

    public int VehicleId { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public decimal TotalCost { get; set; }

    public string Status { get; set; }
}