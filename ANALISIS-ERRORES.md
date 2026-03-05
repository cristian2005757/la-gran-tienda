# Análisis de errores - La Gran Tienda

## Errores corregidos

### 1. **FAQ – Max-height insuficiente**
- **Problema:** El primer ítem del FAQ tenía `max-height: 500px`, lo que podía cortar respuestas largas.
- **Solución:** Cambiado a `max-height: 2000px`.

### 2. **FAQ y Servicios – Riesgo XSS**
- **Problema:** El contenido de FAQ y servicios se insertaba en el HTML sin escapar (`<`, `>`, `&`, `"`).
- **Solución:** Añadida función `esc()` que escapa caracteres HTML en preguntas, respuestas y textos de servicios.

### 3. **Catálogo – `data-producto` con comillas**
- **Problema:** `data-producto` usaba comillas simples y `escapeJs`, lo que podría romperse con nombres como "O'Brien".
- **Solución:** Uso de atributos con comillas dobles y `escapeAttr(JSON.stringify(p))`.

### 4. **Script inline – Año**
- **Problema:** `document.getElementById('year')` podía ser `null`.
- **Solución:** Comprobación previa antes de asignar `textContent`.

### 5. **`data/videos.json` – Rutas y títulos con caracteres corruptos**
- **Problema:** Los nombres de archivo tenían `?` en lugar de `ó` y `ñ` (ej: `Grabaci?n`, `pasi?n`, `Dise?os`). Los 10 videos locales no cargaban.
- **Solución:** Corregidas todas las rutas y títulos con los caracteres correctos.

### 6. **`js/videos.js:73` – Posible TypeError en null**
- **Problema:** `exclusivosTitle.style.display = ''` se ejecutaba sin verificar si el elemento existía.
- **Solución:** Añadido guard `if (exclusivosTitle)` antes de acceder a `.style`.

### 7. **`js/catalog.js` – Función `escapeJs` no utilizada**
- **Problema:** Función definida pero sin ninguna llamada (código muerto).
- **Solución:** Eliminada.

### 8. **`js/catalog.js` – Error silenciado en click de producto**
- **Problema:** `catch (_) {}` tragaba errores de `JSON.parse` sin dejar rastro.
- **Solución:** Cambiado a `catch (err) { console.error(...) }`.

### 9. **`js/whatsapp.js` – `window.open` sin `noreferrer`**
- **Problema:** Solo usaba `noopener`, sin `noreferrer`.
- **Solución:** Cambiado a `'noopener,noreferrer'`.

### 10. **`js/catalog.js` – Mensaje de error sobrescrito**
- **Problema:** Si `catalog.json` fallaba, el mensaje "Error al cargar el catálogo" se reemplazaba por "No hay productos que coincidan".
- **Solución:** `loadCatalog()` retorna `false`; flujo hace `return` antes de `renderFilters`/`renderProducts`.

### 11. **`js/main.js` – Navbar `aria-expanded` desincronizado**
- **Problema:** Al cerrar el menú (link o clic fuera), el toggle seguía con `aria-expanded="true"`.
- **Solución:** Se actualiza `aria-expanded="false"` en ambos handlers de cierre.

### 12. **Scripts inline – Riesgo de null**
- **Problema:** `getElementById('services-grid')` y `faq-list` sin verificación previa.
- **Solución:** Comprobación `if (!el) return` antes de asignar.

---

## Recursos pendientes (no son errores de código)

| Recurso | Ruta | Estado |
|---------|------|--------|
| Logo | `assets/img/brand/logo.png` | Faltante (fallback: texto) |
| Imágenes catálogo | `assets/img/catalog/*.png` | ~15 de 18 faltantes (fallback: picsum) |
| Dominio canonical | `lagrantienda.com` en meta tags | Verificar si es el dominio real |

---

## Archivos verificados como correctos

- `data/catalog.json` – JSON válido
- `data/config.json` – JSON válido
- `data/faq.json` – JSON válido
- `data/services.json` – JSON válido
- `data/testimonials.json` – JSON válido
- `data/videos.json` – JSON válido (corregido)
- `assets/icons/whatsapp.svg` – Existe
- `assets/icons/favicon.svg` – Existe
- `assets/img/hero/hero.jpg` – Existe
- Rutas de scripts y hojas de estilo – Correctas
