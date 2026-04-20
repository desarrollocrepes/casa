import React, { createContext, useContext, useState } from 'react';

const FlowContext = createContext();

export const FlowProvider = ({ children }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    documentNumber: '',
    userName: 'James',
    answers: { q1: '' },
    selectedHousingType: null,
  });
  
  // UI State centralizado para evitar duplicación en componentes
  const [uiState, setUiState] = useState({
    expandedRow: null,
    selectedItems: [],
    showModal: false,
    confirmationData: null,
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => Math.max(0, prev - 1));
  const goToStep = (stepNumber) => setStep(stepNumber);
  
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateAnswer = (questionKey, answer) => {
    setFormData(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionKey]: answer }
    }));
  };
  
  const updateUIState = (key, value) => {
    setUiState(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const toggleUIState = (key, toggleValue = null) => {
    setUiState(prev => ({
      ...prev,
      [key]: toggleValue !== null ? toggleValue : (prev[key] ? null : (toggleValue || !prev[key]))
    }));
  };
  
  const resetUIState = () => {
    setUiState({
      expandedRow: null,
      selectedItems: [],
      showModal: false,
      confirmationData: null,
    });
  };

  const resetFlow = () => {
    setStep(0);
    setFormData({
      documentNumber: '',
      userName: 'James',
      answers: { q1: '' },
      selectedHousingType: null,
    });
    resetUIState();
  };

  const value = {
    step,
    formData,
    uiState,
    nextStep,
    prevStep,
    goToStep,
    updateFormData,
    updateAnswer,
    updateUIState,
    toggleUIState,
    resetUIState,
    resetFlow,
  };

  return (
    <FlowContext.Provider value={value}>
      {children}
    </FlowContext.Provider>
  );
};

export const useFlow = () => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error('useFlow debe ser usado dentro de FlowProvider');
  }
  return context;
};
