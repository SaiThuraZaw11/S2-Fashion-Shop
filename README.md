# S2 Fashion — Showcase Website

Gold-theme, showcase-only clothing site. No cart, no checkout — customers
browse and then message you directly on **Viber, Messenger, or Telegram**.

## Files

| File | What it's for |
|---|---|
| `index.html` | Page structure — you shouldn't need to touch this |
| `style.css` | Gold theme colors/fonts — edit if you want a different look |
| `config.js` | **Your Viber number / Messenger username / Telegram username** |
| `products.json` | **Your product list — this is what you edit every time you add stock** |
| `script.js` | Reads products.json and builds the page — don't need to touch this |
| `images/` | Put your product photos here |

## 1. First-time setup

1. Open `config.js` and replace the three placeholder values with your real
   Viber number, Facebook Page username, and Telegram username.
2. Add your product photos into the `images/` folder (jpg or png, portrait
   photos ~3:4 ratio look best).
3. Open `products.json` and edit the list to match your real products
   (see "Adding a new product" below).

## 2. Uploading to GitHub

1. Create a new repository on GitHub (e.g. `s2-fashion`).
2. Upload all these files (keeping the `images/` folder) — either drag-and-drop
   on the GitHub website ("Add file → Upload files"), or via git:
   ```bash
   git init
   git add .
   git commit -m "S2 Fashion website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/s2-fashion.git
   git push -u origin main
   ```
3. Turn on **GitHub Pages**: repo → Settings → Pages → Source: `main` branch,
   `/root` folder → Save. GitHub gives you a live URL in a minute or two, like:
   `https://YOUR-USERNAME.github.io/s2-fashion/`

## 3. Adding a new product (your regular workflow)

1. Add the photo to `images/`, e.g. `images/sp007.jpg`.
2. Open `products.json` and add a new entry at the top of the list:
   ```json
   {
     "id": "sp007",
     "name": "New Item Name",
     "category": "Dress",
     "price": "35,000 Ks",
     "image": "images/sp007.jpg",
     "new": true,
     "description": "Short description of the item."
   }
   ```
3. For older items that are no longer "new," change `"new": true` to
   `"new": false` so they drop out of the New Arrivals row but stay in the
   Catalog.
4. Commit and push the change on GitHub — the live site updates automatically
   within a minute, no rebuild step needed.

## Notes

- `category` can be anything you like (`Dress`, `Top`, `Bottom`, `Outerwear`,
  `Accessory`...) — the filter buttons at the top of the Catalog are built
  automatically from whatever categories appear in `products.json`.
- If a photo is missing or misnamed, the site shows a placeholder instead of
  breaking, so a typo in `products.json` won't crash the page.
- This site never asks for payment info — it only opens a chat app with a
  pre-filled message naming the product, then the conversation continues
  on Viber/Messenger/Telegram like normal.
