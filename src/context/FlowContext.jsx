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

  const resetFlow = () => {
    setStep(0);
    setFormData({
      documentNumber: '',
      userName: 'James',
      answers: { q1: '' },
      selectedHousingType: null,
    });
  };

  const value = {
    step,
    formData,
    nextStep,
    prevStep,
    goToStep,
    updateFormData,
    updateAnswer,
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
