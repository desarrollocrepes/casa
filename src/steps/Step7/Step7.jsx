import React from 'react';
import { ArrowLeft, ArrowRight, Home, Building2, Building } from 'lucide-react';
import { useFlow } from '../../context/FlowContext';
import './Step7.css';

export const Step7 = () => {
  const { goToStep, uiState, updateUIState } = useFlow();
  const selectedHousingType = uiState.expandedRow;

  const HOUSING_TYPES = [
    {
      title: 'Vivienda VIS / VIP',
      description: 'Para personas que devengan hasta tres salarios mínimos que aplican a subsidios.',
      icon: <Home className="card-icon" />,
      details: [
        'Solicita estudio en salarios mínimos al año de entrega.',
        'Pregunta por pagos adicionales como avalúos y estudios de títulos.',
        'Verifica acceso a principales vías y trasporte.',
        'Pregunta por banco constructor y tasa preferencial en créditos hipotecarios'
      ]
    },
    {
      title: 'Vivienda Usada',
      description: 'Casas o apartamentos que ya han sido habitados y están disponibles para entrega inmediata.',
      icon: <Building2 className="card-icon" />,
      details: [
        'Verificar estado general de la propiedad y necesidades de mantenimiento.',
        'Revisar documentación legal y ausencia de embargos.',
        'Solicitar avalúo comercial independiente para validar precio.',
        'Consultar cambios de valor inmobiliario en la zona en últimos años'
      ]
    },
    {
      title: 'Vivienda No VIS',
      description: 'Proyectos inmobiliarios recién construidos con plazo de entrega de hasta 2 años.',
      icon: <Building className="card-icon" />,
      details: [
        'Solicita estudio en salarios mínimos al año de entrega.',
        'Pregunta por pagos adicionales como avalúos y estudios de títulos.',
        'Verifica acceso a principales vías y trasporte.',
        'Pregunta por banco constructor y tasa preferencial en créditos hipotecarios'
      ]
    }
  ];

  const handleSelectHousingType = (idx) => {
    updateUIState('expandedRow', selectedHousingType === idx ? null : idx);
  };

  const handleCloseModal = () => {
    updateUIState('expandedRow', null);
  };

  return (
    <div className="step step-housing-types">
      <h2 className="title">
        Los tipos de vivienda a los que aplicas son:
      </h2>
      
      <div className="housing-grid">
        {HOUSING_TYPES.map((type, idx) => (
          <div key={idx} className="housing-card">
            <div className="card-icon">{type.icon}</div>
            <h4>{type.title}</h4>
            <p>{type.description}</p>
            <button 
              className="btn-discover"
              onClick={() => handleSelectHousingType(idx)}
            >
              Descubre proyectos
            </button>
          </div>
        ))}
      </div>

      <div className="housing-footer">
        <button onClick={() => goToStep(9)} className="btn-arrow">
          <ArrowRight size={22} />
        </button>
      </div>

      {/* Modal de Detalles */}
      {selectedHousingType !== null && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-icon">
              {HOUSING_TYPES[selectedHousingType].icon}
            </div>
            
            <h2 className="modal-title">{HOUSING_TYPES[selectedHousingType].title}</h2>
            
            <ul className="modal-details-list">
              {HOUSING_TYPES[selectedHousingType].details.map((detail, idx) => (
                <li key={idx} className="modal-detail-item">
                  {detail}
                </li>
              ))}
            </ul>
            
            <button 
              className="btn-arrow"
              onClick={handleCloseModal}
            >
              <ArrowLeft size={22} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
