import * as Yup from "yup";

export const validationSchema = Yup.object({
  position: Yup.string().required("Position is required"),
});