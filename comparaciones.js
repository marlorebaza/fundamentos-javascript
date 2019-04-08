// Comparaciones

// - Valores primitivos
var numero = 4;
var cadena = "4";
console.log(numero == cadena); // true, ya que tienen el mismo valor, sin importar el tipo de dato
console.log(numero === cadena); // false: tienen el mismo valor, pero no el mismo tipo de dato (uso recomendado)


// - Objetos
var persona = {
    name: "Marlo"
}
var otraPersona = {
    name: "Marlo"
}
var otraMas = persona;
console.log(persona == otraPersona); // false
console.log(persona === otraPersona); // false
// "otraMas" apunta al mismo lugar de memoria (ram) que "persona"
console.log(otraMas == persona); // true
console.log(otraMas === persona); // true