import {test, expect, chromium} from '@playwright/test'

test('Multiple browser context', async ()=> {
    const browser = await chromium.launch();

    //Multiple contexts
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();

    //Multiple pages
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();

    await page1.goto("https://automationexercise.com");
    await page2.goto("http://google.com");

    //Closing contexts
    await context1.close();
    await context2.close();

    // add cleanup
    await browser.close();

})

test('Multiple frames using framelocator', async () => {
    const browser = await chromium.launch();
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();
    await page.goto("https://the-internet.herokuapp.com/")
    await page.getByRole("link", { name: "Nested Frames" }).click();
    const frame = page.frameLocator('[name="frame-top"]').frameLocator("[name='frame-left']");
    // let count = await frame.count();
    await frame.locator("body").highlight();
    const count = await frame.locator("body").count();
    await expect(frame.locator("body")).toHaveText("LEFT");
    await browserContext.close();
    await browser.close();
})

test('Multiple frames using child frames', async () => {
    const browser = await chromium.launch();
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();
    await page.goto("https://the-internet.herokuapp.com/")
    await page.getByRole("link", { name: "Nested Frames" }).click();
    await page.waitForLoadState();
    const frame = page.frame({name:'frame-top'}).childFrames().find(frame => frame.name() === "frame-left");
    await frame.locator("body").highlight();
    const count = await frame.locator("body").count();
    await expect(frame.locator("body")).toHaveText("LEFT");
    await browserContext.close();
    await browser.close();
})

