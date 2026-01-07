// Configuración para el envío automático de datos
// Puedes cambiar estos valores según tu necesidad

export const API_CONFIG = {
  // Opción 1: Endpoint de API personalizado
  // Ejemplo: 'https://tu-api.com/api/formulario'
  API_ENDPOINT: import.meta.env.VITE_API_ENDPOINT || 'https://formspree.io/f/xdakqkyg',
  
  // Opción 2: Email usando Formspree (gratis hasta 50 envíos/mes)
  // Regístrate en https://formspree.io y reemplaza YOUR_FORM_ID con tu ID
  
  // Opción 3: Webhook personalizado
  // Ejemplo: 'https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID'
  
  // Opción 4: Email directo (requiere EmailJS - configurar después)
  USE_EMAILJS: false,
  EMAILJS_SERVICE_ID: '',
  EMAILJS_TEMPLATE_ID: '',
  EMAILJS_PUBLIC_KEY: '',
  
  // Email de destino (si usas Formspree, este es el email configurado en tu cuenta)
  RECIPIENT_EMAIL: import.meta.env.VITE_RECIPIENT_EMAIL || 'tu-email@ejemplo.com'
};

