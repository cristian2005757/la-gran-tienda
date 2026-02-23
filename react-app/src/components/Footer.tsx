import { motion } from 'framer-motion'
import type { Config } from '../types'

export default function Footer({ config }: { config: Config }) {
  return (
    <footer className="py-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-white/50 text-sm"
        >
          © {new Date().getFullYear()} {config.marca}. Efectos y artículos para eventos.
        </motion.p>
      </div>
    </footer>
  )
}
