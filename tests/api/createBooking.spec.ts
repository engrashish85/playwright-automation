import 'dotenv/config'
import { test, expect} from '@playwright/test'
import {faker} from '@faker-js/faker'
import {DateTime} from 'luxon'
import fs from 'fs'

test('create book and validate booking id', async({request}) => {
    const body = {
    "firstname" : "Rahul",
    "lastname" : "Dravid",
    "totalprice" : 100,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2026-06-25",
        "checkout" : "2026-06-26"
    },
    "additionalneeds" : "Breakfast"
    }

    const response = await request.post("/booking", {data:body});
    const responseBody = await response.text();
    const responseJson = JSON.parse(responseBody);
    const responseJon = await response.json();
    console.log("Response is - " + responseBody+ "\n response status is - "+response.statusText());
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    console.log("booking id is - "+responseJon.bookingid);
    expect (responseJon).toHaveProperty("booking");  
})

test('Create body with random data and validate booking', async({request}, testInfo) => {
    let body, response, responseText: string, responseBody;

    const checkin = DateTime.now().toFormat("yyyy-MM-dd");
    const checkout = DateTime.now().plus({day:5}).toFormat("yyyy-MM-dd");
    const additionalNeeds = "super bowls";
    body = {
    "firstname" : faker.person.firstName(),
    "lastname" : faker.person.lastName(),
    "totalprice" : faker.number.int({min:1, max:100}),
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : checkin,
        "checkout" : checkout
    },
    "additionalneeds" : additionalNeeds
    }
    console.log("body is - "+JSON.stringify(body, null, 1));
    await test.step('Request is - ', async() => {
        console.log(JSON.stringify(body, null, 1));
    })
    response = await request.post("/booking", {data:body});
    responseText = await response.text()
    console.log("Response text is - "+responseText);
    await test.step('Request Body - ', async() => {
        console.log(responseText)
    });
    responseBody = await response.json();
    expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody).toHaveProperty("booking");
    expect(responseBody).toHaveProperty("booking.additionalneeds");
    const bookingId = responseBody.bookingid;
    const booking = responseBody.booking;
    expect(responseBody.booking).toMatchObject({
        "firstname" : body.firstname,
        "lastname" : body.lastname,
        "totalprice" : body.totalprice,
        "depositpaid" : body.depositpaid,
        "additionalneeds" : body.additionalneeds
    });
    expect(responseBody.booking.bookingdates).toMatchObject({
        "checkin" : body.bookingdates.checkin,
        "checkout" : body.bookingdates.checkout
    })

    //Validate booking
    response = await request.get(`/booking/${bookingId}`);
    responseText = await response.text();
    console.log("Booking response text is - "+responseText);
    responseBody = await response.json();
    expect(responseBody).toMatchObject({
        "firstname" : body.firstname,
        "lastname" : body.lastname,
        "totalprice" : body.totalprice,
        "depositpaid" : body.depositpaid,
        "additionalneeds" : body.additionalneeds
    });
    expect(responseBody.bookingdates).toMatchObject({
        "checkin" : body.bookingdates.checkin,
        "checkout" : body.bookingdates.checkout
    });

    //Delete booking
    const userName:any = process.env.user_name;
    const password:any = process.env.password;
    body = fs.readFileSync('test-data/request/token.json', 'utf-8');
    body = body.replace("<<username>>", userName);
    body = body.replace("<<password>>", password);
    response = await request.post("/auth", {data:JSON.parse(body)});
    responseText = await response.text();
    responseBody = await response.json();
    const token = responseBody.token;
    console.log(token);

    response = await request.delete(`booking/${bookingId}`, {headers: 
        {
            "Cookie":`token=${token}`
        }
    })
    responseText = await response.text();
    expect(responseText).toBe("Created");
    expect(response.status()).toBe(201);
})