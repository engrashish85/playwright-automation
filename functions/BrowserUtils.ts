import { Locator, expect } from "@playwright/test";
export async function validateObject(elements: Locator[]) {
    for (const element of elements) {
        await expect(element).toBeVisible();
    }
}
