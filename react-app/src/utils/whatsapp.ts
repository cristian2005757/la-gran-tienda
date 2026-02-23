import type { Config } from '../types'

export function getWhatsAppUrl(number: string, text: string): string {
  const num = String(number || '').replace(/\D/g, '')
  if (!num) return ''
  return `https://wa.me/${num}?text=${encodeURIComponent(String(text || ''))}`
}

export function openWhatsApp(number: string, text: string) {
  const url = getWhatsAppUrl(String(number || ''), String(text || ''))
  if (url) window.open(url, '_blank', 'noopener')
}

export function buildProductMessage(config: Config, producto: string): string {
  const template = config.whatsapp?.mensajeProducto ?? 'Hola, quiero cotizar: {PRODUCTO}. Fecha: {FECHA}. Ciudad: {CIUDAD}. Evento: {EVENTO}.'
  return template
    .replace('{PRODUCTO}', producto)
    .replace('{FECHA}', '__')
    .replace('{CIUDAD}', '__')
    .replace('{EVENTO}', '__')
}

export function buildFormMessage(
  config: Config,
  producto: string,
  fecha: string,
  ciudad: string,
  evento: string
): string {
  const template = config.whatsapp?.mensajeProducto ?? 'Hola, quiero cotizar: {PRODUCTO}. Fecha: {FECHA}. Ciudad: {CIUDAD}. Evento: {EVENTO}.'
  return template
    .replace('{PRODUCTO}', producto || '__')
    .replace('{FECHA}', fecha || '__')
    .replace('{CIUDAD}', ciudad || '__')
    .replace('{EVENTO}', evento || '__')
}
