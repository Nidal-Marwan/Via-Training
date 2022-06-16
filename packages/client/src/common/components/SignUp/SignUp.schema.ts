import * as Yup from "yup";

export const SignupSchema = Yup.object({
  name: Yup.string().required("Requierd"),
  phone: Yup.number().required("Requierd").min(10, "Invalid phone number"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Must be 8 character or more")
    .required("Required"),
});
