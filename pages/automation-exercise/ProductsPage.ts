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
    private readonly productCategoryParent = this.page.locator("div.category-products");
    private readonly subCategoryParent = this.page.locator("div.panel-body:visible");
    private readonly cartWindow = this.page.locator("div.modal-content")
    private readonly cartWindowHeader = this.cartWindow.getByRole("heading");
    private readonly cartWindowParagraph = this.cartWindow.getByRole("paragraph");
    private readonly cartWindowButton = this.cartWindow.getByRole("button", {name:'Continue Shopping'});
    private readonly viewCartLink = this.cartWindow.getByRole("link", {name:'View Cart'});

    async retrieveProductDetails(productName:string|number):Promise<Map<string, string>> {
        const productDetails = new Map<string, string>();
        let productPrice = '';
        let productDescription = '';
        if (typeof productName === 'number') {
            productPrice = await this.productsPrice.nth(productName).textContent() ?? '';
            productDescription = await this.productDescription.nth(productName).textContent() ?? '';
        } else {
            const productLocator = this.products.filter({hasText:productName});
            productPrice = await productLocator.getByRole("heading").last().textContent() ?? '';
            productDescription = await productLocator.getByRole("paragraph").last().textContent() ?? '';
        }
        productDetails.set("productPrice", productPrice);
        productDetails.set("productDescription", productDescription);
        return productDetails;
    }

    async viewProduct(productName:string|number):Promise<void> {
        if (typeof productName == 'number') {
            await this.productsImage.nth(productName).hover();
            await this.viewProductLink.nth(productName).click();
        } else {
            const productLocator = this.products.filter({hasText:productName});
            await productLocator.getByRole("link", { name: "View Product" }).click();
        }    
    }

    async addProductToCart(productName:string|number):Promise<void> {
        let productLocator:Locator;
        if (typeof productName == 'number') {
            productLocator = this.products.nth(productName);
        } else {
            productLocator = this.products.filter({hasText:productName});
        }
        await productLocator.getByRole("img").hover();
        await productLocator.getByText("Add to cart").first().click();
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

    async clickProductCategory(productCategory:string, productSubCategory:string) {
        await this.productCategoryParent.getByRole("link", {name:new RegExp(`.*${productCategory}.*`)}).click();
        await this.subCategoryParent.waitFor({state:'visible', timeout:5000});
        await this.subCategoryParent.getByRole("link", {name:new RegExp(`${productSubCategory}.*`)}).click();
    }

    async validateCart():Promise<void> {
        await this.cartWindow.waitFor({state:'visible', timeout:5000});
        expect.soft(await this.cartWindowHeader.textContent()).toBe('Added!');
        console.log(await this.cartWindowParagraph.first().textContent());
        expect.soft(await this.cartWindowParagraph.first().textContent()).toBe('Your product has been added to cart.');
        expect.soft(this.viewCartLink).toBeVisible();
        expect.soft(this.cartWindowButton).toBeVisible();
    }

    async clickCartLink():Promise<void> {
        await this.viewCartLink.click();
    }
}