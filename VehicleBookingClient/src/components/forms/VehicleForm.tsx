import { Controller } from "react-hook-form";
import {
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";
import type { Control } from "react-hook-form";
import type { VehicleType, VehicleStatus } from "../../types/vehicleTypes";

export interface VehicleFormValues {
  vehicleName: string;
  vehicleType: VehicleType | "";
  registrationNumber: string;
  dailyRate: number | "";
  status?: VehicleStatus;
}

interface VehicleFormProps {
  control: Control<VehicleFormValues>;
  showStatus?: boolean;
}

const VEHICLE_TYPES: VehicleType[] = ["Sedan", "SUV", "Hatchback", "Van"];
const VEHICLE_STATUSES: VehicleStatus[] = ["Available", "Maintenance"];

const VehicleForm = ({ control, showStatus = false }: VehicleFormProps) => {
  return (
    <Stack spacing={2} sx={{ mt: 2 }}>
      <Controller
        name="vehicleName"
        control={control}
        rules={{ required: "Vehicle name is required" }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Vehicle Name"
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="vehicleType"
        control={control}
        rules={{ required: "Type is required" }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            select
            label="Type"
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          >
            {VEHICLE_TYPES.map((t) => (
              <MenuItem key={t} value={t}>{t}</MenuItem>
            ))}
          </TextField>
        )}
      />

      <Controller
        name="registrationNumber"
        control={control}
        rules={{ required: "Registration number is required" }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Registration Number"
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="dailyRate"
        control={control}
        rules={{
          required: "Daily rate is required",
          min: { value: 1, message: "Must be greater than 0" },
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Daily Rate"
            type="number"
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      {showStatus && (
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Status"
              fullWidth
            >
              {VEHICLE_STATUSES.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </TextField>
          )}
        />
      )}
    </Stack>
  );
};

export default VehicleForm;