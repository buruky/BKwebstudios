// Runs after the client and SSR builds: renders the pages into #root (dist/index.html, dist/work/index.html) and adds
// the JSON-LD to the home page's <head>.
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const page = "dist/index.html";
const { render, jsonLd, content, SITE } = await import(pathToFileURL("dist-ssr/entry-server.js").href);

const html = await readFile(page, "utf8");
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error(`prerender: ${marker} not found in ${page}`);
// The SSR build writes asset URLs root-relative; make them relative like the client build (base "./" in vite.config.js).
const body = (name, prefix) => render(name).replaceAll('"/assets/', `"${prefix}assets/`);
const out = html
  .replace(marker, `<div id="root">${body("home", "./")}</div>`)
  .replace("</head>", `<script type="application/ld+json">${jsonLd()}</script>\n</head>`);
await writeFile(page, out);

// /work/: the same shell one folder down, with its own title, description and canonical. No JSON-LD (its FAQ isn't here).
const url = `${SITE}work/`;
const title = `${content.nav[0].label} · ${content.name}`;
const description = content.sectionNotes.work;
const work = html
  .replaceAll('"./', '"../')
  .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
  .replace(/(<meta name="description" content=")[^"]*/, `$1${description}`)
  .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
  .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
  .replace(/(<meta property="og:title" content=")[^"]*/, `$1${title}`)
  .replace(/(<meta property="og:description" content=")[^"]*/, `$1${description}`)
  .replace(marker, `<div id="root">${body("work", "../")}</div>`);
await mkdir("dist/work", { recursive: true });
await writeFile("dist/work/index.html", work);

await rm("dist-ssr", { recursive: true, force: true });
console.log("prerender: wrote", page, "and dist/work/index.html");
