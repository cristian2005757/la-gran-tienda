import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Product } from '../types'
import type { Config } from '../types'
import { openWhatsApp, buildProductMessage } from '../utils/whatsapp'

const categories = (products: Product[]) =>
  ['Todas', ...Array.from(new Set(products.map((p) => p.category))).sort()]

export default function Catalog({
  products,
  config,
}: {
  products: Product[]
  config: Config
}) {
  const [category, setCategory] = useState('Todas')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = category === 'Todas' || p.category === category
      const matchSearch =
        !search ||
        (p.name ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (p.category ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (p.short ?? '').toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [products, category, search])

  const handlePedir = (p: Product) => {
    const msg = buildProductMessage(config, p.name)
    openWhatsApp(config.whatsappPrincipal ?? config.whatsappNumbers?.[0]?.replace(/\D/g, '') ?? '573001234567', msg)
  }

  return (
    <section id="catalog" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white">Catálogo</h2>
          <p className="mt-2 text-white/60">Filtra por categoría y pide por WhatsApp</p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto mb-6"
        >
          <input
            type="search"
            placeholder="Buscar por nombre, categoría..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-card border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-orange"
            aria-label="Buscar en catálogo"
          />
        </motion.div>

        {/* Filter chips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 justify-center mb-8 overflow-x-auto py-2"
        >
          {categories(products).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                category === cat
                  ? 'bg-red text-white border border-red scale-105'
                  : 'bg-transparent border border-white/20 text-white/70 hover:border-white/40 hover:scale-[1.02]'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Contador */}
        <p className="text-center text-white/50 text-sm mb-6">
          Mostrando {filtered.length} producto{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Grid 2 en móvil, 3-4 en desktop */}
        <div className="grid grid-cols-2 min-[360px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,106,0,0.08)' }}
                className="rounded-2xl bg-card border border-white/10 overflow-hidden flex flex-col transition-all duration-300 hover:border-white/15"
              >
                <div className="aspect-[4/3] bg-white/5 relative overflow-hidden group">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'data:image/svg+xml,' +
                        encodeURIComponent(
                          '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="%2312121a" width="400" height="300"/><text x="50%" y="50%" fill="%23666" font-size="14" text-anchor="middle" dy=".3em">Sin imagen</text></svg>'
                        )
                    }}
                  />
                </div>
                <div className="p-3 md:p-4 flex-1 flex flex-col">
                  <span className="text-xs text-yellow/80 font-medium">{p.category}</span>
                  <h3 className="font-semibold text-white text-sm md:text-base mt-0.5 truncate" title={p.name}>
                    {p.name}
                  </h3>
                  {p.price > 0 && (
                    <p className="text-orange font-bold text-sm mt-1">
                      ${p.price.toLocaleString('es-CO')} / {p.unit}
                    </p>
                  )}
                  <p className="text-white/50 text-xs mt-1 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const }}>{p.short ?? ''}</p>
                  <motion.button
                    onClick={() => handlePedir(p)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-auto mt-3 w-full py-2.5 bg-[#25D366] text-black font-semibold rounded-lg text-sm hover:brightness-110 transition-all min-h-[44px]"
                    aria-label={`Pedir ${p.name} por WhatsApp`}
                  >
                    Pedir por WhatsApp
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white/50 py-12"
          >
            No hay productos que coincidan con tu búsqueda.
          </motion.p>
        )}
      </div>
    </section>
  )
}
