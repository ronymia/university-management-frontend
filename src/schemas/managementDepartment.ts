import * as yup from "yup";

export const managementDepartmentSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
});
