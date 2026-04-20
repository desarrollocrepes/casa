/**
 * Mock Data para componentes
 * En producción, estos datos vendrían de APIs reales
 */

export const MOCK_APPLICATIONS = [
  {
    id: 'SOL001',
    document: '1087654321',
    name: 'Laura Estela Corrales',
    status: 'En Proceso',
    type: 'Vivienda VIS',
    benefit: 'Acceso a subsidio estatal',
    paid: '$50,000.00',
    details: 'Solicitud completada, en revisión de documentación. Falta acta de matrimonio para confirmar grupo familiar.'
  },
  {
    id: 'SOL002',
    document: '1098765432',
    name: 'Juan Carlos Pérez',
    status: 'Completado',
    type: 'Vivienda Usada',
    benefit: 'Crédito hipotecario aprobado',
    paid: '$150,000.00',
    details: 'Crédito aprobado por $180,000,000. Documentación completa entregada. Cliente en búsqueda de inmueble.'
  },
  {
    id: 'SOL003',
    document: '1076543210',
    name: 'Claudia Albertina Rodrígez',
    status: 'En Espera',
    type: 'Vivienda No VIS',
    benefit: 'Evaluación de capacidad',
    paid: '$0.00',
    details: 'En espera de documento de ingresos del mes actual. Cliente será contactado el próximo lunes.'
  },
  {
    id: 'SOL004',
    document: '1054321098',
    name: 'María Andrea Moreno Moyo',
    status: 'Completado',
    type: 'Crédito Mejora',
    benefit: 'Crédito de mejora aprobado',
    paid: '$75,000.00',
    details: 'Crédito de $45,000,000 para mejora de vivienda. Documentación completada y aprobada.'
  }
];

export const HOUSING_TYPES = [
  { id: 'vis', label: 'Vivienda VIS', value: 'vis' },
  { id: 'usada', label: 'Vivienda Usada', value: 'usada' },
  { id: 'no-vis', label: 'Vivienda No VIS', value: 'no-vis' },
  { id: 'mejora', label: 'Crédito Mejora', value: 'mejora' }
];
