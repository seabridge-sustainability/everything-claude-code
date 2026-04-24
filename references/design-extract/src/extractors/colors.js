import { parseColor, rgbToHex, rgbToHsl, clusterColors, isSaturated, colorDistance } from '../utils.js';

const INTERACTIVE_TAGS = new Set(['a', 'button']);
const INTERACTIVE_ROLES = new Set(['button', 'link', 'menuitem', 'tab']);
const INTERACTIVE_CLASS_RE = /\b(btn|button|cta|primary|action)\b/i;

function isInteractive(el) {
  if (!el) return false;
  if (INTERACTIVE_TAGS.has(el.tag)) return true;
  if (el.role && INTERACTIVE_ROLES.has(el.role)) return true;
  if (el.classList && INTERACTIVE_CLASS_RE.test(el.classList)) return true;
  return false;
}

export function extractColors(computedStyles) {
  const colorMap = new Map(); // hex -> { hex, parsed, count, contexts: Set, interactiveBg: number }

  function addColor(value, context, { interactive = false } = {}) {
    const parsed = parseColor(value);
    if (!parsed || parsed.a === 0) return;
    const hex = rgbToHex(parsed);
    if (!colorMap.has(hex)) {
      colorMap.set(hex, { hex, parsed, count: 0, contexts: new Set(), interactiveBg: 0 });
    }
    const entry = colorMap.get(hex);
    entry.count++;
    entry.contexts.add(context);
    if (interactive && context === 'background') entry.interactiveBg++;
  }

  const gradients = new Set();

  for (const el of computedStyles) {
    const interactive = isInteractive(el);
    addColor(el.color, 'text');
    addColor(el.backgroundColor, 'background', { interactive });
    addColor(el.borderColor, 'border');

    if (el.backgroundImage && el.backgroundImage !== 'none' && el.backgroundImage.includes('gradient')) {
      gradients.add(el.backgroundImage);
    }
  }

  const allColors = Array.from(colorMap.values());
  const clusters = clusterColors(allColors, 15);

  // Aggregate interactive-bg score per cluster (sum across members)
  for (const cluster of clusters) {
    cluster.interactiveBg = cluster.members.reduce((s, m) => s + (m.interactiveBg || 0), 0);
    const { s: sat, l: lit } = rgbToHsl(cluster.representative);
    cluster.saturation = sat;
    cluster.lightness = lit;
  }

  // Classify roles — tighten chromatic threshold so pale grays (hsl sat < 25) don't qualify
  const neutrals = [];
  const chromatic = [];

  for (const cluster of clusters) {
    const chromaticEnough = cluster.saturation > 25 && cluster.lightness > 5 && cluster.lightness < 95;
    if (chromaticEnough || (isSaturated(cluster.representative) && cluster.interactiveBg > 0)) {
      chromatic.push(cluster);
    } else {
      neutrals.push(cluster);
    }
  }

  // Background colors: found on large-area elements
  const bgColors = [];
  for (const el of computedStyles) {
    if (el.area > 50000) {
      const parsed = parseColor(el.backgroundColor);
      if (parsed && parsed.a > 0) bgColors.push(rgbToHex(parsed));
    }
  }

  // Text colors: from color property
  const textColors = [];
  for (const el of computedStyles) {
    const parsed = parseColor(el.color);
    if (parsed && parsed.a > 0) {
      const hex = rgbToHex(parsed);
      if (!textColors.includes(hex)) textColors.push(hex);
    }
  }

  // Rank chromatic clusters by brand-likelihood:
  //   interactiveBg carries the most signal (it's a CTA color)
  //   saturation comes next (brand colors are usually punchy)
  //   raw usage count is a weak tiebreaker (avoids neutral-heavy sites dominating)
  function brandScore(c) {
    return c.interactiveBg * 100 + c.saturation * 2 + Math.log10(Math.max(1, c.count));
  }
  const ranked = [...chromatic].sort((a, b) => brandScore(b) - brandScore(a));

  const primary = ranked[0] || null;
  // secondary: distinct hue from primary
  const secondary = ranked.find(c => {
    if (!primary || c === primary) return false;
    return colorDistance(c.representative, primary.representative) > 60;
  }) || ranked[1] || null;
  // accent: sparse chromatic, prefers background context
  const accent = ranked.find(c => {
    if (c === primary || c === secondary) return false;
    const pct = c.count / Math.max(1, allColors.reduce((s, a) => s + a.count, 0));
    return pct < 0.05 && c.members.some(m => m.contexts.has('background'));
  }) || ranked.find(c => c !== primary && c !== secondary) || null;

  return {
    primary: primary ? { hex: primary.hex, rgb: primary.representative, hsl: rgbToHsl(primary.representative), count: primary.count } : null,
    secondary: secondary ? { hex: secondary.hex, rgb: secondary.representative, hsl: rgbToHsl(secondary.representative), count: secondary.count } : null,
    accent: accent ? { hex: accent.hex, rgb: accent.representative, hsl: rgbToHsl(accent.representative), count: accent.count } : null,
    neutrals: neutrals.map(c => ({ hex: c.hex, rgb: c.representative, hsl: rgbToHsl(c.representative), count: c.count })),
    backgrounds: [...new Set(bgColors)],
    text: textColors.slice(0, 10),
    gradients: [...gradients],
    all: clusters.map(c => ({
      hex: c.hex,
      rgb: c.representative,
      hsl: rgbToHsl(c.representative),
      count: c.count,
      contexts: [...new Set(c.members.flatMap(m => [...m.contexts]))],
    })),
  };
}
