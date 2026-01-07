# Formulario de Información Empresarial - Logística Internacional

Formulario interactivo multi-paso para recopilar información completa de empresas de logística internacional. Diseñado para ser desplegado en Vercel y usado por clientes de forma interactiva.

## 🚀 Características

- **9 Pasos Completos**: Información general, contacto, sobre nosotros, servicios, cobertura, testimonios, estadísticas, FAQ y revisión
- **Guardado Automático**: Los datos se guardan automáticamente en localStorage
- **Validación en Tiempo Real**: Validación por paso antes de avanzar
- **Drag & Drop**: Reordenar servicios y diferenciadores
- **Exportación**: Descargar datos como JSON o copiar al portapapeles
- **Responsive**: Diseño adaptativo para móviles, tablets y desktop
- **Progreso Visual**: Barra de progreso y stepper con indicadores de completitud

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn

## 🛠️ Instalación Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   ```
   http://localhost:5173
   ```

## 🏗️ Build para Producción

```bash
npm run build
```

El build se generará en la carpeta `dist/`.

## 🚀 Despliegue en Vercel

### Opción 1: Desde GitHub (Recomendado)

1. **Sube tu código a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <tu-repositorio-github>
   git push -u origin main
   ```

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con GitHub
   - Click en "Add New Project"
   - Selecciona tu repositorio
   - Vercel detectará automáticamente la configuración de Vite
   - Click en "Deploy"

### Opción 2: Desde CLI de Vercel

1. **Instala Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Despliega:**
   ```bash
   vercel
   ```

3. **Para producción:**
   ```bash
   vercel --prod
   ```

### Configuración Automática

El proyecto incluye `vercel.json` con la configuración necesaria:
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Rewrites para SPA (Single Page Application)

## 📁 Estructura del Proyecto

```
├── src/
│   ├── components/
│   │   └── LogisticsCompanyForm.jsx  # Componente principal
│   ├── App.jsx                        # Componente raíz
│   ├── main.jsx                       # Punto de entrada
│   └── index.css                      # Estilos globales (Tailwind)
├── index.html                         # HTML principal
├── package.json                       # Dependencias
├── vite.config.js                     # Configuración de Vite
├── tailwind.config.js                 # Configuración de Tailwind
├── postcss.config.js                  # Configuración de PostCSS
├── vercel.json                        # Configuración de Vercel
└── README.md                          # Este archivo
```

## 🎨 Tecnologías Utilizadas

- **React 18**: Biblioteca de UI
- **Vite**: Build tool y dev server
- **Tailwind CSS**: Framework de estilos
- **LocalStorage**: Persistencia de datos del cliente

## 📝 Uso del Formulario

1. **Paso 1 - Información General**: Datos básicos de la empresa
2. **Paso 2 - Datos de Contacto**: Información de contacto y redes sociales
3. **Paso 3 - Sobre Nosotros**: Historia, misión, visión, valores, certificaciones
4. **Paso 4 - Servicios**: Lista de servicios ofrecidos
5. **Paso 5 - Cobertura**: Regiones y países de operación
6. **Paso 6 - Testimonios**: Testimonios de clientes (mínimo 3)
7. **Paso 7 - Estadísticas**: Métricas y diferenciadores
8. **Paso 8 - FAQ y Contenido**: Preguntas frecuentes y contenido hero
9. **Paso 9 - Revisión**: Revisión completa y exportación

## 💾 Guardado de Datos

- Los datos se guardan automáticamente en `localStorage` del navegador
- Si el usuario cierra la página, puede restaurar su progreso
- Los datos se exportan como JSON al finalizar

## 🔧 Personalización

### Cambiar el Título

Edita `src/components/LogisticsCompanyForm.jsx` y busca:
```jsx
<h1 className="text-3xl font-bold text-gray-800 mb-2">
  Recopilación de Información Empresarial
</h1>
```

### Modificar Colores

Edita `tailwind.config.js` para personalizar la paleta de colores.

## 📄 Licencia

Este proyecto es de uso libre para recopilación de información empresarial.

## 🆘 Soporte

Para problemas o preguntas, revisa la documentación de:
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/docs)

