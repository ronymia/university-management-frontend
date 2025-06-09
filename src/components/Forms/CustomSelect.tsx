import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select from "./Select";

interface ICustomSelectProps {
  id?: any;
  name: string;
  placeholder?: string;
  defaultValues?: any;
  handleOnSelect?: (value) => void;
  error?: string;
  label?: string;
  wrapperClassName?: string;
  fieldClassName?: string;
  testId?: string;
  required?: boolean;
  labelClass?: string;
  dataTestId?: string;
  disabled?: boolean;
  CustomCloseIcon?: any;
  options?: {
    label: string;
    value: string | number;
  }[];
}

export default function CustomSelect({
  id,
  name,
  required,
  label,
  options,
}: ICustomSelectProps) {
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
        render={({ field }) => {
          return (
            <Select
              {...field}
              value={
                field.value
                  ? options?.find((item) => item.value === field.value)
                  : []
              }
              id={id}
              name={name}
              onChange={(value) => {
                console.log({ value });
                field.onChange(value?.value ?? "");
              }}
              label={label}
              required={required}
              // error={errorMessage}
              options={options}
            />
          );
        }}
      />
      {/* ERROR MESSAGE */}
      <small className={`text-error`}>{errorMessage}</small>
    </div>
  );
}
