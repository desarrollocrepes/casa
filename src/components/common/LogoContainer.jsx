import React from 'react';
import './common.css';

export const LogoContainer = ({ className = "" }) => (
  <div className={`logo-container ${className}`}>
    <div className="logo-wrapper">
      {/* Logo Vivienda */}
      <img src="/src/assets/logos/logo.png" alt="TU CASA, TU FUTURO" className="logo-image" />
      
      {/* Logo Crepes & Waffles */}
      <img src="/src/assets/logos/logocrepes.png" alt="Crepes & Waffles" className="logo-crepes-image" />
    </div>
  </div>
);
