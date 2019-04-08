// Clases: en javascript. el equivalente a una clase (como se conoce en un lenguaje de programación 
// orientado a objetos) son los prototipos

function Persona(name) {
    // constructor...
    console.log("Dentro de contructor de Persona");
    //console.log(this);
    // "this" hará referencia al nuevo objeto en memoria que se esté creando
    // (siempre y cuando se haya llamado a esta función precedida por "new")
    this.name = name;
    // Implicitamente javascript retornará "this"
    //return this;
}
// con la palabra reservada "new" se creará un nuevo objeto, que herede del prototipo de la función (este caso Persona)
// MAS INFORMACION: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/new#Descripci%C3%B3n
var persona = new Persona("Marlo");
console.log(persona); // Persona {...}
console.log(persona.name); // "Marlo

// Si no se usa la palabra "new", se estarà invocando a "Persona" cmomo una función y para este caso,
// "this" hará referencia al objeto global (en caso de estar en un navegador, al objeto "window")
var persona2 = Persona("Lula");
console.log(persona2); // undefined, ya que la función "Persona(...)" no retorna nada
console.log(name); // Lula, "this.name" es su equivalente
// Esto generará un error, porque "persona2" es undefined
//console.log(persona2.name); 



// Herencia: 
// Cada objeto tiene un prototipo, incluido el objeto prototype. 
// Esta "cadena" se remonta hasta que llega a un objeto que no tiene prototipo, 
// generalmente el prototipo de Object. 
// La "herencia" en JS se logra mediante prototipos, agregando otro enlace al final de esta cadena de prototipos.
// FUENTE: https://developer.mozilla.org/es/docs/Learn/JavaScript/Objects/Inheritance
// FUENTE DE DONDE SAQUE LAS EXPLICACIONES: https://community.risingstack.com/javascript-prototype-chain-inheritance/
(function() {
    // 1. Definimos clase Padre Vehicle (función constructora)
    function Vehicle(branch, model, price) {
        this.branch = branch;
        this.model = model;
        this.price = price;
        this.discount = price * 0.05;
    }
    // 2. Sus métodos los definimos en la cadena de prototipos de este
    Vehicle.prototype.getinfo = function() {
        return `Marca: ${this.branch}`;
    }
    Vehicle.prototype.getDiscount = function() {
        return this.discount;
    }
    
    // 3. Definimos hijo Car
    function Car(branch, model, price, axes) {
        // 4. Asociamos constructor de Vehicle a Car
        // Para más detalle sobre fn.call(...) ver en archivo function-prototype.js
        Vehicle.call(this, branch, model, price);
        this.axes = axes;
    }
    let suzuki = new Car("Suzuki", "Swift", 65000, 2);
    
    // NOTA 1:
    // Dado que la propiedad prototype de Car, por defecto, contiene una referencia a la función constructor 
    // en sí misma:
    console.log(suzuki.__proto__ === Car.prototype); // true
    // ... no contiene los métodos de la propiedad prototype del constructor Vehicle (definidos en el punto 2):
    console.log(Object.getOwnPropertyNames(Vehicle.prototype)); // [ 'constructor', 'getinfo', 'getDiscount' ]
    console.log(Object.getOwnPropertyNames(Car.prototype)); // [ 'constructor' ] 
    // ... se puede apreciar que Car no hereda los métodos de Vehicle.
    // Es por esto que lo siguiente arrojaría el error: TypeError: suzuki.getinfo is not a function
    //console.log(suzuki.getinfo()); 
    // 5. Para lograr esta herencia debemos hacer los siguiente:
    // PARA MAS DETALLE sobre Object.create(...) ver en archivo objetos.js
    Car.prototype = Object.create(Vehicle.prototype); 
    
    // NOTA 2: 
    // Es necesario hacer un paso más, dado que hemos establecido Car.prototype igual al objeto creado a partir 
    // de Vehicle.prototype, la propiedad constructor de Car ahora es igual a Vehicle {...}
    console.log(Car.prototype.constructor); // [Function: Vehicle]
    console.log(Car.prototype.constructor === Vehicle.prototype.constructor) // true
    // ... esto puede ser un problema.
    // 6. Es por esto que debemos establecer el constructor correctamente:
    Car.prototype.constructor = Car;
    
    // 7. Sobreescribiendo función getInfo definida en clase Vehicle
    Car.prototype.getinfo = function() {
        // Es posible llamar a la función definida en la clase padre
        return "Este es un auto! " + Vehicle.prototype.getinfo.call(this);
    }
    let mazda = new Car("Mazda", "CX5", 150000, 2);
    console.log(mazda.getinfo()); // Este es un auto! Marca: Mazda
    console.log(mazda.getDiscount()); // 7500
    
    /*
    NOTA IMPORTANTE SOBRE LA CADENA DE PROTOTIPOS (PROTOTYPE CHAIN) EN JS: 
    Cuando se llama a un atributo en un objeto, JS lo busca primero en el objeto,
    si no existe, entonces cada enlace en su cadena de prototipos es atravesado hasta 
    encontrar el atributo o alcanzar el final.
    Es por esto que en el paso 6 sobreescribimos el constructor de Car.prototype, ya que sino hará 
    referencia al constructor dentro su propiedad "__proto__", que sería el "f Vehicle(...)".
    De la misma forma la función "getinfo()", agregada a Car.prototype, queda por encima de la función 
    dentro de su propiedad "__proto__".
    */
    // Vista interna a objeto mazda:
    /*
    axes: 2
    branch: "Mazda"
    discount: 7500
    model: "CX5"
    price: 150000
    __proto__:
        constructor: ƒ Car(branch, model, price, axes) => RESULTADO DEL PASO 6
        getinfo: ƒ () => RESULTADO DEL PASO 7
        __proto__: => Vehicle.prototype, REFERENCIADO COMO RESULTADO DEL PASO 5 ()
            getDiscount: ƒ ()
            getinfo: ƒ ()
            constructor: ƒ Vehicle(branch, model, price)
            __proto__:
                constructor: ƒ Object()
                hasOwnProperty: ƒ hasOwnProperty()
                ...
    */
    // Comprobando...
    console.log(Object.getOwnPropertyNames(mazda)); // [ 'branch', 'model', 'price', 'discount', 'axes' ]
    console.log(Object.getOwnPropertyNames(Car.prototype)); // [ 'constructor', 'getinfo' ]
    console.log(Object.getOwnPropertyNames(Car.prototype.__proto__)); // [ 'constructor', 'getinfo', 'getDiscount' ]
    console.log(Object.getOwnPropertyNames(Car.prototype.__proto__.__proto__)); // [ 'constructor', ...mas propiedades de Object]
    console.log(Car.prototype.__proto__.__proto__.__proto__); // null, ya que Object ya no tiene prototipo
    
})();



// Herencia (desde ECMAScript 2015):
// Si bien la sintaxis es distnta, por debajo se sigue trabajando con prototipos. 
// FUENTE: https://developer.mozilla.org/es/docs/Web/JavaScript/Herencia_y_la_cadena_de_protipos#Con_la_palabra_reservada_class
(function() {
    class Vehicle {
        constructor (branch, model, price) {
            this.branch = branch;
            this.model = model;
            this.price = price;
            this.discount = price * 0.05;
        }
        getinfo() {
            return `Marca: ${this.branch}`;
        }
        getDiscount() {
            return this.discount;
        }
    }
    class Car extends Vehicle {
        constructor(branch, model, price, axes) {
            super(branch, model, price);
            this.axes = axes;
        }
        getinfo() {
            return "Este es un auto! " + super.getinfo();
        }
    }
    let suzuki = new Car("Suzuki", "Swift", 65000, 2);
    console.log(suzuki.getinfo()); // Este es un auto! Marca: Suzuki
    console.log(suzuki.getDiscount()); // 3250
    let mazda = new Car("Mazda", "CX5", 150000, 2);
    console.log(mazda.getinfo()); // Este es un auto! Marca: Mazda
    console.log(mazda.getDiscount()); // 7500
})();


// ACA ME QUEDO: 
// - ES UN NUEVO TEMA, ASINCRONISMO:
// https://platzi.com/clases/1339-fundamentos-javascript/12956-funciones-como-parametros/
