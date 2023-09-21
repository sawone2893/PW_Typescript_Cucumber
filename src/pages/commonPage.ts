export class CommonPage{
    pageObject={
        tagWithAttribute:(tagName:string,attributeName:string,value:string)=>`//${tagName}[@${attributeName}='${value}']`,
        buttonWithText:(btnName:string)=>`//button[contains(text(),'${btnName}')]`,
        tagWithText:(tagName:string,textValue:string,index=1)=>`//${tagName}[contains(text(),'${textValue}')][${index}]`,
        dropDownSelect:(dropDownName:string,index=1)=>`//label[contains(text(),'${dropDownName}')]/parent::div//following::select[${index}]`,
        dropDownOption:(dropdownOptionName:string)=>`//option[text()='${dropdownOptionName}']`
    }
}