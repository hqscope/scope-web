/**
 * Deterministic pseudo-random number generation for the office simulation.
 *
 * Every value the simulation needs comes from here, so a given seed always
 * produces the same office. No `Math.random`, no `Date.now` — the engine has
 * to be replayable on the server and in the browser.
 */

export type Rng = () => number;

/** mulberry32 — small, fast, good enough distribution for scenery. */
export function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return function next(): number {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Uniform float in [min, max). */
export function rangeFloat(rng: Rng, min: number, max: number): number {
  return min + rng() * (max - min);
}

/** Uniform integer in [min, max]. */
export function rangeInt(rng: Rng, min: number, max: number): number {
  return Math.floor(min + rng() * (max - min + 1));
}

/** Uniform choice. Callers guarantee a non-empty list. */
export function pick<T>(rng: Rng, items: readonly T[]): T {
  return items[Math.floor(rng() * items.length) % items.length];
}

export interface WeightedOption<T> {
  readonly value: T;
  readonly weight: number;
}

/** Weighted choice. Weights need not sum to 1. */
export function pickWeighted<T>(
  rng: Rng,
  options: readonly WeightedOption<T>[],
): T {
  let total = 0;
  for (const option of options) total += option.weight;
  let roll = rng() * total;
  for (const option of options) {
    roll -= option.weight;
    if (roll <= 0) return option.value;
  }
  return options[options.length - 1].value;
}
