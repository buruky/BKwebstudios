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
    pricing: "One clear starting price. Anything bigger gets a quote after the free call.",
    process: "Four steps, and you see the whole site on a preview link before it goes live.",
    book: "Pick a time that works for you. It's a free 15‑minute phone call.",
    faq: "Quick answers to what most owners ask first.",
    contact: "Prefer to write? Email, call or message me directly.",
  },
  work: [
    { name: "Always with Compassion", type: "Adult family home", img: "always-with-compassion", href: "https://alwayswithcompassion.com/",
      line: "A small adult family home where quality care and real connection come first." }, // DRAFT wording
    { name: "Simret Consulting & Coaching", type: "Coaching and counseling", img: "simret", href: "https://simretcc.com/",
      line: "Dr. Kebreab Hailegiorgis coaches individuals, couples, and premarital pairs toward real connection." }, // DRAFT wording
    // shortcut: temporary GitHub Pages link, swap for the real domain once Blue Touch launches.
    { name: "Blue Touch AFH", type: "Adult family homes", img: "blue-touch", href: "https://buruky.github.io/BlueTouchAFH/",
      line: "Two licensed adult family homes in Everett's Silver Lake neighborhood, offering 24/7 personalized senior care." },
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
    tier: { name: "Starter", price: "$750", cta: "Book a free call", items: ["Up to 5 pages", "Mobile-friendly", "Basic SEO", "Launch included"] },
    custom: { name: "Bigger projects", price: "Custom quote", cta: "Get a quote", line: "Need more pages or extra features? Tell me on the free call and I'll quote it." }, // DRAFT
    care: { name: "Care plan", price: "$20/month or $200/year", line: "I keep your photos and content up to date. Bigger changes are quoted separately." }, // DRAFT
    terms: [
      "50% to start, 50% at launch.",
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
  contact: {
    closing: "You did the hard work. Let's show it off.", // DRAFT, from Buruk's idea
    email: "burukyimesgen@gmail.com",
    phone: "(206) 928-1358",
    messenger: { label: "Message me on Messenger", href: "https://m.me/builds.by.buruk" },
  },
};
