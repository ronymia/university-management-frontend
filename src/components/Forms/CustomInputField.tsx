'use client';
// import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { getErrorMessageByPropertyName } from '@/utils/schema-validator';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface ICustomInputFieldProps {
    dataTestId?: string;
    name: string;
    type?: 'text' | 'email' | 'password';
    size?: string;
    id?: string;
    placeholder: string;
    required: boolean;
    label?: string;
    disabled?: boolean;
    pattern?: string;
    maxLength?: number;
    minLength?: number;
    max?: number;
    min?: number;
    wrapperClassName?: string;
    fieldClassName?: string;
    labelClass?: string;
    isValidateEmail?: boolean;
    error?: any;
}

export default function CustomInputField({
    dataTestId,
    type = 'text',
    name,
    id,
    placeholder,
    required = false,
    label,
    disabled = false,
    wrapperClassName,
    fieldClassName,
    labelClass,
    maxLength,
    minLength,
    max,
    min,
    pattern,
}: ICustomInputFieldProps) {
    // STE TO MANAGE PASSWORD VISIBILITY
    const [isVisible, setIsVisible] = useState(false);

    const {
        control,
        formState: { errors },
    } = useFormContext();

    const errorMessage = getErrorMessageByPropertyName(errors, name);

    return (
        <div className={`${wrapperClassName && wrapperClassName} w-full flex flex-col gap-y-1.5`}>
            {/* LABEL */}
            {label && (
                <label data-auto={`label-${dataTestId}`} htmlFor={id} className="">
                    <span className={`text-sm font-semibold ${labelClass}`}>
                        {label}{' '}
                        {label && required && !disabled && (
                            <span className="text-error font-bold">*</span>
                        )}
                    </span>
                </label>
            )}

            {/* INPUT FIELD */}
            <Controller
                control={control}
                name={`${name}`}
                rules={{
                    required: {
                        value: required,
                        message: `${label} is required`,
                    },
                    ...(typeof maxLength === 'number'
                        ? {
                              maxLength: {
                                  value: maxLength,
                                  message: `${label} must be at most ${maxLength} characters long`,
                              },
                          }
                        : {}),
                    ...(typeof minLength === 'number'
                        ? {
                              minLength: {
                                  value: minLength,
                                  message: `${label} must be at least ${minLength} characters long`,
                              },
                          }
                        : {}),
                    ...(typeof max === 'number'
                        ? {
                              max: {
                                  value: max,
                                  message: `${label} must be at most ${max}`,
                              },
                          }
                        : {}),
                    min: {
                        value: min ?? 0,
                        message: `${label} must be at least ${min}`,
                    },
                    ...(pattern
                        ? {
                              pattern: {
                                  value: new RegExp(pattern),
                                  message: `${label} is not valid`,
                              },
                          }
                        : {}),
                }}
                render={({ field }) =>
                    type === 'password' ? (
                        <div className={`w-full relative z-50`}>
                            {isVisible ? (
                                <AiOutlineEyeInvisible
                                    onClick={() => {
                                        setIsVisible(!isVisible);
                                    }}
                                    className="absolute right-3 text-xl top-1/2 -translate-y-1/2 z-10"
                                />
                            ) : (
                                <AiOutlineEye
                                    onClick={() => {
                                        setIsVisible(!isVisible);
                                    }}
                                    className="absolute right-3 text-xl top-1/2 -translate-y-1/2 z-10"
                                />
                            )}
                            <input
                                {...field}
                                disabled={disabled}
                                id={id}
                                type={isVisible ? 'text' : 'password'}
                                value={field.value ?? ''}
                                placeholder={`${placeholder ?? ''}`}
                                aria-invalid={!!errorMessage}
                                aria-required={required}
                                autoComplete="new-password"
                                className={`h-11 bg-base-300 w-full p-2 focus:ring-2 focus:ring-primary rounded-md disabled:px-1 disabled:py-0 disabled:border-2 disabled:border-solid disabled:text-gray-700 ${
                                    fieldClassName ? fieldClassName : ''
                                } 
                ${!!errorMessage ? 'border border-error' : 'border border-[#d9d9d9]'}`}
                            />
                        </div>
                    ) : (
                        <input
                            {...field}
                            disabled={disabled}
                            id={id}
                            value={field.value ?? ''}
                            type={type}
                            name={name}
                            placeholder={`${placeholder ?? ''}`}
                            aria-invalid={!!errorMessage}
                            aria-required={required}
                            className={`h-11 bg-base-300 w-full p-2 focus:ring-2 focus:ring-primary rounded-md disabled:px-1 disabled:py-0 disabled:border-2 disabled:border-solid disabled:text-gray-700 ${
                                fieldClassName ? fieldClassName : ''
                            } 
              ${!!errorMessage ? ' border border-error' : 'border border-[#d9d9d9]'}`}
                        />
                    )
                }
            />
            {/* ERROR MESSAGE */}
            {!!errorMessage && <small className={`text-error font-medium`}>{errorMessage}</small>}
        </div>
    );
}
