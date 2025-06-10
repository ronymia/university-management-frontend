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
  multipleSelect = false,
  isLoading = false,
  ...props
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
        name={name}
        render={({ field }) => {
          console.log({ fieldValue: field.value });

          const selectedValue = multipleSelect
            ? options?.filter((item) => field.value?.includes(item.value)) ?? []
            : options?.find((item) => item.value === field.value) ?? null;

          return (
            <Select
              {...field}
              multipleSelect={multipleSelect}
              isLoading={isLoading}
              id={id}
              name={name}
              value={selectedValue}
              onChange={(value) => {
                console.log({ value });
                if (multipleSelect) {
                  const selected = value?.map((item) => item.value) ?? [];
                  field.onChange(selected);
                } else {
                  field.onChange(value?.value ?? "");
                }
              }}
              label={label}
              required={required}
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
