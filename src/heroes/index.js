import Flash from "./Flash/Flash.jsx";
import Summit from "./Summit/Summit.jsx";
import Minimal from "./Minimal/Minimal.jsx";

// Add a hero: build its folder, then replace a placeholder below. The switcher reads this list.
// Slot 1 is the conversion-first hero (see the Hero 1 Playbook); the site opens on the first built hero.
export const heroes = [
  { key: "flash", name: "Flash", component: Flash },
  { key: "summit", name: "Summit", component: Summit },
  { key: "minimal", name: "Minimal", component: Minimal },
  { key: "hero-4", name: "Coming soon", component: null },
  { key: "hero-5", name: "Coming soon", component: null },
];
