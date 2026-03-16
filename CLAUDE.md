# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Plain HTML + CSS static site. No build step, no framework, no JavaScript.
Deployed to GitHub Pages via GitHub Actions on push to `main`.

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

CSS custom properties defined in `:root`:
- `--accent: #4338ca` — indigo, used for links and chips
- `--accent-light: #eef2ff` — chip backgrounds
- `--muted: #6b7280` — secondary text, labels
- `--border: #f3f4f6` — section dividers
- `--max-width: 740px` — content column width

Key classes: `.pub-list`, `.pub-links`, `.post-list`, `.tags`, `.profile-header`, `.site-nav`

## Deployment

Push to `main` — GitHub Actions automatically builds and deploys.
Requires GitHub Pages enabled in repo settings with source set to **GitHub Actions**.
