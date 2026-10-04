import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const slugs = ['', 'products', 'operations', 'projects', 'about', 'quote', 'contact', '404'];
const viewports = [
  { width: 320, height: 568 },
  { width: 360, height: 800 },
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 844, height: 390 },
  { width: 768, height: 1024 },
  { width: 1280, height: 900 },
  { width: 1920, height: 1080 },
];

for (const locale of ['en', 'sq']) {
  for (const slug of slugs) {
    test(`${locale}/${slug || 'home'} responsive and accessible`, async ({ page }, testInfo) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(`${locale === 'sq' ? '/sq/' : '/'}${slug}`);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        'content',
        /machine3/,
      );
      await page.evaluate(() => document.fonts.ready);
      for (const viewport of viewports) {
        await page.setViewportSize(viewport);
        await page.evaluate(
          () =>
            new Promise<void>((resolve) =>
              requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
            ),
        );
        const layout = await page.evaluate(() => ({
          width: document.documentElement.scrollWidth,
          viewport: innerWidth,
          smallInputs: [...document.querySelectorAll('input,select,textarea')].filter(
            (element) => parseFloat(getComputedStyle(element).fontSize) < 16,
          ).length,
        }));
        expect(layout.width, `${locale}/${slug} at ${viewport.width}px`).toBeLessThanOrEqual(
          layout.viewport,
        );
        expect(layout.smallInputs).toBe(0);
        if ([390, 1280].includes(viewport.width)) {
          await page.screenshot({
            path: testInfo.outputPath(`${locale}-${slug || 'home'}-${viewport.width}.png`),
            fullPage: true,
          });
        }
      }
      await page.setViewportSize({ width: 390, height: 844 });
      await page.locator('picture img').evaluateAll((images) =>
        images.forEach((image) => {
          (image as HTMLImageElement).loading = 'eager';
        }),
      );
      await expect
        .poll(() =>
          page
            .locator('picture img')
            .evaluateAll((images) =>
              images.every(
                (image) =>
                  (image as HTMLImageElement).complete &&
                  (image as HTMLImageElement).naturalWidth > 0,
              ),
            ),
        )
        .toBeTruthy();
      const result = await new AxeBuilder({ page })
        .exclude('iframe')
        .options({ rules: { 'label-content-name-mismatch': { enabled: true } } })
        .analyze();
      expect(
        result.violations.map((violation) => ({
          id: violation.id,
          nodes: violation.nodes.map((node) => node.target),
        })),
      ).toEqual([]);
      expect(errors).toEqual([]);
    });
  }

  test(`${locale} mobile navigation and language continuity`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto(`${locale === 'sq' ? '/sq' : ''}/products?product=washed-sand`);
    await page.locator('.menu-toggle').click();
    await expect(page.locator('#mobile-menu')).toBeVisible();
    await expect(page.locator('body')).toHaveClass(/modal-open/);
    await page.keyboard.press('Escape');
    await expect(page.locator('#mobile-menu')).not.toBeVisible();
    await expect(page.locator('.menu-toggle')).toBeFocused();
    const other = locale === 'sq' ? 'en' : 'sq';
    await page.locator(`.mobile-actions [data-language][hreflang="${other}"]`).click();
    await expect(page).toHaveURL(
      new RegExp(`${other === 'sq' ? '/sq' : ''}/products/?\\?product=washed-sand`),
    );
    await expect(page.locator('html')).toHaveAttribute('lang', other);
  });

  test(`${locale} product and project filters`, async ({ page }) => {
    const prefix = locale === 'sq' ? '/sq' : '';
    await page.goto(`${prefix}/products`);
    await page.locator('[data-filter="sand"]').click();
    await expect(page.locator('.product-card:visible')).toHaveCount(2);
    await page.locator('[data-filter="all"]').click();
    await expect(page.locator('.product-card:visible')).toHaveCount(10);
    await page.locator('#washed-sand .card-link').click();
    await expect(page.locator('#product')).toHaveValue('washed-sand');
    await page.goto(`${prefix}/projects`);
    await page.locator('[data-filter="coastal"]').click();
    await expect(page.locator('.project-card:visible')).toHaveCount(1);
    await page.locator('[data-filter="all"]').click();
    await expect(page.locator('.project-card:visible')).toHaveCount(6);
  });

  test(`${locale} quote validation and honest demo success`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(`${locale === 'sq' ? '/sq' : ''}/quote?product=stone-8-16`);
    await expect(page.locator('#product')).toHaveValue('stone-8-16');
    await expect(page.locator('.bottom-bar')).toHaveCount(0);
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('#name-error')).not.toBeEmpty();
    await expect(page.locator('#name')).toBeFocused();
    await page.locator('#name').fill('Test Contractor');
    await page.locator('#phone').fill('+355 69 200 2400');
    await page.locator('#email').fill('invalid');
    await page.locator('#quantity').fill('0');
    await page.locator('#location').fill('Tiranë');
    await page.locator('#date').fill('2020-01-01');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('#email-error')).not.toBeEmpty();
    await expect(page.locator('#quantity-error')).not.toBeEmpty();
    await expect(page.locator('#date-error')).not.toBeEmpty();
    await page.locator('#email').fill('demo@example.com');
    await page.locator('#quantity').fill('12,5');
    await page.locator('#date').fill('2030-10-20');
    await page.locator('#consent').check();
    let submissions = 0;
    page.on('request', (request) => {
      if (request.method() === 'POST') submissions++;
    });
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('.success')).toBeVisible();
    await expect(page.locator('.success')).toBeFocused();
    expect(submissions).toBe(0);
    await page.locator('[data-reset]').click();
    await expect(page.locator('#name')).toHaveValue('');
    await expect(page.locator('form')).toBeVisible();
  });

  test(`${locale} contact form and lightbox keyboard`, async ({ page }) => {
    const prefix = locale === 'sq' ? '/sq' : '';
    await page.goto(`${prefix}/contact`);
    await page.locator('#name').fill('Test Contractor');
    await page.locator('#phone').fill('+355692002400');
    await page.locator('#email').fill('demo@example.com');
    await page.locator('#message').fill('A demonstration message.');
    await page.locator('#consent').check();
    await page.locator('[type="submit"]').click();
    await expect(page.locator('.success')).toBeVisible();
    await page.goto(`${prefix}/projects`);
    const opener = page.locator('[data-gallery-index="0"]');
    await opener.click();
    await expect(page.locator('#lightbox')).toBeVisible();
    const first = await page.locator('#lightbox-image').getAttribute('src');
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#lightbox-image')).not.toHaveAttribute('src', first!);
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('#lightbox-image')).toHaveAttribute('src', first!);
    await page.keyboard.press('Escape');
    await expect(page.locator('#lightbox')).not.toBeVisible();
    await expect(opener).toBeFocused();
  });
}

test('localized missing route and invalid product parameter', async ({ page }) => {
  await page.goto('/sq/this-does-not-exist');
  await expect(page.locator('html')).toHaveAttribute('lang', 'sq');
  await expect(page).toHaveURL(/\/sq\/404\/?$/);
  await page.goto('/quote?product=not-a-product');
  await expect(page.locator('#product')).toHaveValue('');
});
