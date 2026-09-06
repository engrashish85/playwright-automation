import { Locator, Page } from '@playwright/test'
import { BasePage } from '@pages/BasePage'
import { ProductsPage } from './ProductsPage';
import { SignUpPage } from './SignUpPage';

export class LoginPage extends BasePage {
    private readonly loginForm = this.page.locator("div.login-form");
    private readonly username:Locator = this.loginForm.getByRole("textbox", { name: 'Email Address' });
    private readonly password:Locator = this.loginForm.getByRole("textbox", { name: 'Password' });
    private readonly loginButton:Locator = this.loginForm.getByRole("button", { name: 'Login'});
    private readonly signupName:Locator = this.page.getByPlaceholder("Name");
    private readonly emailAddress:Locator = this.page.getByRole("textbox", {name:'Email Address'}).and(this.page.locator(':visible'));
    private readonly signUpButton:Locator = this.page.getByRole("button", {name:'Signup'});

    async login(user:string, pass:string) {
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginButton.click();
    }

    async signup(name:string, emailAddress:string):Promise<SignUpPage> {
        await this.signupName.fill(name);
        await this.emailAddress.nth(1).highlight();
        await this.emailAddress.nth(1).fill(emailAddress);
        await this.signUpButton.click();
        return new SignUpPage(this.page);
    }
}