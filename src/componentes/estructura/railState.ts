export const RAIL_ATTRIBUTE = "data-rail";
export const RAIL_COLLAPSED = "collapsed";
export const RAIL_OPEN = "open";
export const RAIL_STORAGE_KEY = "menu";
export const RAIL_ANIMATE_ATTRIBUTE = "data-rail-animate";

// Inline in <head> next to the theme script, so the side menu is already narrow on the first
// paint instead of jumping after hydration. It starts collapsed unless the visitor opened it;
// without storage it stays collapsed too.
export const RAIL_SCRIPT = `(function(){var open=false;try{open=localStorage.getItem(${JSON.stringify(RAIL_STORAGE_KEY)})===${JSON.stringify(RAIL_OPEN)}}catch(e){}if(!open)document.documentElement.setAttribute(${JSON.stringify(RAIL_ATTRIBUTE)},${JSON.stringify(RAIL_COLLAPSED)})})()`;
