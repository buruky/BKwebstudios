# BK Web Studios: Sections Brief

One scrolling page: hero (any style) → Work → Pricing → Process → Contact.
The nav and "See my work" already link to `#work`, `#pricing`, `#process`, `#contact`.

**Wireframe:** `wireframes/sections.html`

**Built (2026-10-21):** `src/sections/Sections.jsx` + `Sections.module.css`, rendered under every hero in `App.jsx`. All copy lives in `src/content.js` under the `// ASSUMED` comment, so tomorrow's changes are text edits there.

> ⚠️ **Everything marked ASSUMED is placeholder content I made up.** Review it together on 2026-10-22, and replace or approve each item before it goes in `src/content.js`. Nothing assumed ships as-is.

---

## Look (shared by all heroes)

- Cream page (Bone #F4EFE8), Dune #2A2F33 text, Ember #D57D3B for the one call to action per section, Chicory #5B67D9 for small details.
- Section headings use the nav words already in `content.js` (Work, Pricing, Process, Contact), each with a thin index number: `01 Work`.
- Clash Display for headings, JetBrains Mono for body text, hairline rules between sections. Same as the heroes.
- **Question:** should the sections restyle per hero (dark under Summit, cream under Minimal), or stay the same under every hero? Assumed: the same.

---

## 01 · Work

- 3 project cards: screenshot, name, one line, link.
- **ASSUMED:** 3 projects. Placeholder labels only, no real client names:
  1. Church website: "Service times, events and sermons in one place."
  2. Local shop / restaurant: "Menu, hours and online orders."
  3. Community group: "Schedules, sign-ups and news."
- **Need from you:** real project names, screenshots or links, one line each. If there are fewer than 3, the layout can do 1 or 2.

## 02 · Pricing

- 3 tiers side by side; the middle one highlighted.
- **ASSUMED** (only "From $750" is real):
  | Tier | Price | Includes |
  |---|---|---|
  | Starter | $750 | Up to 5 pages, mobile-friendly, contact form, basic SEO, launch |
  | Standard | $1,500 | Up to 10 pages, blog or events, booking / forms, 30 days of support after launch |
  | Custom | Quote | Online store, integrations, larger sites |
- **ASSUMED:** an optional monthly care plan (hosting, updates, small edits), price TBD. Delete if not offered.
- **Need from you:** real tiers, prices and what each includes.

## 03 · Process

- 4 numbered steps in a row (stacked on phone).
- **ASSUMED:**
  1. **Free call:** 20 minutes to talk about your goals, pages and budget.
  2. **Design:** a homepage mockup, with two rounds of changes.
  3. **Build:** the full site, shared on a preview link for your review.
  4. **Launch:** domain connected, site live, and a short walkthrough so you can update it.
- **ASSUMED:** typical timeline "2–4 weeks".
- **Need from you:** your real steps and timeline.

## 04 · Contact

- Big closing line + "Book a free call" (the existing Messenger link) + email.
- **ASSUMED:** an email address shown under the button (placeholder `hello@…`).
- **ASSUMED:** no contact form for now. GitHub Pages can't receive form posts without a third-party service (e.g. Formspree); decide tomorrow.
- **Need from you:** email, phone (optional), and whether you want a form.

## Footer

- Logo mark, nav repeated, "© 2026 BK Web Studios".
