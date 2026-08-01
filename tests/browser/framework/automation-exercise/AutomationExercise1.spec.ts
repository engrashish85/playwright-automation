// import { test, expect, type Page, type Locator } from '@playwright/test'
import { Page, Locator } from '@playwright/test'
import { validateObject } from '@functions/BrowserUtils';
import { test, expect } from '@fixtures/demo-blaze/demo-blaze.fixture'

test.describe.configure({mode: 'default'});
test.describe('Automation Exercise tests', () => {
    
    test.beforeAll("Starting test suite", () => {
        console.log("Starting test");
    })

    test.beforeEach("Logging into browser", async({pageWithMonitoring: page}, testInfo) => {
        await test.step(`Execution Info | Running ${testInfo.title} on worker ${testInfo.workerIndex}`, async()=> {
        })
        console.log(`Running ${testInfo.title} on worker ${testInfo.workerIndex}`);
        await page.goto("https://automationexercise.com/");
        await page.getByRole("link", {name:/.*Signup.*Login/}).click();
        await login(page, "engr.ashish@gmail.com", "Ashu@1986");
        console.log('Logged in');
    })

    test('Validating Featured Products Parallel1 added to Cart', { tag: '@automationExercise'}, async({pageWithMonitoring: page}) => {
        const productItem = page.locator("div.features_items").locator("div.single-products").
            filter({has: page.getByRole('paragraph').
            filter({hasText:'Blue Top'})        
        });                                                                                                                                                                                                                                                                 
        const productItemsCount = await productItem.count();
        expect(productItemsCount).toBeGreaterThan(0);
        if (productItemsCount > 0) {
            await productItem.first().hover();
            page.setDefaultTimeout(5000);
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
    })

    test('Validating women brands Parrallel1 categories', {tag: '@automationExercise'}, async({pageWithMonitoring: page}) => {
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

    test.afterEach('Logging out', async ({pageWithMonitoring: page})=>{
        const logoutLink = page.getByRole('link', { name: /.*Logout/ });
        const isVisible = await logoutLink.isVisible({ timeout: 3000 }).catch(() => false);
        if (isVisible) {
            await logoutLink.click();
        } else {
            throw new Error;
        }
    })

    test.afterAll("Closing test", () => {
        console.log("closing test");
    })
    
})

async function login(page:Page, username:string, password:string) {
    const loginForm = page.locator("div.login-form");
    await loginForm.getByPlaceholder("Email Address").fill(username);
    await loginForm.getByPlaceholder("Password").fill(password);
    await loginForm.getByRole('button', {name:'Login'}).click();
    const isVisible = await page.getByRole('link', {name:/.*Logout/}).isVisible({timeout:5000}).catch(() => false);
    if (!isVisible) {
        console.log("logout link not visible");
        throw new Error("Login not working");
    }
}