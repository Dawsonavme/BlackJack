import * as CardTypes from "./cardTypes.js";

const cache = new Map();

export async function loadCard(size, rank, suit, base = "/Assets/Cards Pack/PNG") {
  const cardSize = `${size}`
  const key = `${suit} ${rank}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const img = new Image();
  img.decoding = "async";
  img.src = `${base}/${cardSize}/${key}.png`;
  await img.decode();
  cache.set(key, img);
  return img;
}

export async function preloadAll(size, base = "/Assets/Cards Pack/PNG") {
  await Promise.all(
    CardTypes.CardConfig.suits.flatMap(s => CardTypes.CardConfig.ranks.map(r => loadCard(size, r, s, base)))
  );
}