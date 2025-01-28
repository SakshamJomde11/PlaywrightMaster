import { test, expect } from '@playwright/test';
import { LoginPage } from '../../logintest/LoginPage';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate(   );
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.enterEmail('tfxtest+truefillsupplieron1@titancloud.com');
    await loginPage.enterPassword('Tfx@2023');
    await loginPage.clickLoginButton();

    // Verify successful login
    await expect(page).toHaveURL('https://qaexchange.truefill.com/Supplier/Dashboard/New'); // Adjust the URL as needed
  });

  test('should show an error message with invalid credentials', async ({ page }) => {
    await loginPage.enterEmail('tfxtest+truefillsupplieron1@truefill.com');
    await loginPage.enterPassword('Tfx@s2023');
    await loginPage.clickLoginButton();

    // Verify error message
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain("The email that you've entered doesn't match any account."); // Adjust message as needed
  });
});
