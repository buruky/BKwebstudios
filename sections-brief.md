# BK Web Studios: Sections Brief

One scrolling page in three chapters, one background each:

1. **Proof** (cream): Work → About
2. **The offer** (sand): Process → Pricing
3. **Let's talk** (night): Book a free call (calendar) → FAQ → the closing line with email, phone and Messenger

then the footer. Nav: Work, Process, Pricing, Book, FAQ.

**Flow (2026-11-20):** sections were stacked, each with its own background (six changes) and the same padding, so
the page felt like separate boxes. Now:
- The background only changes between chapters. Inside a chapter, sections sit closer with an inset hairline between them.
- Each section ends with a one-line "bridge" link into the next (`content.bridges`, DRAFT).
- Process comes before Pricing, so visitors see how easy it is before they see the price.
- Book and Contact are one ending. The calendar comes first, then the FAQ for anyone with questions, then the closing line ("You did the hard work. Let's show it off.") as the page's last big words, with email, phone and Messenger beside it (`#contact`).
- Shapes between chapters instead of flat rectangles: the sand rises out of the cream in a soft arch, with a round teal "Designed & built by hand ✦ Seattle, WA" stamp (`content.stamp`) on the curve that tilts as you scroll past. The night chapter rises over the sand as a sheet with rounded corners (rounded at the bottom too, over the footer).
- No section numbers (01, 02...). Each section is just its title with the short note beside it.

**Code:** `src/sections/Sections.jsx` + `Sections.module.css`. All copy lives in `src/content.js`.
**Source of truth for content:** Buruk's answers in the Site Questions artifact (https://claude.ai/artifact/PXvXXum27ZBMKYdxtKkKsi), round 1 applied 2026-10-22.

Lines marked `// DRAFT` in `content.js` are Claude's wording of Buruk's answers. They're live, and waiting on round 2 approval in the same artifact.

---

## Look (shared by all heroes)

- Same look under every hero (confirmed).
- Cream page (Bone #F4EFE8), Dune #2A2F33 text, Ember #D57D3B for the call to action, Chicory #5B67D9 for small details.
- Clash Display headings, JetBrains Mono body, hairline rules.

## What's real (from round 1)

- **Who:** Buruk Yimesgen, B.S. Computer Science and Mathematics, University of Washington. Based in Seattle, works with businesses anywhere. "I" or "we" are both fine.
- **Clients:** local and small businesses, churches, community groups.
- **Work:** Always with Compassion (alwayswithcompassion.com), Simret Consulting & Coaching (simretcc.com), Blue Touch AFH (temporary link buruky.github.io/BlueTouchAFH). Screenshots in `assets/work/*.webp` (originals moved to `S:businessBKwebstudios-unused`).
- **Pricing:** one package, Starter $750: up to 5 pages, mobile-friendly, basic SEO, launch included. Anything bigger gets a custom quote.
  - Care plan: $30/month or $300/year for photo and content updates. Broader work is quoted.
  - Payment: 50% to start, 50% at launch. The yearly care plan is paid up front.
  - Domain not included; Buruk walks the client through buying one.
- **Process:** free 15-minute phone call (cal.com), design, build, launch. Most sites take about 2 weeks. Clients provide their logo, photos and any text. After launch, clients ask Buruk for changes.
- **Booking:** cal.com popup plus its own section; "Book" is in the nav.
- **Contact:** burukyimesgen@gmail.com, (206) 928-1358, Messenger (m.me/builds.by.buruk). No contact form.
- **Domain:** bkwebstudios.com (not connected to GitHub Pages yet).
- **Switcher:** keep the "Coming soon" slots; they'll be built before deploy.

## Waiting on round 2

- Wording of the DRAFT lines (hero description, About, two project lines, custom/care lines, timeline label).
- Bridge lines between sections (`content.bridges`).
- FAQ: cut to 5 (cost and payments live in Pricing); wording waits on round 2.
- Pricing buttons: Starter "Book a free call", Bigger projects "Get a quote" (DRAFT). Both open cal.com with the choice prefilled in the booking notes.
- About photo, Blue Touch's real domain, public email choice, retaking the Simret screenshot (a text selection shows in it).
