/**
 * La Gran Tienda - Testimonios / Clientes
 */

document.addEventListener('DOMContentLoaded', async () => {
  await loadAndRenderTestimonials();
});

async function loadAndRenderTestimonials() {
  const container = document.getElementById('clientes-container');
  if (!container) return;

  try {
    const res = await fetch('data/testimonials.json');
    const testimonials = await res.json();

    if (!testimonials.length) {
      container.innerHTML = '<p class="no-testimonials">Próximamente testimonios de clientes.</p>';
      return;
    }

    container.innerHTML = testimonials.map(t => createTestimonialCard(t)).join('');
  } catch (err) {
    container.innerHTML = '<p class="no-testimonials">No se pudieron cargar los testimonios.</p>';
  }
}

function createTestimonialCard(t) {
  const stars = '★'.repeat(t.estrellas || 5) + '☆'.repeat(5 - (t.estrellas || 5));
  const initials = (t.nombre || '?').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return `
    <article class="testimonial-card stagger-item">
      <div class="testimonial-header">
        <div class="testimonial-avatar" aria-hidden="true">${initials}</div>
        <div>
          <span class="testimonial-stars">${stars}</span>
          <strong class="testimonial-name">${escapeHtml(t.nombre || 'Cliente')}</strong>
          <span class="testimonial-evento">${escapeHtml(t.evento || '')}</span>
        </div>
      </div>
      <p class="testimonial-frase">"${escapeHtml(t.frase || '')}"</p>
    </article>
  `;
}

function escapeHtml(s) {
  const d = document.createElement('div');
  d.textContent = s || '';
  return d.innerHTML;
}
