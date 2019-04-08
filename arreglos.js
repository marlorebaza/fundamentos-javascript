// Arreglos

// Array.prototype.filter(): retorna un nuevo arreglo que contiene los elementos que cumplan la condición
// de la llamada a la función indicada. 
// Recibe como parámetro una función que se llamará x cada elemento que estará compuesta x 3 parámetros: 
// elemento actual, indice del elemento actual y el arreglo sobre el que se está operando
// FUENTE: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/filter
(function() {
    var arreglo = [1, 2, 3, "marlo", true, "jesus", 10];
    arreglo.filter(value => typeof value === "string").forEach(element => console.log(element));
    console.log("-------");
    arreglo.filter(function(currentElement, index, array) {
        console.log(`arreglo = [${array}]`);
        console.log(`arreglo[${index}] = ${currentElement}`);
    });
    var personas = [{name: "marlo", age: 18}, {name: "lula", age: 21}, {name: "ale", age: 11}, {name: "nieve", age: 9}];
    console.log("-------");
    // desestructuramos el elemento iterado para acceder directamente a la propiedad que usaremos en la condición
    console.log(personas.filter(({age}) => age >= 18));
})();

// Array.prototype.map(): retorna un nuevo arreglo con los resultados de la llamada a la función indicada.
// Recibe como parámetro una función que se llamará x cada elemento que estará compuesta x 3 parámetros: 
// elemento actual, indice del elemento actual y el arreglo sobre el que se está operando
// FUENTE: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/map
(function() {
    console.log("-------");
    var personas = [{name: "marlo", age: 18}, {name: "lula", age: 21}, {name: "ale", age: 11}, {name: "nieve", age: 9}];
    // creamos un arrego nuevos de personas con la edad duplicada
    var nuevasPersonas = personas.map(element => ({...element, age: element.age * 2}));
    console.log(`personas es igual a nuevasPersonas: ${personas === nuevasPersonas}`); // false
    console.log(personas);
    console.log(nuevasPersonas);
})();

// Array.prototype.reduce(): aplica una función a un acumulador y a cada valor de un array 
// (de izquierda a derecha) para reducirlo a un único valor.
// Recibe 2 parámetros:
// - una función que se llamará x cada elemento que estará compuesta x 4 parámetros: 
// elemento actual, indice del elemento actual y el arreglo sobre el que se está operando
// VALOR ANTERIOR, elemento actual, indice del elemento actual y el arreglo sobre el que se está operando
// - el valor inciial del acumulador, si no se provee uno, su valor será "undefined" x defecto
// FUENTE: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/reduce
(function() {
    console.log("-------");
    var personas = [{name: "marlo", age: 18}, {name: "lula", age: 21}, {name: "ale", age: 11}, {name: "nieve", age: 9}];
    var acumulador = 0;
    sumaEdades = personas.reduce((acumulador, {age}) => acumulador + age, acumulador);
    console.log(`Suma de edades (con reduce) = ${sumaEdades}`);
    // Equivalente
    acumulador = 0;
    personas.forEach(element => acumulador += element.age);
    console.log(`Suma de edades = ${acumulador}`);
})();