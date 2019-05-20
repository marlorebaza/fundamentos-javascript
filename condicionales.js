// Condicionales

function showIfIsTrue(value) {
    if (value) {
        console.log(`'${value}', de tipo ${typeof value}, es verdadero!`);
    } else {
        console.log(`'${value}', de tipo ${typeof value}, es falso!`);
    }
}

// if(x): Será verdadero para cualquier valor que no sea: cadena vacía, false, null, undefined, 0, NaN
showIfIsTrue(""); // false
showIfIsTrue(true); // true
showIfIsTrue("true"); // true
showIfIsTrue(false); // false
showIfIsTrue("false"); // true
showIfIsTrue(0); // false
showIfIsTrue("0"); // true
showIfIsTrue(1); // true
showIfIsTrue("1"); // true
showIfIsTrue(2); // true
showIfIsTrue("2"); // true
showIfIsTrue(null);  // false
showIfIsTrue(undefined); // false

// if(value === true): convertirá true al tipo de valor con el que se compara:
// Por ejemplo:
// - si es cadena, true: "1" o false: "0"
// - si es numero, true: 1 o false: 0
console.log("\n--------------------")
console.log("" == true); // false
console.log(true == true); // true
console.log("true" == true); // false
console.log(false  == true); // false
console.log("false" == true); // false
console.log(0 == true); // false
console.log("0" == true); // false
console.log(1 == true); // true
console.log("1" == true); // true
console.log(2 == true); // false
console.log("2" == true); // false
console.log(null == true);  // false
console.log(undefined == true); // false

// if(value === true): Será verdadero solamente para el valor true de tipo booleano (value ==== true)
console.log("\n--------------------")
console.log("" === true); // false
console.log(true === true); // true
console.log("true" === true); // false
console.log(false  === true); // false
console.log("false" === true); // false
console.log(0 === true); // false
console.log("0" === true); // false
console.log(1 === true); // false
console.log("1" === true); // false
console.log(2 === true); // false
console.log("2" === true); // false
console.log(null === true);  // false
console.log(undefined === true); // false