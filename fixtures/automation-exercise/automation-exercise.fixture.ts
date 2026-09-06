import {test as base, expect, Page } from '@playwright/test'
import { LoginPage } from '@pages/automation-exercise/LoginPage'
import testData from '@test-data/data.json'

type userCredentials = {
    username: string;
    password: string;
}

type fixtures = {
    loginPage:LoginPage;
    loggedInPage:LoginPage;
    credentials:userCredentials
};

export const test = base.extend<fixtures> ({

    credentials:[testData.users[0],{option:true}],

    loginPage: async({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    
    loggedInPage: async({page, loginPage, credentials}, use) => {
        await page.goto("https://automationexercise.com/login");
        await loginPage.login(credentials.username, credentials.password);
        await use(loginPage);
        await page.getByRole("link", {name:new RegExp(`.*Logout`)}).click();
    }

})

export { expect } from '@playwright/test';