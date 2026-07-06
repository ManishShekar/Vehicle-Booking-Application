import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Card,
  Typography,
} from "@mui/material";

export const PageContainer = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f5f5f5",
});

export const RegisterCard = styled(Card)({
  width: 450,
  padding: 32,
});

export const Title = styled(Typography)({
  textAlign: "center",
  marginBottom: 24,
  fontWeight: 600,
});

export const RegisterButton = styled(Button)({
  marginTop: 24,
  height: 45,
});