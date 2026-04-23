import React from 'react';
import './Step0.css';

const LogoContainer = ({ className = "" }) => (
  <div className={`logo-container ${className}`}>
    <div className="logo-wrapper">
      {/* Logo Vivienda */}
      <img src="/src/assets/logos/logo.png" alt="TU CASA, TU FUTURO" className="logo-image" />
      
      {/* Logo Crepes & Waffles */}
      <img src="/src/assets/logos/logocrepes.png" alt="Crepes & Waffles" className="logo-crepes-image" />
    </div>
  </div>
);

export const Step0 = () => (
  <div className="step step-splash">
    <LogoContainer />
  </div>
);

export { LogoContainer };
