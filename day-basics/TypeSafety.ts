/* let a = 10;
a = "ten";
console.log(a); */

//Typesafety
let result1 = "10" + 5;
console.log(result1); // Output: "105"

let num1:number = 10;
let num2:string = "10";
let result2 = num1 + num2; // This will cause a type error
console.log(result2);