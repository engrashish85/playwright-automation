import { test, Page, Locator, expect } from '@playwright/test'
import { validateObject } from '@functions/BrowserUtils';

test.describe.configure({mode: 'parallel'});
test.describe('Automation Exercise tests', () => {
    
    test.beforeAll("Starting test suite", () => {
        console.log("Starting test");
    })

    test.beforeEach("Logging into browser", async({page}, testInfo) => {
        await test.step(`Execution Info | Running ${testInfo.title} on worker ${testInfo.workerIndex}`, async()=> {
        })
        console.log(`Running ${testInfo.title} on worker ${testInfo.workerIndex}`);
        await page.goto("https://automationexercise.com/");
        await page.getByRole("link", {name:/.*Signup.*Login/}).click();
        await login(page, "engr.ashish@gmail.com", "Ashu@1985");
        console.log('Logged in');
    })

    test('Validating Featured Products added to Cart', { tag: '@automationExercise' }, async({page}) => {
        await addProductToCart(page, "Women", "Tops", "Blue Top");
    })

    test('Validating women brands categories', {tag: '@automationExercise'}, async({page}) => {
        const parentCategory = page.locator('div#accordian');
        await parentCategory.getByRole('link', {name:/.*Women.*/}).click();
        const categoryPanel = page.locator('div.panel-body').filter({visible:true});
        await categoryPanel.getByRole('link', {name:/.*Tops.*/}).click();
        const links = await page.locator('div.brands-name').getByRole('link').allInnerTexts();
        const lowerCaseLinks = links.map(link => link.toLowerCase());
        expect(links.some(link => link.includes("POLO"))).toBeTruthy();;
        console.log(links);
        expect(links.some(link => link.includes("H&M"))).toBeTruthy();
        expect(links.some(link => link.toLowerCase().includes("madame"))).toBeTruthy();
        expect(links.some(link => link.toLowerCase().includes("mast & harbour"))).toBeTruthy();
    })

    test('Men categories', async({page}) => {
        await addProductToCart(page, "Men", "Tshirts", "Pure Cotton V-Neck T-Shirt");
    })

    test.afterEach('Logging out', async ({page})=>{
        await page.getByRole('link', {name:/.*Logout/}).click();
    })

    test.afterAll("Closing test", () => {
        console.log("closing test");
    })
    
})

async function login(page:Page, username:String, password:String) {
    const loginForm = page.locator("div.login-form");
    await loginForm.getByPlaceholder("Email Address").fill("engr.ashish@gmail.com");
    await loginForm.getByPlaceholder("Password").fill("Ashu@1985");
    await loginForm.getByRole('button', {name:'Login'}).click();
}

async function addProductToCart(page: Page, category:String, subCategory: String, productName:String) {
    if (category != "Women") {
        const parentCategory = page.locator('div#accordian');
        await parentCategory.getByRole('link', { name: new RegExp(`.*${category}.*`) }).click();
        const categoryPanel = page.locator('div.panel-body').filter({ visible: true });
        await categoryPanel.getByRole('link', { name: new RegExp(`${subCategory}.*`) }).click();
    }
    const productItem = page.locator("div.features_items").locator("div.single-products").
            filter({has: page.getByRole('paragraph').
            filter({hasText:`${productName}`})        
        });
    const productItemsCount = await productItem.count();
    expect(productItemsCount).toBeGreaterThan(0);
    if (productItemsCount > 0) {
        await productItem.first().hover();
        const itemsCount = await productItem.locator("a.add-to-cart").count();
        await productItem.locator("a.add-to-cart").last().click();
    } else {
        throw new Error('No product items found');
    }
    const confirmationDialog:Locator = page.locator("div.modal-content");
    const elements:Locator[] = [
        confirmationDialog,
        confirmationDialog.locator('div.modal-header').locator('div.icon-box'),
        confirmationDialog.locator('div.modal-header').getByRole('heading', {name:'Added\!'}),
        confirmationDialog.locator('p').filter({hasText:'Your product has been added to cart.'}),
        confirmationDialog.locator('div.modal-footer').getByRole('button', {name:'Continue Shopping'})
    ];
    await validateObject(elements);
    await confirmationDialog.getByRole('button', {name:'Continue Shopping'}).click();
}