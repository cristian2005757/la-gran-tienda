import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Config } from '../types'
import { openWhatsApp } from '../utils/whatsapp'

const links = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#catalog', label: 'Catálogo' },
  { href: '#testimonios', label: 'Testimonios' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Header({ config }: { config: Config }) {
  const [open, setOpen] = useState(false)
  const handleCotizar = () => openWhatsApp(config.whatsappPrincipal ?? config.whatsappNumbers?.[0]?.replace(/\D/g, '') ?? '573001234567', config.whatsapp?.mensajeCotizar ?? '¡Hola! Me gustaría cotizar.')

  return (
    <header className="sticky top-0 z-50 bg-dark/95 backdrop-blur-md border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between" aria-label="Menú principal">
        <a href="#" className="flex items-center gap-2">
          {config.logo ? (
            <img src={config.logo} alt={config.marca} className="h-10 w-auto" />
          ) : (
            <span className="font-bold text-lg text-orange">{config.marca}</span>
          )}
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-white/70 hover:text-white transition-colors text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <motion.button
              onClick={handleCotizar}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-orange text-black font-semibold px-4 py-2 rounded-lg text-sm hover:brightness-110 transition-colors"
              aria-label="Cotizar por WhatsApp"
            >
              Cotizar
            </motion.button>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-white/10"
          >
            <ul className="px-4 py-4 flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block py-3 text-white/80 hover:text-white font-medium"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    handleCotizar()
                    setOpen(false)
                  }}
                  className="w-full mt-2 bg-orange text-black font-semibold py-3 rounded-lg"
                >
                  Cotizar por WhatsApp
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
