import {test as base, expect, Page } from '@playwright/test'
import { LoginPage } from '@pages/automation-exercise/LoginPage'


type fixtures = {
    loginPage:LoginPage;
}

export const test = base.extend<fixtures> ({
    loginPage: async({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    }
})

export { expect } from '@playwright/test';