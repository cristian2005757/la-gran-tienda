# La Gran Tienda - Landing Page

Landing page + catálogo para **La Gran Tienda**, enfocada en efectos y artículos para eventos: revelación de género, bodas, espectáculos.

**🌐 Demo:** [https://la-gran-tienda.vercel.app](https://la-gran-tienda.vercel.app)

## Características

- **Hero** con nombre, frase y botón "Cotizar por WhatsApp"
- **Servicios**: humo, papelillo, serpentinas, tortas de revelación, etc.
- **Catálogo** con categorías, filtros, buscador y botón "Pedir este" por WhatsApp
- **Videos**: enlaces a Reels/Shorts/TikTok embebidos
- **FAQ** y **Contacto** con dos números y redes sociales

## Estructura del proyecto

```
la-gran-tienda-landing/
├── index.html
├── data/
│   ├── config.json      # nombre, teléfonos, redes, colores
│   ├── services.json    # servicios
│   ├── catalog.json    # productos y categorías
│   ├── videos.json     # links a videos
│   └── faq.json        # preguntas frecuentes
├── css/
├── js/
└── assets/
```

## Desarrollo local

Abre `index.html` directamente en el navegador o usa un servidor local:

```bash
npx serve .
# o
python -m http.server 8000
```

> **Nota:** Para que los `fetch` a los JSON funcionen, debes usar un servidor local (no abrir el archivo con `file://`).

## Despliegue

Sube a **GitHub** y conecta con **Netlify** o **Vercel**. No requiere build.

### Configurar datos de contacto

Edita `data/config.json`:

- `telefonos`: números de WhatsApp
- `whatsapp_principal`: número por defecto para enlaces
- `redes`: Facebook, Instagram, TikTok

### Agregar productos

Edita `data/catalog.json`. Cada producto incluye:

- `nombre`, `categoria`, `precio`
- `imagen`: ruta relativa dentro de `assets/img/`
- Opcionales: `precio_mayor`, `unidad`, `descripcion`

## Diseño

Paleta naranja/rojo/amarillo, fondos suaves y botones fuertes. Responsive y accesible.
