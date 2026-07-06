import { useEffect, useState } from "react";

import type { Dayjs } from "dayjs";

import { useNavigate } from "react-router-dom";

import {
  PageContainer,
  PageTitle,
} from "./VehicleList.styles";

import VehicleFilter from "../../components/forms/VehicleFilter";
import VehicleTable from "../../components/tables/VehicleTable";

import { getVehicles } from "../../redux/vehicle/vehicleThunk";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

import { ROUTES } from "../../utils/constants";
import Loader from "../../components/common/Loader";
import { Typography } from "@mui/material";

const VehicleList = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const {
    vehicles,
    loading,
    error,
  } = useAppSelector(
    state => state.vehicle
  );

  const [startDate, setStartDate] =
    useState<Dayjs | null>(null);

  const [endDate, setEndDate] =
    useState<Dayjs | null>(null);

  const [vehicleType, setVehicleType] =
    useState("");

  useEffect(() => {
    if (startDate && endDate) {
      dispatch(
        getVehicles({
          startDate: startDate.format("YYYY-MM-DD"),
          endDate: endDate.format("YYYY-MM-DD"),
        })
      );
    } else {
      dispatch(getVehicles());
    }
  }, [dispatch, startDate, endDate]);

  const filteredVehicles =
    vehicleType === ""
      ? vehicles
      : vehicles.filter(
        (vehicle) =>
          vehicle.vehicleType === vehicleType
      );

  const handleBookVehicle = (
    vehicleId: number
  ) => {
    navigate(
      ROUTES.BOOK_VEHICLE.replace(
        ":vehicleId",
        vehicleId.toString()
      )
    );
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <PageContainer>
        <PageTitle variant="h4">
          {error}
        </PageTitle>
      </PageContainer>
    );
  }

  return (


    <PageContainer>
      <PageTitle variant="h4">
        Available Vehicles
      </PageTitle>

      <VehicleFilter
        startDate={startDate}
        endDate={endDate}
        vehicleType={vehicleType}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onVehicleTypeChange={setVehicleType}
      />

      {filteredVehicles.length === 0 ? (
        <Typography variant="h6">
          No vehicles found.
        </Typography>
      ) : (
        <VehicleTable
          vehicles={filteredVehicles}
          onBook={handleBookVehicle}
        />
      )}
    </PageContainer>
  );
};

export default VehicleList;