import {Page, expect, Browser, test, Locator} from '@playwright/test';

test.describe('Multiple Windows or tabs', () => {
    test('Handle multiple tabs', async( {browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://training.rcvacademy.com");
        const img:Locator = page.locator("//em[text()='Download The Mobile App!']/following::img");
        const [newPage] = await Promise.all([
            context.waitForEvent("page"),
            img.nth(0).click()
        ]);
        await expect(newPage.locator("//span[text()='Zenler']").nth(0)).toBeVisible();
        await newPage.locator("//span[text()='Install']/following::span").nth(0).click();
        const [newPage1] = await Promise.all([
            context.waitForEvent("page"),
            await newPage.locator("div:text('Facebook')").click()
        ])
        await expect(newPage1.locator("h2.uiHeaderTitle")).toHaveText("You are not logged in");
        await page.bringToFront();
        await newPage1.close();
        await newPage.close();
    })

    test('Handle New Window', async({browser}) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://practice-automation.com/window-operations/");
        const [newWindow] = await Promise.all([
            context.waitForEvent("page"),
            page.locator("button[onclick='newWindow()']").click()
        ])
        await newWindow.getByAltText("AI tutorials").click();
        console.log("new window");
        await newWindow.close();
        await page.close();
    })
})