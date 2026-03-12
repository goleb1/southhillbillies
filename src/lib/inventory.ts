// ─────────────────────────────────────────────────────────────────────────────
// SOUTH HILLBILLIES MERCH INVENTORY
//
// Edit this file to update stock counts. No other files need to change.
//
// stock options:
//   number        → simple count with no sizing (e.g. bandana: 21)
//   'mto'         → made to order, no stock to track
//   ProductVariant[] → sized product; update per-size numbers for each cut
// ─────────────────────────────────────────────────────────────────────────────

export type SizeStock = Record<string, number | null>;

export type ProductVariant = {
  label: string;
  sizes: SizeStock;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  stock: number | 'mto' | ProductVariant[];
};

export const inventory: Product[] = [
  // ── Singlet v2 ─────────────────────────────────────────────────────────────
  {
    id: 'singlet-v2',
    name: 'Singlet v2',
    price: 70,
    image: '/img/singlet_v2.png',
    stock: [
      { label: "Men's",   sizes: { XS: 2, S: 2, M: 2, L: 3 } },
      { label: "Women's", sizes: { XS: 1, S: 2, M: 4, L: 1 } },
    ],
  },

  // ── T-Shirt ────────────────────────────────────────────────────────────────
  {
    id: 'tshirt',
    name: 'T-Shirt',
    price: 20,
    image: '/img/tshirt.png',
    stock: [
      { label: "Men's / Unisex", sizes: { XS: 5, S: 5, M: 4, L: 5, XL: 5 } },
      { label: "Women's Cut",    sizes: { XS: null, S: 3, M: null, L: 1, XL: null } },
    ],
  },

  // ── Crewneck ───────────────────────────────────────────────────────────────
  {
    id: 'crewneck',
    name: 'Crewneck',
    price: 35,
    image: '/img/crewneck.png',
    description: 'Cozy grey crewneck (unisex sizing).',
    stock: 'mto',
  },

  // ── Beanie ─────────────────────────────────────────────────────────────────
  {
    id: 'beanie',
    name: 'Beanie',
    price: 20,
    image: '/img/beanie.png',
    description: 'Grey, blue, or gold beanie.',
    stock: 'mto',
  },

  // ── Bandana ────────────────────────────────────────────────────────────────
  {
    id: 'bandana',
    name: 'Bandana',
    price: 5,
    image: '/img/bandana.png',
    description: 'Lightweight 22"x22" bandana bearing all things SHB.',
    stock: 21,
  },

  // ── Koozie ─────────────────────────────────────────────────────────────────
  {
    id: 'koozie',
    name: 'Koozie',
    price: 5,
    image: '/img/koozie.png',
    description: 'Neoprene koozie to keep your drinks cold and/or your hands warm.',
    stock: 14,
  },

  // ── Big Patch ──────────────────────────────────────────────────────────────
  {
    id: 'big-patch',
    name: 'Big Patch',
    price: 3,
    image: '/img/bigPatch.png',
    description: 'Embroidered 2.5" sew-on patch.',
    stock: 90,
  },

  // ── Small Patch ────────────────────────────────────────────────────────────
  {
    id: 'small-patch',
    name: 'Small Patch',
    price: 3,
    image: '/img/smallPatch.png',
    description: 'Embroidered 1.5" sew-on patch.',
    stock: 58,
  },

  // ── Sticker ────────────────────────────────────────────────────────────────
  {
    id: 'sticker',
    name: 'Sticker',
    price: 1,
    image: '/img/sticker.png',
    description: '3" vinyl sticker.',
    stock: 24,
  },
];
