// Función closure
/*
Un closure, básicamente, es una función que recuerda el estado de las variables al momento de ser invocada, 
y conserva este estado a través de reiteradas ejecuciones. 
*/

function crearSaludo(jerga) {
    // retornamos la función closure. Esta función recordará el ambito léxico (es decir donde se creó)...
    return function(nombre) {
        // ... por esto recordará el valor de la variable "jerga" cuando se retornó esta función
        console.log(`Hola ${nombre} ${jerga}`);
    }
}

let saludoPeruano = crearSaludo("causa"); 
let saludoArgentino = crearSaludo("che"); 
let saludoMexicano = crearSaludo("mano");

saludoPeruano("Marlo"); // variable "jerga" será igual a "causa"
saludoArgentino("Toto"); // variable "jerga" será igual a "che"
saludoMexicano("Pepe"); // variable "jerga" será igual a "mano"

