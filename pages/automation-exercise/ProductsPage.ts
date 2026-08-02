import { BasePage } from '@pages/BasePage';
import {Page, Locator, expect} from '@playwright/test'

export class ProductsPage extends BasePage {
    private readonly shopMenu = this.page.locator("div.shop-menu");
    private readonly products = this.page.locator("div.features_items").locator("div.product-image-wrapper");
    private readonly viewProductLink = this.products.getByRole("link", { name: 'View Product'});
    private readonly productsImage = this.products.getByRole("img");
    private readonly productsPrice = this.products.getByRole("heading");
    private readonly productDescription = this.products.getByRole("paragraph");
    private readonly productInformation = this.page.locator("div.product-information");

    async viewProduct(productName:string|number):Promise<Map<string, string>> {
        const productDetails = new Map<string, string>();
        let productPrice = '';
        let productDescription = '';
        if (typeof productName === 'number') {
            productPrice = await this.productsPrice.first().textContent() ?? '';
            productDescription = await this.productDescription.first().textContent() ?? '';
            await this.productsImage.first().hover();
            await this.viewProductLink.first().click();
        } else {
            const productLocator = this.products.filter({hasText:productName});
            productPrice = await productLocator.getByRole("heading").textContent() ?? '';
            productDescription = await productLocator.getByRole("paragraph").textContent() ?? '';
            await productLocator.getByRole("link", { name: "View Product" }).click();
        }
        productDetails.set("productPrice", productPrice);
        productDetails.set("productDescription", productDescription);
        return productDetails;
    }

    async clickNavigationLink(linkText:string) {
        await this.shopMenu.getByRole('link', { name: new RegExp(`.*${linkText}`) }).click();
    }

    async validateProductDetails(productDetails:Map<string, string>):Promise<void> {
        const actualProductHeading = await this.productInformation.getByRole("heading").first().textContent();
        const actualProduct = await this.productInformation.locator('span>span').first().textContent();
        expect (productDetails.get("productDescription")).toBe(actualProductHeading);
        expect (productDetails.get("productPrice")).toBe(actualProduct);
    }
}

