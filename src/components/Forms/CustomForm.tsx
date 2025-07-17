'use client';

import { IGenericErrorResponse } from '@/types';
import { ReactElement, ReactNode } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import FormActionButton from './FormActionButton';

type FormConfig = {
    defaultValues?: Record<string, any>;
    resolver?: any;
};

type FormProps = {
    children?: ReactElement | ReactNode;
    submitHandler: SubmitHandler<any>;
    className?: string;
    cancelHandler?: () => void;
    dataAuto?: string;
    isPending?: boolean;
    showFormActionButton?: boolean;
    actionButtonClassName?: string;
} & FormConfig;

export default function CustomForm({
    children,
    submitHandler,
    defaultValues,
    resolver,
    className,
    cancelHandler,
    showFormActionButton = true,
    actionButtonClassName,
}: FormProps) {
    const formConfig: FormConfig = {};

    if (defaultValues) formConfig['defaultValues'] = defaultValues;
    if (resolver) formConfig['resolver'] = resolver;
    const methods = useForm<FormConfig>(formConfig);

    const {
        handleSubmit,
        setError,
        formState: { isLoading, isSubmitting, isValidating },
    } = methods;

    const onSubmit = async (data: any) => {
        try {
            await Promise.resolve(submitHandler(data));
            methods.reset();
        } catch (err) {
            methods.reset(undefined, { keepValues: true });
            const error = err as IGenericErrorResponse;

            // console.log("form error", { error });

            if (error.statusCode === 422) {
                error.errorMessages?.forEach((err) => {
                    if (Array.isArray(err.path)) {
                        setError(err.path as any, { type: 'manual', message: err.message });
                    } else {
                        const fields = (err?.path as string)?.replace(/`/g, '').split(',');

                        fields?.forEach((field) => {
                            setError(field as any, { type: 'manual', message: err.message });
                        });
                    }
                });
            }
        }
    };

    // useEffect(() => {
    //   if (defaultValues) reset(defaultValues);
    // }, [defaultValues, reset]);

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className={className}>
                {children}
                {showFormActionButton ? (
                    <FormActionButton
                        isLoading={isLoading || isValidating || isSubmitting}
                        cancelHandler={cancelHandler}
                        className={actionButtonClassName}
                    />
                ) : null}
            </form>
        </FormProvider>
    );
}
