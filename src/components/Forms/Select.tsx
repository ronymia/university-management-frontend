'use client';
import useClickOutside from '@/hooks/useClickOutside';
import { AnimatePresence, motion } from 'motion/react';
import { useState, useEffect, ReactNode, ReactElement, RefObject } from 'react';
import { IconType } from 'react-icons';
import { FaSync } from 'react-icons/fa';
import { RxCrossCircled } from 'react-icons/rx';

type IOption = { label: string; value: string | number };

interface ISelectProps {
    position?: 'top' | 'bottom';
    id?: string;
    name?: string;
    placeholder?: string;
    value?: any;
    onChange?: (value: IOption | IOption[] | null) => void;
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
    CustomCloseIcon?: IconType | ReactNode | ReactElement;
    options: IOption[];
}
export default function Select({
    id,
    placeholder,
    value,
    onChange,
    error,
    label,
    wrapperClassName,
    fieldClassName = '',
    testId,
    required,
    labelClass,
    dataTestId,
    disabled,
    CustomCloseIcon = RxCrossCircled,
    options = [],
    multipleSelect = false,
    isLoading,
    position = 'bottom',
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // console.log({ selectedOptions });

    // HANDLE OPTION SELECTION
    const handleSelect = (option: IOption) => {
        // IF ALREADY SELECTED
        if (selectedOptions.some((item) => item?.value === option?.value && !multipleSelect)) {
            setSelectedOptions([]);
            onChange?.(null);
            setIsOpen(false); // Close the options list after selection
            return;
        } else if (
            selectedOptions.some((item) => item?.value === option?.value && multipleSelect)
        ) {
            const newSelectedOptions = selectedOptions.filter(
                (item) => item?.value !== option?.value,
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
            (item) => item?.value !== removedOption?.value,
        );
        setSelectedOptions(newSelectedOptions);
        if (onChange) {
            onChange(newSelectedOptions);
        }
    };

    return (
        <div
            ref={selectRef as RefObject<HTMLDivElement>}
            data-testid={`${testId}_container`}
            className={`${wrapperClassName} flex flex-col justify-start gap-y-1.5 relative`}
        >
            {/* LABEL */}
            {label && (
                <label
                    data-auto={`label-${dataTestId}`}
                    htmlFor={id}
                    className={`text-sm font-medium ${labelClass}`}
                >
                    <span>
                        {label}{' '}
                        {label && required && !disabled && (
                            <span className="text-error font-bold">*</span>
                        )}
                    </span>
                </label>
            )}

            {/* SELECTED OPTIONS */}
            <>
                <ul
                    tabIndex={0}
                    onClick={() => {
                        if (disabled) return;
                        if (!isLoading) setIsOpen(!isOpen);
                    }}
                    className={`relative flex flex-wrap gap-1 text-base-300 bg-secondary rounded-md focus:ring border border-solid p-1 pr-8 focus:ring-primary focus:ring-offset-1 focus:border-primary focus:border-2 ${
                        error ? 'border-red-500' : 'border-[#d9d9d9]'
                    } ${fieldClassName} ${
                        selectedOptions.length === 0 ? 'h-11' : 'min-h-11 py-[0.35rem]'
                    }  ${isLoading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    aria-controls={``}
                    role="combobox"
                >
                    {/* Selected Options */}
                    <AnimatePresence mode="popLayout">
                        {selectedOptions.length > 0 ? (
                            selectedOptions.map((option) => (
                                <motion.li
                                    key={option.value}
                                    layout
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-primary/10 text-primary px-2 rounded cursor-pointer inline-flex items-center justify-center gap-3 py-1 text-sm font-medium drop-shadow-2xl"
                                >
                                    {option.label}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemove(option);
                                        }}
                                        aria-label={`Remove ${option.label}`}
                                    >
                                        {typeof CustomCloseIcon === 'function' ? (
                                            <CustomCloseIcon className="text-red-500 hover:bg-red-500 rounded-full hover:text-base-300" />
                                        ) : (
                                            CustomCloseIcon
                                        )}
                                    </button>
                                </motion.li>
                            ))
                        ) : (
                            <motion.span
                                key="placeholder"
                                layout
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="text-gray-500 pt-1.5 pl-1 text-sm"
                            >
                                {placeholder || `Select an option`}
                            </motion.span>
                        )}
                    </AnimatePresence>

                    {/* Right-side Icon */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        {isLoading ? (
                            <FaSync className={'text-gray-500 animate-spin'} />
                        ) : (
                            <motion.svg
                                initial={false}
                                animate={{ scaleY: isOpen ? -1 : 1 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 35 }}
                                className={`h-5 w-5 text-gray-500`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </motion.svg>
                        )}
                    </div>
                </ul>
            </>

            {/* DROPDOWN OPTIONS LIST */}
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        className={`absolute ${
                            position === 'bottom' ? 'top-full' : 'bottom-full'
                        } mt-1.5 z-50 w-full bg-base-300 shadow-lg drop-shadow-2xs rounded overflow-y-auto max-h-80 border border-primary/10`}
                        role="listbox"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* FILTERED OPTIONS */}
                        {options?.length > 0 ? (
                            options.map((option) => (
                                <motion.li
                                    key={option?.value}
                                    // whileHover={{ scale: 1.02 }}
                                    onClick={() => handleSelect(option)}
                                    className={`cursor-pointer px-3 py-2 m-2  hover:bg-primary rounded-md hover:text-base-300 drop-shadow-lg
                        ${
                            selectedOptions.some((item) => item?.value === option?.value)
                                ? 'bg-primary text-base-300'
                                : 'text-gray-700'
                        }
                    `}
                                    role="option"
                                    aria-selected={selectedOptions.some(
                                        (item) => item?.value === option?.value,
                                    )}
                                >
                                    {option.label}
                                </motion.li>
                            ))
                        ) : (
                            <div className="px-3 py-2 text-gray-500">No options found</div>
                        )}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}
