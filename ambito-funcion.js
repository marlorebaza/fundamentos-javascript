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