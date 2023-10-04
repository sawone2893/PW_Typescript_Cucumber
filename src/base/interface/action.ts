interface IAction{
    initialize(browserChannelName: any, isHeadless: any):Promise<void>;
    closeBrowser(): Promise<void>;
    openURL(url:string): Promise<void>;
    refresh():Promise<void>;
    clickElement(locator:any):Promise<void|any>;
    enterTextOnElement(locator:any,value:any):Promise<void|any>;
    waitForElementToBeClickable(locator:any):Promise<void|any>;
    waitUntillElementDisappear(locator:any,timeInSeconds:number):Promise<void>;
    waitUntillElementAppear(locator:any,timeInSeconds?:number):Promise<void>;
    waitForElement(locator:any,timeInSeconds?:number):Promise<void>;
    isElementDisplayed(locator:any):Promise<boolean|any>;
    isElementEnabled(locator:any):Promise<boolean|any>;
    isElementSelected(locator:any):Promise<boolean|any>;
    getAttributeValue(locator:any,value:any):Promise<any>;
    getURL():Promise<string|any>;
    evaluateExpression(expression:string):Promise<void|any>;
    takeScreenshot(options:any,screnshotType:any,elementLocator?:any):Promise<void|any>;
    jsClick(locator:any):Promise<void|any>;
    scrollIntoView(locator:any):Promise<void>;
    isElementPresent(locator: any):Promise<any>;
}
export {IAction}