// The words every hero shares. Heroes only move and restyle these, never rewrite them.
export const content = {
  name: "BK Web Studios",
  titleLead: "Custom websites for",
  titleKey: "small",
  titleTail: "businesses",
  description:
    "We create websites for small businesses, churches, and community groups. From design to launch, we handle the details so you can focus on your work.",
  primary: { label: "Book a free call", href: "https://cal.com/buruk-yimesgen-xvoxel/bk-webstudios" },
  secondary: { label: "See my work", href: "#work" },
  allWork: "See more", // home Work section button to the /work page
  price: "Seattle · Websites from $750",
  builtBy: "Built by Buruk in Seattle", // every hero shows it, each in its own spot
  switcherHint: "Same site, new look. Try another style.", // DRAFT: next to every hero's style switcher
  // Hero 1 (Flash) only: its film-style credits row. Labels approved in the Hero 1 Build Sheet.
  credits: [
    { label: "Built by", value: "Buruk Yimesgen" },
    { label: "Based in", value: "Seattle, WA" },
    { label: "Starts at", value: "$750" },
  ],
  nav: [
    { label: "Work", href: "#work" },
    { label: "Pricing", href: "#pricing" },
    { label: "Process", href: "#process" },
    { label: "Book", href: "#book" },
    { label: "Contact", href: "#contact" },
  ],

  // ---- Sections below the hero ----
  // From Buruk's answers in Site Questions (2026-10-22). Lines marked DRAFT are my rewording of those answers,
  // waiting for Buruk's OK (see sections-brief.md). Everything else is Buruk's own facts.
  // DRAFT: the short line beside each section title, keyed by section id.
  bookTag: "15 min · Phone call · Free", // DRAFT: the small ember tag above the calendar
  madeBy: "This site was designed and built by hand by Buruk. Yours could be next.", // DRAFT: footer brag line
  sectionNotes: {
    work: "Real sites I designed and built for local businesses. Tap one to see it live.",
    about: "One person from start to finish. You talk to the person who builds your site.",
    pricing: "Two clear packages. Anything bigger gets a quote after the free call.", // DRAFT
    process: "Four steps, and you see the whole site on a preview link before it goes live.",
    book: "Pick a time that works for you. It's a free 15‑minute phone call.",
    faq: "Quick answers to what most owners ask first.",    contact: "Prefer to write? Email, call or message me directly.",
  },
  // `line` describes the business (both pages). `details` is what Buruk did, shown on the /work page only: on hover
  // over the screenshot, or under the card on phones.
  work: [
    { name: "Always with Compassion", type: "Adult family home", img: "always-with-compassion", href: "https://alwayswithcompassion.com/",
      line: "A small adult family home where quality care and real connection come first.", // DRAFT wording
      details: "Designed and built from scratch: photo galleries of the suites, living spaces and backyard, a map, and a Schedule a Visit button up front." }, // DRAFT
    // shortcut: temporary GitHub Pages link, swap for the real domain once Blue Touch launches.
    { name: "Blue Touch AFH", type: "Adult family homes", img: "blue-touch", href: "https://buruky.github.io/BlueTouchAFH/",
      line: "Two licensed adult family homes in Everett's Silver Lake neighborhood, offering 24/7 personalized senior care.",
      details: "Designed and built from scratch around the homes' real photos: a page for each home with its own gallery, plus amenities, FAQ, and one-tap call and tour buttons." }, // DRAFT
    // Isaiah: not built by Buruk, took it over after launch. `details` claims only what he did, never "designed/built".
    { name: "Isaiah Café", type: "Café and catering", img: "isaiah-cafe", href: "https://www.isaiahcafe.com/",
      line: "A community café in Calgary serving Ethiopian Aggüdo coffee, fresh bakery, breakfast, and full-service catering.", // DRAFT wording
      details: "I'm this café's developer. I took over the site, moved its hosting, locked down its security, and added Square online ordering." }, // DRAFT
    // Home shows the first 3; everything after is on the /work page only.
    { name: "Simret Consulting & Coaching", type: "Coaching and counseling", img: "simret", href: "https://simretcc.com/",
      line: "Dr. Kebreab Hailegiorgis coaches individuals, couples, and premarital pairs toward real connection.", // DRAFT wording
      details: "Designed and built from scratch, with online booking and payments built right into the page, so clients book and pay for sessions in one step." }, // DRAFT
    { name: "Galilee Adult Family Home", type: "Adult family home", img: "galilee", href: "https://galileeafh.net/",
      line: "A small adult family home in Mountlake Terrace offering memory, hospice, mental health and respite care with caregivers on site 24/7.", // DRAFT wording
      details: "Designed and built from scratch: a page for each level of care, a room-by-room photo tour, a live Google reviews feed, and Schedule a Tour and call buttons up front." }, // DRAFT
  ],
  about: {
    title: "About",
    name: "Buruk Yimesgen",
    // DRAFT, from Buruk's answer.
    lines: [
      "I'm Buruk Yimesgen, a developer based in Seattle. I studied computer science and math at the University of Washington.",
      "I love helping people, and I love to create. Building websites for small businesses lets me do both.",
    ],
    facts: ["B.S. Computer Science and Mathematics, University of Washington", "Based in Seattle", "Working with businesses anywhere", "Designed and built this site, every style of it"], // last one DRAFT
  },
  pricing: {
    tiers: [
      { name: "Starter", price: "$750", cta: "Book a free call", items: ["Up to 3 pages", "Mobile-friendly", "Launched and live"] },
      { name: "Business", price: "$1,400", cta: "Book a free call", items: ["Up to 7 pages", "Basic SEO", "Gallery and map", "A menu or services page"] },
    ],
    custom: { name: "Popular extras", price: "Custom quote", cta: "Get a quote", items: ["Online booking", "Square ordering", "Google reviews", "Payment links", "Extra pages"] }, // DRAFT
    care: { name: "Care plan", price: "$20/month or $200/year", line: "I keep your photos and content up to date. Bigger changes are quoted separately." }, // DRAFT
    terms: [
      "50% to start, 50% at launch.",
      "Nonprofits and churches save 10%.",
      "The yearly care plan is paid up front.",
      "Domain not included. I'll walk you through buying one and explain every step.",
    ],
  },
  process: {
    timeline: "Most sites within 2 weeks",
    steps: [
      { name: "Free call", line: "15 minutes to talk about your goals, pages and budget." },
      { name: "Design", line: "A homepage mockup, with two rounds of changes." },
      { name: "Build", line: "The full site, shared on a preview link for your review." },
      { name: "Launch", line: "Domain connected, site live, and a short walkthrough." },
    ],
  },
  // DRAFT: the 5 kept from the 9 options (cost and payments are already in Pricing).
  faq: {
    title: "FAQ",
    items: [
      { q: "How long does it take?", a: "Most standard sites are done within 2 weeks." },
      { q: "What do I need to give you?", a: "Your logo, as many photos as you can, and any text you want on the site. I'll help with the rest." },
      { q: "Do I need to buy a domain?", a: "Yes, the domain is separate. I'll walk you through buying one and explain every step." },
      { q: "Can I make changes after launch?", a: "Yes. Send me what you want changed. The care plan covers photo and content updates for $20/month or $200/year." },
      { q: "Do you only work with Seattle businesses?", a: "No. I'm based in Seattle, but I work with businesses anywhere. The free call is by phone." },
    ],
  },
  // Footer link only for now; real quotes could go here once there are Google reviews to show.
  reviews: { cta: "Leave a review on Google", href: "https://g.page/r/Ce9UX-F5xU9kEBM/review" },
  contact: {
    closing: "You did the hard work. Let's show it off.", // DRAFT, from Buruk's idea
    email: "burukyimesgen@gmail.com",
    phone: "(206) 928-1358",
    messenger: { label: "Message me on Messenger", href: "https://m.me/builds.by.buruk" },
  },
};
