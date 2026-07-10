import { test, expect, Locator } from '@playwright/test'
import * as fs from 'fs'

test.describe('Storage Session', () => {
    test('Storage session', async ({page}) => {
        const file = fs.readFileSync("test-data/data.json", 'utf-8');
        const loginData:any = JSON.parse(file);
        await page.goto("https://demowebshop.tricentis.com/");
        await page.locator("a.ico-login").click();
        await page.locator("input.email").fill(loginData.demoBlazeLoginData.username);
        await page.locator("input.password").fill(loginData.demoBlazeLoginData.password);
        await page.locator("input[type='submit'][value='Log in']").click();
        await page.context().storageState({path:'test-data/auth.json'});
    })
})