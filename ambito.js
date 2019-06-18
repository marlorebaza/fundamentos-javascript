// variable de alcance global
// esta variable será asignada al objeto global (en el caso de un explorador será el objeto "window")
var nombre = "marlo";

function fn(nombre) {
    // Esta variable es de alcance local, sólo existe en esta función
    nombre = nombre.toUpperCase();
    console.log(`nombre (variable local) = ${nombre}`);
}
fn(nombre);
console.log(`nombre (variable global) = ${nombre}`);


// loop y scope (let vs var)
// FUENTE: https://flaviocopes.com/javascript-loops-and-scope/
// let permite declarar variables que están limitadas al alcance del bloque, 
// declaración o expresión en la que se utilice. 
// A diferencia de var, que define una variable globalmente, o localmente en una función, 
// independientemente del alcance del bloque.
// FUENTE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
// - uso de "var"
// Al terminar la ejecución del for "i" será igual a 5 y dado que los callbacks agregados al setTimeout
// serán ejecutados después del for (ver explicación en el inicio de asincronismo.js), El valor que se imprimirá será
// "i = 5" x cada iteración
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(`i = ${i}`);
    }, 1000);
}
// - uso de "LET": permite que en cada iteración se cree un nuevo ámbito léxico encadenado al ámbito anterior.
// y cada callback de setTimeout obtiene una copia propia de "i" (1, 2, 3, 4, 5...)
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(`i = ${i}`);
    }, 1000);
}
// - Otra forma: haciendo uso de IIFE (Immediately Invoked Function Expression = Expresión de función de 
// invocación inmediata):
for (var i = 0; i < 5; i++) {
    // - capturamos el estado actual de "i" invocando una función con su valor actual
    (function(i) {
        setTimeout(function() { 
            console.log(`i = ${i}`);
        }, 1000);
    })(i);
}

// - OtroS ejemploS de "var"
// 1. En este ejemplo el alcance de la variable "iDescription" será global...
for (let i = 0; i < 10; i++) {
    var iDescription = `El valor de i es = ${i}`;
}
// ... por eso podremos acceder a ella desde la raíz del código
console.log(`iDescription = ${iDescription}`);

// 2. Aquí el alcance se las variables "mensaje" y "mensaje2" será dentro de la función...
(function(number) {
    if (number % 2 == 0) {
        var mensaje = "Número par";
    } else {
        var mensaje = "Número impar";
        var mensaje2 = "Hola :D";
    }
    console.log(mensaje); // Número par
    // Aqui podemos apreciar que al hacer referencia a la variable "mensaje2" NO arroja el error:
    // "ReferenceError: mensaje2 is not defined".
    // En lugar de ello se muestra "undefined", por mas que no se entra al bloque "else".
    // Esto debido a que javascript "escanea" y "declara" automaticamente todas las variables con "var" al inicio 
    // del ámbito en el que se encuentren (en este caso una función) antes de ejecutar el código.
    console.log(mensaje2); // undefined
})(10); // enviamos un número par
// Si hacemos referencia a cualquiera de las 2 variables fuera de la función nos arrojará el error: 
// "ReferenceError: mensaje is not defined"
//console.log(mensaje);