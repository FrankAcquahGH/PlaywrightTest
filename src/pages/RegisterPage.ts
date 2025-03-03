import { Page, Locator, expect } from '@playwright/test';

class RegisterPage {
    private page: Page;
    
    public registerButton: Locator;
    public usernameInput: Locator;
    public emailInput: Locator;
    public passwordInput: Locator;
    public checkboxes: Locator;
    public gender1: Locator;
    public gender2: Locator;
    public dropdwonClick: Locator;
    public stateDropdown: Locator;
    public scrollList: Locator;
    public submitButton: Locator;
    // private successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.registerButton = page.locator('#login_container > form > div > a');
        this.usernameInput = page.locator('input#name');
        this.emailInput = page.locator('input#email');
        this.passwordInput = page.locator('input#password');
        this.checkboxes = page.locator('input[type=checkbox]'); 
        this.gender1 = page.locator('input#gender1'); 
        this.gender2 = page.locator('input#gender2'); 
        this.dropdwonClick = page.locator('#state')
        this.stateDropdown = page.locator('select#state'); 
        this.scrollList = page.locator('select#hobbies'); 
        this.submitButton = page.locator('button.submit-btn');
        // this.successMessage = page.locator('#success-message'); 
    }

    async navigate(): Promise<void> {
        await this.page.goto('https://freelance-learn-automation.vercel.app/login');
    }

    async signupLink(): Promise<void> {
        await this.registerButton.click();
    }

    async enterUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }

    async enterEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async checkAllCheckboxes(): Promise<void> {
        const count = await this.checkboxes.count();
        for (let i = 0; i < count; i++) {
            await this.checkboxes.nth(i).check();
        }
    }

    async selectGender(option: 'male' | 'female' = 'male'): Promise<void> {
        if (option === 'male') {
            await this.gender1.check();
        } else {
            await this.gender2.check();
        }
    }

    async selectStateByIndex(index: number): Promise<void> {
        await this.stateDropdown.waitFor({ state: 'visible' });
    
        // Get all options in the dropdown
        const options = await this.stateDropdown.locator('option').allInnerTexts();
        console.log('Available options:', options);
    
        // Ensure the index is valid before selecting
        if (index >= options.length) {
            throw new Error(`Index ${index} is out of bounds. Only ${options.length} options available.`);
        }
    
        // Select option by index
        await this.stateDropdown.selectOption({ index: index });
    
        // Confirm selection
        const selectedValue = await this.stateDropdown.inputValue();
        console.log(`Selected state: ${selectedValue}`);
    }
    
    async selectFromScrollList(value: string): Promise<void> {
        await this.scrollList.waitFor({ state: 'visible' });
    
        // Log available options for debugging
        const options = await this.scrollList.locator('option').allInnerTexts();
        console.log("Available scroll list options:", options);
    
        // Ensure the value exists before selecting
        if (!options.includes(value)) {
            throw new Error(`Option "${value}" not found in the scroll list.`);
        }
    
        // Select the option by value
        await this.scrollList.selectOption({ value });
    
        // Confirm selection
        const selectedValue = await this.scrollList.inputValue();
        console.log(`Selected scroll list item: ${selectedValue}`);
    }
    
    // async selectFromScrollList(value: string): Promise<void> {
    //     await this.scrollList.locator(`option[value="${value}"]`).click();
    // }

    async clickRegisterButton(): Promise<void> {
        await this.submitButton.click();
    }

    //  async assertRegistrationSuccess(): Promise<void> {
    //         await expect (this.page).toHaveTitle('Registration successful');
    //     }

    async register(username: string, email: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.checkAllCheckboxes();
        await this.selectGender('male'); // Default gender
        await this.selectStateByIndex(2); // Example state selection
        await this.selectFromScrollList('Reading'); // Example scroll list selection
        await this.clickRegisterButton();
        // await expect(this.page).toHaveTitle('Registration successful');
    }
}

export default RegisterPage;