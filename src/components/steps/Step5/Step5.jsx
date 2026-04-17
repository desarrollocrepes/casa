import React from 'react';
import { useFlow } from '../../../context/FlowContext';
import './Step5.css';

export const Step5 = () => {
  const { nextStep, goToStep, updateAnswer } = useFlow();

  const handleAnswer = (answer) => {
    updateAnswer('q1', answer);
    if (answer === 'Si') {
      goToStep(6); // Resultados
    } else {
      goToStep(7); // Tipos de vivienda
    }
  };

  return (
    <div className="step step-quiz">
      <div className="quiz-card">
        <h3 className="quiz-title">
          ¿Actualmente cuentas con vivienda propia?
        </h3>
        <div className="quiz-buttons">
          <button onClick={() => handleAnswer('Si')} className="btn-quiz-option">Sí</button>
          <button onClick={() => handleAnswer('No')} className="btn-quiz-option">No</button>
        </div>
      </div>
    </div>
  );
};
