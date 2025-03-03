import { Page, Locator, expect } from 'playwright/test';

class LoginPage {
    private page: Page;

    public useremailInput: Locator;
    public passwordInput: Locator;
    public loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.useremailInput = page.locator('//input[@placeholder="Enter Email"]');
        this.passwordInput = page.locator('//input[@placeholder="Enter Password"]');
        this.loginButton = page.locator('.submit-btn');
    }

    async navigate(): Promise<void> {
        await this.page.goto('https://freelance-learn-automation.vercel.app/login');
        // https://demoqa.com/
    }

    async login(email: string, password: string): Promise<void> {
        await this.useremailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    async assertLoginSuccess(): Promise<void> {
        await expect(this.page).toHaveURL('https://freelance-learn-automation.vercel.appllogin');
    }
}

export default LoginPage;