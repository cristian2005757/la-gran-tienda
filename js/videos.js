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

  if (embedUrl) {
    return `
      <div class="video-card stagger-item">
        <div class="video-embed">
          <iframe src="${embedUrl}" allowfullscreen title="${escapeAttr(video.titulo || 'Video')}"></iframe>
        </div>
        <div class="video-title">${escapeHtml(video.titulo || 'Video')}</div>
      </div>
    `;
  }

  return `
    <div class="video-card stagger-item">
      <div class="video-embed video-link-placeholder">
        <span>${escapeHtml(video.titulo || 'Ver video')}</span>
        <small>${escapeHtml(video.plataforma || '')}</small>
        <a href="${escapeAttr(video.url)}" target="_blank" rel="noopener" class="btn btn-primary btn-sm" style="margin-top:0.75rem;">Ver</a>
      </div>
      <div class="video-title">${escapeHtml(video.titulo || 'Video')}</div>
    </div>
  `;
}

function getEmbedUrl(video) {
  const url = video.url || '';
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const id = url.match(/(?:youtu\.be\/|youtube\.com.*[?&]v=)([^&]+)/)?.[1];
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }
  if (url.includes('tiktok.com')) {
    const match = url.match(/video\/(\d+)/);
    return match ? `https://www.tiktok.com/embed/v2/${match[1]}` : null;
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
