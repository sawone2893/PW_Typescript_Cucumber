import { FactoryRegistries } from '../factory/factory_registry';
import { LocatorConstants } from '../utilities/LocatorConstants';

export class TestExecutor {

    private commonPage = FactoryRegistries.commonPage;

    async executeAction(testStep) {
        switch (testStep.action) {
            case 'Click':
                await global.actionDriver.clickElement(testStep.locator);
                break;
            case 'EnterValue':
                await global.actionDriver.enterTextOnElement(testStep.locator, testStep.value);
                break;
            case 'WaitUntillElementDisappear':
                await global.actionDriver.waitUntillElementDisappear(testStep.locator,110);
                break;
            case 'WaitUntillElementAppear':
                await global.actionDriver.waitUntillElementAppear(testStep.locator,110);
                break;
            case 'VerifyPageTitle':
                const pageTitle = await global.actionDriver.getPageTitle();
                global.expect_(pageTitle).to.be.equal(testStep.value);
                break;
            case 'VerifyElementText':
                const textValue = await global.actionDriver.getElementText(testStep.locator, testStep.value);
                global.expect_(textValue).to.be.equal(testStep.value);
                break;
            case 'VerifyVisibility':
                const isVisible = await global.actionDriver.isElementDisplayed(testStep.locator);
                global.expect_(isVisible).to.be.equal(testStep.value === 'true');
                break;
            case 'WaitForPageLoadState':
                await global.actionDriver.waitForPageLoadState(testStep.value);
                break;
            case 'WaitForElement':
                await global.actionDriver.waitForElement(Number(testStep.value));
                break;
                  
            default:
                console.log(`${testStep.action} is not defined.Please define your action in the TestExecutor Class.`)
        }
    }
    async getLocator(locatorIdentifier: string, parameters?: string){
        let locatorGenerator = LocatorConstants[locatorIdentifier];
        let locatorVariable = locatorGenerator.split('.');
        if (parameters) {
            let locatorParams = parameters.split(',');
            switch (locatorParams.length) {
                case 1:
                    return this[locatorVariable[0]][locatorVariable[1]][locatorVariable[2]](await this.handleSeperatorInParams(locatorParams[0]));
                case 2:
                    return this[locatorVariable[0]][locatorVariable[1]][locatorVariable[2]](
                        await this.handleSeperatorInParams(locatorParams[0]),
                        await this.handleSeperatorInParams(locatorParams[1])
                    );
                case 3:
                    return this[locatorVariable[0]][locatorVariable[1]][locatorVariable[2]](
                        await this.handleSeperatorInParams(locatorParams[0]),
                        await this.handleSeperatorInParams(locatorParams[1]),
                        await this.handleSeperatorInParams(locatorParams[2])
                    );
                default:
                    console.log(`Handler for ${locatorParams.length} parameters is not available.Please add it.`)
            }

        } else {

        }

    }

    private async handleSeperatorInParams(parameter: string) {
        return parameter.replaceAll('%2C', ',');
    }
}

