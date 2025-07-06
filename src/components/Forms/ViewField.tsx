import React from 'react';

type IViewFieldProps = {
    label: string;
    value: any;
    className?: string;
};

export default function ViewField({ label, value, className }: IViewFieldProps) {
    return (
        <div className={`flex flex-col gap-0.5 ${className ?? ''}`}>
            <span className={`font-semibold text-sm text-gray-700`}>{label ?? ''}</span>
            <span className={`text-base font-semibold drop-shadow-xs`}>{value ?? ''}</span>
        </div>
    );
}
