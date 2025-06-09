import { Controller, useFormContext } from "react-hook-form";
import { getErrorMessageByPropertyName } from "@/utils/schema-validator";

interface ICustomFileUpload {
  name: string;
  required: boolean;
  label: string;
}

export default function CustomFileUpload({
  name,
  required,
  label,
}: ICustomFileUpload) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <div>
      <Controller
        control={control}
        name={`${name}`}
        render={({ field }) => <input type="file" id="file" {...field} />}
      />
      {/* ERROR MESSAGE */}
      <small className={`text-error`}>{errorMessage}</small>
    </div>
  );
}
