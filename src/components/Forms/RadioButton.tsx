"use client";

import { BiSolidCheckCircle } from "react-icons/bi";

interface ICustomRadioButton {
  options: {
    name: string;
    title: string;
    value: string;
    Icon?: React.ReactNode;
  }[];
  onChange?: (e) => void;
  wrapperClassName?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  defaultChecked?: string;
  inputFieldClassName?: string;
  testId?: string;
  error?: string;
}

export default function RadioButton({
  options = [],
  onChange = (e) => e,
  wrapperClassName = "",
  label = "",
  disabled = false,
  required = false,
  defaultChecked,
  inputFieldClassName,
  testId,
  error,
}: ICustomRadioButton) {
  return (
    <>
      {/* LABEL */}
      {label && (
        <label
          // htmlFor={testId}
          data-testid={`${testId}_label`}
          className={`label-text text-md font-bold`}
        >
          {label}{" "}
          {required && <span className="text-error font-bold text-md">*</span>}
        </label>
      )}

      <div className={`grid grid-cols-2 gap-x-2 ${inputFieldClassName}`}>
        {options.map(({ name, title, value, Icon }, index) => {
          const isChecked = defaultChecked === value;
          return (
            <div key={index} className="w-full">
              <input
                type="radio"
                name={name}
                onChange={onChange}
                value={value}
                className="hidden"
                id={`${name}${value}`}
                defaultChecked={isChecked}
                disabled={disabled}
                aria-checked={isChecked}
                aria-labelledby={`${name}${value}-label`}
              />

              <label
                htmlFor={`${name}${value}`}
                id={`${name}${value}-label`}
                className={`${
                  isChecked
                    ? "relative bg-primary/20 border-primary font-bold text-base-300"
                    : " border-primary/20 text-primary"
                } justify-center sm:flex-col lg:flex-row gap-x-1 rounded-lg border-2 px-5 h-11 flex items-center cursor-pointer checked:text-primary drop-shadow`}
              >
                {isChecked && (
                  <BiSolidCheckCircle className="absolute bg-white rounded-full -right-2 -top-2 text-xl text-primary" />
                )}
                {Icon && <Icon className="text-md" />}
                <span
                  className={`text-sm ${!isChecked ? "" : "text-primary "}`}
                >
                  {title}
                </span>
              </label>
            </div>
          );
        })}
      </div>

      {/* Error Message */}
      {/* {error && (
        <p
          data-testid={`${testId}_error_message`}
          id={`${testId}-error`} // ID to link with input field's aria-describedby
          role="alert"
          aria-label="error message"
          aria-live="assertive" // Ensures screen readers announce the message immediately
          aria-atomic="true" // Ensures the whole message is read out
          className="text-xs text-red-500"
        >
          {error}
        </p>
      )} */}
    </>
  );
}
