import {test, expect} from '@playwright/test';
import Ajv from 'ajv';

test('Validate json schema', async({request}) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking/1');
    const responseBody = await response.json();
    console.log(responseBody);
    const schema = {
    "type": "object",
    "properties": {
        "firstname": {
        "type": "string"
        },
        "lastname": {
        "type": "string"
        },
        "totalprice": {
        "type": "number"
        },
        "depositpaid": {
        "type": "boolean"
        },
        "bookingdates": {
        "type": "object",
        "properties": {
            "checkin": {
            "type": "string"
            },
            "checkout": {
            "type": "string"
            }
        },
        "required": [
            "checkin",
            "checkout"
        ]
        }
    },
    "required": [
        "firstname",
        "lastname",
        "totalprice",
        "depositpaid",
        "bookingdates"
    ]
    };
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const isValidate  = validate(responseBody);
    
})
