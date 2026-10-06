export const RAIL_ATTRIBUTE = "data-rail";
export const RAIL_COLLAPSED = "collapsed";
export const RAIL_STORAGE_KEY = "menu";
export const RAIL_ANIMATE_ATTRIBUTE = "data-rail-animate";

// Inline in <head> next to the theme script, so a collapsed side menu is already narrow on
// the first paint instead of jumping after hydration.
export const RAIL_SCRIPT = `(function(){try{if(localStorage.getItem(${JSON.stringify(RAIL_STORAGE_KEY)})===${JSON.stringify(RAIL_COLLAPSED)})document.documentElement.setAttribute(${JSON.stringify(RAIL_ATTRIBUTE)},${JSON.stringify(RAIL_COLLAPSED)})}catch(e){}})()`;
