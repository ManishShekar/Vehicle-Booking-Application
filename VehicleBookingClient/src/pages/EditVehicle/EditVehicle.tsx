import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Stack, Alert } from "@mui/material";
import { useState } from "react";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getVehicleById, updateVehicle } from "../../redux/vehicle/vehicleThunk";

import VehicleForm, { type VehicleFormValues } from "../../components/forms/VehicleForm";
import Loader from "../../components/common/Loader";
import { PageContainer, PageTitle } from "./EditVehicle.styles";
import { ROUTES } from "../../utils/constants";

const EditVehicle = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selectedVehicle, loading } = useAppSelector((s) => s.vehicle);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { control, handleSubmit, reset,setValue } = useForm<VehicleFormValues>({
    defaultValues: {
      vehicleName: "",
      vehicleType: "",
      registrationNumber: "",
      dailyRate: "",
      status: "Available",
    },
  });

  useEffect(() => {
    if (vehicleId) {
      dispatch(getVehicleById(Number(vehicleId)));
    }
  }, [dispatch, vehicleId]);

 useEffect(() => {
  if (selectedVehicle) {
    setValue("vehicleName", selectedVehicle.vehicleName);
    setValue("vehicleType", selectedVehicle.vehicleType);
    setValue("registrationNumber", selectedVehicle.registrationNumber);
    setValue("dailyRate", selectedVehicle.dailyRate);
    setValue("status", selectedVehicle.status);
  }
}, [selectedVehicle, setValue]);

  const handleSave = async (values: VehicleFormValues) => {
    setSubmitError(null);
    const result = await dispatch(
      updateVehicle({
        vehicleId: Number(vehicleId),
        payload: {
          vehicleName: values.vehicleName,
          vehicleType: values.vehicleType as any,
          registrationNumber: values.registrationNumber,
          dailyRate: Number(values.dailyRate),
         status: values.status ?? "Available",
        },
      })
    );

    if (updateVehicle.fulfilled.match(result)) {
      navigate(ROUTES.MANAGE_VEHICLES);
    } else {
      setSubmitError(result.payload as string);
    }
  };

  if (loading) return <Loader />;

  return (
    <PageContainer>
      <PageTitle variant="h4">Edit Vehicle</PageTitle>

      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>
      )}

      <VehicleForm control={control} showStatus />

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button
          variant="outlined"
          onClick={() => navigate(ROUTES.MANAGE_VEHICLES)}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit(handleSave)}>
          Save
        </Button>
      </Stack>
    </PageContainer>
  );
};

export default EditVehicle;