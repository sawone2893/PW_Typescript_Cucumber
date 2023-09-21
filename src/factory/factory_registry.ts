import { TestExecutor } from '../actions/testExecutor';
import {CommonPage} from '../pages/commonPage';

export class FactoryRegistries{

    private static testExecutor_:TestExecutor;
    private static commonPage_:CommonPage;

    static testExecutor():TestExecutor{
        if(FactoryRegistries.testExecutor_===undefined){
            FactoryRegistries.testExecutor_=new TestExecutor();
        }
        return  FactoryRegistries.testExecutor_
    }
    static get commonPage():CommonPage{
        if(FactoryRegistries.commonPage_===undefined){
            FactoryRegistries.commonPage_=new CommonPage();
        }
        return  FactoryRegistries.commonPage_
    }
}