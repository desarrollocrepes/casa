import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useFlow } from '../../../context/FlowContext';
import './Step4.css';

export const Step4 = () => {
  const { nextStep, formData } = useFlow();
  const { userName } = formData;

  return (
    <div className="step step-greeting">
      <div className="greeting-badge">
        <h1>Foto</h1>
      </div>
      <h2 className="mission-title">¡Hola, {userName}! <br />
        <br />
        Desde el equipo de <i>Bienestar</i>, queremos hacerte unas preguntas que nos ayudarán a
        <span className="highlight"> guiarte de forma personalizada </span>
        en el proceso de compra de vivienda
      </h2>
      <button onClick={nextStep} className="btn-arrow">
        <ChevronRight size={32} />
      </button>
    </div>
  );
};
