/**
 * La Gran Tienda - Videos
 * Links a Reels/YouTube/TikTok. Embeds cuando sea posible, sino tarjeta + botón Ver
 */

document.addEventListener('DOMContentLoaded', async () => {
  await loadAndRenderVideos();
});

async function loadAndRenderVideos() {
  const container = document.getElementById('videos-container');
  if (!container) return;

  try {
    const res = await fetch('data/videos.json');
    const videos = await res.json();

    if (!videos.length) {
      container.innerHTML = '<p style="text-align:center;color:var(--text-muted);">Próximamente más videos.</p>';
      return;
    }

    container.innerHTML = videos.map(v => createVideoCard(v)).join('');
    const section = container.closest('.animate-on-scroll');
    if (section?.classList.contains('visible')) {
      container.querySelectorAll('.stagger-item').forEach((item, i) => {
        item.style.animationDelay = `${i * 50}ms`;
      });
    }
  } catch (err) {
    container.innerHTML = '<p style="text-align:center;color:var(--text-muted);">No se pudieron cargar los videos.</p>';
  }
}

function createVideoCard(video) {
  const embedUrl = getEmbedUrl(video);
  const isYoutube = (video.url || '').includes('youtube.com') || (video.url || '').includes('youtu.be');

  if (embedUrl) {
    const youtubeClass = isYoutube ? ' video-card-youtube' : '';
    return `
      <div class="video-card stagger-item${youtubeClass}">
        <div class="video-embed${isYoutube ? ' video-embed-youtube' : ''}">
          <iframe src="${embedUrl}" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="${escapeAttr(video.titulo || 'Video')}"></iframe>
        </div>
        <div class="video-title">${escapeHtml(video.titulo || 'Video')}</div>
      </div>
    `;
  }

  return `
    <a href="${escapeAttr(video.url)}" target="_blank" rel="noopener" class="video-card video-card-link stagger-item">
      <div class="video-embed video-link-placeholder">
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
  // TikTok: URL completa con video ID numérico
  if (url.includes('tiktok.com')) {
    const match = url.match(/video\/(\d+)/);
    if (match) return `https://www.tiktok.com/embed/v2/${match[1]}?autoplay=1`;
  }
  // vt.tiktok.com: no tiene ID numérico, el embed requiere URL completa tiktok.com/@user/video/ID
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
