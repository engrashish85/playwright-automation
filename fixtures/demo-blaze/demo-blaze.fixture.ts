import { test as base, Page } from '@playwright/test';
import { LoginPage } from '@pages/demo-blaze/LoginPage';
import { ProductsPage } from '@pages/demo-blaze/ProductsStorePage';
import { CartPage } from '@pages/demo-blaze/CartPage';

type fixtures = {
    loginPage : LoginPage;
    productsPage: ProductsPage;
    cartPage: CartPage;
    pageWithMonitoring: Page;
};

export const test = base.extend<fixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    
    productsPage: async ({ page }, use) => {
        const productsPage = new ProductsPage(page);
        await use(productsPage);
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    pageWithMonitoring: async ({ page }, use, testInfo) => {
        type ErrorRequest = {
            url: string;
            status: number;
            statusText: string;
        };
        const failedRequests: ErrorRequest[] = [];
        page.on("response", (response) => {
            const url = response.url();
            const status = response.status();
            if (status >= 400) {
                failedRequests.push({
                    url,
                    status,
                    statusText: response.statusText(),
                } satisfies ErrorRequest);
                console.log(`${url} - ${status}`);
            }
        });
        await use(page);
        console.log(`Failed Requests count is - ${failedRequests.length}`);
        if (failedRequests.length > 0) {
            console.log("Attaching failed request test file");
            await testInfo.attach("failed-requests.json", {
                body:JSON.stringify(failedRequests, null, 2),
                contentType: "application/json",
            });
        }
    }
});

export { expect } from '@playwright/test';