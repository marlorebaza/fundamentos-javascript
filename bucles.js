// Array.prototype.forEach(): pertenece exclusivamente a la familia de Arrays. 
// Recorre los elementos de un arreglo y ejecuta la función indicada una vez por cada elemento
(function() {
    let arr = ["marlo", "lula", "ale", "Toby"];
    arr.forEach(function(element) {
        console.log(element);
    });
})();



// for...in:
// Itera sobre todos los elementos de un objeto, en un orden arbitrario. 
// y obtiene la propiedad relevante por cada elemento
(function () {
    const myObject = {name: "Marlo", lastName:"Rebaza"};
    // al iterar un objeto la propiedad relevante será el nombre de esta
    for (let property in myObject) {
        console.log(property);
    }
    const myArray = ["marlo", "lula"];
    // al iterar un arreglo la propiedad relevante será el indice, ya que internamente se almacenan como
    // llave : valor
    for (let element in myArray) {
        console.log(element);
    }
    // al iterar una cadena la propiedad relevante será el indice de cada caracter 
    const myString = "hola soy cara";
    for (let c in myString) {
        console.log(c);
    }
})();




// for...of:  itera los elementos de un objeto iterable, como Array, Map, Set, el objeto arguments, etc:
// FUENTE: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/for...of
(function() {
    // arreglo
    let arr = ["mak", "qwe", "dfs", "gfh"];
    for (let element of arr) {
        console.log(element);
    }
    // string
    const myString = "hola soy cara";
    for (let c of myString) {
        console.log(c);
    }
    // typed array
    let myTypedArray = new Uint8Array([0x00, 0xff]);
    for (let value of myTypedArray) {
        console.log(value);
    }
    // map
    let myMap = new Map([["a", 1], ["b", 2], ["c", 3]]);
    for (let entry of myMap) {
        console.log(entry);
    }
    for (let [key, value] of myMap) {
        console.log(value);
    }
    // set (no almacena valores repetidos) 
    let mySet = new Set([1, 1, 2, 2, 3, 3]); // solamente quedarán 1,2,3
    for (let value of mySet) {
        console.log(value);
    }
    // arguments
    (function() {
        for (let argument of arguments) {
          console.log(argument);
        }
    })("marlo", 2, true);
    // función generadora 
    console.log("------ INICIO FOR... OF CON FUNCION GENERADORA: --------")
    function* contarHastaCeroDesde(number) {
        while (number >= 0) {
            // ejecuta yield primero luego resta
            yield number--;
        }
    }
    for (var number of contarHastaCeroDesde(20)) {
        console.log(number);
    }
    console.log("------ FIN FOR... OF CON FUNCION GENERADORA: --------")
})();



// function*(): Función generadora:
// Define una función generadora, que devuelve un objeto Generator.
// Se puede salir y volver a entrar. Su contexto será conservado entre las reentradas.
// La llamada a una función generadora no ejecuta su cuerpo inmediatamente; 
// se devuelve un objeto iterador para la función en su lugar (Sobre objeto iterador: ver https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol). 
// Cuando el metodo next() del iterador es llamado, el cuerpo de la función generadora es 
// ejecutado hasta la primera expresión yield, la cual especifica el valor que será retornado por el iterador 
// o con, yield*, delega a otra función generadora. 
// El método next() retorna un objeto con dos propiedades:
// - value: que contiene el valor bajo el operador yield 
// - done: que indica, con un booleano, si la función generadora ha hecho yield al último valor.
// FUENTE: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/function*
(function() {
    // - Ejemplo simple
    function* generate(){
        var index = 0;
        while(index < 3)
          yield index++;
    }
    var iterator = generate();  
    var next = iterator.next();
    console.log(`next.done: ${next.done} y next.value = ${next.value}`); // next.done: false y next.value = 0
    next = iterator.next();
    console.log(`next.done: ${next.done} y next.value = ${next.value}`); // next.done: false y next.value = 1
    next = iterator.next();
    console.log(`next.done: ${next.done} y next.value = ${next.value}`); // next.done: false y next.value = 2
    next = iterator.next();
    console.log(`next.done: ${next.done} y next.value = ${next.value}`); // next.done: true y next.value = undefined
    
    // - Ejemplo usando yield*
    function* childGenerator(i) {
        yield i + 1;
        yield i + 2;
        yield i + 3;
    }
    function* parentGenerator(i){
        yield i;
        // para llamar a una función generadora se debe hacer uso de "yield*"
        yield* childGenerator(i);
        yield i + 10;
    }
    iterator = parentGenerator(10);
    // obtenemos el siguiente iterador y preguntamos si ya ha pasado el último,
    // en caso no sea así, continuamos con el while
    while (!(next = iterator.next()).done) {
        console.log(`iterator.next = ${next.value}`);
    }
})();

