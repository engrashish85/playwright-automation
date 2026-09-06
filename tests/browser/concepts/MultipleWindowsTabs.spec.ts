import {Page, expect, Browser, test, Locator} from '@playwright/test';
import { L } from 'node_modules/@faker-js/faker/dist/index-BSUsvzGS';

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

    test("Multiple Windows", async({browser}) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://demo.automationtesting.in/Windows.html");
        const [newWindow] = await Promise.all([
            context.waitForEvent("page"),
            page.locator("div#Tabbed").getByRole("button", { name: /.*click.*/i }).click()
        ]);
        await expect(newWindow.getByRole("heading", {
            name: /Thank you for joining the Selenium and Appium 2026 Conference/
        })).toBeVisible();
        const [newWindow1] = await Promise.all([
            newWindow.waitForEvent("popup"),
            await newWindow.getByRole("link", {name: "Visit Conference Website for"}).click()
            // await newWindow.waitForLoadState('load')
        ]);
        // console.log(newWindow.url());
        await newWindow1.getByRole("link", {name: /Videos.*Photos.*/}).click();

        await context.close();
        await browser.close();
    });

    test("Multiple Windows1", async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://demo.automationtesting.in/Windows.html");

        const [page1] = await Promise.all([
            page.waitForEvent("popup"),
            page.getByRole("button", { name: "click" }).click()
        ]);

        const [page2] = await Promise.all([
            page1.waitForEvent("popup"),
            page1.getByRole("link", { name: "Visit Conference Website for" }).click()
        ]);

        await page2.getByRole("link", { name: "Videos & Photos", exact: true }).click();

        await context.close();
    });
});