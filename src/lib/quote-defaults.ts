import { QuoteState } from '@/src/types/quote'

/**
 * Datos iniciales por defecto para una nueva cotización
 */
export const DEFAULT_QUOTE_DATA: QuoteState = {
  issuer: {
    name: "",
    id: "",
    address: "",
    phone: "",
    email: "",
    website: "",
  },
  projectName: "",
  quoteNumber: `QUOTE-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
  startDate: new Date().toISOString().split("T")[0],
  clientCompany: "",
  clientContact: "",
  clientEmail: "",
  clientPhone: "",
  executiveSummary: "Propuesta integral para el desarrollo de una solución web moderna, escalable y centrada en la experiencia del usuario. Nuestro enfoque combina diseño estratégico, desarrollo técnico robusto y un proceso colaborativo que asegura resultados alineados con los objetivos de negocio.",
  items: [
    {
      id: "1",
      label: "Diseño UI/UX",
      description: "Diseño de interfaz y experiencia de usuario completa",
      price: 2500,
      included: true
    },
    {
      id: "2",
      label: "Desarrollo Frontend",
      description: "Implementación con React/Next.js",
      price: 5000,
      included: true
    },
    {
      id: "3",
      label: "Desarrollo Backend",
      description: "API REST y base de datos",
      price: 4000,
      included: true
    },
    {
      id: "4",
      label: "Panel Admin",
      description: "Dashboard de administración completo",
      price: 3000,
      included: true
    },
    {
      id: "5",
      label: "Testing & QA",
      description: "Pruebas exhaustivas y aseguramiento de calidad",
      price: 0,
      included: true
    },
    {
      id: "6",
      label: "Despliegue",
      description: "Configuración de hosting y deployment",
      price: 0,
      included: true
    },
    {
      id: "7",
      label: "E-commerce",
      description: "Módulo completo de tienda online",
      price: 3500,
      included: false
    },
    {
      id: "8",
      label: "Blog/CMS",
      description: "Sistema de gestión de contenidos",
      price: 2000,
      included: false
    }
  ],
  scopeSections: [
    {
      title: "🎨 Diseño y Experiencia de Usuario",
      content: [
        "Diseño UI/UX responsive y moderno",
        "Prototipado interactivo de interfaces principales",
        "Sistema de diseño con guía de estilos",
        "Optimización para dispositivos móviles y tabletas"
      ]
    },
    {
      title: "⚙️ Desarrollo e Implementación",
      content: [
        "Desarrollo frontend con tecnologías modernas",
        "Integración de APIs y servicios backend",
        "Sistema de autenticación y gestión de usuarios",
        "Panel de administración completo"
      ]
    },
    {
      title: "🚀 Despliegue y Capacitación",
      content: [
        "Configuración de hosting y dominio",
        "Optimización SEO básica",
        "Documentación técnica completa",
        "Sesión de capacitación para el equipo"
      ]
    }
  ],
  optionalModules: [
    {
      name: "E-commerce Avanzado",
      desc: "Pasarela de pagos, gestión de inventario, cupones y promociones"
    },
    {
      name: "Sistema de Blog/CMS",
      desc: "Gestor de contenidos con editor visual y categorización"
    },
    {
      name: "Integraciones API",
      desc: "Conexión con servicios externos (CRM, ERP, Marketing)"
    },
    {
      name: "Multilenguaje",
      desc: "Sistema completo de internacionalización (i18n)"
    }
  ],
  timeline: [
    { week: "Semana 1-2", task: "Kickoff, research y wireframes iniciales" },
    { week: "Semana 3-4", task: "Diseño UI/UX y aprobación de mockups" },
    { week: "Semana 5-8", task: "Desarrollo frontend y backend" },
    { week: "Semana 9", task: "Testing, QA y correcciones" },
    { week: "Semana 10", task: "Despliegue, capacitación y entrega final" }
  ],
  maintenancePlans: [
    {
      name: "Básico",
      price: 99,
      desc: "Updates mensuales, monitoreo 24/7, backups semanales"
    },
    {
      name: "Profesional",
      price: 199,
      desc: "Todo lo anterior + soporte prioritario, cambios menores"
    },
    {
      name: "Enterprise",
      price: 399,
      desc: "Todo lo anterior + desarrollos custom, SLA garantizado"
    }
  ],
  assumptions: [
    "El cliente proveerá contenido (textos, imágenes) en tiempo y forma.",
    "Hosting y dominio son responsabilidad del cliente (podemos recomendarlos).",
    "Funcionalidades fuera del alcance requerirán cotización adicional.",
    "El proyecto asume máximo 3 rondas de revisión por entregable.",
    "Precios en USD, sujetos a cambio si hay modificaciones mayores al scope."
  ],
  nextSteps: [
    "Sesión de briefing inicial.",
    "Aprobación de estructura y diseño.",
    "Firma y anticipo (50%)."
  ],
  closingMessage: "Gracias por considerar nuestra propuesta. Estamos entusiasmados con la posibilidad de colaborar en este proyecto y confiamos en que nuestra experiencia y dedicación contribuirán al éxito de su iniciativa. Quedamos a su disposición para cualquier consulta o aclaración.",
  discount: {
    type: "percentage",
    value: 0
  }
} as const
