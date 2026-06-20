import {test,expect,Page, Locator} from '@playwright/test';


let page: Page;
test.beforeAll('Opening App', async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('http://flipkart.com');
});

test('should have correct title and heading', async ({context}) => {
    // context.tracing.start({ screenshots: true, snapshots: true });
    await page.locator("span[role='button']").click();
    const searchBox:Locator = page.locator("//form[@action='/search']/descendant::input[@name='q']");
    await searchBox.fill('mobiles');
    await page.waitForTimeout(4000);
    const count = await page.locator("//form[@action='/search']/child::ul/child::li/div").count();
    console.log("Count of search results: ", count);
    const text = await page.locator("//form[@action='/search']/child::ul/child::li/div").nth(3).textContent();
    console.log("Text of 4th search result: ", text);
    const texts: string[] = await page.locator("//form[@action='/search']/child::ul/child::li/div").allTextContents();
    for (let text of texts) {
        console.log("Search result: ", text);
    }
    // context.tracing.stop({ path: 'traces/trace.zip' });
});

test.afterAll('Closing App', async () => {
    await page.close();
});