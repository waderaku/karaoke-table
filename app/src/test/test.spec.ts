import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
});
test.describe('Name Change', () => {
    test('should allow me to add todo items', async ({ page }) => {
        const defaultName = await page.locator("#userName").innerText()
        expect(defaultName).toBe("名無し");
        await page.locator('#change-user-name').click();
        await page.locator('#user-name-field').fill('test');
        await page.locator('#saveNameButton').click()

        const userName = await page.locator("#userName").innerText()
        expect(userName).toBe("test");
        // await page.screenshot({ path: `example-test2.png` });
    });

});
