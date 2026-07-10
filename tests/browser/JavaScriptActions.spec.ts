import {test, expect, Locator} from '@playwright/test'

test.describe('Javascript Actions', ()=> {
    test('Javascript Actions', async({page})=>{
        await page.goto("https://login.yahoo.com/")
        await page.locator("input#persistent").uncheck();
        console.log("javascript");
        await page.evaluate("document.getElementById(\"persistent\").click()");
        console.log("javasceipt");
    })
})