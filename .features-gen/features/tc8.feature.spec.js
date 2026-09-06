// Generated from: features\tc8.feature
import { test } from "playwright-bdd";

test.describe('Playwright test case 10', () => {

  test('Verify subscription', async ({ Given, When, Then, And, page }) => { 
    await Given('I open browser', null, { page }); 
    await When('I navigate to home page', null, { page }); 
    await And('I validate subscription element in the footer', null, { page }); 
    await And('I subscribe to email "a@a.com"', null, { page }); 
    await Then('I validate subscription', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\tc8.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":2,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":3,"keywordType":"Context","textWithKeyword":"Given I open browser","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":4,"keywordType":"Action","textWithKeyword":"When I navigate to home page","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"And I validate subscription element in the footer","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"And I subscribe to email \"a@a.com\"","stepMatchArguments":[{"group":{"start":21,"value":"\"a@a.com\"","children":[{"start":22,"value":"a@a.com","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then I validate subscription","stepMatchArguments":[]}]},
]; // bdd-data-end