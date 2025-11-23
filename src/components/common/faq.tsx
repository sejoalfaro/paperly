'use client'

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/src/components/ui/accordion'
import { appConfig } from '@/src/lib/config'

const faqData = [
  {
    question: '¿Es realmente gratis?',
    answer: `Sí, ${appConfig.name} es 100% gratuito. No hay costos ocultos, planes premium ni límites en la cantidad de facturas que puedes crear. Nuestro objetivo es hacer la facturación accesible para todos.`
  },
  {
    question: '¿Necesito registrarme o crear una cuenta?',
    answer: 'No, no necesitas registrarte. Puedes empezar a crear facturas inmediatamente sin proporcionar ningún dato personal. Tus datos se procesan localmente en tu navegador para garantizar tu privacidad.'
  },
  {
    question: '¿En qué formato puedo exportar mis facturas?',
    answer: 'Actualmente puedes exportar tus facturas en formato PDF de alta calidad, listas para imprimir o enviar por email. El PDF mantiene el diseño profesional y es compatible con todos los lectores estándar.'
  },
  {
    question: '¿Puedo agregar mi logo y personalizar el diseño?',
    answer: 'Sí, puedes personalizar completamente tu factura. Agrega tu logo, modifica colores, incluye tu información de contacto, y ajusta cada campo según tus necesidades. El editor en tiempo real te muestra cómo quedará antes de descargar.'
  },
  {
    question: '¿Mis datos están seguros?',
    answer: 'Absolutamente. Toda la información que ingresas se procesa localmente en tu navegador. No almacenamos, enviamos ni compartimos tus datos con terceros. Tu privacidad es nuestra prioridad.'
  },
  {
    question: '¿Funciona en todos los navegadores y dispositivos?',
    answer: `Sí, ${appConfig.name} es compatible con todos los navegadores modernos (Chrome, Firefox, Safari, Edge) y funciona perfectamente en escritorio, tablet y móvil. Solo necesitas una conexión a internet.`
  },
  {
    question: `¿Puedo usar ${appConfig.name} para mi negocio?`,
    answer: `Por supuesto. ${appConfig.name} está diseñado para freelancers, pequeñas empresas, consultores y cualquier profesional que necesite crear facturas. Es completamente legal y cumple con los estándares de facturación profesional.`
  }
]

export function FAQ() {
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqData.map((faq, i) => (
          <AccordionItem 
            key={i} 
            value={`item-${i}`}
            className="rounded-xl border border-border bg-background overflow-hidden px-6"
          >
            <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
