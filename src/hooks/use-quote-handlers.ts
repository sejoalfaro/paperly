import { useCallback } from 'react'
import { QuoteState, QuoteItem, QuoteIssuer, ScopeSection, OptionalModule, TimelineItem, MaintenancePlan } from '@/src/types/quote'

/**
 * Hook para manejar cambios en los datos de la cotización
 */
export function useQuoteHandlers(
  setData: React.Dispatch<React.SetStateAction<QuoteState>>
) {
  const handleFieldChange = useCallback((field: keyof QuoteState, value: string) => {
    setData(prev => ({ ...prev, [field]: value }))
  }, [setData])

  const handleIssuerChange = useCallback((field: keyof QuoteIssuer, value: string) => {
    setData(prev => ({
      ...prev,
      issuer: { ...prev.issuer, [field]: value }
    }))
  }, [setData])

  const handleItemToggle = useCallback((itemId: string) => {
    setData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId ? { ...item, included: !item.included } : item
      )
    }))
  }, [setData])

  const handleItemChange = useCallback((itemId: string, field: keyof QuoteItem, value: string | number | boolean) => {
    setData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    }))
  }, [setData])

  const addItem = useCallback(() => {
    setData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: String(Date.now()),
          label: "",
          description: "",
          price: 0,
          included: false
        }
      ]
    }))
  }, [setData])

  const removeItem = useCallback((itemId: string) => {
    setData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }))
  }, [setData])

  // Scope Sections handlers
  const handleScopeSectionChange = useCallback((index: number, field: keyof ScopeSection, value: string) => {
    setData(prev => ({
      ...prev,
      scopeSections: prev.scopeSections.map((section, idx) =>
        idx === index ? { ...section, [field]: value } : section
      )
    }))
  }, [setData])

  const handleScopeContentChange = useCallback((sectionIndex: number, contentIndex: number, value: string) => {
    setData(prev => ({
      ...prev,
      scopeSections: prev.scopeSections.map((section, idx) =>
        idx === sectionIndex
          ? {
              ...section,
              content: section.content.map((item, cIdx) =>
                cIdx === contentIndex ? value : item
              )
            }
          : section
      )
    }))
  }, [setData])

  const addScopeContent = useCallback((sectionIndex: number) => {
    setData(prev => ({
      ...prev,
      scopeSections: prev.scopeSections.map((section, idx) =>
        idx === sectionIndex
          ? { ...section, content: [...section.content, ""] }
          : section
      )
    }))
  }, [setData])

  const removeScopeContent = useCallback((sectionIndex: number, contentIndex: number) => {
    setData(prev => ({
      ...prev,
      scopeSections: prev.scopeSections.map((section, idx) =>
        idx === sectionIndex
          ? { ...section, content: section.content.filter((_, cIdx) => cIdx !== contentIndex) }
          : section
      )
    }))
  }, [setData])

  const addScopeSection = useCallback(() => {
    setData(prev => ({
      ...prev,
      scopeSections: [...prev.scopeSections, { title: "", content: [""] }]
    }))
  }, [setData])

  const removeScopeSection = useCallback((index: number) => {
    setData(prev => ({
      ...prev,
      scopeSections: prev.scopeSections.filter((_, idx) => idx !== index)
    }))
  }, [setData])

  // Optional Modules handlers
  const handleOptionalModuleChange = useCallback((index: number, field: keyof OptionalModule, value: string) => {
    setData(prev => ({
      ...prev,
      optionalModules: prev.optionalModules.map((module, idx) =>
        idx === index ? { ...module, [field]: value } : module
      )
    }))
  }, [setData])

  const addOptionalModule = useCallback(() => {
    setData(prev => ({
      ...prev,
      optionalModules: [...prev.optionalModules, { name: "", desc: "" }]
    }))
  }, [setData])

  const removeOptionalModule = useCallback((index: number) => {
    setData(prev => ({
      ...prev,
      optionalModules: prev.optionalModules.filter((_, idx) => idx !== index)
    }))
  }, [setData])

  // Timeline handlers
  const handleTimelineChange = useCallback((index: number, field: keyof TimelineItem, value: string) => {
    setData(prev => ({
      ...prev,
      timeline: prev.timeline.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item
      )
    }))
  }, [setData])

  const addTimelineItem = useCallback(() => {
    setData(prev => ({
      ...prev,
      timeline: [...prev.timeline, { week: "", task: "" }]
    }))
  }, [setData])

  const removeTimelineItem = useCallback((index: number) => {
    setData(prev => ({
      ...prev,
      timeline: prev.timeline.filter((_, idx) => idx !== index)
    }))
  }, [setData])

  // Maintenance Plans handlers
  const handleMaintenancePlanChange = useCallback((index: number, field: keyof MaintenancePlan, value: string | number) => {
    setData(prev => ({
      ...prev,
      maintenancePlans: prev.maintenancePlans.map((plan, idx) =>
        idx === index ? { ...plan, [field]: value } : plan
      )
    }))
  }, [setData])

  const addMaintenancePlan = useCallback(() => {
    setData(prev => ({
      ...prev,
      maintenancePlans: [...prev.maintenancePlans, { name: "", price: 0, desc: "" }]
    }))
  }, [setData])

  const removeMaintenancePlan = useCallback((index: number) => {
    setData(prev => ({
      ...prev,
      maintenancePlans: prev.maintenancePlans.filter((_, idx) => idx !== index)
    }))
  }, [setData])

  // Assumptions handlers
  const handleAssumptionChange = useCallback((index: number, value: string) => {
    setData(prev => ({
      ...prev,
      assumptions: prev.assumptions.map((assumption, idx) =>
        idx === index ? value : assumption
      )
    }))
  }, [setData])

  const addAssumption = useCallback(() => {
    setData(prev => ({
      ...prev,
      assumptions: [...prev.assumptions, ""]
    }))
  }, [setData])

  const removeAssumption = useCallback((index: number) => {
    setData(prev => ({
      ...prev,
      assumptions: prev.assumptions.filter((_, idx) => idx !== index)
    }))
  }, [setData])

  // Next Steps handlers
  const handleNextStepChange = useCallback((index: number, value: string) => {
    setData(prev => ({
      ...prev,
      nextSteps: prev.nextSteps.map((step, idx) =>
        idx === index ? value : step
      )
    }))
  }, [setData])

  const addNextStep = useCallback(() => {
    setData(prev => ({
      ...prev,
      nextSteps: [...prev.nextSteps, ""]
    }))
  }, [setData])

  const removeNextStep = useCallback((index: number) => {
    setData(prev => ({
      ...prev,
      nextSteps: prev.nextSteps.filter((_, idx) => idx !== index)
    }))
  }, [setData])

  return {
    handleFieldChange,
    handleIssuerChange,
    handleItemToggle,
    handleItemChange,
    addItem,
    removeItem,
    handleScopeSectionChange,
    handleScopeContentChange,
    addScopeContent,
    removeScopeContent,
    addScopeSection,
    removeScopeSection,
    handleOptionalModuleChange,
    addOptionalModule,
    removeOptionalModule,
    handleTimelineChange,
    addTimelineItem,
    removeTimelineItem,
    handleMaintenancePlanChange,
    addMaintenancePlan,
    removeMaintenancePlan,
    handleAssumptionChange,
    addAssumption,
    removeAssumption,
    handleNextStepChange,
    addNextStep,
    removeNextStep
  }
}
