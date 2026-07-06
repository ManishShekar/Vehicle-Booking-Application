import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup
    .string()
    .required("Name is required.")
    .max(100, "Maximum 100 characters allowed."),

  email: yup
    .string()
    .required("Email is required.")
    .email("Enter a valid email."),

  password: yup
    .string()
    .required("Password is required.")
    .min(6, "Password must be at least 6 characters."),

  confirmPassword: yup
    .string()
    .required("Confirm Password is required.")
    .oneOf(
      [yup.ref("password")],
      "Passwords do not match."
    ),
});