(() => {
  const search=document.getElementById('menuSearch');
  const buttons=[...document.querySelectorAll('[data-filter]')];
  const cards=[...document.querySelectorAll('.menu-card')];
  if(!search || !cards.length) return;
  let active='All';
  function renderMenu(){
    const q=search.value.toLowerCase().trim(); let shown=0;
    cards.forEach(card=>{const ok=(active==='All'||card.dataset.category===active)&&card.dataset.name.includes(q);card.style.display=ok?'block':'none';if(ok)shown++;});
    const empty=document.getElementById('noMenuResult'); if(empty) empty.style.display=shown?'none':'block';
  }
  buttons.forEach(btn=>btn.addEventListener('click',()=>{buttons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');active=btn.dataset.filter;renderMenu();}));
  search.addEventListener('input',renderMenu);
})();
