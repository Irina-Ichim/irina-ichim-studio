"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import { CaretLeftIcon } from "@phosphor-icons/react";
import { IconButton } from "@/componentes/ui/IconButton";
import { UI_LABELS } from "@/contenido/interfaceLabels";
import { RAIL_ANIMATE_ATTRIBUTE, RAIL_ATTRIBUTE, RAIL_COLLAPSED, RAIL_STORAGE_KEY } from "./railState";

function readSavedCollapsed() {
  try {
    return localStorage.getItem(RAIL_STORAGE_KEY) === RAIL_COLLAPSED;
  } catch {
    return false;
  }
}

function setCollapsed(collapsed: boolean) {
  const root = document.documentElement;
  root.setAttribute(RAIL_ANIMATE_ATTRIBUTE, "");
  if (collapsed) root.setAttribute(RAIL_ATTRIBUTE, RAIL_COLLAPSED);
  else root.removeAttribute(RAIL_ATTRIBUTE);
  try {
    localStorage.setItem(RAIL_STORAGE_KEY, collapsed ? RAIL_COLLAPSED : "open");
  } catch {
    // Without storage the menu still collapses on this page; it just is not remembered.
  }
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: [RAIL_ATTRIBUTE] });
  return () => observer.disconnect();
}

function isCollapsedNow() {
  return document.documentElement.getAttribute(RAIL_ATTRIBUTE) === RAIL_COLLAPSED;
}

export function RailToggle() {
  const isCollapsed = useSyncExternalStore<boolean | undefined>(subscribe, isCollapsedNow, () => undefined);

  // Same Strict Mode remount as the theme: put back the attribute the inline script set.
  useLayoutEffect(() => {
    if (readSavedCollapsed() && !isCollapsedNow()) document.documentElement.setAttribute(RAIL_ATTRIBUTE, RAIL_COLLAPSED);
  }, []);

  return (
    <IconButton
      label={UI_LABELS.sideMenu}
      aria-expanded={isCollapsed === undefined ? undefined : !isCollapsed}
      onClick={() => setCollapsed(!isCollapsed)}
    >
      <CaretLeftIcon weight="duotone" aria-hidden className="size-5 rail-collapsed:rotate-180 rail-animate:transition-transform" />
    </IconButton>
  );
}
