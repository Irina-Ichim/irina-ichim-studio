import { BROWSER_THEME_COLOR } from "./browserThemeColor";

export const THEMES = ["light", "dark"] as const;
export type Theme = (typeof THEMES)[number];

export const THEME_STORAGE_KEY = "theme";
export const THEME_ATTRIBUTE = "data-theme";
export const DARK_SCHEME_QUERY = "(prefers-color-scheme: dark)";
export const THEME_COLOR_OVERRIDE_ID = "theme-color-override";

// Runs inline in <head>, before the first paint, so it cannot import anything: every value
// it needs is serialised into the string. It sets data-theme from the saved choice or, if
// there is none, from the system (and keeps following the system while nothing is saved).
// A saved choice also gets its own theme-color meta, placed first so it wins over the two
// that follow the system; React re-inserts its metas if their content is edited.
export const THEME_SCRIPT = `(function(){
var root=document.documentElement,key=${JSON.stringify(THEME_STORAGE_KEY)},attr=${JSON.stringify(THEME_ATTRIBUTE)};
var colors=${JSON.stringify(BROWSER_THEME_COLOR)},query=matchMedia(${JSON.stringify(DARK_SCHEME_QUERY)});
function saved(){try{var t=localStorage.getItem(key);return t==="light"||t==="dark"?t:null}catch(e){return null}}
function syncMeta(t){var m=document.getElementById(${JSON.stringify(THEME_COLOR_OVERRIDE_ID)});if(!m){m=document.createElement("meta");m.id=${JSON.stringify(THEME_COLOR_OVERRIDE_ID)};m.name="theme-color";document.head.prepend(m)}m.content=colors[t]}
var choice=saved();
root.setAttribute(attr,choice||(query.matches?"dark":"light"));
if(choice)syncMeta(choice);
query.addEventListener("change",function(e){if(!saved())root.setAttribute(attr,e.matches?"dark":"light")});
})()`;
