import React, { useEffect } from 'react';
import { FlowProvider, useFlow } from './context/FlowContext';
import { Header } from './components/common/Header';
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
      default: return null;
    }
  };

  return (
    <div className="flow-container">
      {/* Decoraciones de fondo - círculos blur */}
      <div className="flow-decoration flow-decoration-top"></div>
      <div className="flow-decoration flow-decoration-bottom"></div>

      {/* Header - visible después del splash (step > 1) */}
      {step > 1 && <Header currentStep={step} />}

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