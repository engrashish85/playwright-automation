/// <reference types="node" />
import test, {Page, expect} from '@playwright/test';
import * as fs from 'fs';

import {LoginPage} from '../pages/LoginPage';
import {ProductsPage} from '../pages/ProductsStorePage';
import {CartPage} from '../pages/CartPage';

test.describe('Page Object Model Tests', () => {

    let page: Page;
    let loginPage: LoginPage;
    let productsStorePage: ProductsPage;
    let cartPage: CartPage;

    test('should add a product to the cart and verify it', { tag: '@pom' }, async ({page}) => {
        loginPage = new LoginPage(page);
        productsStorePage = new ProductsPage(page);
        cartPage = new CartPage(page);
        const testData = JSON.parse(fs.readFileSync('test-data/data.json', 'utf-8'));
        const productName = testData.productLoginData.productName;
        const productType = testData.productLoginData.productType;
        await page.goto('https://www.demoblaze.com/');
        productsStorePage = await loginPage.login(testData.productLoginData.username, testData.productLoginData.password);
        await productsStorePage.addProductToCart(productType, productName);
        await loginPage.clickGenericLink("Cart");
        await test.setTimeout(4000);
        const validateProduct = cartPage.validateProductInCart(productName);
        (expect (validateProduct)).toBeTruthy;
        await loginPage.clickGenericLink("Log out");
    })
})
