import React from 'react';
import { MessageCircle, Mail, ArrowBigDown, ArrowRight } from 'lucide-react';
import { useFlow } from '../../context/FlowContext';
import './Step13.css';

export const Step13 = () => {
  const { resetFlow } = useFlow();
  
  const handleFinish = () => {
    resetFlow();
  };

  return (
    <div className="step step-contact">
      <div className="contact-container">
          <h1 className="title">¿Tienes dudas?
            <br />
            ¡Estamos aquí para ayudarte en cada paso del camino!
          </h1>

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
          
        <div className="contact-footer">
          <button onClick={handleFinish} className="btn-arrow">
            <ArrowRight size={22} />
          </button>
        </div>
      </div>


    </div>
  );
};
