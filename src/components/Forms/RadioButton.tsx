'use client';

import { IconType } from 'react-icons';
import { BiSolidCheckCircle } from 'react-icons/bi';

interface ICustomRadioButton {
    options: {
        name: string;
        title: string;
        value: string;
        Icon?: React.ReactNode | IconType | React.ReactElement;
    }[];
    onChange?: (e: any) => void;
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
    label = '',
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
                <label data-testid={`${testId}_label`} className={`text-sm font-medium`}>
                    {label} {required && <span className="text-error font-bold">*</span>}
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
                                className={`
                   ${!!error ? 'border border-error' : 'border border-[#d9d9d9]'}
                  ${
                      isChecked
                          ? 'relative bg-primary/20 border-primary font-bold text-base-300'
                          : 'border border-[#d9d9d9] text-primary'
                  } justify-center sm:flex-col lg:flex-row gap-x-1 rounded-lg border px-5 h-11 flex items-center cursor-pointer checked:text-primary`}
                            >
                                {isChecked && (
                                    <BiSolidCheckCircle className="absolute bg-white rounded-full -right-2 -top-2 text-xl text-primary" />
                                )}
                                {Icon &&
                                    (typeof Icon === 'function' ? (
                                        // Icon is a component (IconType)
                                        <Icon className="text-md" />
                                    ) : (
                                        // Icon is a React element or node
                                        Icon
                                    ))}
                                <span
                                    className={`text-sm drop-shadow ${!isChecked ? '' : 'text-primary '}`}
                                >
                                    {title}
                                </span>
                            </label>
                        </div>
                    );
                })}
            </div>

            {/* Error Message */}
            {!!error && (
                <small
                    data-testid={`${testId}_error_message`}
                    id={`${testId}-error`} // ID to link with input field's aria-describedby
                    role="alert"
                    aria-label="error message"
                    aria-live="assertive" // Ensures screen readers announce the message immediately
                    aria-atomic="true" // Ensures the whole message is read out
                    className=" text-error font-medium"
                >
                    {error}
                </small>
            )}
        </>
    );
}
