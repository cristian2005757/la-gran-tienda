# La Gran Tienda - Landing Page

**Versión definitiva:** HTML estático. Sin frameworks ni build.

Landing page + catálogo para **La Gran Tienda**, enfocada en efectos y artículos para eventos: revelación de género, bodas, espectáculos.

**🌐 Demo:** [https://la-gran-tienda.vercel.app](https://la-gran-tienda.vercel.app)

## Características

- **Hero** con imagen de fondo y botón "Cotizar por WhatsApp"
- **Servicios**: humo, papelillo, serpentinas, tortas de revelación, etc.
- **Catálogo** con categorías, filtros, buscador y botón "Pedir por WhatsApp"
- **Videos**: TikTok, YouTube y videos locales
- **Testimonios** de clientes
- **FAQ** y **Contacto** con números de WhatsApp

## Desarrollo local

```bash
npm run dev
```

Se abre en `http://localhost:3000` (o el puerto que asigne `serve`).

> **Importante:** Usa siempre un servidor local. Los `fetch` a los JSON no funcionan con `file://`.

## Despliegue en Vercel

1. Sube el proyecto a **GitHub**
2. En [vercel.com](https://vercel.com), importa el repositorio
3. **Framework Preset:** Other (o déjalo en detectado)
4. **Build Command:** (dejar vacío)
5. **Output Directory:** (dejar vacío o `.`)
6. Vercel detectará que es un sitio estático y servirá `index.html` desde la raíz

No requiere build. El sitio se despliega tal cual.

## Estructura del proyecto

```
la-gran-tienda-landing/
├── index.html           # Punto de entrada
├── package.json         # Scripts: npm run dev
├── data/
│   ├── config.json      # Teléfonos, WhatsApp, redes
│   ├── services.json    # Servicios
│   ├── catalog.json     # Productos (19 items)
│   ├── videos.json      # TikTok, YouTube, videos locales
│   ├── testimonials.json # Testimonios
│   └── faq.json         # Preguntas frecuentes
├── css/
│   ├── main.css
│   ├── components.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── catalog.js
│   ├── videos.js
│   ├── testimonials.js
│   └── whatsapp.js
└── assets/
    ├── icons/
    ├── img/
    │   ├── brand/       # logo.svg
    │   ├── hero/        # hero.jpg
    │   └── catalog/     # Imágenes de productos
    └── videos/          # 12 MP4 locales
```

## Configuración de datos

### Contacto (`data/config.json`)

- `telefonos`: números de WhatsApp
- `whatsapp_principal`: número por defecto
- `redes`: Facebook, Instagram, TikTok

### Productos (`data/catalog.json`)

- `name`, `category`, `price`, `unit`
- `image`: ruta relativa en `assets/img/catalog/`
- `short`: descripción breve

## Diseño

Paleta naranja/rojo/amarillo, tema oscuro, fondos suaves. Responsive y accesible.
