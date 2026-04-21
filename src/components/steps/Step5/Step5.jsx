import React from 'react';
import { useFlow } from '../../../context/FlowContext';
import './Step5.css';

export const Step5 = () => {
  const { nextStep, goToStep, updateAnswer } = useFlow();

  const handleAnswer = (answer) => {
    updateAnswer('q1', answer);
    if (answer === 'Si') {
      goToStep(6); // Step 6
    } else if (answer === 'No') {
      goToStep(7); // Step 7 - Tipos de vivienda
    } else if (answer === 'Parcialmente') {
      goToStep(8); // Step 8 - Checklist
    }
  };

  return (
    <div className="step step-quiz">
      <div className="quiz-card">
        <h3 className="title">
          ¿Actualmente cuentas con vivienda propia?
        </h3>
        <div className="quiz-buttons">
          <button onClick={() => handleAnswer('Si')} className="btn-arrow">Sí</button>
          <button onClick={() => handleAnswer('Parcialmente')} className="btn-arrow">Parcialmente</button>
          <button onClick={() => handleAnswer('No')} className="btn-arrow">No</button>
        </div>
      </div>
    </div>
  );
};
