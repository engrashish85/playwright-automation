import {test, expect, Locator} from '@playwright/test'

test.use({
    storageState:'test-data/auth.json'
});

test.describe("Storage session Implementation", () => {
    test("Storage session from setup", async ({page})=> {
        await page.goto("https://demowebshop.tricentis.com");
        console.log("logged in");
        expect (page.locator("a.ico-logout")).toBeVisible();
    })
})