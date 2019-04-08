// Función de flecha

const arrowFunction = (name) => {
    console.log(`Hola ${name}!`);
}
const arrowFunction2 = name => console.log(`Hola ${name}!`);

arrowFunction("Marlo");
arrowFunction2("Marlo");


// Datos a tener en cuenta...
// FUENTE: https://stackoverflow.com/a/34361380
(function() {
    // - Las funciones de flecha NO tienen enlazados sus propios objetos "this" y "arguments", 
    // ya que son resueltos en el ambito lexico (lexical scope) como cualquier otra varible. 
    // Quiere decir que ambos objetos toman los valores de donde la función fue definidica
    // NOTA: 
    // El alcance léxico (a veces conocido como alcance estático) establece el alcance (rango de funcionalidad) 
    // de una variable para que solo pueda llamarse (o referenciarse) desde el bloque de código en el que se define.
    // El alcance se determina cuando se compila el código.
    
    // 1.1 Uso de "this" en declaración de función
    function createObject1() {
        console.log(`Dentro de createObject1. this.foo = ${this.foo}`); // 21
        return {
          foo: 42,
          // "this" hace referencia al objeto al que pertenece la función "bar"
          bar: function() {
            console.log(`Dentro de createObject1.bar. this.foo = ${this.foo}`); // 42
          },
        };
    }
    createObject1.call({foo: 21}).bar();

    // 1.2 Uso de "this" en función de flecha
    function createObject2() {
        console.log(`Dentro de createObject2. this.foo = ${this.foo}`); // 21
        return {
          foo: 42,
          // "this" hace referencia al contexto donde fué definido, 
          // es decir la función externa: "createObject2"
          bar: () => console.log(`Dentro de createObject2.bar. this.foo = ${this.foo}`)  // 21
        };
    }
    createObject2.call({foo: 21}).bar();

    // ... esto hace a la función flecha útil si se quiere acceder al contexto actual
    
    let anyObject = {
        value: "Marlo",
        show1: function() {
            setTimeout(() => {
                // en este caso "this" hace referencia al contexto de la función a la que pertenece: show1()
                console.log(`termino timeout. this.value = ${this.value}`); // Marlo
            }, 2000);
        },
        show2: function() {
            setTimeout(function() {
                // ... a diferencia que en una declaración de función, donde el valor de "this" dependerá de donde
                // sea invocada la función. En este caso hará referencia al objeto global, donde no existe
                // la variable "value"
                debugger;
                console.log(`termino timeout. this.value = ${this.value}`); // undefined
            }, 2000);
        }
    }
    anyObject.show1();
    anyObject.show2();


    // 2. Las funciones creadas mediante una declaración son construibles y llamables, pero
    // las funciones flecha son sólo construibles, es decir no puede ser llamadas anteponiendo "new ..()"
    
    let Person1 = function(name) {
        this.name = name;
        this.hi = function() {
            console.log("Hi " + this.name);
        }
    };
    // usamos new sin ningun problema
    let person1 = new Person1("Marlo");
    person1.hi();

    // - Función flecha
    let Person2 = (name) => {
        this.name = name;
        this.hi = function() {
            console.log("Hi " + this.name);
        }
    };
    // No tendrá ninguún efecto 
    //let person2 = new Person2("Marlo");
    // esto producirá el error: Person2 is not a constructor
    //person2.hi();


    // 3. Vinculando función flecha a cadena de prototipos de objeto
    function Fulano(name) {
        this.name = name;
    }
    Fulano.prototype.saludar1 = function() {
        console.log(`Hola ${this.name}`);
    }
    Fulano.prototype.saludar2 = () => {
        // Como hemos mencionado antes, dentro de una función flecha, "this" hará referencia al contexto
        // donde la función es definida. En este caso al objeto global, donde "name" no existe
        console.log(`Hola ${this.name}`);
    }
    let fu = new Fulano("Marlo");
    fu.saludar1() // Hola Marlo
    fu.saludar2() // Hola undefined


    // 4. NO es posible setear el operador "this" en una función flecha haciendo uso de las funciones 
    // .bind() ni .call() (Para más detalle sobre estos métodos ver ejemplos en archivo function-prototype.js)
    let myFunctionDeclaration = function(value) {
        console.log(`Hola ${this.name}, tu valor es ${value}`);  
    };
    let myArrowFunction = (value) => console.log(`Hola ${this.name}, tu valor es ${value}`);
    // - call(...)
    myFunctionDeclaration.call({name: "Marlo"}, 28); // Hola Marlo, tu valor es 28
    myArrowFunction.call({name: "Marlo"}, 28); // Hola undefined, tu valor es 28
    // - bind(...), llamamos a la nueva función en la misma línea.
    // OJO: Dado que establecemos el valor del primer argumento en "1000", 
    // este valor precederá al "30" enviado al llamar a la función
    myFunctionDeclaration.bind({name: "Marlo"}, 1000)(30); // Hola Marlo, tu valor es 1000
    myArrowFunction.bind({name: "Marlo"}, 1000)(30); // Hola undefined, tu valor es 1000

    // Conclusión
    // - Las funciones de flecha y una declaración de función no son equivalentes y no pueden 
    // reemplazarse indiscriminadamente.
    // - Si la declaración de función que se quiere reemplazar NO usa "this", "arguments" y no se llama con "new", 
    // entonces si es posible.

})();
