// Asincronismo
/*
    JavaScript sólo puede hacer una cosa a la vez, sin embargo; es capaz de delegar 
    la ejecución de ciertas funciones a otros procesos. Este modelo de concurrencia se llama EventLoop.
    
    JavaScript delega en el navegador ciertas tareas y les asocia funciones que deberán ser ejecutadas 
    al ser completadas. Estas funciones se llaman callbacks, y una vez que el navegador ha regresado con 
    la respuesta, el callback asociado pasa a la cola de tareas para ser ejecutado una vez que JavaScript 
    haya terminado todas las instrucciones que están en la pila de ejecución.

    Si se acumulan funciones en la cola de tareas y JavaScript se encuentra ejecutando procesos muy pesados, 
    el EventLoop quedará bloqueado y esas funciones pudieran tardar demasiado en ejecutarse.

    FUENTE: https://platzi.com/clases/1339-fundamentos-javascript/12957-como-funciona-el-asincronismo-en-javascript/
*/

/*
// Ejemplo 1:
console.log("A");
// Despues de 2 segundos, la función callback pasará a la cola de tareas de JS.
// Esta será ejecutada después de la ejecución principal, es decir después de imprimir "C"
setTimeout(() => console.log("B"), 2000);
console.log("C");

// Ejemplo 2:
setTimeout(() => console.log("D"), 2000);
// Simulamos una pila de ejecución que toma más tiempo de lo normal.
for (let i = 0; i < 10000000000; i++) {}
// Esto provocará que la función callback de setTimeout se ejecute después de varios segundos,
// es decir el tiempo indicado es una espera mínima.

*/
// ACA ME QUEDO: 
// - ES UN NUEVO TEMA, ASINCRONISMO:
// https://platzi.com/clases/1339-fundamentos-javascript/12959-callbacks8214/