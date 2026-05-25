#!/usr/bin/env node
/**
 * CI: verify color presets and COLOR_BUNDLES meet WCAG AA after contrast prep.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { contrastRatio, prepareContrastTokens, MIN_BODY, MIN_CTA } from './contrast.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const editorPath = path.join(root, 'editor.html');
const html = fs.readFileSync(editorPath, 'utf8');

function extractObjectBlock(label) {
  const re = new RegExp(`const ${label}\\s*=\\s*\\{([\\s\\S]*?)\\n\\s*\\};`, 'm');
  const m = html.match(re);
  if (!m) throw new Error(`Could not find ${label} in editor.html`);
  return m[1];
}

function parsePresets(block) {
  const presets = {};
  const entryRe =
    /(\w+):\s*\{\s*bgColor:\s*"([^"]+)"[\s\S]*?textColor:\s*"([^"]+)"[\s\S]*?accentColor:\s*"([^"]+)"[\s\S]*?linkColor:\s*"([^"]+)"/g;
  let m;
  while ((m = entryRe.exec(block)) !== null) {
    presets[m[1]] = { bg: m[2], ink: m[3], accent: m[4], link: m[5] };
  }
  return presets;
}

function parseBundles(block) {
  const bundles = {};
  const entryRe =
    /(\w+):\s*\{\s*id:\s*'[^']+'[\s\S]*?bg:\s*'([^']+)'[\s\S]*?ink:\s*'([^']+)'[\s\S]*?accent:\s*'([^']+)'/g;
  let m;
  while ((m = entryRe.exec(block)) !== null) {
    bundles[m[1]] = { bg: m[2], ink: m[3], accent: m[4], link: m[4] };
  }
  return bundles;
}

const presets = parsePresets(extractObjectBlock('colorPresets'));
const bundles = parseBundles(extractObjectBlock('COLOR_BUNDLES'));

let failed = 0;

console.log('Contrast audit (target: body/accent/link ≥4.5:1, CTA ≥4.5:1 after prep)');

for (const [label, map] of [
  ['colorPresets', presets],
  ['COLOR_BUNDLES', bundles],
]) {
  console.log(`\n${label} (${Object.keys(map).length} palettes)`);
  for (const [id, p] of Object.entries(map)) {
    const ct = prepareContrastTokens(p.bg, p.ink, p.accent, p.link);
    const problems = [];
    if (contrastRatio(ct.ink, ct.solidBg) < MIN_BODY) {
      problems.push(`ink ${contrastRatio(ct.ink, ct.solidBg).toFixed(2)}:1`);
    }
    if (contrastRatio(ct.link, ct.solidBg) < MIN_BODY) {
      problems.push(`link ${contrastRatio(ct.link, ct.solidBg).toFixed(2)}:1`);
    }
    if (contrastRatio(ct.accentText, ct.solidBg) < MIN_BODY) {
      problems.push(`accent ${contrastRatio(ct.accentText, ct.solidBg).toFixed(2)}:1`);
    }
    if (contrastRatio(ct.ctaFg, ct.ctaBg) < MIN_CTA) {
      problems.push(`CTA ${contrastRatio(ct.ctaFg, ct.ctaBg).toFixed(2)}:1`);
    }
    if (problems.length) {
      console.error(`  FAIL ${id}: ${problems.join('; ')}`);
      failed++;
    } else {
      console.log(
        `  OK   ${id} — body ${contrastRatio(ct.ink, ct.solidBg).toFixed(2)}:1, accent ${contrastRatio(ct.accentText, ct.solidBg).toFixed(2)}:1, CTA ${contrastRatio(ct.ctaFg, ct.ctaBg).toFixed(2)}:1`
      );
    }
  }
}

console.log('\nRaw source accent on bg (should be ≥3:1 for large text):');
for (const [label, map] of [
  ['colorPresets', presets],
  ['COLOR_BUNDLES', bundles],
]) {
  for (const [id, p] of Object.entries(map)) {
    const raw = contrastRatio(p.accent, p.bg);
    if (raw < 3) {
      console.warn(`  WARN ${label}.${id} raw accent on bg ${raw.toFixed(2)}:1`);
    }
  }
}

if (failed) {
  console.error(`\n${failed} palette(s) failed after contrast preparation.`);
  process.exit(1);
}
console.log('\nAll palettes pass WCAG AA after prepareContrastTokens.');
