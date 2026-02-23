import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Config } from '../types'
import { openWhatsApp, getWhatsAppUrl, buildFormMessage } from '../utils/whatsapp'

export default function Contact({ config }: { config: Config }) {
  const [producto, setProducto] = useState('')
  const [fecha, setFecha] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [evento, setEvento] = useState('')
  const [sending, setSending] = useState(false)
  const num = config.whatsappPrincipal ?? config.whatsappNumbers?.[0]?.replace(/\D/g, '') ?? '573001234567'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    const msg = buildFormMessage(config, producto || '__', fecha || '__', ciudad || '__', evento || '__')
    setTimeout(() => {
      openWhatsApp(num, msg)
      setSending(false)
    }, 400)
  }

  const handleCotizar = () => openWhatsApp(num, config.whatsapp?.mensajeCotizar ?? '¡Hola! Me gustaría cotizar.')

  return (
    <section id="contacto" className="py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange/5 pointer-events-none" />
      <div className="max-w-2xl mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white">Contacto</h2>
          <p className="mt-2 text-white/60">Escríbenos por WhatsApp o completa el formulario</p>
        </motion.div>

        {/* Selector WhatsApp si hay 2 números */}
        {(config.whatsappNumbers?.length ?? 0) >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex gap-2 justify-center mb-6"
          >
            {(config.whatsappNumbers ?? []).map((n, i) => (
              <a
                key={i}
                href={getWhatsAppUrl(n.replace(/\D/g, ''), config.whatsapp?.mensajeCotizar ?? '¡Hola! Me gustaría cotizar.')}
                target="_blank"
                rel="noopener"
                className="px-4 py-2 rounded-lg font-medium text-sm bg-card border border-white/20 text-white/70 hover:border-orange transition-all"
              >
                WhatsApp {i + 1}
              </a>
            ))}
          </motion.div>
        )}

        {/* Redes */}
        {(config.redes?.instagram || config.redes?.facebook || config.redes?.tiktok) && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center gap-4 mb-10"
          >
            {config.redes.facebook && (
              <a
                href={config.redes.facebook}
                target="_blank"
                rel="noopener"
                className="w-12 h-12 rounded-full bg-card border border-white/10 flex items-center justify-center hover:border-orange transition-colors"
                aria-label="Facebook"
              >
                FB
              </a>
            )}
            {config.redes.instagram && (
              <a
                href={config.redes.instagram}
                target="_blank"
                rel="noopener"
                className="w-12 h-12 rounded-full bg-card border border-white/10 flex items-center justify-center hover:border-orange transition-colors"
                aria-label="Instagram"
              >
                IG
              </a>
            )}
            {config.redes.tiktok && (
              <a
                href={config.redes.tiktok}
                target="_blank"
                rel="noopener"
                className="w-12 h-12 rounded-full bg-card border border-white/10 flex items-center justify-center hover:border-orange transition-colors"
                aria-label="TikTok"
              >
                TT
              </a>
            )}
          </motion.div>
        )}

        {/* Formulario */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl bg-card border border-white/10 space-y-4"
        >
          <div>
            <label htmlFor="producto" className="block text-sm text-white/60 mb-1">
              Producto o servicio de interés
            </label>
            <input
              id="producto"
              type="text"
              value={producto}
              onChange={(e) => setProducto(e.target.value)}
              placeholder="Ej: Humo de colores"
              className="w-full px-4 py-3 rounded-xl bg-dark border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-orange"
            />
          </div>
          <div>
            <label htmlFor="fecha" className="block text-sm text-white/60 mb-1">
              Fecha del evento
            </label>
            <input
              id="fecha"
              type="text"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              placeholder="Ej: 15 marzo 2025"
              className="w-full px-4 py-3 rounded-xl bg-dark border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-orange"
            />
          </div>
          <div>
            <label htmlFor="ciudad" className="block text-sm text-white/60 mb-1">
              Ciudad
            </label>
            <input
              id="ciudad"
              type="text"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              placeholder="Ej: Bogotá"
              className="w-full px-4 py-3 rounded-xl bg-dark border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-orange"
            />
          </div>
          <div>
            <label htmlFor="evento" className="block text-sm text-white/60 mb-1">
              Tipo de evento
            </label>
            <input
              id="evento"
              type="text"
              value={evento}
              onChange={(e) => setEvento(e.target.value)}
              placeholder="Ej: Revelación de género"
              className="w-full px-4 py-3 rounded-xl bg-dark border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-orange"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="w-full py-4 bg-[#25D366] text-black font-semibold rounded-xl hover:brightness-110 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {sending ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Abriendo WhatsApp...
              </>
            ) : (
              'Enviar por WhatsApp'
            )}
          </button>
        </motion.form>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <motion.button
            onClick={handleCotizar}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-orange text-black font-semibold rounded-xl hover:brightness-110 transition-all min-h-[48px]"
          >
            Cotizar por WhatsApp
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
