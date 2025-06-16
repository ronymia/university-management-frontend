"use client";

import { ReactElement, ReactNode } from "react";
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
}: FormProps) {
  const formConfig: FormConfig = {};

  if (defaultValues) formConfig["defaultValues"] = defaultValues;
  if (resolver) formConfig["resolver"] = resolver;
  const methods = useForm<FormConfig>(formConfig);

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: any) => {
    try {
      await submitHandler(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Server error:", { error });
      } else {
        console.log("Unknown error", { error });
      }
      reset(data, { keepValues: true });
    }
  };

  // useEffect(() => {
  //   if (defaultValues) reset(defaultValues);
  // }, [defaultValues, reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
}
