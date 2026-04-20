import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useFlow } from '../../../context/FlowContext';
import './Step12.css';

export const Step12 = () => {
  const { nextStep } = useFlow();
  
  const ADDITIONAL_EXPENSES = [
    'Pago de escrituras',
    'Remodelación',
    'Mudanza'
  ];

  return (
    <div className="step step-expenses">
      <div className="expenses-header">
        <h2 className="title">¡Estás a un paso de adquirir tu vivienda!</h2>
      </div>

      <div className="expenses-content">
        <div className="reminder-section">
          <p className="reminder-text">Recuerda tener presente gastos adicionales como:</p>
          
          <ul className="expenses-list">
            {ADDITIONAL_EXPENSES.map((expense, idx) => (
              <li key={idx} className="expense-item">{expense}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="expenses-footer">
        <button onClick={() => nextStep()} className="btn-arrow">
          <ArrowRight size={22} />
        </button>
      </div>
    </div>
  );
};
