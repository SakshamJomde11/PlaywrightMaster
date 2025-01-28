// import {test, expect, chromium, Browser, Page, Locator, BrowserContext} from '@playwright/test';


// test('Login with Browser context : Mutiple Login', async ()=>{

//     const browser:Browser = await chromium.launch();

//     //browser context 1
//     const browser1:BrowserContext = await browser.newContext();
//     const page1:Page = await browser1.newPage();

//     //browser context 2
//     const browser2:BrowserContext = await browser.newContext();
//     const page2:Page = await browser2.newPage();
    
    

//     //Browser 1
//     await page1.goto('https://qaexchange.truefill.com/Account/Login?returnUrl=%2F');
//     const emailId1:Locator = await page1.locator('[id="Email"]');
//     const password1:Locator = await page1.locator('[id="Password"]');
//     const btnLogin1:Locator = await page1.locator('[id="btn-login"]');

//     await emailId1.fill('tfxtest+truefillsupplieron1@titancloud.com')
//     await password1.fill('Tfx@2023');
//     await btnLogin1.click();
    
//     //Browser 2
//     await page2.goto('https://qaexchange.truefill.com/Account/Login?returnUrl=%2F');
//     const emailId2:Locator = await page2.locator('[id="Email"]');
//     const password2:Locator = await page2.locator('[id="Password"]');
//     const btnLogin2:Locator = await page2.locator('[id="btn-login"]');

//     await emailId2.fill('tfxtest+truefillsupplieroff1@titancloud.com')
//     await password2.fill('Tfx@2023');
//     await btnLogin2.click();


// });