"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReactElement, ReactNode, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type FormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type FormProps = {
  children?: ReactElement | ReactNode;
  submitHandler: SubmitHandler<any>;
  className?: string;
  cancelHandler?: () => void;
  confirmButtonLabel?: string;
  dataAuto?: string;
  formActionClassName?: string;
  isPending?: boolean;
} & FormConfig;

export default function CustomForm({
  children,
  submitHandler,
  defaultValues,
  resolver,
  className,
  cancelHandler,
  confirmButtonLabel,
  dataAuto,
  formActionClassName,
  isPending,
}: FormProps) {
  const formConfig: FormConfig = {};

  if (defaultValues) formConfig["defaultValues"] = defaultValues;
  if (resolver) formConfig["resolver"] = resolver;
  const methods = useForm<FormConfig>(formConfig);

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isValidating },
  } = methods;

  const onSubmit = (data: any) => {
    console.log({ data });
    submitHandler(data, reset);
    // reset();
  };

  // useEffect(() => {
  //   if (defaultValues) reset(defaultValues);
  // }, [defaultValues, reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={className}>
        {children}
        {/* SUBMIT */}
        {/* <FormAction
          htmlType={`submit`}
          dataAuto={dataAuto}
          isLoading={isSubmitting || isValidating || isPending}
          confirmButtonLabel={confirmButtonLabel}
          cancelHandler={cancelHandler}
          className={formActionClassName}
        /> */}
      </form>
    </FormProvider>
  );
}
