'use client';
import { Controller, useFormContext } from 'react-hook-form';
import { getErrorMessageByPropertyName } from '@/utils/schema-validator';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ICustomFileUpload {
    id: string;
    name: string;
    required?: boolean;
    label: string;
    dataTestId?: string;
    wrapperClassName?: string;
    labelClass?: string;
    disabled?: boolean;
}

export default function CustomImageUpload({
    id,
    name,
    label = 'upload',
    wrapperClassName,
}: ICustomFileUpload) {
    const {
        control,
        formState: { errors },
        watch,
    } = useFormContext();

    const imageFile = watch(name);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (imageFile instanceof File) {
            const url = URL.createObjectURL(imageFile);
            setPreviewUrl(url);

            return () => URL.revokeObjectURL(url);
        } else {
            setPreviewUrl(null);
        }
    }, [imageFile]);

    const errorMessage = getErrorMessageByPropertyName(errors, name);

    return (
        <div
            className={`${wrapperClassName || ''} w-full flex flex-col gap-y-1.5 items-center justify-center`}
        >
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <label
                        htmlFor={id}
                        className={`w-[128px] h-[128px] rounded-full flex flex-col items-center justify-center cursor-pointer border-1 ${
                            previewUrl ? 'border-solid' : 'border-dotted'
                        } border-primary hover:border-primary transition-colors bg-base-300`}
                    >
                        {previewUrl ? (
                            <Image
                                src={previewUrl}
                                alt="Uploaded"
                                className="w-full h-full object-cover rounded-full p-0.5"
                                height={128}
                                width={128}
                            />
                        ) : (
                            <>
                                <span className="text-primary text-2xl">+</span>
                                <span className="text-primary">{label}</span>
                            </>
                        )}
                        <input
                            id={id}
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                field.onChange(file);
                                e.target.value = ''; // allows re-upload of same file
                            }}
                        />
                    </label>
                )}
            />

            {/* ERROR MESSAGE */}
            <small className="text-error">{errorMessage}</small>
        </div>
    );
}
