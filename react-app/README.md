# La Gran Tienda - Landing Page (React + Vite)

Landing page one-page para **La Gran Tienda**, enfocada en efectos e insumos para eventos. Ventas por WhatsApp (sin carrito ni pagos).

## Stack

- **React 18** + **TypeScript**
- **Vite** (build rápido)
- **TailwindCSS** (estilos)
- **Framer Motion** (animaciones)

## Instalación y ejecución

```bash
cd react-app
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

## Build para producción

```bash
npm run build
```

Los archivos se generan en `dist/`. Prevista localmente con:

```bash
npm run preview
```

## Deploy (Vercel / Netlify)

### Vercel
1. Conecta el repo en [vercel.com](https://vercel.com)
2. Framework preset: **Vite**
3. Build command: `npm run build`
4. Output: `dist`

### Netlify
1. Conecta el repo en [netlify.com](https://netlify.com)
2. Build command: `npm run build`
3. Publish directory: `dist`

---

## Dónde subir imágenes y videos

### Imágenes

Sube tus archivos en estas carpetas según su uso:

| Carpeta | Ruta en el proyecto | Uso |
|---------|---------------------|-----|
| Logo | `public/images/logo/` | Logo de la marca (header). Ej: `logo.png` |
| Hero / banner | `public/images/hero/` | Imagen principal del hero. Ej: `hero.jpg` |
| Catálogo | `public/images/catalog/` | Fotos de productos. Nombres deben coincidir con `catalog.json` |
| Testimonios | `public/images/testimonials/` | Fotos opcionales de clientes. Ej: `01.jpg`, `02.jpg` |

### Rutas exactas para imágenes en JSON

**Logo** (Header):  
Añade `"logo": "/images/logo/logo.png"` en `public/data/config.json`.  
Sube tu logo en: `public/images/logo/logo.png`  

**Hero**:  
Ruta fija en el componente:  
`/images/hero/hero.jpg`

**Catálogo** (`public/data/catalog.json`):  
Campo `image` de cada producto:
- `/images/catalog/volanes.jpg`
- `/images/catalog/torta-49t.jpg`
- `/images/catalog/humo-colores.jpg`
- etc.

**Testimonios** (`public/data/testimonials.json`):  
Campo `foto` de cada testimonio:
- `/images/testimonials/01.jpg`
- `/images/testimonials/02.jpg`
- etc.

### Videos (no subir MP4)

No subas archivos MP4 al repositorio.

Usa enlaces embebidos en un JSON. Si quieres una sección de videos, crea:

- `public/data/videos.json` con estructura:
```json
[
  {"id":"1","titulo":"Revelación","plataforma":"youtube","url":"https://youtube.com/..."},
  {"id":"2","titulo":"Humo colores","plataforma":"instagram","url":"https://instagram.com/reel/..."}
]
```

Luego añade un componente `Videos` que lea ese JSON y muestre tarjetas con links o embeds (YouTube, TikTok, Instagram).

---

## Estructura del proyecto

```
react-app/
├── public/
│   ├── data/              ← JSON editables (config, catalog, services, etc.)
│   │   ├── config.json
│   │   ├── catalog.json
│   │   ├── services.json
│   │   ├── testimonials.json
│   │   └── faq.json
│   └── images/            ← Sube aquí tus imágenes
│       ├── logo/
│       ├── hero/
│       ├── catalog/
│       └── testimonials/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Catalog.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── FloatingWhatsApp.tsx
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
└── package.json
```

## Datos editables (sin tocar código)

Todo el contenido se gestiona desde `public/data/`:

- **config.json**: marca, tagline, números de WhatsApp, redes, highlights
- **services.json**: servicios con iconos
- **catalog.json**: productos (filtros por categoría automáticos)
- **testimonials.json**: testimonios de clientes
- **faq.json**: preguntas frecuentes

Al agregar productos en `catalog.json`, la web los muestra automáticamente.
