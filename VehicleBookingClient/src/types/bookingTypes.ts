export interface BookingRequest {
  vehicleId: number;
  startDate: string;
  endDate: string;
}

export interface BookingFormValues {
  startDate: Date | null;
  endDate: Date | null;
}

export interface Booking {
  bookingId: number;
  vehicleName: string;
  startDate: string;
  endDate: string;
  totalCost: number;
  status: string;
}

export interface BookingState {
  bookings: Booking[];
  allBookings: AdminBooking[];
  loading: boolean;
  error: string | null;
}
export interface AdminBooking {
  bookingId: number;
  customerName: string;
  vehicleName: string;
  startDate: string;
  endDate: string;
  totalCost: number;
  status: string;
}