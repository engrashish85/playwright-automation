import {Page, test, expect} from '@playwright/test';

let page: Page;
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
});

test('Javascript Alerts', async () => {
    let title:String = await page.title();
    console.log("Page Title: ", title);
    await page.locator("button[onclick='jsAlert()']").click();
    let alertText = await page.locator("#result").textContent();
    console.log("Alert Text: ", alertText);

});

test('Javascript Confirm', async () => {
    let title:String = await page.title();
    console.log("Page Title: ", title);
    await page.locator("button[onclick='jsConfirm()']").click();
    let alertText = await page.locator("#result").textContent();
    console.log("Alert Text: ", alertText);

});

test('Javascript Prompt', async () => {
    let title:String = await page.title();
    console.log("Page Title: ", title);
    await page.getByText('Click for JS Prompt').click();

    // const dialogPromise = page.waitForEvent('dialog');
    // await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
    // const dialog = await dialogPromise;
    // await dialog.accept('Playwright'); // Enter text and click OK

    let alertText = await page.locator("#result").textContent();
    console.log("Alert Text: ", alertText);
});

test.afterAll(async ({ browser }) => {
    await page.close();
});