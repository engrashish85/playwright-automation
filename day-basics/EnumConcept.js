"use strict";
var browser;
(function (browser) {
    browser[browser["Chrome"] = 0] = "Chrome";
    browser[browser["Firefox"] = getBrowserVersion('Firefox')] = "Firefox";
    browser[browser["Safari"] = getBrowserVersion('Safari')] = "Safari";
    browser[browser["Edge"] = getBrowserVersion('Edge')] = "Edge";
})(browser || (browser = {}));
var environment;
(function (environment) {
    environment["DEV"] = "dev";
    environment["QA"] = "qa";
    environment[environment["STAGE"] = 1] = "STAGE";
    environment[environment["PROD"] = 2] = "PROD";
})(environment || (environment = {}));
// test('enum concept', ()=> {
console.log(browser);
console.log(environment);
// })
function getBrowserVersion(browserName) {
    if (browserName == 'chrome') {
        return 115;
    }
    return 1;
}
