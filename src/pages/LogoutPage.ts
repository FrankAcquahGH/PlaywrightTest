import { Page, Locator, expect } from '@playwright/test';

class LogoutPage {
    private page: Page;


    constructor (page: Page){
        this.page = page;
    }
}