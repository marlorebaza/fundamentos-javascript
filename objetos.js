// Object.assign(target, ...fuentes):
// Copia los valores de todas la propiedades enumerables de uno o más objetos fuente a un objeto destino. 
// Retorna el objeto destino. 
// FUENTE: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/assign

const source1 = {
    a: 1,
    b: 2,
    c: 3
  };

  const source2 = {
    d: 4,
    e: 5,
    f: 6
  };
  
  const targetBase = {a: 4, d: 5, g: 7};
  // Las propiedades en el objeto destino (target) serán sobrescritas por las propiedades 
  // en los objetos fuentes (source) si tienen la misma clave. 
  // Propiedades posteriores de las fuentes podrán sobrescribir las anteriores.
  const target = Object.assign(targetBase, source1, source2);
  
  console.log(target); // { a: 1, d: 4, g: 7, b: 2, c: 3, e: 5, f: 6 }



// Object.defineProperty(objeto, nombre_propiedad, descriptor)
// El  método estático Object.defineProperty() define una nueva propiedad sobre un objeto 
// (NO sobre la cadena de prototipos de este), o modifica una ya existente, y devuelve el objeto modificado.
// Por cada propiedad se puede definir sus descriptores:
// - configurable:
// Si es true, el tipo de descriptor de propiedad podrá modificarse y la propiedad podrá ser eliminada deñ
// objet correspondiente. Por defecto es false.
// - enumerable:
// Si es true, la propiedad se muestra durante la enumeración de las propiedades del objeto correspondiente.
// Por defecto es false.
// - value:
// Valor asociado a la propiedad. Puede ser cualquier tipo valido de JavaScript (number, object, function, etc).
// Por defecto es undefined.
// - writable:
// Si es true, el valor de la propiedad puede modificarse con el  operador de asignación "=". 
// Por defecto es false.
// - get
// Función cuyo valor retornado será el que se use como valor de la propiedad.
// Por defecto es undefined.
// - set:
// Función que recibe como único argumento el nuevo valor que se desea asignar a la propiedad.

// Existen dos tipos de descriptores:  
// - De datos (value / writable): define una propiedad que tiene un valor, el cual puede ser o no modificado. 
// - De acceso (set / get): define una propiedad mediante un par de funciones getter-setter 
// que describe como se obtiene o se modifica el contenido de dicha propiedad. 
// Un descriptor debe de ser de uno de estos dos tipos; no puede ser ambos.
// Sino se generará el error:
// TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute,
// FUENTE: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/defineProperty
(function() {
    var myObject = {id: "0001"};
    (function(person, name) {
        var nameProperty = name;
        Object.defineProperty(person, 'name', {
            configurable: true,
            enumerable: true,
            value: nameProperty,
            writable: true,
            //get: function() { return nameProperty; },
            //set: function(newValue) {nameProperty = newValue}
        });
    })(myObject, "Marlo");
    console.log("----- INICIO Object.defineProperty(...) ------");
    console.log(`antes de modificación de name. myObject.name = ${myObject.name}`);
    myObject.name = "Lula";
    console.log(`antes de modificación de name. myObject.name = ${myObject.name}`);
    console.log("----- FIN Object.defineProperty(...) ------");
})();



// Object.keys(objeto): devuelve un array de cadenas con los nombres de las propiedades numerables 
// de un objeto, en el mismo orden como se obtienen en un loop normal
// FUENTE: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/keys
(function() {
    console.log("----- INICIO Object.keys(...) ------");
    let person = {name: "marlo", lastName: "rebaza", age: 28};
    Object.defineProperty(person, 'gender', {
        configurable: true,
        enumerable: false, // lo definimos como NO enumerable
        value: "male",
        writable: true
    });
    let propertyNames = Object.keys(person); // no se recuperará la propiedad "gender"
    console.log(`Object.keys(person) antes = ${propertyNames}`); // name,lastName,age
    propertyNames.forEach(function(propertyName) {
        if ("lastName" == propertyName) {
            // eliminamos propiedad lastName
            delete person[propertyName];
        }
    });
    console.log(`Object.keys(person) despues = ${Object.keys(person)}`); // name,,age
    console.log("----- FIN Object.keys(...) ------");
})();



// Object.getOwnPropertyNames(): devuelve un array con todas las propiedades (numerables o no) 
// encontradas en un objeto dado.
// FUENTE: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/getOwnPropertyNames
(function() {
    console.log("----- INICIO Object.getOwnPropertyNames(...) ------");
    let person = {name: "marlo", lastName: "rebaza", age: 28};
    Object.defineProperty(person, 'gender', {
        configurable: true,
        enumerable: false, // lo definimos como NO enumerable
        value: "male",
        writable: true
    });
    // SI se recuperará la propiedad "gender"
    Object.getOwnPropertyNames(person).forEach(function(propertyName) {
        console.log(propertyName)
    });
    console.log("----- INICIO Object.getOwnPropertyNames(...) ------");
})();



// Object.defineProperties(obj, properties): 
// Define nuevas o modifica propiedades existentes directamente en el objeto, retornando el objeto con los cambios.
// Estas propiedades son definidas sobre el mismo objeto; no son propiedades enumerable a lo largo de la cadena 
// de prototipos de este.
// FUENTE: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/defineProperties 
var myObject = Object.defineProperties({value: 12}, {
    "property1": {
        // descriptores:
        value: true,
        writable: true
    },
    "property2": {
        // descriptores:
        value: "Hello",
        writable: false
    }
});
console.log(myObject.value); // 12
console.log(myObject.property1); // true
console.log(myObject.property2); // Hello
// DATO: Para detalle sobre los descriptores, ver ejemplos de Object.defineProperty(...) en este mismo archivo



// Object.create(prototype [, propertiesObject]): 
// crea un objeto nuevo, utilizando el prototipo del objeto provisto:
// - prototype: Objeto el cual será el prototipo del nuevo objeto a crear.
// - propertiesObject: Opcional. Estas propiedades corresponden al segundo argumento de Object.defineProperties ()
// FUENTE: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/create
function Person() {
    this.isHuman = false;
    this.printIntroduction = function () {
      console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
    }
  };

// Creamos un objeto Person y le definimos 2 propiedades: lastName y name
const me = Object.create(Person.prototype, {
    "lastName": {
        enumerable: true,
        value: "Rebaza",
        writable: true
    }
});
me.name = "Marlo";
// Sobreescribimos valor de propiedad heredada 
me.isHuman = true;
console.log(me); // Person { lastName: 'Rebaza', name: 'Marlo', isHuman: true }
console.log(me.lastName);
console.log(`me es instancia de Person? ${me instanceof Person}`);



// new() vs Object.create()
// FUENTE: http://frontendnotes.net/what-the-difference-between-object-create-and-new-keyword/
(function() {
    const Thing = function(value) {
        console.log("dentro de función constructora de Thing!");
        this.value = value;
    };

    // - Creación de objeto con new():
    // 1. se crea un objeto nuevo y se asigna a la variable "aThing"
    // 2. el propotipo del objeto creado se establece a Thing.prototype (aThing.__proto__ === Thing.prototype)
    // 3. la función constructora "function Thing(...)" es llamada
    let aThing = new Thing("a thing!");
    console.log(`aThing.value = ${aThing.value}`);
    console.log(`aThing.__proto__ === Thing.prototype: ${aThing.__proto__ === Thing.prototype}`);

    // - Creación de objeto con Object.create()
    // Más detalle: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
    let bThing = Object.create(Thing.prototype);
    console.log(`bThing.value = ${bThing.value}`);
    console.log(`bThing.__proto__ === Thing.prototype: ${bThing.__proto__ === Thing.prototype}`);
    // Con este ejemplo podemos entender que sucede internamente:
    if(!Object.create) {
        Object.create = function(o) {
            // 1. se crea una función constructora sin propiedades
            function F(){};
            // 2. se establece el prototipo de esta función al objeto enviado como argumento
            F.prototype = o;
            // 3. se crea un objeto nuevo de esta función
            return new F();
        };
    }

    // CONCLUSION:
    // Ambas formas establecen el prototipo del objeto creado al de Thing.prototype, pero
    // la principal diferencia es que Object.create() no llama a la función constructora en ningun momento.
    // Podemos usarlo cuando queremos crear un objeto con un prototipo establecido al de otro objeto,
    // pero sin llamar a su función constructora.
    // Puede ser muy útil cuando queremos implementar la herencia.

})();