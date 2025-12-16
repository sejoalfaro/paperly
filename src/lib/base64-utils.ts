/**
 * Utilidades para codificación/decodificación Base64 segura para Unicode
 * 
 * Estas funciones solucionan el problema de btoa()/atob() que no pueden
 * manejar caracteres Unicode (acentos, emojis, etc.) correctamente.
 * 
 * Usan Buffer en Node.js para garantizar compatibilidad con cualquier
 * carácter UTF-8.
 */

/**
 * Codifica datos a Base64 de forma segura para Unicode
 * Compatible con caracteres especiales, acentos, emojis, etc.
 * 
 * @param data - Cualquier dato serializable a JSON
 * @returns String codificado en Base64
 * 
 * @example
 * ```ts
 * const encoded = encodeToBase64({ name: "José", company: "Diseño Web" })
 * ```
 */
export function encodeToBase64(data: unknown): string {
  const jsonString = JSON.stringify(data)
  
  // En Node.js (servidor)
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(jsonString, 'utf-8').toString('base64')
  }
  
  // En navegador (cliente) - fallback con encodeURIComponent
  return btoa(unescape(encodeURIComponent(jsonString)))
}

/**
 * Decodifica datos desde Base64
 * Compatible con caracteres Unicode
 * 
 * @param encodedData - String codificado en Base64
 * @returns Datos decodificados
 * @throws Error si la decodificación falla
 * 
 * @example
 * ```ts
 * const data = decodeFromBase64<InvoiceData>(encodedString)
 * ```
 */
export function decodeFromBase64<T>(encodedData: string): T {
  // En Node.js (servidor)
  if (typeof Buffer !== 'undefined') {
    const jsonString = Buffer.from(encodedData, 'base64').toString('utf-8')
    return JSON.parse(jsonString)
  }
  
  // En navegador (cliente) - fallback con decodeURIComponent
  const jsonString = decodeURIComponent(escape(atob(encodedData)))
  return JSON.parse(jsonString)
}

/**
 * Intenta decodificar datos desde Base64 de forma segura
 * Retorna null si falla en lugar de lanzar error
 * 
 * @param encodedData - String codificado en Base64
 * @returns Datos decodificados o null si falla
 * 
 * @example
 * ```ts
 * const data = safeDecodeFromBase64<InvoiceData>(encodedString)
 * if (data) {
 *   // usar data
 * } else {
 *   // manejar error
 * }
 * ```
 */
export function safeDecodeFromBase64<T>(encodedData: string): T | null {
  try {
    return decodeFromBase64<T>(encodedData)
  } catch (error) {
    console.error('Error decoding base64 data:', error)
    return null
  }
}
