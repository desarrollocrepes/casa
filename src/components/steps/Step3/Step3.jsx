import React, { useState } from 'react';
import { ArrowRight, User } from 'lucide-react';
import { useFlow } from '../../../context/FlowContext';
import './Step3.css';

export const Step3 = () => {
  const { nextStep, formData, updateFormData } = useFlow();
  const { documentNumber } = formData;

  const handleChange = (e) => {
    updateFormData('documentNumber', e.target.value);
  };

  const handleSubmit = () => {
    if (documentNumber.trim()) {
      nextStep();
    }
  };

  return (
    <div className="step step-login">
      <div className="login-card-container">
        <div className="login-card">
          <h2 className="mission-title">
            Ingresa por favor tu número de documento para continuar:
          </h2>
          <div className="input-wrapper">
            <User className="input-icon" size={24} />
            <input
              type="number"
              placeholder="Ej: 123456789"
              value={documentNumber}
              onChange={handleChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="login-input"
            />
          </div>
          <button
            disabled={!documentNumber.trim()}
            onClick={handleSubmit}
            className={`btn-arrow ${!documentNumber.trim() ? 'disabled' : ''}`}
          >
            <ArrowRight size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};
