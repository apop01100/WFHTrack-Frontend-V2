import * as Yup from "yup";

export const validationSchema = Yup.object({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  username: Yup.string().required("Required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Required")
  .matches(/\d/, "Password must include at least one number")
  .required("Required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
  position: Yup.string().required("Required"),
});