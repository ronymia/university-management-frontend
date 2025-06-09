import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { Controller, useFormContext } from "react-hook-form";

interface ICustomTextareaField {
  dataAuto?: string;
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  label?: string;
  disabled?: boolean;
  wrapperClassName?: string;
  fieldClassName?: string;
  labelClass?: string;
  height?: string;
}

export default function CustomTextareaField({
  dataAuto,
  id,
  name,
  placeholder,
  required = true,
  label,
  disabled = false,
  wrapperClassName,
  fieldClassName,
  labelClass,
  height = "h-32",
}: ICustomTextareaField) {
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
        <label data-auto={`label-${dataAuto}`} htmlFor={id} className="label">
          <span className={`label-text text-md font-bold ${labelClass}`}>
            {label}{" "}
            {label && required && !disabled && (
              <span className="text-error font-bold text-md">*</span>
            )}
          </span>
        </label>
      )}

      {/* INPUT FIELD */}
      <Controller
        rules={{
          required: { value: required, message: `${label} is required` },
        }}
        control={control}
        name={`${name}`}
        render={({ field }) => (
          <textarea
            {...field}
            data-auto={dataAuto}
            disabled={disabled}
            id={id}
            value={field.value ?? ""}
            name={name}
            placeholder={`${placeholder}${required ? "*" : ""}`}
            className={`${height} bg-base-300 w-full p-2 focus:ring-2 focus:ring-primary rounded-md disabled:px-1 disabled:py-0 disabled:border-2 disabled:border-solid disabled:text-gray-700 ${
              fieldClassName ? fieldClassName : ""
            } 
            ${
              !!errorMessage
                ? " border border-error"
                : "border border-[#d9d9d9]"
            }`}
          />
        )}
      />
      {/* ERROR MESSAGE */}
      <small className={`text-error font-medium`}>{errorMessage}</small>
    </div>
  );
}
