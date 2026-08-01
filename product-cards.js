(() => {
  const openProduct = card => {
    const id=card.dataset.product;
    if(!id) return;
    const prefix=location.pathname.includes('/pages/') ? '' : 'pages/';
    location.href=`${prefix}product.html?id=${encodeURIComponent(id)}`;
  };
  document.querySelectorAll('[data-product]').forEach(card=>{
    card.classList.add('is-clickable');
    card.addEventListener('click',event=>{if(event.target.closest('a,button')) return;openProduct(card);});
    card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();openProduct(card);}});
  });
})();
