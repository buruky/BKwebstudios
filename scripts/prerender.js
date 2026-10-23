// Runs after the client and SSR builds: renders the page into dist/index.html's #root and adds the JSON-LD to <head>.
import { readFile, writeFile, rm } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const page = "dist/index.html";
const { render, jsonLd } = await import(pathToFileURL("dist-ssr/entry-server.js").href);

const html = await readFile(page, "utf8");
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error(`prerender: ${marker} not found in ${page}`);
// The SSR build writes asset URLs root-relative; make them "./" like the client build (base "./" in vite.config.js).
const body = render().replaceAll('"/assets/', '"./assets/');
const out = html
  .replace(marker, `<div id="root">${body}</div>`)
  .replace("</head>", `<script type="application/ld+json">${jsonLd()}</script>\n</head>`);
await writeFile(page, out);
await rm("dist-ssr", { recursive: true, force: true });
console.log("prerender: wrote", page);
