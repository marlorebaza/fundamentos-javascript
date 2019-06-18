// Manejo de fechas
// FUENTE: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date

// obtener fecha de hoy
let today = new Date();
console.log(today);

// milisegundos a fecha
let milisecondsToDate = new Date(100000000);
console.log(milisecondsToDate);

// cadena a fecha.
// la cadena debe ser un formato reconocido por Date.parse():
// https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date/parse
let stringToDate = new Date("Mon, 25 Dec 1995 13:30:00");
console.log(stringToDate);

// año, mes (base 0), dia [,hora,minutos,segundos,milisegundos]
let myDate = new Date(1990, 5, 30);
console.log(myDate);
let myDateTime = new Date(1990, 5, 30, 20, 30, 12, 100);
console.log(myDateTime);

// Obtener datos de fecha
console.log(`Día: ${myDate.getDate()}`); // getDate() devuelve el día del mes y getDay() devuelve el día de la semana
console.log(`Mes: ${myDate.getMonth()}`); // base 0
console.log(`Año: ${myDate.getFullYear()}`);
console.log(`Hora: ${myDate.getHours()}`);
console.log(`Minutos: ${myDate.getMinutes()}`);
console.log(`Segundos: ${myDate.getSeconds()}`);
console.log(`Milisegundos: ${myDate.getMilliseconds()}`);

// Obtener fecha de hoy en milisegundos
console.log(Date.now());

// Diferencia entre fechas: Javascript siempre realizará la resta a nivel de milisegundos
// 1. milisegundos - fecha
console.log(Date.now() - today);
// 2. Fecha - Fecha
console.log(today - myDate);
// 3. milisegundos - milisegundos
console.log(today.getTime() - myDate.getTime());

// ACA ME QUEDO:
// https://platzi.com/clases/1339-fundamentos-javascript/12977-funciones-recursivas0945/