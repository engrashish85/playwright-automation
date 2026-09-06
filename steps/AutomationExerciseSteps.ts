import { createBdd } from 'playwright-bdd'
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd()

Given('I open browser', async({page}) => {
    await page.goto("https://automationexercise.com/");
});

When('I navigate to home page', async({page}) => {
    await page.getByRole("link", {name:/.*Home/}).waitFor({state:'visible', timeout:20000});
});

When('I validate subscription element in the footer', async({page}) => {
    await expect.soft(page.locator("div.footer-widget").getByRole("heading", {name:'Subscription'})).toBeVisible();
});

When('I subscribe to email {string}', async({page}, email)=> {
    await page.getByRole("textbox", {name:'Your email address'}).fill(email);
    await page.locator("button#subscribe").click();
});

Then('I validate subscription', async({page})=> {
    await expect.soft(page.getByText("You have been successfully subscribed!")).toBeVisible();
})




