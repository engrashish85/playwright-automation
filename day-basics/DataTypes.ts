let firstName:String = "John";
let lastName:String = "Doe";
let fullName:String = firstName + " " + lastName;
console.log("Full Name: " + fullName);

//Concatenation using Hello
console.log("Hello " + fullName);

let Hello:String = "Hello" + " " + firstName + " " + lastName;
console.log(Hello,firstName,lastName);

let HelloTemplate:String = "Hello" + " " + firstName + " " + lastName;
let HelloTemplateLiteral:String = `Hello ${firstName} ${lastName}`;
console.log(HelloTemplateLiteral);
console.log(HelloTemplate);

//Boolean
let isStudent:boolean = true;
let isTeacher:boolean = false;
console.log("Is Student: ",isStudent);
console.log("Is Teacher: ",isTeacher);
console.log("Is Student type: ", typeof (isStudent));
console.log("Is Teacher type: ", typeof (isTeacher));


//Null and Undefined
let nullValue:null = null;
let undefinedValue:undefined = undefined;
console.log("Null Value: ", nullValue);
console.log("Undefined Value: ", undefinedValue);
console.log("Null Value type: ", typeof (nullValue));
console.log("Undefined Value type: ", typeof (undefinedValue));

//Assignment of price number giving compile time error and type as undefined
let price:number = 0;
console.log("Price: ", price);

//Any data type
let anyValue:any = "This can be any type";
anyValue = 42; // Reassigning to a number
anyValue = true; // Reassigning to a boolean
console.log("Any Value: ", anyValue);
console.log("Any Value type: ", typeof (anyValue));

//Union data type (combining multiple types)
let unionValue:string | number = "This is a string";
console.log("Union Value: ", unionValue);
console.log("Union Value type: ", typeof (unionValue));
unionValue = 42; // Reassigning to a number
console.log("Union Value after reassignment: ", unionValue);
console.log("Union Value type after reassignment: ", typeof (unionValue));

//function data type
function greet(name:string):string {
    return `Hello, ${name}!`;
}
console.log(greet("Alice"));

function sum(a:number, b:number):String|number {
    return a + b;
}
console.log("Sum of 15 and 10: ", sum(15, 10));

function sumVoid(a:number, b:number):void {
    console.log("The sum of a and b is: ", a + b);
    console.log("This function does not return anything");
}
console.log(sumVoid(5, 10));