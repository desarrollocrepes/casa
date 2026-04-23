import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useFlow } from '../../context/FlowContext';
import './Step10.css';

export const Step10 = () => {
  const { nextStep } = useFlow();

  return (
    <div className="step step-accounts">
      <h2 className="title">¡Hagamos cuentas!</h2>

      <div className="accounts-container">
        <div className="accounts-total">
          <p className="accounts-total-text">100% del Valor total del inmueble</p>
        </div>

        <div className="accounts-split">
          <div className="accounts-column">
            <p className="accounts-label">Cuota inicial</p>
            <div className="accounts-percentage">30%</div>
          </div>

          <div className="accounts-column">
            <p className="accounts-label">Crédito hipotecario</p>
            <div className="accounts-percentage accounts-large">70%</div>
          </div>
        </div>
      </div>

      <div className="accounts-footer">
        <button onClick={() => nextStep()} className="btn-arrow">
          <ArrowRight size={22} />
        </button>
      </div>
    </div>
  );
};