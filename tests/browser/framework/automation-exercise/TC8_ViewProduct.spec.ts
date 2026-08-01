import { test, expect } from '@fixtures/automation-exercise/automation-exercise.fixture'
import { ProductsPage } from '@pages/automation-exercise/ProductsPage';

test.use({
    storageState:'test-data/storage-state/ae_auth.json'
});

test('validate view product', async({page}) => {
    await page.goto("https://automationexercise.com/");
    const productsPage = new ProductsPage(page);
    await productsPage.clickNavigationLink("Products");
    const productDetails: Map<string, string> = await productsPage.viewProduct(0);
    await productsPage.validateProductDetails(productDetails);
})