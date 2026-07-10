import { chromium, test } from '@playwright/test';

test.describe('Playwright without fixture', () => {
  test('Playwright without fixture', async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.google.com');
    console.log('title is - ', await page.title());

    await page.waitForTimeout(3000);
    await browser.close();
  });
});
