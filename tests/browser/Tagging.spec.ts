import {test, expect} from '@playwright/test';

test.beforeAll(async () => {
    console.log("Before all tests");
});

test.describe('Grouping tests', {tag: '@tag1'}, () => {

    test.beforeEach(async () => {
        console.log("Before each test");
    });

    test('test1', {tag: ['@tag1', '@tag2']}, async () => {
        console.log("Executing test1");
    });

    test('test2', {tag: '@tag2'}, async () => {
        console.log("Executing test2");
    });

    test('test3', async () => {
        console.log("Executing test3");
    });

    test('test4', async () => {
        console.log("Executing test4");
    });

    test('test', async({}, testInfo) => {
       testInfo.annotations.push({ type: 'slow', description: 'slow test'},
        { type: 'priority', description: 'priority test'}
       ) 

    });

    test.afterEach(async () => {
        console.log("After each test");
    });
});

test.describe('group2', {tag: '@tag2'}, () => {
    test('test5', async () => {
        console.log("Executing test5");
    });

    test('test6', async () => {
        console.log("Executing test6");
    });

    test('test7', async () => {
        console.log("Executing test7");
    });

    test('test8', async () => {
        console.log("Executing test8");
    });
})

test.afterAll(async () => {
    console.log("After all tests");
});
