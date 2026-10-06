import { expect, test, type Page } from "@playwright/test";
import { BROWSER_THEME_COLOR } from "../src/estilos/temas/browserThemeColor";
import { COLOR_SCHEMES } from "./routes";

const html = (page: Page) => page.locator("html");
// On small screens the theme button lives inside the full-screen menu.
async function themeToggle(page: Page) {
  const openMenu = page.getByRole("button", { name: "Abrir menú" });
  const menuIsOpen = await page.getByRole("dialog", { name: "Menú" }).isVisible();
  if (!menuIsOpen && (await openMenu.isVisible())) await openMenu.click();
  return page.getByRole("button", { name: "Tema oscuro" });
}

const surface = (page: Page) =>
  page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--surface").trim().toLowerCase());

for (const colorScheme of COLOR_SCHEMES) {
  test(`without a saved choice the theme follows the system (${colorScheme})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    await page.goto("/");
    await expect(html(page)).toHaveAttribute("data-theme", colorScheme);
    expect(await surface(page)).toBe(BROWSER_THEME_COLOR[colorScheme]);
  });
}

test("keeps following the system while nothing is saved", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(html(page)).toHaveAttribute("data-theme", "dark");
});

test("the toggle switches the theme and remembers it after reloading", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const toggle = await themeToggle(page);
  await expect(toggle).toHaveAttribute("aria-pressed", "false");

  await toggle.click();
  await expect(html(page)).toHaveAttribute("data-theme", "dark");
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  expect(await surface(page)).toBe(BROWSER_THEME_COLOR.dark);

  await page.reload();
  await expect(html(page)).toHaveAttribute("data-theme", "dark");
  await expect(await themeToggle(page)).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator('meta[name="theme-color"]').first()).toHaveAttribute("content", BROWSER_THEME_COLOR.dark);

  await page.emulateMedia({ colorScheme: "dark" });
  await (await themeToggle(page)).click();
  await page.emulateMedia({ colorScheme: "light" });
  await page.reload();
  await expect(html(page)).toHaveAttribute("data-theme", "light");
});

test("the saved theme is applied before the page is painted", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.addInitScript(() => {
    localStorage.setItem("theme", "dark");
    document.addEventListener("DOMContentLoaded", () => {
      document.documentElement.setAttribute("data-theme-at-load", document.documentElement.getAttribute("data-theme") ?? "");
    });
  });
  await page.goto("/");
  await expect(html(page)).toHaveAttribute("data-theme-at-load", "dark");
});
