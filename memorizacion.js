// Memorizacón
/*
Es una técnica de programación que nos permite ahorrar cómputo o procesamiento en JavaScript, 
al ir almacenando el resultado invariable de una función para que no sea necesario volver a 
ejecutar todas las instrucciones de nuevo, cuando se vuelva a llamar con los mismos parámetros. 
Es similar a usar memoria cache.
*/
function factorial(n) {
    // inicializamos cache la primera vez
    if (!this.cache) {
        this.cache = {};
    }
    // si en la cache ya tenemos el factorial del número actual, entonces lo retornamos
    if (this.cache[n]) {
        return this.cache[n];
    }
    if (n == 1) {
        return 1;
    }
    // almacenamos factorial del número actual, el nombre (o llave) de la propiedad será el mismo número
    this.cache[n] = n * factorial(n - 1);
    return this.cache[n];
}

console.log(factorial(6));
// DATO: 
// Tener en cuenta que al llamar a la función "factorial" desde aquí,
// el "this" dentro de esta hará referencia al objeto global,
// es por esto que podemos acceder a la variable cache desde aquí
console.log(cache);