/** Catalog + cart. The catalog is seeded locally so the template runs with no
 *  backend; point `load()` at your own /v1/commerce/products and the screens
 *  do not change — they only depend on the Product shape. */
import { useSyncExternalStore } from 'react';

export type Product = { id: string; name: string; price: number; blurb: string; hue: number };

export const products: Product[] = [
  { id: 'aero', name: 'Aero Bottle', price: 34, hue: 262, blurb: 'Vacuum steel, 24h cold, 700ml.' },
  { id: 'field', name: 'Field Tote', price: 88, hue: 200, blurb: 'Waxed canvas, leather handles.' },
  { id: 'lume', name: 'Lume Lamp', price: 149, hue: 34, blurb: 'Warm dimmable LED, USB-C.' },
  { id: 'terra', name: 'Terra Mug', price: 22, hue: 14, blurb: 'Stoneware, reactive glaze, 350ml.' },
  { id: 'kite', name: 'Kite Shell', price: 210, hue: 150, blurb: '3-layer waterproof, taped seams.' },
  { id: 'nova', name: 'Nova Deck', price: 65, hue: 300, blurb: '52 cards, foil edges, linen finish.' },
];

export const byId = (id: string) => products.find((p) => p.id === id);
export const money = (cents: number) => `$${cents.toFixed(0)}`;

// Minimal observable store — id → qty. No state library for one Record.
let cart: Record<string, number> = {};
const subs = new Set<() => void>();
const snap = () => cart;

export const useCart = () =>
  useSyncExternalStore((f) => (subs.add(f), () => subs.delete(f)), snap, snap);

export const add = (id: string, n = 1) => {
  const next = { ...cart, [id]: (cart[id] ?? 0) + n };
  if (next[id] <= 0) delete next[id];
  cart = next;
  subs.forEach((f) => f());
};

export const count = (c: Record<string, number>) =>
  Object.values(c).reduce((a, b) => a + b, 0);

export const total = (c: Record<string, number>) =>
  Object.entries(c).reduce((sum, [id, q]) => sum + (byId(id)?.price ?? 0) * q, 0);
