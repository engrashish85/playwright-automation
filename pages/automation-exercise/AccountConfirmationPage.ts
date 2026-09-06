import { BasePage } from "@pages/BasePage";
import { Locator } from "@playwright/test";
import { validateObject } from "@functions/BrowserUtils";

export class AccountConfirmationPage extends BasePage {
    private readonly accountConfirmation = this.page.getByRole("heading", { name: /Account Created!/ });
    private readonly accountCreatedText = this.page.getByText("Congratulations! Your new account has been successfully created!");
    private readonly advantageText = this.page.getByRole("paragraph").filter({ hasText: "You can now take advantage of member privileges to enhance your online shopping experience with us"});

    async validateConfirmation() {
        const elements:Locator[] = [this.accountConfirmation, this.accountCreatedText, this. advantageText];
        validateObject(elements)
    }
}