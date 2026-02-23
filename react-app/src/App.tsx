import { useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Catalog from './components/Catalog'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import type { Config, Service, Product, Testimonial, FAQItem } from './types'

function App() {
  const [config, setConfig] = useState<Config | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [faq, setFaq] = useState<FAQItem[]>([])

  useEffect(() => {
    Promise.all([
      fetch('/data/config.json').then((r) => r.json()),
      fetch('/data/services.json').then((r) => r.json()),
      fetch('/data/catalog.json').then((r) => r.json()),
      fetch('/data/testimonials.json').then((r) => r.json()),
      fetch('/data/faq.json').then((r) => r.json()),
    ])
      .then(([c, s, p, t, f]) => {
        setConfig(c)
        setServices(Array.isArray(s) ? s : [])
        setProducts(Array.isArray(p) ? p : [])
        setTestimonials(Array.isArray(t) ? t : [])
        setFaq(Array.isArray(f) ? f : [])
      })
      .catch((err) => {
        console.error('Error cargando datos:', err)
        setConfig({
          marca: 'La Gran Tienda',
          tagline: 'Efectos y artículos para eventos',
          ciudad: '',
          cobertura: '',
          whatsappNumbers: ['573001234567'],
          whatsappPrincipal: '573001234567',
          redes: {},
          highlights: ['Cotiza por WhatsApp'],
          whatsapp: {
            mensajeCotizar: '¡Hola! Me gustaría cotizar.',
            mensajeProducto: 'Hola, quiero cotizar: {PRODUCTO}. Fecha: {FECHA}. Ciudad: {CIUDAD}. Evento: {EVENTO}.',
          },
        })
      })
  }, [])

  if (!config) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-4">
        <div className="skeleton w-32 h-8 rounded-lg" />
        <div className="flex gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton w-16 h-16 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton aspect-[4/3] rounded-2xl" />
          ))}
        </div>
        <p className="text-white/40 text-sm animate-pulse">Cargando...</p>
      </div>
    )
  }

  return (
    <>
      <Header config={config} />
      <main>
        <Hero config={config} />
        <Services services={services} />
        <Catalog products={products} config={config} />
        <Testimonials testimonials={testimonials} />
        <FAQ items={faq} />
        <Contact config={config} />
        <Footer config={config} />
      </main>
      <FloatingWhatsApp config={config} />
    </>
  )
}

export default App
