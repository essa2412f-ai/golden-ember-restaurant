(() => {
  const items = [...document.querySelectorAll('#homeGallery .gallery-item')];
  const lightbox = document.getElementById('lightbox');
  const image = document.getElementById('lightboxImage');
  if (!items.length || !lightbox || !image) return;

  let currentIndex = 0;

  const openLightbox = index => {
    currentIndex = index;
    const source = items[currentIndex].querySelector('img');
    image.src = source.src;
    image.alt = source.alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const move = direction => {
    currentIndex = (currentIndex + direction + items.length) % items.length;
    openLightbox(currentIndex);
  };

  items.forEach((item, index) => item.addEventListener('click', () => openLightbox(index)));
  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => move(-1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => move(1));

  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', event => {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') move(-1);
    if (event.key === 'ArrowRight') move(1);
  });
})();