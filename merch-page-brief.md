# South Hillbillies Merch Page — Claude Code Brief

## Overview

Add a `/merch` page to **southhillbillies.com** and retire the separate **southhillbillies.xyz** Universe site. No payment processing needed — this is a static catalog + order request form for ~20 club members who pay via Venmo.

**Stack:** Existing site on Vercel. Match whatever framework/conventions are already in use.

---

## Brand

- **Primary blue:** `#324E80`
- **Light blue:** `#B1CDFF`
- **Mid blue:** `#7195CD`
- **Earth tone:** `#A09376`
- **Tone:** Casual, slightly irreverent, friends-buying-stuff-from-a-friend energy. Not a store — a catalog.
- Logo/goat mascot assets are already in the repo.

---

## Product Images

All product images are in `/IMG/` at the project root. Use them for the product cards.

---

## Inventory

### Singlet v2 — $70
Gendered sizing. Show men's and women's options with per-size stock.

| Cut | XS | S | M | L |
|---|---|---|---|---|
| Men's | 2 | 2 | 2 | 3 |
| Women's | 1 | 2 | 4 | 1 |

### T-Shirt — $20
Two cuts. Show per-size stock.

| Cut | XS | S | M | L | XL |
|---|---|---|---|---|---|
| Men's/Unisex | 5 | 5 | 4 | 5 | 5 |
| Women's Cut | — | 3 | — | 1 | — |

### Bandana — $5
No sizing. **21 in stock.**

### Koozie — $5
No sizing. **14 in stock.**

### Sticker — $1
No sizing. **24 in stock.**

### Small Patch — $3
Embroidered iron-on/sew-on patch. **58 in stock.**

### Big Patch — $3
Embroidered iron-on/sew-on patch. **90 in stock.**

### Beanie — $20
**Made to order.** No stock to track. The blank beanie is ordered and a patch is sewn on.

### Crewneck — $35
**Made to order.** No stock to track. Same deal — blank ordered, patch applied.

---

## Patch + Stitching Note (important for UX copy)

The Small and Big Patches are sold as standalone patches. **We also offer a patch-sewing service** — if someone wants a patch sewn onto their own item (or onto a made-to-order Beanie/Crewneck), James can do that. This should be noted somewhere on the page, either in the patch product descriptions or in an FAQ/note section. Keep the copy casual: something like "Got something you want a patch on? We can sew it for you — just ask."

---

## Page Functionality

### Product Grid
- Cards for each item with: product image, name, price, stock status
- For items with sizing/cuts, show a simple size selector or size breakdown (don't need a full variant picker — even a clean table or tagged list works)
- Stock display logic:
  - Show exact count if low (≤5): *"2 left"*
  - Show "In Stock" if plenty
  - Show "Made to Order" for Beanie and Crewneck
  - Show "Sold Out" if 0

### Order Request Form
No payment. Collect:
- Name
- Item(s) wanted + size/cut if applicable
- Any notes (e.g. "I want a patch sewn on my crewneck")
- A friendly reminder like: *"James will reach out to confirm and you can Venmo him then."*

Form submission options (pick cleanest for the stack):
- Formspree or similar (no backend needed)
- Google Form embed
- Simple mailto link as fallback

### Navigation
Add a **Merch** link to the main site nav pointing to `/merch`.

---

## What NOT to Build

- No cart
- No checkout
- No payment processing
- No user accounts
- No automated inventory decrement (James updates the inventory data manually)

---

## Inventory Management

Inventory counts should live in a simple data file (e.g. a JS/TS object, JSON file, or similar — whatever fits the existing project structure) so James can update numbers without touching component code. Make it obvious where to edit.

---

## Nice to Have (Post-MVP)

- Visual "Low Stock" badge on items with ≤3 remaining
- Anchor links from nav directly to product sections if the page gets long
