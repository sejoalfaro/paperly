/**
 * Configuración de Playwright para generación de PDFs
 * 
 * Este archivo centraliza las opciones de Playwright para mantener
 * consistencia y facilitar ajustes futuros.
 */

import type { LaunchOptions } from 'playwright'

/**
 * Opciones para lanzar Chromium
 */
export const BROWSER_LAUNCH_OPTIONS: LaunchOptions = {
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--disable-software-rasterizer',
    '--no-first-run',
    '--no-zygote',
    '--disable-web-security', // Solo si necesitas cargar recursos externos
    '--ignore-certificate-errors', // Ignorar errores de certificados SSL
    '--ignore-certificate-errors-spki-list',
  ],
}

/**
 * Opciones para navegar a la página
 */
export const PAGE_GOTO_OPTIONS = {
  waitUntil: 'networkidle' as const,
  timeout: 30000, // 30 segundos
}

/**
 * Tiempo de espera adicional para asegurar que los estilos se carguen
 */
export const STYLE_LOAD_DELAY = 1000 // 1 segundo

/**
 * Opciones para generar el PDF
 */
export const PDF_OPTIONS = {
  format: 'A4' as const,
  printBackground: true,
  margin: {
    top: '0mm',
    right: '0mm',
    bottom: '0mm',
    left: '0mm',
  },
  preferCSSPageSize: true,
}

/**
 * Configuración de caché (opcional, para implementar en el futuro)
 */
export const CACHE_CONFIG = {
  enabled: false, // Cambiar a true si implementas cache
  ttl: 3600, // 1 hora en segundos
  keyPrefix: 'pdf-cache:',
}

/**
 * Configuración de límites (opcional, para implementar rate limiting)
 */
export const RATE_LIMIT_CONFIG = {
  enabled: false, // Cambiar a true si implementas rate limiting
  maxConcurrent: 3, // Máximo de generaciones simultáneas
  queueTimeout: 30000, // 30 segundos
}
