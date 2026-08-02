import {test, expect, Locator} from '@playwright/test'

test.describe('Keyboard and Mouse Operations', () => {
    test('Mouse Operations', async({page})=> {
        await page.goto("http://www.google.com");
        await page.mouse.move(0, 0);
        await page.mouse.down();
        await page.mouse.move(0, 100);
        await page.mouse.move(100, 100);
        await page.mouse.move(100, 0);
        await page.mouse.move(0, 0);
        await page.mouse.up();
    })

    test("Slider Operation", async({page})=> {
        await page.goto("http://www.flipkart.com");
        await page.waitForLoadState('networkidle');
        const closeButton = page.locator("span[role='button']");
        if (await closeButton.isVisible()) {
            await closeButton.click();
        }
        await page.locator("//div[text()='Fashion']").click();
        await page.waitForLoadState('networkidle');
        await page.locator("//div[contains(text(),'Jeans')]/preceding-sibling::div").first().click();
        await page.waitForLoadState('networkidle');
        const slider:Locator = page.locator("//span[text()='Price']/parent::div/parent::div/following-sibling::div").nth(1);
        await slider.highlight();
        const bb = await page.locator("//span[text()='Price']/parent::div/parent::div/following-sibling::div").nth(1).boundingBox();
        console.log("x and y are - "+bb?.x +" and "+bb?.y);
        await page.waitForTimeout(10000);
        await page.mouse.move(bb?.x + bb?.width/2, bb?.y + bb?.height/2);
        await page.waitForTimeout(10000);
        await page.mouse.down();
        await page.waitForTimeout(10000);
        await page.mouse.move(bb.x+40, bb.y+bb?.height/2)
        await page.waitForTimeout(10000);
        await page.mouse.up();
        await page.waitForTimeout(10000);
        console.log("moved mouse");
    })

    test('Drag and Drop', async({page}) => {
        await page.goto("http://www.flipkart.com");
        await page.waitForLoadState('networkidle');
        const closeButton = page.locator("span[role='button']");
        if (await closeButton.isVisible()) {
            await closeButton.click();
        }
        await page.locator("//div[text()='Fashion']").click();
        await page.waitForLoadState('networkidle');
        await page.locator("//div[contains(text(),'Jeans')]/preceding-sibling::div").first().click();
        await page.waitForLoadState('networkidle');
        const slider:Locator = page.locator("//span[text()='Price']/parent::div/parent::div/following-sibling::div").nth(1);
        const sliderTo:Locator = page.locator("//span[text()='Price']/parent::div/parent::div/following-sibling::div[2]/child::div[2]")
        await slider.highlight();
        await slider.dragTo(sliderTo);
        console.log("Functionality done");
    })

    test('Drag and drop jquery', async({page})=> {
        await page.goto("https://jqueryui.com/droppable/");
        const frame = page.frameLocator("iframe.demo-frame")
        const dragElement = frame.locator("//p[text()='Drag me to my target']/parent::div");
        const dropElement = frame.locator("//p[text()='Drop here']/parent::div");
        await dragElement.dragTo(dropElement);
    })

    test.only('Keyboard and Mouse Right click operations', async({page}) => {
        await page.goto("https://textbox.johnjago.com/")
        await page.locator("textarea").pressSequentially("Hello World", { delay:500});
        await page.locator("textarea").dblclick({button: "left"});
        await page.waitForTimeout(1000);
        await page.locator("textarea").press("Control+A");
        await page.waitForTimeout(1000);
        await page.locator("textarea").press('Backspace')
        await page.waitForTimeout(500);
        await page.locator("textarea").dblclick({button:"right"});
        await page.waitForTimeout(500);
        await page.keyboard.press('ArrowDown');
        await page.waitForTimeout(500);
        await page.keyboard.press('Enter');
        
        await page.keyboard.type("Hello World");
        await page.keyboard.down('Shift')
        for (let i = 0; i < 'World'.length; i++) {
            await page.keyboard.press('ArrowLeft');
        }
        await page.keyboard.up('Shift');
        await page.keyboard.press('Backspace');
        await page.waitForTimeout(10000);
    })
})