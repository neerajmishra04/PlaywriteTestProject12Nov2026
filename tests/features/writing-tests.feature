Feature: Playwright Writing tests documentation
  As a Playwright user
  I want to learn how to write reliable tests
  So that I can interact with pages and verify their state

  Scenario: Navigate from Docs to Writing tests
    Given I am on the Playwright home page
    When I open Docs and select Writing tests from the sidebar
    Then the Writing tests documentation page is displayed
    And I close the browser

  Scenario: Review the first test example
    Given I am viewing the Writing tests documentation
    When I read the First test section
    Then I see an example that checks the page title and a link
    And I close the browser

  Scenario: Review the actions guidance
    Given I am viewing the Writing tests documentation
    When I read the Actions section
    Then I see guidance for navigation, interactions, and basic actions
    And I see an example that locates a link by its accessible role
    And I close the browser

  Scenario: Review assertions and test isolation
    Given I am viewing the Writing tests documentation
    When I read the Assertions section
    Then I see that async assertions wait for expected conditions
    And I see an example of a page title assertion
    And I see the Test Isolation guidance
    And I close the browser
