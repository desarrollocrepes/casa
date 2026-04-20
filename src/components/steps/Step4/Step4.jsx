import React from 'react';
import { ArrowRight, User } from 'lucide-react';
import { useFlow } from '../../../context/FlowContext';
import './Step4.css';

export const Step4 = () => {
  const { nextStep, formData } = useFlow();
  const { userName, empleadoData } = formData;

  const firstName = userName ? userName.split(' ')[0] : 'Empleado';

  return (
    <div className="step step-greeting">
      <div className="greeting-content">
        <div className="greeting-avatar">
          {empleadoData?.foto ? (
            <img 
              src={empleadoData.foto} 
              alt={firstName}
              className="avatar-img"
            />
          ) : (
            <User size={60} className="avatar-icon" />
          )}
        </div>
        
        <h2 className="title">
          ¡Hola, {firstName}! <br />
          <br />
          Desde el equipo de <i>Bienestar</i>, queremos hacerte unas preguntas que nos ayudarán a
          <span className="highlight"> guiarte de forma personalizada </span>
          en el proceso de compra de vivienda
        </h2>
      </div>

      <button onClick={nextStep} className="btn-arrow">
        <ArrowRight size={22} />
      </button>
    </div>
  );
};
