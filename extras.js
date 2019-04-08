// Inicialización de objeto con variables (desde ES2015)
(function() {
    var name = "Marlo";
    var age = 12;
    // FUENTE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015
    var person = {name, age, lastName: "Rebaza"};
    console.log(person);
})();

// Redondeo
(function() {
    // Math.round: retorna el valor de un número redondeado al entero más cercano
    // Si la porción fraccionaría del número es 0.5 o mayor, el argumento es redondeado 
    // al siguiente número entero superior. Si la porción de la fracción del número es menor a 0.5, 
    // el argumento es redondeado al siguiente número entero inferior.
    console.log(Math.round(0.1)) // 0
    console.log(Math.round(5.5)) // 6
    console.log(Math.round(10.48)) // 10
    console.log(Math.round(2.67)) // 3
})();

// Numero aleatorio
(function() {
    // Math.random: genera un número aleatorio decimal entre 0 y 1
    var randomNumber = Math.random();
    console.log(randomNumber); 
    
    var generateRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);
    // Por ejemplo: Dado min = 0, max = 10
    // Si se genera 0.9 => 0.9 * 10 + 0 = 9.0 = 9 redondeado
    // Si se genera 0.999 => 0.999 * 10 + 0 = 9.99 = 10 redondeado
    // Si se genera 0.435 => 0.435 * 10 + 0 = 4.35 = 4 redondeado
    console.log(generateRandomNumber(0,10));
    console.log(generateRandomNumber(0,10));
    console.log(generateRandomNumber(0,10));
    console.log(generateRandomNumber(0,10));
})();

// Debug
// La sentencia "debugger" detiene la ejecución de javascript, y llama a la funcionalidad de debugeo
// (si está disponible), ya sea en un navegador o una IDE.
// Es el equivalente a un breakpint en el código
// FUENTE: https://www.w3schools.com/jsref/jsref_debugger.asp
(function() {
    var count = 10;
    while (count > 0) {
        // Por ejemplo: Para que se detenga la ejecución en este punto, será necesario ejecutar este código en
        // chrome con el modo debug activo: presionar F12 y seleccionar la pestaña Console
        // Y en Visual Studio Code, ejecutándolo en modo debug (presionar F5)
        //debugger;
        console.log(`... y va ${count}`);
        count--;
    }
})();

// Window Prompt: muestra un cuadro de diálogo que solicita una entrada
// FUENTE: https://www.w3schools.com/jsref/met_win_prompt.asp
(function() {
    // No es necesario indicar el objeto contenedor "window.prompt(...)", ya que lo buscará en el objeto global.
    // En el caso de un navegador será precisamente window, en el caso de ejecutarlo en NodeJS se caerá :P
    // Por eso mejor lo comento.
    /*
    var value = prompt("Como te llamas?", "Ingresa tu nombre");
    console.log(value);
    */
})();