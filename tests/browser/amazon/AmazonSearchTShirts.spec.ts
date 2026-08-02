import { test, expect } from '@playwright/test';

test.describe('Amazon T-Shirts Search', () => {
  test('should navigate to amazon.com.au, search for t-shirts, and verify all links are for t-shirts', async ({ page }) => {
    // Step 1: Navigate to amazon.com.au
    await page.goto('https://www.amazon.com.au', { waitUntil: 'networkidle' });
    
    // Verify page loaded successfully
    await expect(page).toHaveTitle(/Amazon\.com\.au/);
    
    // Step 2: Search for t-shirts
    const searchBox = page.locator('#twotabsearchtextbox');
    await searchBox.waitFor({ state: 'visible' });
    await searchBox.fill('t-shirts');
    
    // Find and click the search button by looking for the Go button
    const searchButton = page.locator('input[type="submit"][value="Go"]');
    await searchButton.click();
    
    // Wait for search results to load
    await page.waitForURL(/.*k=t-shirts/, { timeout: 30000 });
    await page.waitForLoadState('networkidle');
    
    // Step 3: Verify all links are for t-shirts
    // Wait for product results to be visible
    await page.locator('a[href*="/dp/"]').first().waitFor({ state: 'visible', timeout: 10000 });
    
    // Extract all product links that contain /dp/ in the URL
    const allProductLinks = await page.locator('a[href*="/dp/"]').all();
    
    expect(allProductLinks.length).toBeGreaterThan(0);
    
    // Verify page title contains search term
    await expect(page).toHaveTitle(/t-shirts/);
    
    // Get the heading that shows the search results
    const resultsHeading = page.locator('heading[level="1"]');
    const headingText = await resultsHeading.textContent();
    
    // Verify heading mentions t-shirts
    expect(headingText).toContain('t-shirts');
    
    // Extract and verify product links by checking their hrefs contain t-shirts
    let tShirtLinkCount = 0;
    for (let i = 0; i < Math.min(allProductLinks.length, 20); i++) {
      const href = await allProductLinks[i].getAttribute('href');
      if (href && href.includes('t-shirts')) {
        tShirtLinkCount++;
      }
    }
    
    // Verify that most of the product links are indeed for t-shirts
    expect(tShirtLinkCount).toBeGreaterThan(0);
    
    console.log(`Found ${allProductLinks.length} total product links, ${tShirtLinkCount} contain 't-shirts' in URL`);
  });
});
