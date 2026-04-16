import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  ChevronRight, 
  Home, 
  ArrowRight,
  Wallet,
  Wrench,
  Scale,
  User,
  Building,
  Building2
} from 'lucide-react';

// 1. CONTEXT GLOBAL - Gestión de Estado | Centraliza el estado del flujo | Proporciona métodos para navegar entre pasos | Almacena datos del formulario
const FlowContext = createContext();

const FlowProvider = ({ children }) => {
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

// Hook personalizado para usar el context
const useFlow = () => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error('useFlow debe ser usado dentro de FlowProvider');
  }
  return context;
};

// 2. COMPONENTES COMUNES
// LogoContainer TU CASA, TU FUTURO + Crepes & Waffles
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

// Header: Barra de navegación y progreso (visible después del splash)
const Header = ({ currentStep }) => {
  const { goToStep } = useFlow();
  const headerSteps = [2, 3, 4, 5, 6, 7].filter(s => 
    currentStep >= s || (currentStep > 5 && s > 5)
  );

  return (
    <header className="flow-header">
      <div className="header-logo" onClick={() => goToStep(1)}>
        <img src="/src/assets/logos/logocrepes.png" alt="Crepes & Waffles" className="header-logo-img" />
      </div>

      <div className="header-progress">
        {headerSteps.map((stepNum) => (
          <div
            key={stepNum}
            className={`progress-dot ${currentStep === stepNum ? 'active' : ''}`}
          ></div>
        ))}
      </div>
    </header>
  );
};

// 3. COMPONENTES
// STEP 0: Splash
const Splash = () => (
  <div className="step step-splash">
    <LogoContainer />
  </div>
);

// STEP 1: Misión
const Mission = () => {
  const { nextStep } = useFlow();
  return (
    <div className="step step-mission">
      <LogoContainer className="mission-logo" />
      <h2 className="mission-title">
        ¡En Crepes & Waffles queremos ayudarte a cumplir tus metas y objetivos!
      </h2>
      <button onClick={nextStep} className="btn-arrow">
        <ArrowRight size={32} />
      </button>
    </div>
  );
};

// STEP 2: Bienvenida
const Welcome = () => {
  const { nextStep } = useFlow();
  return (
    <div className="step step-welcome">
      <div className="welcome-card-container">
        <div className="welcome-card">
          <h2 className="mission-title">
            Bienvenido a <br />
            TU CASA, TU FUTURO <br />
            <br />
            Es hora de materializar la meta por la cual trabajas día a día con amor y dedicación
          </h2>
          <button onClick={nextStep} className="btn-arrow">
            <ArrowRight size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};

// STEP 3: Login
const LoginStep = () => {
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

// 4: Saludo
const GreetingStep = () => {
  const { nextStep, formData } = useFlow();
  const { userName } = formData;

  return (
    <div className="step step-greeting">
      <div className="greeting-badge">
        <h1>Foto</h1>
      </div>
      <h2 className="mission-title">¡Hola, {userName}! <br />
        <br />
        Desde el equipo de <i>Bienestar</i>, queremos hacerte unas preguntas que nos ayudarán a
        <span className="highlight"> guiarte de forma personalizada </span>
        en el proceso de compra de vivienda
      </h2>
      <button onClick={nextStep} className="btn-arrow">
        <ChevronRight size={32} />
      </button>
    </div>
  );
};

// STEP 5: Quiz | Según respuesta, va a step 6 (Resultados) o step 7 (Tipos)
const QuizStep = () => {
  const { nextStep, goToStep, updateAnswer } = useFlow();

  const handleAnswer = (answer) => {
    updateAnswer('q1', answer);
    if (answer === 'Si') {
      goToStep(6); // Resultados
    } else {
      goToStep(7); // Tipos de vivienda
    }
  };

  return (
    <div className="step step-quiz">
      <div className="quiz-card">
        <h3 className="quiz-title">
          ¿Actualmente cuentas con vivienda propia?
        </h3>
        <div className="quiz-buttons">
          <button onClick={() => handleAnswer('Si')} className="btn-quiz-option">Sí</button>
          <button onClick={() => handleAnswer('No')} className="btn-quiz-option">No</button>
        </div>
      </div>
    </div>
  );
};

// STEP 6: Resultados | (respuesta "SÍ" a la pregunta anterior)
const ResultsStep = () => {
  const { prevStep, resetFlow } = useFlow();

  const RESULTS_DATA = [
    {
      title: 'Mejora de vivienda',
      description: '¿Tu casa necesita reparaciones? Te guiamos para acceder a créditos de mejora.',
      icon: <Wrench className="card-icon" />
    },
    {
      title: 'Arrendamiento social',
      description: 'Programas especiales de ahorro para pago de cuota inicial mediante arriendo.',
      icon: <Home className="card-icon" />
    },
    {
      title: 'Asesoría legal y trámites',
      description: 'Escrituración, impuestos y legalización de documentos de propiedad.',
      icon: <Scale className="card-icon" />
    }
  ];

  return (
    <div className="step step-results">
      <div className="results-grid">
        {RESULTS_DATA.map((result, idx) => (
          <div key={idx} className="result-card">
            <div className="result-icon">{result.icon}</div>
            <h4 className="result-card-title">{result.title}</h4>
            <p className="result-description">{result.description}</p>
          </div>
        ))}
      </div>

      <div className="results-footer">
        <button onClick={prevStep} className="btn-back">
          Volver
        </button>
        <button onClick={resetFlow} className="btn-finish">
          Finalizar
        </button>
      </div>
    </div>
  );
};

// STEP 7: Tipos de Vivienda (respuesta "NO" a la pregunta anterior)
const HousingTypesStep = () => {
  const { prevStep } = useFlow();

  const HOUSING_TYPES = [
    {
      title: 'Vivienda VIS / VIP',
      description: 'Para personas que devengan hasta tres salarios mínimos que aplican a subsidios.',
      icon: <Home className="card-icon" />
    },
    {
      title: 'Vivienda Usada',
      description: 'Casas o apartamentos que ya han sido habitados y están disponibles para entrega inmediata.',
      icon: <Building2 className="card-icon" />
    },
    {
      title: 'Vivienda No VIS',
      description: 'Proyectos inmobiliarios recién construidos con plazo de entrega de hasta 2 años.',
      icon: <Building className="card-icon" />
    }
  ];

  return (
    <div className="step step-housing-types">
      <div className="housing-header">
        <h2 className="mission-title">
          Los tipos de vivienda a los que aplicas son:
        </h2>
      </div>

      <div className="housing-grid">
        {HOUSING_TYPES.map((type, idx) => (
          <div key={idx} className="housing-card">
            <span className="card-icon">{type.icon}</span>
            <h4>{type.title}</h4>
            <p>{type.description}</p>
            <button className="btn-discover">
              Descubre proyectos
            </button>
          </div>
        ))}
      </div>

      <div className="housing-footer">
        <button onClick={() => prevStep()} className="btn-change">
          Cambiar respuesta
        </button>
      </div>
    </div>
  );
};

// 4. FLOWCONTAINER | Ejecuta animación splash inicial (3s) | Renderiza el paso correspondiente según state | Muestra header de navegación (excepto en splash y quiz) | Añade decoraciones visuales de fondo
const FlowContainer = () => {
  const { step, goToStep } = useFlow();

  // Animación splash inicial: 3 segundos
  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => goToStep(1), 3000);
      return () => clearTimeout(timer);
    }
  }, [step, goToStep]);

  // Retorna el componente del paso actual
  const renderStep = () => {
    switch (step) {
      case 0: return <Splash />;
      case 1: return <Mission />;
      case 2: return <Welcome />;
      case 3: return <LoginStep />;
      case 4: return <GreetingStep />;
      case 5: return <QuizStep />;
      case 6: return <ResultsStep />;
      case 7: return <HousingTypesStep />;
      default: return null;
    }
  };

  return (
    <div className="flow-container">
      {/* Decoraciones de fondo - círculos blur */}
      <div className="flow-decoration flow-decoration-top"></div>
      <div className="flow-decoration flow-decoration-bottom"></div>

      {/* Header - visible después del splash (step > 1) */}
      {step > 1 && <Header currentStep={step} />}

      {/* Viewport principal - renderiza el paso actual */}
      <main className="flow-main">
        {renderStep()}
      </main>

      {/* Estilos globales y de animaciones */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap');

        * {
          box-sizing: border-box;
        }

        html, body, #root {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Montserrat', sans-serif;
          background-color: #F9F1E7;
          color: #4A3728;
          overflow: hidden;
        }
      `}</style>

      {/* Estilos específicos del flujo */}
      <style jsx>{`
        /* ========== CONTENEDOR PRINCIPAL ========== */
        .flow-container {
          position: fixed;
          inset: 0;
          background-color: #F9F1E7;
          font-family: 'Montserrat', sans-serif;
          overflow: hidden;
          user-select: none;
        }

        .flow-decoration {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.1;
        }

        .flow-decoration-top {
          top: -5rem;
          right: -5rem;
          width: 20rem;
          height: 20rem;
          background-color: #E5A842;
        }

        .flow-decoration-bottom {
          bottom: -5rem;
          left: -5rem;
          width: 20rem;
          height: 20rem;
          background-color: #4A3728;
        }

        .flow-main {
          position: relative;
          width: 100%;
          height: 100%;
          max-width: 112rem;
          margin: 0 auto;
          overflow: hidden;
          z-index: 10;
        }

        /* ========== HEADER ========== */
        .flow-header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 20;
        }

        .header-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: opacity 0.3s;
        }

        .header-logo:hover {
          opacity: 0.8;
        }

        .header-logo-img {
          height: 1rem;
          width: auto;
        }

        .header-progress {
          display: flex;
          gap: 0.5rem;
        }

        .progress-dot {
          height: 0.5rem;
          border-radius: 9999px;
          background-color: rgba(74, 55, 40, 0.1);
          width: 0.5rem;
          transition: all 0.3s;
        }

        .progress-dot.active {
          width: 2.5rem;
          background-color: #E5A842;
        }

        /* ========== COMPONENTES COMUNES ========== */
        .logo-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .logo-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .logo-image {
          max-width: 200px;
          height: auto;
        }

        .logo-crepes-image {
          max-width: 200px;
          height: auto;
        }

        @media (min-width: 768px) {
          .logo-image {
            max-width: 180px;
          }

          .logo-crepes-image {
            max-width: 180px;
          }
        }

        .brand-part-1,
        .brand-part-2 {
          font-size: 1.25rem;
          font-weight: 900;
          color: #4A3728;
          letter-spacing: -0.025em;
          line-height: 1;
        }

        .tagline {
          text-align: center;
        }

        .tagline h1 {
          font-size: 1.5rem;
          font-weight: bold;
          letter-spacing: 0.2em;
          color: #4A3728;
          line-height: 1;
          margin: 0;
        }

        /* ========== PASOS - ESTRUCTURA BASE ========== */
        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          padding: 2rem;
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(1.25rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

/* ========== STEP 0: SPLASH ========== */
        .step-splash {
          gap: 2rem;
          max-width: 95%;
          border: 1px solid red;
          margin: 0 auto;
        }

/* ========== STEP 1: MISSION ========== */
        .step-mission {
          text-align: center;
          gap: 3rem;
          max-width: 95%;
          border: 1px solid red;
          margin: 0 auto;
        }

        .mission-logo {
          transform: scale(1);
          opacity: 0.5;
          border: 1px solid red;
        }

        .mission-title {
          font-size: 1.875rem;
          line-height: 1.2;
          font-weight: bold;
          color: #4A3728;
          max-width: 42rem;
          border: 1px solid red;
        }

        @media (min-width: 768px) {
          .mission-title {
            font-size: 3rem;
          }
        }

        .btn-arrow {
          padding: 1.25rem;
          background-color: #E5A842;
          border: none;
          border-radius: 9999px;
          color: white;
          cursor: pointer;
          box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-arrow:hover {
          transform: scale(1.1);
        }

/* ========== STEP 2: WELCOME ========== */
        .step-welcome {
          flex-direction: row;
          gap: 3rem;
          max-width: 95%;
          border: 1px solid red;
          margin: 0 auto;
        }

        @media (max-width: 767px) {
          .step-welcome {
            flex-direction: column;
          }
        }

        .welcome-card-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 100%;
        }

        .welcome-card {
          border: 1px solid red;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .welcome-message {
          text-align: center;
          font-size: 1.875rem;
          line-height: 1.2;
          font-weight: bold;
          color: #4A3728;
          max-width: 42rem;
        }

/* ========== STEP 3: LOGIN ========== */
        .step-login {
          flex-direction: row-reverse;
          gap: 3rem;
          border: 1px solid red;
          max-width: 95%;
          margin: 0 auto;
        }

        @media (max-width: 767px) {
          .step-login {
            flex-direction: column;
          }
        }

        .login-title {
          font-size: 1.25rem;
          color: #4A3728;
        }

        .input-wrapper {
          position: relative;
          margin-bottom: 2rem;
        }

        .input-icon {
          position: absolute;
          left: 1.25rem;
          top: 50%;
          transform: translateY(-50%);
          color: #E5A842;
        }

        .login-input {
          width: 100%;
          padding: 1.25rem 1.5rem 1.25rem 3.5rem;
          border: 2px solid #F9F1E7;
          border-radius: 1.875rem;
          font-size: 1.25rem;
          font-weight: bold;
          color: #4A3728;
          transition: border-color 0.2s;
          font-family: 'Montserrat', sans-serif;
        }

        .login-input:focus {
          outline: none;
          border-color: #E5A842;
        }

        .login-input::placeholder {
          color: #ccc;
        }

        .btn-confirm {
          width: 100%;
          padding: 1.25rem;
          border: none;
          border-radius: 1.5rem;
          font-weight: bold;
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.2s;
          background-color: #4A3728;
          color: white;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        }

        .btn-confirm:hover:not(.disabled) {
          background-color: #3a2a1f;
        }

        .btn-confirm.disabled {
          background-color: #e5e7eb;
          color: #a3a3a3;
          cursor: not-allowed;
        }

/* ========== STEP 4: GREETING ========== */
        .step-greeting {
          text-align: center;
        }

        .greeting-badge {
          width: 8rem;
          height: 8rem;
          background-color: #E5A842;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: bounce 1s ease;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-1rem);
          }
        }

        .check-icon {
          color: white;
        }

        .greeting-title {
          font-size: 3rem;
          color: #E5A842;
        }

        .greeting-subtitle {
          font-size: 1.25rem;
          color: #4A3728;
        }

        .greeting-subtitle .highlight {
          color: #E5A842;
          font-weight: bold;
        }

/* ========== STEP 5: QUIZ ========== */
        .step-quiz {
          gap: 0;
        }

        .quiz-card {
          width: 100%;
          text-align: center;
        }

        .quiz-title {
          font-size: 1.875rem;
          color: #4A3728;
        }

        .quiz-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        @media (min-width: 640px) {
          .quiz-buttons {
            flex-direction: row;
          }
        }

        .btn-quiz-option {
          flex: 1;
          padding: 0.5rem 2rem;
          background-color: white;
          border: 4px solid #F9F1E7;
          border-radius: 1.875rem;
          font-size: 2.25rem;
          color: #4A3728;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-quiz-option:hover {
          border-color: #E5A842;
          background-color: #faf5f0;
        }

/* ========== STEP 6: RESULTS ========== */
        .step-results {
          flex-direction: column;
          gap: 0;
          overflow: hidden;
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;

          overflow-y: auto;
          padding-right: 0.5rem;
          margin-top: 2rem;
        }

        @media (min-width: 768px) {
          .results-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .result-card {
          background-color: white;
          padding: 2rem;
          border-radius: 2.5rem;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s;
          border: 1px solid transparent;
        }

        .result-card:hover {
          border: 1px solid #E5A842;
        }

        .result-icon {
          color: #E5A842;
          margin-bottom: 1rem;
          justify-content: center;
          display: flex;
        }

        .result-card-title {
          font-size: 1.25rem;
          font-weight: bold;
          color: #4A3728;
          margin: 0 0 1rem 0;
        }

        .result-description {
          color: #6b7280;
          font-size: 0.875rem;
        }

        .btn-more {
          width: 100%;
          padding: 1rem;
          background-color: #F9F1E7;
          color: #4A3728;
          border: none;
          border-radius: 1rem;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }

        .btn-more:hover {
          background-color: #E5A842;
          color: white;
        }

        .results-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.5rem;
          margin-bottom: 0;
          border-top: 1px solid #e5e7eb;
          gap: 0.5rem;
        }

        .btn-back {
          padding: 0.5rem 2rem;
          font-weight: bold;
          color: #4A3728;
          background: none;
          border: 1px solid #4A3728;
          border-radius: 1rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-back:hover {
          background-color: #f9f1e7;
        }

        .btn-finish {
          padding: 0.5rem 2rem;
          background-color: #E5A842;
          color: white;
          border: none;
          font-weight: 900;
          border-radius: 1rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-finish:hover {
          background-color: #d49735;
        }

        /* ========== STEP 7: HOUSING TYPES ========== */
        .step-housing-types {
          flex-direction: column;
          gap: 0;
          overflow: hidden;
        }

        .housing-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .housing-title {
          font-size: 1.875rem;
          line-height: 1.5;
          font-weight: 900;
          color: #4A3728;
          max-width: 32rem;
          margin: 0 auto 1rem;
        }

        @media (min-width: 768px) {
          .housing-title {
            font-size: 2.25rem;
          }
        }

        .housing-subtitle {
          color: #E5A842;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 0.875rem;
          margin: 0;
        }

        .housing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          flex: 1;
          overflow-y: auto;
          padding-right: 0.5rem;
          margin-bottom: 2rem;
          max-width: 96rem;
          margin-left: auto;
          margin-right: auto;
          width: 100%;
        }

        @media (min-width: 768px) {
          .housing-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .housing-card {
          background-color: white;
          padding: 2.5rem;
          border-radius: 3.125rem;
          box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          border: 4px solid transparent;
          transition: all 0.2s;
        }

        .housing-card:hover {
          border-color: #E5A842;
        }

        .housing-emoji {
          font-size: 3.5rem;
          margin-bottom: 2rem;
          transition: transform 0.2s;
          display: block;
        }

        .housing-card:hover .housing-emoji {
          transform: scale(1.1);
        }

        .housing-card-title {
          font-size: 1.5rem;
          font-weight: 900;
          color: #4A3728;
          margin: 0 0 1rem 0;
        }

        .housing-description {
          color: #6b7280;
          font-size: 1rem;
          line-height: 1.5;
          margin-bottom: 2.5rem;
          flex: 1;
        }

        .btn-discover {
          width: 100%;
          padding: 1.25rem;
          background-color: #E5A842;
          color: white;
          border: none;
          border-radius: 1.875rem;
          font-weight: bold;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(229, 168, 66, 0.3);
          transition: all 0.2s;
        }

        .btn-discover:hover {
          background-color: #d49735;
          transform: translateY(-0.125rem);
        }

        .housing-footer {
          display: flex;
          justify-content: center;
          padding-top: 1.5rem;
        }

        .btn-change {
          padding: 0.75rem 3rem;
          font-weight: bold;
          color: #4A3728;
          background: none;
          border: none;
          text-decoration: underline;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-change:hover {
          opacity: 0.7;
        }

        /* ========== SCROLLBARS PERSONALIZADOS ========== */
        .results-grid::-webkit-scrollbar,
        .housing-grid::-webkit-scrollbar {
          width: 0.25rem;
        }

        .results-grid::-webkit-scrollbar-track,
        .housing-grid::-webkit-scrollbar-track {
          background: transparent;
        }

        .results-grid::-webkit-scrollbar-thumb,
        .housing-grid::-webkit-scrollbar-thumb {
          background: rgba(229, 168, 66, 0.2);
          border-radius: 0.625rem;
        }
      `}</style>
    </div>
  );
};

// 5. EXPORTAR COMPONENTE PRINCIPAL
export default function App() {
  return (
    <FlowProvider>
      <FlowContainer />
    </FlowProvider>
  );
}