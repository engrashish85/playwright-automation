import { Locator, Page } from '@playwright/test'
import { BasePage } from '@pages/BasePage'

export class LoginPage extends BasePage {
    private readonly loginForm = this.page.locator("div.login-form");
    private readonly username:Locator = this.loginForm.getByRole("textbox", { name: 'Email Address' });
    private readonly password:Locator = this.loginForm.getByRole("textbox", { name: 'Password' });
    private readonly loginButton:Locator = this.loginForm.getByRole("button", { name: 'Login'});

    async login(user:string, pass:string) {
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginButton.click();
    }
}