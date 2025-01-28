import{Locator, Page} from '@playwright/test';

export class LoginPage{

    private page:Page;
    private usernameInput:Locator;
    private passwordInput:Locator;
    private loginButton:Locator;

    constructor(page:Page){
        this.page = page;
    

    // Using `getByTestId` for selectors
    this.usernameInput = page.locator('id=Email');
    this.passwordInput = page.locator('id=Password');
    this.loginButton = page.locator('id=btn-login');
    }

    async navigate() {
    await this.page.goto('https://qaexchange.truefill.com/'); // Update with the actual login route
    }

    async enterEmail(email: string) {
    await this.usernameInput.fill(email);
    }

    async enterPassword(password: string) {
    await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
    await this.loginButton.click();
    }

    async getErrorMessage(): Promise<string> {
        const text = await this.page.locator('.msgText').textContent();
        return text ?? ''; // If null, default to an empty string
    }
      
   
   
}


    
