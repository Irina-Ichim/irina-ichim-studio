import { expect, test } from "@playwright/test";
import { LEGAL_LINKS } from "../src/contenido/footer";
import { NAVIGATION } from "../src/contenido/navigation";

test("the footer closes every page with the call to action, the site map and the legal links", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");
  await expect(footer.getByRole("heading", { level: 2, name: "¿Tienes un proyecto?" })).toBeVisible();
  await expect(footer.getByRole("link", { name: /Hablemos/ })).toBeVisible();

  const services = NAVIGATION.find((item) => item.children)?.children ?? [];
  await expect(footer.getByRole("navigation", { name: "Servicios" }).getByRole("listitem")).toHaveCount(services.length);

  const legal = footer.getByRole("navigation", { name: "Información legal" });
  for (const link of LEGAL_LINKS) {
    const entry = legal.getByRole("link", { name: link.label, exact: link.available });
    if (link.available) await expect(entry).toHaveAttribute("href", link.href);
    else await expect(entry).toHaveAttribute("aria-disabled", "true");
  }
});

test("the full-width name is decorative and the seal is the link home", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");
  await expect(footer.getByRole("link", { name: "Irina Ichim Studio, ir al inicio" })).toHaveAttribute("href", "/");
  for (const svg of await footer.locator("svg").all()) {
    await expect(svg).toHaveAttribute("aria-hidden", "true");
  }
});

test("back to top takes the visitor to the top of the page", async ({ page }) => {
  await page.goto("/");
  const toTop = page.getByRole("contentinfo").getByRole("link", { name: "Volver arriba" });
  await toTop.scrollIntoViewIfNeeded();
  await expect(toTop).toHaveAttribute("href", "#top");
  await toTop.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});
