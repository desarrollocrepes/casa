import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useFlow } from '../../context/FlowContext';
import './Step2.css';

export const Step2 = () => {
  const { nextStep } = useFlow();
  return (
    <div className="step step-welcome">
      <div className="welcome-card-container">
        <div className="welcome-card">
          <h2 className="title">
            Bienvenido a <br />
            TU CASA, TU FUTURO <br />
            <br />
            Es hora de materializar la meta por la cual trabajas día a día con amor y dedicación
          </h2>
          <button onClick={nextStep} className="btn-arrow">
            <ArrowRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};
