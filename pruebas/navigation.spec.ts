import { expect, test, type Locator, type Page } from "@playwright/test";
import { NAVIGATION } from "../src/contenido/navigation";

const RAIL_VIEWPORT = { width: 1366, height: 768 };
const COMPACT_VIEWPORT = { width: 844, height: 390 };
const SERVICES_INDEX = NAVIGATION.findIndex((item) => item.children);
const SERVICES = NAVIGATION[SERVICES_INDEX];

const mainNavigation = (scope: Page | Locator) => scope.getByRole("navigation", { name: "Principal" });
const sections = (nav: Locator) => nav.locator(":scope > ol > li");
const servicesPanel = (nav: Locator) => sections(nav).nth(SERVICES_INDEX).locator(":scope > div[id]");

test("the side rail lists every section, marks the current page and announces the ones still to come", async ({ page }) => {
  await page.setViewportSize(RAIL_VIEWPORT);
  await page.goto("/");
  const nav = mainNavigation(page);
  await expect(nav).toBeVisible();
  await expect(sections(nav)).toHaveCount(NAVIGATION.length);

  for (const item of NAVIGATION) {
    const entry = nav.getByRole("link", { name: item.label, exact: item.available }).first();
    if (item.available) {
      await expect(entry).toHaveAttribute("href", item.href);
    } else {
      await expect(entry).toHaveAttribute("aria-disabled", "true");
      await expect(entry).not.toHaveAttribute("href");
      await expect(entry).toContainText("próximamente");
    }
  }
  await expect(nav.getByRole("link", { name: "Inicio", exact: true })).toHaveAttribute("aria-current", "page");
  await expect(page.getByRole("button", { name: "Abrir menú" })).toBeHidden();
});

test("the services panel opens on hover, closes when the pointer leaves and with its X", async ({ page }) => {
  test.skip(!SERVICES?.children, "no section with pages");
  await page.setViewportSize(RAIL_VIEWPORT);
  await page.goto("/");
  const nav = mainNavigation(page);
  const panel = servicesPanel(nav);
  const toggle = nav.getByRole("button", { name: `Páginas de ${SERVICES?.label ?? ""}` });

  await sections(nav).nth(SERVICES_INDEX).hover();
  await expect(panel).toHaveCSS("opacity", "1");
  for (const child of SERVICES?.children ?? []) {
    await expect(panel.getByRole("link", { name: child.label, exact: false })).toBeVisible();
  }

  await page.mouse.move(900, 600);
  await expect(panel).toHaveCSS("opacity", "0");

  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(panel).toHaveCSS("opacity", "1");
  await panel.getByRole("button", { name: `Cerrar ${SERVICES?.label ?? ""}` }).click();
  await expect(panel).toHaveCSS("opacity", "0");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
});

test("the side rail collapses to numbers and remembers it after reloading", async ({ page }) => {
  await page.setViewportSize(RAIL_VIEWPORT);
  await page.goto("/");
  const collapse = page.getByRole("button", { name: "Menú lateral" });
  await expect(collapse).toHaveAttribute("aria-expanded", "true");

  await collapse.click();
  await expect(page.locator("html")).toHaveAttribute("data-rail", "collapsed");
  await expect(collapse).toHaveAttribute("aria-expanded", "false");
  await expect(mainNavigation(page).getByRole("link", { name: "Inicio", exact: true })).toBeVisible();

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-rail", "collapsed");
  await page.getByRole("button", { name: "Menú lateral" }).click();
  await expect(page.locator("html")).not.toHaveAttribute("data-rail");
});

test("the skip link is the first stop and leads to the main content", async ({ page, browserName }) => {
  test.skip(browserName === "webkit", "Safari only tabs to links when the visitor turns it on in its settings");
  await page.setViewportSize(RAIL_VIEWPORT);
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Saltar al contenido" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await expect(skip).toHaveAttribute("href", "#contenido");
  await expect(page.locator("main#contenido")).toHaveCount(1);
});

test("when the rail does not fit, the menu button opens a modal navigation that Escape closes", async ({ page }) => {
  await page.setViewportSize(COMPACT_VIEWPORT);
  await page.goto("/");
  await expect(mainNavigation(page)).toBeHidden();

  const open = page.getByRole("button", { name: "Abrir menú" });
  await open.click();
  const menu = page.getByRole("dialog", { name: "Menú" });
  await expect(menu).toBeVisible();
  const nav = mainNavigation(menu);
  await expect(sections(nav)).toHaveCount(NAVIGATION.length);
  await expect(menu.getByRole("button", { name: "Tema oscuro" })).toBeVisible();

  const toggle = nav.getByRole("button", { name: `Páginas de ${SERVICES?.label ?? ""}` });
  await toggle.click();
  await expect(servicesPanel(nav)).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(open).toBeFocused();

  await open.click();
  await menu.getByRole("button", { name: "Cerrar menú" }).click();
  await expect(menu).toBeHidden();
});
