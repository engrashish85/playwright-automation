enum browser{
    Chrome,
    Firefox = getBrowserVersion('Firefox'),
    Safari=getBrowserVersion('Safari'),
    Edge = getBrowserVersion('Edge')
}

enum environment {
    DEV='dev',
    QA='qa',
    STAGE=1,
    PROD
}

console.log(browser);
console.log(environment);

function getBrowserVersion(browserName:string): number {
    if (browserName == 'chrome') {
        return 115;
    }
    return 1;
}


 
