# Anu Srivastava Creator Portfolio

A playful creator media kit and portfolio for Anu Srivastava, focused on fitness, matcha and ube, skincare, fashion, brand collaborations, reel formats, audience reach, and contact details.

## Requirements

- Node.js 22.12 or newer
- npm

## Local Development

```bash
npm install
npm run dev
```

The Vite dev server runs at:

```text
http://127.0.0.1:5173/
```

## Build

```bash
npm run build
```

The production build is written to `dist/`.

## Routes

The portfolio supports shareable page slugs:

- `/reach`
- `/work`
- `/genres`
- `/love`
- `/contact`

## Deploying To Vercel

This project includes `vercel.json` for Vercel deployment. Use the Vite framework preset with:

- Build command: `npm run build`
- Output directory: `dist`

The Vercel rewrite sends direct visits to routes like `/genres` or `/contact` back to `index.html`, so the single-page app can render the correct section.
