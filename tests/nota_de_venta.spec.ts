import { test, expect, Locator } from '@playwright/test';

async function limpiarValorNeto(valor: Locator): Promise<number> {
  const rawText = await valor.textContent() || '';
  const cleanedText = rawText
    .replace(/\s/g, '')
    .replace('$', '')
    .replace(/\./g, '')
    .replace(',', '.');

  const total = parseInt(cleanedText);
  const totalInt = Math.round(total);
  return totalInt;
}

test('Verificar que no permita realizar una nota de venta sin productos asociados.', async ({page}) => {
        await page.goto('/');

    //Ingreso e inicion de sesion de la pagina
    await page.getByPlaceholder('Correo Electrónico').fill('qa_junior@relke.cl');
    await page.getByPlaceholder('Contraseña').fill('Demo123456!');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    await page.click('.navbar-brand');
    await page.waitForLoadState('networkidle');
      
    //Ingreso a apartado nueva nota de venta
    await page.getByRole('link', { name: 'Ventas ' }).click();
    await page.getByRole('link', { name: 'Notas de venta' }).click();
    await page.locator('//a[@data-title="Nueva nota de venta"]').click();

    //Espera para que sea visible la pagina solicitada.
    await page.waitForSelector('//label[contains(text(),"Sucursal")]', { timeout: 5000 });

    //Seleccionar Sucursal
    await page.locator('//span[@id="select2-sales_note_branch_id-container"]').click();
    await page.locator('//li[contains(text(),"Casa matriz")]').click();


    //Seleccionar boleta electronica en documento tributario
    await page.locator('//span[@aria-labelledby="select2-sales_note_type_document_sii-container"]').click();
    await page.locator('//li[contains(text(),"BOLETA ELEC")]').click();

    //Selecionar bodega principal en selector de bodega
    await page.locator('//span[@aria-labelledby="select2-sales_note_ware_house_id-container"]').click();
    await page.locator('//li[contains(text(),"Bodega principal")]').click();

    //Selecionar cliente
    await page.locator('//span[@aria-labelledby="select2-sales_note_customer_id-container"]').click();
    await page.locator('//input[@class="select2-search__field"]').fill("Diego");
    await page.waitForSelector('//li[contains(text(),"Diego")]', { timeout: 3000 });
    await page.locator('//li[contains(text(),"Diego")]').click();

    //Seleccionar moneda
    await page.locator('//span[@id="select2-sales_note_currency-container"]').click();
    await page.locator('//li[contains(text(),"Pesos")]').click();

    //Crear nota de venta
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await page.locator('//button[@value="create"]').click();

   //Validacion de error.
   const divError = page.locator('//div[@class="alert alert-danger alert-dismissable no-margin no-radius mb-20"]')
   const msnErrorDebeSeleccionarProducto = page.locator('//li[contains(text(),"Debe seleccionar un producto.")]')
   await expect(divError).toBeVisible();
   await expect(msnErrorDebeSeleccionarProducto).toBeVisible();

   //Validar cantidad y precio requeridos mediante border rojo
   const cantidadObligatorio = page.locator('(//div[@class="field_with_errors"])[1]')
   const precioObligatorio = page.locator('(//div[@class="field_with_errors"])[2]')
   await expect(cantidadObligatorio).toBeVisible();
   await expect(precioObligatorio).toBeVisible();
})


test('Verificacion de logout exitoso', async ({page}) => {
   await page.goto('/');
  //Ingreso e inicion de sesion de la pagina
   await page.getByPlaceholder('Correo Electrónico').fill('qa_junior@relke.cl');
   await page.getByPlaceholder('Contraseña').fill('Demo123456!');
   await page.getByRole('button', { name: 'Iniciar sesión' }).click();
   await page.click('.navbar-brand');
   await page.waitForLoadState('networkidle');

   //Click perfil y logout
   await page.locator('(//a[@class="dropdown-toggle dropdown-toggle-profile"])[2]').click();
   await page.locator('//a[contains(.,"Salir")]').click();

   //Validacion de logout exitosamente
   const inputCorreo = page.locator('//input[@name="user[email]"]')
   const logoRelBase = page.locator('//img')
   await expect(inputCorreo).toBeVisible();
   await expect(logoRelBase).toBeVisible();
})


test('Creacion y verificacion de nueva nota de venta', async ({page}) =>{
    await page.goto('/');

    //Ingreso e inicion de sesion de la pagina
    await page.getByPlaceholder('Correo Electrónico').fill('qa_junior@relke.cl');
    await page.getByPlaceholder('Contraseña').fill('Demo123456!');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    await page.click('.navbar-brand');
    await page.waitForLoadState('networkidle');
      
    //Ingreso a apartado nueva nota de venta
    await page.getByRole('link', { name: 'Ventas ' }).click();
    await page.getByRole('link', { name: 'Notas de venta' }).click();
    await page.locator('//a[@data-title="Nueva nota de venta"]').click();

    //Espera para que sea visible la pagina solicitada.
    await page.waitForSelector('//label[contains(text(),"Sucursal")]', { timeout: 5000 });

    //Seleccionar Sucursal
    await page.locator('//span[@id="select2-sales_note_branch_id-container"]').click();
    await page.locator('//li[contains(text(),"Casa matriz")]').click();


    //Seleccionar boleta electronica en documento tributario
    await page.locator('//span[@aria-labelledby="select2-sales_note_type_document_sii-container"]').click();
    await page.locator('//li[contains(text(),"BOLETA ELEC")]').click();

    //Selecionar bodega principal en selector de bodega
    await page.locator('//span[@aria-labelledby="select2-sales_note_ware_house_id-container"]').click();
    await page.locator('//li[contains(text(),"Bodega principal")]').click();

    //Selecionar cliente
    await page.locator('//span[@aria-labelledby="select2-sales_note_customer_id-container"]').click();
    await page.locator('//input[@class="select2-search__field"]').fill("Diego");
    await page.waitForSelector('//li[contains(text(),"Diego")]', { timeout: 3000 });
    await page.locator('//li[contains(text(),"Diego")]').click();

    //Seleccionar moneda
    await page.locator('//span[@id="select2-sales_note_currency-container"]').click();
    await page.locator('//li[contains(text(),"Pesos")]').click();

    //Agregar 2 audifonos JBL
    await page.locator('//span[@id="select2-sales_note_e_document_products_attributes_0_product_id-container"]').click();
    await page.locator('//input[@class="select2-search__field"]').fill("Audifonos JBL");
    await page.waitForSelector('//li[contains(text(),"JBL")]', { timeout: 3000 });
    await page.locator('//li[contains(text(),"JBL")]').click();
    const cantidad = "2";
    await page.locator('//input[@id="sales_note_e_document_products_attributes_0_quantity"]').fill(cantidad);


    //Obtener valor neto de cada audifono
    const locator = page.locator('//input[@id="sales_note_e_document_products_attributes_0_price"]');
    await locator.waitFor({ state: 'attached' });
    const elHandle = await locator.elementHandle();
    await page.waitForFunction(
      el => (el as HTMLInputElement).value !== '',
      elHandle,
      { timeout: 5000 }
    );
    const value = await locator.inputValue();
    const valorUnitario = parseInt(value, 10);

    //Obtener el total y validar
    const valorPrecioUnitario = page.locator('//p[@id="total"]');
    const valorTotalLimpiado = await limpiarValorNeto(valorPrecioUnitario);
    //Validar que el valor unitario por la cantidad de productos sea correcta en el total.
    expect(valorUnitario*(parseInt(cantidad,10))).toBe(valorTotalLimpiado);

    //Crear nota de venta
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await page.locator('//button[@value="create"]').click();

    //Validar que pdf sea visible
    const iframeLocator = page.locator('(//iframe)[1]');
    await expect(iframeLocator).toBeVisible();
  })