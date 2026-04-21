import React, { useEffect } from 'react';
import { FlowProvider, useFlow } from './context/FlowContext';
import { Step0 } from './components/steps/Step0/Step0';
import { Step1 } from './components/steps/Step1/Step1';
import { Step2 } from './components/steps/Step2/Step2';
import { Step3 } from './components/steps/Step3/Step3';
import { Step4 } from './components/steps/Step4/Step4';
import { Step5 } from './components/steps/Step5/Step5';
import { Step6 } from './components/steps/Step6/Step6';
import { Step7 } from './components/steps/Step7/Step7';
import { Step8 } from './components/steps/Step8/Step8';
import { Step9 } from './components/steps/Step9/Step9';
import { Step10 } from './components/steps/Step10/Step10';
import { Step11 } from './components/steps/Step11/Step11';
import { Step12 } from './components/steps/Step12/Step12';
import { Step13 } from './components/steps/Step13/Step13';
import { Step14 } from './components/steps/Step14/Step14';
import './styles/globals.css';
import './components/common/common.css';
import './components/steps/Step0/Step0.css';
import './components/steps/Step1/Step1.css';
import './components/steps/Step2/Step2.css';
import './components/steps/Step3/Step3.css';
import './components/steps/Step4/Step4.css';
import './components/steps/Step5/Step5.css';
import './components/steps/Step6/Step6.css';
import './components/steps/Step7/Step7.css';
import './components/steps/Step8/Step8.css';
import './components/steps/Step9/Step9.css';
import './components/steps/Step10/Step10.css';
import './components/steps/Step11/Step11.css';
import './components/steps/Step12/Step12.css';
import './components/steps/Step13/Step13.css';
import './components/steps/Step14/Step14.css';

const FlowContainer = () => {
  const { step, goToStep } = useFlow();

  // Animación splash inicial: 3 segundos
  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => goToStep(1), 3000);
      return () => clearTimeout(timer);
    }
  }, [step, goToStep]);

  const renderStep = () => {
    switch (step) {
      case 0: return <Step0 />;
      case 1: return <Step1 />;
      case 2: return <Step2 />;
      case 3: return <Step3 />;
      case 4: return <Step4 />;
      case 5: return <Step5 />;
      case 6: return <Step6 />;
      case 7: return <Step7 />;
      case 8: return <Step8 />;
      case 9: return <Step9 />;
      case 10: return <Step10 />;
      case 11: return <Step11 />;
      case 12: return <Step12 />;
      case 13: return <Step13 />;
      case 14: return <Step14 />;
      default: return null;
    }
  };

  return (
    <div className="flow-container">
      {/* Viewport principal - renderiza el paso actual */}
      <main className="flow-main">
        {renderStep()}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <FlowProvider>
      <FlowContainer />
    </FlowProvider>
  );
}