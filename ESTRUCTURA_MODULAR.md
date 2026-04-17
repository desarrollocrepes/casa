# 🏗️ Estructura Modular Refactorizada - Casa Crepes &amp; Waffles

## Organización del Proyecto (Modular por Steps)

```
src/
├── App.jsx                          # Componente principal (importa todos los steps)
├── main.jsx                         # Entry point
│
├── context/
│   └── FlowContext.jsx              # Context global + Hook useFlow
│
├── components/
│   ├── common/
│   │   ├── LogoContainer.jsx        # Componente compartido (logos)
│   │   ├── Header.jsx               # Header + Progress dots
│   │   └── common.css               # Estilos de componentes comunes
│   │
│   └── steps/
│       ├── Step0/
│       │   ├── Step0.jsx            # Splash (animación 3s)
│       │   └── Step0.css
│       │
│       ├── Step1/
│       │   ├── Step1.jsx            # Misión / Bienvenida
│       │   └── Step1.css
│       │
│       ├── Step2/
│       │   ├── Step2.jsx            # Welcome card
│       │   └── Step2.css
│       │
│       ├── Step3/
│       │   ├── Step3.jsx            # Login (documento)
│       │   └── Step3.css
│       │
│       ├── Step4/
│       │   ├── Step4.jsx            # Saludo personalizado
│       │   └── Step4.css
│       │
│       ├── Step5/
│       │   ├── Step5.jsx            # Quiz (¿Vivienda propia?)
│       │   └── Step5.css
│       │
│       ├── Step6/
│       │   ├── Step6.jsx            # Resultados (si tiene vivienda)
│       │   └── Step6.css
│       │
│       ├── Step7/
│       │   ├── Step7.jsx            # Tipos de vivienda + Modal
│       │   └── Step7.css
│       │
│       ├── Step8/
│       │   ├── Step8.jsx            # Presupuesto
│       │   └── Step8.css
│       │
│       └── Step9/
│           ├── Step9.jsx            # Cuentas (30% / 70%)
│           └── Step9.css
│
├── styles/
│   └── globals.css                  # Estilos globales (temas, colores, animaciones)
│
├── assets/
│   ├── fonts/
│   └── logos/
│
public/
├── favicon.txt
└── logoscrepes.txt
```

## Cambios Principales

### ✅ Context Centralizado
- **`src/context/FlowContext.jsx`**: Gestión de estado global
  - `step`: Paso actual (0-9)
  - `formData`: Datos del formulario
  - Métodos: `nextStep()`, `prevStep()`, `goToStep()`, `updateFormData()`, `resetFlow()`

### ✅ Componentes Modularizados
Cada **Step** es un componente independiente con:
- **`StepX.jsx`**: Lógica JSX + interactividad
- **`StepX.css`**: Estilos específicos del step

### ✅ Componentes Comunes Reutilizables
- **`LogoContainer.jsx`**: Logos que aparecen en múltiples steps
- **`Header.jsx`**: Barra de navegación y progress dots
- **`common.css`**: Estilos compartidos

### ✅ Estilos Centralizados
- **`styles/globals.css`**: 
  - Variables de color
  - Animaciones globales
  - Clases base reutilizables
  - Botones comunes
  - Modal styles

## Ventajas de esta Estructura

| Aspecto | Beneficio |
|--------|----------|
| **Mantenibilidad** | Cada step es independiente y fácil de editar |
| **Escalabilidad** | Agregar nuevos steps es trivial |
| **Reutilización** | Componentes comunes centralizados |
| **Performance** | CSS separado por componente (tree-shakeable) |
| **Debugging** | Errores aislados por step |
| **Colaboración** | Múltiples personas pueden trabajar en steps diferentes |
| **Organización** | Estructura clara y predecible |

## Cómo Agregar un Nuevo Step

### 1. Crear carpeta
```bash
mkdir src/components/steps/Step10
```

### 2. Crear archivos JSX y CSS
```jsx
// Step10.jsx
import React from 'react';
import { useFlow } from '../../context/FlowContext';
import './Step10.css';

export const Step10 = () => {
  const { nextStep, prevStep } = useFlow();
  
  return (
    <div className="step step-custom">
      {/* Contenido */}
    </div>
  );
};
```

```css
/* Step10.css */
.step-custom {
  /* Estilos específicos */
}
```

### 3. Importar en App.jsx
```jsx
// En imports
import { Step10 } from './components/steps/Step10/Step10';
import './components/steps/Step10/Step10.css';

// En renderStep()
case 10: return <Step10 />;
```

## Recursos de Color

- **Principal (Gold)**: `#E5A842`
- **Secundario (Marrón)**: `#4A3728`
- **Fondo**: `#F9F1E7`
- **Texto**: `#4A3728`
- **Gris neutral**: `#6b7280`

## Variables de Fuente

- **Familia**: Montserrat
- **Weights**: 400, 600, 700, 900
- **Título grande**: 3rem (768px+) / 1.875rem (móvil)
- **Texto normal**: 1rem / 0.875rem

## Próximos Pasos Recomendados

- [ ] Crear variables CSS (`--color-primary`, etc.)
- [ ] Extraer utilidades comunes a `utils/`
- [ ] Implementar tests unitarios por step
- [ ] Agregar transiciones entre steps
- [ ] Sistema de persistencia de datos (localStorage)
