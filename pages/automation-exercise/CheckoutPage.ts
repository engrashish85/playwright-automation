import { BasePage } from "@pages/BasePage";
import { Locator } from "@playwright/test";

export class CheckoutPage extends BasePage{
    private readonly checkoutMessage:Locator = this.page.locator("textarea[name='message']");
    private readonly placeOrder:Locator = this.page.getByRole('link', {name:'Place Order'});
    
    async checkout(message:string) {
        await this.checkoutMessage.fill(message);
        await this.clickElement('link', 'Place Order');
    }
}