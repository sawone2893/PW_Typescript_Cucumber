Feature: Testing Application
    @Test
    Scenario Outline: User Register on the website
    Given I "WaitUntillElementAppear" on "TagWithText" with values "a,Login or register"
    When I "Click" on "TagWithText" with values "a,Login or register"
    And I "Click" on "TagWithAttribute" with values "input,value,register"
    And I "Click" on "ButtonWithText" with values "Continue"
    And I "EnterValue" "<firstname>" for "TagWithAttribute" with values "input,name,firstname"
    And I "EnterValue" "<lastname>" for "TagWithAttribute" with values "input,name,lastname"
    And I "EnterValue" "<email>" for "TagWithAttribute" with values "input,name,email"
    And I "EnterValue" "<address_1>" for "TagWithAttribute" with values "input,name,address_1"
    And I "Click" on "TagWithAttribute" with values "select,name,country_id"
    And I "Click" on "DropDownOption" with values "<country>"
    And I "Click" on "TagWithAttribute" with values "select,name,zone_id"
    And I "Click" on "DropDownOption" with values "<state>"
    And I "EnterValue" "<city>" for "TagWithAttribute" with values "input,name,city"
    And I "EnterValue" "<postcode>" for "TagWithAttribute" with values "input,name,postcode"
    And I "EnterValue" "<loginname>" for "TagWithAttribute" with values "input,name,loginname"
    And I "EnterValue" "<password>" for "TagWithAttribute" with values "input,name,password"
    And I "EnterValue" "<password>" for "TagWithAttribute" with values "input,name,confirm"
    And I "Click" on "TagWithAttribute" with values "input,value,0"
    And I "Click" on "TagWithAttribute" with values "input,name,agree"
    And I "Click" on "ButtonWithText" with values "Continue"
    Then I "VerifyVisibility" is "true" for "TagWithText" with values "span,<accountConfirmationText>"

    Examples:
        | firstname | lastname | email         | address_1 | country | state         | city  | postcode | loginname | password | accountConfirmationText       |
        | Shabbir   | Rayeen   | abc@gmail.com | ABC Nagar | India   | Uttar Pradesh | Konch | 285205   | Shab2893  | 123456   | Your Account Has Been Created |

    @Test
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
    