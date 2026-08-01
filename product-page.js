(() => {
  const products=window.GOLDEN_EMBER_PRODUCTS||{};
  const id=new URLSearchParams(location.search).get('id');
  const product=products[id]||Object.values(products)[0];
  if(!product) return;
  document.title=`${product.name} | Golden Ember`;
  const set=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=value;};
  const image=document.getElementById('productImage'); image.src=product.image; image.alt=product.name;
  set('productCategory',product.category);set('productName',product.name);set('productDescription',product.desc);set('productPrice',`$${product.price}`);set('productRating',`${product.rating} / 5`);set('productReviews',`${product.reviews}+`);set('productPrep',product.prep);set('productCalories',product.calories);set('productDetails',product.details);
  const full=Math.floor(product.rating);const half=product.rating-full>=.5;document.getElementById('productStars').innerHTML=`<span>${'★'.repeat(full)}${half?'★':''}${'☆'.repeat(5-full-(half?1:0))}</span><b>${product.rating}</b><small>(${product.reviews} reviews)</small>`;
  const related=Object.entries(products).filter(([key,p])=>key!==id).sort((a,b)=>Number(b[1].category===product.category)-Number(a[1].category===product.category)).slice(0,4);
  document.getElementById('relatedGrid').innerHTML=related.map(([key,p])=>`<a class="related-card reveal" href="product.html?id=${encodeURIComponent(key)}"><div class="related-image"><img src="${p.image}" alt="${p.name}" loading="lazy"><span>${p.category}</span></div><div class="related-body"><div><h3>${p.name}</h3><strong>$${p.price}</strong></div><p>${p.desc}</p><div class="related-meta"><span>★ ${p.rating}</span><span>${p.reviews} reviews</span></div></div></a>`).join('');
  document.querySelectorAll('.related-card').forEach(el=>requestAnimationFrame(()=>el.classList.add('visible')));
})();
