import {Page, Locator, expect} from '@playwright/test';

export class CartPage {
    private readonly page: Page;
    private readonly productTitle: Locator;
    private readonly deleteLink:Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTitle = page.locator('tr[class="success"]>td:nth-child(2)');
        this.deleteLink = page.getByRole('link', {name:'Delete'});
    }

    async validateProductInCart(productName: string): Promise<boolean> {
        const productTitle = await this.productTitle.textContent();
        if (productTitle == productName) { 
            return true;
        } else {
            return false;
        }
    }

    async deleteItemsFromCart() {
        const deleteLinksItemsCount = await this.deleteLink.count();
        for (let i = 0; i < deleteLinksItemsCount; i++) {
            await this.deleteLink.nth(i).click();
        }
    }
}