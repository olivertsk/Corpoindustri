type CheckoutStepperHeaderProps = {
  steps: string[];
  currentStep: number;
};

export default function CheckoutStepperHeader({
  steps,
  currentStep,
}: CheckoutStepperHeaderProps) {
  return (
    <div className='mb-8'>
      <div className='flex items-center justify-between gap-2'>
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isDone = stepNumber < currentStep;

          return (
            <div key={step} className='flex-1'>
              <div className='flex items-center gap-2'>
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : isActive
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {stepNumber}
                </span>
                <span
                  className={`text-sm font-semibold ${
                    isActive || isDone ? 'text-slate-900' : 'text-slate-500'
                  }`}
                >
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`mt-3 h-1 w-full rounded-full ${
                    isDone ? 'bg-emerald-600' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
