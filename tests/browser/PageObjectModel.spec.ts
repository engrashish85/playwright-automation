/// <reference types="node" />
import {Page} from '@playwright/test';
import  { test, expect } from '../../fixtures/base.fixture';
import * as fs from 'fs';

import {LoginPage} from '../../pages/LoginPage';
import {ProductsPage} from '../pages/ProductsPage';
import {CartPage} from '../../pages/CartPage';

test.describe('Page Object Model Tests', () => {

    let page: Page;
    // let loginPage: LoginPage;
    // let productsPage: ProductsPage;
    // let cartPage: CartPage;

    test('should add a product to the cart and verify it', { tag: '@pom' }, async ({page, loginPage, productsPage, cartPage}) => {
        // loginPage = new LoginPage(page);
        // productsPage = new ProductsPage(page);
        // cartPage = new CartPage(page);
        const testData = JSON.parse(fs.readFileSync('test-data/data.json', 'utf-8'));
        const productName = testData.productLoginData.productName;
        const productType = testData.productLoginData.productType;
        await page.goto('https://www.demoblaze.com/');
        await loginPage.login(testData.productLoginData.username, testData.productLoginData.password);
        await productsPage.addProductToCart(productType, productName);
        await loginPage.clickGenericLink("Cart");
        const validateProduct = await cartPage.validateProductInCart(productName);
        expect (validateProduct).toBeTruthy;
        await cartPage.deleteItemsFromCart();
        await loginPage.clickGenericLink("Log out");
    })
})
