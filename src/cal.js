// Cal.com booking embed. The loader is Cal's own snippet: it queues Cal(...) calls until embed.js arrives and replays them.
// Any element with data-cal-link opens the booking popup (embed.js listens for those clicks on the document).
(function (C, A, L) {
  const p = (a, ar) => a.q.push(ar);
  const d = C.document;
  C.Cal = C.Cal || function () {
    const cal = C.Cal;
    const ar = arguments;
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      d.head.appendChild(d.createElement("script")).src = A;
      cal.loaded = true;
    }
    if (ar[0] === L) {
      const api = function () { p(api, arguments); };
      const namespace = ar[1];
      api.q = api.q || [];
      if (typeof namespace === "string") {
        cal.ns[namespace] = cal.ns[namespace] || api;
        p(cal.ns[namespace], ar);
        p(cal, ["initNamespace", namespace]);
      } else p(cal, ar);
      return;
    }
    p(cal, ar);
  };
})(window, "https://app.cal.com/embed/embed.js", "init");

export const Cal = window.Cal;
Cal("init", { origin: "https://app.cal.com" });
// The calendar wears the site's palette: bone paper, charcoal text, warm sand open days, teal for the picked day and
// Confirm. (cal.com drives every highlight from one brand colour, so the ember accent lives outside the embed.)
Cal("ui", {
  cssVarsPerTheme: {
    light: {
      "cal-brand": "#2e6170",            // teal: selected day, Confirm
      "cal-brand-emphasis": "#24505c",
      "cal-brand-text": "#f4efe8",
      "cal-bg": "#fbf8f3",               // the card
      "cal-bg-muted": "#f4efe8",
      "cal-bg-subtle": "#ece4d7",        // available days
      "cal-bg-emphasis": "#e2d8c8",      // day hover
      "cal-border": "#d9cfbf",
      "cal-border-subtle": "#e6ddd0",
      "cal-border-booker": "#d9cfbf",
      "cal-text": "#2a2f33",
      "cal-text-emphasis": "#1d1a18",
      "cal-text-subtle": "#5c6064",
      "cal-text-muted": "#7a7f83",
    },
  },
  hideEventTypeDetails: false,
});

// Cream booking calendar, to sit on the cream sections and in the popup alike.
export const calConfig = { layout: "month_view", theme: "light" };

const ORIGIN = "https://cal.com/";
// "https://cal.com/user/event" -> "user/event"; null for any other link.
export const calPath = (href) => (href.startsWith(ORIGIN) ? href.slice(ORIGIN.length) : null);

// embed.js sets Cal.instance when it runs. Until then a booking link just opens cal.com.
export const calReady = () => Boolean(window.Cal.instance);
