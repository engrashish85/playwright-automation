import { Page, Locator, expect, test } from '@playwright/test'
import * as fs from 'fs'

test.describe('Sauce Demo Product Page', { tag: '@productTest' }, () => {
    test('Sauce demo', async ({ page }) => {
        const file = fs.readFileSync('test-data/data.json', 'utf-8');
        const productTypes = JSON.parse(file).productTypes;
        await page.goto("https://www.saucedemo.com/");
        await page.getByPlaceholder("Username").fill("standard_user");
        await page.getByRole("textbox", {name:'Password'}).fill("secret_sauce");
        await page.getByRole("button", {name:'Login'}).click();
        const items = page.locator("div.inventory_item_name ")
        const itemsCount = await items.count();
        await addProductToCart(page, productTypes);
        await page.getByTestId("shopping-cart-link").click();
        await validateProductInCart(page, productTypes);
    })
})

async function clickProduct(page: Page, productText: string) {
    await page.locator('div.inventory_item_name', { hasText: productText }).click();
}

async function addProductToCart(page: Page, productTexts: string | string[]) {
    const productArray = Array.isArray(productTexts)
        ? productTexts
        : productTexts.split(',').map(p => p.trim()).filter(p => p.length > 0);

    for (const product of productArray) {
        const productItem:Locator = page.locator("div.inventory_item").filter({ has: page.getByRole('link', {name: product})});
        const addToCart = productItem.getByRole('button', {name: /add[- ]to[ -]cart/i});
        await productItem.highlight();
        await addToCart.highlight();
        await addToCart.click();
        expect(addToCart).not.toBeVisible;
        let removeCartButton = productItem.getByRole('button', {name: /^Remove$/i});
        await expect(removeCartButton).toBeVisible();
    }
}

async function validateProductInCart(page: Page, productTexts: string|string[]) {
    const productArray = Array.isArray(productTexts)?productTexts:productTexts.split(",");
    for (const product of productArray) {
        await expect(page.getByTestId("inventory-item").filter({ has: page.getByText(product) })).toBeVisible();
    }
    
}