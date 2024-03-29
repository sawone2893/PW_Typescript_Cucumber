import { Given,When, Then } from "@cucumber/cucumber";
import {FactoryRegistries} from '../../src/factory/factory_registry'

const testExecutor=FactoryRegistries.testExecutor();


/*Example:
 * When I "EnterValue" "Shabbir" for "TextField" with values "Username"
 */
When('I {string} {string} for {string} with values {string}',async (action:string,textToBeEnter:string,locatorIdentifier:string,param:string)=>{
    await testExecutor.executeAction({action:action,value:textToBeEnter,locator:await testExecutor.getLocator(locatorIdentifier,param)});
});

/*Example:
 * Then I "Click" on "Button" with values "Login"
   Then I "WaitUntillElementDisappear" on "Button" with values "Login"
   Then I "WaitUntillElementAppear" on "Button" with values "Login"
   Then I "ScrollToView" on "ButtonWithText" with values "Continue"
 */
When('I {string} on {string} with values {string}',async (action:string,locatorIdentifier:string,param:string)=>{
    await testExecutor.executeAction({action:action,locator:await testExecutor.getLocator(locatorIdentifier,param)});
});

/*Example:
 * Then I "VerifyElementText" "Shabbir" is displayed in "LocaotrName" with values "ParamOfLocatorIfany"
 */
Then('I {string} {string} is displayed in {string} with values {string}',async (action:string,value:string,locatorIdentifier:string,param:string)=>{
    await testExecutor.executeAction({action:action,locator:await testExecutor.getLocator(locatorIdentifier,param),value:value});
});

/*Example:
 * Then I "VerifyVisibility" is "true" for "LocaotrName" with values "ParamOfLocatorIfany"
 */
Then('I {string} is {string} for {string} with values {string}',async (action:string,value:string,locatorIdentifier:string,param:string)=>{
    await testExecutor.executeAction({action:action,locator:await testExecutor.getLocator(locatorIdentifier,param),value:value});
});

/*Example:
 * Then I "VerifyPageTitle" ""
 * Then I "WaitForPageLoadState" "load"
 */
Then('I {string} {string}',async(action:string,value:string)=>{
    await testExecutor.executeAction({action:action,value:value});
});

/*Example:
* Then I "WaitForElement" "5" seconds
 */
Then('I {string} {string} seconds',async(action:string,value:string)=>{
    await testExecutor.executeAction({action:action,value:value});
});


