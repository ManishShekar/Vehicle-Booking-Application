import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  Typography,
} from "@mui/material";

export const PageContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  padding: 32,
});

export const BookingCard = styled(Card)({
  width: 600,
  padding: 24,
});

export const PageTitle = styled(Typography)({
  fontWeight: 600,
  marginBottom: 24,
});

export const VehicleInfo = styled(Box)({
  marginBottom: 24,
});

export const TotalCost = styled(Typography)({
  fontWeight: 700,
  marginTop: 24,
  marginBottom: 24,
});