import { test, expect, page } from '@playwright/test';
import LoginPage from './loginPage'; // Adjust path as needed
import RegisterPage from './registerPage'; // Adjust path as needed
import EnrollPage from './enrollPage'; // Adjust path as needed
import { faker } from '@faker-js/faker';

test.describe('Enrollment Tests with Registration and Login', () => {
    let page;
    let loginPage;
    let registerPage;
    let enrollPage;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        loginPage = new LoginPage(page);
        registerPage = new RegisterPage(page);
        enrollPage = new EnrollPage(page);
    });

    test.afterAll(async () => {
        await page.close();
    });

    test('should register, login, and enroll in a course', async () => {
        // Generate fake data with Faker.js
        const fakeUsername = faker.internet.firstname();
        const fakeEmail = faker.internet.email();
        const fakePassword = faker.internet.password(12);

        // Step 1: Navigate to registration and sign up
        await registerPage.navigate();
        await registerPage.signupLink();
        await registerPage.register(fakeUsername, fakeEmail, fakePassword);
        // Note: Adjust registerPage.assertRegistrationSuccess() if you uncomment and implement it

        // Step 2: Login with the registered user
        await loginPage.navigate();
        await loginPage.login(fakeEmail, fakePassword);
        await loginPage.assertLoginSuccess();

        // Step 3: Enroll in a course
        await enrollPage.navigate();
        await enrollPage.enroll('course-101'); // Replace with a valid course value from your app
        await enrollPage.assertEnrollmentSuccess();
    });
});