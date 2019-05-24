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

// Ejemplo 3 - Consumo de servicio REST externo
const URL_BASE = "https://swapi.co/api/";
const PEOPLE_PATH = "people/";
const options = {crossDomain: true};
// función callback que serà llamada cuando el servicio REST responda
/*
$.get(`${URL_BASE}${PEOPLE_PATH}`, options, function(data, textStatus, jqXHR) {
    if (data.results) {
        for (var datum of data.results ) {
            console.log(`Nombre: ${datum.name}`);
        }
    }
});
*/


// Ejemplo 4 - Consumo de servicio REST multiples veces.
// Con este ejemplo podemos ver que las peticiones no responden en el mismo orden que se invocan,
// esto debido a que la ejecución es asincrona y se resolverán dependiendo del servidor
function obtenerPersona(id) {
    $.get(`${URL_BASE}${PEOPLE_PATH}${id}`, options, function(data, textStatus, jqXHR) {
        console.log(`id: ${id} - nombre: ${data.name}`);
    });
}
// Lo comenté intencionalmente
/*
obtenerPersona(1);
obtenerPersona(2);
obtenerPersona(3);
obtenerPersona(4);
*/


// Ejemplo 5 - Controlando el orden de respuesta
// Haciendo uso de una cadena de callbacks mantenemos el orden, pero perdemos el paralelismo en la invocación
function obtenerPersona2(id, callback) {
    $
        .get(`${URL_BASE}${PEOPLE_PATH}${id}`, options, function(data, textStatus, jqXHR) {
            console.log(`id: ${id} - nombre: ${data.name}`);
            if (callback) {
                callback();
            }
        })
        // dato en chrome para emular este error: 
        // limpiar cache del navegador, ir a pestaña de network, deshabilitar cache y mientras
        // se estén realziando las peticiones activar offline 
        .fail(function() {
            console.log("Ocurrió un error");
        });
}
// Lo comenté intencionalmente
/*
obtenerPersona2(1, function() {
    obtenerPersona2(2, function() { 
        obtenerPersona2(3, function() { 
            obtenerPersona2(4);
        });
    });
});
*/

// Ejemplo 6 - Promesas (para evitar el "callback hell" -  infierno de callbacks)
// FUENTE: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise

// Probamos como funciona la cadena de promesas:
var myPromise = new Promise((resolve, reject) => {
    setTimeout(function() {resolve("oki doki!");}, 3000);
});
myPromise.then((data => {
    console.log(`[THEN 1] - Operación correcta. resultado = ${data}`);
    return "VALOR 1";
})).catch((error) => {
    console.log(`[CATCH 1] - Operación 1 errónea. resultado = ${error}`);
}).then((data) => {
    console.log(`[THEN 2] - Operación correcta. resultado = ${data}`);
    throw new Error("ERRROR 1");
}).catch((error) => {
    console.log(`[CATCH 2] - Operación errónea. resultado = ${error}`);
    //return "VALOR 2";
    throw new Error("ERRROR 2");
}).then((data) => {
    console.log(`[THEN 3] - Operación correcta. resultado = ${data}`);
    return "VALOR 3";
}, (error) => {
    console.log(`[CATCH 3] - Operación errónea. resultado = ${error}`);
}).finally((data) => {
    // finally no recibe el valor retornado por el then / catch previo
    console.log(`[FINALLY] - Fin de operación. resultado = ${data}`);
});

// A tener en cuenta el comportamiento de los siguientes 2 puntos:
// - .then(onFulfilled).catch(onRejected)
new Promise((resolve, reject) => {
    setTimeout(function() {resolve("HOLA!");}, 4000);
}).then(function(data) {
    throw new Error("ERROR");
}).catch(function(error) {
    // Este catch capturará cualquier error previo
    console.log(`Error controlado: ${error}`);
});
// - .then(onFulfilled[, onRejected]) (Lo comenté para evitar el error de "error no controlado")
/*
new Promise((resolve, reject) => {
    setTimeout(function() {resolve("HOLA!");}, 4000);
}).then(function(data) {
    throw new Error("ERROR"); // este error no será capturado por la función "onRejected"
}, function(error) {
    // Esta función "onRejected" capturará errores previos, pero no los errores
    // que surjan en su función adjunta "onFulfilled"
    console.log(`Error controlado: ${error}`);
});
*/

/*
NOTA:
- en caso no se controle un error (haciendo uso de un catch) en Node arrojará la siguiente excepción:
"UnhandledPromiseRejectionWarning: Unhandled promise rejection" y en un navegador: "Uncaught (in promise)"
*/


// ACA ME QUEDO: TERMINAR DE VER EL VIDEO Y HACER LA IMPLEMENTACION DE PROMESAS CON GET DE JQUERY


// ACA ME QUEDO: 
// - ES UN NUEVO TEMA, ASINCRONISMO:
// https://platzi.com/clases/1339-fundamentos-javascript/12963-promesas9741/

