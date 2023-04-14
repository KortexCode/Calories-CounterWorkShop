const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data);

//VARIABLES
//Lista de datos ha agregar
let list = [];  
//Obtención de nodos
const description = document.getElementById('description');
const calories = document.getElementById('calories');
const carbs = document.getElementById('carbs');
const protein = document.getElementById('protein');

//EVENTOS
//Al presionar una tecla estando el input seleccionado, retiraremos la clase "is-invalid"
description.addEventListener('click', () => description.classList.remove('is-invalid'));
calories.addEventListener('click', () => calories.classList.remove('is-invalid'));
carbs.addEventListener('click', () => carbs.classList.remove('is-invalid'));
protein.addEventListener('click', () => protein.classList.remove('is-invalid'));

//FUNCIONES
/* {
  tag: "h1",
  attr:{class: "title",}
} */
//Función para crear un atributo en formato string
const attrToString = (obj ={}) => {
  const keys = Object.keys(obj);

  const attr = keys.map((keyName)=>{
    return `${keyName}="${obj[keyName]}"`
  }).join("");

  return attr; /* class="title" */
}
//Función para crear una etiqueta con atributos en caso que los tenga
const tagAttr = obj => (content = '') =>
  `<${obj.tag}${obj.attrs? " " : ""}${attrToString(obj.attrs)}>${content}</${obj.tag}>`;

//Función para crear etiquetas
const tag = t => {
  typeof t === "string" ? tagAttr({tag: t}) : tagAttr(t);
}
/* tagAttr({tag: "h1", attrs:{class: "title"}})("Chikorita") */

//Función que valida si se ingresaron datos a los inputs
const validateInputs= () => {
  description.value ? '' : description.classList.add('is-invalid');
  calories.value ? '' : calories.classList.add('is-invalid');
  carbs.value ? '' : carbs.classList.add('is-invalid');
  protein.value ? '' : protein.classList.add('is-invalid');
  //Si los campos están vacios no se cumplirá la condición
  const valid = description.value && calories.value && carbs.value && protein.value;
  if(valid) {
    add();
  }
}

//Función que agrega los datos provenientes de los inputs a la tabla.
function add() {
  const data = {
    description : description.value,
    calories : parseInt(calories.value),
    carbs : parseInt(carbs.value),
    protein : parseInt(protein.value),
  }
  list.push(data);
  cleanInputs();
  console.log(list)
}
//Esta función elmina los valores ingresados en cada input
function cleanInputs() {
  description.value = "";
  calories.value = "";
  carbs.value = "";
  protein.value = "";
}

const buildSum = a => b => a + b; 
console.log(buildSum(5)(5));