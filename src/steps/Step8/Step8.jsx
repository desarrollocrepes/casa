import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useFlow } from '../../context/FlowContext';
import './Step8.css';

export const Step8 = () => {
  const { goToStep, uiState, updateUIState } = useFlow();
  
  const [checkedItems, setCheckedItems] = useState({
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
    item6: false
  });

  const CHECKLIST_ITEMS = [
    {
      id: 'item1',
      question: '¿Tienes el dinero completo para tu vivienda?',
      description: 'Disponibilidad del capital necesario'
    },
    {
      id: 'item2',
      question: '¿Tienes claro tu presupuesto?',
      description: 'Conoces el rango de precio de la propiedad'
    },
    {
      id: 'item3',
      question: '¿Tienes historial crediticio positivo?',
      description: 'Antecedentes favorables en centrales de riesgo'
    },
    {
      id: 'item4',
      question: '¿Has ahorrado para la cuota inicial?',
      description: 'Mínimo 20-30% del valor del inmueble'
    },
    {
      id: 'item5',
      question: '¿Has consultado tu capacidad de endeudamiento?',
      description: 'Sabes cuánto puedes financiar según tus ingresos'
    },
    {
      id: 'item6',
      question: '¿Tienes documentación completa?',
      description: 'Cédula, extractos bancarios, soportes laborales'
    }
  ];

  const handleCheck = (id) => {
    setCheckedItems({
      ...checkedItems,
      [id]: !checkedItems[id]
    });
  };

  const isAllChecked = Object.values(checkedItems).every(val => val === true);

  return (
    <div className="step step-checklist">
      <div className="checklist-header">
        <h2 className="title">
          Antes de continuar, <strong>verifica que tengas listo lo siguiente:</strong>
        </h2>
      </div>

      <div className="checklist-container">
        <div className="checklist-items">
          {CHECKLIST_ITEMS.map((item) => (
            <div key={item.id} className="checklist-item">
              <label className="checklist-label">
                <input 
                  type="checkbox" 
                  checked={checkedItems[item.id]}
                  onChange={() => handleCheck(item.id)}
                  className="checklist-checkbox"
                />
                <div className="checklist-content">
                  <p className="checklist-question">{item.question}</p>
                  <p className="checklist-description">{item.description}</p>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="checklist-footer">
        <button 
          onClick={() => goToStep(13)} 
          disabled={!isAllChecked}
          className={`btn-arrow ${isAllChecked ? '' : 'disabled'}`}
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};
