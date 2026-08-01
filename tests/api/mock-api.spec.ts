import { test, expect } from "@playwright/test";

test("Mock API", async ({ page }) => {

    await page.route('**/api/v1/fruits', async route => {
        const json = [
            { name: "Blueberry", id: 3 },
            { name: "Cavendish Banana", id: 1 },
            { name: "Truss Tomatoes", id: 5 },
            { name: "Pears", id: 4 },
            { name: "Blackberry", id: 64 },
            { name: "Kiwi", id: 66 },
            { name: "Pineapple", id: 10 },
            { name: "Passionfruit", id: 70 },
            { name: "Novel Oranges", id: 2 },
            { name: "Raspberry", id: 23 },
            { name: "Watermelon", id: 25 },
            { name: "Lemon", id: 26 },
            { name: "Mango", id: 27 },
            { name: "Blueberry", id: 33 },
            { name: "Apple", id: 6 },
            { name: "Melon", id: 41 },
            { name: "Lime", id: 44 }
        ];
        await route.fulfill({ json });
    })
    await page.goto("https://demo.playwright.dev/api-mocking/");
    await expect(page.getByRole("listitem")).toHaveCount(17);
    await expect(page.getByRole("list")).toContainText("Cavendish Banana");
    await expect(page.getByRole("listitem").filter({hasText:"Truss Tomatoes"})).toBeVisible();
    await expect(page.getByText("Novel Oranges")).toBeVisible();
    const textContents = await page.getByRole("listitem").allInnerTexts();
    console.log(textContents);
    expect (textContents.includes("Passionfruit")).toBeTruthy();
});