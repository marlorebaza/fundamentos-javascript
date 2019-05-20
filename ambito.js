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
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(`i = ${i}`); // se mostrará "5" para todos los callbacks
    }, 1000);
}
/// EXPLICARLO MEJOR... HACER EL OTRO METODO
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