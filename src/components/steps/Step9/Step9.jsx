import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useFlow } from '../../../context/FlowContext';
import './Step9.css';

export const Step9 = () => {
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
      <h2 className="title">
        Ahora que ya sabes el tipo de vivienda que más se adapta a ti, veamos cuál es tu <strong>presupuesto</strong>. Esto dependerá de tus ingresos y de los préstamos o créditos que puedas solicitar
      </h2>

      <div className="budget-content">
        <div className="budget-options">
          {BUDGET_OPTIONS.map((option, idx) => (
            <div key={idx} className={`budget-card ${option.color}`}>
              <h4 className="budget-card-title">{option.title}</h4>
              <p className="budget-card-subtitle">{option.subtitle}</p>
              <button className="btn-budget">
                {option.buttonText} <ArrowRight size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="budget-footer">
        <button onClick={() => nextStep()} className="btn-arrow">
          <ArrowRight size={22} />
        </button>
      </div>
    </div>
  );
};
