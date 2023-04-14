const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data);
  
//Obtención de nodos
const description = document.getElementById('description');
const calories = document.getElementById('calories');
const carbs = document.getElementById('carbs');
const protein = document.getElementById('protein');
//Función que valida si se ingresaron datos a los inputs
const validateInputs= () => {
  description.value ? '' : description.classList.add('is-invalid');
  calories.value ? '' : calories.classList.add('is-invalid');
  carbs.value ? '' : carbs.classList.add('is-invalid');
  protein.value ? '' : protein.classList.add('is-invalid');
  //Si los campos están vacios no se cumplirá la condición
  const valid = description.value && calories.value && carbs.value && protein.value;
  if(valid) {
    console.log('OK!')
  }
}
//Al presionar una tecla estando el input seleccionado, retiraremos la clase "is-invalid"
description.addEventListener('keydown', () => description.classList.remove('is-invalid'))
calories.addEventListener('keydown', () => calories.classList.remove('is-invalid'))
carbs.addEventListener('keydown', () => carbs.classList.remove('is-invalid'))
protein.addEventListener('keydown', () => protein.classList.remove('is-invalid'))