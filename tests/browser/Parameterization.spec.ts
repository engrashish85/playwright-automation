import {test, expect, Page, TestInfo} from '@playwright/test';
import fs from 'fs';
import {parse} from 'csv-parse/sync';
import xlsx from 'xlsx';


//Using array of search terms to parameterize the test
const searchTerms = ['laptop', 'phone', 'book'];
const login = [
    { email: 'ash_eet2003@yahoo.co.in', password: 'Goluashu@1985!!', valid: true },
    { email: 'anotheruser@example.com', password: 'AnotherPassword123', valid: false },
    { email: 'thirduser@example.com', password: 'ThirdPassword123', valid: false },
    { email: 'fourthuser@example.com', password: 'FourthPassword123', valid: false }
];

const loginArray: string[][] = [
    ["ash_eet2003@yahoo.co.in", "Goluashu@1985!!", "valid"],
    ["anotheruser@example.com", "AnotherPassword123", "invalid"]
]

test.describe('Parameterization', () => {

    // for (const searchTerm of searchTerms) {
    //     test(`should work with parameters: ${searchTerm}`, async ({page}) => {
    //         await page.goto('https://demowebshop.tricentis.com/');
    //         const title = await page.title();
    //         expect(title).toBe('Demo Web Shop');
    //         await page.locator('#small-searchterms').fill(searchTerm);
    //         await page.locator('input[type="submit"]').click();
    //         const searchResults = await page.locator('//div[@class="product-grid"]/descendant::img').count();
    //         let productNames = await page.locator('//div[@class="product-grid"]/descendant::h2/a').allTextContents();
    //         expect(searchResults).toBeGreaterThan(0);
    //         let productName;
    //         for (productName of productNames) {
    //             console.log(productName);
    //             if (productName.toLowerCase().includes(searchTerm.toLowerCase())) {
    //                 console.log('${searchTerm} found: ' + productName);
    //             } else {
    //                 throw new Error('${searchTerm} not found in product name: ' + productName);
    //             }
    //         }
    //     });
    // }

    searchTerms.forEach(searchTerm => {
        test(`should work with parameters: ${searchTerm}`, async ({page}) => {
            await page.goto('https://demowebshop.tricentis.com/');
            const title = await page.title();
            expect(title).toBe('Demo W.eb Shop');
            await page.locator('#small-searchterms').fill(searchTerm);
            await page.locator('input[type="submit"]').click();
            await page.waitForSelector('//div[@class="product-grid"]/descendant::img');
            const searchResults = await page.locator('//div[@class="product-grid"]/descendant::img').count();
            let productNames = await page.locator('//div[@class="product-grid"]/descendant::h2/a').allTextContents();
            expect(searchResults).toBeGreaterThan(0);
            let productName;
            for (productName of productNames) {
                console.log(productName);
                if (productName.toLowerCase().includes(searchTerm.toLowerCase())) {
                    console.log('${searchTerm} found: ' + productName);
                } else {
                    throw new Error('${searchTerm} not found in product name: ' + productName);
                }
            }
        });
    });

    test('should work with json parameters: login', async ({page}) => {
        for (const credentials of login) {
            await page.goto('https://www.amazon.in/ap/signin');
            await page.locator("//a[text()='Home']").click();
            await page.locator("//span[text()='Hello, sign in']").click();
            await page.locator('#ap_email_login').fill(credentials.email);
            await page.locator("input[class='a-button-input']").click();
            if (credentials.valid) {
                await page.locator('input[type="submit"]').click();
                await page.locator('#ap_password').fill(credentials.password);
                await page.locator("input[class='a-button-input']").click();
                await page.waitForSelector("//span[contains(text(),'Deliver to')]");
                await page.locator("//span[contains(text(),'Deliver to')]").isVisible();
                await page.locator("//span[contains(text(),'Hello,')]").isVisible();
                await page.locator("button[aria-label='Expand Account and Lists']").click();
                await page.locator("//span[text()='Your Account']").isVisible();
                await page.locator("//span[text()='Sign Out']").click();
            } else {
                await page.getByText("It looks like you are new to Amazon").isVisible();
                const buttonText = await page.locator("//input[@type='submit']/following-sibling::span").textContent();
                expect(buttonText).toContain('Proceed to create an account');
            }
        }
    });

    test('should work with parameters: login using array', async ({page}) => {
        for (const credentials of loginArray) {
            await page.goto('https://www.amazon.in/ap/signin');
            await page.locator("//a[text()='Home']").click();
            await page.locator("//span[text()='Hello, sign in']").click();
            await page.locator('#ap_email_login').fill(credentials[0]);
            await page.locator("input[class='a-button-input']").click();
            if (credentials[2].toLowerCase() === "valid") {
                await page.locator('input[type="submit"]').click();
                await page.locator('#ap_password').fill(credentials[1]);
                await page.locator("input[class='a-button-input']").click();
                await page.waitForSelector("//span[contains(text(),'Deliver to')]");
                await page.locator("//span[contains(text(),'Deliver to')]").isVisible();
                await page.locator("//span[contains(text(),'Hello,')]").isVisible();
                await page.locator("button[aria-label='Expand Account and Lists']").click();
                await page.locator("//span[text()='Your Account']").isVisible();
                await page.locator("//span[text()='Sign Out']").click();
            } else {
                await page.getByText("It looks like you are new to Amazon").isVisible();
                const buttonText = await page.locator("//input[@type='submit']/following-sibling::span").textContent();
                expect(buttonText).toContain('Proceed to create an account');
            }
        }
    });

    test('should work with individualparameters: login using ${email} and ${password}', async ({page}) => {
        for (const [email, password, validity] of loginArray) {
            await page.goto('https://www.amazon.in/ap/signin');
            await page.locator("//a[text()='Home']").click();
            await page.locator("//span[text()='Hello, sign in']").click();
            await page.locator('#ap_email_login').fill(email);
            await page.locator("input[class='a-button-input']").click();
            if (validity.toLowerCase() === "valid") {
                await page.locator('input[type="submit"]').click();
                await page.locator('#ap_password').fill(password);
                await page.locator("input[class='a-button-input']").click();
                await page.waitForSelector("//span[contains(text(),'Deliver to')]");
                await page.locator("//span[contains(text(),'Deliver to')]").isVisible();
                await page.locator("//span[contains(text(),'Hello,')]").isVisible();
                await page.locator("button[aria-label='Expand Account and Lists']").click();
                await page.locator("//span[text()='Your Account']").isVisible();
                await page.locator("//span[text()='Sign Out']").click();
            } else {
                await page.getByText("It looks like you are new to Amazon").isVisible();
                const buttonText = await page.locator("//input[@type='submit']/following-sibling::span").textContent();
                expect(buttonText).toContain('Proceed to create an account');
            }
        }
    });

    test('should work with json file parameters: login', async ({page}) => {
        const loginData:any = JSON.parse(fs.readFileSync('test-data/data.json', 'utf-8'));
        const data = loginData.loginData;
        for (const credentials of data) {
            await page.goto('https://www.amazon.in/ap/signin');
            await page.locator("//a[text()='Home']").click();
            await page.locator("//span[text()='Hello, sign in']").click();
            await page.locator('#ap_email_login').fill(credentials.email);
            await page.locator("input[class='a-button-input']").click();
            if (credentials.valid) {
                await page.locator('input[type="submit"]').click();
                await page.locator('#ap_password').fill(credentials.password);
                await page.locator("input[class='a-button-input']").click();
                await page.waitForSelector("//span[contains(text(),'Deliver to')]");
                await page.locator("//span[contains(text(),'Deliver to')]").isVisible();
                await page.locator("//span[contains(text(),'Hello,')]").isVisible();
                await page.locator("button[aria-label='Expand Account and Lists']").click();
                await page.locator("//span[text()='Your Account']").isVisible();
                await page.locator("//span[text()='Sign Out']").click();
            } else {
                await page.getByText("It looks like you are new to Amazon").isVisible();
                const buttonText = await page.locator("//input[@type='submit']/following-sibling::span").textContent();
                expect(buttonText).toContain('Proceed to create an account');
            }
        }
    });

    test('should work with csv file parameters: login', async ({page}) => {
        const fileContent = fs.readFileSync('test-data/data.csv', 'utf-8').replace(/^\uFEFF/, '');
        const loginData: any = parse(fileContent, {
            columns: true,
            skip_empty_lines: true
        });
        for (const credentials of loginData) {
            console.log(credentials);
            console.log(credentials.email);
            await page.goto('https://www.amazon.in/ap/signin');
            await page.locator("//a[text()='Home']").click();
            await page.locator("//span[text()='Hello, sign in']").click();
            await page.locator('#ap_email_login').fill(credentials.email);
            await page.locator("input[class='a-button-input']").click();
            if (credentials.valid) {
                await page.locator('input[type="submit"]').click();
                await page.locator('#ap_password').fill(credentials.password);
                await page.locator("input[class='a-button-input']").click();
                await page.waitForSelector("//span[contains(text(),'Deliver to')]");
                await page.locator("//span[contains(text(),'Deliver to')]").isVisible();
                await page.locator("//span[contains(text(),'Hello,')]").isVisible();
                await page.locator("button[aria-label='Expand Account and Lists']").click();
                await page.locator("//span[text()='Your Account']").isVisible();
                await page.locator("//span[text()='Sign Out']").click();
            } else {
                await page.getByText("It looks like you are new to Amazon").isVisible();
                const buttonText = await page.locator("//input[@type='submit']/following-sibling::span").textContent();
                expect(buttonText).toContain('Proceed to create an account');
            }
        }
    });

    test('should work with excel file parameters: login', async ({page}) => {
        const workbook = xlsx.readFile('test-data/data.xlsx');
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const loginData: any = xlsx.utils.sheet_to_json(sheet);
        console.log(loginData);
        for (const credentials of loginData) {
            await page.goto('https://www.amazon.in/ap/signin');
            await page.locator("//a[text()='Home']").click();
            await page.locator("//span[text()='Hello, sign in']").click();
            await page.locator('#ap_email_login').fill(credentials.email);
            await page.locator("input[class='a-button-input']").click();
            if (credentials.valid) {
                await page.locator('input[type="submit"]').click();
                await page.locator('#ap_password').fill(credentials.password);
                await page.locator("input[class='a-button-input']").click();
                // await page.waitForSelector("//span[contains(text(),'Deliver to')]");
                await page.locator("//span[contains(text(),'Deliver to')]").isVisible();
                await page.locator("//span[contains(text(),'Hello,')]").isVisible();
                await page.locator("button[aria-label='Expand Account and Lists']").click();
                await page.locator("//span[text()='Your Account']").isVisible();
                await page.locator("//span[text()='Sign Out']").click();
            } else {
                await page.getByText("It looks like you are new to Amazon").isVisible();
                const buttonText = await page.locator("//input[@type='submit']/following-sibling::span").textContent();
                expect(buttonText).toContain('Proceed to create an account');
            }
        }
    });
});

test.describe.configure( { mode:'parallel'});
test.describe('Login with parallel tests using data parameterization', () => {
    const loginData:any = JSON.parse(fs.readFileSync('test-data/data_workers.json', 'utf-8'));
    const data = Object.entries(loginData.loginData);
    for (const [workerName, credentials] of data) {
        test(`should work with json file parameters with parallel workers - ${workerName}`, async ({page}, testInfo) => {
        // for (let i:number = 0; i < data.length; i++) {
            const credentials:any = data[testInfo.workerIndex];
            console.log(`[Worker ${testInfo.workerIndex} with data ${credentials[1].email}`)
            await page.goto('https://www.amazon.in/ap/signin');
            await page.locator("//a[text()='Home']").click();
            await page.locator("//span[text()='Hello, sign in']").click();
            await page.locator('#ap_email_login').fill(credentials[1].email);
            await page.locator("input[class='a-button-input']").click();
            if (credentials.valid) {
                await page.locator('input[type="submit"]').click();
                await page.locator('#ap_password').fill(credentials.password);
                await page.locator("input[class='a-button-input']").click();
                await page.waitForSelector("//span[contains(text(),'Deliver to')]");
                await page.locator("//span[contains(text(),'Deliver to')]").isVisible();
                await page.locator("//span[contains(text(),'Hello,')]").isVisible();
                await page.locator("button[aria-label='Expand Account and Lists']").click();
                await page.locator("//span[text()='Your Account']").isVisible();
                await page.locator("//span[text()='Sign Out']").click();
            } else {
                await page.getByText("It looks like you are new to Amazon").isVisible();
                const buttonText = await page.locator("//input[@type='submit']/following-sibling::span").textContent();
                expect(buttonText).toContain('Proceed to create an account');
            }
        // }
        });
    }
    
});



    