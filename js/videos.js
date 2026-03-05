/**
 * La Gran Tienda - Videos
 * Links a Reels/YouTube/TikTok. Embeds cuando sea posible, sino tarjeta + botón Ver
 */

const SECTION_LABELS = {
  revelacion: 'Revelación de género',
  boda: 'Bodas',
  cumpleanos: 'Cumpleaños / Quince',
  show: 'Shows / Espectáculos',
  corporativo: 'Eventos corporativos',
  general: 'Eventos generales'
};
const SECTION_ORDER = ['revelacion', 'boda', 'cumpleanos', 'show', 'corporativo', 'general'];

function groupBySection(videos) {
  const groups = {};
  videos.forEach(v => {
    const s = v.seccion || 'general';
    if (!groups[s]) groups[s] = [];
    groups[s].push(v);
  });
  return SECTION_ORDER.filter(k => groups[k]?.length).map(k => ({ key: k, label: SECTION_LABELS[k] || k, videos: groups[k] }));
}

function renderVideoGroups(videos, createCard) {
  const groups = groupBySection(videos);
  return groups.map(g => {
    const cards = g.videos.map(v => createCard(v)).join('');
    const dots = g.videos.map((_, i) => `<button type="button" class="video-carousel-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Ir al video ${i + 1}"></button>`).join('');
    return `
    <div class="video-group">
      <h4 class="video-group-title">${escapeHtml(g.label)}</h4>
      <div class="video-carousel-wrap">
        <div class="videos-grid stagger-container">${cards}</div>
        <div class="video-carousel-dots" role="tablist">${dots}</div>
      </div>
    </div>
  `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadAndRenderVideos();
});

async function loadAndRenderVideos() {
  const container = document.getElementById('videos-container');
  const exclusivosContainer = document.getElementById('videos-exclusivos-container');
  const exclusivosTitle = document.getElementById('videos-exclusivos-title');
  if (!container) return;

  try {
    const res = await fetch('data/videos.json');
    const videos = await res.json();

    const red = videos.filter(v => v.plataforma !== 'local');
    const local = videos.filter(v => v.plataforma === 'local');
    const tiktokYouTube = [...red.filter(v => v.plataforma !== 'youtube'), ...red.filter(v => v.plataforma === 'youtube')];

    if (!tiktokYouTube.length && !local.length) {
      container.innerHTML = '<p style="text-align:center;color:var(--text-muted);">Próximamente más videos.</p>';
      return;
    }

    // Primero: videos locales (autoplay) en "Videos de nuestros eventos"
    if (local.length && exclusivosContainer) {
      if (exclusivosTitle) exclusivosTitle.style.display = '';
      exclusivosContainer.innerHTML = renderVideoGroups(local, v => createVideoCard(v));
      initVideoCarouselDots(exclusivosContainer);
      const section = exclusivosContainer.closest('.animate-on-scroll');
      if (section) {
        section.classList.add('visible');
        exclusivosContainer.querySelectorAll('.stagger-item').forEach((item, i) => {
          item.style.animationDelay = `${i * 50}ms`;
        });
      }
    } else {
      if (exclusivosTitle) exclusivosTitle.style.display = 'none';
    }

    // Segundo: TikTok + YouTube en "También en TikTok"
    if (tiktokYouTube.length) {
      container.innerHTML = renderVideoGroups(tiktokYouTube, v => createVideoCard(v));
      initVideoCarouselDots(container);
      const section = container.closest('.animate-on-scroll');
      if (section) {
        section.classList.add('visible');
        container.querySelectorAll('.stagger-item').forEach((item, i) => {
          item.style.animationDelay = `${i * 50}ms`;
        });
      }
    } else {
      container.innerHTML = '';
    }
  } catch (err) {
    container.innerHTML = '<p style="text-align:center;color:var(--text-muted);">No se pudieron cargar los videos.</p>';
  }
}

function initVideoCarouselDots(wrapper) {
  if (!wrapper) return;
  wrapper.querySelectorAll('.video-carousel-wrap').forEach(wrap => {
    const grid = wrap.querySelector('.videos-grid');
    const dots = wrap.querySelectorAll('.video-carousel-dot');
    const cards = grid?.querySelectorAll('.video-card');
    if (!grid || !dots.length || !cards?.length) return;

    const updateDots = () => {
      const scrollLeft = grid.scrollLeft;
      let best = 0;
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].offsetLeft - scrollLeft < grid.offsetWidth / 2) best = i;
      }
      dots.forEach((d, i) => d.classList.toggle('active', i === best));
    };

    grid.addEventListener('scroll', updateDots);

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        const card = cards[i];
        if (card) grid.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
      });
    });
  });
}

function isMobileViewport() {
  return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
}

function getSectionBadge(video) {
  const s = video.seccion || 'general';
  const label = SECTION_LABELS[s] || s;
  return `<span class="video-badge">${escapeHtml(label)}</span>`;
}

function createVideoCard(video) {
  const src = video.src || video.url || '';
  const isLocal = video.plataforma === 'local' || /\.(mp4|webm|mov)(\?|$)/i.test(src) || (src && !/^https?:\/\//.test(src));
  const isTikTok = (video.url || '').includes('tiktok.com');
  const badge = getSectionBadge(video);

  // TikTok con src local: usar video autoplay en lugar de link
  if (isTikTok && video.src && /\.(mp4|webm|mov)(\?|$)/i.test(video.src)) {
    const srcEncoded = encodeURI(video.src);
    return `
      <div class="video-card stagger-item video-card-local">
        <div class="video-embed video-embed-local">
          ${badge}
          <video width="360" height="640" src="${escapeAttr(srcEncoded)}" loop muted playsinline webkit-playsinline autoplay preload="auto" title="${escapeAttr(video.titulo || 'Video')}" onerror="this.style.display='none';var n=this.nextElementSibling;if(n)n.style.display='flex';"></video>
          <span class="video-fallback" style="display:none;flex-direction:column;align-items:center;justify-content:center;position:absolute;inset:0;background:var(--card-hover);"><span class="video-play-symbol">▶</span><small style="margin-top:0.5rem;color:var(--text-muted);">Ver video</small></span>
        </div>
        <a href="${escapeAttr(video.url)}" target="_blank" rel="noopener" class="video-title video-title-link">${escapeHtml(video.titulo || 'Video')} ↗</a>
      </div>
    `;
  }

  // TikTok sin src local: embed con autoplay
  if (isTikTok && video.url) {
    const embedUrl = getEmbedUrl(video);
    if (embedUrl) {
      return `
        <div class="video-card stagger-item video-card-tiktok">
          <div class="video-embed video-embed-tiktok">
            ${badge}
            <iframe src="${escapeAttr(embedUrl)}" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="${escapeAttr(video.titulo || 'Video')}"></iframe>
          </div>
          <a href="${escapeAttr(video.url)}" target="_blank" rel="noopener" class="video-title video-title-link">${escapeHtml(video.titulo || 'Video')} ↗</a>
        </div>
      `;
    }
    return `
    <a href="${escapeAttr(video.url)}" target="_blank" rel="noopener" class="video-card stagger-item video-card-link">
      <div class="video-embed video-link-placeholder">
        ${badge}
        <span class="video-play-symbol" aria-hidden="true">▶</span>
      </div>
      <div class="video-title">${escapeHtml(video.titulo || 'Video')}</div>
    </a>
    `;
  }

  // Video local (MP4/WebM en assets/videos/)
  if (isLocal && src) {
    const srcEncoded = encodeURI(src);
    return `
      <div class="video-card stagger-item video-card-local">
        <div class="video-embed video-embed-local">
          ${badge}
          <video width="360" height="640" src="${escapeAttr(srcEncoded)}" loop muted playsinline webkit-playsinline autoplay preload="auto" title="${escapeAttr(video.titulo || 'Video')}" onerror="this.style.display='none';var n=this.nextElementSibling;if(n)n.style.display='flex';"></video>
          <span class="video-fallback" style="display:none;flex-direction:column;align-items:center;justify-content:center;position:absolute;inset:0;background:var(--card-hover);"><span class="video-play-symbol">▶</span><small style="margin-top:0.5rem;color:var(--text-muted);">Ver video</small></span>
        </div>
        <div class="video-title">${escapeHtml(video.titulo || 'Video')}</div>
      </div>
    `;
  }

  const embedUrl = getEmbedUrl(video);
  const isYoutube = (video.url || '').includes('youtube.com') || (video.url || '').includes('youtu.be');

  if (embedUrl) {
    const youtubeClass = isYoutube ? ' video-card-youtube' : '';
    return `
      <div class="video-card stagger-item${youtubeClass}">
        <div class="video-embed${isYoutube ? ' video-embed-youtube' : ''}">
          ${badge}
          <iframe src="${embedUrl}" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="${escapeAttr(video.titulo || 'Video')}"></iframe>
        </div>
        <div class="video-title">${escapeHtml(video.titulo || 'Video')}</div>
      </div>
    `;
  }

  return `
    <a href="${escapeAttr(video.url)}" target="_blank" rel="noopener" class="video-card video-card-link stagger-item">
      <div class="video-embed video-link-placeholder">
        ${badge}
        <span class="video-play-symbol" aria-hidden="true">▶</span>
      </div>
      <div class="video-title">${escapeHtml(video.titulo || 'Video')}</div>
    </a>
  `;
}

function getEmbedUrl(video) {
  const url = video.url || '';
  // YouTube: autoplay + mute (necesario para que el navegador permita autoplay)
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const id = url.match(/(?:youtu\.be\/|youtube\.com.*[?&]v=)([^&]+)/)?.[1];
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&playsinline=1` : null;
  }
  // TikTok: embed con autoplay (formato 9:16)
  if (url.includes('tiktok.com')) {
    const match = url.match(/video\/(\d+)/);
    return match ? `https://www.tiktok.com/embed/v2/${match[1]}?autoplay=1` : null;
  }
  return null;
}

function escapeHtml(s) {
  const d = document.createElement('div');
  d.textContent = s || '';
  return d.innerHTML;
}

function escapeAttr(s) {
  return escapeHtml(s).replace(/"/g, '&quot;');
}
