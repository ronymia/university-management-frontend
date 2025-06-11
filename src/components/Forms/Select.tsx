"use client";
import useClickOutside from "@/hooks/useClickOutside";
import { useState, useEffect } from "react";
import { RxCrossCircled } from "react-icons/rx";

type IOption = { label: string; value: string | number };

interface ISelectProps {
  id?: any;
  name?: string;
  placeholder?: string;
  value?: any;
  onChange?: (value: IOption | IOption[]) => void;
  error?: string;
  label?: string;
  wrapperClassName?: string;
  fieldClassName?: string;
  testId?: string;
  required?: boolean;
  labelClass?: string;
  dataTestId?: string;
  disabled?: boolean;
  multipleSelect?: boolean;
  isLoading: boolean;
  CustomCloseIcon?: any;
  options: IOption[];
}
export default function Select({
  id,
  name,
  placeholder,
  value,
  onChange,
  error,
  label,
  wrapperClassName,
  fieldClassName = "",
  testId,
  required,
  labelClass,
  dataTestId,
  disabled,
  CustomCloseIcon = RxCrossCircled,
  options = [],
  multipleSelect = false,
  isLoading,
}: ISelectProps) {
  const [selectedOptions, setSelectedOptions] = useState<IOption[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useClickOutside(() => setIsOpen(false));

  // SET DEFAULT value
  useEffect(() => {
    if (value && !isLoading) {
      // console.log("first", value);
      setSelectedOptions(Array.isArray(value) ? value : [value]);
    }
  }, [value, isLoading]);
  // console.log({ selectedOptions });

  // HANDLE OPTION SELECTION
  const handleSelect = (option: IOption) => {
    // IF ALREADY SELECTED
    if (
      selectedOptions.some(
        (item) => item?.value === option?.value && !multipleSelect
      )
    ) {
      setSelectedOptions([]);
      onChange?.(null);
      setIsOpen(false); // Close the options list after selection
      return;
    } else if (
      selectedOptions.some(
        (item) => item?.value === option?.value && multipleSelect
      )
    ) {
      const newSelectedOptions = selectedOptions.filter(
        (item) => item?.value !== option?.value
      );
      setSelectedOptions(newSelectedOptions);
      onChange?.(newSelectedOptions);
      setIsOpen(false); // Close the options list after selection
      return;
    }

    if (multipleSelect) {
      setSelectedOptions([...selectedOptions, option]);
      if (onChange) {
        onChange([...selectedOptions, option]);
      }
      setIsOpen(false); // Close the options list after selection
    } else {
      setSelectedOptions([option]);
      if (onChange) {
        onChange(option);
      }
      setIsOpen(false); // Close the options list after selection
    }
  };

  // HANDLE REMOVE
  const handleRemove = (removedOption: IOption) => {
    if (!multipleSelect) {
      setSelectedOptions([]);
      if (onChange) {
        onChange?.(null);
      }
      return;
    }
    const newSelectedOptions = selectedOptions.filter(
      (item) => item?.value !== removedOption?.value
    );
    setSelectedOptions(newSelectedOptions);
    if (onChange) {
      onChange(newSelectedOptions);
    }
  };

  return (
    <div
      ref={selectRef}
      data-testid={`${testId}_container`}
      className={`${wrapperClassName} flex flex-col justify-start gap-y-1.5 relative`}
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

      {/* SELECTED OPTIONS */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex flex-wrap gap-1 text-base-300 bg-secondary rounded-md focus:ring-2  border border-solid p-1 border-[#d9d9d9]  ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-[#d9d9d9] focus:border-primary"
        } ${fieldClassName} ${
          selectedOptions.length === 0 ? "h-11" : "h-11 py-[0.35rem]"
        } ${isOpen ? "border-2 border-primary" : ""} cursor-pointer`}
        aria-expanded={isOpen}
        aria-controls={``}
        aria-haspopup="listbox"
        role="combobox"
      >
        {selectedOptions?.map((option) => (
          <span
            key={option.value}
            className={` bg-primary/10 text-primary px-2 rounded cursor-pointer inline-flex items-center justify-center gap-3 py-1 text-sm drop-shadow-2xl font-medium`}
          >
            {option?.label}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent the options list from toggling
                handleRemove(option);
              }}
              aria-label={`Remove ${option?.label}`}
              className={``}
            >
              <CustomCloseIcon
                className={`text-red-500 hover:bg-red-500 rounded-full hover:text-base-300 `}
              />
            </button>
          </span>
        ))}
        {selectedOptions.length === 0 && (
          <span className="text-gray-500 pt-1 pl-1">
            {placeholder || `Select an option`}
          </span>
        )}
      </div>

      {/* ERROR MESSAGE */}
      {!!error ? (
        <small
          className="text-error font-medium"
          data-testid={`${testId}_error`}
        >
          {error}
        </small>
      ) : null}

      {/* OPTIONS LIST */}
      {isOpen && (
        <div
          className={`absolute top-20 z-50 w-full bg-base-300 shadow-lg drop-shadow-2xs rounded overflow-y-auto max-h-80 border border-primary/10`}
          role="listbox"
        >
          {/* FILTERED OPTIONS */}
          {options?.length > 0 ? (
            options.map((option) => (
              <div
                key={option?.value}
                onClick={() => handleSelect(option)}
                className={`cursor-pointer px-3 py-2 m-2  hover:bg-primary rounded-md hover:text-base-300 drop-shadow-lg
                        ${
                          selectedOptions.some(
                            (item) => item?.value === option?.value
                          )
                            ? "bg-primary text-base-300"
                            : "text-gray-700"
                        }
                    `}
                role="option"
                aria-selected={selectedOptions.some(
                  (item) => item?.value === option?.value
                )}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500">No options found</div>
          )}
        </div>
      )}
    </div>
  );
}
