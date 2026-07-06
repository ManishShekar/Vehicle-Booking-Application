import { useEffect } from "react";
import { Typography, Alert } from "@mui/material";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getAllBookings, cancelBooking } from "../../redux/booking/bookingThunk";

import AdminBookingTable from "../../components/tables/AdminBookingTable";
import Loader from "../../components/common/Loader";
import { PageContainer, PageTitle } from "./AllBookings.styles";

const AllBookings = () => {
  const dispatch = useAppDispatch();
  const { allBookings, loading, error } = useAppSelector((s) => s.booking);

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  const handleCancel = async (bookingId: number) => {
    await dispatch(cancelBooking(bookingId));
    dispatch(getAllBookings());
  };

  if (loading) return <Loader />;

  return (
    <PageContainer>
      <PageTitle variant="h4">All Bookings</PageTitle>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <AdminBookingTable
        bookings={allBookings}
        onCancel={handleCancel}
      />
    </PageContainer>
  );
};

export default AllBookings;