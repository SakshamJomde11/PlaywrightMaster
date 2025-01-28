import {test, expect, Browser, chromium, Page, Locator, BrowserContext} from '@playwright/test';

test('Hover Test', async()=> {

    // const browser:Browser = await chromium.launch({headless: false});

    const browser:BrowserContext = await chromium.launchPersistentContext('',{headless : false});

    const pages = browser.pages();
    const page: Page = pages[0];

    await page.goto('https://www.bigbasket.com/');

    const shopCategory = await page.locator('[id="headlessui-menu-button-:R5bab6:"]');

    await shopCategory.first().click();

    await page.getByText('Beverages').first().hover();
    await page.getByText('Tea').first().hover();
    await page.locator('.CategoryTree___StyledLink3-sc-8wbym9-2 kuLxIQ').click();


});