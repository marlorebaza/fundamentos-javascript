// Estructura inmutable
/*
    Las estructuras de datos inmutables forman parte de los principios de la Programación Funcional 
    y nos permiten evitar tener efectos colaterales en los datos. En otras palabras, que hayan modificaciones 
    en las variables sin nuestro consentimiento, produciendo comportamientos inesperados en el programa.
*/

const cumplirAnos = function(person) {
    // esto modificará la edad en e objeto original
    person.age++;
    return person;
};

// aplicamos una mejor solución
const cumplirAnosInmutable = function(person) {
    // retornamos un nuevo objeto modificado, sin alterar el original
    return {
        // copamos todos los atributos de person
        person,
        // modificamos el valor de la edad. le sumamos 1
        age: person.age + 1
    };
};


let pepe = {
    name: "Pepe",
    lastName: "popo",
    age: 17
};
console.log(`pepe.age: ${pepe.age}`);
let newPepe = cumplirAnos(pepe);
console.log(`newPepe.age: ${newPepe.age}`);
console.log(`pepe.age (modificado): ${pepe.age}`);

let malo = {
    name: "Marlo",
    lastName: "Rebaza",
    age: 28
};
console.log(`malo.age: ${malo.age}`);
let newMalo = cumplirAnosInmutable(malo);
console.log(`newMalo.age: ${newMalo.age}`);
console.log(`malo.age (NO modificado): ${malo.age}`);

// Nota: la desventaja es que se creará un objeto adicional x cada llamada.