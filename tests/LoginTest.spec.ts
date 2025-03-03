import { test, expect, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import LoginPage from '../src/pages/LoginPage';

test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
        // await loginPage.logout();
    });

    test('should login with valid credentials', async ({ page }) => {
        // Generate fake email and password
        const validEmail = faker.internet.email();
        const validPassword = faker.internet.password({ length: 8, memorable: true });

        // Perform login
        await loginPage.login(validEmail, validPassword);

        // console.log(`Email: ${validEmail}, Password: ${validPassword}`);
    });
});