"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
(0, test_1.test)('Login y navegación inicial a Nota de Venta', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Correo Electrónico').fill('qa_junior@relke.cl');
    await page.getByPlaceholder('Contraseña').fill('Demo123456!');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    await page.click('.navbar-brand');
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: 'Ventas ' }).click();
    await page.getByRole('link', { name: 'Notas de venta' }).click();
    await page.waitForSelector('#btn-new-invoice', { timeout: 3000 });
    await (0, test_1.expect)(page.getByText('Mostrar:')).toBeVisible();
});
