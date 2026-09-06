import { BasePage } from '@pages/BasePage'
import {Page,Locator, expect, TestInfo} from '@playwright/test'

export class OrderConfirmationPage extends BasePage {
    private readonly orderPlaced = this.page.getByTestId('order-placed');
    private readonly orderPlacedText = this.page.locator('p').filter({hasText:/Congratulations\! Your order has been confirmed\!/i});
    private readonly downloadInvoiceLink = this.page.getByRole('link', {name:'Download Invoice'});
    private readonly continueLink = this.page.getByRole('link', {name:'Continue'});

    async validateOrderConfirmation():Promise<void> {
        await expect.soft(this.orderPlaced).toHaveText('Order Placed!');
        await expect.soft(this.orderPlacedText).toBeVisible();
        await expect.soft(this.downloadInvoiceLink).toBeVisible();
        await expect.soft(this.continueLink).toBeVisible();
    }

    async downloadInvoice(testInfo:TestInfo):Promise<void> {
        const download = await Promise.all([
            this.page.waitForEvent('download'),
            this.downloadInvoiceLink.click()
        ])
        // const fileLocation = `./traces/${download[0].suggestedFilename()}`
        const fileName = testInfo.outputPath(download[0].suggestedFilename());
        console.log(fileName);
        try {
            await download[0].saveAs(fileName);
        } catch (error) {
            for (let i = 0; i < 3; i++) {
                try {
                    await download[0].saveAs(fileName);
                } catch(error) {
                    if (i==2) {
                        throw error;
                    }
                    i++;
                };
                
            }
        }
        
    }
}