import { Page, Locator, expect } from '@playwright/test';

class EnrollPage {
    private page: Page;

    public courseDropdown: Locator;
    public enrollButton: Locator;
    public successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.courseDropdown = page.locator('select#course'); // Adjust locator as needed
        this.enrollButton = page.locator('button.enroll-btn'); // Adjust locator as needed
        this.successMessage = page.locator('.enrollment-success'); // Adjust locator as needed
    }

    async navigate(): Promise<void> {
        await this.page.goto('https://freelance-learn-automation.vercel.app/enroll');
    }

    async selectCourse(courseValue: string): Promise<void> {
        await this.courseDropdown.waitFor({ state: 'visible' });
        const options = await this.courseDropdown.locator('option').allInnerTexts();
        console.log('Available courses:', options);

        if (!options.includes(courseValue)) {
            throw new Error(`Course "${courseValue}" not found in the dropdown.`);
        }

        await this.courseDropdown.selectOption({ value: courseValue });
        const selectedValue = await this.courseDropdown.inputValue();
        console.log(`Selected course: ${selectedValue}`);
    }

    async clickEnrollButton(): Promise<void> {
        await this.enrollButton.click();
    }

    async enroll(courseValue: string): Promise<void> {
        await this.selectCourse(courseValue);
        await this.clickEnrollButton();
    }

    async assertEnrollmentSuccess(): Promise<void> {
        await expect(this.successMessage).toBeVisible();
        await expect(this.page).toHaveURL(/.*enroll-success$/); // Adjust regex based on actual URL
    }
}

export default EnrollPage;