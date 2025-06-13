"use client";
import { Controller, useFormContext } from "react-hook-form";
import { getErrorMessageByPropertyName } from "@/utils/schema-validator";

interface ICustomFileUpload {
  id: string;
  name: string;
  required: boolean;
  label: string;
  dataTestId?: string;
  wrapperClassName?: string;
  labelClass?: string;
  disabled?: boolean;
}

export default function CustomFileUpload({
  id,
  name,
  required,
  label,
  dataTestId,
  wrapperClassName,
  labelClass,
  disabled,
}: ICustomFileUpload) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <div
      className={`${
        wrapperClassName && wrapperClassName
      } w-full flex flex-col gap-y-1.5`}
    >
      {/* LABEL */}
      {label && (
        <label data-auto={`label-${dataTestId}`} htmlFor={id} className="">
          <span className={`text-base font-semibold ${labelClass}`}>
            {label}{" "}
            {label && required && !disabled && (
              <span className="text-error font-bold text-md">*</span>
            )}
          </span>
        </label>
      )}
      <Controller
        control={control}
        name={`${name}`}
        render={({ field }) => (
          <input
            type="file"
            id="file"
            {...field}
            className={`h-11 w-full border border-[#D9D9D9] rounded-md`}
          />
        )}
      />
      {/* ERROR MESSAGE */}
      <small className={`text-error`}>{errorMessage}</small>
    </div>
  );
}
