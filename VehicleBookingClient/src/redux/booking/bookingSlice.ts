import { createSlice } from "@reduxjs/toolkit";

import type {
  BookingState,
} from "../../types/bookingTypes";

import { cancelBooking, createBooking, getMyBookings } from "./bookingThunk";
import { getAllBookings } from "./bookingThunk";

const initialState: BookingState = {
  bookings: [],
  allBookings: [],  
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",

  initialState,

  reducers: {},

extraReducers: (builder) => {
  builder

    .addCase(getAllBookings.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(getAllBookings.fulfilled, (state, action) => {
  state.loading = false;
  state.allBookings = action.payload;
})
.addCase(getAllBookings.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload ?? "Unable to fetch all bookings.";
})


    .addCase(
      getMyBookings.pending,
      (state) => {
        state.loading = true;
        state.error = null;
      }
    )

    .addCase(
      getMyBookings.fulfilled,
      (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      }
    )

    .addCase(
      getMyBookings.rejected,
      (state, action) => {
        state.loading = false;
        state.error =
          action.payload ??
          "Unable to fetch bookings.";
      }
    )

    

    .addCase(
      createBooking.pending,
      (state) => {
        state.loading = true;
      }
    )

    .addCase(
      createBooking.fulfilled,
      (state) => {
        state.loading = false;
      }
    )

    .addCase(
      createBooking.rejected,
      (state, action) => {
        state.loading = false;
        state.error =
          action.payload ??
          "Unable to create booking.";
      }
    )


    .addCase(
      cancelBooking.pending,
      (state) => {
        state.loading = true;
      }
    )

    .addCase(
      cancelBooking.fulfilled,
      (state) => {
        state.loading = false;
      }
    )

    .addCase(
      cancelBooking.rejected,
      (state, action) => {
        state.loading = false;
        state.error =
          action.payload ??
          "Unable to cancel booking.";
      }
    );

    
}
});


export default bookingSlice.reducer;