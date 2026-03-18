import { QuoteState } from '@/src/types/quote'

/**
 * Datos iniciales por defecto para una nueva cotización
 */
export const DEFAULT_QUOTE_DATA: QuoteState = {
  issuer: {
    name: "Pixel Studio",
    id: "RFC-PST123456",
    address: "Av. Reforma 222, Col. Juárez, CDMX",
    phone: "+52 55 1234 5678",
    email: "hola@pixelstudio.mx",
    website: "www.pixelstudio.mx",
  },
  projectName: "Rediseño Web Corporativo",
  quoteNumber: `QUOTE-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
  startDate: new Date().toISOString().split("T")[0],
  clientCompany: "Acme Corp",
  clientContact: "María García",
  clientEmail: "maria@acmecorp.com",
  clientPhone: "+1 555 987 6543",
  executiveSummary: "Propuesta para el rediseño completo del sitio web corporativo de Acme Corp, con enfoque en experiencia de usuario, rendimiento y conversión. El proyecto contempla diseño, desarrollo e integración con los sistemas actuales del cliente.",
  items: [
    {
      id: "1",
      label: "Diseño UI/UX",
      description: "Wireframes, prototipo interactivo y sistema de diseño",
      price: 2500,
      included: true
    },
    {
      id: "2",
      label: "Desarrollo Frontend",
      description: "Maquetación responsive con React/Next.js",
      price: 4000,
      included: true
    },
    {
      id: "3",
      label: "Backend & API",
      description: "Servidor, base de datos y endpoints REST",
      price: 3500,
      included: true
    },
    {
      id: "4",
      label: "Testing & QA",
      description: "Pruebas funcionales, de rendimiento y compatibilidad",
      price: 1000,
      included: true
    },
    {
      id: "5",
      label: "Despliegue",
      description: "Configuración de servidor, dominio y SSL",
      price: 500,
      included: true
    },
    {
      id: "6",
      label: "Tienda en línea",
      description: "Módulo e-commerce con pasarela de pagos",
      price: 3000,
      included: false
    }
  ],
  scopeSections: [
    {
      title: "Diseño y Experiencia de Usuario",
      content: [
        "Auditoría del sitio actual e investigación de usuarios",
        "Diseño de wireframes y flujos de navegación",
        "Prototipo interactivo de alta fidelidad",
        "Sistema de diseño y guía de estilos"
      ]
    },
    {
      title: "Desarrollo e Integración",
      content: [
        "Desarrollo frontend responsive (mobile-first)",
        "Integración con CRM y herramientas existentes",
        "Optimización de rendimiento y Core Web Vitals",
        "Panel de administración de contenidos"
      ]
    },
    {
      title: "Lanzamiento y Soporte",
      content: [
        "Migración de contenido existente",
        "Configuración de analytics y seguimiento de conversiones",
        "Capacitación al equipo interno",
        "30 días de soporte post-lanzamiento incluidos"
      ]
    }
  ],
  optionalModules: [
    {
      name: "Tienda en línea",
      desc: "Catálogo de productos, carrito de compras y pasarela de pagos (Stripe / PayPal)"
    },
    {
      name: "Blog / Noticias",
      desc: "Editor de contenidos con categorías, etiquetas y SEO integrado"
    },
    {
      name: "Chat en vivo",
      desc: "Integración con Intercom, Drift u otra plataforma de mensajería"
    }
  ],
  timeline: [
    { week: "Semana 1", task: "Kickoff, auditoría y definición de alcance" },
    { week: "Semana 2–3", task: "Wireframes y prototipo interactivo" },
    { week: "Semana 4–5", task: "Diseño visual y aprobación de mockups" },
    { week: "Semana 6–8", task: "Desarrollo frontend y backend" },
    { week: "Semana 9", task: "Testing, QA y correcciones" },
    { week: "Semana 10", task: "Despliegue, capacitación y entrega" }
  ],
  maintenancePlans: [
    {
      name: "Básico",
      price: 99,
      desc: "Actualizaciones mensuales, backups semanales y monitoreo de disponibilidad"
    },
    {
      name: "Profesional",
      price: 199,
      desc: "Todo lo anterior + soporte prioritario y hasta 4 horas de cambios menores al mes"
    },
    {
      name: "Enterprise",
      price: 399,
      desc: "Todo lo anterior + SLA garantizado, desarrollos a medida y reporte mensual de métricas"
    }
  ],
  assumptions: [
    "El cliente entregará textos e imágenes definitivos antes del inicio del desarrollo.",
    "El hosting y dominio son contratados por el cliente (podemos asesorar en la elección).",
    "Se contemplan hasta 2 rondas de revisión por entregable.",
    "Cambios de alcance fuera de este documento requieren cotización adicional.",
    "Los precios están en USD y son válidos por 30 días a partir de la fecha de emisión."
  ],
  nextSteps: [
    "Revisar y aprobar esta propuesta.",
    "Agendar llamada de kickoff para alinear detalles.",
    "Firma de contrato y pago del anticipo (50%) para iniciar."
  ],
  closingMessage: "Gracias por considerar esta propuesta. Estamos listos para comenzar y confiamos en que juntos lograremos un resultado que supere las expectativas. Quedo a tu disposición para cualquier pregunta.",
  discount: {
    type: "percentage",
    value: 0
  }
} as const
