import { test, expect } from '@fixtures/automation-exercise/automation-exercise.fixture'
import 'dotenv/config'
import { Page } from '@playwright/test'

test('Login', async({ loginPage, page }) => { 
    await page.goto("https://automationexercise.com/");
    await page.getByRole("link", {name: /.*Signup.*Login/}).click();
    await loginPage.login(process.env.ae_username!, process.env.ae_password!);
    await expect(page.getByRole("link", {name:' Logout'})).toBeVisible();
    await page.context().storageState({path:'test-data/storage-state/ae_auth.json'});
});