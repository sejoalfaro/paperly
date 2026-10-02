---
name: generate-quote-link
description: >
  Wizard conversacional para generar links de cotizaciones compartibles en Paperly.
  Triggers: "generate quote", "create quote", "nueva cotizacion", "generar cotizacion",
  "quote link", "link de cotizacion", "paperly quote", "cotizar", "hacer cotizacion".
allowed-tools: Bash(node -e *)
---

# Generate Shareable Quote Link

Wizard conversacional que recopila datos de una cotizacion paso a paso y genera un link compartible para Paperly.

## Prerequisitos

Antes de iniciar el wizard, lee estos archivos para tener contexto actualizado:

1. `/src/types/quote.ts` — estructura `QuoteState` y tipos relacionados
2. `/src/lib/quote-defaults.ts` — valores por defecto (`DEFAULT_QUOTE_DATA`)

## Flujo del Wizard

### Paso 1: Datos del Emisor (Issuer)

Pregunta al usuario usando `AskUserQuestion`:

- **Pregunta**: "Datos del emisor de la cotizacion?"
- **Opciones**:
  - "Usar datos por defecto" — usa `DEFAULT_QUOTE_DATA.issuer` del archivo de defaults
  - "Ingresar datos personalizados" — pide al usuario que proporcione como texto libre:
    - Nombre de la empresa
    - RFC / ID fiscal
    - Direccion
    - Telefono
    - Email
    - Sitio web

### Paso 2: Proyecto y Cliente

Pide al usuario que proporcione estos datos en un solo mensaje (texto libre via `AskUserQuestion` con opcion "Other"):

- Nombre del proyecto
- Numero de cotizacion (sugerir auto-generar con formato `QUOTE-YYYY-NNNNNN`)
- Empresa del cliente
- Nombre del contacto
- Email del cliente
- Telefono del cliente

Si el usuario omite el numero de cotizacion, genera uno automaticamente con el formato `QUOTE-{año actual}-{timestamp 6 digitos}`.

### Paso 3: Items / Partidas

Este paso es iterativo. Por cada item pregunta:

- **Label**: nombre corto del servicio/producto (ej. "Diseno UI/UX")
- **Descripcion**: detalle breve
- **Precio**: monto numerico

Todos los items se marcan como `included: true`. Asigna IDs secuenciales como strings: "1", "2", "3", etc.

Despues de cada item, pregunta con `AskUserQuestion`:
- "Agregar otro item?"
- Opciones: "Si, agregar otro" / "No, continuar"

**Requiere al menos 1 item.** No permitas continuar sin items.

### Paso 4: Descuento

Pregunta con `AskUserQuestion`:
- "Aplicar descuento a la cotizacion?"
- Opciones:
  - "Sin descuento"
  - "Porcentaje (ej. 10%)" — luego pide el valor
  - "Monto fijo (ej. $500)" — luego pide el valor

Mapea a:
- Sin descuento: `{ type: "percentage", value: 0 }`
- Porcentaje: `{ type: "percentage", value: <numero> }`
- Monto fijo: `{ type: "fixed", value: <numero> }`

### Paso 5: Secciones Opcionales (Progresivo)

Pregunta con `AskUserQuestion` (multiSelect: true):
- "Deseas personalizar alguna de estas secciones? Las no seleccionadas usaran valores por defecto."
- Opciones:
  - "Resumen ejecutivo"
  - "Alcance del proyecto (scope)"
  - "Modulos opcionales"
  - "Timeline / Cronograma"
  - "Planes de mantenimiento"
  - "Supuestos (assumptions)"
  - "Proximos pasos"
  - "Mensaje de cierre"
  - "Usar defaults para todo"

Para cada seccion seleccionada, pregunta los datos correspondientes:

- **Resumen ejecutivo**: texto libre, un parrafo
- **Scope sections**: por cada seccion pide titulo y lista de puntos (bullets). Permite agregar multiples secciones.
- **Modulos opcionales**: por cada modulo pide nombre y descripcion. Permite agregar multiples.
- **Timeline**: por cada entrada pide semana/fase y tarea. Permite agregar multiples.
- **Planes de mantenimiento**: por cada plan pide nombre, precio y descripcion. Permite agregar multiples.
- **Assumptions**: pide lista de supuestos (uno por linea)
- **Proximos pasos**: pide lista de pasos siguientes (uno por linea)
- **Mensaje de cierre**: texto libre

Las secciones NO seleccionadas usan los valores de `DEFAULT_QUOTE_DATA`.

### Paso 6: Generar el Link

Una vez recopilados todos los datos:

1. **Construye el objeto `QuoteState` completo** en formato JSON, con:
   - Datos del emisor (paso 1)
   - Datos de proyecto y cliente (paso 2)
   - `startDate`: fecha actual en formato ISO (`YYYY-MM-DD`)
   - Items (paso 3)
   - Descuento (paso 4)
   - Secciones opcionales (paso 5) — usando defaults donde no se personalizo

2. **Codifica a Base64** usando Node.js con heredoc para evitar problemas de shell escaping:

```bash
node -e "
const data = JSON.parse(require('fs').readFileSync('/dev/stdin', 'utf8'));
const encoded = Buffer.from(JSON.stringify(data), 'utf-8').toString('base64');
console.log(encoded);
" <<'QUOTE_EOF'
{ ... objeto QuoteState completo ... }
QUOTE_EOF
```

3. **Construye la URL**: `https://paperlykit.com/quote?data={encoded}`

4. **Presenta al usuario**:
   - El link completo listo para copiar
   - Un resumen breve:
     - Proyecto: {nombre}
     - Cliente: {empresa}
     - Items: {cantidad} partidas
     - Subtotal: ${suma de items incluidos}
     - Descuento: {descripcion del descuento}
     - Total: ${subtotal - descuento}

5. **Advertencia de longitud**: Si la URL resultante tiene mas de 8000 caracteres, advierte al usuario que algunos navegadores podrian truncarla.

## QuoteState — Referencia de Tipo

```typescript
interface QuoteState {
  issuer: { name, id, address, phone, email, website }
  projectName: string
  quoteNumber: string
  startDate: string            // "YYYY-MM-DD"
  clientCompany: string
  clientContact: string
  clientEmail: string
  clientPhone: string
  executiveSummary: string
  items: Array<{ id: string, label: string, description: string, price: number, included: boolean }>
  scopeSections: Array<{ title: string, content: string[] }>
  optionalModules: Array<{ name: string, desc: string }>
  timeline: Array<{ week: string, task: string }>
  maintenancePlans: Array<{ name: string, price: number, desc: string }>
  assumptions: string[]
  nextSteps: string[]
  closingMessage: string
  discount: { type: "percentage" | "fixed", value: number }
}
```

## Notas Importantes

- La URL productiva es siempre `https://paperlykit.com`
- Usa heredoc con comillas simples (`<<'QUOTE_EOF'`) para que el shell no interprete variables dentro del JSON
- `Buffer.from(..., 'utf-8').toString('base64')` maneja correctamente acentos, enes y emojis
- Siempre lee `quote-defaults.ts` al inicio del wizard para tener defaults actualizados
- No inventes datos; si el usuario no proporciona un campo obligatorio, vuelve a preguntar
