export class CommonPage{
    pageObject={
        tagWithAttribute:(tagName:string,attributeName:string,value:string)=>`//${tagName}[@${attributeName}='${value}']`,
        buttonWithText:(btnName:string)=>`//button[contains(.,'${btnName}')]`,
        tagWithText:(tagName:string,textValue:string,index=1)=>`//${tagName}[contains(.,'${textValue}')][${index}]`,
        dropDownSelect:(dropDownName:string,index=1)=>`//label[contains(.,'${dropDownName}')]/parent::div//following::select[${index}]`,
        dropDownOption:(dropdownOptionName:string)=>`//option[contains(.,'${dropdownOptionName}')]`,
        dropDownOptionWithExact:(dropdownOptionName:string)=>`//option[text()='${dropdownOptionName}']`,
        radioOrCheckboxWithLabel:(labelName:string)=>`//label[contains(.,'${labelName}')]/input`,
        categoryMenu:(categoryName:string)=>`//section[@id='categorymenu']//a[contains(.,'${categoryName}')]`,
        subCategories:(subCategoriesName:string)=>`//div[@class='subcategories']//a[contains(.,'${subCategoriesName}')]`,
        TagWithExactText:(tagName:string,textValue:string,index=1)=>`//${tagName}[text()='${textValue}'][${index}]`
    }
}