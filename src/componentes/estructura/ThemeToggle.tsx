"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { IconButton } from "@/componentes/ui/IconButton";
import { UI_LABELS } from "@/contenido/interfaceLabels";
import { BROWSER_THEME_COLOR } from "@/estilos/temas/browserThemeColor";
import {
  DARK_SCHEME_QUERY,
  THEME_ATTRIBUTE,
  THEME_COLOR_OVERRIDE_ID,
  THEME_STORAGE_KEY,
  THEMES,
  type Theme,
} from "@/estilos/temas/themeScript";

function isTheme(value: string | null | undefined): value is Theme {
  return THEMES.some((theme) => theme === value);
}

function readSavedTheme(): Theme | null {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(saved) ? saved : null;
  } catch {
    return null;
  }
}

function systemTheme(): Theme {
  return matchMedia(DARK_SCHEME_QUERY).matches ? "dark" : "light";
}

function saveTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Without storage the choice still applies to this page; it just is not remembered.
  }
  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
  syncThemeColor(theme);
}

function syncThemeColor(theme: Theme) {
  let meta = document.getElementById(THEME_COLOR_OVERRIDE_ID);
  if (!(meta instanceof HTMLMetaElement)) {
    meta = document.createElement("meta");
    meta.id = THEME_COLOR_OVERRIDE_ID;
    meta.setAttribute("name", "theme-color");
    document.head.prepend(meta);
  }
  meta.setAttribute("content", BROWSER_THEME_COLOR[theme]);
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: [THEME_ATTRIBUTE] });
  return () => observer.disconnect();
}

function isDarkActive() {
  return document.documentElement.getAttribute(THEME_ATTRIBUTE) === "dark";
}

export function ThemeToggle() {
  // The server cannot know the theme, so the pressed state is left out until hydration
  // rather than announcing a wrong one.
  const isDark = useSyncExternalStore<boolean | undefined>(subscribe, isDarkActive, () => undefined);

  // React Strict Mode remounts <html> in development and drops the attribute set by the
  // inline script; this puts it back. In production the attribute is already there.
  useLayoutEffect(() => {
    if (!document.documentElement.hasAttribute(THEME_ATTRIBUTE)) {
      document.documentElement.setAttribute(THEME_ATTRIBUTE, readSavedTheme() ?? systemTheme());
    }
  }, []);

  return (
    <IconButton label={UI_LABELS.darkTheme} aria-pressed={isDark} onClick={() => saveTheme(isDark ? "light" : "dark")}>
      <MoonIcon weight="duotone" aria-hidden className="size-6 theme-dark:hidden" />
      <SunIcon weight="duotone" aria-hidden className="hidden size-6 theme-dark:block" />
    </IconButton>
  );
}
