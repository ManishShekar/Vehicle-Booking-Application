import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schemas/loginSchema";
import { LoginButton, LoginCard, PageContainer, Title, SubTitle } from "./Login.styles";
import type { LoginRequest } from "../../types/authTypes";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { loginUser } from "../../redux/auth/authThunk";
import { ROUTES, ROLES } from "../../utils/constants";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading, role, isAuthenticated, error } = useAppSelector(
    (state) => state.auth
  );

  const { control, handleSubmit } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      await dispatch(loginUser(data)).unwrap();
    } catch {
      // handled in Redux state
    }
  };

  useEffect(() => {
    if (!isAuthenticated || !role) return;
    if (role === ROLES.ADMIN) {
      navigate(ROUTES.MANAGE_VEHICLES, { replace: true });
    } else {
      navigate(ROUTES.VEHICLES, { replace: true });
    }
  }, [isAuthenticated, role, navigate]);

  return (
    <PageContainer>
      <LoginCard>
        <Title variant="h5">Vehicle Management</Title>
        <SubTitle>Sign in to continue</SubTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Password"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            {error && <Typography color="error">{error}</Typography>}

            <LoginButton variant="contained" type="submit" disabled={loading} fullWidth>
              {loading ? "Signing In..." : "Login"}
            </LoginButton>

            <Button component={Link} to={ROUTES.REGISTER}>
              Create Account
            </Button>
          </Stack>
        </form>
      </LoginCard>
    </PageContainer>
  );
};

export default Login;