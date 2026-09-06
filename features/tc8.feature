Feature: Playwright test case 10
    Scenario: Verify subscription
        Given I open browser
        When I navigate to home page
        And I validate subscription element in the footer
        And I subscribe to email "a@a.com"
        Then I validate subscription