import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter a valid email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password is too short - should be at least 8 characters"),
});
