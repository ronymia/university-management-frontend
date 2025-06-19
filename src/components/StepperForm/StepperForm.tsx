"use client";

import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomButton from "../Button/CustomButton";
import { CustomStepper } from "../ui/CustomStepper";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IGenericErrorResponse } from "@/types";

interface ISteps {
  title?: string;
  content?: React.ReactElement | React.ReactNode;
}

type FormConfig = {
  defaultValues?: Record<string, any>;
  masterSchema: any;
  stepSchema: any;
};

type IStepsProps = {
  steps: ISteps[];
  persistKey: string;
  submitHandler: (el: any) => void;
  navigateLink?: string;
} & FormConfig;

export default function StepperForm({
  steps,
  submitHandler,
  navigateLink,
  persistKey,
  stepSchema,
  masterSchema,
  defaultValues,
}: IStepsProps) {
  // console.log({ defaultValues });
  const router = useRouter();

  // STEPPER CURRENT STEP
  const [current, setCurrent] = useState<number>(
    !!getFromLocalStorage("step")
      ? Number(JSON.parse(getFromLocalStorage("step") as string).step)
      : 0
  );

  // SAVED VALUES ON LOCALSTORAGE
  const [savedValues] = useState(
    !defaultValues && !!getFromLocalStorage(persistKey)
      ? JSON.parse(getFromLocalStorage(persistKey) as string)
      : ""
  );

  // UPDATE STEPPER CURRENT STEP ON LOCALSTORAGE
  useEffect(() => {
    setToLocalStorage("step", JSON.stringify({ step: current }));
  }, [current]);

  // NEXT STEP
  const next = () => {
    setCurrent(current + 1);
  };

  // PREVIOUS STEP
  const prev = () => {
    setCurrent(current - 1);
  };

  // GET STEPS
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const formConfig: {
    defaultValues?: Record<string, any>;
    resolver?: any;
    mode?: any;
  } = {};

  // if (!!defaultValues) formConfig["defaultValues"] = defaultValues;
  if (!defaultValues && !!savedValues)
    formConfig["defaultValues"] = savedValues;
  if (!!masterSchema) formConfig["resolver"] = zodResolver(masterSchema as any);

  const methods = useForm<any>(formConfig);
  const watch = methods.watch();

  useEffect(() => {
    if (savedValues) {
      methods.reset(savedValues);
    } else if (defaultValues) {
      methods.reset(defaultValues);
    }
  }, [savedValues, defaultValues, methods]);

  useEffect(() => {
    setToLocalStorage(persistKey, JSON.stringify(watch));
  }, [watch, persistKey, methods]);

  const {
    handleSubmit,
    reset,
    setError,
    formState: { isLoading, isSubmitting, isValidating },
  } = methods;

  const handleStudentOnSubmit = async (data: any) => {
    try {
      await Promise.resolve(submitHandler(data));
      reset();
      setToLocalStorage("step", JSON.stringify({ step: 0 }));
      setToLocalStorage(persistKey, JSON.stringify({}));
      if (navigateLink) {
        router.push(navigateLink);
      }
    } catch (err) {
      const error = err as IGenericErrorResponse;

      // console.log("form error", { error });

      if (error.statusCode === 422) {
        error.errorMessages?.forEach((err) => {
          if (Array.isArray(err.path)) {
            setError(err.path as any, { type: "manual", message: err.message });
          } else {
            const fields = (err?.path as string)?.replace(/`/g, "").split(",");

            fields?.forEach((field) => {
              setError(field as any, { type: "manual", message: err.message });
            });
          }
        });
      }
    }
  };

  useEffect(() => {
    console.log("Form values", methods.getValues());
  }, [watch]);

  return (
    <>
      {/* CUSTOM STEPPER */}
      <CustomStepper
        steps={items as { key: string; title: string }[]}
        activeStep={current}
      />

      {/* HOOK FORM PROVIDER */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleStudentOnSubmit)}>
          <div>{steps[current].content}</div>
          <div className={`flex items-center justify-center mt-5 gap-5`}>
            {/* PREVIOUS */}
            {current > 0 && (
              <CustomButton
                isLoading={isLoading || isSubmitting || isValidating}
                onClick={() => prev()}
                className={`w-md`}
              >
                Previous
              </CustomButton>
            )}

            {/* FORM SUBMIT */}
            {current === steps.length - 1 && (
              <CustomButton
                isLoading={isLoading || isSubmitting || isValidating}
                htmlType="submit"
                className={`w-md`}
              >
                Done
              </CustomButton>
            )}

            {/* NEXT */}
            {current < steps.length - 1 && (
              <CustomButton
                isLoading={isLoading || isSubmitting || isValidating}
                onClick={async () => {
                  // CLEAR ERRORS
                  methods.clearErrors();
                  // CURRENT STEP SCHEMA
                  const currentStepSchema = stepSchema[current];

                  // Get the current values from the form
                  const currentFormValues = methods.watch();

                  // VALIDATE CURRENT STEP SCHEMA
                  try {
                    await currentStepSchema.parseAsync(currentFormValues);
                    next(); // If validation passes, move to next step
                  } catch (error) {
                    // CHECKING ZOD ERROR
                    if (error instanceof z.ZodError) {
                      // Trigger validation
                      const isValid = await methods.trigger();
                      if (isValid) next();
                    }
                  }
                }}
                className={`w-md`}
              >
                Next
              </CustomButton>
            )}
          </div>
        </form>
      </FormProvider>
    </>
  );
}
