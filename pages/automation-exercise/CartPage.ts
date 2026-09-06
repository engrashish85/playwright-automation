import { test,expect } from '@fixtures/automation-exercise/automation-exercise.fixture'
import { BasePage } from '@pages/BasePage';
import { Locator } from '@playwright/test';

export class CartPage extends BasePage {

    private readonly cartTable:Locator = this.page.locator("table#cart_info_table,table.table-condensed");
    private readonly proceedToCheckout:Locator = this.page.locator('a.check_out');

    async validateCart(cartDetails:Map<string, string>):Promise<void> {
        await expect.soft(
            this.cartTable.getByText(cartDetails.get("productDescription")!)
        ).toBeVisible();
        await expect.soft(
            this.cartTable.getByText(cartDetails.get("productPrice")!)
        ).toBeVisible();
    }

    async clickProceedToCheckout():Promise<void> {
        await this.proceedToCheckout.click();
    }

}