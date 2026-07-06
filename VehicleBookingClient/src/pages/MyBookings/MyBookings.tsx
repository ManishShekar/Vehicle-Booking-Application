import { useEffect } from "react";

import { Typography } from "@mui/material";

import Loader from "../../components/common/Loader";
import BookingTable from "../../components/tables/BookingTable";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

import {
  getMyBookings,
  cancelBooking,
} from "../../redux/booking/bookingThunk";

import {
  PageContainer,
  PageTitle,
} from "./MyBookings.styles";

const MyBookings = () => {
  const dispatch = useAppDispatch();

  const {
    bookings,
    loading,
    error,
  } = useAppSelector(
    (state) => state.booking
  );

  useEffect(() => {
    dispatch(getMyBookings());
  }, [dispatch]);

  const handleCancel = async (
    bookingId: number
  ) => {
    await dispatch(
      cancelBooking(bookingId)
    );

    dispatch(getMyBookings());
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Typography color="error">
        {error}
      </Typography>
    );
  }

  return (
    <PageContainer>

      <PageTitle variant="h4">
        My Bookings
      </PageTitle>

      <BookingTable
        bookings={bookings}
        onCancel={handleCancel}
      />

    </PageContainer>
  );
};

export default MyBookings;