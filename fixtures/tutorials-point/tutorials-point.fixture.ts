import { WebTablesPage } from '@pages/tutorials-point/WebTablesPage'
import {test as base, expect} from '@playwright/test'

type fixtures = {
    webTablesPage:WebTablesPage
}

export const test = base.extend<fixtures> ({
    webTablesPage: async({page}, use) => {
        const webTablesPage = new WebTablesPage(page);
        await page.goto("/selenium");
        await page.getByRole('link', {name:/Selenium \- Automation Practice/}).click();
        await webTablesPage.navigatetoWebTablesPage();
        await use(webTablesPage);
    }
})

export {expect} from '@playwright/test'