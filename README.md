# ABK Tech NG — Official Website

A dark, premium, animated marketing site for ABK Tech NG. Built with plain HTML5, CSS3, and vanilla JavaScript — no frameworks, no build step, no dependencies. Works by simply opening `index.html`, and deploys as-is to GitHub Pages, Vercel, or Netlify.

## What's included

| Page | File |
|---|---|
| Home | `index.html` |
| Services | `services.html` |
| Portfolio | `portfolio.html` |
| About | `about.html` |
| Blog | `blog.html` |
| Careers | `careers.html` |
| Contact | `contact.html` |
| Privacy Policy | `privacy.html` |
| Terms of Service | `terms.html` |
| 404 | `404.html` |

```
ABK-Tech-NG/
├── index.html, services.html, portfolio.html, about.html,
│   blog.html, careers.html, contact.html, privacy.html,
│   terms.html, 404.html
├── css/
│   ├── style.css         → design tokens, layout, components
│   ├── animations.css    → keyframes + scroll-reveal
│   └── responsive.css    → breakpoints
├── js/
│   ├── main.js            → nav, scroll-reveal, portfolio filter, forms
│   └── particles.js       → animated circuit background
├── images/
│   ├── logo-mark.png      → compact logo used in nav/footer
│   ├── logo-full.png      → full lockup with tagline
│   ├── favicon-32.png / favicon-180.png
├── robots.txt
├── sitemap.xml
└── README.md
```

## Before you launch — things that need your input

This is a real, working site, but a few pieces are placeholders that only you can fill in:

### 1. Contact & newsletter forms (important)
Both forms currently work but fall back to opening a pre-filled email if no real backend is connected. To make them submit silently and land straight in your inbox:

1. Go to **[formspree.io](https://formspree.io)** and create a free account.
2. Create a new form pointed at **abktechng@gmail.com**.
3. Copy the endpoint it gives you (looks like `https://formspree.io/f/xxxxxxxx`).
4. Open `js/main.js` and replace the `FORM_ENDPOINT` value near the top with your real endpoint.

Until you do this, every submission simply opens the visitor's email client with the message pre-filled to `abktechng@gmail.com` — so nothing is ever lost, it's just not automatic yet.

### 2. Portfolio case studies
The six projects on `portfolio.html` are representative examples of the *type* of work described in the brief — not real client projects. Replace the titles, descriptions, and device mockups with your actual work, screenshots, and results before publishing.

### 3. Blog posts
The articles listed on `blog.html` are placeholder titles/excerpts to show the intended structure. Swap in real posts (each would need its own article page, which isn't built yet — this page currently only lists posts).

### 4. Domain-dependent details
`sitemap.xml`, `robots.txt`, and the Open Graph tags in every page's `<head>` currently point to `https://abktech.ng`. Update these to your real domain once you have one.

### 5. Careers listings
The four open roles on `careers.html` are placeholders — update or remove them to match what you're actually hiring for.

### 6. Legal pages
`privacy.html` and `terms.html` contain generic starter text clearly marked as placeholders. Have them reviewed by a lawyer before publishing — they are not legal advice.

## Already wired up and real

- Telegram: [t.me/Abk_tech_Ng](https://t.me/Abk_tech_Ng)
- X: [x.com/Abk_tech_ng](https://x.com/Abk_tech_ng)
- WhatsApp: [wa.me/2347046644623](https://wa.me/2347046644623)
- Email: abktechng@gmail.com
- Logo: extracted from your uploaded artwork, background removed, used in nav, footer, and favicon across every page.

## Deployment

**GitHub Pages** — push this folder to a repo, enable Pages in repo Settings → Pages, set source to the root of the `main` branch.

**Vercel / Netlify** — drag-and-drop this folder onto their dashboard, or connect the repo. No build command needed — it's a static site.

**Locally** — just open `index.html` in a browser. No server required.

## Notes on the design

- Dark mode only (no light mode toggle is currently built).
- The animated background canvas (`js/particles.js`) respects `prefers-reduced-motion`.
- All fonts load from Google Fonts (Space Grotesk, Inter, JetBrains Mono) — requires an internet connection to render correctly; for a fully offline-capable site, self-host the font files.
- Mobile menu: a full-screen slide-down menu is implemented (`js/main.js` + `.mobile-menu` in `css/style.css`) — tap the hamburger icon on small screens.
