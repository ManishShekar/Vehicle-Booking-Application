import { MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import type { Dayjs } from "dayjs";

import {
  FilterContainer,
  VehicleTypeDropdown,
} from "./VehicleFilter.styles";

interface VehicleFilterProps {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  vehicleType: string;

  onStartDateChange: (
    value: Dayjs | null
  ) => void;

  onEndDateChange: (
    value: Dayjs | null
  ) => void;

  onVehicleTypeChange: (
    value: string
  ) => void;
}

const VehicleFilter = ({
  startDate,
  endDate,
  vehicleType,
  onStartDateChange,
  onEndDateChange,
  onVehicleTypeChange,
}: VehicleFilterProps) => {
  return (
    <FilterContainer
      direction="row"
      spacing={2}
    >
      <DatePicker
        label="Start Date"
        disablePast
        value={startDate}
        onChange={onStartDateChange}
      />

      <DatePicker
        label="End Date"
        disablePast
        value={endDate}
        onChange={onEndDateChange}
      />

      <VehicleTypeDropdown
        select
        label="Vehicle Type"
        value={vehicleType}
        onChange={(event) =>
          onVehicleTypeChange(
            event.target.value
          )
        }
      >
        <MenuItem value="">
          All
        </MenuItem>

        <MenuItem value="Sedan">
          Sedan
        </MenuItem>

        <MenuItem value="SUV">
          SUV
        </MenuItem>

        <MenuItem value="Hatchback">
          Hatchback
        </MenuItem>

        <MenuItem value="Van">
          Van
        </MenuItem>
      </VehicleTypeDropdown>
    </FilterContainer>
  );
};

export default VehicleFilter;