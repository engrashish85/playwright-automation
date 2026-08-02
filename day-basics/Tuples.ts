let employeeDetails:[string, number] = ["Ashish", 1];
console.log(employeeDetails[0]);
console.log(employeeDetails[1])

//Arrays with tuples
let employeeDetailsArray: [string, number, boolean][] = [["Ashish", 1, true], ["NAveen", 2, true], ["Roma", 3, false], ["Komal", 3, true]];
console.log(employeeDetailsArray[0][1]);

//Pushing tuple into collection
let customer:[string, number] = ["Ashish", 1];
customer.push("Ravu", 200);
customer.push(4, 200);
console.log(customer);
for (let i = 0; i < customer.length; i++) {
    console.log(customer[i]);
}