import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import RegisterPage from '../src/pages/RegisterPage';

test.describe('Registration Tests', () => {
    let registerPage: RegisterPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        await registerPage.navigate();
        await registerPage.signupLink();
    });

    test('should display registration form', async ({ page }) => {
        await expect(page.locator('#root > div > div.container-child > div')).toBeVisible();
    });

    test('should register a new user', async ({ page }) => {
        // Generate fake user details
        const fakeUsername = faker.internet.username();
        const fakeEmail = faker.internet.email();
        const fakePassword = faker.internet.password({length:10, memorable:true});

        // Perform registration using POM
        await registerPage.register(fakeUsername, fakeEmail, fakePassword);
        // await registerPage.selectState("Goa"); // Ensure the exact label matches the dropdown option


        // Validate successful registration
        // await expect(page).toHaveTitle('Registration successful');

        // Log Faker-generated data for debugging
        console.log(`Registered user: ${fakeUsername}, Email: ${fakeEmail}, Password: ${fakePassword}`);
    });

    test('Select state from dropdown by index', async () => {
        await registerPage.selectStateByIndex(3);
    });
});