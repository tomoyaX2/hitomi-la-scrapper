import * as Yup from "yup";
import { SignUpFormData } from "../store/types";

const verificationFormSchema: Yup.SchemaOf<SignUpFormData> = Yup.object()
  .shape({
    code: Yup.string().required("Required"),
  })
  .defined();

export { verificationFormSchema };
