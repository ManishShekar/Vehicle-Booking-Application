import { styled } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";

export const NavTitle = styled(Typography)({
  flexGrow: 1,
  fontWeight: 700,
  fontSize: "0.95rem",
  color: "#0F172A",
  letterSpacing: "-0.01em",
});

export const NavActions = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
});

export const NavButton = styled(Button)({
  color: "#161718",
  fontWeight: 500,
  fontSize: "0.875rem",
  padding: "6px 12px",
  borderRadius: 6,
  "&:hover": {
    backgroundColor: "#F1F5F9",
    color: "#0F172A",
  },
});

export const WelcomeText = styled(Typography)({
  fontSize: "0.8rem",
  fontWeight: 500,
  color: "#161718",
  padding: "0 8px",
  borderLeft: "1px solid #E2E8F0",
  marginLeft: 4,
});

export const LogoutButton = styled(Button)({
  fontSize: "0.875rem",
  fontWeight: 600,
  color: "#161718",
  borderRadius: 6,
  padding: "6px 14px",
  border: "1px solid #E2E8F0",
  "&:hover": {
    backgroundColor: "#FEF2F2",
    color: "#DC2626",
    borderColor: "#FECACA",
  },
});