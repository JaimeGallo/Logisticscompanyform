# 📧 Guía de Configuración de Envío Automático

## Opción Recomendada: Formspree (Gratis)

### Paso 1: Crear cuenta en Formspree

1. Ve a [https://formspree.io](https://formspree.io)
2. Regístrate con tu email (gratis hasta 50 envíos/mes)
3. Verifica tu email

### Paso 2: Crear un formulario

1. En el dashboard de Formspree, haz clic en **"New Form"**
2. Asigna un nombre (ej: "Formulario Logística")
3. Configura el email donde quieres recibir los datos
4. **Copia el Form ID** que aparece (algo como: `xvgkqyzw`)

### Paso 3: Configurar en Vercel

#### Opción A: Variables de Entorno en Vercel (Recomendado)

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Ve a **Settings** → **Environment Variables**
3. Agrega las siguientes variables:
   - **Name**: `VITE_API_ENDPOINT`
   - **Value**: `https://formspree.io/f/TU_FORM_ID` (reemplaza TU_FORM_ID)
   - **Environment**: Production, Preview, Development (marca todas)
4. Haz clic en **Save**
5. Ve a **Deployments** y haz **Redeploy** del último deployment

#### Opción B: Archivo .env local

1. Crea un archivo `.env` en la raíz del proyecto:
   ```env
   VITE_API_ENDPOINT=https://formspree.io/f/TU_FORM_ID
   VITE_RECIPIENT_EMAIL=tu-email@ejemplo.com
   ```
2. Reemplaza `TU_FORM_ID` con tu Form ID de Formspree
3. **NO subas el archivo .env a GitHub** (ya está en .gitignore)
4. Reconstruye: `npm run build`

### Paso 4: Probar

1. Completa el formulario en tu sitio
2. En el paso 9, haz clic en **"Enviar y Exportar"**
3. Deberías recibir un email en la dirección configurada en Formspree
4. El email incluirá todos los datos del formulario

---

## Opción Alternativa: API Personalizada

Si tienes tu propio servidor/API:

1. Crea un endpoint que acepte POST requests
2. El endpoint debe aceptar JSON con esta estructura:
   ```json
   {
     "formData": { /* todos los datos del formulario */ },
     "empresa": "Nombre de la empresa",
     "email": "email@ejemplo.com",
     "datos_completos": "JSON stringificado"
   }
   ```
3. Configura `VITE_API_ENDPOINT` con la URL de tu endpoint
4. Tu endpoint debe responder con status 200 para indicar éxito

---

## Opción Alternativa: Webhook (Zapier, Make, etc.)

1. Crea un webhook en tu plataforma
2. Configura `VITE_API_ENDPOINT` con la URL del webhook
3. Los datos se enviarán automáticamente cuando el cliente complete el formulario

---

## Solución de Problemas

### No recibo los emails

- Verifica que el Form ID sea correcto
- Revisa la carpeta de spam
- Asegúrate de haber verificado tu email en Formspree
- Verifica que el deployment en Vercel tenga las variables de entorno configuradas

### Error al enviar

- Revisa la consola del navegador (F12) para ver el error específico
- Verifica que la URL del endpoint sea correcta
- Asegúrate de que tu endpoint acepte requests CORS desde tu dominio

### Los datos no se envían

- Verifica que `VITE_API_ENDPOINT` esté configurado correctamente
- Asegúrate de haber hecho redeploy después de cambiar las variables de entorno
- Revisa que el endpoint esté activo y funcionando

---

## Estructura de Datos Enviados

Los datos se envían en este formato:

```json
{
  "_subject": "Nuevo formulario: Nombre de la Empresa",
  "_replyto": "email@empresa.com",
  "empresa": "Nombre de la Empresa",
  "email": "email@empresa.com",
  "telefono": "+57 601 123 4567",
  "datos_completos": "JSON completo del formulario",
  "formData": {
    "legalName": "...",
    "commercialName": "...",
    // ... todos los campos del formulario
  }
}
```

