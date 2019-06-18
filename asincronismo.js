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

// Promesas (para evitar el "callback hell" -  infierno de callbacks)
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
- Cualquier error surgido en la cadena de promesas será controlado por el .catch(...) más próxima.
En caso no se controle un error (haciendo uso de un catch) en Node arrojará la siguiente excepción:
"UnhandledPromiseRejectionWarning: Unhandled promise rejection" y en un navegador: "Uncaught (in promise)"
*/


// Aplicando promesas para controlar el orden de respuesta
function obtenerPersona3(id) {
    return new Promise((resolve, reject) => {
        $
            .get(`${URL_BASE}${PEOPLE_PATH}${id}`, options, resolve)
            .fail(function(er) {
                console.log(er);
                reject(id);
            });
    });
}
// comentado intencionalmente
/*
obtenerPersona3(1)
    .then(persona1 => {
        console.log(`Nombre de persona 1: ${persona1.name}`)
        return obtenerPersona3(2);
    })
    .then(persona2 => {
        console.log(`Nombre de persona 2: ${persona2.name}`)
        return obtenerPersona3(3);
    })
    .then(persona3 => {
        console.log(`Nombre de persona 3: ${persona3.name}`)
        return obtenerPersona3(4);
    })
    .then(persona4 => {
        console.log(`Nombre de persona 4: ${persona4.name}`)
        return obtenerPersona3(5);
    })
    .then(persona5 => {
        console.log(`Nombre de persona 5: ${persona5.name}`)
        return obtenerPersona3(6);
    })
    .then(persona6 => {
        console.log(`Nombre de persona 6: ${persona6.name}`)
    })
    // Este catch controlará cualquier error surgido en la cadena
    .catch(onPersonaError);

*/
function onPersonaError(id) {
    console.log(`Ocurrió un error al obtener persona con id: ${id}`);
}


// Una mejor forma de controlar el orden de respuesta
let ids = [1,2,3,4,6,7,8];
// tarnsformamos ids a promesas
let promises = ids.map(obtenerPersona3);
Promise
    // all: crea una promesa que es resuelta con todas las promesas dentro del arreglo proporcionado
    .all(promises)
    // si todas las promesas son resueltas correctamente llamará a .then(...)
    .then(function(personas) {
        personas.forEach(function(persona) {
            console.log(`Nombre de persona: ${persona.name}`)
        });
    })
    // si una promesa es rechaza por un error, será controlado por un .catch(...)
    .catch(onPersonaError);


// Async -  await
// FUENTES:
// - https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/funcion_asincrona
// - https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/await
/*
Una función async devuelve un objeto Promise, es decir si retorna un valor, entonces la promesa se resolverá 
con el valor devuelto, en caso que genere una excepción se rechazará con el valor generado.

Una función async puede contener una expresión await, la cual pausa la ejecución de la 
función asíncrona y espera la resolución de la Promise pasada (o cualquier sentencia) y, a continuación, 
reanuda la ejecución de la función.

La finalidad de las funciones async/await es simplificar el comportamiento del uso síncrono de promesas 
y realizar algún comportamiento específico en un grupo de Promises. 
El código será menos "inteligente" (o elegante), pero será claro, legible y prolijo.
*/
// Ejemplo 1: await esperando una suma
async function mySimpleAsync() {
    return await 10 + 20;
}  
mySimpleAsync()
    .then(data => console.log(`mySimpleAsync resolved: ${data}`));
// Ejemplo 2: await esperando una promesa
async function myPromiseAsync() {
    return await new Promise(resolve => resolve(10 + 20));
}  
myPromiseAsync()
    .then(data => console.log(`myPromiseAsync resolved: ${data}`));
// Ejemplo 3: Controlando error por fuera
async function mySimpleAsyncError() {
    throw new Error("error!");
}  
mySimpleAsyncError()
    .catch(error => console.log(`mySimpleAsyncError rejected: ${error}`));
// Ejemplo 4: Controlando error estandar dentro de función asincrona
(async function() {
    try {
        throw new Error("error!");
    } catch (error) {
        console.log(`async. error controlado: ${error}`)
    }
} )();
// Ejemplo 5: Controlando error de promesa dentro de función asincrona
(async function() {
    try {
        await new Promise((resolve, reject) => reject("error!"));
    } catch (error) {
        console.log(`async. error promesa controlado: ${error}`)
    }
} )();
// Ejemplo 6: async-await VS promise
// Dado que los métodos usados en este ejemplo no existen lo encierro en un bloque de comentario para evitar error:
/*
// - solución usando promesas
function getProcessedData(url) {
    return downloadData(url) // ejecutamos promesa
        .catch(e => {
            return downloadFallbackData(url)  // controlamos error
        })
        .then(v => {
            return processDataInWorker(v); // resolvemos
        });
}
// - solución usando async - await
async function getProcessedData(url) {
    let v;
    try {
      v = await downloadData(url); // ejecutamos y esperamos promesa
    } catch(e) {
      v = await downloadFallbackData(url); // controlamos error
    }
    return processDataInWorker(v); // resolvemos
}
*/
// Nota: Ambos métodos devuelven una promesa


// Controlamos el orden de respuesta usando async - await
(async function() {
    let ids = [1,2,3,4,6,7,8];
    let promises = ids.map(obtenerPersona3);
    var personas;
    try {
        personas = await Promise.all(promises);
    } catch (error) {
        onPersonaError(error);
    }
    if (personas) {
        personas.forEach(function(persona) {
            console.log(`[async - await] Nombre de persona: ${persona.name}`)
        });
    }
})();
