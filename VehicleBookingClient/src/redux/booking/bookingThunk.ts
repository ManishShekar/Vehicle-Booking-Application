import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  createBookingApi,
  getMyBookingsApi,
  cancelBookingApi,
  getAllBookingsApi,
} from "../../api/bookingApi";

import type {
  Booking,
  BookingRequest,
  AdminBooking,
} from "../../types/bookingTypes";

export const createBooking = createAsyncThunk<
  void,
  BookingRequest,
  {
    rejectValue: string;
  }
>(
  "booking/create",

  async (request, thunkAPI) => {
    try {
      await createBookingApi(request);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          typeof error.response?.data === "string"
            ? error.response.data
            : "Booking failed."
        );
      }

      return thunkAPI.rejectWithValue(
        "Booking failed."
      );
    }
  }
);

export const getMyBookings = createAsyncThunk<
  Booking[],
  void,
  {
    rejectValue: string;
  }
>(
  "booking/getMyBookings",

  async (_, thunkAPI) => {
    try {
      const response =
        await getMyBookingsApi();

      return response.map((booking: any) => ({
        bookingId:
          booking.BookingId ??
          booking.bookingId,

        vehicleName:
          booking.VehicleName ??
          booking.vehicleName,

        startDate:
          booking.StartDate ??
          booking.startDate,

        endDate:
          booking.EndDate ??
          booking.endDate,

        totalCost:
          booking.TotalCost ??
          booking.totalCost,

        status:
          booking.Status ??
          booking.status,
      }));
    } catch {
      return thunkAPI.rejectWithValue(
        "Unable to fetch bookings."
      );
    }
  }
);

export const cancelBooking = createAsyncThunk<
  void,
  number,
  {
    rejectValue: string;
  }
>(
  "booking/cancelBooking",

  async (bookingId, thunkAPI) => {
    try {
      await cancelBookingApi(
        bookingId
      );
    } catch {
      return thunkAPI.rejectWithValue(
        "Unable to cancel booking."
      );
    }
  }
);

export const getAllBookings = createAsyncThunk<
  AdminBooking[],
  void,
  {
    rejectValue: string;
  }
>(
  "booking/getAllBookings",

  async (_, thunkAPI) => {
    try {
      const response =
        await getAllBookingsApi();

      return response.map((booking: any) => ({
        bookingId:
          booking.BookingId ??
          booking.bookingId,

        customerName:
          booking.CustomerName ??
          booking.customerName,

        vehicleName:
          booking.VehicleName ??
          booking.vehicleName,

        startDate:
          booking.StartDate ??
          booking.startDate,

        endDate:
          booking.EndDate ??
          booking.endDate,

        totalCost:
          booking.TotalCost ??
          booking.totalCost,

        status:
          booking.Status ??
          booking.status,
      }));
    } catch {
      return thunkAPI.rejectWithValue(
        "Unable to fetch all bookings."
      );
    }
  }
);