import { motion } from 'framer-motion'
import type { Config } from '../types'
import { openWhatsApp } from '../utils/whatsapp'

export default function Hero({ config }: { config: Config }) {
  const handleCotizar = () => openWhatsApp(config.whatsappPrincipal ?? config.whatsappNumbers?.[0]?.replace(/\D/g, '') ?? '573001234567', config.whatsapp?.mensajeCotizar ?? '¡Hola! Me gustaría cotizar.')

  return (
    <section className="min-h-[85vh] md:min-h-[90vh] flex items-center pt-20 md:pt-24 pb-16 relative overflow-hidden">
      {/* Patrón sutil de fondo */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="max-w-6xl mx-auto px-4 w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Efectos que hacen tu evento inolvidable
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-xl">
              {config.tagline}. Revelaciones de género, bodas, espectáculos. Humo de colores, tortas, papelillo y más.
            </p>

            {/* Chips de ventajas */}
            <div className="flex flex-wrap gap-2 mt-6 justify-center md:justify-start">
              {(config.highlights ?? []).map((h, i) => (
                <motion.span
                  key={h}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/80"
                >
                  {h}
                </motion.span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCotizar}
                className="px-6 py-4 bg-orange text-black font-semibold rounded-xl shadow-lg hover:shadow-[0_8px_30px_rgba(255,106,0,0.4)] hover:brightness-110 transition-all text-base min-h-[48px]"
              >
                Cotizar por WhatsApp
              </motion.button>
              <motion.a
                href="#catalog"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-4 border-2 border-orange text-orange font-semibold rounded-xl text-center hover:bg-orange/10 transition-colors min-h-[48px] flex items-center justify-center"
              >
                Ver Catálogo
              </motion.a>
            </div>
          </motion.div>

          {/* Hero visual - gradient card en desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex justify-center"
          >
            <div className="w-full max-w-md aspect-video rounded-2xl border border-white/10 bg-card overflow-hidden shadow-2xl shadow-black/30 ring-1 ring-white/5">
              <img
                src="/images/hero/hero.jpg"
                alt="Evento con efectos"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                  const parent = (e.target as HTMLImageElement).parentElement
                  if (parent) {
                    const fallback = document.createElement('div')
                    fallback.className = 'w-full h-full flex items-center justify-center bg-gradient-to-br from-orange/20 to-red/10'
                    fallback.innerHTML = '<span class="text-white/40 text-xl font-semibold">La Gran Tienda</span>'
                    parent.appendChild(fallback)
                  }
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
