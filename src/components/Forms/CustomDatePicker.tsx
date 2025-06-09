import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "./DatePicker";
import { getErrorMessageByPropertyName } from "@/utils/schema-validator";

interface ICustomDatePicker {
  name: string;
  required: boolean;
  label: string;
}

export default function CustomDatePicker({
  name,
  required,
  label,
}: ICustomDatePicker) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <div>
      <Controller
        rules={{
          required: {
            value: required,
            message: `${label} is required`,
          },
        }}
        control={control}
        name={`${name}`}
        render={({ field }) => (
          <DatePicker
            // value={field.value}
            {...field}
            label={label}
            required={required}
          />
        )}
      />
      {/* ERROR MESSAGE */}
      <small className={`text-error`}>{errorMessage}</small>
    </div>
  );
}
