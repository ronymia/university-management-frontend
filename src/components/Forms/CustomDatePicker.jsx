import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "./DatePicker";

export default function CustomDatePicker({ name, required, label }) {
  const {
    control,
    formState: { errors }
  } = useFormContext();
  return (
    <div>
      <Controller
        rules={{
          required: {
            value: required,
            message: `${label} is required`
          }
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
      <small className={`text-error`}>{errors[name]?.message}</small>
    </div>
  );
}
