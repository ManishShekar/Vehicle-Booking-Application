import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getVehicles, addVehicle, getAllVehicles } from "../../redux/vehicle/vehicleThunk";

import {
  MaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo } from "react";
import type { Vehicle } from "../../types/vehicleTypes";
import VehicleForm, { type VehicleFormValues } from "../../components/forms/VehicleForm";
import Loader from "../../components/common/Loader";

import { PageContainer, PageTitle, TopBar } from "./ManageVehicles.styles";
import { ROUTES } from "../../utils/constants";

const ManageVehicles = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { vehicles, loading, error } = useAppSelector((s) => s.vehicle);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<VehicleFormValues>({
    defaultValues: {
      vehicleName: "",
      vehicleType: "",
      registrationNumber: "",
      dailyRate: "",
    },
  });

  useEffect(() => {
  dispatch(getAllVehicles());
  }, [dispatch]);

  const handleAdd = async (values: VehicleFormValues) => {
    setSubmitError(null);
    const result = await dispatch(
  addVehicle({
    vehicleName: values.vehicleName,
    vehicleType: values.vehicleType as any,
    registrationNumber: values.registrationNumber,
    dailyRate: Number(values.dailyRate),
    status: "Available",
  })
);
    if (addVehicle.fulfilled.match(result)) {
      setDialogOpen(false);
      reset();
     dispatch(getAllVehicles());
    } else {
      setSubmitError(result.payload as string);
    }
  };

  const columns = useMemo<MRT_ColumnDef<Vehicle>[]>(
    () => [
      { accessorKey: "vehicleName", header: "Vehicle Name" },
      { accessorKey: "vehicleType", header: "Type" },
      { accessorKey: "registrationNumber", header: "Registration" },
      { accessorKey: "dailyRate", header: "Daily Rate" },
      { accessorKey: "status", header: "Status" },
      {
        header: "Action",
        Cell: ({ row }) => (
          <Button
            variant="outlined"
            onClick={() =>
              navigate(
                ROUTES.EDIT_VEHICLE.replace(
                  ":vehicleId",
                  String(row.original.vehicleId)
                )
              )
            }
          >
            Edit
          </Button>
        ),
      },
    ],
    [navigate]
  );

  if (loading) return <Loader />;



  return (
    <PageContainer>
      <TopBar>
        <PageTitle variant="h4">Manage Vehicles</PageTitle>
        <Button variant="contained" onClick={() => setDialogOpen(true)}>
          Add Vehicle
        </Button>
      </TopBar>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <MaterialReactTable columns={columns} data={vehicles} />

      <Dialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); reset(); setSubmitError(null); }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Vehicle</DialogTitle>
        <DialogContent>
          {submitError && <Alert severity="error" sx={{ mb: 1 }}>{submitError}</Alert>}
          <VehicleForm control={control} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setDialogOpen(false); reset(); setSubmitError(null); }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit(handleAdd)}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default ManageVehicles;