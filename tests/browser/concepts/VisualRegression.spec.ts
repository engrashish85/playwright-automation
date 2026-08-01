import {test, expect} from '@playwright/test'

test('Visual regression testing', async({page})=> {
    await page.goto("https://playwright.dev/docs/test-snapshots");
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot("mock1.png");
});

test('Visual Regression Testing mask', async({page})=> {
    await page.goto("https://the-internet.herokuapp.com/dynamic_content");
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot({
        mask:[
            page.locator("div#content.large-12")
        ]
    });
})