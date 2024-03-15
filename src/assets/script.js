import './style.scss';
import flatpickr from 'flatpickr';
import IMask from 'imask';
import { maskDate } from './date';
import todoList from './core';

const allInputs = document.querySelectorAll('input');
const addField = document.querySelector('#addItem');
const dueDate = document.querySelector('#dueDate');

function showPlusBtn() {
  const plusBtn = addField.nextElementSibling;
  if (addField.value !== '') {
    plusBtn.classList.remove('d-none');
  }
  if (addField.value === '' && !plusBtn.classList.contains('d-none')) {
    plusBtn.classList.add('d-none');
  }
}

const mask = IMask(dueDate, maskDate);

addField.addEventListener('keydown', showPlusBtn);
addField.addEventListener('keyup', showPlusBtn);
dueDate.setAttribute('autocomplete', 'off');

flatpickr(dueDate, {
  dateFormat: 'd/m/Y',
  allowInput: true,
  onChange(selectedDates, dateStr, instance) {
    mask.updateValue(dateStr);
    console.log(dueDate.value);
  },
});

function populateStorage() {
  localStorage.setItem('data', todoList.toJSON());
  console.log('populate rodou');
}

function restoreStorage() { todoList.restore(localStorage.getItem('data')); }
allInputs.forEach((e) => e.addEventListener('change', populateStorage));
window.onload = restoreStorage();
