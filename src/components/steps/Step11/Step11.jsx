import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useFlow } from '../../../context/FlowContext';
import './Step11.css';

export const Step11 = () => {
  const { nextStep } = useFlow();
  
  const FINANCING_OPTIONS = [
    {
      title: 'Cuota inicial',
      description: 'Quieres iniciar con la compra de tu vivienda, pero pagas arrendando y no te alcanza para pagar cuota inicial.',
      icon: '🐷',
      color: 'option-pink'
    },
    {
      title: 'Subsidios',
      description: 'Tienes un proceso de compra de vivienda avanzado y quieres saber si puedes acceder a algún subsidio o beneficio.',
      icon: '💰',
      color: 'option-brown'
    },
    {
      title: 'Crédito hipotecario',
      description: 'Requieres asesoría para solicitar crédito hipotecario, capacidad de endeudamiento, historial crediticio y otros.',
      icon: '💳',
      color: 'option-yellow'
    }
  ];

  return (
    <div className="step step-financing">
      <h2 className="title">¡Te acompañamos en tu planeación financiera!</h2>
      
      <div className="financing-options">
        {FINANCING_OPTIONS.map((option, idx) => (
          <div key={idx} className={`financing-card ${option.color}`}>
            <div className="financing-icon">{option.icon}</div>
            <div className="financing-content">
              <h3 className="financing-option-title">{option.title}</h3>
              <p className="financing-option-desc">{option.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="financing-footer">
        <button onClick={() => nextStep()} className="btn-arrow">
          <ArrowRight size={22} />
        </button>
      </div>
    </div>
  );
};