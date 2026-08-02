const names:string[] = ["Ashish","Askanksha","Peter","Psuhkar"];
console.log(names.length);
console.log(names[0]);

let empNames:Array<string> = ["tom", "oat", "caramal"];
let empId:Array<number> = [1,3,2,2];
let mix:Array<any> = ["tom", 1, "2", 4, "Asihs"];
console.log(`Length is ${mix.length}`);

let values: Array<string | number> = ["Rom", 1, 2];
for (let i = 0; i < values.length; i++) {
    console.log(values[i]);
}