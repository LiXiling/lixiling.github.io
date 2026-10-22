# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Plain HTML + one stylesheet (`style.css`) + small vanilla JS in `main.js` (mobile menu, theme toggle,
clip autoplay, paper-rail arrows, publication search/filter). No CSS framework. Every page must stay
readable without JS (the inline head script adds a `js` class; the mobile menu only collapses under it).
No build step. Deployed to GitHub Pages via GitHub Actions on push to `main`.
Icons are Font Awesome Free 6.5.1 SVGs inlined as `<svg class="icon icon-NAME">` (CC BY 4.0, keep the
licence comment in `<head>`); copy an existing one to reuse it. The only external requests are Google
Fonts: Instrument Sans (headings, name, tagline via `--font-display`), Inter (text), IBM Plex Mono (labels).

## Version Control

This repo uses **Jujutsu (`jj`)** as the primary VCS on top of git. Prefer `jj` commands over raw `git` commands (e.g., `jj status`, `jj log`, `jj commit`).

## Development

Open any `.html` file directly in a browser — no server needed.

For live reload during editing:
```
npx serve .
# or
python3 -m http.server
```

## Structure

```
index.html          — Home page (bio, research interests, contact)
publications.html   — Full publications list (grouped by year)
style.css           — All shared styles (single file)
main.js             — All shared behaviour (single file, loaded with defer)
img/pubs/           — Publication teaser images (webp, ~640px wide, white frames trimmed)
media/              — Short muted research clips (mp4 + jpg poster)
photo.jpg           — Profile photo
mark.svg            — Penguin mark (favicon; same path is inlined as `<svg class="mark">` in nav/footer)
icon.png            — Original penguin PNG (favicon fallback)
.github/workflows/deploy.yml  — GitHub Actions Pages deployment
```

## Customization

Nav, footer and `<head>` are copied into every page (no build step) — change them everywhere at once.

A posts section existed before and was removed while empty; it can be restored from version history.

To add a publication: copy an `<li class="pub">` in `publications.html` (instructions in the comment
above the list). Keep `id`, `data-year`, `data-venue` (= badge text, or `Preprint`) and the year/total
counts in sync. The home-page research chips and paper rail link to publications by `#id`; rail cards
repeat the full title and author list, so keep them identical to `publications.html`.

## Design System (style.css)

Design ideas adapted (without the branding) from the IRL lab site: mono numbered section labels,
publication rows with teaser thumbnails and venue badges, a horizontal paper rail.

Tokens in `:root` (single accent, no second brand colour):
- `--accent` / `--accent-soft` / `--on-accent` — links, badges, labels, primary button
- `--ground` / `--surface` / `--surface-2` / `--thumb-bg` — page, cards, wells, image tiles
- `--text` / `--muted` / `--faint`, `--line` / `--line-strong`

Key classes: `.wrap`, `.band`, `.eyebrow[data-index]`, `.section-head`, `.intro`,
`.theme`, `.rail` + `.paper`, `.sheet` + `.rows`, `.timeline`, `.feature`, `.course-grid` + `.course`,
`.page-head`, `.pub`, `.badge`, `.chip`, `.btn`, `.icon`, `.site-nav` + `.nav-menu` + `.nav-toggle`.

Purpose: a researcher profile for job and internship applications. Lead with research, publications
and experience; keep the tone factual (no vanity metrics or filler news).

Dark mode: `prefers-color-scheme` plus a manual toggle that sets `data-theme` on `<html>` (saved in
localStorage, applied by an inline script in `<head>`).
Dark tokens are defined twice (`[data-theme="dark"]` and the media query) — keep them in sync.
A `@media print` block forces light tokens and hides navigation for save-as-PDF.
Text colors meet WCAG AA on every surface; check contrast when changing tokens. Use American spelling.

## Deployment

Push to `main` — GitHub Actions automatically builds and deploys.
Requires GitHub Pages enabled in repo settings with source set to **GitHub Actions**.
