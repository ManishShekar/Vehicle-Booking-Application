import { styled } from "@mui/material/styles";
import { Box, Button, Card, Typography } from "@mui/material";

export const PageContainer = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #e3f0ff 0%, #f0f2f5 100%)",
});

export const LoginCard = styled(Card)({
  width: 420,
  padding: "40px 36px",
  borderRadius: 16,
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
});

export const Title = styled(Typography)({
  textAlign: "center",
  marginBottom: 4,
  fontWeight: 700,
});

export const SubTitle = styled(Typography)({
  textAlign: "center",
  marginBottom: 24,
  color: "#666",
  fontSize: 14,
});

export const LoginButton = styled(Button)({
  height: 46,
  fontSize: 15,
  borderRadius: 8,
  marginTop: 8,
});