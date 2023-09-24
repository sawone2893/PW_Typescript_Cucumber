
import { IAction } from "../interface/action";
import { PlaywrightActions } from "../modal/playwrightActions";
export class DriverFactory{

    static driverInstance(option:any):IAction{
        switch((option.driverName).toLowerCase()){
            case "playwright":return new PlaywrightActions(option.browserType);
            default:
                throw new Error(`Unsupported Driver Name: ${option.driverName}`);
        }
    }

}