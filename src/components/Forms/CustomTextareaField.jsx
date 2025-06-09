import { Controller, useFormContext } from "react-hook-form";

export default function CustomTextareaField({
  dataAuto,
  name,
  type,
  id,
  placeholder,
  required = true,
  label,
  disabled = false,
  wrapperClassName,
  fieldClassName,
  labelClass,
  height = "h-32"
}) {
  const {
    control,
    formState: { errors }
  } = useFormContext();
  return (
    <div
      className={`${wrapperClassName && wrapperClassName} w-full flex flex-col gap-y-1.5`}
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
          required: { value: required, message: `${label} is required` }
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
            type={type}
            name={name}
            placeholder={`${placeholder}${required ? "*" : ""}`}
            className={`input bg-base-300 w-full ${
              disabled &&
              `px-1 py-0 border-2 border-solid disabled:text-gray-700 `
            }  focus:outline-primary rounded-md ${fieldClassName ? fieldClassName : ""} ${height}`}
            // ${error ? " border-red-500" : ""}
          />
        )}
      />
      {/* ERROR MESSAGE */}
      <small className={`text-error`}>{errors[name]?.message}</small>
    </div>
  );
}
