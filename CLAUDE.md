# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

HTML + Bulma CSS framework (loaded from CDN) + minimal vanilla JS (navbar burger only).
No build step. Deployed to GitHub Pages via GitHub Actions on push to `main`.
Font Awesome icons loaded from CDN.

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
posts.html          — Blog-style tech writeups index
posts/              — Individual post HTML files (create as needed)
style.css           — All shared styles (single file)
photo.jpg           — Profile photo (add your own)
.github/workflows/deploy.yml  — GitHub Actions Pages deployment
```

## Customization

All placeholder text is wrapped in `[square brackets]`. Replace them throughout the HTML files.

To add a new post: create `posts/your-slug.html`, copy the nav/footer from another page, add the post to the list in `posts.html`.

## Design System (style.css)

Built on Bulma with custom overrides. CSS custom properties in `:root`:
- `--accent: #506bf0` — primary blue, used for links, buttons, headings
- `--accent-light: #eef2ff` — tag/chip backgrounds
- `--text-primary / --text-secondary` — text colors
- `--bg-subtle / --border-light` — backgrounds and dividers

Key custom classes: `.section-card`, `.section-heading`, `.pub-entry`, `.pub-links`, `.post-entry`, `.profile-hero`, `.research-tags`
Bulma classes used throughout: `.navbar`, `.hero`, `.container`, `.columns`, `.button`, `.tag`, `.footer`
Dark mode supported via `prefers-color-scheme: dark`.

## Deployment

Push to `main` — GitHub Actions automatically builds and deploys.
Requires GitHub Pages enabled in repo settings with source set to **GitHub Actions**.
