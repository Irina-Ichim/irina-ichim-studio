import { expect, test } from "@playwright/test";

test("declares favicon, app icons and manifest that resolve", async ({ page, request }) => {
  await page.goto("/");
  const hrefs = await page.locator('link[rel="icon"], link[rel="apple-touch-icon"], link[rel="manifest"]').evaluateAll((links) =>
    links.map((link) => link.getAttribute("href") ?? ""),
  );
  expect(hrefs.some((href) => href.includes("icon.svg"))).toBe(true);
  expect(hrefs.some((href) => href.includes("apple-icon"))).toBe(true);
  expect(hrefs.some((href) => href.includes("manifest"))).toBe(true);
  for (const href of hrefs) {
    expect((await request.get(href)).status(), href).toBe(200);
  }

  const manifest = (await (await request.get("/manifest.webmanifest")).json()) as { icons: { src: string }[] };
  for (const icon of manifest.icons) {
    expect((await request.get(icon.src)).status(), icon.src).toBe(200);
  }
});

test("shares an absolute social image with alternative text", async ({ page, request }) => {
  await page.goto("/");
  const image = await page.locator('meta[property="og:image"]').getAttribute("content");
  const alt = await page.locator('meta[property="og:image:alt"]').getAttribute("content");
  expect(image).toMatch(/^https:\/\/irina-ichim\.com\//);
  expect(alt).toBeTruthy();
  expect((await request.get(new URL(image ?? "").pathname)).status()).toBe(200);
});

test("the header logo links home with an accessible name", async ({ page }) => {
  await page.goto("/");
  const home = page.getByRole("link", { name: "Irina Ichim Studio, ir al inicio" });
  await expect(home).toBeVisible();
  await expect(home).toHaveAttribute("href", "/");
});
