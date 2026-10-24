import Flash from "./Flash/Flash.jsx";
import Summit from "./Summit/Summit.jsx";
import Minimal from "./Minimal/Minimal.jsx";
import Retro from "./Retro/Retro.jsx";

// Add a hero: build its folder, then replace a placeholder below. The switcher reads this list.
// `name` is the style name shown in the switcher; `key` is the URL value (?style=) and stays fixed so saved links work.
// Slot 1 is the conversion-first hero (see the Hero 1 Playbook); the site opens on the first built hero.
export const heroes = [
  { key: "flash", name: "Editorial", component: Flash },
  { key: "summit", name: "Cinematic", component: Summit },
  { key: "minimal", name: "Minimal", component: Minimal },
  { key: "retro", name: "Retro", component: Retro },
  { key: "hero-5", name: "Coming soon", component: null },
];
