import { expect, test } from '@playwright/test';

test('index page has expected content', async ({ page }) => {
	await page.goto('/');
	// Check for text that appears in the main heading
	await expect(page.getByText('Passionate about')).toBeVisible();
});
