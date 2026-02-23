/**
 * La Gran Tienda - WhatsApp
 * Un solo sistema: config.json + wa.me/<numero>?text=<mensaje>
 */

let config = {};

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('data/config.json');
    config = await res.json();
  } catch (err) {
    config = { telefonos: ['573001234567'], whatsapp: {} };
  }
  initCotizarButtons();
  initContactForm();
});

function getWhatsAppNumber() {
  const num = config.whatsapp_principal || config.whatsappPrincipal || config.telefonos?.[0] || config.whatsappNumbers?.[0];
  return String(num || '').replace(/\D/g, '') || '573001234567';
}

function openWhatsApp(text) {
  const num = getWhatsAppNumber();
  const msg = encodeURIComponent(text);
  window.open(`https://wa.me/${num}?text=${msg}`, '_blank', 'noopener');
}

function openWhatsAppCotizar() {
  const text = config.whatsapp?.mensaje_cotizar || config.whatsapp?.mensajeCotizar || '¡Hola! Me gustaría recibir una cotización para mi evento.';
  openWhatsApp(text);
}

/**
 * Mensaje por producto: "Hola, quiero cotizar X. Fecha: __. Ciudad: __. Evento: __."
 */
function openWhatsAppProduct(producto) {
  const base = config.whatsapp?.mensaje_base || 'Hola, quiero cotizar __PRODUCTO__. Fecha: __FECHA__. Ciudad: __CIUDAD__. Evento: __EVENTO__.';
  const text = base
    .replace('__PRODUCTO__', producto.name || producto.nombre || '')
    .replace('__FECHA__', '__')
    .replace('__CIUDAD__', '__')
    .replace('__EVENTO__', '__');
  openWhatsApp(text);
}

function showFeedback(msg) {
  const toast = document.createElement('div');
  toast.className = 'toast-feedback';
  toast.textContent = msg;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

function initCotizarButtons() {
  document.querySelectorAll('.btn-whatsapp-cotizar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showFeedback('Abriendo WhatsApp...');
      openWhatsAppCotizar();
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const producto = document.getElementById('form-producto')?.value?.trim() || '__';
    const fecha = document.getElementById('form-fecha')?.value?.trim() || '__';
    const ciudad = document.getElementById('form-ciudad')?.value?.trim() || '__';
    const evento = document.getElementById('form-evento')?.value?.trim() || '__';

    const base = config.whatsapp?.mensaje_base || 'Hola, quiero cotizar __PRODUCTO__. Fecha: __FECHA__. Ciudad: __CIUDAD__. Evento: __EVENTO__.';
    const text = base
      .replace('__PRODUCTO__', producto)
      .replace('__FECHA__', fecha)
      .replace('__CIUDAD__', ciudad)
      .replace('__EVENTO__', evento);

    showFeedback('Abriendo WhatsApp...');
    openWhatsApp(text);
  });
}
