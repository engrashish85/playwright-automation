import {test, expect, Locator} from '@playwright/test';

test('should have the correct title', async ({page}) => {
  test.setTimeout(30000);
  await page.goto(' https://www.inmotionhosting.com/');
  let title:String = await page.title();
  console.log("Page Title: ", title);
  expect(title).toBe("InMotion Hosting");
  await page.locator("img[src*='logo-imh.svg']").click();
  const introText: Locator = page.getByText("Introducing the InMotion Agency Partner Program.");
  await expect(introText).toBeVisible();
  await expect(page.locator("//h1[text()='Web Hosting Solutions']")).toBeVisible({timeout: 5000});
  await expect(page.getByRole('heading', {name: 'Web Hosting Solutions'})).toBeVisible({timeout: 5000});
  // await page.getByRole('link', {name: 'Dedicated Servers'}).click();
  // await page.getByRole('link', {name: 'Managed Dedicated Servers'}).waitFor();
  await page.locator("a[title='AMP Login']").first().click();
  await expect(page.getByLabel('Password')).toBeVisible();
  await expect(page.getByPlaceholder('email address')).toBeVisible();
  await page.getByPlaceholder('email address').fill('engr.ashish@gmail.com');
  await page.getByPlaceholder('Password').fill('Ashish@123');
  await page.getByRole('button', {name: 'Log in'}).click();  
  await page.goto('file:///C:/Ashish/study%20material/SDET%20Training/Playwright/Playwright%20Locators/Built-in%20Locators/app.html#');
  await expect(page.getByTitle('Home page link')).toHaveText('Home');
  await expect(page.getByRole('heading', {name: 'Playwright Locators Demonstration'})).toBeVisible();
  await expect(page.getByTestId('profile-email')).toHaveText('john.doe@example.com');
});

test('should have correct test id', async ({page}) => {
  await page.goto('file:///C:/Ashish/study%20material/SDET%20Training/Playwright/Playwright%20Locators/Built-in%20Locators/app.html#');
  await expect(page.getByTitle('Home page link')).toHaveText('Home');
  await expect(page.getByRole('heading', {name: 'Playwright Locators Demonstration'})).toBeVisible();
  await expect(page.getByTestId('profile-email')).toHaveText('john.doe@example.com');
})

test('xpath demo in playwright', async ({page}) => {
  await page.goto('file:///C:/Ashish/study%20material/SDET%20Training/Playwright/Playwright%20Locators/Built-in%20Locators/app.html#');
  const roleLocator: Locator = page.locator("//section[contains(@id, 'role-locators')]");
  await expect(roleLocator).toBeVisible();
})

test('xpath product counts demo in playwright', async ({page}) => {
  await page.goto('file:///C:/Ashish/study%20material/SDET%20Training/Playwright/Playwright%20Locators/Built-in%20Locators/app.html#');
  const roleLocator: Locator = page.locator("//section[contains(@id, 'locators')]");
  const locatorsCount: number = await roleLocator.count();
  console.log("Locators count: ", locatorsCount);
  expect(locatorsCount).toBeGreaterThan(0);
})

test('Retrieve text from elements demo in playwright', async ({page}) => {
  await page.goto('file:///C:/Ashish/study%20material/SDET%20Training/Playwright/Playwright%20Locators/Built-in%20Locators/app.html#');
  const roleLocator: Locator = page.locator("//h2/span[starts-with(text(), 'getBy')]");
  const locatorsCount: number = await roleLocator.count();
  console.log("Locators count: ", locatorsCount);
  expect(locatorsCount).toBeGreaterThan(0);
  console.log("First text content: ", await roleLocator.first().textContent());
  console.log("Second text content: ", await roleLocator.nth(1).textContent());
  const allTexts: string[] = await roleLocator.allTextContents();
  console.log("All text contents: ", allTexts);
  console.log("LasT text content: ", await roleLocator.last().textContent());
  for (let allText of allTexts) {
    console.log("Text content: ", allText);
  }
  console.log("Last text content: ", await roleLocator.last().textContent());
})

test('Implementation of last and position keywords in xpath', async ({page}) => {
  await page.goto('file:///C:/Ashish/study%20material/SDET%20Training/Playwright/Playwright%20Locators/Built-in%20Locators/app.html#');
  const searchProducts: Locator = page.locator("//section[@id='placeholder-locators']//div[last()]");
  await searchProducts.getByPlaceholder('Search products').fill('Playwright Book');
  await searchProducts.locator('input[type="search"]').press('Enter'); 
  const nameLocator: Locator = page.locator("//section[@id='placeholder-locators']//div[position()=1]");
  await nameLocator.getByPlaceholder('Enter your full name').fill('Playwright Book');
})

test('Radio buttons and checkboxes', async ({page}) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  const textbox: Locator = page.getByPlaceholder("Enter Name");
  await textbox.fill('Ashish');
  const maxLength = await textbox.getAttribute("maxLength");
  expect(maxLength).toBe('15');
  console.log("input value is  - ", await textbox.inputValue());
  await page.locator('#email').fill('ashish@example.com');
  await page.getByPlaceholder('Enter Phone').fill('1234567890');
  await page.locator("//label[text()='Address:']/following-sibling::textarea").fill('123 Main St, Anytown, USA');
  await page.locator("input[id='male'][type='radio']").check();
  await expect(page.locator("input[id='male'][type='radio']")).toBeChecked();
  const days = ['Monday', 'Wednesday', 'Friday'];
  for (let day of days) {
    await page.getByTestId(`${day.toLowerCase()}`).check();
    await expect(page.getByTestId(`${day.toLowerCase()}`)).toBeChecked();
  }
  await(page.getByTestId(days[2].toLowerCase())).uncheck();
  await expect(page.getByTestId(days[2].toLowerCase())).not.toBeChecked();
  await page.getByTestId('country').selectOption('India');
  await expect(page.getByTestId('country')).toHaveValue('india');
  await page.getByTestId('colors').selectOption(['red', 'blue']);
  const selectedColors: string[] = await page.getByTestId('colors').evaluate((select: HTMLSelectElement) => {
    const selectedOptions = Array.from(select.selectedOptions);
    return selectedOptions.map(option => option.value);
  });
  expect(selectedColors).toEqual(['red', 'blue']);
  await page.getByTestId('animals').selectOption('Giraffe');
  await expect(page.getByTestId('animals')).toHaveValue('giraffe');
  await page.getByTestId('datepicker').fill('06/01/2026');
  await page.getByTestId('txtDate').click();
  await expect(page.getByTestId('datepicker')).toHaveValue('06/01/2026');
  await page.getByTestId('txtDate').fill('06/12/2026');
  await page.getByTestId('txtDate').click();
  await page.locator('#email').click();
  await expect(page.getByTestId('datepicker')).toHaveValue('06/12/2026');
});

