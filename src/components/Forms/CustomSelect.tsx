"use client";
import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select from "./Select";

type IOption = { label: string; value: string | number };

interface ICustomSelectProps {
  position?: "top" | "bottom";
  id?: string;
  name: string;
  placeholder?: string;
  defaultValues?: any;
  changeHandler?: (value: any) => void;
  error?: string;
  label?: string;
  wrapperClassName?: string;
  fieldClassName?: string;
  testId?: string;
  required: boolean;
  labelClass?: string;
  dataTestId?: string;
  disabled?: boolean;
  multipleSelect?: boolean;
  isLoading: boolean;
  CustomCloseIcon?: any;
  options: IOption[];
}

export default function CustomSelect({
  id,
  name,
  required,
  label,
  options,
  multipleSelect = false,
  isLoading = false,
  changeHandler,
  position,
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
          // console.log({ fieldValue: field.value });

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
              onChange={(onSelectedValue) => {
                // console.log({ value });
                if (multipleSelect) {
                  const selected = Array.isArray(onSelectedValue)
                    ? onSelectedValue?.map((item) => item.value)
                    : [];
                  field.onChange(selected);
                  changeHandler?.(selected);
                } else {
                  field.onChange((onSelectedValue as IOption)?.value ?? "");
                  changeHandler?.((onSelectedValue as IOption)?.value ?? "");
                }
              }}
              label={label}
              required={required}
              options={options}
              position={position}
            />
          );
        }}
      />

      {/* ERROR MESSAGE */}
      <small className={`text-error font-medium`}>{errorMessage}</small>
    </div>
  );
}
