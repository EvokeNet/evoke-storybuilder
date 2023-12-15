import { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

const MultiStepForm = () => {
    const [step, setStep] = useState(1);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    switch (step) {
        case 1:
            return <StepOne onNext={nextStep} />;
        case 2:
            return <StepTwo onNext={nextStep} onBack={prevStep} />;
        case 3:
            return <StepThree onBack={prevStep} />;
        default:
            return <div>Unknown step</div>;
    }
};

export default MultiStepForm;