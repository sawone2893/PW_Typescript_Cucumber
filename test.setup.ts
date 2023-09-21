import { WebActions } from "./src/base/webActions";
import { Before, BeforeAll, AfterAll, setDefaultTimeout } from "@cucumber/cucumber";
import * as config from "./src/config/config.json";
import { readFileSync } from "fs";
const chai = require('chai');
setDefaultTimeout(2 * 60000);

declare global {
    var actionDriver: any;
}
BeforeAll(async () => {
    global.expect_ = chai.expect;
    global.actionDriver = new WebActions();
    await global.actionDriver.initializesBrowser(config.browserName, config.isBrowserModeHeadless);
});

Before(async () => {
    await global.actionDriver.openURL(config.appURL);
});

AfterAll(async () => {
    await global.actionDriver.closePage();
    await global.actionDriver.closeBrowserContext();
});