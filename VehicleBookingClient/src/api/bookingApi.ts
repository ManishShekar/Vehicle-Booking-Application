import axiosClient from "./axiosClient";

import type {
    Booking,
  BookingRequest,
} from "../types/bookingTypes";

import type { AdminBooking } from "../types/bookingTypes";

export const getAllBookingsApi = async (): Promise<AdminBooking[]> => {
  const response = await axiosClient.get<AdminBooking[]>("/Booking");
  return response.data;
};

export const adminCancelBookingApi = async (bookingId: number) => {
  const response = await axiosClient.put(`/Booking/cancel/${bookingId}`);
  return response.data;
};

export const createBookingApi = async (
  request: BookingRequest
) => {
  const response = await axiosClient.post(
    "/Booking",
    request
  );

  return response.data;
};

export const getMyBookingsApi = async (): Promise<Booking[]> => {
  const response =
    await axiosClient.get<Booking[]>(
      "/Booking/my-bookings"
    );

  return response.data;
};

export const cancelBookingApi = async (
  bookingId: number
) => {
  const response =
    await axiosClient.put(
      `/Booking/cancel/${bookingId}`
    );

  return response.data;
};