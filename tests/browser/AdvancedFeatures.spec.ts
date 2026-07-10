import {Locator, test, expect} from '@playwright/test';

//force true is used to perform action on element even if it is not visible or enabled. It is used when we want to perform action on element which is hidden or disabled. It is also used when we want to perform action on element which is covered by another element. It is also used when we want to perform action on element which is not in the viewport. It is also used when we want to perform action on element which is not interactable. It is also used when we want to perform action on element which is not visible but still present in the DOM.
test('should have correct title and heading', async ({page}) => {
    await page.goto('https://demowebshop.tricentis.com/');
    await expect(page).toHaveTitle('Demo Web Shop');
    await page.locator("input[name='q']").fill('laptop', {force: true});
    await page.locator("input[value='Search']").click({force: true});
});

//Soft Assertions are used to perform assertions on multiple elements without stopping the test execution. It is used when we want to perform assertions on multiple elements and we want to see all the assertion results in the test report. It is also used when we want to perform assertions on multiple elements and we want to see all the assertion results in the console. It is also used when we want to perform assertions on multiple elements and we want to see all the assertion results in the test report and console.
test('Implement soft assertions', async ({page}) => {
    await page.goto('https://www.inmotionhosting.com/');
    let title:String = await page.title();
    console.log("Page Title: ", title);
    expect.soft(title).toBe("In Motion Hosting");
    const acceptCookiesBtn = page.getByText('Accept All Cookies');
    if (await acceptCookiesBtn.isVisible()) {
        await acceptCookiesBtn.click();
    }
    await page.locator("img[src*='logo-imh.svg']").click();
    const introText: Locator = page.getByText("Introducing the InMotion Agency Partner Program.");
    await expect.soft(introText).toBeVisible();
});

