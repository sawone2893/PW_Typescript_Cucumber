
import { Browser, BrowserContext, LaunchOptions, Page, chromium, firefox, webkit } from 'playwright';
import { IAction } from '../interface/action';

export class PlaywrightActions implements IAction{

    private browserType: string;
    private browser: Browser | null = null;;
    private context: BrowserContext | null = null;
    private page: Page | null = null;

    constructor(browserType: string) {
        this.browserType = browserType;
    }

    async initialize(browserChannelName: any, isHeadless: any) {
        this.browser = await this.launchBrowser(browserChannelName, isHeadless);
        this.context = await this.browser.newContext({ ignoreHTTPSErrors: true, acceptDownloads: true })
        this.page = await this.browser.newPage();
        this.context.setDefaultTimeout(110000);
    }

    async launchBrowser(browserChannelName: any, isHeadless: any): Promise<Browser> {
        const launchOptions: LaunchOptions = {
            headless: isHeadless,
            slowMo: 1000,
            channel: browserChannelName.toLowerCase()
        };
        switch ((this.browserType).toLowerCase()) {
            case 'chromium':
                return await chromium.launch(launchOptions);
            case 'firefox':
                return await firefox.launch(launchOptions);
            case 'webkit':
                return await webkit.launch(launchOptions);
            default:
                throw new Error(`Unsupported browser Type: ${this.browserType}`);
        }
    }

    async closeBrowser(): Promise<void> {
        await this.browser.close();
    }

    async openURL(url: string) {
        await this.page.goto(url, { waitUntil: "load", timeout: 30000 });
    }

    async refresh(): Promise<void> {
        await this.page.reload();
    }

    async clickElement(locator: string): Promise<void> {
        await this.waitForElementToBeClickable(locator);
        await this.page.click(locator, { button: 'left' });
    }

    async enterTextOnElement(locator: any, value: any): Promise<any> {
        await this.page.fill(locator, value);
    }

    async waitForElementToBeClickable(locator: any): Promise<any> {
        try {
            await this.page.isEnabled(locator, { timeout: 15000 });
        } catch (error) {
            console.error('Element is not clickable within the specified timeout.');
        }
    }

    async waitUntillElementDisappear(locator: any, timeInSeconds: number): Promise<void> {

        try {
            const startTime = Date.now();
            while (await this.isElementDisplayed(locator)) {
                console.log(`Waiting for Element[${locator}] to be disappear...`);
                await this.waitForPageLoadState("networkidle");
                await this.waitForPageLoadState("load");
                await this.waitForPageLoadState("domcontentloaded");
                await this.waitForElement(1);
                const endTime = Date.now();
                if ((endTime - startTime) > timeInSeconds * 1000) {
                    break;
                }
            }
        } catch (error) {
            console.error(`Element:: ${locator} is not disappear within the specified timeout.`);
        }

    }

    async waitUntillElementAppear(locator: any, timeInSeconds: number): Promise<any> {
        try {
            const startTime = Date.now();
            while (!await this.isElementDisplayed(locator)) {
                console.log(`Waiting for Element[${locator}] to be appear...`);
                await this.waitForPageLoadState("networkidle");
                await this.waitForPageLoadState("load");
                await this.waitForPageLoadState("domcontentloaded");
                await this.waitForElement(1);
                const endTime = Date.now();
                if ((endTime - startTime) > timeInSeconds * 1000) {
                    break;
                }
            }
        } catch (error) {
            console.error(`Element:: ${locator} is not appear within the specified timeout.`);
        }
    }

    async waitForElement(timeInSeconds: number): Promise<void> {
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }

    async isElementDisplayed(locator: any): Promise<boolean> {
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

    async isElementEnabled(locator: any): Promise<any> {
        return await this.page.isEnabled(locator);
    }

    async isElementSelected(locator: any): Promise<any> {
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

    async takeScreenshot(options: any, screnshotType = 'FullPage', elementLocator?: any): Promise<any> {
        if (screnshotType == 'FullPage') {
            await this.page.screenshot(options);
        } else {
            await this.page.locator(elementLocator).screenshot(options);
        }

    }

    async jsClick(locator: any): Promise<any> {
        const functionString = `
       const xpathSeletor='${locator}';
       const element=document.evalaute(xpathSeletor,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,Null).singleNodeValue;
       if(element instance of HTMLElement){
            element.click();
       }`;
        await this.evaluateExpression(functionString);
    }

    async getPageTitle() {
        return await this.page.title();
    }
    
    async getElementText(locator: any) {
        return (await this.page.locator(locator).textContent()).trim();
    }

    async waitForPageLoadState(eventName: string): Promise<void> {
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