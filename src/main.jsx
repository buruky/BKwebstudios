import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Work from "./Work.jsx";
import "./global.css";

// One bundle, two pages: /work/ (prerendered to dist/work/index.html) and everything else is the home page.
const Page = /\/work\/?$/.test(location.pathname) ? Work : App;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Page />
  </StrictMode>
);
