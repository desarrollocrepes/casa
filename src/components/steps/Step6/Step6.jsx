import React from 'react';
import { Wrench, Home, Scale } from 'lucide-react';
import { useFlow } from '../../../context/FlowContext';
import './Step6.css';

export const Step6 = () => {
  const { prevStep, resetFlow } = useFlow();

  const RESULTS_DATA = [
    {
      title: 'Mejora de vivienda',
      description: '¿Tu casa necesita reparaciones? Te guiamos para acceder a créditos de mejora.',
      icon: <Wrench className="card-icon" />
    },
    {
      title: 'Arrendamiento social',
      description: 'Programas especiales de ahorro para pago de cuota inicial mediante arriendo.',
      icon: <Home className="card-icon" />
    },
    {
      title: 'Asesoría legal y trámites',
      description: 'Escrituración, impuestos y legalización de documentos de propiedad.',
      icon: <Scale className="card-icon" />
    }
  ];

  return (
    <div className="step step-results">
      <div className="results-grid">
        {RESULTS_DATA.map((result, idx) => (
          <div key={idx} className="result-card">
            <div className="result-icon">{result.icon}</div>
            <h4 className="result-card-title">{result.title}</h4>
            <p className="result-description">{result.description}</p>
          </div>
        ))}
      </div>

      <div className="results-footer">
        <button onClick={prevStep} className="btn-back">
          Volver
        </button>
        <button onClick={resetFlow} className="btn-finish">
          Finalizar
        </button>
      </div>
    </div>
  );
};
