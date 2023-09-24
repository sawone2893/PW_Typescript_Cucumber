import { PlaywrightActions } from "./src/base/modal/playwrightActions";
import { DriverFactory } from "./src/base/factory/DriverFactory";
import { BeforeAll, AfterAll, setDefaultTimeout } from "@cucumber/cucumber";
import * as config from "./src/config/config.json";
import { readFileSync } from "fs";

const chai = require('chai');
setDefaultTimeout(120000);

declare global {
    var actionDriver: any;
}
BeforeAll(async () => {
    global.expect_ = chai.expect;
    global.actionDriver = DriverFactory.driverInstance({driverName:config.driverName,browserType:config.browserType});
    await global.actionDriver.initialize(config.browserChannelName, config.isBrowserModeHeadless);
    await global.actionDriver.openURL(config.appURL);
});

AfterAll(async () => {
   await global.actionDriver.closeBrowser();
});