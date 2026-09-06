import { Page } from '@playwright/test'

type AriaRole = Parameters<Page['getByRole']>[0];

export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickElement(elementType: AriaRole, text:string):Promise<void> {
        await this.page.getByRole(elementType, {name:new RegExp(`.*${text}.*`)}).click();
    }
    

}