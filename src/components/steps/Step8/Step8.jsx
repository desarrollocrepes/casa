import React from 'react';
import { useFlow } from '../../../context/FlowContext';
import './Step8.css';

export const Step8 = () => {
  const { prevStep, nextStep } = useFlow();

  const BUDGET_OPTIONS = [
    {
      title: 'Tienes el dinero completo para tu vivienda',
      subtitle: '¿Ahora elige tu vivienda!',
      buttonText: 'Haciendo Click Aquí',
      color: 'budget-yellow'
    },
    {
      title: '¿No tienes claro tu presupuesto?',
      subtitle: 'Obtén un estimado de gastos, cuotas o presupuestos.',
      buttonText: 'Haciendo Click Aquí',
      color: 'budget-brown'
    },
    {
      title: '¿Estás reportado en centrales?',
      subtitle: '¡Tu sueño no termina aquí! Inicia tu proceso de subsanamiento',
      buttonText: 'Haciendo Click Aquí',
      color: 'budget-beige'
    }
  ];

  return (
    <div className="step step-budget">
      <div className="budget-header">
        <p className="budget-intro-text">
          Ahora que ya sabes el tipo de vivienda que más se adapta a ti, veamos cuál es tu <strong>presupuesto. 
          Esto dependerá de tus ingresos y de los préstamos o créditos que puedas solicitar</strong>
        </p>
      </div>

      <div className="budget-content">
        <div className="budget-illustration">
          {/* Placeholder para ilustración */}
          <div className="illustration-placeholder">👩</div>
        </div>

        <div className="budget-options">
          {BUDGET_OPTIONS.map((option, idx) => (
            <div key={idx} className={`budget-card ${option.color}`}>
              <h4 className="budget-card-title">{option.title}</h4>
              <p className="budget-card-subtitle">{option.subtitle}</p>
              <button className="btn-budget">
                {option.buttonText} 👆
              </button>
            </div>
          ))}
        </div>

        <div className="budget-message">
          <p>¿Ya tienes todo claro? <strong>¡Continuemos!</strong> 👆</p>
        </div>
      </div>

      <div className="budget-footer">
        <button onClick={() => nextStep()} className="btn-continue">
          Continuar
        </button>
      </div>
    </div>
  );
};
