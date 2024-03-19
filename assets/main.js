/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 3157:
/*!*******************************!*\
  !*** ./src/assets/style.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 2875:
/*!*************************************!*\
  !*** ./src/assets/JSONFunctions.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   connect: () => (/* binding */ connect),
/* harmony export */   populate: () => (/* binding */ populate),
/* harmony export */   populateStorage: () => (/* binding */ populateStorage),
/* harmony export */   restoreStorage: () => (/* binding */ restoreStorage),
/* harmony export */   test: () => (/* binding */ test)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ 3317);

// import addLine from './uiListGenerator';

function populateStorage() {
  localStorage.setItem('data', _core__WEBPACK_IMPORTED_MODULE_0__["default"].toJSON());
  console.log('populate');
}

function restoreStorage() {
  if (localStorage.getItem('data') === null) return;
  _core__WEBPACK_IMPORTED_MODULE_0__["default"].restore(localStorage.getItem('data'));
}

async function connect() {
  const requestURL = './assets/data.json';
  const request = await fetch(requestURL);
  if (!request.ok) {
    throw new Error(`HTTP error! Status: ${request.status}`);
  }

  return request;
}

async function populate() {
  const value = await connect();
  return value;
}

function test() {
  _core__WEBPACK_IMPORTED_MODULE_0__["default"].restore(populate());
}


/***/ }),

/***/ 3317:
/*!****************************!*\
  !*** ./src/assets/core.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function CreateItem(text, deadline = 0, project = null, priorityNum = 0, check = false) {
  let title = text;
  let dueDate = deadline;
  let projectName = project;
  let priority = priorityNum;
  let checked = check;
  const notes = [];

  function editTitle(val) { title = val; }
  const getTitle = () => title;
  function editPriority(val) { priority = val; }
  const getPriority = () => priority;
  function deleteDuoDate() { dueDate = 0; }
  function editDueDate(val) { dueDate = val; }
  const getDueDate = () => dueDate;
  function editProject(val) { projectName = val; }
  const getProject = () => projectName;
  function editCheck() { checked = !checked; }
  const getCheck = () => checked;
  function addNote(val) { notes.push(val); }
  function deleteNote(pos) { notes.splice(pos, 1); }
  function editNote(pos, val) { notes[pos] = val; }
  const getAllNotes = () => notes;
  const getNote = (pos) => notes[pos];

  return {
    addNote,
    editNote,
    getNote,
    deleteNote,
    getAllNotes,

    editTitle,
    getTitle,

    editDueDate,
    deleteDuoDate,
    getDueDate,

    editProject,
    getProject,

    editPriority,
    getPriority,

    editCheck,
    getCheck,
  };
}

const todoList = (() => {
  const list = [];

  function returnObj(item) {
    const title = item.getTitle();
    const project = item.getProject();
    const dueDate = item.getDueDate();
    const priority = item.getPriority();
    const checked = item.getCheck();
    const notes = item.getAllNotes();

    return {
      title, project, dueDate, priority, checked, notes,
    };
  }

  const getLength = () => list.length;
  const selectItem = (pos) => list[pos];
  function setChecked(pos) { list[pos].editCheck(); }
  const allTasksList = () => list.map((obj) => (returnObj(obj)));
  function reset() { list.length = 0; }

  const getProjects = () => list.map((item) => item.getProject())
    .filter((value, pos, self) => value !== null && self.indexOf(value) === pos);

  function addItem(text, deadline, project, priority, checked) {
    const newItem = CreateItem(text, deadline, project, priority, checked);
    list.push(newItem);
  }

  const toJSON = () => {
    const listData = list.map((item) => ({
      title: item.getTitle(),
      project: item.getProject(),
      dueDate: item.getDueDate(),
      priority: item.getPriority(),
      checked: item.getCheck(),
      notes: item.getAllNotes(),
    }));

    return JSON.stringify({ list: listData }, '', 1);
  };

  const restore = (data) => {
    reset();
    const { list: listData } = JSON.parse(data);
    listData.forEach(
      ({
        title, project, dueDate, priority, checked, notes,
      }) => {
        const newItem = CreateItem(title, dueDate, project, priority, checked);
        notes.forEach((note) => newItem.addNote(note));
        list.push(newItem);
      },
    );
  };

  return {
    getLength,
    selectItem,
    addItem,
    restore,
    toJSON,
    setChecked,
    getProjects,
    reset,
    returnObj,
    allTasksList,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (todoList);

/*
###########################################
################           ################
################ TEST AREA ################
################           ################
###########################################
*/


/***/ }),

/***/ 2782:
/*!****************************!*\
  !*** ./src/assets/date.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   maskDate: () => (/* binding */ maskDate),
/* harmony export */   toInput: () => (/* binding */ toInput)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ 876);
/* harmony import */ var imask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! imask */ 3303);
// import { ptBR } from 'date-fns/locale';



const splitToCode = (date) => date.split('/').reverse().join('/').replaceAll('/', ', ');
const toInput = (data) => (0,date_fns__WEBPACK_IMPORTED_MODULE_1__.format)(new Date(splitToCode(data)), 'dd/LL/yyyy');
// const getData = (arr) => arr.forEach(element => {

// });

const maskDate = {
  mask: 'd/`m/`Y',
  blocks: {
    d: {
      mask: imask__WEBPACK_IMPORTED_MODULE_0__["default"].MaskedRange,
      placeholderChar: 'd',
      from: 1,
      to: 31,
      maxLength: 2,
    },
    m: {
      mask: imask__WEBPACK_IMPORTED_MODULE_0__["default"].MaskedRange,
      placeholderChar: 'm',
      from: 1,
      to: 12,
      maxLength: 2,
    },
    Y: {
      mask: imask__WEBPACK_IMPORTED_MODULE_0__["default"].MaskedRange,
      placeholderChar: 'a',
      from: 1000,
      to: 9999,
    },
  },
};


/***/ }),

/***/ 7273:
/*!******************************!*\
  !*** ./src/assets/script.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ 3157);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core */ 3317);
/* harmony import */ var _uiListGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uiListGenerator */ 6179);
/* harmony import */ var _JSONFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./JSONFunctions */ 2875);
/* harmony import */ var _uiAddItemConstructor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./uiAddItemConstructor */ 568);
/* harmony import */ var _uiFunctions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./uiFunctions */ 1363);
/* eslint-disable max-len */







const input = document.querySelectorAll('input');
const addField = document.querySelector('input#itemTitle');
const addTask = document.querySelector('a#addItem');

addTask.addEventListener('click', _uiAddItemConstructor__WEBPACK_IMPORTED_MODULE_4__["default"]);

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

input.forEach((e) => e.addEventListener('change', _JSONFunctions__WEBPACK_IMPORTED_MODULE_3__.populateStorage));
input.forEach((e) => e.setAttribute('autocomplete', 'off'));
// input.addEventListener('change', populateStorage);
// input.setAttribute('autocomplete', 'off');
window.onload = (0,_JSONFunctions__WEBPACK_IMPORTED_MODULE_3__.restoreStorage)();

// tests

// filtering special characters

// todoList.selectItem(0).editProject('Projeto 1');
// todoList.selectItem(1).editProject('Projeção');
// todoList.selectItem(2).editProject('Projota');
// todoList.selectItem(2).addNote(`
//   <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element.
//   These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables.
//   It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
// `);

// todoList.setChecked(2);
// todoList.selectItem(4).editProject('Projota');

function loadList() {
  const allItems = _core__WEBPACK_IMPORTED_MODULE_1__["default"].allTasksList();
  const uiList = [...allItems];
  uiList.sort((a, b) => ((a.checked < b.checked) ? -1 : 1));
  uiList.forEach((obj) => (0,_uiListGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(obj, allItems.indexOf(obj)));
}
loadList();

const mainModal = document.querySelector('div#exampleModal');
mainModal.addEventListener('hidden.bs.modal', () => {
  const modalBody = mainModal.querySelector('.modal-body');
  (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.clearContent)(modalBody);
});


/***/ }),

/***/ 568:
/*!********************************************!*\
  !*** ./src/assets/uiAddItemConstructor.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _uiFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uiFunctions */ 1363);

/* eslint-disable no-unused-vars */

function uiEditItem() {
  const modal = document.querySelector('div.modal-body');
  // creating elements
  const row1 = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', ['row']);
  const titleDiv = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', ['input-group', 'mb-3', 'gap-1']);
  const titleInput = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', ['form-control'], {
    id: 'itemTitle',
    type: 'text',
    placeholder: 'Nova Tarefa...',
  });
  const row2 = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', ['bg-gray', 'row', 'g-0', 'gap-2', 'flex-nowrap']);

  const dateDiv = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', ['date', 'flatpickr', 'col']);
  const dateInput = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', ['form-control', 'flatpickr-input'], {
    id: 'dueDate',
    type: 'text',
    inputmode: 'numeric',
    'data-input': undefined,
    autocomplete: 'off',
  });
  const datepickerToggle = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('a', ['input-button'], {
    title: 'toggle',
    'data-toggle': undefined,
  });
  const dateIcon = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('i', ['text-warning', 'small', 'bi', 'bi-calendar']);

  const priorityDiv = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', ['col']);
  const selectPriority = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createPrioritySelect)();

  const projectDiv = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', ['col']);
  const projectInput = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', ['form-control'], {
    id: 'enterProject',
    type: 'text',
    list: 'datalistOptions',
    placeholder: 'Projeto',
    autocomplete: 'off',
  });
  const projectDatalist = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('datalist', ['suggestions', 'form'], {
    id: 'datalistOptions',
    dropzone: 'string',
  });

  const row3 = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', ['row', 'pt-2']);

  const notesContainer = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', ['container']);
  const notesHeader = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('h6');
  const notesRow = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', ['row', 'g-2']);

  const addNoteRow = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', ['row', 'pt-2', 'justify-content-end']);

  const addNoteDiv = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', ['col-auto', 'small', 'text-danger', 'text-warning-emphasis']);
  const addNoteLink = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('a', [], { id: 'addNote' });
  const addNoteIcon = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('i', ['bi', 'bi-plus-circle']);
  const addNoteText = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('span');

  const row4 = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', ['row', 'g-2', 'pt-3', 'justify-content-start', 'flex-row-reverse']);

  const saveDiv = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', ['col-auto']);
  const saveBtn = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', ['btn', 'btn-warning', 'text-light'], {
    'data-bs-dismiss': 'modal',
  });
  const cancelDiv = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', ['col-auto']);
  const cancelBtn = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', ['btn', 'btn-secondary', 'text-light'], {
    'data-bs-dismiss': 'modal',
  });

  // append elements

  // row 1 (title)
  titleDiv.appendChild(titleInput);

  row1.appendChild(titleDiv);

  // row 2 (date, priority, project)

  // date
  datepickerToggle.appendChild(dateIcon);
  dateDiv.append(dateInput, datepickerToggle);

  // priority
  priorityDiv.appendChild(selectPriority);

  // project
  projectDiv.append(projectInput, projectDatalist);

  row2.append(dateDiv, priorityDiv, projectDiv);

  // row3 (notes area)
  notesHeader.textContent = 'Notas';
  addNoteText.textContent = 'Nova nota';
  addNoteIcon.textContent = ' '; // fixing a problem for using js

  addNoteLink.append(addNoteIcon, addNoteText);
  addNoteDiv.appendChild(addNoteLink);
  addNoteRow.appendChild(addNoteDiv);
  notesRow.appendChild(addNoteRow);
  notesContainer.append(notesHeader, notesRow);

  row3.appendChild(notesContainer);

  // row4 (buttons)
  saveBtn.addEventListener('click', _uiFunctions__WEBPACK_IMPORTED_MODULE_0__.clearModal);
  cancelBtn.addEventListener('click', _uiFunctions__WEBPACK_IMPORTED_MODULE_0__.clearModal);
  cancelBtn.textContent = 'Cancel';
  saveBtn.textContent = 'Save';
  saveDiv.appendChild(saveBtn);
  cancelDiv.appendChild(cancelBtn);

  row4.append(saveDiv, cancelDiv);

  modal.append(row1, row2, row3, row4);
  (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.dueDateMask)();
  (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_0__.searchProjects)();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (uiEditItem);


/***/ }),

/***/ 1363:
/*!***********************************!*\
  !*** ./src/assets/uiFunctions.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearContent: () => (/* binding */ clearContent),
/* harmony export */   createElement: () => (/* binding */ createElement),
/* harmony export */   createOption: () => (/* binding */ createOption),
/* harmony export */   createPrioritySelect: () => (/* binding */ createPrioritySelect),
/* harmony export */   dueDateMask: () => (/* binding */ dueDateMask),
/* harmony export */   isChecked: () => (/* binding */ isChecked),
/* harmony export */   searchProjects: () => (/* binding */ searchProjects),
/* harmony export */   setAttrs: () => (/* binding */ setAttrs),
/* harmony export */   setChecked: () => (/* binding */ setChecked)
/* harmony export */ });
/* harmony import */ var flatpickr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flatpickr */ 5840);
/* harmony import */ var flatpickr_dist_l10n_pt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flatpickr/dist/l10n/pt */ 450);
/* harmony import */ var flatpickr_dist_l10n_pt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flatpickr_dist_l10n_pt__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var imask__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! imask */ 3303);
/* harmony import */ var _date__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./date */ 2782);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core */ 3317);






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

function setAttrs(elem, attrs) {
  Object.keys(attrs).forEach((key) => {
    if (key !== undefined && attrs[key] !== undefined) {
      elem.setAttribute(key, attrs[key]);
    } else {
      elem.setAttribute(key, '');
    }
  });
}

function createElement(tag, classNames = [], attributes = {}) {
  const element = document.createElement(tag);
  if (classNames.length) element.classList.add(...classNames);
  setAttrs(element, attributes);
  return element;
}

function createOption(value, text, selected = false) {
  const option = createElement('option', [], { value });
  option.textContent = text;
  if (selected) {
    option.setAttribute('selected', 'selected');
  }
  return option;
}

function clearContent(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.lastChild);
  }
}

function createPrioritySelect() {
  const select = createElement('select', ['form-select'], {
    'aria-label': 'Prioridade',
  });
  for (let i = 0; i < 4; i += 1) {
    const text = i === 0 ? 'Prioridade' : `Prioridade ${i}`;
    const selected = i === 0;
    const option = createOption(i, text, selected);
    select.appendChild(option);
  }
  return select;
}

const isChecked = (e) => e.checked === true;

function setChecked(e) {
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
  search = search.replace(
    /[À-Üà-ü]/g,
    (match) => specialCharsMap[match] || match,
  );
  return search;
}
// projects datalist autocomplete
function autoComplete(search) {
  const projects = _core__WEBPACK_IMPORTED_MODULE_4__["default"].getProjects();
  return projects.filter((value) => {
    const valueLowercase = removeSpecials(value.toLowerCase());
    const searchLowercase = removeSpecials(search.toLowerCase());
    return valueLowercase.includes(searchLowercase);
  });
}

// calling functions to autocomplete Project field

function searchProjects() {
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

function dueDateMask() {
  const dueDate = document.querySelector('#dueDate');
  const flatElem = document.querySelector('div.flatpickr');

  // apply mask to dueDateField
  const mask = (0,imask__WEBPACK_IMPORTED_MODULE_2__["default"])(dueDate, _date__WEBPACK_IMPORTED_MODULE_3__.maskDate);

  // apply flatpickr datepicker to all elements in a div
  // (icon toggle and input date using data- attributes)
  (0,flatpickr__WEBPACK_IMPORTED_MODULE_0__["default"])(flatElem, {
    dateFormat: 'd/m/Y',
    disableMobile: 'true',
    allowInput: true,
    wrap: true,
    locale: flatpickr_dist_l10n_pt__WEBPACK_IMPORTED_MODULE_1__.Portuguese,
    onChange(selectedDates, dateStr) {
      mask.updateValue(dateStr);
    },
  });
}


/***/ }),

/***/ 6179:
/*!***************************************!*\
  !*** ./src/assets/uiListGenerator.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _JSONFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JSONFunctions */ 2875);
/* harmony import */ var _uiFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uiFunctions */ 1363);
/* eslint-disable no-param-reassign */



const list = document.querySelector('div#list');
const hasNotes = (obj) => obj.length > 0;

function addChecked(checkbox, button) {
  checkbox.checked = true;
  button.classList.add('text-decoration-line-through');
}

function insertNote(notes, body) {
  notes.forEach((content) => {
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = content;
    body.appendChild(contentDiv);
  });
}

function addLine(obj, num) {
  // LIST ITEM ------

  // header
  const item = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', ['accordion-item'], {
    'data-position': `${num}`,
  });
  const header = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('h2', ['accordion-header', 'p-1', 'd-flex', 'align-items-center', 'gap-1']);
  const checkbox = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('input', ['form-check-input', 'text-bg-warning'], { type: 'checkbox' });
  const btnHeader = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('button', ['accordion-button', 'collapsed', 'flex-fill'], {
    type: 'button',
    'data-bs-toggle': 'collapse',
    'aria-expanded': 'false',
    'data-bs-target': `#item-${num}`,
  });
  const span = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('span', ['flex-fill']);
  const code = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('code', ['small', 'text-muted']);

  // body
  const itemDetails = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', ['accordion-collapse', 'collapse'], {
    id: `item-${num}`,
  });
  const itemBody = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', ['accordion-body']);

  const btnEdit = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('button', ['btn', 'btn-warning']);
  const btnDelete = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('button', ['btn', 'btn-danger']);

  // EVENTLISTNERS OBJECTS
  checkbox.addEventListener('change', _uiFunctions__WEBPACK_IMPORTED_MODULE_1__.setChecked);
  checkbox.addEventListener('change', _JSONFunctions__WEBPACK_IMPORTED_MODULE_0__.populateStorage);

  // FILLING CONTENT
  // header
  span.textContent = obj.title;
  code.textContent = obj.project;

  // body
  btnEdit.textContent = 'Edit';
  btnDelete.textContent = 'Delete';

  // Appending content
  btnHeader.append(span, code);
  header.append(checkbox, btnHeader);

  // Body content
  if (hasNotes(obj.notes)) {
    insertNote(obj.notes, itemBody);
  }
  itemDetails.appendChild(itemBody);

  // Append elements to list
  item.append(header, itemDetails);
  list.appendChild(item);
  if ((0,_uiFunctions__WEBPACK_IMPORTED_MODULE_1__.isChecked)(obj)) addChecked(checkbox, btnHeader);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addLine);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunktodo_list"] = self["webpackChunktodo_list"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["3rdpart"], () => (__webpack_require__(7273)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7Ozs7O1dDM0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL0pTT05GdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9jb3JlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvZGF0ZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL3NjcmlwdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL3VpQWRkSXRlbUNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvdWlGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy91aUxpc3RHZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHRvZG9MaXN0IGZyb20gJy4vY29yZSc7XG4vLyBpbXBvcnQgYWRkTGluZSBmcm9tICcuL3VpTGlzdEdlbmVyYXRvcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBwb3B1bGF0ZVN0b3JhZ2UoKSB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXRhJywgdG9kb0xpc3QudG9KU09OKCkpO1xuICBjb25zb2xlLmxvZygncG9wdWxhdGUnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc3RvcmVTdG9yYWdlKCkge1xuICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhdGEnKSA9PT0gbnVsbCkgcmV0dXJuO1xuICB0b2RvTGlzdC5yZXN0b3JlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXRhJykpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29ubmVjdCgpIHtcbiAgY29uc3QgcmVxdWVzdFVSTCA9ICcuL2Fzc2V0cy9kYXRhLmpzb24nO1xuICBjb25zdCByZXF1ZXN0ID0gYXdhaXQgZmV0Y2gocmVxdWVzdFVSTCk7XG4gIGlmICghcmVxdWVzdC5vaykge1xuICAgIHRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciEgU3RhdHVzOiAke3JlcXVlc3Quc3RhdHVzfWApO1xuICB9XG5cbiAgcmV0dXJuIHJlcXVlc3Q7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwb3B1bGF0ZSgpIHtcbiAgY29uc3QgdmFsdWUgPSBhd2FpdCBjb25uZWN0KCk7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRlc3QoKSB7XG4gIHRvZG9MaXN0LnJlc3RvcmUocG9wdWxhdGUoKSk7XG59XG4iLCJmdW5jdGlvbiBDcmVhdGVJdGVtKHRleHQsIGRlYWRsaW5lID0gMCwgcHJvamVjdCA9IG51bGwsIHByaW9yaXR5TnVtID0gMCwgY2hlY2sgPSBmYWxzZSkge1xuICBsZXQgdGl0bGUgPSB0ZXh0O1xuICBsZXQgZHVlRGF0ZSA9IGRlYWRsaW5lO1xuICBsZXQgcHJvamVjdE5hbWUgPSBwcm9qZWN0O1xuICBsZXQgcHJpb3JpdHkgPSBwcmlvcml0eU51bTtcbiAgbGV0IGNoZWNrZWQgPSBjaGVjaztcbiAgY29uc3Qgbm90ZXMgPSBbXTtcblxuICBmdW5jdGlvbiBlZGl0VGl0bGUodmFsKSB7IHRpdGxlID0gdmFsOyB9XG4gIGNvbnN0IGdldFRpdGxlID0gKCkgPT4gdGl0bGU7XG4gIGZ1bmN0aW9uIGVkaXRQcmlvcml0eSh2YWwpIHsgcHJpb3JpdHkgPSB2YWw7IH1cbiAgY29uc3QgZ2V0UHJpb3JpdHkgPSAoKSA9PiBwcmlvcml0eTtcbiAgZnVuY3Rpb24gZGVsZXRlRHVvRGF0ZSgpIHsgZHVlRGF0ZSA9IDA7IH1cbiAgZnVuY3Rpb24gZWRpdER1ZURhdGUodmFsKSB7IGR1ZURhdGUgPSB2YWw7IH1cbiAgY29uc3QgZ2V0RHVlRGF0ZSA9ICgpID0+IGR1ZURhdGU7XG4gIGZ1bmN0aW9uIGVkaXRQcm9qZWN0KHZhbCkgeyBwcm9qZWN0TmFtZSA9IHZhbDsgfVxuICBjb25zdCBnZXRQcm9qZWN0ID0gKCkgPT4gcHJvamVjdE5hbWU7XG4gIGZ1bmN0aW9uIGVkaXRDaGVjaygpIHsgY2hlY2tlZCA9ICFjaGVja2VkOyB9XG4gIGNvbnN0IGdldENoZWNrID0gKCkgPT4gY2hlY2tlZDtcbiAgZnVuY3Rpb24gYWRkTm90ZSh2YWwpIHsgbm90ZXMucHVzaCh2YWwpOyB9XG4gIGZ1bmN0aW9uIGRlbGV0ZU5vdGUocG9zKSB7IG5vdGVzLnNwbGljZShwb3MsIDEpOyB9XG4gIGZ1bmN0aW9uIGVkaXROb3RlKHBvcywgdmFsKSB7IG5vdGVzW3Bvc10gPSB2YWw7IH1cbiAgY29uc3QgZ2V0QWxsTm90ZXMgPSAoKSA9PiBub3RlcztcbiAgY29uc3QgZ2V0Tm90ZSA9IChwb3MpID0+IG5vdGVzW3Bvc107XG5cbiAgcmV0dXJuIHtcbiAgICBhZGROb3RlLFxuICAgIGVkaXROb3RlLFxuICAgIGdldE5vdGUsXG4gICAgZGVsZXRlTm90ZSxcbiAgICBnZXRBbGxOb3RlcyxcblxuICAgIGVkaXRUaXRsZSxcbiAgICBnZXRUaXRsZSxcblxuICAgIGVkaXREdWVEYXRlLFxuICAgIGRlbGV0ZUR1b0RhdGUsXG4gICAgZ2V0RHVlRGF0ZSxcblxuICAgIGVkaXRQcm9qZWN0LFxuICAgIGdldFByb2plY3QsXG5cbiAgICBlZGl0UHJpb3JpdHksXG4gICAgZ2V0UHJpb3JpdHksXG5cbiAgICBlZGl0Q2hlY2ssXG4gICAgZ2V0Q2hlY2ssXG4gIH07XG59XG5cbmNvbnN0IHRvZG9MaXN0ID0gKCgpID0+IHtcbiAgY29uc3QgbGlzdCA9IFtdO1xuXG4gIGZ1bmN0aW9uIHJldHVybk9iaihpdGVtKSB7XG4gICAgY29uc3QgdGl0bGUgPSBpdGVtLmdldFRpdGxlKCk7XG4gICAgY29uc3QgcHJvamVjdCA9IGl0ZW0uZ2V0UHJvamVjdCgpO1xuICAgIGNvbnN0IGR1ZURhdGUgPSBpdGVtLmdldER1ZURhdGUoKTtcbiAgICBjb25zdCBwcmlvcml0eSA9IGl0ZW0uZ2V0UHJpb3JpdHkoKTtcbiAgICBjb25zdCBjaGVja2VkID0gaXRlbS5nZXRDaGVjaygpO1xuICAgIGNvbnN0IG5vdGVzID0gaXRlbS5nZXRBbGxOb3RlcygpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlLCBwcm9qZWN0LCBkdWVEYXRlLCBwcmlvcml0eSwgY2hlY2tlZCwgbm90ZXMsXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxpc3QubGVuZ3RoO1xuICBjb25zdCBzZWxlY3RJdGVtID0gKHBvcykgPT4gbGlzdFtwb3NdO1xuICBmdW5jdGlvbiBzZXRDaGVja2VkKHBvcykgeyBsaXN0W3Bvc10uZWRpdENoZWNrKCk7IH1cbiAgY29uc3QgYWxsVGFza3NMaXN0ID0gKCkgPT4gbGlzdC5tYXAoKG9iaikgPT4gKHJldHVybk9iaihvYmopKSk7XG4gIGZ1bmN0aW9uIHJlc2V0KCkgeyBsaXN0Lmxlbmd0aCA9IDA7IH1cblxuICBjb25zdCBnZXRQcm9qZWN0cyA9ICgpID0+IGxpc3QubWFwKChpdGVtKSA9PiBpdGVtLmdldFByb2plY3QoKSlcbiAgICAuZmlsdGVyKCh2YWx1ZSwgcG9zLCBzZWxmKSA9PiB2YWx1ZSAhPT0gbnVsbCAmJiBzZWxmLmluZGV4T2YodmFsdWUpID09PSBwb3MpO1xuXG4gIGZ1bmN0aW9uIGFkZEl0ZW0odGV4dCwgZGVhZGxpbmUsIHByb2plY3QsIHByaW9yaXR5LCBjaGVja2VkKSB7XG4gICAgY29uc3QgbmV3SXRlbSA9IENyZWF0ZUl0ZW0odGV4dCwgZGVhZGxpbmUsIHByb2plY3QsIHByaW9yaXR5LCBjaGVja2VkKTtcbiAgICBsaXN0LnB1c2gobmV3SXRlbSk7XG4gIH1cblxuICBjb25zdCB0b0pTT04gPSAoKSA9PiB7XG4gICAgY29uc3QgbGlzdERhdGEgPSBsaXN0Lm1hcCgoaXRlbSkgPT4gKHtcbiAgICAgIHRpdGxlOiBpdGVtLmdldFRpdGxlKCksXG4gICAgICBwcm9qZWN0OiBpdGVtLmdldFByb2plY3QoKSxcbiAgICAgIGR1ZURhdGU6IGl0ZW0uZ2V0RHVlRGF0ZSgpLFxuICAgICAgcHJpb3JpdHk6IGl0ZW0uZ2V0UHJpb3JpdHkoKSxcbiAgICAgIGNoZWNrZWQ6IGl0ZW0uZ2V0Q2hlY2soKSxcbiAgICAgIG5vdGVzOiBpdGVtLmdldEFsbE5vdGVzKCksXG4gICAgfSkpO1xuXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHsgbGlzdDogbGlzdERhdGEgfSwgJycsIDEpO1xuICB9O1xuXG4gIGNvbnN0IHJlc3RvcmUgPSAoZGF0YSkgPT4ge1xuICAgIHJlc2V0KCk7XG4gICAgY29uc3QgeyBsaXN0OiBsaXN0RGF0YSB9ID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICBsaXN0RGF0YS5mb3JFYWNoKFxuICAgICAgKHtcbiAgICAgICAgdGl0bGUsIHByb2plY3QsIGR1ZURhdGUsIHByaW9yaXR5LCBjaGVja2VkLCBub3RlcyxcbiAgICAgIH0pID0+IHtcbiAgICAgICAgY29uc3QgbmV3SXRlbSA9IENyZWF0ZUl0ZW0odGl0bGUsIGR1ZURhdGUsIHByb2plY3QsIHByaW9yaXR5LCBjaGVja2VkKTtcbiAgICAgICAgbm90ZXMuZm9yRWFjaCgobm90ZSkgPT4gbmV3SXRlbS5hZGROb3RlKG5vdGUpKTtcbiAgICAgICAgbGlzdC5wdXNoKG5ld0l0ZW0pO1xuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZ2V0TGVuZ3RoLFxuICAgIHNlbGVjdEl0ZW0sXG4gICAgYWRkSXRlbSxcbiAgICByZXN0b3JlLFxuICAgIHRvSlNPTixcbiAgICBzZXRDaGVja2VkLFxuICAgIGdldFByb2plY3RzLFxuICAgIHJlc2V0LFxuICAgIHJldHVybk9iaixcbiAgICBhbGxUYXNrc0xpc3QsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCB0b2RvTGlzdDtcblxuLypcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMjIyMjIyMjIyMjIyMjIyMgICAgICAgICAgICMjIyMjIyMjIyMjIyMjIyNcbiMjIyMjIyMjIyMjIyMjIyMgVEVTVCBBUkVBICMjIyMjIyMjIyMjIyMjIyNcbiMjIyMjIyMjIyMjIyMjIyMgICAgICAgICAgICMjIyMjIyMjIyMjIyMjIyNcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiovXG4iLCIvLyBpbXBvcnQgeyBwdEJSIH0gZnJvbSAnZGF0ZS1mbnMvbG9jYWxlJztcbmltcG9ydCB7IGZvcm1hdCB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCBJTWFzayBmcm9tICdpbWFzayc7XG5cbmNvbnN0IHNwbGl0VG9Db2RlID0gKGRhdGUpID0+IGRhdGUuc3BsaXQoJy8nKS5yZXZlcnNlKCkuam9pbignLycpLnJlcGxhY2VBbGwoJy8nLCAnLCAnKTtcbmV4cG9ydCBjb25zdCB0b0lucHV0ID0gKGRhdGEpID0+IGZvcm1hdChuZXcgRGF0ZShzcGxpdFRvQ29kZShkYXRhKSksICdkZC9MTC95eXl5Jyk7XG4vLyBjb25zdCBnZXREYXRhID0gKGFycikgPT4gYXJyLmZvckVhY2goZWxlbWVudCA9PiB7XG5cbi8vIH0pO1xuXG5leHBvcnQgY29uc3QgbWFza0RhdGUgPSB7XG4gIG1hc2s6ICdkL2BtL2BZJyxcbiAgYmxvY2tzOiB7XG4gICAgZDoge1xuICAgICAgbWFzazogSU1hc2suTWFza2VkUmFuZ2UsXG4gICAgICBwbGFjZWhvbGRlckNoYXI6ICdkJyxcbiAgICAgIGZyb206IDEsXG4gICAgICB0bzogMzEsXG4gICAgICBtYXhMZW5ndGg6IDIsXG4gICAgfSxcbiAgICBtOiB7XG4gICAgICBtYXNrOiBJTWFzay5NYXNrZWRSYW5nZSxcbiAgICAgIHBsYWNlaG9sZGVyQ2hhcjogJ20nLFxuICAgICAgZnJvbTogMSxcbiAgICAgIHRvOiAxMixcbiAgICAgIG1heExlbmd0aDogMixcbiAgICB9LFxuICAgIFk6IHtcbiAgICAgIG1hc2s6IElNYXNrLk1hc2tlZFJhbmdlLFxuICAgICAgcGxhY2Vob2xkZXJDaGFyOiAnYScsXG4gICAgICBmcm9tOiAxMDAwLFxuICAgICAgdG86IDk5OTksXG4gICAgfSxcbiAgfSxcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQgJy4vc3R5bGUuc2Nzcyc7XG5pbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcbmltcG9ydCBhZGRMaW5lIGZyb20gJy4vdWlMaXN0R2VuZXJhdG9yJztcbmltcG9ydCB7IHBvcHVsYXRlU3RvcmFnZSwgcmVzdG9yZVN0b3JhZ2UgfSBmcm9tICcuL0pTT05GdW5jdGlvbnMnO1xuaW1wb3J0IHVpRWRpdEl0ZW0gZnJvbSAnLi91aUFkZEl0ZW1Db25zdHJ1Y3Rvcic7XG5pbXBvcnQgeyBjbGVhckNvbnRlbnQgfSBmcm9tICcuL3VpRnVuY3Rpb25zJztcblxuY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpO1xuY29uc3QgYWRkRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCNpdGVtVGl0bGUnKTtcbmNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhI2FkZEl0ZW0nKTtcblxuYWRkVGFzay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHVpRWRpdEl0ZW0pO1xuXG4vLyBFbnF1YW50byBlc2NyZXZlIG8gdMOtdHVsbywgZWxlIG1vc3RyYSB1bSBib3TDo28gcGFyYSBhZGljaW9uYXIgbWFpcyBvcMOnw7Vlcywgc2UgYXNzaW0gZGVzZWphclxuZnVuY3Rpb24gc2hvd1BsdXNCdG4oKSB7XG4gIC8vIEVuY29udHJhIG8gYm90w6NvICtcbiAgY29uc3QgcGx1c0J0biA9IGFkZEZpZWxkLm5leHRFbGVtZW50U2libGluZztcbiAgY29uc3Qgc2F2ZUJ0biA9IHBsdXNCdG4ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAvLyBTZSBvIHZhbG9yIGRvIGNhbXBvIHTDrXR1bG8gZm9yIGRpZmVyZW50ZSBkZSB2YXppbyxcbiAgLy8gZW50w6NvIGVsZSByZXZlbGEgbyBib3TDo28gK1xuICBpZiAoYWRkRmllbGQudmFsdWUgIT09ICcnKSB7XG4gICAgcGx1c0J0bi5jbGFzc0xpc3QuYWRkKCdyZXZlYWxJdGVtJyk7XG4gICAgc2F2ZUJ0bi5jbGFzc0xpc3QuYWRkKCdyZXZlYWxJdGVtJyk7XG4gIH1cbiAgLy8gY2FzbyBjb250csOhcmlvLCBzZSB2b2PDqiBhcGFnYXIgdG9kbyBvIHTDrXR1bG9cbiAgLy8gZWxlIGTDoSBkaXNwbGF5OiBub25lLCBubyBib3TDo28gK1xuICBpZiAoYWRkRmllbGQudmFsdWUgPT09ICcnICYmIHBsdXNCdG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdyZXZlYWxJdGVtJykpIHtcbiAgICBwbHVzQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3JldmVhbEl0ZW0nKTtcbiAgICBzYXZlQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3JldmVhbEl0ZW0nKTtcbiAgfVxufVxuLy8gYWRpY2lvbmEgZXZlbnRvIHByYSBxdWFuZG8gc2UgY29tZcOnYSBhIGRpZ2l0YXJcbi8vIGUgcXVhbmRvIHNlIHBhcmEgZGUgZGlnaXRhciBvIHTDrXR1bG8gZG8gaXRlbS5cbmFkZEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBzaG93UGx1c0J0bik7XG5hZGRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHNob3dQbHVzQnRuKTtcblxuaW5wdXQuZm9yRWFjaCgoZSkgPT4gZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBwb3B1bGF0ZVN0b3JhZ2UpKTtcbmlucHV0LmZvckVhY2goKGUpID0+IGUuc2V0QXR0cmlidXRlKCdhdXRvY29tcGxldGUnLCAnb2ZmJykpO1xuLy8gaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgcG9wdWxhdGVTdG9yYWdlKTtcbi8vIGlucHV0LnNldEF0dHJpYnV0ZSgnYXV0b2NvbXBsZXRlJywgJ29mZicpO1xud2luZG93Lm9ubG9hZCA9IHJlc3RvcmVTdG9yYWdlKCk7XG5cbi8vIHRlc3RzXG5cbi8vIGZpbHRlcmluZyBzcGVjaWFsIGNoYXJhY3RlcnNcblxuLy8gdG9kb0xpc3Quc2VsZWN0SXRlbSgwKS5lZGl0UHJvamVjdCgnUHJvamV0byAxJyk7XG4vLyB0b2RvTGlzdC5zZWxlY3RJdGVtKDEpLmVkaXRQcm9qZWN0KCdQcm9qZcOnw6NvJyk7XG4vLyB0b2RvTGlzdC5zZWxlY3RJdGVtKDIpLmVkaXRQcm9qZWN0KCdQcm9qb3RhJyk7XG4vLyB0b2RvTGlzdC5zZWxlY3RJdGVtKDIpLmFkZE5vdGUoYFxuLy8gICA8c3Ryb25nPlRoaXMgaXMgdGhlIGZpcnN0IGl0ZW0ncyBhY2NvcmRpb24gYm9keS48L3N0cm9uZz4gSXQgaXMgc2hvd24gYnkgZGVmYXVsdCwgdW50aWwgdGhlIGNvbGxhcHNlIHBsdWdpbiBhZGRzIHRoZSBhcHByb3ByaWF0ZSBjbGFzc2VzIHRoYXQgd2UgdXNlIHRvIHN0eWxlIGVhY2ggZWxlbWVudC5cbi8vICAgVGhlc2UgY2xhc3NlcyBjb250cm9sIHRoZSBvdmVyYWxsIGFwcGVhcmFuY2UsIGFzIHdlbGwgYXMgdGhlIHNob3dpbmcgYW5kIGhpZGluZyB2aWEgQ1NTIHRyYW5zaXRpb25zLiBZb3UgY2FuIG1vZGlmeSBhbnkgb2YgdGhpcyB3aXRoIGN1c3RvbSBDU1Mgb3Igb3ZlcnJpZGluZyBvdXIgZGVmYXVsdCB2YXJpYWJsZXMuXG4vLyAgIEl0J3MgYWxzbyB3b3J0aCBub3RpbmcgdGhhdCBqdXN0IGFib3V0IGFueSBIVE1MIGNhbiBnbyB3aXRoaW4gdGhlIDxjb2RlPi5hY2NvcmRpb24tYm9keTwvY29kZT4sIHRob3VnaCB0aGUgdHJhbnNpdGlvbiBkb2VzIGxpbWl0IG92ZXJmbG93LlxuLy8gYCk7XG5cbi8vIHRvZG9MaXN0LnNldENoZWNrZWQoMik7XG4vLyB0b2RvTGlzdC5zZWxlY3RJdGVtKDQpLmVkaXRQcm9qZWN0KCdQcm9qb3RhJyk7XG5cbmZ1bmN0aW9uIGxvYWRMaXN0KCkge1xuICBjb25zdCBhbGxJdGVtcyA9IHRvZG9MaXN0LmFsbFRhc2tzTGlzdCgpO1xuICBjb25zdCB1aUxpc3QgPSBbLi4uYWxsSXRlbXNdO1xuICB1aUxpc3Quc29ydCgoYSwgYikgPT4gKChhLmNoZWNrZWQgPCBiLmNoZWNrZWQpID8gLTEgOiAxKSk7XG4gIHVpTGlzdC5mb3JFYWNoKChvYmopID0+IGFkZExpbmUob2JqLCBhbGxJdGVtcy5pbmRleE9mKG9iaikpKTtcbn1cbmxvYWRMaXN0KCk7XG5cbmNvbnN0IG1haW5Nb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNleGFtcGxlTW9kYWwnKTtcbm1haW5Nb2RhbC5hZGRFdmVudExpc3RlbmVyKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB7XG4gIGNvbnN0IG1vZGFsQm9keSA9IG1haW5Nb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtYm9keScpO1xuICBjbGVhckNvbnRlbnQobW9kYWxCb2R5KTtcbn0pO1xuIiwiaW1wb3J0IHtcbiAgZHVlRGF0ZU1hc2ssXG4gIHNlYXJjaFByb2plY3RzLFxuICBjcmVhdGVFbGVtZW50LFxuICBjcmVhdGVQcmlvcml0eVNlbGVjdCxcbiAgY2xlYXJNb2RhbCxcbn0gZnJvbSAnLi91aUZ1bmN0aW9ucyc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG5mdW5jdGlvbiB1aUVkaXRJdGVtKCkge1xuICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5tb2RhbC1ib2R5Jyk7XG4gIC8vIGNyZWF0aW5nIGVsZW1lbnRzXG4gIGNvbnN0IHJvdzEgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3JvdyddKTtcbiAgY29uc3QgdGl0bGVEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2lucHV0LWdyb3VwJywgJ21iLTMnLCAnZ2FwLTEnXSk7XG4gIGNvbnN0IHRpdGxlSW5wdXQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIFsnZm9ybS1jb250cm9sJ10sIHtcbiAgICBpZDogJ2l0ZW1UaXRsZScsXG4gICAgdHlwZTogJ3RleHQnLFxuICAgIHBsYWNlaG9sZGVyOiAnTm92YSBUYXJlZmEuLi4nLFxuICB9KTtcbiAgY29uc3Qgcm93MiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnYmctZ3JheScsICdyb3cnLCAnZy0wJywgJ2dhcC0yJywgJ2ZsZXgtbm93cmFwJ10pO1xuXG4gIGNvbnN0IGRhdGVEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2RhdGUnLCAnZmxhdHBpY2tyJywgJ2NvbCddKTtcbiAgY29uc3QgZGF0ZUlucHV0ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2Zvcm0tY29udHJvbCcsICdmbGF0cGlja3ItaW5wdXQnXSwge1xuICAgIGlkOiAnZHVlRGF0ZScsXG4gICAgdHlwZTogJ3RleHQnLFxuICAgIGlucHV0bW9kZTogJ251bWVyaWMnLFxuICAgICdkYXRhLWlucHV0JzogdW5kZWZpbmVkLFxuICAgIGF1dG9jb21wbGV0ZTogJ29mZicsXG4gIH0pO1xuICBjb25zdCBkYXRlcGlja2VyVG9nZ2xlID0gY3JlYXRlRWxlbWVudCgnYScsIFsnaW5wdXQtYnV0dG9uJ10sIHtcbiAgICB0aXRsZTogJ3RvZ2dsZScsXG4gICAgJ2RhdGEtdG9nZ2xlJzogdW5kZWZpbmVkLFxuICB9KTtcbiAgY29uc3QgZGF0ZUljb24gPSBjcmVhdGVFbGVtZW50KCdpJywgWyd0ZXh0LXdhcm5pbmcnLCAnc21hbGwnLCAnYmknLCAnYmktY2FsZW5kYXInXSk7XG5cbiAgY29uc3QgcHJpb3JpdHlEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbCddKTtcbiAgY29uc3Qgc2VsZWN0UHJpb3JpdHkgPSBjcmVhdGVQcmlvcml0eVNlbGVjdCgpO1xuXG4gIGNvbnN0IHByb2plY3REaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbCddKTtcbiAgY29uc3QgcHJvamVjdElucHV0ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2Zvcm0tY29udHJvbCddLCB7XG4gICAgaWQ6ICdlbnRlclByb2plY3QnLFxuICAgIHR5cGU6ICd0ZXh0JyxcbiAgICBsaXN0OiAnZGF0YWxpc3RPcHRpb25zJyxcbiAgICBwbGFjZWhvbGRlcjogJ1Byb2pldG8nLFxuICAgIGF1dG9jb21wbGV0ZTogJ29mZicsXG4gIH0pO1xuICBjb25zdCBwcm9qZWN0RGF0YWxpc3QgPSBjcmVhdGVFbGVtZW50KCdkYXRhbGlzdCcsIFsnc3VnZ2VzdGlvbnMnLCAnZm9ybSddLCB7XG4gICAgaWQ6ICdkYXRhbGlzdE9wdGlvbnMnLFxuICAgIGRyb3B6b25lOiAnc3RyaW5nJyxcbiAgfSk7XG5cbiAgY29uc3Qgcm93MyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncm93JywgJ3B0LTInXSk7XG5cbiAgY29uc3Qgbm90ZXNDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbnRhaW5lciddKTtcbiAgY29uc3Qgbm90ZXNIZWFkZXIgPSBjcmVhdGVFbGVtZW50KCdoNicpO1xuICBjb25zdCBub3Rlc1JvdyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncm93JywgJ2ctMiddKTtcblxuICBjb25zdCBhZGROb3RlUm93ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnLCAncHQtMicsICdqdXN0aWZ5LWNvbnRlbnQtZW5kJ10pO1xuXG4gIGNvbnN0IGFkZE5vdGVEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbC1hdXRvJywgJ3NtYWxsJywgJ3RleHQtZGFuZ2VyJywgJ3RleHQtd2FybmluZy1lbXBoYXNpcyddKTtcbiAgY29uc3QgYWRkTm90ZUxpbmsgPSBjcmVhdGVFbGVtZW50KCdhJywgW10sIHsgaWQ6ICdhZGROb3RlJyB9KTtcbiAgY29uc3QgYWRkTm90ZUljb24gPSBjcmVhdGVFbGVtZW50KCdpJywgWydiaScsICdiaS1wbHVzLWNpcmNsZSddKTtcbiAgY29uc3QgYWRkTm90ZVRleHQgPSBjcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgY29uc3Qgcm93NCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncm93JywgJ2ctMicsICdwdC0zJywgJ2p1c3RpZnktY29udGVudC1zdGFydCcsICdmbGV4LXJvdy1yZXZlcnNlJ10pO1xuXG4gIGNvbnN0IHNhdmVEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbC1hdXRvJ10pO1xuICBjb25zdCBzYXZlQnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgWydidG4nLCAnYnRuLXdhcm5pbmcnLCAndGV4dC1saWdodCddLCB7XG4gICAgJ2RhdGEtYnMtZGlzbWlzcyc6ICdtb2RhbCcsXG4gIH0pO1xuICBjb25zdCBjYW5jZWxEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbC1hdXRvJ10pO1xuICBjb25zdCBjYW5jZWxCdG4gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2J0bicsICdidG4tc2Vjb25kYXJ5JywgJ3RleHQtbGlnaHQnXSwge1xuICAgICdkYXRhLWJzLWRpc21pc3MnOiAnbW9kYWwnLFxuICB9KTtcblxuICAvLyBhcHBlbmQgZWxlbWVudHNcblxuICAvLyByb3cgMSAodGl0bGUpXG4gIHRpdGxlRGl2LmFwcGVuZENoaWxkKHRpdGxlSW5wdXQpO1xuXG4gIHJvdzEuYXBwZW5kQ2hpbGQodGl0bGVEaXYpO1xuXG4gIC8vIHJvdyAyIChkYXRlLCBwcmlvcml0eSwgcHJvamVjdClcblxuICAvLyBkYXRlXG4gIGRhdGVwaWNrZXJUb2dnbGUuYXBwZW5kQ2hpbGQoZGF0ZUljb24pO1xuICBkYXRlRGl2LmFwcGVuZChkYXRlSW5wdXQsIGRhdGVwaWNrZXJUb2dnbGUpO1xuXG4gIC8vIHByaW9yaXR5XG4gIHByaW9yaXR5RGl2LmFwcGVuZENoaWxkKHNlbGVjdFByaW9yaXR5KTtcblxuICAvLyBwcm9qZWN0XG4gIHByb2plY3REaXYuYXBwZW5kKHByb2plY3RJbnB1dCwgcHJvamVjdERhdGFsaXN0KTtcblxuICByb3cyLmFwcGVuZChkYXRlRGl2LCBwcmlvcml0eURpdiwgcHJvamVjdERpdik7XG5cbiAgLy8gcm93MyAobm90ZXMgYXJlYSlcbiAgbm90ZXNIZWFkZXIudGV4dENvbnRlbnQgPSAnTm90YXMnO1xuICBhZGROb3RlVGV4dC50ZXh0Q29udGVudCA9ICdOb3ZhIG5vdGEnO1xuICBhZGROb3RlSWNvbi50ZXh0Q29udGVudCA9ICcgJzsgLy8gZml4aW5nIGEgcHJvYmxlbSBmb3IgdXNpbmcganNcblxuICBhZGROb3RlTGluay5hcHBlbmQoYWRkTm90ZUljb24sIGFkZE5vdGVUZXh0KTtcbiAgYWRkTm90ZURpdi5hcHBlbmRDaGlsZChhZGROb3RlTGluayk7XG4gIGFkZE5vdGVSb3cuYXBwZW5kQ2hpbGQoYWRkTm90ZURpdik7XG4gIG5vdGVzUm93LmFwcGVuZENoaWxkKGFkZE5vdGVSb3cpO1xuICBub3Rlc0NvbnRhaW5lci5hcHBlbmQobm90ZXNIZWFkZXIsIG5vdGVzUm93KTtcblxuICByb3czLmFwcGVuZENoaWxkKG5vdGVzQ29udGFpbmVyKTtcblxuICAvLyByb3c0IChidXR0b25zKVxuICBzYXZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xlYXJNb2RhbCk7XG4gIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsZWFyTW9kYWwpO1xuICBjYW5jZWxCdG4udGV4dENvbnRlbnQgPSAnQ2FuY2VsJztcbiAgc2F2ZUJ0bi50ZXh0Q29udGVudCA9ICdTYXZlJztcbiAgc2F2ZURpdi5hcHBlbmRDaGlsZChzYXZlQnRuKTtcbiAgY2FuY2VsRGl2LmFwcGVuZENoaWxkKGNhbmNlbEJ0bik7XG5cbiAgcm93NC5hcHBlbmQoc2F2ZURpdiwgY2FuY2VsRGl2KTtcblxuICBtb2RhbC5hcHBlbmQocm93MSwgcm93Miwgcm93Mywgcm93NCk7XG4gIGR1ZURhdGVNYXNrKCk7XG4gIHNlYXJjaFByb2plY3RzKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHVpRWRpdEl0ZW07XG4iLCJpbXBvcnQgZmxhdHBpY2tyIGZyb20gJ2ZsYXRwaWNrcic7XG5pbXBvcnQgeyBQb3J0dWd1ZXNlIH0gZnJvbSAnZmxhdHBpY2tyL2Rpc3QvbDEwbi9wdCc7XG5pbXBvcnQgSU1hc2sgZnJvbSAnaW1hc2snO1xuaW1wb3J0IHsgbWFza0RhdGUgfSBmcm9tICcuL2RhdGUnO1xuaW1wb3J0IHRvZG9MaXN0IGZyb20gJy4vY29yZSc7XG5cbmNvbnN0IHNwZWNpYWxDaGFyc0VudHJpZXMgPSBbXG4gIFsnw4DDgcOCw4PDhMOFJywgJ0EnXSxcbiAgWyfDoMOhw6LDo8Okw6UnLCAnYSddLFxuICBbJ8OIw4nDisOLJywgJ0UnXSxcbiAgWyfDqMOpw6rDqycsICdlJ10sXG4gIFsnw4zDjcOOw48nLCAnSSddLFxuICBbJ8Osw63DrsOvJywgJ2knXSxcbiAgWyfDksOTw5XDlMOWJywgJ08nXSxcbiAgWyfDssOzw7XDtMO2JywgJ28nXSxcbiAgWyfDmcOaw5vDnCcsICdVJ10sXG4gIFsnw7nDusO7w7wnLCAndSddLFxuICBbJ8OHJywgJ0MnXSxcbiAgWyfDpycsICdjJ10sXG5dO1xuXG5jb25zdCBzcGVjaWFsQ2hhcnNNYXAgPSBPYmplY3QuZnJvbUVudHJpZXMoXG4gIHNwZWNpYWxDaGFyc0VudHJpZXMuZmxhdE1hcCgoW2NoYXJzLCB2YWx1ZV0pID0+IFsuLi5jaGFyc10ubWFwKChjaGFyKSA9PiBbY2hhciwgdmFsdWVdKSksXG4pO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0QXR0cnMoZWxlbSwgYXR0cnMpIHtcbiAgT2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZCAmJiBhdHRyc1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGtleSwgJycpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZywgY2xhc3NOYW1lcyA9IFtdLCBhdHRyaWJ1dGVzID0ge30pIHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgaWYgKGNsYXNzTmFtZXMubGVuZ3RoKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoLi4uY2xhc3NOYW1lcyk7XG4gIHNldEF0dHJzKGVsZW1lbnQsIGF0dHJpYnV0ZXMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU9wdGlvbih2YWx1ZSwgdGV4dCwgc2VsZWN0ZWQgPSBmYWxzZSkge1xuICBjb25zdCBvcHRpb24gPSBjcmVhdGVFbGVtZW50KCdvcHRpb24nLCBbXSwgeyB2YWx1ZSB9KTtcbiAgb3B0aW9uLnRleHRDb250ZW50ID0gdGV4dDtcbiAgaWYgKHNlbGVjdGVkKSB7XG4gICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKTtcbiAgfVxuICByZXR1cm4gb3B0aW9uO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDb250ZW50KGVsZW0pIHtcbiAgd2hpbGUgKGVsZW0uZmlyc3RDaGlsZCkge1xuICAgIGVsZW0ucmVtb3ZlQ2hpbGQoZWxlbS5sYXN0Q2hpbGQpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcmlvcml0eVNlbGVjdCgpIHtcbiAgY29uc3Qgc2VsZWN0ID0gY3JlYXRlRWxlbWVudCgnc2VsZWN0JywgWydmb3JtLXNlbGVjdCddLCB7XG4gICAgJ2FyaWEtbGFiZWwnOiAnUHJpb3JpZGFkZScsXG4gIH0pO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkgKz0gMSkge1xuICAgIGNvbnN0IHRleHQgPSBpID09PSAwID8gJ1ByaW9yaWRhZGUnIDogYFByaW9yaWRhZGUgJHtpfWA7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSBpID09PSAwO1xuICAgIGNvbnN0IG9wdGlvbiA9IGNyZWF0ZU9wdGlvbihpLCB0ZXh0LCBzZWxlY3RlZCk7XG4gICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gIH1cbiAgcmV0dXJuIHNlbGVjdDtcbn1cblxuZXhwb3J0IGNvbnN0IGlzQ2hlY2tlZCA9IChlKSA9PiBlLmNoZWNrZWQgPT09IHRydWU7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRDaGVja2VkKGUpIHtcbiAgY29uc3QgeyB0YXJnZXQgfSA9IGU7XG4gIGNvbnN0IHRleHQgPSB0YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICBpZiAoaXNDaGVja2VkKHRhcmdldCkpIHtcbiAgICB0ZXh0LmNsYXNzTGlzdC5hZGQoJ3RleHQtZGVjb3JhdGlvbi1saW5lLXRocm91Z2gnKTtcbiAgfSBlbHNlIHtcbiAgICB0ZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ3RleHQtZGVjb3JhdGlvbi1saW5lLXRocm91Z2gnKTtcbiAgfVxufVxuXG4vLyBBREQvRURJVCBORVcgVEFTSyBTQ1JFRU4gRlVOQ1RJT05TXG5cbmZ1bmN0aW9uIHJlbW92ZVNwZWNpYWxzKHRleHQpIHtcbiAgbGV0IHNlYXJjaCA9IHRleHQ7XG4gIHNlYXJjaCA9IHNlYXJjaC5yZXBsYWNlKFxuICAgIC9bw4Atw5zDoC3DvF0vZyxcbiAgICAobWF0Y2gpID0+IHNwZWNpYWxDaGFyc01hcFttYXRjaF0gfHwgbWF0Y2gsXG4gICk7XG4gIHJldHVybiBzZWFyY2g7XG59XG4vLyBwcm9qZWN0cyBkYXRhbGlzdCBhdXRvY29tcGxldGVcbmZ1bmN0aW9uIGF1dG9Db21wbGV0ZShzZWFyY2gpIHtcbiAgY29uc3QgcHJvamVjdHMgPSB0b2RvTGlzdC5nZXRQcm9qZWN0cygpO1xuICByZXR1cm4gcHJvamVjdHMuZmlsdGVyKCh2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHZhbHVlTG93ZXJjYXNlID0gcmVtb3ZlU3BlY2lhbHModmFsdWUudG9Mb3dlckNhc2UoKSk7XG4gICAgY29uc3Qgc2VhcmNoTG93ZXJjYXNlID0gcmVtb3ZlU3BlY2lhbHMoc2VhcmNoLnRvTG93ZXJDYXNlKCkpO1xuICAgIHJldHVybiB2YWx1ZUxvd2VyY2FzZS5pbmNsdWRlcyhzZWFyY2hMb3dlcmNhc2UpO1xuICB9KTtcbn1cblxuLy8gY2FsbGluZyBmdW5jdGlvbnMgdG8gYXV0b2NvbXBsZXRlIFByb2plY3QgZmllbGRcblxuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaFByb2plY3RzKCkge1xuICBjb25zdCBpbnB1dFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW50ZXJQcm9qZWN0Jyk7XG4gIGNvbnN0IGRhdGFsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGF0YWxpc3QnKTtcbiAgaW5wdXRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKHsgdGFyZ2V0IH0pID0+IHtcbiAgICBjb25zdCBpbnB1dERhdGEgPSB0YXJnZXQudmFsdWU7XG4gICAgaWYgKGlucHV0RGF0YS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGF1dG9Db21wbGV0ZU9wdGlvbnMgPSBhdXRvQ29tcGxldGUoaW5wdXREYXRhKTtcbiAgICAgIGRhdGFsaXN0LmlubmVySFRNTCA9IGAke2F1dG9Db21wbGV0ZU9wdGlvbnNcbiAgICAgICAgLm1hcCgodmFsdWUpID0+IGA8b3B0aW9uIHZhbHVlPVwiJHt2YWx1ZX1cIiAvPmApXG4gICAgICAgIC5qb2luKCcnKX1gO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIERBVEVQSUNLRVIgQU5EIE1BU0sgRlVOQ1RJT05TXG5cbmV4cG9ydCBmdW5jdGlvbiBkdWVEYXRlTWFzaygpIHtcbiAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkdWVEYXRlJyk7XG4gIGNvbnN0IGZsYXRFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LmZsYXRwaWNrcicpO1xuXG4gIC8vIGFwcGx5IG1hc2sgdG8gZHVlRGF0ZUZpZWxkXG4gIGNvbnN0IG1hc2sgPSBJTWFzayhkdWVEYXRlLCBtYXNrRGF0ZSk7XG5cbiAgLy8gYXBwbHkgZmxhdHBpY2tyIGRhdGVwaWNrZXIgdG8gYWxsIGVsZW1lbnRzIGluIGEgZGl2XG4gIC8vIChpY29uIHRvZ2dsZSBhbmQgaW5wdXQgZGF0ZSB1c2luZyBkYXRhLSBhdHRyaWJ1dGVzKVxuICBmbGF0cGlja3IoZmxhdEVsZW0sIHtcbiAgICBkYXRlRm9ybWF0OiAnZC9tL1knLFxuICAgIGRpc2FibGVNb2JpbGU6ICd0cnVlJyxcbiAgICBhbGxvd0lucHV0OiB0cnVlLFxuICAgIHdyYXA6IHRydWUsXG4gICAgbG9jYWxlOiBQb3J0dWd1ZXNlLFxuICAgIG9uQ2hhbmdlKHNlbGVjdGVkRGF0ZXMsIGRhdGVTdHIpIHtcbiAgICAgIG1hc2sudXBkYXRlVmFsdWUoZGF0ZVN0cik7XG4gICAgfSxcbiAgfSk7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuaW1wb3J0IHsgcG9wdWxhdGVTdG9yYWdlIH0gZnJvbSAnLi9KU09ORnVuY3Rpb25zJztcbmltcG9ydCB7IGlzQ2hlY2tlZCwgc2V0Q2hlY2tlZCwgY3JlYXRlRWxlbWVudCB9IGZyb20gJy4vdWlGdW5jdGlvbnMnO1xuXG5jb25zdCBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2I2xpc3QnKTtcbmNvbnN0IGhhc05vdGVzID0gKG9iaikgPT4gb2JqLmxlbmd0aCA+IDA7XG5cbmZ1bmN0aW9uIGFkZENoZWNrZWQoY2hlY2tib3gsIGJ1dHRvbikge1xuICBjaGVja2JveC5jaGVja2VkID0gdHJ1ZTtcbiAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3RleHQtZGVjb3JhdGlvbi1saW5lLXRocm91Z2gnKTtcbn1cblxuZnVuY3Rpb24gaW5zZXJ0Tm90ZShub3RlcywgYm9keSkge1xuICBub3Rlcy5mb3JFYWNoKChjb250ZW50KSA9PiB7XG4gICAgY29uc3QgY29udGVudERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnRlbnREaXYuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICBib2R5LmFwcGVuZENoaWxkKGNvbnRlbnREaXYpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkTGluZShvYmosIG51bSkge1xuICAvLyBMSVNUIElURU0gLS0tLS0tXG5cbiAgLy8gaGVhZGVyXG4gIGNvbnN0IGl0ZW0gPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2FjY29yZGlvbi1pdGVtJ10sIHtcbiAgICAnZGF0YS1wb3NpdGlvbic6IGAke251bX1gLFxuICB9KTtcbiAgY29uc3QgaGVhZGVyID0gY3JlYXRlRWxlbWVudCgnaDInLCBbJ2FjY29yZGlvbi1oZWFkZXInLCAncC0xJywgJ2QtZmxleCcsICdhbGlnbi1pdGVtcy1jZW50ZXInLCAnZ2FwLTEnXSk7XG4gIGNvbnN0IGNoZWNrYm94ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2Zvcm0tY2hlY2staW5wdXQnLCAndGV4dC1iZy13YXJuaW5nJ10sIHsgdHlwZTogJ2NoZWNrYm94JyB9KTtcbiAgY29uc3QgYnRuSGVhZGVyID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgWydhY2NvcmRpb24tYnV0dG9uJywgJ2NvbGxhcHNlZCcsICdmbGV4LWZpbGwnXSwge1xuICAgIHR5cGU6ICdidXR0b24nLFxuICAgICdkYXRhLWJzLXRvZ2dsZSc6ICdjb2xsYXBzZScsXG4gICAgJ2FyaWEtZXhwYW5kZWQnOiAnZmFsc2UnLFxuICAgICdkYXRhLWJzLXRhcmdldCc6IGAjaXRlbS0ke251bX1gLFxuICB9KTtcbiAgY29uc3Qgc3BhbiA9IGNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCBbJ2ZsZXgtZmlsbCddKTtcbiAgY29uc3QgY29kZSA9IGNyZWF0ZUVsZW1lbnQoJ2NvZGUnLCBbJ3NtYWxsJywgJ3RleHQtbXV0ZWQnXSk7XG5cbiAgLy8gYm9keVxuICBjb25zdCBpdGVtRGV0YWlscyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnYWNjb3JkaW9uLWNvbGxhcHNlJywgJ2NvbGxhcHNlJ10sIHtcbiAgICBpZDogYGl0ZW0tJHtudW19YCxcbiAgfSk7XG4gIGNvbnN0IGl0ZW1Cb2R5ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydhY2NvcmRpb24tYm9keSddKTtcblxuICBjb25zdCBidG5FZGl0ID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgWydidG4nLCAnYnRuLXdhcm5pbmcnXSk7XG4gIGNvbnN0IGJ0bkRlbGV0ZSA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIFsnYnRuJywgJ2J0bi1kYW5nZXInXSk7XG5cbiAgLy8gRVZFTlRMSVNUTkVSUyBPQkpFQ1RTXG4gIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHNldENoZWNrZWQpO1xuICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBwb3B1bGF0ZVN0b3JhZ2UpO1xuXG4gIC8vIEZJTExJTkcgQ09OVEVOVFxuICAvLyBoZWFkZXJcbiAgc3Bhbi50ZXh0Q29udGVudCA9IG9iai50aXRsZTtcbiAgY29kZS50ZXh0Q29udGVudCA9IG9iai5wcm9qZWN0O1xuXG4gIC8vIGJvZHlcbiAgYnRuRWRpdC50ZXh0Q29udGVudCA9ICdFZGl0JztcbiAgYnRuRGVsZXRlLnRleHRDb250ZW50ID0gJ0RlbGV0ZSc7XG5cbiAgLy8gQXBwZW5kaW5nIGNvbnRlbnRcbiAgYnRuSGVhZGVyLmFwcGVuZChzcGFuLCBjb2RlKTtcbiAgaGVhZGVyLmFwcGVuZChjaGVja2JveCwgYnRuSGVhZGVyKTtcblxuICAvLyBCb2R5IGNvbnRlbnRcbiAgaWYgKGhhc05vdGVzKG9iai5ub3RlcykpIHtcbiAgICBpbnNlcnROb3RlKG9iai5ub3RlcywgaXRlbUJvZHkpO1xuICB9XG4gIGl0ZW1EZXRhaWxzLmFwcGVuZENoaWxkKGl0ZW1Cb2R5KTtcblxuICAvLyBBcHBlbmQgZWxlbWVudHMgdG8gbGlzdFxuICBpdGVtLmFwcGVuZChoZWFkZXIsIGl0ZW1EZXRhaWxzKTtcbiAgbGlzdC5hcHBlbmRDaGlsZChpdGVtKTtcbiAgaWYgKGlzQ2hlY2tlZChvYmopKSBhZGRDaGVja2VkKGNoZWNrYm94LCBidG5IZWFkZXIpO1xufVxuZXhwb3J0IGRlZmF1bHQgYWRkTGluZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt0b2RvX2xpc3RcIl0gPSBzZWxmW1wid2VicGFja0NodW5rdG9kb19saXN0XCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCIzcmRwYXJ0XCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyg3MjczKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9