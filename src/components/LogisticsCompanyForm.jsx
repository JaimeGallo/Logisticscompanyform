import React, { useState, useEffect, useCallback } from 'react';
import { API_CONFIG } from '../config.js';

// Iconos inline para evitar dependencias
const Icons = {
  Check: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Plus: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Trash: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  ),
  ChevronRight: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
  Download: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  Copy: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  Star: ({ filled }) => (
    <svg className={`w-6 h-6 ${filled ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  GripVertical: () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 6h.01M8 12h.01M8 18h.01M16 6h.01M16 12h.01M16 18h.01" />
    </svg>
  ),
  Info: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Edit: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Restore: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  Warning: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  Send: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  ),
  CheckCircle: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};

// Estado inicial del formulario
const initialFormData = {
  // Paso 1: Información General
  legalName: '',
  commercialName: '',
  nit: '',
  foundationYear: '',
  experienceYears: '',
  employeeCount: '',
  operatingCountries: '',
  slogan: '',
  
  // Paso 2: Datos de Contacto
  mainAddress: '',
  city: '',
  country: '',
  mainPhone: '',
  whatsapp: '',
  generalEmail: '',
  quotationEmail: '',
  businessHours: '',
  facebook: '',
  instagram: '',
  linkedin: '',
  twitter: '',
  
  // Paso 3: Sobre Nosotros
  history: '',
  mission: '',
  vision: '',
  values: ['', '', '', ''],
  certifications: [],
  milestones: [],
  
  // Paso 4: Servicios
  services: [],
  
  // Paso 5: Cobertura Geográfica
  originRegions: [],
  specificCountries: {},
  colombianCities: [],
  
  // Paso 6: Testimonios
  testimonials: [],
  
  // Paso 7: Estadísticas y Diferenciadores
  containersPerYear: '',
  activeClients: '',
  coverageCountries: '',
  onTimeDeliveryRate: '',
  differentiators: ['', '', '', '', ''],
  
  // Paso 8: FAQ y Contenido
  faqs: [],
  heroTitle: '',
  heroSubtitle: ''
};

// Regiones y países disponibles
const regionsData = {
  'Asia': ['China', 'Japón', 'Corea del Sur', 'India', 'Vietnam', 'Tailandia', 'Singapur', 'Malasia', 'Indonesia', 'Taiwán'],
  'Europa': ['Alemania', 'España', 'Francia', 'Italia', 'Países Bajos', 'Reino Unido', 'Bélgica', 'Portugal', 'Polonia', 'Suecia'],
  'Norteamérica': ['Estados Unidos', 'Canadá', 'México'],
  'Centroamérica y Caribe': ['Panamá', 'Costa Rica', 'Guatemala', 'Honduras', 'República Dominicana', 'Puerto Rico'],
  'Sudamérica': ['Brasil', 'Argentina', 'Chile', 'Perú', 'Ecuador', 'Venezuela', 'Uruguay', 'Paraguay', 'Bolivia'],
  'Oceanía': ['Australia', 'Nueva Zelanda'],
  'África': ['Sudáfrica', 'Egipto', 'Marruecos', 'Nigeria', 'Kenia']
};

const colombianCitiesOptions = [
  'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga', 
  'Pereira', 'Manizales', 'Cúcuta', 'Santa Marta', 'Ibagué', 'Villavicencio',
  'Pasto', 'Montería', 'Neiva', 'Armenia', 'Valledupar', 'Popayán', 'Sincelejo', 'Tunja'
];

const steps = [
  { id: 1, name: 'Información General', shortName: 'General' },
  { id: 2, name: 'Datos de Contacto', shortName: 'Contacto' },
  { id: 3, name: 'Sobre Nosotros', shortName: 'Nosotros' },
  { id: 4, name: 'Servicios', shortName: 'Servicios' },
  { id: 5, name: 'Cobertura', shortName: 'Cobertura' },
  { id: 6, name: 'Testimonios', shortName: 'Testimonios' },
  { id: 7, name: 'Estadísticas', shortName: 'Stats' },
  { id: 8, name: 'FAQ y Contenido', shortName: 'FAQ' },
  { id: 9, name: 'Revisión', shortName: 'Revisión' }
];

// Componente de Tooltip
const Tooltip = ({ text, children }) => {
  const [show, setShow] = useState(false);
  
  return (
    <div className="relative inline-block">
      <div 
        onMouseEnter={() => setShow(true)} 
        onMouseLeave={() => setShow(false)}
        className="cursor-help"
      >
        {children}
      </div>
      {show && (
        <div className="absolute z-50 w-64 p-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg -top-2 left-6 transform -translate-y-full">
          {text}
          <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -bottom-1 left-4"></div>
        </div>
      )}
    </div>
  );
};

// Componente de Input con Label
const FormInput = ({ label, required, tooltip, error, charCount, maxLength, ...props }) => (
  <div className="mb-4">
    <label className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500">*</span>}
      {tooltip && (
        <Tooltip text={tooltip}>
          <Icons.Info />
        </Tooltip>
      )}
    </label>
    <input
      {...props}
      maxLength={maxLength}
      className={`w-full px-4 py-2 border rounded-lg transition-all duration-200 
        ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}
        focus:outline-none focus:ring-2 focus:ring-opacity-50`}
    />
    {charCount && maxLength && (
      <div className="mt-1 text-xs text-gray-500 text-right">
        {props.value?.length || 0} / {maxLength}
      </div>
    )}
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

// Componente de Textarea con contador
const FormTextarea = ({ label, required, tooltip, charCount, maxLength, ...props }) => (
  <div className="mb-4">
    <label className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500">*</span>}
      {tooltip && (
        <Tooltip text={tooltip}>
          <Icons.Info />
        </Tooltip>
      )}
    </label>
    <textarea
      {...props}
      maxLength={maxLength}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none transition-all duration-200 resize-none"
    />
    {charCount && (
      <div className="mt-1 text-xs text-gray-500 text-right">
        {props.value?.length || 0} / {maxLength || '∞'}
      </div>
    )}
  </div>
);

// Componente de Rating con Estrellas
const StarRating = ({ value, onChange }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => onChange(star)}
        className="focus:outline-none transform hover:scale-110 transition-transform"
      >
        <Icons.Star filled={star <= value} />
      </button>
    ))}
  </div>
);

// Componente principal
export default function LogisticsCompanyForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [hasDraft, setHasDraft] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDraftAlert, setShowDraftAlert] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState(null);

  // Cargar datos de localStorage al iniciar
  useEffect(() => {
    const savedData = localStorage.getItem('logisticsFormData');
    const savedStep = localStorage.getItem('logisticsFormStep');
    
    if (savedData) {
      setHasDraft(true);
      setShowDraftAlert(true);
    }
    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem('logisticsFormData', JSON.stringify(formData));
    localStorage.setItem('logisticsFormStep', currentStep.toString());
  }, [formData, currentStep]);

  // Restaurar borrador
  const restoreDraft = () => {
    const savedData = localStorage.getItem('logisticsFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    setShowDraftAlert(false);
  };

  // Limpiar formulario
  const clearForm = () => {
    setFormData(initialFormData);
    localStorage.removeItem('logisticsFormData');
    localStorage.removeItem('logisticsFormStep');
    setCurrentStep(1);
    setShowDraftAlert(false);
  };

  // Actualizar campo simple
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Actualizar array en índice específico
  const updateArrayField = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  // Agregar item a array
  const addArrayItem = (field, defaultValue = '') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], defaultValue]
    }));
  };

  // Eliminar item de array
  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // Validación por paso
  const validateStep = (step) => {
    const newErrors = {};
    
    switch(step) {
      case 1:
        if (!formData.legalName) newErrors.legalName = 'Campo obligatorio';
        if (!formData.commercialName) newErrors.commercialName = 'Campo obligatorio';
        if (!formData.nit) newErrors.nit = 'Campo obligatorio';
        if (!formData.foundationYear) newErrors.foundationYear = 'Campo obligatorio';
        if (!formData.experienceYears) newErrors.experienceYears = 'Campo obligatorio';
        if (!formData.operatingCountries) newErrors.operatingCountries = 'Campo obligatorio';
        if (!formData.slogan) newErrors.slogan = 'Campo obligatorio';
        break;
      case 2:
        if (!formData.mainAddress) newErrors.mainAddress = 'Campo obligatorio';
        if (!formData.city) newErrors.city = 'Campo obligatorio';
        if (!formData.country) newErrors.country = 'Campo obligatorio';
        if (!formData.mainPhone) newErrors.mainPhone = 'Campo obligatorio';
        if (!formData.whatsapp) newErrors.whatsapp = 'Campo obligatorio';
        if (!formData.generalEmail) newErrors.generalEmail = 'Campo obligatorio';
        if (!formData.businessHours) newErrors.businessHours = 'Campo obligatorio';
        break;
      case 3:
        if (!formData.history) newErrors.history = 'Campo obligatorio';
        if (!formData.mission) newErrors.mission = 'Campo obligatorio';
        if (!formData.vision) newErrors.vision = 'Campo obligatorio';
        if (formData.values.filter(v => v.trim()).length < 4) {
          newErrors.values = 'Mínimo 4 valores corporativos';
        }
        break;
      case 4:
        if (formData.services.length === 0) {
          newErrors.services = 'Agrega al menos un servicio';
        }
        break;
      case 5:
        if (formData.originRegions.length === 0) {
          newErrors.originRegions = 'Selecciona al menos una región';
        }
        break;
      case 6:
        if (formData.testimonials.length < 3) {
          newErrors.testimonials = 'Agrega al menos 3 testimonios';
        }
        break;
      case 7:
        // Estadísticas son opcionales
        break;
      case 8:
        if (!formData.heroTitle) newErrors.heroTitle = 'Campo obligatorio';
        if (!formData.heroSubtitle) newErrors.heroSubtitle = 'Campo obligatorio';
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Verificar si un paso está completo
  const isStepComplete = (step) => {
    switch(step) {
      case 1:
        return formData.legalName && formData.commercialName && formData.nit && 
               formData.foundationYear && formData.experienceYears && 
               formData.operatingCountries && formData.slogan;
      case 2:
        return formData.mainAddress && formData.city && formData.country && 
               formData.mainPhone && formData.whatsapp && formData.generalEmail && 
               formData.businessHours;
      case 3:
        return formData.history && formData.mission && formData.vision && 
               formData.values.filter(v => v.trim()).length >= 4;
      case 4:
        return formData.services.length > 0;
      case 5:
        return formData.originRegions.length > 0;
      case 6:
        return formData.testimonials.length >= 3;
      case 7:
        return true; // Opcional
      case 8:
        return formData.heroTitle && formData.heroSubtitle;
      default:
        return false;
    }
  };

  // Navegación
  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 9) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToStep = (step) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Exportar JSON
  const exportJSON = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${formData.commercialName || 'empresa'}_datos.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Copiar al portapapeles
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  // Enviar datos automáticamente
  const sendData = async () => {
    setSending(true);
    setSendError(null);
    setSent(false);

    try {
      const payload = {
        ...formData,
        submittedAt: new Date().toISOString(),
        formVersion: '1.0'
      };

      // Enviar a Formspree o endpoint personalizado
      const response = await fetch(API_CONFIG.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          // Formato para Formspree
          _subject: `Nuevo formulario: ${formData.commercialName || 'Empresa'}`,
          _replyto: formData.generalEmail || API_CONFIG.RECIPIENT_EMAIL,
          empresa: formData.commercialName,
          email: formData.generalEmail,
          telefono: formData.mainPhone,
          datos_completos: JSON.stringify(payload, null, 2),
          // También enviar como JSON estructurado
          formData: payload
        })
      });

      if (!response.ok) {
        throw new Error(`Error al enviar: ${response.statusText}`);
      }

      const result = await response.json();
      setSent(true);
      
      // También descargar el JSON localmente
      exportJSON();
      
      // Limpiar después de 5 segundos
      setTimeout(() => {
        setSent(false);
      }, 5000);

    } catch (error) {
      console.error('Error al enviar datos:', error);
      setSendError(error.message || 'Error al enviar los datos. Por favor, intenta descargar la copia manualmente.');
      setSending(false);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e, index, field) => {
    setDraggedItem({ index, field });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex, field) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.field !== field) return;
    
    const items = [...formData[field]];
    const draggedItemContent = items[draggedItem.index];
    items.splice(draggedItem.index, 1);
    items.splice(dropIndex, 0, draggedItemContent);
    
    setFormData(prev => ({ ...prev, [field]: items }));
    setDraggedItem(null);
  };

  // Calcular progreso total
  const totalProgress = () => {
    let completed = 0;
    for (let i = 1; i <= 8; i++) {
      if (isStepComplete(i)) completed++;
    }
    return Math.round((completed / 8) * 100);
  };

  // Contar campos faltantes
  const countMissingFields = () => {
    let missing = [];
    if (!formData.legalName) missing.push('Nombre legal');
    if (!formData.commercialName) missing.push('Nombre comercial');
    if (!formData.nit) missing.push('NIT');
    if (!formData.mainAddress) missing.push('Dirección');
    if (!formData.history) missing.push('Historia');
    if (!formData.mission) missing.push('Misión');
    if (!formData.vision) missing.push('Visión');
    if (formData.services.length === 0) missing.push('Servicios');
    if (formData.testimonials.length < 3) missing.push('Testimonios (mín. 3)');
    if (!formData.heroTitle) missing.push('Título Hero');
    return missing;
  };

  // Render de cada paso
  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Información General</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Nombre Legal de la Empresa"
                required
                value={formData.legalName}
                onChange={(e) => updateField('legalName', e.target.value)}
                placeholder="Ej: Logística Internacional S.A.S."
                error={errors.legalName}
              />
              <FormInput
                label="Nombre Comercial"
                required
                value={formData.commercialName}
                onChange={(e) => updateField('commercialName', e.target.value)}
                placeholder="Ej: LogiExpress"
                error={errors.commercialName}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormInput
                label="NIT"
                required
                value={formData.nit}
                onChange={(e) => updateField('nit', e.target.value)}
                placeholder="Ej: 900.123.456-7"
                tooltip="Número de Identificación Tributaria"
                error={errors.nit}
              />
              <FormInput
                label="Año de Fundación"
                required
                type="number"
                value={formData.foundationYear}
                onChange={(e) => updateField('foundationYear', e.target.value)}
                placeholder="Ej: 2005"
                min="1900"
                max={new Date().getFullYear()}
                error={errors.foundationYear}
              />
              <FormInput
                label="Años de Experiencia"
                required
                type="number"
                value={formData.experienceYears}
                onChange={(e) => updateField('experienceYears', e.target.value)}
                placeholder="Ej: 18"
                error={errors.experienceYears}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Número de Empleados"
                type="number"
                value={formData.employeeCount}
                onChange={(e) => updateField('employeeCount', e.target.value)}
                placeholder="Ej: 150"
              />
              <FormInput
                label="Países donde opera"
                required
                value={formData.operatingCountries}
                onChange={(e) => updateField('operatingCountries', e.target.value)}
                placeholder="Ej: Colombia, Panamá, Ecuador, Perú"
                tooltip="Separa los países con comas"
                error={errors.operatingCountries}
              />
            </div>
            
            <FormInput
              label="Slogan/Tagline"
              required
              value={formData.slogan}
              onChange={(e) => updateField('slogan', e.target.value)}
              placeholder="Ej: Conectamos tu negocio con el mundo"
              maxLength={100}
              charCount
              error={errors.slogan}
            />
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Datos de Contacto</h2>
            
            <FormInput
              label="Dirección Sede Principal"
              required
              value={formData.mainAddress}
              onChange={(e) => updateField('mainAddress', e.target.value)}
              placeholder="Ej: Calle 100 #45-67, Oficina 301"
              error={errors.mainAddress}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Ciudad"
                required
                value={formData.city}
                onChange={(e) => updateField('city', e.target.value)}
                placeholder="Ej: Bogotá"
                error={errors.city}
              />
              <FormInput
                label="País"
                required
                value={formData.country}
                onChange={(e) => updateField('country', e.target.value)}
                placeholder="Ej: Colombia"
                error={errors.country}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Teléfono Principal"
                required
                type="tel"
                value={formData.mainPhone}
                onChange={(e) => updateField('mainPhone', e.target.value)}
                placeholder="Ej: +57 601 123 4567"
                error={errors.mainPhone}
              />
              <FormInput
                label="WhatsApp Comercial"
                required
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => updateField('whatsapp', e.target.value)}
                placeholder="Ej: +57 310 123 4567"
                error={errors.whatsapp}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Email General"
                required
                type="email"
                value={formData.generalEmail}
                onChange={(e) => updateField('generalEmail', e.target.value)}
                placeholder="Ej: info@empresa.com"
                error={errors.generalEmail}
              />
              <FormInput
                label="Email de Cotizaciones"
                type="email"
                value={formData.quotationEmail}
                onChange={(e) => updateField('quotationEmail', e.target.value)}
                placeholder="Ej: cotizaciones@empresa.com"
              />
            </div>
            
            <FormInput
              label="Horario de Atención"
              required
              value={formData.businessHours}
              onChange={(e) => updateField('businessHours', e.target.value)}
              placeholder="Ej: Lunes a Viernes 8:00 AM - 6:00 PM"
              error={errors.businessHours}
            />
            
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Redes Sociales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Facebook"
                  value={formData.facebook}
                  onChange={(e) => updateField('facebook', e.target.value)}
                  placeholder="https://facebook.com/..."
                />
                <FormInput
                  label="Instagram"
                  value={formData.instagram}
                  onChange={(e) => updateField('instagram', e.target.value)}
                  placeholder="https://instagram.com/..."
                />
                <FormInput
                  label="LinkedIn"
                  value={formData.linkedin}
                  onChange={(e) => updateField('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/company/..."
                />
                <FormInput
                  label="Twitter/X"
                  value={formData.twitter}
                  onChange={(e) => updateField('twitter', e.target.value)}
                  placeholder="https://twitter.com/..."
                />
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Sobre Nosotros</h2>
            
            <FormTextarea
              label="Historia de la Empresa"
              required
              value={formData.history}
              onChange={(e) => updateField('history', e.target.value)}
              placeholder="Cuenta la historia de tu empresa, desde sus inicios hasta hoy..."
              rows={6}
              maxLength={2000}
              charCount
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormTextarea
                label="Misión"
                required
                value={formData.mission}
                onChange={(e) => updateField('mission', e.target.value)}
                placeholder="¿Cuál es el propósito fundamental de tu empresa?"
                rows={4}
                maxLength={500}
                charCount
              />
              <FormTextarea
                label="Visión"
                required
                value={formData.vision}
                onChange={(e) => updateField('vision', e.target.value)}
                placeholder="¿Qué aspira ser tu empresa en el futuro?"
                rows={4}
                maxLength={500}
                charCount
              />
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Valores Corporativos <span className="text-red-500">*</span>
                  <span className="text-sm font-normal text-gray-500 ml-2">(mínimo 4)</span>
                </h3>
              </div>
              {errors.values && <p className="text-sm text-red-500 mb-2">{errors.values}</p>}
              
              <div className="space-y-2">
                {formData.values.map((value, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      value={value}
                      onChange={(e) => updateArrayField('values', index, e.target.value)}
                      placeholder={`Valor ${index + 1}`}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
                    />
                    {index >= 4 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('values', index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Icons.Trash />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => addArrayItem('values')}
                className="mt-2 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <Icons.Plus /> Agregar otro valor
              </button>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Certificaciones</h3>
              </div>
              <div className="space-y-2">
                {formData.certifications.map((cert, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      value={cert}
                      onChange={(e) => updateArrayField('certifications', index, e.target.value)}
                      placeholder="Ej: ISO 9001:2015"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('certifications', index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Icons.Trash />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => addArrayItem('certifications')}
                className="mt-2 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <Icons.Plus /> Agregar certificación
              </button>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Línea de Tiempo / Hitos</h3>
              </div>
              <div className="space-y-3">
                {formData.milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-2 items-start bg-gray-50 p-3 rounded-lg">
                    <input
                      type="number"
                      value={milestone.year}
                      onChange={(e) => updateArrayField('milestones', index, { ...milestone, year: e.target.value })}
                      placeholder="Año"
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
                    />
                    <input
                      value={milestone.description}
                      onChange={(e) => updateArrayField('milestones', index, { ...milestone, description: e.target.value })}
                      placeholder="Descripción del hito"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('milestones', index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Icons.Trash />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => addArrayItem('milestones', { year: '', description: '' })}
                className="mt-2 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <Icons.Plus /> Agregar hito
              </button>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Servicios</h2>
            
            {errors.services && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                {errors.services}
              </div>
            )}
            
            <div className="space-y-4">
              {formData.services.map((service, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index, 'services')}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index, 'services')}
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="cursor-move">
                      <Icons.GripVertical />
                    </div>
                    <h4 className="font-semibold text-gray-700">Servicio {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeArrayItem('services', index)}
                      className="ml-auto p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Icons.Trash />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="Nombre del Servicio"
                      required
                      value={service.name}
                      onChange={(e) => updateArrayField('services', index, { ...service, name: e.target.value })}
                      placeholder="Ej: Transporte Marítimo FCL"
                    />
                    <FormInput
                      label="Descripción Corta"
                      required
                      value={service.shortDescription}
                      onChange={(e) => updateArrayField('services', index, { ...service, shortDescription: e.target.value })}
                      placeholder="Descripción breve del servicio"
                      maxLength={150}
                      charCount
                    />
                  </div>
                  
                  <FormTextarea
                    label="Descripción Detallada"
                    value={service.fullDescription}
                    onChange={(e) => updateArrayField('services', index, { ...service, fullDescription: e.target.value })}
                    placeholder="Descripción completa del servicio..."
                    rows={3}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="Tiempo de Tránsito"
                      value={service.transitTime}
                      onChange={(e) => updateArrayField('services', index, { ...service, transitTime: e.target.value })}
                      placeholder="Ej: 25-35 días"
                    />
                    <FormInput
                      label="Cobertura"
                      value={service.coverage}
                      onChange={(e) => updateArrayField('services', index, { ...service, coverage: e.target.value })}
                      placeholder="Ej: Asia - Sudamérica"
                    />
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Características</label>
                    <div className="space-y-2">
                      {(service.features || []).map((feature, fIndex) => (
                        <div key={fIndex} className="flex gap-2">
                          <input
                            value={feature}
                            onChange={(e) => {
                              const newFeatures = [...(service.features || [])];
                              newFeatures[fIndex] = e.target.value;
                              updateArrayField('services', index, { ...service, features: newFeatures });
                            }}
                            placeholder="Característica"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newFeatures = (service.features || []).filter((_, i) => i !== fIndex);
                              updateArrayField('services', index, { ...service, features: newFeatures });
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Icons.Trash />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newFeatures = [...(service.features || []), ''];
                        updateArrayField('services', index, { ...service, features: newFeatures });
                      }}
                      className="mt-2 text-sm flex items-center gap-1 text-blue-600 hover:text-blue-700"
                    >
                      <Icons.Plus /> Agregar característica
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              type="button"
              onClick={() => addArrayItem('services', {
                name: '',
                shortDescription: '',
                fullDescription: '',
                transitTime: '',
                coverage: '',
                features: []
              })}
              className="w-full py-3 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Icons.Plus /> Agregar Servicio
            </button>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Cobertura Geográfica</h2>
            
            {errors.originRegions && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                {errors.originRegions}
              </div>
            )}
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Regiones de Origen <span className="text-red-500">*</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {Object.keys(regionsData).map((region) => (
                  <label
                    key={region}
                    className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
                      formData.originRegions.includes(region)
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.originRegions.includes(region)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateField('originRegions', [...formData.originRegions, region]);
                        } else {
                          updateField('originRegions', formData.originRegions.filter(r => r !== region));
                          // Limpiar países de esa región
                          const newSpecific = { ...formData.specificCountries };
                          delete newSpecific[region];
                          updateField('specificCountries', newSpecific);
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="font-medium">{region}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {formData.originRegions.length > 0 && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Países Específicos por Región
                </h3>
                <div className="space-y-4">
                  {formData.originRegions.map((region) => (
                    <div key={region} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-3">{region}</h4>
                      <div className="flex flex-wrap gap-2">
                        {regionsData[region].map((country) => (
                          <label
                            key={country}
                            className={`px-3 py-1.5 rounded-full text-sm cursor-pointer transition-all ${
                              (formData.specificCountries[region] || []).includes(country)
                                ? 'bg-blue-600 text-white'
                                : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-400'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={(formData.specificCountries[region] || []).includes(country)}
                              onChange={(e) => {
                                const current = formData.specificCountries[region] || [];
                                const updated = e.target.checked
                                  ? [...current, country]
                                  : current.filter(c => c !== country);
                                updateField('specificCountries', {
                                  ...formData.specificCountries,
                                  [region]: updated
                                });
                              }}
                              className="sr-only"
                            />
                            {country}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Ciudades Destino en Colombia
              </h3>
              <div className="flex flex-wrap gap-2">
                {colombianCitiesOptions.map((city) => (
                  <label
                    key={city}
                    className={`px-3 py-1.5 rounded-full text-sm cursor-pointer transition-all ${
                      formData.colombianCities.includes(city)
                        ? 'bg-green-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:border-green-400'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.colombianCities.includes(city)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateField('colombianCities', [...formData.colombianCities, city]);
                        } else {
                          updateField('colombianCities', formData.colombianCities.filter(c => c !== city));
                        }
                      }}
                      className="sr-only"
                    />
                    {city}
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 6:
        return (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Testimonios</h2>
            <p className="text-gray-600 mb-6">Agrega al menos 3 testimonios de clientes satisfechos</p>
            
            {errors.testimonials && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
                <Icons.Warning />
                {errors.testimonials}
              </div>
            )}
            
            <div className="space-y-4">
              {formData.testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-700">Testimonio {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeArrayItem('testimonials', index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Icons.Trash />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormInput
                      label="Nombre del Cliente"
                      required
                      value={testimonial.clientName}
                      onChange={(e) => updateArrayField('testimonials', index, { ...testimonial, clientName: e.target.value })}
                      placeholder="Ej: Juan Pérez"
                    />
                    <FormInput
                      label="Cargo"
                      required
                      value={testimonial.position}
                      onChange={(e) => updateArrayField('testimonials', index, { ...testimonial, position: e.target.value })}
                      placeholder="Ej: Gerente de Logística"
                    />
                    <FormInput
                      label="Empresa"
                      required
                      value={testimonial.company}
                      onChange={(e) => updateArrayField('testimonials', index, { ...testimonial, company: e.target.value })}
                      placeholder="Ej: Importadora XYZ"
                    />
                  </div>
                  
                  <FormInput
                    label="Sector/Industria"
                    value={testimonial.industry}
                    onChange={(e) => updateArrayField('testimonials', index, { ...testimonial, industry: e.target.value })}
                    placeholder="Ej: Textil, Automotriz, Retail..."
                  />
                  
                  <FormTextarea
                    label="Texto del Testimonio"
                    required
                    value={testimonial.text}
                    onChange={(e) => updateArrayField('testimonials', index, { ...testimonial, text: e.target.value })}
                    placeholder="Escribe el testimonio del cliente..."
                    rows={3}
                    maxLength={500}
                    charCount
                  />
                  
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Calificación</label>
                      <StarRating
                        value={testimonial.rating || 5}
                        onChange={(rating) => updateArrayField('testimonials', index, { ...testimonial, rating })}
                      />
                    </div>
                    
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={testimonial.authorized || false}
                        onChange={(e) => updateArrayField('testimonials', index, { ...testimonial, authorized: e.target.checked })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Cliente autorizó publicar</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              type="button"
              onClick={() => addArrayItem('testimonials', {
                clientName: '',
                position: '',
                company: '',
                industry: '',
                text: '',
                rating: 5,
                authorized: false
              })}
              className="w-full py-3 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Icons.Plus /> Agregar Testimonio
            </button>
            
            <div className="text-center text-sm text-gray-500 mt-2">
              {formData.testimonials.length} de 3 testimonios mínimos
            </div>
          </div>
        );
        
      case 7:
        return (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Estadísticas y Diferenciadores</h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-700 text-sm">
                💡 Estas estadísticas aparecerán destacadas en tu página web para generar confianza.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <FormInput
                  label="Contenedores por Año"
                  type="number"
                  value={formData.containersPerYear}
                  onChange={(e) => updateField('containersPerYear', e.target.value)}
                  placeholder="Ej: 5000"
                />
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <FormInput
                  label="Clientes Activos"
                  type="number"
                  value={formData.activeClients}
                  onChange={(e) => updateField('activeClients', e.target.value)}
                  placeholder="Ej: 500"
                />
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <FormInput
                  label="Países de Cobertura"
                  type="number"
                  value={formData.coverageCountries}
                  onChange={(e) => updateField('coverageCountries', e.target.value)}
                  placeholder="Ej: 45"
                />
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <FormInput
                  label="Tasa de Entregas a Tiempo"
                  value={formData.onTimeDeliveryRate}
                  onChange={(e) => updateField('onTimeDeliveryRate', e.target.value)}
                  placeholder="Ej: 98%"
                />
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Top 5 Diferenciadores
                <span className="text-sm font-normal text-gray-500 ml-2">(arrastra para reordenar)</span>
              </h3>
              
              <div className="space-y-2">
                {formData.differentiators.map((diff, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index, 'differentiators')}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index, 'differentiators')}
                    className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200 shadow-sm"
                  >
                    <div className="cursor-move">
                      <Icons.GripVertical />
                    </div>
                    <span className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-bold text-sm">
                      {index + 1}
                    </span>
                    <input
                      value={diff}
                      onChange={(e) => updateArrayField('differentiators', index, e.target.value)}
                      placeholder={`Diferenciador ${index + 1}`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 8:
        return (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">FAQ y Contenido Hero</h2>
            
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Contenido Hero Principal <span className="text-red-500">*</span>
              </h3>
              
              <FormInput
                label="Título Principal Hero"
                required
                value={formData.heroTitle}
                onChange={(e) => updateField('heroTitle', e.target.value)}
                placeholder="Ej: Conectamos tu negocio con el mundo"
                maxLength={80}
                charCount
                error={errors.heroTitle}
              />
              
              <FormInput
                label="Subtítulo Hero"
                required
                value={formData.heroSubtitle}
                onChange={(e) => updateField('heroSubtitle', e.target.value)}
                placeholder="Ej: Soluciones logísticas integrales para importación y exportación"
                maxLength={150}
                charCount
                error={errors.heroSubtitle}
              />
              
              {/* Preview del Hero */}
              {(formData.heroTitle || formData.heroSubtitle) && (
                <div className="mt-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white">
                  <p className="text-xs uppercase tracking-wider mb-2 opacity-70">Preview del Hero</p>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    {formData.heroTitle || 'Tu título aquí...'}
                  </h1>
                  <p className="text-lg opacity-90">
                    {formData.heroSubtitle || 'Tu subtítulo aquí...'}
                  </p>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Preguntas Frecuentes (FAQ)
              </h3>
              
              <div className="space-y-4">
                {formData.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-500">Pregunta {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeArrayItem('faqs', index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Icons.Trash />
                      </button>
                    </div>
                    
                    <FormInput
                      label="Pregunta"
                      required
                      value={faq.question}
                      onChange={(e) => updateArrayField('faqs', index, { ...faq, question: e.target.value })}
                      placeholder="Ej: ¿Cuánto tiempo tarda un envío desde China?"
                    />
                    
                    <FormTextarea
                      label="Respuesta"
                      required
                      value={faq.answer}
                      onChange={(e) => updateArrayField('faqs', index, { ...faq, answer: e.target.value })}
                      placeholder="Escribe una respuesta clara y concisa..."
                      rows={3}
                    />
                  </div>
                ))}
              </div>
              
              <button
                type="button"
                onClick={() => addArrayItem('faqs', { question: '', answer: '' })}
                className="mt-4 w-full py-3 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Icons.Plus /> Agregar Pregunta
              </button>
            </div>
          </div>
        );
        
      case 9:
        const missingFields = countMissingFields();
        
        return (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Revisión y Exportación</h2>
            <p className="text-gray-600 mb-6">Revisa toda la información antes de exportar</p>
            
            {missingFields.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Icons.Warning />
                  <div>
                    <h4 className="font-medium text-yellow-800">Campos faltantes</h4>
                    <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside">
                      {missingFields.map((field, i) => (
                        <li key={i}>{field}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {/* Resumen por sección */}
            <div className="space-y-4">
              {/* Información General */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${isStepComplete(1) ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                    <h3 className="font-semibold text-gray-800">Información General</h3>
                  </div>
                  <button
                    onClick={() => goToStep(1)}
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
                  >
                    <Icons.Edit /> Editar
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  <div><span className="text-gray-500">Empresa:</span> {formData.commercialName || '-'}</div>
                  <div><span className="text-gray-500">NIT:</span> {formData.nit || '-'}</div>
                  <div><span className="text-gray-500">Fundación:</span> {formData.foundationYear || '-'}</div>
                </div>
              </div>
              
              {/* Contacto */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${isStepComplete(2) ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                    <h3 className="font-semibold text-gray-800">Datos de Contacto</h3>
                  </div>
                  <button
                    onClick={() => goToStep(2)}
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
                  >
                    <Icons.Edit /> Editar
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  <div><span className="text-gray-500">Ciudad:</span> {formData.city || '-'}</div>
                  <div><span className="text-gray-500">Teléfono:</span> {formData.mainPhone || '-'}</div>
                  <div><span className="text-gray-500">Email:</span> {formData.generalEmail || '-'}</div>
                </div>
              </div>
              
              {/* Sobre Nosotros */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${isStepComplete(3) ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                    <h3 className="font-semibold text-gray-800">Sobre Nosotros</h3>
                  </div>
                  <button
                    onClick={() => goToStep(3)}
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
                  >
                    <Icons.Edit /> Editar
                  </button>
                </div>
                <div className="text-sm">
                  <div className="mb-1"><span className="text-gray-500">Valores:</span> {formData.values.filter(v => v).length} definidos</div>
                  <div><span className="text-gray-500">Certificaciones:</span> {formData.certifications.length}</div>
                </div>
              </div>
              
              {/* Servicios */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${isStepComplete(4) ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                    <h3 className="font-semibold text-gray-800">Servicios</h3>
                  </div>
                  <button
                    onClick={() => goToStep(4)}
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
                  >
                    <Icons.Edit /> Editar
                  </button>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Servicios registrados:</span> {formData.services.length}
                  {formData.services.length > 0 && (
                    <ul className="mt-1 ml-4 list-disc text-gray-600">
                      {formData.services.slice(0, 3).map((s, i) => (
                        <li key={i}>{s.name || 'Sin nombre'}</li>
                      ))}
                      {formData.services.length > 3 && <li>... y {formData.services.length - 3} más</li>}
                    </ul>
                  )}
                </div>
              </div>
              
              {/* Cobertura */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${isStepComplete(5) ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                    <h3 className="font-semibold text-gray-800">Cobertura Geográfica</h3>
                  </div>
                  <button
                    onClick={() => goToStep(5)}
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
                  >
                    <Icons.Edit /> Editar
                  </button>
                </div>
                <div className="text-sm">
                  <div><span className="text-gray-500">Regiones:</span> {formData.originRegions.join(', ') || 'Ninguna'}</div>
                  <div><span className="text-gray-500">Ciudades Colombia:</span> {formData.colombianCities.length}</div>
                </div>
              </div>
              
              {/* Testimonios */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${isStepComplete(6) ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                    <h3 className="font-semibold text-gray-800">Testimonios</h3>
                  </div>
                  <button
                    onClick={() => goToStep(6)}
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
                  >
                    <Icons.Edit /> Editar
                  </button>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Testimonios:</span> {formData.testimonials.length} de 3 mínimos
                </div>
              </div>
              
              {/* Estadísticas */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${isStepComplete(7) ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                    <h3 className="font-semibold text-gray-800">Estadísticas</h3>
                  </div>
                  <button
                    onClick={() => goToStep(7)}
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
                  >
                    <Icons.Edit /> Editar
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <div><span className="text-gray-500">Contenedores:</span> {formData.containersPerYear || '-'}</div>
                  <div><span className="text-gray-500">Clientes:</span> {formData.activeClients || '-'}</div>
                  <div><span className="text-gray-500">Países:</span> {formData.coverageCountries || '-'}</div>
                  <div><span className="text-gray-500">On-time:</span> {formData.onTimeDeliveryRate || '-'}</div>
                </div>
              </div>
              
              {/* FAQ */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${isStepComplete(8) ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                    <h3 className="font-semibold text-gray-800">FAQ y Contenido</h3>
                  </div>
                  <button
                    onClick={() => goToStep(8)}
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
                  >
                    <Icons.Edit /> Editar
                  </button>
                </div>
                <div className="text-sm">
                  <div><span className="text-gray-500">Hero:</span> {formData.heroTitle ? 'Configurado' : 'Pendiente'}</div>
                  <div><span className="text-gray-500">FAQs:</span> {formData.faqs.length}</div>
                </div>
              </div>
            </div>
            
            {/* Mensaje de éxito */}
            {sent && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3">
                  <Icons.CheckCircle />
                  <div>
                    <h4 className="font-medium text-green-800">¡Datos enviados exitosamente!</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Los datos han sido enviados exitosamente y también se ha descargado una copia de seguridad.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Mensaje de error */}
            {sendError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3">
                  <Icons.Warning />
                  <div>
                    <h4 className="font-medium text-red-800">Error al enviar</h4>
                    <p className="text-sm text-red-700 mt-1">{sendError}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Botones de exportación y envío */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
              <button
                onClick={sendData}
                disabled={sending || sent}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-medium transition-colors ${
                  sending || sent
                    ? 'bg-green-600 text-white cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {sending ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : sent ? (
                  <>
                    <Icons.CheckCircle /> ¡Enviado!
                  </>
                ) : (
                  <>
                    <Icons.Send /> Enviar y Exportar
                  </>
                )}
              </button>
              <button
                onClick={exportJSON}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-medium transition-colors"
              >
                <Icons.Download /> Descargar Copia
              </button>
              <button
                onClick={copyToClipboard}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-medium transition-colors"
              >
                <Icons.Copy /> {copied ? '¡Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Recopilación de Información Empresarial
          </h1>
          <p className="text-gray-600">Empresa de Logística Internacional</p>
        </div>
        
        {/* Alerta de borrador */}
        {showDraftAlert && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icons.Restore />
              <span className="text-blue-700">Se encontró un borrador guardado. ¿Deseas restaurarlo?</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={restoreDraft}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Restaurar
              </button>
              <button
                onClick={clearForm}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
              >
                Empezar nuevo
              </button>
            </div>
          </div>
        )}
        
        {/* Progress bar general */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progreso total</span>
            <span className="text-sm font-medium text-blue-600">{totalProgress()}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${totalProgress()}%` }}
            />
          </div>
        </div>
        
        {/* Stepper */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex items-center min-w-max justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => goToStep(step.id)}
                  className={`flex flex-col items-center group ${currentStep === step.id ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                      currentStep === step.id
                        ? 'bg-blue-600 text-white ring-4 ring-blue-200'
                        : isStepComplete(step.id)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300'
                    }`}
                  >
                    {isStepComplete(step.id) && currentStep !== step.id ? (
                      <Icons.Check />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span className={`mt-2 text-xs font-medium hidden md:block ${
                    currentStep === step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.shortName}
                  </span>
                </button>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded ${
                    isStepComplete(step.id) ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* Contenido del paso actual */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
          {renderStep()}
        </div>
        
        {/* Navegación */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200'
            }`}
          >
            <Icons.ChevronLeft /> Anterior
          </button>
          
          <span className="text-sm text-gray-500">
            Paso {currentStep} de {steps.length}
          </span>
          
          {currentStep < 9 ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-sm"
            >
              Siguiente <Icons.ChevronRight />
            </button>
          ) : (
            <button
              onClick={exportJSON}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors shadow-sm"
            >
              <Icons.Download /> Exportar
            </button>
          )}
        </div>
        
        {/* Footer con guardado automático */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <span className="inline-flex items-center gap-1">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Guardado automático activado
          </span>
        </div>
      </div>
    </div>
  );
}

