# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```







Características Implementadas
✅ Autenticación simulada

Login con credenciales de prueba
Persistencia de sesión en localStorage
Redirecciones automáticas

✅ Menú lateral y rutas protegidas

Sidebar navegable
Protección de rutas privadas
Redirección automática según estado de autenticación

✅ Página de Productos

Tabla editable con paginación
Búsqueda en tiempo real
Operaciones CRUD completas

✅ Gestión de Estado Global

Store de autenticación con Zustand
Store de productos con persistencia
Estado reactivo y performante

✅ Interfaz con Radix UI

Componentes accesibles y personalizables
Modales, dropdowns, formularios
Diseño responsive

✅ Mock API

Simulación de backend con localStorage
Operaciones async/await
Manejo de errores

✅ Pruebas Unitarias

Tests para stores (Zustand)
Tests para componentes
Cobertura de casos críticos

🏃‍♂️ Instalación y Ejecución
Prerrequisitos

Node.js (versión 18 o superior)
npm o yarn

Instalación
bash# Clonar o crear el proyecto
npm create vite@latest prueba-tecnica-frontend -- --template react-ts

# Instalar dependencias
npm install

# Instalar dependencias específicas del proyecto
npm install @radix-ui/react-avatar @radix-ui/react-button @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-form @radix-ui/react-icons @radix-ui/react-label @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-table @radix-ui/react-toast @tanstack/react-router axios zustand

# Instalar dependencias de desarrollo
npm install -D @tanstack/router-devtools @tanstack/router-vite-plugin @vitest/ui jsdom @testing-library/react @testing-library/jest-dom
Ejecución
bash# Modo desarrollo
npm run dev

# Ejecutar pruebas
npm run test

# Ejecutar pruebas con interfaz visual
npm run test:ui

# Construir para producción
npm run build
🔐 Credenciales de Prueba
Para acceder a la aplicación, utiliza las siguientes credenciales:

Email: admin@test.com
Password: password

📁 Estructura del Proyecto
src/
├── components/           # Componentes reutilizables
│   ├── Layout/          # Componentes de layout
│   ├── Products/        # Componentes relacionados con productos
│   ├── UI/              # Componentes de interfaz
│   └── __tests__/       # Pruebas de componentes
├── pages/               # Páginas de la aplicación
├── store/               # Estados globales con Zustand
│   └── __tests__/       # Pruebas de stores
├── services/            # Servicios y API
├── test/                # Configuración de pruebas
├── App.tsx              # Componente principal
├── main.tsx             # Punto de entrada
├── router.tsx           # Configuración de rutas
└── index.css            # Estilos globales
🎯 Funcionalidades Principales
Dashboard

Resumen estadístico del inventario
Visualización de productos recientes
Navegación rápida a gestión de productos

Gestión de Productos

Lista paginada de productos
Búsqueda en tiempo real por nombre y categoría
Creación de nuevos productos
Edición inline de productos existentes
Eliminación con confirmación
Validación de formularios

Autenticación

Login simulado con validación
Persistencia de sesión
Logout seguro
Protección de rutas

Interfaz de Usuario

Diseño responsive
Componentes accesibles
Feedback visual para acciones
Estados de carga

🧪 Pruebas
El proyecto incluye pruebas unitarias completas para:
Stores (Zustand)

AuthStore: Login, logout, persistencia de sesión
ProductsStore: CRUD de productos, filtrado, paginación

Componentes

LoginPage: Validación, estados de carga, manejo de errores
ProductForm: Creación/edición, validación de campos

Ejecutar Pruebas
bash# Ejecutar todas las pruebas
npm run test

# Ejecutar pruebas en modo watch
npm run test -- --watch

# Ejecutar pruebas con interfaz visual
npm run test:ui

# Ejecutar pruebas con cobertura
npm run test -- --coverage
🔧 Configuración Técnica
Vite Configuration

Plugin de React configurado
Plugin de TanStack Router
Configuración de testing con Vitest

TypeScript

Configuración estricta habilitada
Tipos para testing-library y Vitest
Resolución de módulos optimizada

Tailwind CSS

Configuración personalizada
Colores de tema consistentes
Utilidades responsive

📱 Responsive Design
La aplicación está optimizada para diferentes tamaños de pantalla:

Desktop: Layout completo con sidebar
Tablet: Adaptación del grid y espaciados
Mobile: Sidebar colapsable y layout vertical

🚀 Optimizaciones
Performance

Lazy loading de componentes
Memorización de cálculos complejos
Estado global optimizado con Zustand

UX/UI

Estados de carga consistentes
Feedback visual para todas las acciones
Validación en tiempo real
Mensajes de error descriptivos

Accesibilidad

Componentes Radix UI accesibles por defecto
Navegación por teclado
Roles ARIA apropiados
Contraste de colores adecuado

🎨 Guía de Estilos
Colores Principales

Azul: #3b82f6 (botones primarios, enlaces)
Gris: #6b7280 (texto secundario)
Verde: #10b981 (estados exitosos)
Rojo: #ef4444 (errores, eliminación)
Amarillo: #f59e0b (advertencias)

Tipografía

Fuente: Sistema (San Francisco, Segoe UI, Roboto)
Tamaños: Escala modular de Tailwind
Pesos: Regular (400), Medium (500), Semibold (600), Bold (700)

🔄 Flujo de Datos
Autenticación

Usuario ingresa credenciales
AuthStore valida y guarda usuario
Router protege/permite acceso a rutas
Persistencia en localStorage

Gestión de Productos

ProductsStore maneja estado global
Mock API simula operaciones de backend
Componentes reactivos a cambios de estado
Paginación y filtrado en tiempo real

📋 Lista de Verificación
Requisitos Técnicos

✅ React con Hooks
✅ Vite como bundler
✅ Zustand para estado global
✅ TanStack Router para rutas
✅ Radix UI para componentes
✅ Vitest para pruebas unitarias

Funcionalidades

✅ Autenticación simulada
✅ Menú lateral y rutas protegidas
✅ Página de productos con tabla editable
✅ Paginación y búsqueda
✅ Formulario de creación de productos
✅ Mock API con localStorage
✅ Pruebas unitarias
