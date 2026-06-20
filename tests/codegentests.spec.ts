import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByRole('combobox', { name: 'Search' }).fill('mobiles');

  //default screenshot with timestamp
  await page.screenshot({ path: 'screenshots/'+ Date.now() + '_screenshot.png' });

  //full page screenshot
  await page.screenshot({ path: 'screenshots/'+ Date.now() + '_screenshot.png', fullPage: true});

  //Element screenshot
  await page.getByRole('combobox', { name: 'Search' }).screenshot({ path: 'screenshots/'+ Date.now() + '_screenshot.png' });
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.goto('https://www.google.com/search?q=mobiles&sca_esv=b240d25f7bebc0be&source=hp&ei=1XUtavTlMIeO2roP6pr6mAg&iflsig=AFdpzrgAAAAAai2D5YBxe1j4osRnO75CybM_seCd20tl&ved=0ahUKEwi0pJbawoSVAxUHh1YBHWqNHoMQ4dUDCCI&uact=5&oq=mobiles&gs_lp=Egdnd3Mtd2l6Igdtb2JpbGVzMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDILEC4YgAQYxwEY0QMyBRAAGIAEMgUQABiABEjrOFAAWKQccAN4AJABAJgBjQOgAacQqgEHMC4zLjMuM7gBA8gBAPgBAZgCDKACjhLCAggQABiABBixA8ICCxAAGIAEGLEDGIMBwgIOEC4YgAQYigUYsQMYgwHCAgsQLhiABBixAxiDAcICDhAuGIAEGLEDGMcBGNEDwgIaEC4YgAQYigUYjQYYsQMYgwEYxwEYrwEYjgXCAggQLhiABBixA8ICCxAuGIAEGMcBGK8BwgIHEAAYgAQYCsICBRAuGIAEwgIMEAAYgAQYChgLGLEDwgIIEAAYgAQYyQPCAgsQABiABBiKBRiSA5gDAJIHCTMuMy4zLjIuMaAHzkmyBwkwLjMuMy4yLjG4B9gRwgcHMi0zLjUuNMgHwAGACAE&sclient=gws-wiz&sei=4XUtarnwDNjd2roPgdCdgQg');
  await page.getByRole('link', { name: 'Unlocked filter. Not selected.' }).click();
});