import { test, expect } from '@playwright/test';

test.describe('Tests for challenge page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should render correctly', async ({ page }) => {
		const startButton = page.locator('button:has-text("Iniciar Desafio")');
		await expect(startButton).toBeVisible();
	});

	test('should start challenge,wait for timout to open modal', async ({ page }) => {
		await page.click('button:has-text("Iniciar Desafio")');
		await expect(page.locator('#name')).toBeDisabled();
		await expect(page.locator('#phone')).toBeDisabled();
		await expect(page.locator('#email')).toBeDisabled();

		const countdownText = page.locator('text=Tempo Restante:');
		await expect(countdownText).toBeVisible();
		await expect(countdownText).toContainText('00m e');

		const challengeDuration = 15;
		await page.waitForTimeout(challengeDuration * 1000);

		const modal = page.locator('dialog.modal-open');
		await expect(modal).toBeVisible();
		await expect(modal.locator('h3')).toHaveText('Oops! Você não terminou o desafio a tempo');
		await expect(modal.locator('p')).toHaveText(
			'Infelizmente, você não terminou o desafio a tempo'
		);

		await modal.locator('button:has-text("✕")').click();
		await expect(modal).not.toBeVisible();
	});

	test('should show modal on click "Enviar" ', async ({ page }) => {
		await page.click('button:has-text("Iniciar Desafio")');
		await page.waitForTimeout(2000);
		await page.click('button:has-text("Enviar")');

		const modal = page.locator('dialog.modal-open');
		await expect(modal).toBeVisible();
		await expect(modal.locator('h3')).toHaveText('Desafio finalizado com sucesso!');
		await expect(modal.locator('p')).toHaveText('Desafio realizado com sucesso');
		await modal.locator('button:has-text("✕")').click();
		await expect(modal).not.toBeVisible();
	});

	test('should fill input, go to candidate page and check values', async ({ page }) => {
		await page.fill('#name', 'Test Name');
		await page.fill('#phone', '1234567890');
		await page.fill('#email', 'test@test.com');

		await page.click('button:has-text("Iniciar Desafio")');

		const button = page.locator('a:has-text("Candidate")');
		await expect(button).toBeVisible();
		await button.click();
		await page.waitForURL('/candidate');

		await expect(page.locator('body')).toContainText('Test Name');
		await expect(page.locator('body')).toContainText('1234567890');
		await expect(page.locator('body')).toContainText('test@test.com');
	});
});
