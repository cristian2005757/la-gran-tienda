# Análisis de errores - La Gran Tienda

## Errores corregidos

### 1. **FAQ – Max-height insuficiente**
- **Problema:** El primer ítem del FAQ tenía `max-height: 500px`, lo que podía cortar respuestas largas.
- **Solución:** Cambiado a `max-height: 2000px`.

### 2. **FAQ y Servicios – Riesgo XSS**
- **Problema:** El contenido de FAQ y servicios se insertaba en el HTML sin escapar (`<`, `>`, `&`, `"`), lo que permitía potencial inyección de código.
- **Solución:** Añadida función `esc()` que escapa caracteres HTML en preguntas, respuestas y textos de servicios.

### 3. **Catálogo – `data-producto` con comillas**
- **Problema:** `data-producto` usaba comillas simples y `escapeJs`, lo que podría romperse con nombres como "O'Brien".
- **Solución:** Uso de atributos con comillas dobles y `escapeAttr(JSON.stringify(p))` para codificación correcta.

### 4. **Script inline – Año**
- **Problema:** `document.getElementById('year')` podía ser `null` si el elemento no existiera.
- **Solución:** Comprobación previa antes de asignar `textContent`.

---

## Archivos o recursos faltantes

| Recurso | Ruta referenciada | Estado |
|---------|-------------------|--------|
| **favicon.ico** | `favicon.ico` (raíz) | No existe |
| hero.jpg | `assets/img/hero/hero.jpg` | Probablemente ausente |
| logo.png | `assets/img/brand/logo.png` | Probablemente ausente |

**Recomendación favicon:** Añadir `assets/img/brand/logo.png` como favicon o generar un `favicon.ico` en la raíz.

---

## Archivos verificados como correctos

- `data/catalog.json` – JSON válido
- `data/config.json` – JSON válido  
- `data/faq.json` – JSON válido
- `data/services.json` – JSON válido
- `data/testimonials.json` – JSON válido
- `assets/icons/whatsapp.svg` – Existe
- Rutas de scripts y hojas de estilo – Correctas

---

## Mejoras opcionales

1. **Orden de scripts:** `whatsapp.js` debe cargarse antes de `catalog.js` porque `openWhatsAppProduct` se usa en el catálogo.
2. **Formulario de contacto:** No tiene `action` ni `method` (se envía vía JS a WhatsApp), lo cual es correcto.
3. **Navbar móvil:** El `document` listener para cerrar el menú funciona correctamente.
4. **Scroll suave:** Los `href="#"` no causan scroll porque los botones de WhatsApp tienen `preventDefault` en su handler.
