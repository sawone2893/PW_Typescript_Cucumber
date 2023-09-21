
import {Page,BrowserContext,Browser, chromium, Locator} from 'playwright';
import path from 'path';

export class WebActions{
    browser:Browser;
    browserContext:BrowserContext;
    page:Page;

    async initializesBrowser(browserName: string, isHeadless: boolean): Promise<void> {
        this.browser=await chromium.launch({headless:isHeadless,slowMo:1000,channel:browserName});
        this.browserContext=await this.browser.newContext({ignoreHTTPSErrors:true,acceptDownloads:true});
        this.page=await this.browserContext.newPage();
        this.browserContext.setDefaultTimeout(300000);
        this.browserContext.setDefaultNavigationTimeout(300000);
    }

    async closePage(): Promise<void>{
       await this.page.close();  
    }
    async closeBrowserContext(): Promise<void>{
        await this.browserContext.close();  
     }
     async openURL(url: string){
       await this.page.goto(url);
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
            await this.page.waitForSelector(locator, { state: 'hidden',timeout:timeInSeconds*1000 });
          } catch (error) {
            console.error('Element is not disappear within the specified timeout.');
          }
        
    }
    async waitUntillElementAppear(locator:any, timeInSeconds: number): Promise<any> {
        try {
            await this.page.waitForSelector(locator, { state: 'visible',timeout:timeInSeconds*1000 });
          } catch (error) {
            console.error('Element is not appear within the specified timeout.');
          }
    }
    async waitForElement(timeInSeconds: number): Promise<void> {
        await this.page.waitForTimeout(timeInSeconds*1000)
    }
    async isElementDisplayed(locator:any): Promise<any>{
       return await this.page.isVisible(locator);
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