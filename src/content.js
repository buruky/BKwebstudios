// The words every hero shares. Heroes only move and restyle these, never rewrite them.
export const content = {
  name: "BK Web Studios",
  titleLead: "Custom websites for",
  titleKey: "local",
  titleTail: "businesses",
  description:
    "We create websites for local businesses, churches, and community groups. From design to launch, we handle the details so you can focus on your work.",
  primary: { label: "Book a free call", href: "https://m.me/builds.by.buruk" },
  secondary: { label: "See my work", href: "#work" },
  price: "From $750",
  nav: [
    { label: "Work", href: "#work" },
    { label: "Pricing", href: "#pricing" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],

  // ---- Sections below the hero ----
  // ASSUMED: everything from here down is placeholder copy, to review with Buruk (see sections-brief.md).
  // Only "From $750" above is real. Replace or approve each item before launch.
  work: [
    { name: "Church website", line: "Service times, events and sermons in one place.", href: "#" },
    { name: "Local shop", line: "Menu, hours and online orders.", href: "#" },
    { name: "Community group", line: "Schedules, sign-ups and news.", href: "#" },
  ],
  pricing: {
    tiers: [
      { name: "Starter", price: "$750", items: ["Up to 5 pages", "Mobile-friendly", "Contact form", "Basic SEO", "Launch included"] },
      { name: "Standard", price: "$1,500", featured: true, items: ["Up to 10 pages", "Blog or events", "Booking and forms", "30 days of support after launch"] },
      { name: "Custom", price: "Quote", items: ["Online store", "Integrations", "Larger sites"] },
    ],
    carePlan: "Optional care plan: hosting, updates and small edits each month. Price TBD.",
  },
  process: {
    timeline: "Usually 2–4 weeks",
    steps: [
      { name: "Free call", line: "20 minutes to talk about your goals, pages and budget." },
      { name: "Design", line: "A homepage mockup, with two rounds of changes." },
      { name: "Build", line: "The full site, shared on a preview link for your review." },
      { name: "Launch", line: "Domain connected, site live, and a short walkthrough." },
    ],
  },
  contact: {
    closing: "Ready when you are.",
    email: "hello@bkwebstudios.com",
  },
};
