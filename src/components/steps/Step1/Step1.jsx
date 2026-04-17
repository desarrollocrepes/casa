import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useFlow } from '../../../context/FlowContext';
import { LogoContainer } from '../../common/LogoContainer';
import './Step1.css';

export const Step1 = () => {
  const { nextStep } = useFlow();
  return (
    <div className="step step-mission">
      <LogoContainer className="mission-logo" />
      <h2 className="mission-title">
        ¡En Crepes & Waffles queremos ayudarte a cumplir tus metas y objetivos!
      </h2>
      <button onClick={nextStep} className="btn-arrow">
        <ArrowRight size={32} />
      </button>
    </div>
  );
};
