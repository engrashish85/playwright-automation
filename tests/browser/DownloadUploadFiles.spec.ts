import { expect, test, BrowserContext, Page, Locator } from '@playwright/test'
import * as fs from 'fs';

let context:BrowserContext;
let page:Page;

test.beforeEach(async({browser}) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://dotesthere.com/");
})

test.describe('Download and Upload file operations', ()=> {
    test('Download Operation', async({page}) => {
        await page.waitForLoadState('networkidle');
        const download = await Promise.all([
            page.waitForEvent("download"),
            page.locator("a").filter( {hasText: "Download sample.txt"}).click()
        ])
        const fileLocation = `./traces/${download[0].suggestedFilename()}`;
        await download[0].saveAs(fileLocation);
        // const path = await download[0].path();
        expect(fs.existsSync(fileLocation)).toBeTruthy();
        // console.log(path);
    })

    test.only('Upload Operation', async ()  => {
        await page.waitForLoadState('domcontentloaded');
        const [upload] = await Promise.all([
            page.waitForEvent('filechooser'),
            page.click("input#file-upload")
        ])
        // await page.setInputFiles("input#file-upload", "traces/sample.txt");
        const isMultiple  = await upload.isMultiple();
        console.log(isMultiple);
        await upload.setFiles("traces/sample.txt");
        console.log("set test");
    })
})