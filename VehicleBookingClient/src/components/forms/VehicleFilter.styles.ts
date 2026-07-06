import { styled } from "@mui/material/styles";
import {
  Stack,
  TextField,
} from "@mui/material";

export const FilterContainer = styled(Stack)({
  marginBottom: 24,
});

export const VehicleTypeDropdown =
  styled(TextField)({
    minWidth: 220,
  });