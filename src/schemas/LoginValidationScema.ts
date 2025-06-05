import * as Yup from "yup";

const validationLoginSchema = Yup.object({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric")
    .required("Required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Required")
    .matches(/\d/, "Password must include at least one number")
    .required("Required"),
});

export default validationLoginSchema;