import { motion } from 'framer-motion'
import type { Service } from '../types'

const icons: Record<string, string> = {
  smoke: '✓',
  colors: '✓',
  confetti: '✓',
  ribbon: '✓',
  cake: '✓',
  star: '✓',
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Services({ services }: { services: Service[] }) {
  return (
    <section id="servicios" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white">Servicios</h2>
          <p className="mt-2 text-white/60 max-w-xl mx-auto">Efectos y artículos para que tu evento sea único</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((s) => (
            <motion.article
              key={s.id}
              variants={item}
              whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,106,0,0.1)' }}
              className="p-6 rounded-2xl bg-card border border-white/10 transition-all duration-300 hover:border-white/15"
            >
              <div className="w-12 h-12 rounded-xl bg-orange/20 flex items-center justify-center text-orange text-xl font-bold mb-4">
                {icons[s.icono] || '✓'}
              </div>
              <h3 className="text-lg font-semibold text-white">{s.nombre}</h3>
              <p className="mt-2 text-white/60 text-sm">{s.descripcion}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
