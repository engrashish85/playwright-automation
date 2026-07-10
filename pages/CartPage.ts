import {Page, Locator, expect} from '@playwright/test';

export class CartPage {
    private readonly page: Page;
    private readonly productTitle: Locator;
    private readonly deleteLink:Locator;
    private readonly productsTable:Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTitle = page.locator('tr[class="success"]>td:nth-child(2)');
        this.deleteLink = page.getByRole('link', {name:'Delete'});
        this.productsTable = page.locator('tbody#tbodyid');
    }

    async validateProductInCart(productName: string): Promise<boolean> {
        await this.productsTable.waitFor({ state:'visible', timeout:20000 });
        const productTitle = await this.productTitle.textContent();
        if (productTitle == productName) { 
            return true;
        } else {
            return false;
        }
    }

    async deleteItemsFromCart() {
        try {
            await this.productsTable.waitFor({ state:'visible', timeout:10000 });
            const deleteLinksItemsCount = await this.deleteLink.count();
            for (let i = 0; i < deleteLinksItemsCount; i++) {
                await this.deleteLink.first().click();
                await this.page.waitForLoadState('domcontentloaded');
            }
        } catch {
            console.log("Skipping the step since delete links have been already deleted");
        }
        
    }
}