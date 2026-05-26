#!/usr/bin/env python3
"""One-shot rebrand: URLs, brand strings, theme link injection, CSS token swaps."""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

REPLACEMENTS: list[tuple[str, str]] = [
    ("https://html.boredgames.site", "https://code.hibot.space"),
    ("http://html.boredgames.site", "https://code.hibot.space"),
    ("html.boredgames.site", "code.hibot.space"),
    ("Beginner Web Studio", "Hi Bot Code"),
    ("| html.boredgames", "| Hi Bot Code"),
    ("html.boredgames", "Hi Bot Code"),
    ('"short_name": "Web Studio"', '"short_name": "Hi Bot Code"'),
]

CSS_SWAPS: list[tuple[str, str]] = [
    ("--bg: #0a0f1a", "--bg: #0A0A0A"),
    ("--ink: #f1f5f9", "--ink: #E8E8E3"),
    ("--muted: #a8b5c9", "--muted: #8B95A1"),
    ("--accent: #3dd68c", "--accent: #F5A524"),
    ("--accent-soft: rgba(61, 214, 140, 0.85)", "--accent-soft: rgba(245, 165, 36, 0.9)"),
    ("--accent-dim: rgba(61,214,140,.12)", "--accent-dim: rgba(245,165,36,.14)"),
    ("--accent-dim: rgba(61, 214, 140, 0.12)", "--accent-dim: rgba(245, 165, 36, 0.14)"),
    ("--panel: #0d1219", "--panel: #111418"),
    ("--panel-2: #111827", "--panel-2: #1B1F26"),
    ("--border: rgba(168,181,201,.18)", "--border: rgba(139,149,161,.22)"),
    ("--border-hover: rgba(168,181,201,.38)", "--border-hover: rgba(139,149,161,.45)"),
    ("rgba(61, 214, 140, 0.09)", "rgba(245, 165, 36, 0.08)"),
    ("rgba(61,214,140,0.09)", "rgba(245,165,36,0.08)"),
    ("--font-display: 'Syne'", "--font-display: 'Outfit'"),
    ('--font-display: "Syne"', "--font-display: 'Outfit'"),
    ("#3dd68c", "#F5A524"),
    ("#3DD68C", "#F5A524"),
    ("61, 214, 140", "245, 165, 36"),
    ("61,214,140", "245,165,36"),
    ("rgba(10,15,26,", "rgba(10,10,10,"),
    ("rgba(10, 15, 26,", "rgba(10, 10, 10,"),
]

THEME_LINK = (
    '<link rel="stylesheet" href="/assets/fonts/fonts.css">\n'
    '  <link rel="stylesheet" href="/assets/hibot-theme.css">'
)


def patch_text(s: str, is_html: bool) -> str:
    for a, b in REPLACEMENTS:
        s = s.replace(a, b)
    if is_html:
        for a, b in CSS_SWAPS:
            s = s.replace(a, b)
    return s


def should_process(p: Path) -> bool:
    if p.is_dir() or ".git" in p.parts:
        return False
    return p.suffix.lower() in {
        ".html",
        ".htm",
        ".css",
        ".js",
        ".mjs",
        ".json",
        ".xml",
        ".txt",
        ".md",
        ".yml",
        ".yaml",
        ".toml",
        ".svg",
    }


def _asset_prefix(path: Path) -> tuple[str, str]:
    """Return (fonts_href, theme_href) for this HTML file."""
    rel = path.relative_to(ROOT)
    depth = len(rel.parts) - 1
    if depth == 0:
        return "/assets/fonts/fonts.css", "/assets/hibot-theme.css"
    pfx = "../" * depth
    return f"{pfx}assets/fonts/fonts.css", f"{pfx}assets/hibot-theme.css"


def inject_theme_link(html: str, path: Path) -> str:
    if "hibot-theme.css" in html:
        return html
    if '<link rel="stylesheet" href="/assets/fonts/fonts.css">' in html:
        return html.replace(
            '<link rel="stylesheet" href="/assets/fonts/fonts.css">',
            THEME_LINK,
            1,
        )
    if '<link rel="stylesheet" href="assets/fonts/fonts.css">' in html:
        return html.replace(
            '<link rel="stylesheet" href="assets/fonts/fonts.css">',
            '<link rel="stylesheet" href="assets/fonts/fonts.css">\n'
            '  <link rel="stylesheet" href="assets/hibot-theme.css">',
            1,
        )
    fonts_href, theme_href = _asset_prefix(path)
    snippet = (
        f'  <link rel="stylesheet" href="{fonts_href}">\n'
        f'  <link rel="stylesheet" href="{theme_href}">\n'
    )
    for needle in ('<meta charset="utf-8" />', '<meta charset="utf-8">'):
        if needle in html:
            return html.replace(needle, needle + "\n" + snippet, 1)
    return html


def main() -> None:
    for path in ROOT.rglob("*"):
        if not should_process(path):
            continue
        if path.name == "apply-hibot-rebrand.py":
            continue
        raw = path.read_text(encoding="utf-8", errors="ignore")
        is_html = path.suffix.lower() in {".html", ".htm"}
        new = patch_text(raw, is_html=is_html)
        if is_html:
            new = inject_theme_link(new, path)
        if new != raw:
            path.write_text(new, encoding="utf-8")
            print("updated", path.relative_to(ROOT))


if __name__ == "__main__":
    main()
