import {Page, Locator, expect} from '@playwright/test';

export class ProductsPage {
    private readonly page: Page;
    private readonly phonesLink: Locator;
    private readonly laptopsLink: Locator;
    private readonly monitorsLink: Locator;
    private readonly addToCartButton: Locator;
    private readonly productName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.phonesLink = page.locator('a', { hasText: 'Phones' });
        this.laptopsLink = page.locator('a', { hasText: 'Laptops' });
        this.monitorsLink = page.locator('a', { hasText: 'Monitors' });
        this.addToCartButton = page.getByText('Add to cart')
        this.productName = page.locator('.name');
    }

    async navigateToPhones() {
        await this.phonesLink.click();
    }

    async navigateToLaptops() {
        await this.laptopsLink.click();
    }

    async navigateToMonitors() {
        await this.monitorsLink.click();
    }

    async addProductToCart(productType: string, productName: string) {
        switch (productType.toLowerCase()) {
            case "phones":
                await this.navigateToPhones();
                break;
            case "laptops":
                await this.navigateToLaptops();
                break;
            case "monitors":
                await this.navigateToMonitors();
                break;
        }
        const productLink = this.page.locator('.card-title a', { hasText: productName });
        await productLink.click();
        const productTitle = await this.productName.textContent();
        expect(productTitle).toBe(productName);
        await this.addToCartButton.click();
        
        this.page.once('dialog', async dialog => {
            expect(dialog.type()).toBe('alert');
            expect(dialog.message()).toBe('Product added');
            await dialog.accept();
        });
    }


}