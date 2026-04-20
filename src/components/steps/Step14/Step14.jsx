import React from 'react';
import { ArrowLeft, Eye } from 'lucide-react';
import { useFlow } from '../../../context/FlowContext';
import { MOCK_APPLICATIONS } from '../../../data/mockData';
import './Step14.css';

export const Step14 = () => {
  const { goToStep, uiState, updateUIState } = useFlow();
  const expandedRow = uiState.expandedRow;

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completado': return 'status-completed';
      case 'En Proceso': return 'status-processing';
      case 'En Espera': return 'status-waiting';
      default: return 'status-default';
    }
  };

  const handleBackToFlow = () => {
    goToStep(3);
  };

  const toggleExpand = (id) => {
    updateUIState('expandedRow', expandedRow === id ? null : id);
  };

  return (
    <div className="step step-admin-panel">
      <div className="admin-header">
        <button onClick={handleBackToFlow} className="btn-back-flow">
          <ArrowLeft size={18} />
          <span>Volver al Flujo</span>
        </button>
        <h1 className="admin-title">Panel Administrativo</h1>
        <div className="admin-stats">
          <div className="stat-card">
            <span className="stat-label">Total Solicitudes</span>
            <span className="stat-value">{MOCK_APPLICATIONS.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Completadas</span>
            <span className="stat-value">{MOCK_APPLICATIONS.filter(a => a.status === 'Completado').length}</span>
          </div>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Documento</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Tipo</th>
              <th>Beneficio/Observación</th>
              <th>Saldo Pagado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_APPLICATIONS.map((app) => (
              <React.Fragment key={app.id}>
                <tr className={`table-row ${getStatusColor(app.status)}`}>
                  <td className="cell-id">{app.id}</td>
                  <td>{app.document}</td>
                  <td className="cell-name">{app.name}</td>
                  <td>
                    <span className={`status-badge ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td>{app.type}</td>
                  <td className="cell-benefit">{app.benefit}</td>
                  <td className="cell-paid">{app.paid}</td>
                  <td>
                    <button 
                      onClick={() => toggleExpand(app.id)}
                      className="btn-expand"
                      title="Ver detalles"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
                {expandedRow === app.id && (
                  <tr className="expanded-row">
                    <td colSpan="8">
                      <div className="row-details">
                        <h4>Detalles de la Solicitud</h4>
                        <p>{app.details}</p>
                        <div className="details-meta">
                          <span>ID: {app.id}</span>
                          <span>Documento: {app.document}</span>
                          <span>Estado: {app.status}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
