
import {Page,BrowserContext,Browser, chromium} from '@playwright/test';
import path from 'path';

export class WebActions{
    browser:Browser;
    browserContext:BrowserContext;
    page:Page;

    async initializesBrowser(browserName: string, isHeadless: boolean): Promise<void> {
        this.browser=await chromium.launch({headless:isHeadless,slowMo:1000,channel:browserName});
        this.browserContext=await this.browser.newContext({ignoreHTTPSErrors:true,acceptDownloads:true});
        //this.browserContext.setDefaultNavigationTimeout(110000);
        this.browserContext.setDefaultTimeout(110000);
        this.page=await this.browserContext.newPage();   
    }

    async closePage(): Promise<void>{
       await this.page.close();  
    }
    async closeBrowserContext(): Promise<void>{
        await this.browserContext.close();  
     }
     async openURL(url: string){
       await this.page.goto(url,{ waitUntil: "load", timeout: 30000 });
    }
    async refresh(): Promise<void> {
        await this.page.reload();
    }
    async clickElement(locator:string): Promise<void> {
        await this.waitForElementToBeClickable(locator);
        await this.page.click(locator,{button:'left'});
    }
    async enterTextOnElement(locator:any,value:any): Promise<any> {
        await this.page.fill(locator,value);
    }
    async waitForElementToBeClickable(locator:any): Promise<any> {
        try {
            await this.page.isEnabled(locator,{timeout:15000});
          } catch (error) {
            console.error('Element is not clickable within the specified timeout.');
          }
    }
    async waitUntillElementDisappear(locator:any, timeInSeconds: number): Promise<void> {
        
        try {
            const startTime=Date.now();
            while(await this.isElementDisplayed(locator)){
                console.log(`Waiting for Element[${locator}] to be disappear...`);
                await this.waitForPageLoadState("networkidle");
                await this.waitForPageLoadState("load");
                await this.waitForPageLoadState("domcontentloaded");
                await this.waitForElement(1);
                const endTime=Date.now();
                if((endTime-startTime)>timeInSeconds*1000){
                    break;
                }
            } 
          } catch (error) {
            console.error(`Element:: ${locator} is not disappear within the specified timeout.`);
          }
        
    }
    async waitUntillElementAppear(locator:any, timeInSeconds: number): Promise<any> {
        try {
            const startTime=Date.now();
            while(!await this.isElementDisplayed(locator)){
                console.log(`Waiting for Element[${locator}] to be appear...`);
                await this.waitForPageLoadState("networkidle");
                await this.waitForPageLoadState("load");
                await this.waitForPageLoadState("domcontentloaded");
                await this.waitForElement(1);
                const endTime=Date.now();
                if((endTime-startTime)>timeInSeconds*1000){
                    break;
                }
            }
          } catch (error) {
            console.error(`Element:: ${locator} is not appear within the specified timeout.`);
          }
    }
    async waitForElement(timeInSeconds: number): Promise<void> {
        await this.page.waitForTimeout(timeInSeconds*1000)
    }
    async isElementDisplayed(locator: any): Promise<any> {
        try {
            if (await this.page.isVisible(locator)) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }
    async isElementEnabled(locator:any): Promise<any>{
        return await this.page.isEnabled(locator);
    }
    async isElementSelected(locator:any): Promise<any>{
        return await this.page.isChecked(locator);
    }
    async getAttributeValue(locator: any, value: any): Promise<any> {
        return await this.page.locator(locator).getAttribute(value)
    }
    async getURL(): Promise<any> {
        return this.page.url();
    }
    async evaluateExpression(expression: string): Promise<any> {
        return await this.page.evaluate(expression);
    }
    async takeScreenshot(options:any,screnshotType='FullPage',elementLocator?:any): Promise<any> {
        if(screnshotType=='FullPage'){
            await this.page.screenshot(options);
        }else{
            await this.page.locator(elementLocator).screenshot(options);
        }
        
    }
    async jsClick(locator:any): Promise<any> {
       const functionString=`
       const xpathSeletor='${locator}';
       const element=document.evalaute(xpathSeletor,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,Null).singleNodeValue;
       if(element instance of HTMLElement){
            element.click();
       }`;
       await this.evaluateExpression(functionString);
    }

    async getPageTitle(){
        return await this.page.title();
    }
    async getElementText(locator:any){
        return (await this.page.locator(locator).textContent()).trim();
    }

    async waitForPageLoadState(eventName:string):Promise<void>{
        switch (eventName.toLowerCase()) {
            case 'networkidle':
                await this.page.waitForLoadState("networkidle");
                break;
            case 'load':
                await this.page.waitForLoadState("load");
                break;
            case 'domcontentloaded':
                await this.page.waitForLoadState("domcontentloaded");
                break;
            default:
                console.log(`Invalid Event Name: ${eventName}`)

        }

    }
}