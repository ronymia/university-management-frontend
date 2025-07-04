'use client';
import { Controller, useFormContext } from 'react-hook-form';
import { getErrorMessageByPropertyName } from '@/utils/schema-validator';
import RadioButton from './RadioButton';

interface ICustomRadioButton {
    options: {
        name: string;
        title: string;
        value: string;
        Icon?: React.ReactNode;
    }[];
    id: string;
    name: string;
    required: boolean;
    label: string;
    wrapperClassName?: string;
    disabled?: boolean;
    inputFieldClassName?: string;
}

export default function CustomRadioButton({
    name,
    options,
    required,
    label,
    wrapperClassName,
    disabled,
    inputFieldClassName,
}: ICustomRadioButton) {
    const {
        control,
        formState: { errors },
    } = useFormContext();
    const errorMessage = getErrorMessageByPropertyName(errors, name);

    return (
        <div className={`${wrapperClassName} flex flex-col justify-start gap-y-2`}>
            <Controller
                control={control}
                name={`${name}`}
                render={({ field }) => (
                    <RadioButton
                        defaultChecked={field.value}
                        {...field}
                        label={label}
                        required={required}
                        options={options}
                        wrapperClassName={wrapperClassName}
                        disabled={disabled}
                        inputFieldClassName={inputFieldClassName}
                        error={errorMessage}
                    />
                )}
            />
            {/* ERROR MESSAGE */}
            {/* <small className={`text-error`}>{errorMessage}</small> */}
        </div>
    );
}
