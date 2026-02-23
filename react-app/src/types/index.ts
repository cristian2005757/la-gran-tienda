export interface Config {
  marca: string
  logo?: string
  tagline: string
  ciudad: string
  cobertura: string
  whatsappNumbers?: string[]
  whatsappPrincipal?: string
  redes: { facebook?: string; instagram?: string; tiktok?: string }
  highlights?: string[]
  whatsapp?: { mensajeCotizar: string; mensajeProducto: string }
}

export interface Service {
  id: string
  nombre: string
  descripcion: string
  icono: string
}

export interface Product {
  id: string
  name: string
  category: string
  price: number
  unit: string
  image: string
  short: string
}

export interface Testimonial {
  id: string
  nombre: string
  evento: string
  frase: string
  estrellas: number
  foto?: string
}

export interface FAQItem {
  pregunta: string
  respuesta: string
}
