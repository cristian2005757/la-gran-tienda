/**
 * La Gran Tienda - Catálogo
 * Productos desde catalog.json. Filtros auto, buscador por name/category/short
 */

let productos = [];

document.addEventListener('DOMContentLoaded', async () => {
  showCatalogSkeleton();
  await loadCatalog();
  renderFilters();
  renderProducts(productos);
  initSearch();
  initFilters();
});

function showCatalogSkeleton() {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return;
  const count = 12;
  grid.innerHTML = Array.from({ length: count }, () => `
    <article class="product-card product-skeleton">
      <div class="skeleton-image"></div>
      <div class="product-body">
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
        <div class="skeleton-btn"></div>
      </div>
    </article>
  `).join('');
}

async function loadCatalog() {
  try {
    const res = await fetch('data/catalog.json');
    productos = await res.json();
  } catch (err) {
    console.error('Error cargando catálogo:', err);
    const grid = document.getElementById('catalog-grid');
    if (grid) grid.innerHTML = '<p class="no-results" style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--text-muted);">Error al cargar el catálogo.</p>';
  }
}

function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

function getCategories() {
  const cats = [...new Set(productos.map(p => p.category))].filter(Boolean).sort();
  return cats;
}

function renderFilters() {
  const container = document.getElementById('catalog-filters');
  if (!container) return;

  const categories = getCategories();
  const allChip = '<button class="filter-chip active" data-category="*">Todos</button>';
  const catChips = categories.map(c =>
    `<button class="filter-chip" data-category="${escapeAttr(c)}">${escapeHtml(c)}</button>`
  ).join('');

  container.innerHTML = allChip + catChips;
}

function initFilters() {
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.dataset.category;
      const query = document.getElementById('catalog-search')?.value?.trim().toLowerCase() || '';
      filterAndRender(cat, query);
    });
  });
}

function initSearch() {
  const search = document.getElementById('catalog-search');
  if (!search) return;

  const debouncedFilter = debounce(() => {
    const cat = document.querySelector('.filter-chip.active')?.dataset.category || '*';
    const query = search.value.trim().toLowerCase();
    filterAndRender(cat, query);
  }, 150);

  search.addEventListener('input', debouncedFilter);
}

function filterAndRender(category, query) {
  let list = productos;
  if (category !== '*') list = list.filter(p => p.category === category);
  if (query) {
    list = list.filter(p =>
      (p.name || '').toLowerCase().includes(query) ||
      (p.category || '').toLowerCase().includes(query) ||
      (p.short || '').toLowerCase().includes(query)
    );
  }
  renderProducts(list);
}

function renderProducts(list) {
  const grid = document.getElementById('catalog-grid');
  const countEl = document.getElementById('catalog-count');
  if (!grid) return;

  if (countEl) {
    countEl.textContent = list.length === 0 ? 'No hay productos que coincidan' : `Mostrando ${list.length} producto${list.length === 1 ? '' : 's'}`;
  }

  if (list.length === 0) {
    grid.innerHTML = '<p class="no-results" style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--text-muted);">No hay productos que coincidan.</p>';
    return;
  }

  grid.innerHTML = list.map(p => createProductCard(p)).join('');

  // Si la sección ya está visible, aplicar stagger delay a los nuevos items
  const section = grid.closest('.animate-on-scroll');
  if (section?.classList.contains('visible')) {
    grid.querySelectorAll('.stagger-item').forEach((item, i) => {
      item.style.animationDelay = `${i * 50}ms`;
    });
  }

  grid.querySelectorAll('.btn-pedir').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const data = btn.dataset.producto;
      if (data) {
        try {
          if (typeof showFeedback === 'function') showFeedback('Abriendo WhatsApp...');
          openWhatsAppProduct(JSON.parse(data));
        } catch (_) {}
      }
    });
  });
}

function createProductCard(p) {
  const imgSrc = p.image || 'assets/img/catalog/placeholder.svg';
  const fallbackImg = `https://picsum.photos/seed/${encodeURIComponent(p.id)}/400/300`;
  const priceText = 'Consultar';

  const productData = escapeAttr(JSON.stringify(p));
  return `
    <article class="product-card stagger-item" data-id="${escapeAttr(p.id)}">
      <img src="${escapeAttr(imgSrc)}" alt="${escapeAttr(p.name)}" class="product-image" loading="lazy"
           onerror="this.src='${fallbackImg}';this.onerror=null;">
      <div class="product-body">
        <h3 class="product-name">${escapeHtml(p.name)}</h3>
        <p class="product-price">${escapeHtml(priceText)}</p>
        <p class="product-short">${escapeHtml(p.short || '')}</p>
        <div class="product-actions">
          <button class="btn btn-primary btn-sm btn-whatsapp btn-pedir" data-producto="${productData}">
            Pedir por WhatsApp
          </button>
        </div>
      </div>
    </article>
  `;
}

function escapeHtml(s) {
  const d = document.createElement('div');
  d.textContent = s || '';
  return d.innerHTML;
}

function escapeAttr(s) {
  return escapeHtml(s).replace(/"/g, '&quot;');
}

function escapeJs(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
}
