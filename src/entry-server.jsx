import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import Work from "./Work.jsx";
import { content } from "./content.js";

export { content };

// Build-time prerender (scripts/prerender.js): the page's HTML for crawlers and no-JS fetchers. The browser still
// renders from scratch with createRoot (main.jsx), so the saved/?style= hero can differ from this default one.
export const render = (page) => renderToString(page === "work" ? <Work /> : <App />);

// The live address (bkwebstudios.com redirects here). Keep in step with the canonical in index.html.
export const SITE = "https://www.bkwebstudios.com/";

// Schema.org JSON-LD, built from content.js so it always matches the words on the page.
export function jsonLd() {
  const { about, pricing, faq, contact } = content;
  const dollars = (s) => s.replace(/[^\d.]/g, "");
  const business = {
    "@type": "ProfessionalService",
    "@id": `${SITE}#business`,
    name: content.name,
    url: SITE,
    description: content.description,
    image: `${SITE}og.png`,
    logo: `${SITE}icon-512.png`,
    telephone: `+1-${contact.phone.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}`,
    email: contact.email,
    priceRange: `From ${pricing.tiers[0].price}`,
    // Service-area business: city and state only, no street address.
    address: { "@type": "PostalAddress", addressLocality: "Seattle", addressRegion: "WA", addressCountry: "US" },
    areaServed: [{ "@type": "City", name: "Seattle" }, { "@type": "Country", name: "United States" }],
    founder: { "@id": `${SITE}#founder` },
    makesOffer: [
      ...pricing.tiers.map((t) => ({
        "@type": "Offer",
        name: `${t.name} website`,
        description: t.items.join(", "),
        price: dollars(t.price),
        priceCurrency: "USD",
      })),
      {
        "@type": "Offer",
        name: pricing.care.name,
        description: pricing.care.line,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: dollars(pricing.care.price.split(" or ")[0]),
          priceCurrency: "USD",
          unitCode: "MON",
        },
      },
    ],
  };
  const founder = {
    "@type": "Person",
    "@id": `${SITE}#founder`,
    name: about.name,
    jobTitle: "Web developer",
    alumniOf: { "@type": "CollegeOrUniversity", name: "University of Washington" },
    worksFor: { "@id": `${SITE}#business` },
  };
  const website = { "@type": "WebSite", "@id": `${SITE}#website`, url: SITE, name: content.name, publisher: { "@id": `${SITE}#business` } };
  const faqPage = {
    "@type": "FAQPage",
    "@id": `${SITE}#faq`,
    mainEntity: faq.items.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  // "<" escaped so no string in the data can close the script tag.
  return JSON.stringify({ "@context": "https://schema.org", "@graph": [business, founder, website, faqPage] }).replaceAll("<", "\\u003c");
}
