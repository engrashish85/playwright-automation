import {Page, Locator} from '@playwright/test';
import { ProductsPage } from './ProductsStorePage';

export class LoginPage {
  
    private readonly page: Page;
    private readonly loginLink: Locator;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.locator('#login2');
        this.usernameInput = page.locator('#loginusername');
        this.passwordInput = page.locator('#loginpassword');
        this.loginButton = page.locator('button', { hasText: 'Log in' });
    }

    // async login(username: string, password: string) : Promise<ProductsPage> {
    async login(username: string, password: string) {
        await this.loginLink.click();
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        // return new ProductsPage(this.page);
    }

    async clickGenericLink(linkText: string) {
        const link = this.page.locator('a.nav-link', { hasText: linkText });
        await link.click();
    }

}