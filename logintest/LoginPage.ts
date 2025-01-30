// pages/login.page.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;

  // Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly dashboardHeader: Locator;
  readonly userMenu: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Initialize locators
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.getByText('Invalid credentials');
    this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });
    this.userMenu = page.getByText('NtEjDwiqnQ user');
    this.logoutButton = page.getByRole('menuitem', { name: 'Logout' });
  }

  // Page actions
  async navigateToLoginPage(url: string) {
    await this.page.goto(url);
  }

  async enterUsername(username: string) {
    await this.usernameInput.click();
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string) {
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async performLogin(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async logout() {
    await this.userMenu.click();
    await this.logoutButton.click();
  }

  async getRequiredFields() {
    return {
      usernameRequired: this.page.getByText('Required').first(),
      passwordRequired: this.page.getByText('Required').nth(1)
    };
  }
}