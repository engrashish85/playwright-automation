import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.kmart.com/');
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('idli');
  await page.getByRole('combobox', { name: 'Search' }).press('Enter');
  await page.goto('https://www.kmart.com.au/');
  await page.getByTestId('header-service-message').getByRole('link', { name: 'Free Same Day Click & Collect' }).click();
  await page.getByTestId('autocomplete-input').fill('idli cooker');
  await page.getByTestId('autocomplete-input').press('Enter');
  await expect(page.getByText('https://errors.edgesuite.net/')).toBeVisible();
});