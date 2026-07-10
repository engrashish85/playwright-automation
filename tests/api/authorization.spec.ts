import {test, expect} from '@playwright/test'

test('basic auth option 1', async({request}) => {
    const response = await request.get("https://httpbin.org/basic-auth/user/pass", {
        headers: {
            Authorization:"Basic "+Buffer.from("user:pass").toString('base64')
        }
    });
    const responseText = await response.text();
    console.log(" response text is - "+responseText);
    expect(response.ok).toBeTruthy();
    expect(response.status()).toBe(200);
})

test('basic auth option 2', async({playwright}) => {
    const context = await playwright.request.newContext({
        httpCredentials: {
            username: 'user',
            password: 'pass'
        }
    });
    const response = await context.get("https://httpbin.org/basic-auth/user/pass");
    const responseText = await response.text();
    console.log("response is - "+responseText);
    expect(response.ok).toBeTruthy();
    expect(response.status()).toBe(200);
})

test('Bearer token authentication', async({request}) => {
    const token = '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';
    const response = await request.get("https://api.github.com/users/engrashish85/repos", {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    });
    const responseText = await response.text();
    console.log(responseText);
    expect(response.ok).toBeTruthy();
    expect(response.status()).toBe(200);
})

test('Bearer Token for Github user', async({request})=> {
    const token = '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';
    const response = await request.get('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const responseText = await response.text();
    console.log(responseText);
    expect(response.ok).toBeTruthy();
    expect(response.status()).toBe(200);
})