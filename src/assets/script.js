/* eslint-disable no-param-reassign */
import './style.scss';
import flatpickr from 'flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import IMask from 'imask';
import { maskDate } from './date';
import todoList from './core';

const allInputs = document.querySelectorAll('input');
const addField = document.querySelector('input#itemTitle');
const dueDate = document.querySelector('#dueDate');
const flatElem = document.querySelector('div.flatpickr');

// Enquanto escreve o título, ele mostra um botão para adicionar mais opções, se assim desejar
function showPlusBtn() {
  // Encontra o botão +
  const plusBtn = addField.nextElementSibling;
  const saveBtn = plusBtn.nextElementSibling;
  // Se o valor do campo título for diferente de vazio,
  // então ele revela o botão +
  if (addField.value !== '') {
    plusBtn.classList.add('revealItem');
    saveBtn.classList.add('revealItem');
  }
  // caso contrário, se você apagar todo o título
  // ele dá display: none, no botão +
  if (addField.value === '' && plusBtn.classList.contains('revealItem')) {
    plusBtn.classList.remove('revealItem');
    saveBtn.classList.remove('revealItem');
  }
}
// adiciona evento pra quando se começa a digitar
// e quando se para de digitar o título do item.
addField.addEventListener('keydown', showPlusBtn);
addField.addEventListener('keyup', showPlusBtn);

// DATE FIELD

const mask = IMask(dueDate, maskDate);
allInputs.forEach((e) => e.setAttribute('autocomplete', 'off'));

flatpickr(flatElem, {
  dateFormat: 'd/m/Y',
  disableMobile: 'true',
  allowInput: true,
  wrap: true,
  locale: Portuguese,
  onChange(selectedDates, dateStr) {
    mask.updateValue(dateStr);
  },
});

function populateStorage() {
  localStorage.setItem('data', todoList.toJSON());
}

function restoreStorage() {
  todoList.restore(localStorage.getItem('data'));
}
allInputs.forEach((e) => e.addEventListener('change', populateStorage));
window.onload = restoreStorage();

// testes

function removeSpecials(texto) {
  // eliminando acentuação
  texto = texto.replace(/[ÀÁÂÃÄÅ]/, 'A');
  texto = texto.replace(/[àáâãäå]/, 'a');
  texto = texto.replace(/[ÈÉÊË]/, 'E');
  texto = texto.replace(/[èéêë]/, 'e');
  texto = texto.replace(/[ÌÍÏÎ]/, 'I');
  texto = texto.replace(/[ìíïî]/, 'i');
  texto = texto.replace(/[ÒÓÕÔÖ]/, 'O');
  texto = texto.replace(/[òóõôö]/, 'o');
  texto = texto.replace(/[ÙÚÛÜ]/, 'O');
  texto = texto.replace(/[ùúûü]/, 'u');
  texto = texto.replace(/[Ç]/, 'C');
  texto = texto.replace(/[ç]/, 'c');
  // console.log('return', texto.replace(/[^a-z0-9]/gi));
  return texto;
}

function autoComplete(search) {
  const projects = todoList.getProjects();
  console.log(projects);
  return projects.filter((value) => {
    const valuelowercase = removeSpecials(value.toLowerCase());
    const searchlowercase = removeSpecials(search.toLowerCase());
    return valuelowercase.includes(searchlowercase);
  });
}
const inputField = document.querySelector('#enterProject');
const sugestoes = document.querySelector('.sugestoes');

inputField.addEventListener('input', ({ target }) => {
  const inputData = target.value;
  if (inputData.length) {
    const autoCompleteOptions = autoComplete(inputData);
    // console.log(autoCompleteOptions);
    sugestoes.innerHTML = `${autoCompleteOptions.map((value) => `<option value="${value}" />`).join('')}`;
  }
});

todoList.addItem('Item 1');
todoList.addItem('Item 2');
todoList.addItem('Item 3');
