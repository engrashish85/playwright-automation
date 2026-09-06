import { BasePage } from '@pages/BasePage';
import { Page, Locator } from '@playwright/test'

export class PaymentsPage extends BasePage {
    private readonly paymentsForm = this.page.locator("form#payment-form");
    private readonly nameOnCard = this.paymentsForm.getByTestId('name-on-card');
    private readonly cardNumber = this.paymentsForm.getByTestId('card-number');
    private readonly cvc = this.paymentsForm.getByTestId('cvc');
    private readonly expirationMonth = this.paymentsForm.getByPlaceholder('MM');
    private readonly expirationYear = this.paymentsForm.getByRole('textbox', {name:'YYYY'});
    private readonly payAndConfirmOrderButton = this.paymentsForm.getByRole('button', {name:new RegExp('Pay and Confirm Order')});

    async payment(nameOnCard:string, cardNumber:string, cvc:string, expirationMonth:number, expirationYear:number) {
        await this.nameOnCard.fill(nameOnCard);
        await this.cardNumber.fill(cardNumber);
        await this.cvc.fill(cvc);
        await this.expirationMonth.fill(String(expirationMonth));
        await this.expirationYear.fill(String(expirationYear));
        await this.payAndConfirmOrderButton.click();
    }
}