import { useEffect, useState } from "react";

import {
  Typography,
  Button,
  Alert,
} from "@mui/material";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { bookingSchema } from "../../schemas/bookingSchema";

import type {
  BookingFormValues,
} from "../../types/bookingTypes";

import Loader from "../../components/common/Loader";
import BookingForm from "../../components/forms/BookingForm";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

import { createBooking } from "../../redux/booking/bookingThunk";
import { getVehicleById } from "../../redux/vehicle/vehicleThunk";

import { ROUTES } from "../../utils/constants";

import {
  BookingCard,
  PageContainer,
  PageTitle,
  VehicleInfo,
  TotalCost,
} from "./BookVehicle.styles";
import dayjs from "dayjs";

const BookVehicle = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [bookingError, setBookingError] =
    useState<string | null>(null);

  const { vehicleId } = useParams<{
    vehicleId: string;
  }>();

  const id = Number(vehicleId);

  const {
    selectedVehicle,
    loading,
    error,
  } = useAppSelector(
    (state) => state.vehicle
  );

  const {
    control,
    handleSubmit,
    watch,
  } = useForm<BookingFormValues>({
    resolver: yupResolver(bookingSchema),

    defaultValues: {
      startDate: null,
      endDate: null,
    },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const totalCost =
    startDate &&
    endDate &&
    selectedVehicle
      ? (((endDate.getTime() -
          startDate.getTime()) /
          (1000 * 60 * 60 * 24)) +
          1) *
        selectedVehicle.dailyRate
      : 0;

  useEffect(() => {
    if (!isNaN(id)) {
      dispatch(getVehicleById(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (
    data: BookingFormValues
  ) => {
    if (
      !selectedVehicle ||
      !data.startDate ||
      !data.endDate
    ) {
      return;
    }

    setBookingError(null);

    const result = await dispatch(
      createBooking({
        vehicleId:
          selectedVehicle.vehicleId,
startDate: dayjs(data.startDate).format("YYYY-MM-DD"),
endDate: dayjs(data.endDate).format("YYYY-MM-DD"),
      })
    );

    if (
      createBooking.fulfilled.match(
        result
      )
    ) {
      navigate(
        ROUTES.MY_BOOKINGS
      );
    } else {
      setBookingError(
        result.payload as string
      );
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <PageContainer>
        <Typography color="error">
          {error}
        </Typography>
      </PageContainer>
    );
  }

  if (!selectedVehicle) {
    return (
      <PageContainer>
        <Typography>
          Vehicle not found.
        </Typography>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BookingCard>

        <PageTitle variant="h4">
          Book Vehicle
        </PageTitle>

        <VehicleInfo>

          <Typography variant="h6">
            Vehicle Details
          </Typography>

          <Typography>
            <strong>Vehicle :</strong>{" "}
            {selectedVehicle.vehicleName}
          </Typography>

          <Typography>
            <strong>Vehicle Type :</strong>{" "}
            {selectedVehicle.vehicleType}
          </Typography>

          <Typography>
            <strong>
              Registration Number :
            </strong>{" "}
            {
              selectedVehicle.registrationNumber
            }
          </Typography>

          <Typography>
            <strong>
              Daily Rate :
            </strong>{" "}
            ₹
            {selectedVehicle.dailyRate}
          </Typography>

        </VehicleInfo>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
        >

          {bookingError && (
            <Alert
              severity="error"
              sx={{ mb: 2 }}
            >
              {bookingError}
            </Alert>
          )}

          <BookingForm
            control={control}
          />

          <TotalCost variant="h6">
            Total Cost : ₹
            {totalCost.toLocaleString()}
          </TotalCost>

          <Button
            variant="contained"
            type="submit"
            fullWidth
          >
            Book Vehicle
          </Button>

        </form>

      </BookingCard>
    </PageContainer>
  );
};

export default BookVehicle;