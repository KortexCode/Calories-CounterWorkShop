const nodeId = (node) => document.getElementById(node);

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
  }).join(" ");

  return attr; /* class="title" */
}
//Función para crear una etiqueta con atributos en caso que los tenga
const tagAttr = obj => (content = '') =>{
  console.log("first", obj.tag, obj.attrs, "contenido", content);
  return `<${obj.tag}${obj.attrs ? " " : ""}${attrToString(obj.attrs)}>${content}</${obj.tag}>`;
}


//Función para crear etiquetas
const tag = t => {
 
  if(typeof t === "string"){
    return tagAttr({tag: t});
  }else{
    return tagAttr(t);
  }
}
//Funciones para crear filas
const tableRowTag = tag("tr");
/* const tableRow = items => tableRowTag(tableCells(items)); */
const tableRow = items => compose(tableRowTag, tableCells)(items);

//Funciones para crear celdas
const tableCell = tag("td");
/* tagAttr({tag: "h1", attrs:{class: "title"}})("Chikorita") */
const tableCells = items => items.map(tableCell).join("");

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
  updateTotals();
  renderItems();
  console.log(list)
}
//Esta función elmina los valores ingresados en cada input
function cleanInputs() {
  description.value = "";
  calories.value = "";
  carbs.value = "";
  protein.value = "";
}

//Función que actualiza los valores totales
const updateTotals = () => {
  let calories = 0, carbs =0, protein = 0;

  list.forEach(item => {
    calories += item.calories;
    carbs += item.carbs;
    protein += item.protein;
  });

  nodeId("totalCalories").textContent = calories;
  nodeId("totalCarbs").textContent = carbs;
  nodeId("totalProtein").textContent = protein;
  console.log(calories, carbs, protein)
}

//Esta función renderiza los elementos dentro de cuerpo de la tabla
const renderItems = () => {

  const tableBody = document.querySelector('tbody');
  tableBody.innerHTML = '';

  list.map(item => {
    tableBody.append(tableRow(
      [item.description, item.calories, item.carbs, item.protein]
    ))
  })
}


