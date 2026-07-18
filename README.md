# Kaki:Dan — site source

## Why it wasn't opening on Netlify

Two likely causes, both fixed in this version:

1. **No `index.html` at the repo root.** Netlify (like any static host)
   looks for `index.html` as the default document. Your original file was
   named `kakidan.html`, so visiting the site's root URL had nothing to
   serve. It's now `index.html`.
2. **A single ~300 KB HTML file with two full-size images base64-encoded
   inline.** That's not a hard blocker on its own, but it inflates the
   page weight enormously (the text of the page is under 12 KB — the rest
   was image data repeated twice), slows first paint, and is easy to
   corrupt with a bad copy/paste into GitHub's web editor. The images are
   now separate files under `images/`, referenced normally.

If the deploy still doesn't show up after pushing this structure, check
in Netlify's dashboard under **Site settings → Build & deploy → Publish
directory** — it should point at the repo root (`.`), which is also set
in `netlify.toml` here.

## Structure

```
.
├── index.html              ← the site (was kakidan.html)
├── css/
│   └── site.css             ← all styles, extracted from the old inline <style>
├── js/
│   └── site.js               ← the unwrap-on-scroll effect, extracted from inline <script>
├── images/
│   └── kakidan-gift-box.jpg  ← the product photo (was duplicated inline as base64 twice)
├── payments/
│   └── spike/
│       ├── checkout.html     ← placeholder checkout page, linked from the CTA buttons
│       ├── checkout.js       ← reads which product was selected; Spike SDK wiring goes here
│       ├── success.html      ← placeholder post-payment redirect target
│       └── cancel.html       ← placeholder cancelled-checkout redirect target
├── docs/                    ← for your own future dev notes
├── netlify.toml              ← publish dir + friendly /checkout redirects
├── robots.txt
├── sitemap.xml
└── .gitignore
```

## Wiring up Spike

The `payments/spike/` folder is a **placeholder only** — nothing in it
processes a real payment yet. It exists so the CTA buttons have
somewhere real to go and so the shape of a checkout flow (product →
checkout → success/cancel) is already in place.

To finish it:
1. Look up Spike's current JS SDK / hosted-checkout docs (their API may
   have changed since this scaffold was built — this wasn't built
   against a live Spike integration).
2. Create the payment session/intent **server-side** — Netlify Functions
   is the natural fit if you stay on Netlify — never put a secret key in
   client-side JS.
3. Point `checkout.js` at Spike's client-side element or redirect flow.
4. Point Spike's success/cancel redirect URLs at
   `/payments/spike/success.html` and `/payments/spike/cancel.html`
   (or the `/checkout/success` and `/checkout/cancel` friendly redirects
   already set up in `netlify.toml`).

## Adding things later

- More product photos → drop them in `images/`.
- A blog or FAQ page → add `blog.html` etc. at the root, or a `blog/`
  folder if there'll be several.
- Any small helper scripts → `js/`.
- Design/business notes → `docs/`.
