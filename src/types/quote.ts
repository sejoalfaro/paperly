export interface QuoteItem {
  id: string
  label: string
  description: string
  price: number
  included: boolean
}

export interface QuoteIssuer {
  name: string
  id: string
  address: string
  phone: string
  email: string
  website: string
}

export interface QuoteState {
  issuer: QuoteIssuer
  projectName: string
  quoteNumber: string
  startDate: string
  clientCompany: string
  clientContact: string
  clientEmail: string
  clientPhone: string
  executiveSummary: string
  items: QuoteItem[]
  scopeSections: ScopeSection[]
  optionalModules: OptionalModule[]
  timeline: TimelineItem[]
  maintenancePlans: MaintenancePlan[]
  assumptions: string[]
  nextSteps: string[]
  closingMessage: string
}

export interface ScopeSection {
  title: string
  content: string[]
}

export interface OptionalModule {
  name: string
  desc: string
}

export interface TimelineItem {
  week: string
  task: string
}

export interface MaintenancePlan {
  name: string
  price: number
  desc: string
}

export const SCOPE_SECTIONS: ScopeSection[] = [
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
]

export const OPTIONAL_MODULES_INFO: OptionalModule[] = [
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
]

export const TIMELINE: TimelineItem[] = [
  { week: "Semana 1-2", task: "Kickoff, research y wireframes iniciales" },
  { week: "Semana 3-4", task: "Diseño UI/UX y aprobación de mockups" },
  { week: "Semana 5-8", task: "Desarrollo frontend y backend" },
  { week: "Semana 9", task: "Testing, QA y correcciones" },
  { week: "Semana 10", task: "Despliegue, capacitación y entrega final" }
]

export const MAINTENANCE_PLANS: MaintenancePlan[] = [
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
]

export const ASSUMPTIONS: string[] = [
  "El cliente proveerá contenido (textos, imágenes) en tiempo y forma.",
  "Hosting y dominio son responsabilidad del cliente (podemos recomendarlos).",
  "Funcionalidades fuera del alcance requerirán cotización adicional.",
  "El proyecto asume máximo 3 rondas de revisión por entregable.",
  "Precios en USD, sujetos a cambio si hay modificaciones mayores al scope."
]
