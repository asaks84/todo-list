import flatpickr from 'flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import IMask from 'imask';
import { maskDate } from './date';
import todoList from './core';

export const list = document.querySelector('div#list');
export const addField = document.querySelector('input#itemTitle');
export const input = document.querySelector('input');
export const addTask = document.querySelector('a#addItem');
export const addMore = document.querySelector('button#addMore');
export const quickSave = document.querySelector('button#saveItem');

export const isChecked = (e) => e.checked === true;
export const hasNotes = (obj) => obj.length > 0;
export const loadList = () => [...todoList.allTasksList()];
export const sortParam = (arr, param) => [...arr]
  .sort((a, b) => ((a[param] < b[param]) ? -1 : 1));

export function addChecked(checkbox, button) {
  checkbox.checked = true;
  button.classList.add('text-decoration-line-through');
}

const specialCharsEntries = [
  ['ÀÁÂÃÄÅ', 'A'],
  ['àáâãäå', 'a'],
  ['ÈÉÊË', 'E'],
  ['èéêë', 'e'],
  ['ÌÍÎÏ', 'I'],
  ['ìíîï', 'i'],
  ['ÒÓÕÔÖ', 'O'],
  ['òóõôö', 'o'],
  ['ÙÚÛÜ', 'U'],
  ['ùúûü', 'u'],
  ['Ç', 'C'],
  ['ç', 'c'],
];

const specialCharsMap = Object.fromEntries(
  specialCharsEntries.flatMap(([chars, value]) => [...chars].map((char) => [char, value])),
);

// ELEMENT CREATORS

export function setAttrs(elem, attrs) {
  Object.keys(attrs).forEach((key) => {
    if (key !== undefined && attrs[key] !== undefined) {
      elem.setAttribute(key, attrs[key]);
    } else {
      elem.setAttribute(key, '');
    }
  });
}

export function createElement(tag, classNames = [], attributes = {}) {
  const element = document.createElement(tag);
  if (classNames.length) element.classList.add(...classNames);
  setAttrs(element, attributes);
  return element;
}

export function createOption(value, text, selected) {
  const option = createElement('option', [], { value });
  option.textContent = text;
  if (selected) {
    option.setAttribute('selected', '');
  }
  return option;
}

export function createPrioritySelect(num = 0) {
  const select = createElement('select', ['form-select'], {
    'aria-label': 'Prioridade',
  });
  for (let i = 0; i < 4; i += 1) {
    const text = i === 0 ? 'Prioridade' : `Prioridade ${i}`;
    const selected = i === parseInt(num, 10);
    const option = createOption(i, text, selected);
    select.appendChild(option);
  }
  return select;
}

// UI FUNCTIONS

export function clearContent(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.lastChild);
  }
}

// ADD/EDIT NEW TASK SCREEN FUNCTIONS

function removeSpecials(text) {
  let search = text;
  search = search.replace(
    /[À-Üà-ü]/g,
    (match) => specialCharsMap[match] || match,
  );
  return search;
}
// projects datalist autocomplete
function autoComplete(search) {
  const projects = todoList.getProjects();
  return projects.filter((value) => {
    const valueLowercase = removeSpecials(value.toLowerCase());
    const searchLowercase = removeSpecials(search.toLowerCase());
    return valueLowercase.includes(searchLowercase);
  });
}

// calling functions to autocomplete Project field

export function searchProjects() {
  const inputProject = document.querySelector('#enterProject');
  const datalist = document.querySelector('datalist');
  inputProject.addEventListener('input', ({ target }) => {
    const inputData = target.value;
    if (inputData.length) {
      const autoCompleteOptions = autoComplete(inputData);
      datalist.innerHTML = `${autoCompleteOptions
        .map((value) => `<option value="${value}" />`)
        .join('')}`;
    }
  });
}

// DATEPICKER AND MASK FUNCTIONS
export function dueDateMask() {
  const dueDate = document.querySelector('#dueDate');
  const flatElem = document.querySelector('div.flatpickr');

  // apply mask to dueDateField
  const mask = IMask(dueDate, maskDate);

  // apply flatpickr datepicker to all elements in a div
  // (icon toggle and input date using data- attributes)
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
}

// main screen interactions
// check visual effect
export function setLineThrough(e) {
  const text = e.nextElementSibling;
  if (isChecked(e)) {
    text.classList.add('text-decoration-line-through');
  } else {
    text.classList.remove('text-decoration-line-through');
  }
}

export function showPlusBtn() {
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

// export function findParentNode(element, attributeName) {
//   let { parentNode } = element;
//   while (parentNode) {
//     if (parentNode.hasAttribute(attributeName)) {
//       return parentNode;
//     }
//     parentNode = parentNode.parentNode;
//   }
//   return null; // Retorna null se não encontrou nenhum nó pai com o atributo desejado
// }
