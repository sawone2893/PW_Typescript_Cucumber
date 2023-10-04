Feature: Testing Application
    @smoke
    Scenario Outline: User Register on the website
    Given I "VerifyPageTitle" "<homePageTitle>"
    Then I "WaitUntillElementAppear" on "TagWithText" with values "a,Login or register"
    When I "Click" on "TagWithText" with values "a,Login or register"
    Then I "WaitUntillElementAppear" on "TagWithAttribute" with values "input,value,register"
    When I "Click" on "RadioOrCheckboxWithLabel" with values "Register Account"
    #Then I "ScrollToView" on "ButtonWithText" with values "Continue"
    And I "Click" on "ButtonWithText" with values "Continue"
    Then I "WaitUntillElementAppear" on "TagWithAttribute" with values "input,name,firstname"
    And I "EnterValue" "<firstname>" for "TagWithAttribute" with values "input,name,firstname"
    And I "EnterValue" "<lastname>" for "TagWithAttribute" with values "input,name,lastname"
    And I "EnterValue" "<email>" for "TagWithAttribute" with values "input,name,email"
    And I "EnterValue" "<address_1>" for "TagWithAttribute" with values "input,name,address_1"
    And I "Click" on "DropDownSelect" with values "Country"
    And I "Click" on "DropDownOptionWithExact" with values "<country>"
    And I "Click" on "DropDownSelect" with values "Region / State"
    And I "Click" on "dropDownOptionWithExact" with values "<state>"
    And I "EnterValue" "<city>" for "TagWithAttribute" with values "input,name,city"
    And I "EnterValue" "<postcode>" for "TagWithAttribute" with values "input,name,postcode"
    And I "EnterValue" "<loginname>" for "TagWithAttribute" with values "input,name,loginname"
    And I "EnterValue" "<password>" for "TagWithAttribute" with values "input,name,password"
    And I "EnterValue" "<password>" for "TagWithAttribute" with values "input,name,confirm"
    And I "Click" on "RadioOrCheckboxWithLabel" with values "No"
    And I "Click" on "RadioOrCheckboxWithLabel" with values "I have read and agree"
    And I "Click" on "ButtonWithText" with values "Continue"
    Then I "WaitUntillElementAppear" on "TagWithText" with values "span,<accountConfirmationText>"
    Then I "VerifyVisibility" is "true" for "TagWithText" with values "span,<accountConfirmationText>"

        Examples:

            | homePageTitle                               | firstname | lastname | email            | address_1 | country | state         | city  | postcode | loginname  | password | accountConfirmationText       |
            | A place to practice your automation skills! | Shabbir   | Rayeen   | abcxyz@gmail.com | ABC Nagar | India   | Uttar Pradesh | Konch | 285205   | Shab128931 | 123456   | Your Account Has Been Created |

    @Test1
    Scenario Outline: Verify user is able to place order
    Given I "WaitUntillElementAppear" on "TagWithText" with values "a,Login or register"
    When I "Click" on "TagWithText" with values "a,Login or register"
    And I "EnterValue" "<loginname>" for "TagWithAttribute" with values "input,name,loginname"
    And I "EnterValue" "<password>" for "TagWithAttribute" with values "input,name,password"
    And I "Click" on "ButtonWithText" with values "Login"
    Then I "VerifyVisibility" is "true" for "TagWithText" with values "div,Welcome back Shabbir"
    When I "Click" on "TagWithText" with values "a,Apparel & accessories"
    And I "Click" on "TagWithText" with values "a,Shoes"
    And I "Click" on "TagWithText" with values "a,New Ladies High Wedge Heel Toe Thong Diamante Flip Flop Sandals"
    And I "Click" on "TagWithText" with values "input,6 UK"
    And I "Click" on "DropDownSelect" with values "Colour"
    And I "Click" on "DropDownOption" with values "red"
    And I "EnterValue" "<quantity>" for "TagWithAttribute" with values "input,name,quantity"
    And I "Click" on "TagWithText" with values "a,Add to Cart"
    And I "Click" on "TagWithText" with values "a,Checkout"
    And I "Click" on "ButtonWithText" with values "Confirm Order"
    Then I "VerifyVisibility" is "true" for "TagWithText" with values "span,<OrderConfirmationText>"
    
    Examples:
            | loginname | password | quantity | OrderConfirmationText          |
            | Shab2893  | 123456   | 2        | Your Order Has Been Processed! |
    