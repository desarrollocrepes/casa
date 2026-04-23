import React, { useState } from 'react';
import { ArrowRight, User, Lock, Eye, EyeOff, Loader } from 'lucide-react';
import axios from 'axios';
import { useFlow } from '../../context/FlowContext';
import './Step3.css';

const ADMIN_DOCUMENT = '1028783377';
const ADMIN_PASSWORD = 'crepes';

const API_URL = import.meta.env.VITE_API_BASE_URL;
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const Step3 = () => {
  const { nextStep, formData, updateFormData, goToStep } = useFlow();
  const { documentNumber } = formData;
  
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDocumentChange = (e) => {
    const value = e.target.value;
    updateFormData('documentNumber', value);
    setLoginError('');
    
    // Detectar si es admin
    if (value === ADMIN_DOCUMENT) {
      setIsAdmin(true);
      setPassword('');
    } else {
      setIsAdmin(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setLoginError('');
  };

  const validateUserFromAPI = async (cedula) => {
    try {
      setLoading(true);
      setLoginError('');

      const response = await axios.get(
        `${API_URL}${API_ENDPOINT}?documento=${cedula}`
      );

      if (!response.data.data || response.data.data.length === 0) {
        setLoginError('Usuario no encontrado');
        setLoading(false);
        return false;
      }

      const empleado = response.data.data[0];

      // Validar que el usuario esté activo
      if (empleado.status && empleado.status.toLowerCase() === 'inactivo') {
        setLoginError('Usuario inactivo');
        setLoading(false);
        return false;
      }

      // Guardar datos del empleado en el contexto
      updateFormData('userName', empleado.nombre || '');
      updateFormData('empleadoData', empleado);

      setLoading(false);
      return true;
    } catch (error) {
      setLoginError('Error al conectar con el servidor. Intenta más tarde');
      setLoading(false);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!documentNumber.trim()) {
      setLoginError('Por favor ingresa tu número de documento');
      return;
    }

    if (isAdmin && !password.trim()) {
      setLoginError('Por favor ingresa tu contraseña');
      return;
    }

    // Validar credenciales admin
    if (isAdmin) {
      if (password !== ADMIN_PASSWORD) {
        setLoginError('Contraseña incorrecta');
        return;
      }
      // Admin autenticado
      goToStep(14);
      return;
    }

    // Validar usuario desde API
    const isValid = await validateUserFromAPI(documentNumber);
    if (isValid) {
      nextStep();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit();
    }
  };

  return (
    <div className="step step-login">
      <div className="login-card-container">
        <div className="login-card">
          <h2 className="title">
            Ingresa por favor tu número de documento para continuar:
          </h2>

          {/* Campo Documento */}
          <div className="login-form-group">
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input
                type="number"
                placeholder="Ej: 1234567890"
                value={documentNumber}
                onChange={handleDocumentChange}
                onKeyPress={handleKeyPress}
                className="login-input"
                disabled={loading}
              />
            </div>
          </div>

          {/* Mostrar campo de contraseña solo para admin */}
          {isAdmin && (
            <div className="login-form-group">
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={handlePasswordChange}
                  onKeyPress={handleKeyPress}
                  className="login-input"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn-toggle-password"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          )}

          {/* Mensaje de error */}
          {loginError && (
            <div className="error-message">
              {loginError}
            </div>
          )}

          {/* Botón Continuar */}
          <button
            onClick={handleSubmit}
            disabled={loading || !documentNumber.trim() || (isAdmin && !password.trim())}
            className={`btn-arrow ${
              loading ? 'loading' : ''
            } ${
              documentNumber.trim() && (!isAdmin || password.trim())
                ? ''
                : 'disabled'
            }`}
          >
            {loading ? (
              <>
                <span></span>
              </>
            ) : (
              <>
                <span>
                  {isAdmin ? '' : ''}
                </span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
