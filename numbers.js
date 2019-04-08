// Numeros
// En javascript se produce una perdida de precisión al usar decimales (en operaciones con ciertos numeros):
// Mas detalle: https://stackoverflow.com/a/3439981
// Por qué se produce esto?: https://floating-point-gui.de/
var precio = 200.3;
console.log(precio * 3); // imprimirá "600.9000000000001", en lugar de "600.3"
// - Solución simple:
// le quitamos el decimal, multiplicamos y finalmente dividimos para "obtener" nuevamente a decimal
console.log(precio * 10 * 3 / 10);

// - Solución eficiente:
// Hacer uso de librerías:
// 1. Dinero.js (https://frontstuff.io/how-to-handle-monetary-values-in-javascript)
// 2. BigNumber (http://jsfromhell.com/classes/bignumber)

// - función toFixed(): convierte un numero a cadena, conservando la cantidad de decimales indicados
// fuente: https://www.w3schools.com/jsref/jsref_tofixed.asp
console.log(precio.toFixed(3)); // autocompletará con "0" a la derecha

// - funcion parseFloat(): convierte una cadena a un número de punto flotante (decimal)
// fuente: https://www.w3schools.com/jsref/jsref_parsefloat.asp
console.log(parseFloat("111.21") + 10 );
