import {Page, Locator, expect} from '@playwright/test';

export class CartPage {
    private readonly page: Page;
    private readonly productTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTitle = page.locator('tr[class="success"]>td:nth-child(2)');
    }

    async validateProductInCart(productName: string): Promise<boolean> {
        const productTitle = await this.productTitle.textContent();
        if (productTitle == productName) { 
            return true;
        } else {
            return false;
        }
    }
}