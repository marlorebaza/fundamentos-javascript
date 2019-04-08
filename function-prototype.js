// fun.call(thisArg, ...arg):
// llama a una función con un valor this asignado y argumentos provistos de forma individual.
// Con call, puedes escribir un método una vez y entonces heredarlo en otro objeto, 
// sin tener que reescribir el método para el nuevo objeto.
// FUENTE: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Function/call

function doIt(value1, value2) {
    console.log(`value1 = ${value1}`);
    console.log(`value2 = ${value2}`);
    console.log(`this.value = ${this.value}`);
}
// - invocación normal
doIt("marlo", "carro");
// - haciendo uso de call
doIt.call({value: "hola!"}, "marlo", "carro");
// si no se envía ningún parámetro el parámetro "this" será undefined o null
doIt.call()



// Encadenamiento de constructores con fn.call(...):
// Se puede usar call para encadenar constructores para un objeto, similar a Java. Ejemplo:
function Product(name, price) {
    console.log("dentro de product");
    this.name = name;
    this.price = price;
}

function Food(name, price) {
    // invocamos al constructor de la función Product y le derivamos los argumentos recibidos
    Product.call(this, name, price);
    this.category = 'food';
}
Food.prototype = Object.create(Product.prototype); // new Product();

function Toy(name, price) {
    Product.call(this, name, price);
    this.category = 'toy';
}
Toy.prototype = Object.create(Product.prototype); // new Product();

var toy = new Toy("car", 12,3);
console.log(toy);
console.log(toy.__proto__ === Toy.prototype);

// NOTAS:
// 1. Para este caso, la mejor opción es Object.create(...) en lugar de new Product() 
// Ver "new() vs Object.create()" en archivo objetos.js
// 2. Es posible crear un objeto, de una funcion que espera parámetros en su constructor,
// sin enviarselos:
var apple = new Product();
console.log(apple); // Producto { name: undefined, price: undefined }
apple.name = "manzana";
apple.price = 0.12;
console.log(apple); // Producto { name: 'manzana', price: 0.12 }



// fn.call(...) sobre función anónima
(function() {
    var students = [
        {name: 'Pepe', age: 12},
        {name: 'Pupo', age: 13}
    ];
    
    // iteramos arreglo de estudiantes
    for (var i = 0; i < students.length; i++) {
        // hacemos uso de "call" sobre la función anónima y enviamos como argumento 
        // "this": el elemento actual;  y como argumento de función: el indice (i)
        (function (index) {
            // agregamos función "print" a "this" (es decir al elemento actual)
            this.getInfo = function () { 
                console.log(`#${index + 1} - Nombre: ${this.name} Edad: ${this.age} años`); 
            } 
        }).call(students[i], i);
        // llamamos a la función "getInfo" x cada elemento
        students[i].getInfo();
    }
})();



// fn.bind(this, args1, args2, ...):
// Crea una nueva función, reemplazando el valor de su operador this por el valor recibido como parámetro.
// También recibe una secuencia de argumentos que precederán a cualquiera que se envíe cuando se llame a la función. 
// El valor de this es ignorado cuando la función es llamada con el operador new.
// FUENTE: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Function/bind
(function() {
    let someobject = {
        someNumber: 10,
        plus: function(number1, number2) {
            return this.someNumber + number1 + number2;
        }
    };
    console.log(`suma 1 = ${someobject.plus(12, 14)}`); // 10 + 12 + 14 = 36
    // creamos una nueva función haciendo uso de .bind(...)
    let newPlusFunction = someobject.plus.bind({someNumber: 20}, 100);
    // el valor "100" siempre se asignará al primer parámetro cada vez que se llame a la función "newPlusFunction".
    // En este ejemplo el valor "14" será el tercer parámetro
    console.log(`suma 2 = ${newPlusFunction(12, 14)}`); // 20 + 100 + 12 = 132
})();