import React from 'react';
import { MessageCircle, Mail } from 'lucide-react';
import { useFlow } from '../../../context/FlowContext';
import './Step13.css';

export const Step13 = () => {
  const { resetFlow } = useFlow();
  
  const handleFinish = () => {
    resetFlow();
  };

  return (
    <div className="step step-contact">
      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-bubble">
            <h1 className="contact-title">¿Tienes dudas?</h1>
          </div>

          <p className="contact-subtitle">
            ¡Estamos aquí para ayudarte en cada paso del camino!
          </p>

          <div className="contact-options">
            <a 
              href="https://wa.me/573001234567" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-btn whatsapp-btn"
            >
              <MessageCircle size={28} />
              <span>WhatsApp</span>
            </a>
            
            <a 
              href="mailto:bienestar@crepesywaffles.com"
              className="contact-btn email-btn"
            >
              <Mail size={28} />
              <span>Correo</span>
            </a>
          </div>
        </div>

      </div>

      {/* Botón Finalizar */}
      <div className="contact-footer">
        <button onClick={handleFinish} className="btn-finish-flow">
          Finalizar
        </button>
      </div>
    </div>
  );
};
