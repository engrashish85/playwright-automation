import {test, Locator, expect} from '@playwright/test'

test('Verify subscription', async({page}) => {
    await page.goto("https://automationexercise.com/");
    await page.getByRole("link", {name:/.*Home/}).waitFor({state:'visible', timeout:20000});
    await expect.soft(page.locator("div.footer-widget").getByRole("heading", {name:'Subscription'})).toBeVisible();
    await page.getByRole("textbox", {name:'Your email address'}).fill("a@a.com");
    await page.locator("button#subscribe").click();
    await expect.soft(page.getByText("You have been successfully subscribed!")).toBeVisible();
})