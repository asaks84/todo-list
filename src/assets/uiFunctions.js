import flatpickr from 'flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import IMask from 'imask';
import { maskDate } from './date';
import todoList from './core';

export function setAttrs(elem, attrs) {
  Object.keys(attrs).forEach((key) => {
    elem.setAttribute(key, attrs[key]);
  });
}

export const isChecked = (e) => e.checked === true;

export function setChecked(e) {
  const { target } = e;
  const text = target.nextElementSibling;
  if (isChecked(target)) {
    text.classList.add('text-decoration-line-through');
  } else {
    text.classList.remove('text-decoration-line-through');
  }
}

// ADD/EDIT NEW TASK SCREEN FUNCTIONS

function removeSpecials(text) {
  let search = text;
  search = search.replace(/[ÀÁÂÃÄÅ]/, 'A');
  search = search.replace(/[àáâãäå]/, 'a');
  search = search.replace(/[ÈÉÊË]/, 'E');
  search = search.replace(/[èéêë]/, 'e');
  search = search.replace(/[ÌÍÏÎ]/, 'I');
  search = search.replace(/[ìíïî]/, 'i');
  search = search.replace(/[ÒÓÕÔÖ]/, 'O');
  search = search.replace(/[òóõôö]/, 'o');
  search = search.replace(/[ÙÚÛÜ]/, 'O');
  search = search.replace(/[ùúûü]/, 'u');
  search = search.replace(/[Ç]/, 'C');
  search = search.replace(/[ç]/, 'c');
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

  // dueDate.addEventListener('focus', () => {
  //   mask.updateOptions({ lazy: false });
  // });
  // dueDate.addEventListener('blur', () => {
  //   mask.updateOptions({ lazy: true });
  // });
}
