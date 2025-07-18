import React from 'react';
import { FaSync } from 'react-icons/fa';

export default function FormActionButton({
    isLoading,
    disabled,
    cancelHandler,
    className,
}: {
    isLoading: boolean;
    disabled?: boolean;
    className?: string;
    cancelHandler?: () => void;
}) {
    return (
        <div
            className={`flex flex-col md:flex-row justify-end gap-3 mt-auto w-full ${className ?? ''}`}
        >
            {cancelHandler ? (
                <button
                    type="button"
                    disabled={disabled || isLoading}
                    onClick={cancelHandler}
                    className={`px-3 py-2 border border-primary rounded-lg text-primary drop-shadow-2xl cursor-pointer w-full md:w-xs disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    Cancel
                </button>
            ) : null}
            <button
                type="submit"
                disabled={disabled || isLoading}
                className={`px-3 py-2 bg-primary rounded-lg text-base-300 drop-shadow-2xl cursor-pointer w-full md:w-xs disabled:bg-gray-200 disabled:border disabled:border-primary disabled:cursor-not-allowed relative`}
            >
                {isLoading ? (
                    <FaSync className="text-primary animate-spin absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 opacity-100" />
                ) : (
                    'Submit'
                )}
            </button>
        </div>
    );
}
