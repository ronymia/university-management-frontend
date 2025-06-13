"use client";
import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "./DatePicker";
import { getErrorMessageByPropertyName } from "@/utils/schema-validator";

interface ICustomDatePicker {
  name: string;
  required: boolean;
  label: string;
  placeholder?: string;
}

export default function CustomDatePicker({
  name,
  required,
  label,
  placeholder,
}: ICustomDatePicker) {
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
        render={({ field }) => (
          <DatePicker
            // value={field.value}
            {...field}
            label={label}
            required={required}
            // error={errorMessage}
            placeholder={placeholder}
          />
        )}
      />
      {/* ERROR MESSAGE */}
      <small className={`text-error font-medium`}>{errorMessage}</small>
    </div>
  );
}
