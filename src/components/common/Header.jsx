import React from 'react';
import { useFlow } from '../../context/FlowContext';
import './common.css';

export const Header = ({ currentStep }) => {
  const { goToStep } = useFlow();
  const headerSteps = [2, 3, 4, 5, 6, 7].filter(s => 
    currentStep >= s || (currentStep > 5 && s > 5)
  );

  return (
    <header className="flow-header">
      <div className="header-logo" onClick={() => goToStep(1)}>
        <img src="/src/assets/logos/logocrepes.png" alt="Crepes & Waffles" className="header-logo-img" />
      </div>

      <div className="header-progress">
        {headerSteps.map((stepNum) => (
          <div
            key={stepNum}
            className={`progress-dot ${currentStep === stepNum ? 'active' : ''}`}
          ></div>
        ))}
      </div>
    </header>
  );
};
