import { motion } from 'framer-motion'
import type { Testimonial } from '../types'

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section id="testimonios" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white">Clientes felices</h2>
          <p className="mt-2 text-white/60">Lo que dicen nuestros clientes</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,208,0,0.1)' }}
              className="p-6 rounded-2xl bg-card border border-white/10 transition-all duration-300 hover:border-white/15"
            >
              <div className="flex gap-1 mb-3" aria-label={`${t.estrellas} estrellas`}>
                {Array.from({ length: t.estrellas }).map((_, j) => (
                  <span key={j} className="text-yellow text-lg">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-white/90 text-sm md:text-base">"{t.frase}"</p>
              <div className="mt-4 flex items-center gap-3">
                {t.foto ? (
                  <img
                    src={t.foto}
                    alt={t.nombre}
                    className="w-10 h-10 rounded-full object-cover bg-white/10"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-orange/30 flex items-center justify-center text-orange font-bold">
                    {t.nombre.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-white text-sm">{t.nombre}</p>
                  <p className="text-white/50 text-xs">{t.evento}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
