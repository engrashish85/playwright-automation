import { test, expect } from '@fixtures/automation-exercise/automation-exercise.fixture'
import { LoginPage } from '@pages/automation-exercise/LoginPage'
import 'dotenv/config'

test('Register User', async({page}) => {
    await page.goto("https://automationexercise.com/login");
    const loginPage = new LoginPage(page);
    const signupPage = await loginPage.signup(process.env.ae_name!, process.env.ae_username!);
    const accountConfirmationPage = await signupPage.enterAccountInformation();
    accountConfirmationPage.validateConfirmation();
})