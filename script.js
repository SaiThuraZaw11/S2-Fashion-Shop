/* =====================================================
   S2 FASHION — site logic
   Reads products.json and renders everything below.
   To add a new item: edit products.json + add an image
   to /images, then push to GitHub. No other file needed.
   ===================================================== */

let PRODUCTS = [];
let activeCategory = "All";

const newRail   = document.getElementById("new-arrivals-rail");
const filtersEl = document.getElementById("filters");
const gridEl    = document.getElementById("catalog-grid");

/* ---------- contact link builders ---------- */
function telegramLink(text){
  const base = `https://t.me/${CONTACT_CONFIG.telegramUsername}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
function messengerLink(text){
  const base = `https://m.me/${CONTACT_CONFIG.messengerUsername}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
function viberLink(){
  return `viber://chat?number=%2B${CONTACT_CONFIG.viberNumber}`;
}

/* ---------- render: New Arrivals rail ---------- */
function renderNewArrivals(){
  const items = PRODUCTS.filter(p => p.new);
  newRail.innerHTML = items.map(cardHTML).join("") ||
    `<p style="color:var(--muted)">လောလောဆယ် New Arrival မရှိသေးပါ — products.json ထဲမှာ "new": true ဖြင့် ထည့်ပါ။</p>`;
  attachCardEvents(newRail);
}

/* ---------- render: filters ---------- */
function renderFilters(){
  const cats = ["All", ...new Set(PRODUCTS.map(p => p.category))];
  filtersEl.innerHTML = cats.map(c =>
    `<button class="filter-btn ${c === activeCategory ? "active" : ""}" data-cat="${c}">${c}</button>`
  ).join("");
  filtersEl.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.cat;
      renderFilters();
      renderGrid();
    });
  });
}

/* ---------- render: catalog grid ---------- */
function renderGrid(){
  const items = activeCategory === "All"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);
  gridEl.innerHTML = items.map(cardHTML).join("");
  attachCardEvents(gridEl);
}

function cardHTML(p){
  return `
    <div class="card" data-id="${p.id}">
      ${p.new ? '<span class="badge">New</span>' : ""}
      <img class="thumb" src="${p.image}" alt="${p.name}"
           onerror="this.src='https://placehold.co/400x520/1D1811/C9A45C?text=S2+Fashion'">
      <div class="info">
        <p class="cat">${p.category}</p>
        <p class="name">${p.name}</p>
        <p class="price">${p.price}</p>
      </div>
    </div>`;
}

function attachCardEvents(container){
  container.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => openModal(card.dataset.id));
  });
}

/* ---------- modal ---------- */
const modal       = document.getElementById("modal");
const modalImg    = document.getElementById("modal-img");
const modalCat    = document.getElementById("modal-cat");
const modalName   = document.getElementById("modal-name");
const modalDesc   = document.getElementById("modal-desc");
const modalPrice  = document.getElementById("modal-price");
const modalActions= document.getElementById("modal-actions");

function openModal(id){
  const p = PRODUCTS.find(x => x.id === id);
  if(!p) return;
  modalImg.src = p.image;
  modalImg.onerror = () => { modalImg.src = "https://placehold.co/400x500/1D1811/C9A45C?text=S2+Fashion"; };
  modalCat.textContent = p.category;
  modalName.textContent = p.name;
  modalDesc.textContent = p.description || "";
  modalPrice.textContent = p.price;
  const msg = `Hi S2 Fashion, ဒီပစ္စည်းကို စိတ်ဝင်စားပါတယ် — ${p.name} (${p.id})`;
  modalActions.innerHTML = `
    <a href="${viberLink()}" target="_blank" rel="noopener">Viber</a>
    <a href="${messengerLink(msg)}" target="_blank" rel="noopener">Messenger</a>
    <a href="${telegramLink(msg)}" target="_blank" rel="noopener">Telegram</a>
  `;
  modal.hidden = false;
}
document.getElementById("modal-close").addEventListener("click", () => modal.hidden = true);
modal.addEventListener("click", e => { if(e.target === modal) modal.hidden = true; });

/* ---------- general contact section links ---------- */
document.getElementById("contact-viber").href = viberLink();
document.getElementById("contact-messenger").href = messengerLink();
document.getElementById("contact-telegram").href = telegramLink();

/* ---------- footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- boot ---------- */
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    PRODUCTS = data;
    renderNewArrivals();
    renderFilters();
    renderGrid();
  })
  .catch(() => {
    newRail.innerHTML = `<p style="color:var(--muted)">products.json ကို ဖတ်မရပါ — file path ကို စစ်ဆေးပါ။</p>`;
  });
