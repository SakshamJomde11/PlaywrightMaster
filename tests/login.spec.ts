import { test, expect } from '@playwright/test';
import { LoginPage } from '../logintest/LoginPage';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  test.only('Invalid login attempt', async () => {
    await loginPage.performLogin('Admin', 'admin12');
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test.only('Empty field validation', async () => {
    await loginPage.clickLogin();
    const requiredFields = await loginPage.getRequiredFields();
    await expect(requiredFields.usernameRequired).toBeVisible();
    await expect(requiredFields.passwordRequired).toBeVisible();
  });

  test.only('Successful login and logout', async () => {
    await loginPage.performLogin('Admin', 'admin123');
    await expect(loginPage.dashboardHeader).toBeVisible();
    
    await loginPage.logout();
    await expect(loginPage.usernameInput).toBeVisible();
  });
});