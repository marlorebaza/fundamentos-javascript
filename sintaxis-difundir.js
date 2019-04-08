// Sintaxis difundir (...): 
// Permite que una expresión de cadena o de arreglos, o cualquier cosa que se pueda iterar,
// se expanda en lugares donde se esperan cero o más argumentos para llamadas a funciones o 
// elementos para arreglos. 
// También se puede usar para que una expresión de objeto se expanda en lugares 
// donde se esperan cero o más pares clave-valor para el objeto.
// FUENTE: https://code4developers.com/spread-syntax-in-javascript/


// Ejemplo  en arreglos:
// fusionar los valores de "arr1" en "arr2" después del valor "3" en "arr2". 

// FORMA TRADICIONAL:
(function() {
    var arr1 = [4,5];
    var arr2 = [1,2,3,6,7];
    // Array:splice(). FUENTE: https://www.w3schools.com/jsref/jsref_splice.asp
    // - Sobre fun.apply: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Function/apply
    // el primer parámetro es el objeto sobre el cual operará la función (en este caso la función splice)
    // el segundo parámetro es un arrglo que contiene los parámetros con los que será llamada la función
    arr2.splice.apply(arr2, [3, 0].concat(arr1));
    // - equivalencia de la linea anterior:
    // hacemos uso de "..." para expandir los valores del arreglo "arr1" y se envén sus valores como argumentos
    //arr2.splice(3, 0, ...arr1); 
    console.log(arr2);
})();

// FORMA NUEVA (Desde ECMAScript 2015) con "..."
(function() {
    var arr1 = [4,5]
    var arr2 = [1,2,3,...arr1,6,7]
    console.log(arr2);
})();

// EXPERIMENTOS
(function() {
    // copiar arreglo
    var arr = [1, 2, 3];
    var arr2 = [...arr];
     
    // concatenar arreglos
    var arr1 = [0, 1, 2];
    var arr2 = [3, 4, 5];
    arr1 = [...arr1, ...arr2];
})();

// DATO:
// La línea de código debajo arrojará un error, ya que un objeto no es iterable
//console.log([...{value: "asd"}]);



// Ejemplo en funciones
function addition(num1, num2, num3, num4, num5) {
    console.log(num1 + num2 + num3 + num4 + num5);
}
// - Si se desea pasar una matriz como un argumento, se debe usar Function.Prototype.apply:
addition.apply(null,[10,20,30,40,50]); // Esto es equivalente a: addition(10, 20, 30, 40, 50)

// - Haciendo uso de "..."
addition(...[10,20,30,40,50]);
// ... cualquier argumento en la función puede ser pasado usando "..."
addition(10,...[20,30,40],50);



// Ejemplo en objetos
// Se requiere ECMAScript 2018
// - Si se quiere clonar superficialmente o la combinar objetos, la sintaxis "..." puede ser útil:
var res1 = { name: 'ytn', marks1: 35 };
var res2 = { name: 'yatendra', marks2: 38 };

// clonamos objeto "res1"
var cloneObj = { ...res1 };
console.log(cloneObj);

// combinamos objetos
// En caso de propiedades con el mismo nombre, prevalece la propiedad del objeto predecesor
var mergeObj = { ...res1, ...res2 };
console.log(mergeObj);

// DATO:
// Si es posible expandir un arreglo para un objeto :D
// Esto debido a que la llave de cada elemento será su indice
// Dando como resultado el siguiente objeto:
// { '0': 'age', '1': '1234', '2': 'name', '3': 'marlo' }
console.log({...["age", "1234", "name", "marlo"]});