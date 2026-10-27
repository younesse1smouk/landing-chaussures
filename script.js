(() => {
  const C = CONFIG, P = C.product, cur = C.price.currency;
  const $ = s => document.querySelector(s);
  const money = n => `${n} ${cur}`;
  const state = { size: "", color: P.colors[0]?.name || "", img: 0 };
  const el = (tag, props = {}, text) => Object.assign(document.createElement(tag), props, text !== undefined ? { textContent: text } : {});

  // Textes de base et SEO
  document.title = `${P.name} | ${C.brand}`;
  document.querySelector('meta[name=description]').content = `${P.name} : ${P.tagline}. ${money(C.price.current)}, livraison au Maroc, commande par WhatsApp.`;
  document.querySelector('meta[property="og:title"]').content = document.title;
  const base = C.siteUrl ? C.siteUrl.replace(/\/$/, "") + "/" : "";
  document.querySelector('meta[property="og:image"]').content = base + P.images[0].src;
  $("#brand").textContent = $("#foot-brand").textContent = C.brand;
  $("#year").textContent = new Date().getFullYear();
  $("#p-name").textContent = P.name;
  $("#p-tagline").textContent = P.tagline;
  $("#p-desc").textContent = P.description;
  $("#p-price").textContent = money(C.price.current);
  if (C.price.old && C.price.old > C.price.current) { const o = $("#p-old"); o.hidden = false; o.textContent = money(C.price.old); }

  // Données structurées Google
  const ld = el("script", { type: "application/ld+json" });
  ld.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: P.name, description: P.description,
    image: P.images.map(i => base + i.src), offers: { "@type": "Offer", price: C.price.current, priceCurrency: "MAD", availability: "https://schema.org/InStock" } });
  document.head.append(ld);

  // Galerie
  const hero = $("#hero-img"), main = $("#main-img"), thumbs = $("#thumbs");
  hero.src = P.images[0].src; hero.alt = P.images[0].alt;
  function showImg(i) {
    state.img = i; main.src = P.images[i].src; main.alt = P.images[i].alt;
    thumbs.querySelectorAll("button").forEach((b, k) => b.setAttribute("aria-current", k === i));
  }
  P.images.forEach((im, i) => {
    const b = el("button", { type: "button", ariaLabel: `Voir la photo ${i + 1}` });
    b.append(el("img", { src: im.src, alt: "", loading: "lazy", width: 200, height: 200 }));
    b.onclick = () => showImg(i); thumbs.append(b);
  });
  showImg(0);

  // Caractéristiques
  P.features.forEach(f => $("#p-features").append(el("li", {}, f)));
  if (!P.features.length) $("#p-features").hidden = true;

  // Couleurs
  if (P.colors.length) {
    $("#color-box").hidden = false; $("#f-color-wrap").hidden = false;
    const sel = document.querySelector("[name=color]");
    const setColor = n => { state.color = n; $("#color-name").textContent = n; sel.value = n;
      $("#colors").querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b.title === n)); };
    P.colors.forEach(c => {
      const b = el("button", { type: "button", className: "chip swatch", title: c.name, ariaLabel: c.name });
      b.style.background = c.hex; b.onclick = () => setColor(c.name); $("#colors").append(b);
      sel.append(el("option", { value: c.name }, c.name));
    });
    sel.onchange = () => setColor(sel.value); setColor(state.color);
  }

  // Tailles (boutons + liste du formulaire synchronisés)
  const fSize = $("#f-size");
  fSize.append(el("option", { value: "" }, "Choisir"));
  const setSize = s => { state.size = String(s); fSize.value = state.size;
    $("#sizes").querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b.textContent === state.size)); };
  P.sizes.forEach(({ size, available }) => {
    const b = el("button", { type: "button", className: "chip", disabled: !available }, String(size));
    b.setAttribute("aria-pressed", "false"); b.onclick = () => setSize(size); $("#sizes").append(b);
    if (available) fSize.append(el("option", { value: String(size) }, String(size)));
  });
  fSize.onchange = () => setSize(fSize.value);

  // Livraison
  const D = C.delivery, city = document.querySelector("[name=city]");
  city.append(el("option", { value: "" }, "Choisir"));
  D.zones.forEach(z => {
    const d = el("div", { className: "zone" }); d.append(el("strong", {}, z.name), el("span", {}, `${z.fee === 0 ? "Gratuite" : money(z.fee)} · ${z.delay}`));
    $("#zones").append(d); city.append(el("option", { value: z.name }, z.name));
  });
  $("#cod").textContent = [D.cashOnDelivery ? "Paiement à la livraison disponible." : "", D.freeFrom ? `Livraison offerte dès ${money(D.freeFrom)}.` : ""].join(" ").trim();

  // Total
  const form = $("#order-form");
  function totals() {
    const qty = Math.max(1, parseInt(form.qty.value) || 1), z = D.zones.find(z => z.name === city.value);
    const sub = C.price.current * qty;
    const fee = !z ? null : (D.freeFrom && sub >= D.freeFrom ? 0 : z.fee);
    return { qty, sub, fee, z, total: fee === null ? null : sub + fee };
  }
  function renderTotal() {
    const t = totals();
    $("#total").textContent = t.fee === null ? `Sous-total : ${money(t.sub)} (livraison selon la ville)` : `Total : ${money(t.total)} (livraison ${money(t.fee)} incluse)`;
  }
  form.addEventListener("input", renderTotal); renderTotal();

  // Commande WhatsApp
  form.addEventListener("submit", e => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(form)), t = totals(), err = $("#error");
    const phone = f.phone.replace(/[\s.\-]/g, "");
    const problem = !f.name.trim() ? "Indiquez votre nom complet."
      : !/^(\+212|0)[5-7]\d{8}$/.test(phone) ? "Numéro de téléphone invalide (ex. 06 00 00 00 00)."
      : !f.city ? "Choisissez votre ville."
      : !f.address.trim() ? "Indiquez votre adresse de livraison."
      : !f.size ? "Choisissez votre taille." : "";
    err.textContent = problem; if (problem) return;
    const msg = [`Bonjour, je souhaite commander :`, ``, `Produit : ${P.name}`,
      f.color ? `Couleur : ${f.color}` : null, `Taille : ${f.size}`, `Quantité : ${t.qty}`,
      `Prix : ${money(C.price.current)} x ${t.qty} = ${money(t.sub)}`, `Livraison : ${money(t.fee)}`, `Total : ${money(t.total)}`,
      D.cashOnDelivery ? `Paiement : à la livraison` : null, ``,
      `Nom : ${f.name.trim()}`, `Téléphone : ${f.phone.trim()}`, `Ville : ${f.city}`, `Adresse : ${f.address.trim()}`].filter(x => x !== null).join("\n");
    const url = `https://wa.me/${C.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener") || (location.href = url);
  });

  // Confiance
  C.reviews.forEach(r => { const q = el("blockquote", {}, r.text); q.append(el("footer", {}, `${r.name}${r.city ? ", " + r.city : ""}`)); $("#reviews").append(q); });
  if (!C.reviews.length) $("#reviews").hidden = true;
  $("#returns").textContent = C.returnPolicy; $("#returns").hidden = !C.returnPolicy;
  const ct = C.contact; $("#contact").textContent = [ct.phone, ct.city, ct.hours].filter(Boolean).join(" · ");
  $("#wa-float").href = `https://wa.me/${C.whatsappNumber}?text=${encodeURIComponent(`Bonjour, je suis intéressé par : ${P.name}`)}`;

  // Partage Facebook
  $("#share").onclick = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(C.siteUrl || location.href)}`, "_blank", "noopener,width=600,height=500");
})();
