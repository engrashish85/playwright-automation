import { test, expect } from '@fixtures/automation-exercise/automation-exercise.fixture'
import { TestInfo } from '@playwright/test';
import { ProductsPage } from '@pages/automation-exercise/ProductsPage'
import { CartPage } from '@pages/automation-exercise/CartPage';
import testData from '@test-data/data.json'
import { CheckoutPage } from '@pages/automation-exercise/CheckoutPage';
import { PaymentsPage } from '@pages/automation-exercise/PaymentsPage';
import 'dotenv/config'
import { OrderConfirmationPage } from '@pages/automation-exercise/OrderConfirmationPage';

for (const entry of testData.users) {
    test.use({credentials:entry})
    test(`login with ${entry.username} and ${entry.password}`, async ({ page, loggedInPage }, testInfo: TestInfo) => {
        console.log(`login with ${entry.username} and ${entry.password}`);
        const productsPage = new ProductsPage(page);
        await productsPage.clickProductCategory('Men', 'Tshirts');
        const productDetails: Map<string, string> = await productsPage.retrieveProductDetails('Green Side Placket Detail T-Shirt');
        await productsPage.addProductToCart('Green Side Placket Detail T-Shirt');
        await productsPage.validateCart();
        await productsPage.clickCartLink();
        const cartPage = new CartPage(page);
        await cartPage.validateCart(productDetails);
        await cartPage.clickProceedToCheckout();
        await cartPage.validateCart(productDetails);
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.checkout('Test message');
        const paymentsPage = new PaymentsPage(page);
        await paymentsPage.payment(
            process.env.ae_nameOnCard!,
            process.env.ae_cardNumber!,
            process.env.ae_cvc!,
            Number(process.env.ae_expirationMonth),
            Number(process.env.ae_expirationYear)
        );
        const orderConfirmationPage = new OrderConfirmationPage(page);
        await orderConfirmationPage.validateOrderConfirmation();
        await orderConfirmationPage.downloadInvoice(testInfo);
        await orderConfirmationPage.clickElement('link', 'Continue');
        console.log("ss");
    })
}