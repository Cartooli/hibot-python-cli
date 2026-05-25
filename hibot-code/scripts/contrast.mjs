/**
 * WCAG 2.x relative-luminance contrast utilities.
 * Used by CI audit and mirrored in editor.html buildHTML.
 */

const LIGHT_TEXT = '#ffffff';
const DARK_TEXT = '#0a0f1a';

export function parseColor(input) {
  if (!input || typeof input !== 'string') return null;
  const s = input.trim();
  let m = s.match(/^#([0-9a-f]{3,8})$/i);
  if (m) {
    let h = m[1];
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    if (h.length === 6) {
      return {
        r: parseInt(h.slice(0, 2), 16),
        g: parseInt(h.slice(2, 4), 16),
        b: parseInt(h.slice(4, 6), 16),
      };
    }
  }
  m = s.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
  if (m) {
    return { r: +m[1], g: +m[2], b: +m[3] };
  }
  return null;
}

export function toHex({ r, g, b }) {
  return (
    '#' +
    [r, g, b]
      .map((v) =>
        Math.round(Math.max(0, Math.min(255, v)))
          .toString(16)
          .padStart(2, '0')
      )
      .join('')
  );
}

export function relativeLuminance(rgb) {
  const [rs, gs, bs] = [rgb.r, rgb.g, rgb.b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function contrastRatio(fg, bg) {
  const fgRgb = parseColor(fg);
  const bgRgb = parseColor(bg);
  if (!fgRgb || !bgRgb) return 0;
  const L1 = relativeLuminance(fgRgb);
  const L2 = relativeLuminance(bgRgb);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function mixHex(fg, bg, t) {
  const a = parseColor(fg);
  const b = parseColor(bg);
  if (!a || !b) return fg;
  return toHex({
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  });
}

/** Pick #fff or #0a0f1a whichever reads better on bg. */
export function pickReadableText(bg, light = LIGHT_TEXT, dark = DARK_TEXT) {
  const cl = contrastRatio(light, bg);
  const cd = contrastRatio(dark, bg);
  return cl >= cd ? light : dark;
}

/**
 * Nudge fg toward black or white until contrast with bg meets minRatio.
 * Returns the adjusted color closest to the original fg.
 */
export function ensureContrast(fg, bg, minRatio) {
  if (contrastRatio(fg, bg) >= minRatio) return fg;
  const towardBlack = ensureContrastDirection(fg, bg, minRatio, '#000000');
  const towardWhite = ensureContrastDirection(fg, bg, minRatio, '#ffffff');
  const blackOk = contrastRatio(towardBlack, bg) >= minRatio;
  const whiteOk = contrastRatio(towardWhite, bg) >= minRatio;
  if (blackOk && whiteOk) {
    return colorDistance(fg, towardBlack) <= colorDistance(fg, towardWhite)
      ? towardBlack
      : towardWhite;
  }
  if (blackOk) return towardBlack;
  if (whiteOk) return towardWhite;
  return contrastRatio(towardBlack, bg) >= contrastRatio(towardWhite, bg)
    ? towardBlack
    : towardWhite;
}

function ensureContrastDirection(fg, bg, minRatio, target) {
  let best = fg;
  for (let t = 0.02; t <= 1; t += 0.02) {
    const candidate = mixHex(fg, target, t);
    if (contrastRatio(candidate, bg) >= minRatio) {
      best = candidate;
      break;
    }
  }
  return best;
}

function colorDistance(a, b) {
  const ca = parseColor(a);
  const cb = parseColor(b);
  if (!ca || !cb) return Infinity;
  return Math.hypot(ca.r - cb.r, ca.g - cb.g, ca.b - cb.b);
}

/** Solid hex from bg (gradients → first hex stop). */
export function solidBackground(bg) {
  if (!bg || typeof bg !== 'string') return '#ffffff';
  const direct = parseColor(bg.trim());
  if (direct) return toHex(direct);
  const hexes = bg.match(/#[0-9a-f]{3,8}/gi);
  if (hexes && hexes.length) {
    const p = parseColor(hexes[0]);
    return p ? toHex(p) : '#ffffff';
  }
  return '#ffffff';
}

/** WCAG AA body text on background (4.5:1). */
export const MIN_BODY = 4.5;
/** WCAG AA large text on background (3:1) — we target 4.5 for world-class accent text. */
export const MIN_LARGE = 3;
/** CTA label on accent fill. */
export const MIN_CTA = 4.5;

export function prepareContrastTokens(bg, ink, accent, link) {
  const solidBg = solidBackground(bg);
  link = link || accent;

  const safeInk =
    contrastRatio(ink, solidBg) >= MIN_BODY ? ink : ensureContrast(ink, solidBg, MIN_BODY);
  const safeLink =
    contrastRatio(link, solidBg) >= MIN_BODY ? link : ensureContrast(link, solidBg, MIN_BODY);
  const accentText =
    contrastRatio(accent, solidBg) >= MIN_BODY
      ? accent
      : ensureContrast(accent, solidBg, MIN_BODY);

  let accentFill = accent;
  let ctaFg = pickReadableText(accentFill);
  if (contrastRatio(ctaFg, accentFill) < MIN_CTA) {
    accentFill = ensureContrastWithFg(accentFill, ctaFg, MIN_CTA);
    ctaFg = pickReadableText(accentFill);
    if (contrastRatio(ctaFg, accentFill) < MIN_CTA) {
      ctaFg = ensureContrast(ctaFg, accentFill, MIN_CTA);
    }
  }

  return {
    solidBg,
    ink: safeInk,
    link: safeLink,
    accentText,
    accentFill,
    ctaFg,
    ctaBg: accentFill,
  };
}

function ensureContrastWithFg(bg, fg, minRatio) {
  if (contrastRatio(fg, bg) >= minRatio) return bg;
  const other = fg === LIGHT_TEXT || fg.toLowerCase() === '#ffffff' ? '#000000' : '#ffffff';
  return ensureContrastDirection(bg, fg, minRatio, other);
}

export function auditPalette(name, bg, ink, accent, link) {
  const ct = prepareContrastTokens(bg, ink, accent, link);
  const issues = [];
  if (contrastRatio(ink, ct.solidBg) < MIN_BODY) {
    issues.push(`ink on bg ${contrastRatio(ink, ct.solidBg).toFixed(2)}:1`);
  }
  if (contrastRatio(ct.link, ct.solidBg) < MIN_BODY) {
    issues.push(`link on bg ${contrastRatio(ct.link, ct.solidBg).toFixed(2)}:1`);
  }
  if (contrastRatio(ct.accentText, ct.solidBg) < MIN_BODY) {
    issues.push(`accent text on bg ${contrastRatio(ct.accentText, ct.solidBg).toFixed(2)}:1`);
  }
  if (contrastRatio(ct.ctaFg, ct.ctaBg) < MIN_CTA) {
    issues.push(`CTA ${contrastRatio(ct.ctaFg, ct.ctaBg).toFixed(2)}:1`);
  }
  return { name, issues, tokens: ct };
}
