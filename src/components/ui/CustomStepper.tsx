"use client";

export interface Step {
  title: string;
  key: string;
}

interface CustomStepperProps {
  steps: Step[];
  activeStep: number;
  onStepClick?: (index: number) => void;
}

export function CustomStepper({
  steps,
  activeStep,
  onStepClick,
}: CustomStepperProps) {
  return (
    <div className="w-full">
      <div className="relative flex items-center justify-between mb-6">
        {/* Connecting line (behind all steps) */}
        <div className="absolute top-1/2 left-0 w-full h-5 bg-primary -z-10 transform -translate-y-1/2" />

        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;

          return (
            <div
              key={index}
              className="flex flex-col items-center flex-1 cursor-pointer"
              onClick={() => onStepClick?.(index)}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                  isActive
                    ? "bg-primary"
                    : isCompleted
                    ? "bg-green-500"
                    : "bg-gray-400"
                }`}
              >
                {index + 1}
              </div>
              <div className="mt-2 text-xs text-center font-medium">
                {step.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
