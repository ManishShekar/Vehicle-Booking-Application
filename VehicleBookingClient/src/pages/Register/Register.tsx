import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Alert,
  Button,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { registerSchema } from "../../schemas/registerSchema";

import {
  PageContainer,
  RegisterButton,
  RegisterCard,
  Title,
} from "./Register.styles";

import type { RegisterRequest } from "../../types/authTypes";

import { useAppDispatch } from "../../hooks/useAppDispatch";

import { registerUser } from "../../redux/auth/authThunk";

import { ROUTES } from "../../utils/constants";

const Register = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [snackbarOpen, setSnackbarOpen] =
    useState(false);

  const {
    control,
    handleSubmit,
    setError,
  } = useForm<RegisterRequest>({
    resolver: yupResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (
    data: RegisterRequest
  ) => {
    try {
      setLoading(true);

      await dispatch(
        registerUser(data)
      ).unwrap();

      setSnackbarOpen(true);

      setTimeout(() => {
        navigate(ROUTES.LOGIN);
      }, 1500);
    } catch (error) {
      setError("email", {
        message: String(error),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <RegisterCard>

        <Title variant="h5">
          Register
        </Title>

        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={2}>

            <Controller
              name="name"
              control={control}
              render={({
                field,
                fieldState,
              }) => (
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error?.message
                  }
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({
                field,
                fieldState,
              }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error?.message
                  }
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({
                field,
                fieldState,
              }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Password"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error?.message
                  }
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({
                field,
                fieldState,
              }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Confirm Password"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error?.message
                  }
                />
              )}
            />

            <RegisterButton
              variant="contained"
              type="submit"
              fullWidth
              disabled={loading}
            >
              {loading
                ? "Registering..."
                : "Register"}
            </RegisterButton>

          <Button
  component={Link}
  to={ROUTES.LOGIN}
>
  Already have an account?
</Button>

          </Stack>
        </form>

      </RegisterCard>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
      >
        <Alert severity="success">
          Registration Successful
        </Alert>
      </Snackbar>

    </PageContainer>
  );
};

export default Register;