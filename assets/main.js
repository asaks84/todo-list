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
function CreateItem(num, text, deadline = 0, project = null, priorityNum = 0, check = false) {
  let title = text;
  let dueDate = deadline;
  let projectName = project;
  let priority = priorityNum;
  let checked = check;
  const id = num;
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
  const getId = () => id;

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

    getId,
  };
}

const todoList = (() => {
  const list = [];

  function returnObj(item) {
    const id = item.getId();
    const title = item.getTitle();
    const project = item.getProject();
    const dueDate = item.getDueDate();
    const priority = item.getPriority();
    const checked = item.getCheck();
    const notes = item.getAllNotes();

    return {
      id, title, project, dueDate, priority, checked, notes,
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
    const id = list.length;
    const newItem = CreateItem(id, text, deadline, project, priority, checked);
    list.push(newItem);
  }

  const toJSON = () => {
    const listData = list.map((item) => ({
      id: item.getId(),
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
        id, title, project, dueDate, priority, checked, notes,
      }) => {
        const newItem = CreateItem(id, title, dueDate, project, priority, checked);
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
/* harmony import */ var _JSONFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./JSONFunctions */ 2875);
/* harmony import */ var _uiAddItemConstructor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./uiAddItemConstructor */ 5568);
/* harmony import */ var _uiControls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./uiControls */ 6042);
/* harmony import */ var _uiFunctions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./uiFunctions */ 1363);
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */







const input = document.querySelectorAll('input');
const addTask = document.querySelector('a#addItem');

addTask.addEventListener('click', _uiAddItemConstructor__WEBPACK_IMPORTED_MODULE_3__["default"]);

// adiciona evento pra quando se começa a digitar
// e quando se para de digitar o título do item.
_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.addField.addEventListener('keydown', _uiFunctions__WEBPACK_IMPORTED_MODULE_5__.showPlusBtn);
_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.addField.addEventListener('keyup', _uiFunctions__WEBPACK_IMPORTED_MODULE_5__.showPlusBtn);

input.forEach((e) => e.addEventListener('change', _JSONFunctions__WEBPACK_IMPORTED_MODULE_2__.populateStorage));
input.forEach((e) => e.setAttribute('autocomplete', 'off'));
// input.addEventListener('change', populateStorage);
// input.setAttribute('autocomplete', 'off');
window.onload = (0,_JSONFunctions__WEBPACK_IMPORTED_MODULE_2__.restoreStorage)();

const mainModal = document.querySelector('div#exampleModal');
mainModal.addEventListener('hidden.bs.modal', () => {
  const modalBody = mainModal.querySelector('.modal-body');
  (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.clearContent)(modalBody);
});

// tests
// console.log(todoList.getLength());
// todoList.addItem('Item 1');
// todoList.addItem('item 2');
// todoList.addItem('item 3');
// todoList.addItem('Item 4');
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
_uiControls__WEBPACK_IMPORTED_MODULE_4__.uiControl.load();


/***/ }),

/***/ 5568:
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

/***/ 6042:
/*!**********************************!*\
  !*** ./src/assets/uiControls.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadList: () => (/* binding */ loadList),
/* harmony export */   setChecked: () => (/* binding */ setChecked),
/* harmony export */   uiControl: () => (/* binding */ uiControl)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ 3317);
/* harmony import */ var _uiFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uiFunctions */ 1363);
/* harmony import */ var _uiListGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uiListGenerator */ 6179);


// eslint-disable-next-line import/no-cycle


const loadList = () => [..._core__WEBPACK_IMPORTED_MODULE_0__["default"].allTasksList()];
const sortParam = (arr, param) => [...arr]
  .sort((a, b) => ((a[param] < b[param]) ? -1 : 1));

// UI Controller
const uiControl = (() => {
  let currentFilter = null;

  function setCurrentFilter(key, value) {
    if (key) currentFilter = { key, value };
    else currentFilter = null;
  }

  const filterArray = (arr, filter, value) => {
    if (filter) return [...arr.filter((objeto) => objeto[filter] === value)];
    return arr;
  };

  function load() {
    const uiList = sortParam(loadList(), 'checked');
    if (currentFilter !== null) {
      filterArray(uiList, currentFilter.key, currentFilter.value)
        .forEach((obj) => {
          const index = loadList().findIndex((item) => item.id === obj.id);
          (0,_uiListGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(obj, index);
        });
    } else {
      uiList.forEach((obj) => {
        const index = loadList().findIndex((item) => item.id === obj.id);
        (0,_uiListGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(obj, index);
      });
    }
  }

  function update(filter, value) {
    (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_1__.clearContent)(document.querySelector('#list'));
    if (filter) setCurrentFilter(filter, value);
    if (filter === false) setCurrentFilter();
    load();
  }

  return {
    load,
    update,
  };
})();

function findParentNode(element, attributeName) {
  let { parentNode } = element;

  while (parentNode) {
    if (parentNode.hasAttribute(attributeName)) {
      return parentNode;
    }
    parentNode = parentNode.parentNode;
  }

  return null; // Retorna null se não encontrou nenhum nó pai com o atributo desejado
}

function setChecked(e) {
  const { target } = e;
  const pos = findParentNode(target, 'data-position').getAttribute('data-position');
  _core__WEBPACK_IMPORTED_MODULE_0__["default"].selectItem(pos).editCheck();
  (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_1__.setLineThrough)(target);
  uiControl.update();
}


/***/ }),

/***/ 1363:
/*!***********************************!*\
  !*** ./src/assets/uiFunctions.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addField: () => (/* binding */ addField),
/* harmony export */   clearContent: () => (/* binding */ clearContent),
/* harmony export */   createElement: () => (/* binding */ createElement),
/* harmony export */   createOption: () => (/* binding */ createOption),
/* harmony export */   createPrioritySelect: () => (/* binding */ createPrioritySelect),
/* harmony export */   dueDateMask: () => (/* binding */ dueDateMask),
/* harmony export */   isChecked: () => (/* binding */ isChecked),
/* harmony export */   searchProjects: () => (/* binding */ searchProjects),
/* harmony export */   setAttrs: () => (/* binding */ setAttrs),
/* harmony export */   setLineThrough: () => (/* binding */ setLineThrough),
/* harmony export */   showPlusBtn: () => (/* binding */ showPlusBtn)
/* harmony export */ });
/* harmony import */ var flatpickr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flatpickr */ 5840);
/* harmony import */ var flatpickr_dist_l10n_pt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flatpickr/dist/l10n/pt */ 450);
/* harmony import */ var flatpickr_dist_l10n_pt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flatpickr_dist_l10n_pt__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var imask__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! imask */ 3303);
/* harmony import */ var _date__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./date */ 2782);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core */ 3317);






const isChecked = (e) => e.checked === true;

// start onLoad

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

// main screen interactions
// check visual effect
function setLineThrough(e) {
  const text = e.nextElementSibling;
  if (isChecked(e)) {
    text.classList.add('text-decoration-line-through');
  } else {
    text.classList.remove('text-decoration-line-through');
  }
}

const addField = document.querySelector('input#itemTitle');

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
/* harmony import */ var _uiControls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uiControls */ 6042);
/* eslint-disable no-param-reassign */


// eslint-disable-next-line import/no-cycle


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
  checkbox.addEventListener('change', _uiControls__WEBPACK_IMPORTED_MODULE_2__.setChecked);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hc3NldHMvbWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0E4QjtBQUM5Qjs7QUFFTztBQUNQLCtCQUErQiw2Q0FBUTtBQUN2QztBQUNBOztBQUVPO0FBQ1A7QUFDQSxFQUFFLDZDQUFRO0FBQ1Y7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsZUFBZTtBQUMxRDs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVPO0FBQ1AsRUFBRSw2Q0FBUTtBQUNWOzs7Ozs7Ozs7Ozs7Ozs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBNEI7QUFDNUI7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQSw2QkFBNkI7QUFDN0IsOEJBQThCO0FBQzlCO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0EsMEJBQTBCO0FBQzFCLDZCQUE2QjtBQUM3QixnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSxxQkFBcUI7O0FBRXJCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMLDRCQUE0QixnQkFBZ0I7QUFDNUM7O0FBRUE7QUFDQTtBQUNBLFlBQVksaUJBQWlCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGlFQUFlLFFBQVEsRUFBQzs7QUFFeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hJQSxZQUFZLE9BQU87QUFDZTtBQUNSOztBQUUxQjtBQUNPLDBCQUEwQixnREFBTTtBQUN2Qzs7QUFFQSxJQUFJOztBQUVHO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsWUFBWSx5REFBaUI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLHlEQUFpQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVkseURBQWlCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xDQTtBQUNBO0FBQ3NCO0FBQ1E7QUFDb0M7QUFDbEI7QUFDUDtBQUtsQjs7QUFFdkI7QUFDQTs7QUFFQSxrQ0FBa0MsNkRBQVU7O0FBRTVDO0FBQ0E7QUFDQSxrREFBUSw2QkFBNkIscURBQVc7QUFDaEQsa0RBQVEsMkJBQTJCLHFEQUFXOztBQUU5QyxrREFBa0QsMkRBQWU7QUFDakU7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDhEQUFjOztBQUU5QjtBQUNBO0FBQ0E7QUFDQSxFQUFFLDBEQUFZO0FBQ2QsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrREFBUzs7Ozs7Ozs7Ozs7Ozs7OztBQy9DYztBQUN2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLDJEQUFhO0FBQzVCLG1CQUFtQiwyREFBYTtBQUNoQyxxQkFBcUIsMkRBQWE7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILGVBQWUsMkRBQWE7O0FBRTVCLGtCQUFrQiwyREFBYTtBQUMvQixvQkFBb0IsMkRBQWE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCwyQkFBMkIsMkRBQWE7QUFDeEM7QUFDQTtBQUNBLEdBQUc7QUFDSCxtQkFBbUIsMkRBQWE7O0FBRWhDLHNCQUFzQiwyREFBYTtBQUNuQyx5QkFBeUIsa0VBQW9COztBQUU3QyxxQkFBcUIsMkRBQWE7QUFDbEMsdUJBQXVCLDJEQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsMEJBQTBCLDJEQUFhO0FBQ3ZDO0FBQ0E7QUFDQSxHQUFHOztBQUVILGVBQWUsMkRBQWE7O0FBRTVCLHlCQUF5QiwyREFBYTtBQUN0QyxzQkFBc0IsMkRBQWE7QUFDbkMsbUJBQW1CLDJEQUFhOztBQUVoQyxxQkFBcUIsMkRBQWE7O0FBRWxDLHFCQUFxQiwyREFBYTtBQUNsQyxzQkFBc0IsMkRBQWEsWUFBWSxlQUFlO0FBQzlELHNCQUFzQiwyREFBYTtBQUNuQyxzQkFBc0IsMkRBQWE7O0FBRW5DLGVBQWUsMkRBQWE7O0FBRTVCLGtCQUFrQiwyREFBYTtBQUMvQixrQkFBa0IsMkRBQWE7QUFDL0I7QUFDQSxHQUFHO0FBQ0gsb0JBQW9CLDJEQUFhO0FBQ2pDLG9CQUFvQiwyREFBYTtBQUNqQztBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQzs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsRUFBRSx5REFBVztBQUNiLEVBQUUsNERBQWM7QUFDaEI7O0FBRUEsaUVBQWUsVUFBVSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pISTtBQUMrQjtBQUM3RDtBQUN3Qzs7QUFFakMsMkJBQTJCLDZDQUFRO0FBQzFDO0FBQ0E7O0FBRUE7QUFDTztBQUNQOztBQUVBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSw0REFBTztBQUNqQixTQUFTO0FBQ1QsTUFBTTtBQUNOO0FBQ0E7QUFDQSxRQUFRLDREQUFPO0FBQ2YsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLDBEQUFZO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLFFBQVEsYUFBYTs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGVBQWU7QUFDZjs7QUFFTztBQUNQLFVBQVUsU0FBUztBQUNuQjtBQUNBLEVBQUUsNkNBQVE7QUFDVixFQUFFLDREQUFjO0FBQ2hCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2RWtDO0FBQ2tCO0FBQzFCO0FBQ1E7QUFDSjs7QUFFdkI7O0FBRVA7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFTyw0REFBNEQ7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQLCtDQUErQyxPQUFPO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSCxrQkFBa0IsT0FBTztBQUN6Qix3REFBd0QsRUFBRTtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsNkNBQVE7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRU87QUFDUDtBQUNBO0FBQ0EsNENBQTRDLFFBQVE7QUFDcEQ7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCLDBDQUEwQyxNQUFNO0FBQ2hELGtCQUFrQjtBQUNsQjtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLGlEQUFLLFVBQVUsMkNBQVE7O0FBRXRDO0FBQ0E7QUFDQSxFQUFFLHFEQUFTO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDhEQUFVO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRU87O0FBRUE7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEtBO0FBQ2tEO0FBQ087QUFDekQ7QUFDMEM7O0FBRTFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSwyREFBYTtBQUM1Qix3QkFBd0IsSUFBSTtBQUM1QixHQUFHO0FBQ0gsaUJBQWlCLDJEQUFhO0FBQzlCLG1CQUFtQiwyREFBYSxxREFBcUQsa0JBQWtCO0FBQ3ZHLG9CQUFvQiwyREFBYTtBQUNqQztBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsSUFBSTtBQUNuQyxHQUFHO0FBQ0gsZUFBZSwyREFBYTtBQUM1QixlQUFlLDJEQUFhOztBQUU1QjtBQUNBLHNCQUFzQiwyREFBYTtBQUNuQyxnQkFBZ0IsSUFBSTtBQUNwQixHQUFHO0FBQ0gsbUJBQW1CLDJEQUFhOztBQUVoQyxrQkFBa0IsMkRBQWE7QUFDL0Isb0JBQW9CLDJEQUFhOztBQUVqQztBQUNBLHNDQUFzQyxtREFBVTtBQUNoRCxzQ0FBc0MsMkRBQWU7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLHVEQUFTO0FBQ2Y7QUFDQSxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7VUM3RXZCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSwrQkFBK0Isd0NBQXdDO1dBQ3ZFO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUJBQWlCLHFCQUFxQjtXQUN0QztXQUNBO1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9zdHlsZS5zY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvSlNPTkZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL2NvcmUuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9kYXRlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvc2NyaXB0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvdWlBZGRJdGVtQ29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy91aUNvbnRyb2xzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvdWlGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy91aUxpc3RHZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHRvZG9MaXN0IGZyb20gJy4vY29yZSc7XG4vLyBpbXBvcnQgYWRkTGluZSBmcm9tICcuL3VpTGlzdEdlbmVyYXRvcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBwb3B1bGF0ZVN0b3JhZ2UoKSB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXRhJywgdG9kb0xpc3QudG9KU09OKCkpO1xuICBjb25zb2xlLmxvZygncG9wdWxhdGUnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc3RvcmVTdG9yYWdlKCkge1xuICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhdGEnKSA9PT0gbnVsbCkgcmV0dXJuO1xuICB0b2RvTGlzdC5yZXN0b3JlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXRhJykpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29ubmVjdCgpIHtcbiAgY29uc3QgcmVxdWVzdFVSTCA9ICcuL2Fzc2V0cy9kYXRhLmpzb24nO1xuICBjb25zdCByZXF1ZXN0ID0gYXdhaXQgZmV0Y2gocmVxdWVzdFVSTCk7XG4gIGlmICghcmVxdWVzdC5vaykge1xuICAgIHRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciEgU3RhdHVzOiAke3JlcXVlc3Quc3RhdHVzfWApO1xuICB9XG5cbiAgcmV0dXJuIHJlcXVlc3Q7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwb3B1bGF0ZSgpIHtcbiAgY29uc3QgdmFsdWUgPSBhd2FpdCBjb25uZWN0KCk7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRlc3QoKSB7XG4gIHRvZG9MaXN0LnJlc3RvcmUocG9wdWxhdGUoKSk7XG59XG4iLCJmdW5jdGlvbiBDcmVhdGVJdGVtKG51bSwgdGV4dCwgZGVhZGxpbmUgPSAwLCBwcm9qZWN0ID0gbnVsbCwgcHJpb3JpdHlOdW0gPSAwLCBjaGVjayA9IGZhbHNlKSB7XG4gIGxldCB0aXRsZSA9IHRleHQ7XG4gIGxldCBkdWVEYXRlID0gZGVhZGxpbmU7XG4gIGxldCBwcm9qZWN0TmFtZSA9IHByb2plY3Q7XG4gIGxldCBwcmlvcml0eSA9IHByaW9yaXR5TnVtO1xuICBsZXQgY2hlY2tlZCA9IGNoZWNrO1xuICBjb25zdCBpZCA9IG51bTtcbiAgY29uc3Qgbm90ZXMgPSBbXTtcblxuICBmdW5jdGlvbiBlZGl0VGl0bGUodmFsKSB7IHRpdGxlID0gdmFsOyB9XG4gIGNvbnN0IGdldFRpdGxlID0gKCkgPT4gdGl0bGU7XG4gIGZ1bmN0aW9uIGVkaXRQcmlvcml0eSh2YWwpIHsgcHJpb3JpdHkgPSB2YWw7IH1cbiAgY29uc3QgZ2V0UHJpb3JpdHkgPSAoKSA9PiBwcmlvcml0eTtcbiAgZnVuY3Rpb24gZGVsZXRlRHVvRGF0ZSgpIHsgZHVlRGF0ZSA9IDA7IH1cbiAgZnVuY3Rpb24gZWRpdER1ZURhdGUodmFsKSB7IGR1ZURhdGUgPSB2YWw7IH1cbiAgY29uc3QgZ2V0RHVlRGF0ZSA9ICgpID0+IGR1ZURhdGU7XG4gIGZ1bmN0aW9uIGVkaXRQcm9qZWN0KHZhbCkgeyBwcm9qZWN0TmFtZSA9IHZhbDsgfVxuICBjb25zdCBnZXRQcm9qZWN0ID0gKCkgPT4gcHJvamVjdE5hbWU7XG4gIGZ1bmN0aW9uIGVkaXRDaGVjaygpIHsgY2hlY2tlZCA9ICFjaGVja2VkOyB9XG4gIGNvbnN0IGdldENoZWNrID0gKCkgPT4gY2hlY2tlZDtcbiAgZnVuY3Rpb24gYWRkTm90ZSh2YWwpIHsgbm90ZXMucHVzaCh2YWwpOyB9XG4gIGZ1bmN0aW9uIGRlbGV0ZU5vdGUocG9zKSB7IG5vdGVzLnNwbGljZShwb3MsIDEpOyB9XG4gIGZ1bmN0aW9uIGVkaXROb3RlKHBvcywgdmFsKSB7IG5vdGVzW3Bvc10gPSB2YWw7IH1cbiAgY29uc3QgZ2V0QWxsTm90ZXMgPSAoKSA9PiBub3RlcztcbiAgY29uc3QgZ2V0Tm90ZSA9IChwb3MpID0+IG5vdGVzW3Bvc107XG4gIGNvbnN0IGdldElkID0gKCkgPT4gaWQ7XG5cbiAgcmV0dXJuIHtcbiAgICBhZGROb3RlLFxuICAgIGVkaXROb3RlLFxuICAgIGdldE5vdGUsXG4gICAgZGVsZXRlTm90ZSxcbiAgICBnZXRBbGxOb3RlcyxcblxuICAgIGVkaXRUaXRsZSxcbiAgICBnZXRUaXRsZSxcblxuICAgIGVkaXREdWVEYXRlLFxuICAgIGRlbGV0ZUR1b0RhdGUsXG4gICAgZ2V0RHVlRGF0ZSxcblxuICAgIGVkaXRQcm9qZWN0LFxuICAgIGdldFByb2plY3QsXG5cbiAgICBlZGl0UHJpb3JpdHksXG4gICAgZ2V0UHJpb3JpdHksXG5cbiAgICBlZGl0Q2hlY2ssXG4gICAgZ2V0Q2hlY2ssXG5cbiAgICBnZXRJZCxcbiAgfTtcbn1cblxuY29uc3QgdG9kb0xpc3QgPSAoKCkgPT4ge1xuICBjb25zdCBsaXN0ID0gW107XG5cbiAgZnVuY3Rpb24gcmV0dXJuT2JqKGl0ZW0pIHtcbiAgICBjb25zdCBpZCA9IGl0ZW0uZ2V0SWQoKTtcbiAgICBjb25zdCB0aXRsZSA9IGl0ZW0uZ2V0VGl0bGUoKTtcbiAgICBjb25zdCBwcm9qZWN0ID0gaXRlbS5nZXRQcm9qZWN0KCk7XG4gICAgY29uc3QgZHVlRGF0ZSA9IGl0ZW0uZ2V0RHVlRGF0ZSgpO1xuICAgIGNvbnN0IHByaW9yaXR5ID0gaXRlbS5nZXRQcmlvcml0eSgpO1xuICAgIGNvbnN0IGNoZWNrZWQgPSBpdGVtLmdldENoZWNrKCk7XG4gICAgY29uc3Qgbm90ZXMgPSBpdGVtLmdldEFsbE5vdGVzKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgaWQsIHRpdGxlLCBwcm9qZWN0LCBkdWVEYXRlLCBwcmlvcml0eSwgY2hlY2tlZCwgbm90ZXMsXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxpc3QubGVuZ3RoO1xuICBjb25zdCBzZWxlY3RJdGVtID0gKHBvcykgPT4gbGlzdFtwb3NdO1xuICBmdW5jdGlvbiBzZXRDaGVja2VkKHBvcykgeyBsaXN0W3Bvc10uZWRpdENoZWNrKCk7IH1cbiAgY29uc3QgYWxsVGFza3NMaXN0ID0gKCkgPT4gbGlzdC5tYXAoKG9iaikgPT4gKHJldHVybk9iaihvYmopKSk7XG4gIGZ1bmN0aW9uIHJlc2V0KCkgeyBsaXN0Lmxlbmd0aCA9IDA7IH1cblxuICBjb25zdCBnZXRQcm9qZWN0cyA9ICgpID0+IGxpc3QubWFwKChpdGVtKSA9PiBpdGVtLmdldFByb2plY3QoKSlcbiAgICAuZmlsdGVyKCh2YWx1ZSwgcG9zLCBzZWxmKSA9PiB2YWx1ZSAhPT0gbnVsbCAmJiBzZWxmLmluZGV4T2YodmFsdWUpID09PSBwb3MpO1xuXG4gIGZ1bmN0aW9uIGFkZEl0ZW0odGV4dCwgZGVhZGxpbmUsIHByb2plY3QsIHByaW9yaXR5LCBjaGVja2VkKSB7XG4gICAgY29uc3QgaWQgPSBsaXN0Lmxlbmd0aDtcbiAgICBjb25zdCBuZXdJdGVtID0gQ3JlYXRlSXRlbShpZCwgdGV4dCwgZGVhZGxpbmUsIHByb2plY3QsIHByaW9yaXR5LCBjaGVja2VkKTtcbiAgICBsaXN0LnB1c2gobmV3SXRlbSk7XG4gIH1cblxuICBjb25zdCB0b0pTT04gPSAoKSA9PiB7XG4gICAgY29uc3QgbGlzdERhdGEgPSBsaXN0Lm1hcCgoaXRlbSkgPT4gKHtcbiAgICAgIGlkOiBpdGVtLmdldElkKCksXG4gICAgICB0aXRsZTogaXRlbS5nZXRUaXRsZSgpLFxuICAgICAgcHJvamVjdDogaXRlbS5nZXRQcm9qZWN0KCksXG4gICAgICBkdWVEYXRlOiBpdGVtLmdldER1ZURhdGUoKSxcbiAgICAgIHByaW9yaXR5OiBpdGVtLmdldFByaW9yaXR5KCksXG4gICAgICBjaGVja2VkOiBpdGVtLmdldENoZWNrKCksXG4gICAgICBub3RlczogaXRlbS5nZXRBbGxOb3RlcygpLFxuICAgIH0pKTtcblxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7IGxpc3Q6IGxpc3REYXRhIH0sICcnLCAxKTtcbiAgfTtcblxuICBjb25zdCByZXN0b3JlID0gKGRhdGEpID0+IHtcbiAgICByZXNldCgpO1xuICAgIGNvbnN0IHsgbGlzdDogbGlzdERhdGEgfSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgbGlzdERhdGEuZm9yRWFjaChcbiAgICAgICh7XG4gICAgICAgIGlkLCB0aXRsZSwgcHJvamVjdCwgZHVlRGF0ZSwgcHJpb3JpdHksIGNoZWNrZWQsIG5vdGVzLFxuICAgICAgfSkgPT4ge1xuICAgICAgICBjb25zdCBuZXdJdGVtID0gQ3JlYXRlSXRlbShpZCwgdGl0bGUsIGR1ZURhdGUsIHByb2plY3QsIHByaW9yaXR5LCBjaGVja2VkKTtcbiAgICAgICAgbm90ZXMuZm9yRWFjaCgobm90ZSkgPT4gbmV3SXRlbS5hZGROb3RlKG5vdGUpKTtcbiAgICAgICAgbGlzdC5wdXNoKG5ld0l0ZW0pO1xuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZ2V0TGVuZ3RoLFxuICAgIHNlbGVjdEl0ZW0sXG4gICAgYWRkSXRlbSxcbiAgICByZXN0b3JlLFxuICAgIHRvSlNPTixcbiAgICBzZXRDaGVja2VkLFxuICAgIGdldFByb2plY3RzLFxuICAgIHJlc2V0LFxuICAgIHJldHVybk9iaixcbiAgICBhbGxUYXNrc0xpc3QsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCB0b2RvTGlzdDtcblxuLypcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMjIyMjIyMjIyMjIyMjIyMgICAgICAgICAgICMjIyMjIyMjIyMjIyMjIyNcbiMjIyMjIyMjIyMjIyMjIyMgVEVTVCBBUkVBICMjIyMjIyMjIyMjIyMjIyNcbiMjIyMjIyMjIyMjIyMjIyMgICAgICAgICAgICMjIyMjIyMjIyMjIyMjIyNcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiovXG4iLCIvLyBpbXBvcnQgeyBwdEJSIH0gZnJvbSAnZGF0ZS1mbnMvbG9jYWxlJztcbmltcG9ydCB7IGZvcm1hdCB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCBJTWFzayBmcm9tICdpbWFzayc7XG5cbmNvbnN0IHNwbGl0VG9Db2RlID0gKGRhdGUpID0+IGRhdGUuc3BsaXQoJy8nKS5yZXZlcnNlKCkuam9pbignLycpLnJlcGxhY2VBbGwoJy8nLCAnLCAnKTtcbmV4cG9ydCBjb25zdCB0b0lucHV0ID0gKGRhdGEpID0+IGZvcm1hdChuZXcgRGF0ZShzcGxpdFRvQ29kZShkYXRhKSksICdkZC9MTC95eXl5Jyk7XG4vLyBjb25zdCBnZXREYXRhID0gKGFycikgPT4gYXJyLmZvckVhY2goZWxlbWVudCA9PiB7XG5cbi8vIH0pO1xuXG5leHBvcnQgY29uc3QgbWFza0RhdGUgPSB7XG4gIG1hc2s6ICdkL2BtL2BZJyxcbiAgYmxvY2tzOiB7XG4gICAgZDoge1xuICAgICAgbWFzazogSU1hc2suTWFza2VkUmFuZ2UsXG4gICAgICBwbGFjZWhvbGRlckNoYXI6ICdkJyxcbiAgICAgIGZyb206IDEsXG4gICAgICB0bzogMzEsXG4gICAgICBtYXhMZW5ndGg6IDIsXG4gICAgfSxcbiAgICBtOiB7XG4gICAgICBtYXNrOiBJTWFzay5NYXNrZWRSYW5nZSxcbiAgICAgIHBsYWNlaG9sZGVyQ2hhcjogJ20nLFxuICAgICAgZnJvbTogMSxcbiAgICAgIHRvOiAxMixcbiAgICAgIG1heExlbmd0aDogMixcbiAgICB9LFxuICAgIFk6IHtcbiAgICAgIG1hc2s6IElNYXNrLk1hc2tlZFJhbmdlLFxuICAgICAgcGxhY2Vob2xkZXJDaGFyOiAnYScsXG4gICAgICBmcm9tOiAxMDAwLFxuICAgICAgdG86IDk5OTksXG4gICAgfSxcbiAgfSxcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xuaW1wb3J0IHRvZG9MaXN0IGZyb20gJy4vY29yZSc7XG5pbXBvcnQgeyBwb3B1bGF0ZVN0b3JhZ2UsIHJlc3RvcmVTdG9yYWdlIH0gZnJvbSAnLi9KU09ORnVuY3Rpb25zJztcbmltcG9ydCB1aUVkaXRJdGVtIGZyb20gJy4vdWlBZGRJdGVtQ29uc3RydWN0b3InO1xuaW1wb3J0IHsgdWlDb250cm9sIH0gZnJvbSAnLi91aUNvbnRyb2xzJztcbmltcG9ydCB7XG4gIGNsZWFyQ29udGVudCxcbiAgc2hvd1BsdXNCdG4sXG4gIGFkZEZpZWxkLFxufSBmcm9tICcuL3VpRnVuY3Rpb25zJztcblxuY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpO1xuY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2EjYWRkSXRlbScpO1xuXG5hZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdWlFZGl0SXRlbSk7XG5cbi8vIGFkaWNpb25hIGV2ZW50byBwcmEgcXVhbmRvIHNlIGNvbWXDp2EgYSBkaWdpdGFyXG4vLyBlIHF1YW5kbyBzZSBwYXJhIGRlIGRpZ2l0YXIgbyB0w610dWxvIGRvIGl0ZW0uXG5hZGRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgc2hvd1BsdXNCdG4pO1xuYWRkRmllbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBzaG93UGx1c0J0bik7XG5cbmlucHV0LmZvckVhY2goKGUpID0+IGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgcG9wdWxhdGVTdG9yYWdlKSk7XG5pbnB1dC5mb3JFYWNoKChlKSA9PiBlLnNldEF0dHJpYnV0ZSgnYXV0b2NvbXBsZXRlJywgJ29mZicpKTtcbi8vIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHBvcHVsYXRlU3RvcmFnZSk7XG4vLyBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2F1dG9jb21wbGV0ZScsICdvZmYnKTtcbndpbmRvdy5vbmxvYWQgPSByZXN0b3JlU3RvcmFnZSgpO1xuXG5jb25zdCBtYWluTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYjZXhhbXBsZU1vZGFsJyk7XG5tYWluTW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignaGlkZGVuLmJzLm1vZGFsJywgKCkgPT4ge1xuICBjb25zdCBtb2RhbEJvZHkgPSBtYWluTW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWJvZHknKTtcbiAgY2xlYXJDb250ZW50KG1vZGFsQm9keSk7XG59KTtcblxuLy8gdGVzdHNcbi8vIGNvbnNvbGUubG9nKHRvZG9MaXN0LmdldExlbmd0aCgpKTtcbi8vIHRvZG9MaXN0LmFkZEl0ZW0oJ0l0ZW0gMScpO1xuLy8gdG9kb0xpc3QuYWRkSXRlbSgnaXRlbSAyJyk7XG4vLyB0b2RvTGlzdC5hZGRJdGVtKCdpdGVtIDMnKTtcbi8vIHRvZG9MaXN0LmFkZEl0ZW0oJ0l0ZW0gNCcpO1xuLy8gdG9kb0xpc3Quc2VsZWN0SXRlbSgwKS5lZGl0UHJvamVjdCgnUHJvamV0byAxJyk7XG4vLyB0b2RvTGlzdC5zZWxlY3RJdGVtKDEpLmVkaXRQcm9qZWN0KCdQcm9qZcOnw6NvJyk7XG4vLyB0b2RvTGlzdC5zZWxlY3RJdGVtKDIpLmVkaXRQcm9qZWN0KCdQcm9qb3RhJyk7XG4vLyB0b2RvTGlzdC5zZWxlY3RJdGVtKDIpLmFkZE5vdGUoYFxuLy8gICA8c3Ryb25nPlRoaXMgaXMgdGhlIGZpcnN0IGl0ZW0ncyBhY2NvcmRpb24gYm9keS48L3N0cm9uZz4gSXQgaXMgc2hvd24gYnkgZGVmYXVsdCwgdW50aWwgdGhlIGNvbGxhcHNlIHBsdWdpbiBhZGRzIHRoZSBhcHByb3ByaWF0ZSBjbGFzc2VzIHRoYXQgd2UgdXNlIHRvIHN0eWxlIGVhY2ggZWxlbWVudC5cbi8vICAgVGhlc2UgY2xhc3NlcyBjb250cm9sIHRoZSBvdmVyYWxsIGFwcGVhcmFuY2UsIGFzIHdlbGwgYXMgdGhlIHNob3dpbmcgYW5kIGhpZGluZyB2aWEgQ1NTIHRyYW5zaXRpb25zLiBZb3UgY2FuIG1vZGlmeSBhbnkgb2YgdGhpcyB3aXRoIGN1c3RvbSBDU1Mgb3Igb3ZlcnJpZGluZyBvdXIgZGVmYXVsdCB2YXJpYWJsZXMuXG4vLyAgIEl0J3MgYWxzbyB3b3J0aCBub3RpbmcgdGhhdCBqdXN0IGFib3V0IGFueSBIVE1MIGNhbiBnbyB3aXRoaW4gdGhlIDxjb2RlPi5hY2NvcmRpb24tYm9keTwvY29kZT4sIHRob3VnaCB0aGUgdHJhbnNpdGlvbiBkb2VzIGxpbWl0IG92ZXJmbG93LlxuLy8gYCk7XG5cbi8vIHRvZG9MaXN0LnNldENoZWNrZWQoMik7XG4vLyB0b2RvTGlzdC5zZWxlY3RJdGVtKDQpLmVkaXRQcm9qZWN0KCdQcm9qb3RhJyk7XG51aUNvbnRyb2wubG9hZCgpO1xuIiwiaW1wb3J0IHtcbiAgZHVlRGF0ZU1hc2ssXG4gIHNlYXJjaFByb2plY3RzLFxuICBjcmVhdGVFbGVtZW50LFxuICBjcmVhdGVQcmlvcml0eVNlbGVjdCxcbn0gZnJvbSAnLi91aUZ1bmN0aW9ucyc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG5mdW5jdGlvbiB1aUVkaXRJdGVtKCkge1xuICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5tb2RhbC1ib2R5Jyk7XG4gIC8vIGNyZWF0aW5nIGVsZW1lbnRzXG4gIGNvbnN0IHJvdzEgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3JvdyddKTtcbiAgY29uc3QgdGl0bGVEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2lucHV0LWdyb3VwJywgJ21iLTMnLCAnZ2FwLTEnXSk7XG4gIGNvbnN0IHRpdGxlSW5wdXQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIFsnZm9ybS1jb250cm9sJ10sIHtcbiAgICBpZDogJ2l0ZW1UaXRsZScsXG4gICAgdHlwZTogJ3RleHQnLFxuICAgIHBsYWNlaG9sZGVyOiAnTm92YSBUYXJlZmEuLi4nLFxuICB9KTtcbiAgY29uc3Qgcm93MiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnYmctZ3JheScsICdyb3cnLCAnZy0wJywgJ2dhcC0yJywgJ2ZsZXgtbm93cmFwJ10pO1xuXG4gIGNvbnN0IGRhdGVEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2RhdGUnLCAnZmxhdHBpY2tyJywgJ2NvbCddKTtcbiAgY29uc3QgZGF0ZUlucHV0ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2Zvcm0tY29udHJvbCcsICdmbGF0cGlja3ItaW5wdXQnXSwge1xuICAgIGlkOiAnZHVlRGF0ZScsXG4gICAgdHlwZTogJ3RleHQnLFxuICAgIGlucHV0bW9kZTogJ251bWVyaWMnLFxuICAgICdkYXRhLWlucHV0JzogdW5kZWZpbmVkLFxuICAgIGF1dG9jb21wbGV0ZTogJ29mZicsXG4gIH0pO1xuICBjb25zdCBkYXRlcGlja2VyVG9nZ2xlID0gY3JlYXRlRWxlbWVudCgnYScsIFsnaW5wdXQtYnV0dG9uJ10sIHtcbiAgICB0aXRsZTogJ3RvZ2dsZScsXG4gICAgJ2RhdGEtdG9nZ2xlJzogdW5kZWZpbmVkLFxuICB9KTtcbiAgY29uc3QgZGF0ZUljb24gPSBjcmVhdGVFbGVtZW50KCdpJywgWyd0ZXh0LXdhcm5pbmcnLCAnc21hbGwnLCAnYmknLCAnYmktY2FsZW5kYXInXSk7XG5cbiAgY29uc3QgcHJpb3JpdHlEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbCddKTtcbiAgY29uc3Qgc2VsZWN0UHJpb3JpdHkgPSBjcmVhdGVQcmlvcml0eVNlbGVjdCgpO1xuXG4gIGNvbnN0IHByb2plY3REaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbCddKTtcbiAgY29uc3QgcHJvamVjdElucHV0ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2Zvcm0tY29udHJvbCddLCB7XG4gICAgaWQ6ICdlbnRlclByb2plY3QnLFxuICAgIHR5cGU6ICd0ZXh0JyxcbiAgICBsaXN0OiAnZGF0YWxpc3RPcHRpb25zJyxcbiAgICBwbGFjZWhvbGRlcjogJ1Byb2pldG8nLFxuICAgIGF1dG9jb21wbGV0ZTogJ29mZicsXG4gIH0pO1xuICBjb25zdCBwcm9qZWN0RGF0YWxpc3QgPSBjcmVhdGVFbGVtZW50KCdkYXRhbGlzdCcsIFsnc3VnZ2VzdGlvbnMnLCAnZm9ybSddLCB7XG4gICAgaWQ6ICdkYXRhbGlzdE9wdGlvbnMnLFxuICAgIGRyb3B6b25lOiAnc3RyaW5nJyxcbiAgfSk7XG5cbiAgY29uc3Qgcm93MyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncm93JywgJ3B0LTInXSk7XG5cbiAgY29uc3Qgbm90ZXNDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbnRhaW5lciddKTtcbiAgY29uc3Qgbm90ZXNIZWFkZXIgPSBjcmVhdGVFbGVtZW50KCdoNicpO1xuICBjb25zdCBub3Rlc1JvdyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncm93JywgJ2ctMiddKTtcblxuICBjb25zdCBhZGROb3RlUm93ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnLCAncHQtMicsICdqdXN0aWZ5LWNvbnRlbnQtZW5kJ10pO1xuXG4gIGNvbnN0IGFkZE5vdGVEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbC1hdXRvJywgJ3NtYWxsJywgJ3RleHQtZGFuZ2VyJywgJ3RleHQtd2FybmluZy1lbXBoYXNpcyddKTtcbiAgY29uc3QgYWRkTm90ZUxpbmsgPSBjcmVhdGVFbGVtZW50KCdhJywgW10sIHsgaWQ6ICdhZGROb3RlJyB9KTtcbiAgY29uc3QgYWRkTm90ZUljb24gPSBjcmVhdGVFbGVtZW50KCdpJywgWydiaScsICdiaS1wbHVzLWNpcmNsZSddKTtcbiAgY29uc3QgYWRkTm90ZVRleHQgPSBjcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgY29uc3Qgcm93NCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncm93JywgJ2ctMicsICdwdC0zJywgJ2p1c3RpZnktY29udGVudC1zdGFydCcsICdmbGV4LXJvdy1yZXZlcnNlJ10pO1xuXG4gIGNvbnN0IHNhdmVEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbC1hdXRvJ10pO1xuICBjb25zdCBzYXZlQnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgWydidG4nLCAnYnRuLXdhcm5pbmcnLCAndGV4dC1saWdodCddLCB7XG4gICAgJ2RhdGEtYnMtZGlzbWlzcyc6ICdtb2RhbCcsXG4gIH0pO1xuICBjb25zdCBjYW5jZWxEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbC1hdXRvJ10pO1xuICBjb25zdCBjYW5jZWxCdG4gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2J0bicsICdidG4tc2Vjb25kYXJ5JywgJ3RleHQtbGlnaHQnXSwge1xuICAgICdkYXRhLWJzLWRpc21pc3MnOiAnbW9kYWwnLFxuICB9KTtcblxuICAvLyBhcHBlbmQgZWxlbWVudHNcblxuICAvLyByb3cgMSAodGl0bGUpXG4gIHRpdGxlRGl2LmFwcGVuZENoaWxkKHRpdGxlSW5wdXQpO1xuXG4gIHJvdzEuYXBwZW5kQ2hpbGQodGl0bGVEaXYpO1xuXG4gIC8vIHJvdyAyIChkYXRlLCBwcmlvcml0eSwgcHJvamVjdClcblxuICAvLyBkYXRlXG4gIGRhdGVwaWNrZXJUb2dnbGUuYXBwZW5kQ2hpbGQoZGF0ZUljb24pO1xuICBkYXRlRGl2LmFwcGVuZChkYXRlSW5wdXQsIGRhdGVwaWNrZXJUb2dnbGUpO1xuXG4gIC8vIHByaW9yaXR5XG4gIHByaW9yaXR5RGl2LmFwcGVuZENoaWxkKHNlbGVjdFByaW9yaXR5KTtcblxuICAvLyBwcm9qZWN0XG4gIHByb2plY3REaXYuYXBwZW5kKHByb2plY3RJbnB1dCwgcHJvamVjdERhdGFsaXN0KTtcblxuICByb3cyLmFwcGVuZChkYXRlRGl2LCBwcmlvcml0eURpdiwgcHJvamVjdERpdik7XG5cbiAgLy8gcm93MyAobm90ZXMgYXJlYSlcbiAgbm90ZXNIZWFkZXIudGV4dENvbnRlbnQgPSAnTm90YXMnO1xuICBhZGROb3RlVGV4dC50ZXh0Q29udGVudCA9ICdOb3ZhIG5vdGEnO1xuICBhZGROb3RlSWNvbi50ZXh0Q29udGVudCA9ICcgJzsgLy8gZml4aW5nIGEgcHJvYmxlbSBmb3IgdXNpbmcganNcblxuICBhZGROb3RlTGluay5hcHBlbmQoYWRkTm90ZUljb24sIGFkZE5vdGVUZXh0KTtcbiAgYWRkTm90ZURpdi5hcHBlbmRDaGlsZChhZGROb3RlTGluayk7XG4gIGFkZE5vdGVSb3cuYXBwZW5kQ2hpbGQoYWRkTm90ZURpdik7XG4gIG5vdGVzUm93LmFwcGVuZENoaWxkKGFkZE5vdGVSb3cpO1xuICBub3Rlc0NvbnRhaW5lci5hcHBlbmQobm90ZXNIZWFkZXIsIG5vdGVzUm93KTtcblxuICByb3czLmFwcGVuZENoaWxkKG5vdGVzQ29udGFpbmVyKTtcblxuICAvLyByb3c0IChidXR0b25zKVxuICBjYW5jZWxCdG4udGV4dENvbnRlbnQgPSAnQ2FuY2VsJztcbiAgc2F2ZUJ0bi50ZXh0Q29udGVudCA9ICdTYXZlJztcbiAgc2F2ZURpdi5hcHBlbmRDaGlsZChzYXZlQnRuKTtcbiAgY2FuY2VsRGl2LmFwcGVuZENoaWxkKGNhbmNlbEJ0bik7XG5cbiAgcm93NC5hcHBlbmQoc2F2ZURpdiwgY2FuY2VsRGl2KTtcblxuICBtb2RhbC5hcHBlbmQocm93MSwgcm93Miwgcm93Mywgcm93NCk7XG4gIGR1ZURhdGVNYXNrKCk7XG4gIHNlYXJjaFByb2plY3RzKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHVpRWRpdEl0ZW07XG4iLCJpbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcbmltcG9ydCB7IGNsZWFyQ29udGVudCwgc2V0TGluZVRocm91Z2ggfSBmcm9tICcuL3VpRnVuY3Rpb25zJztcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tY3ljbGVcbmltcG9ydCBhZGRMaW5lIGZyb20gJy4vdWlMaXN0R2VuZXJhdG9yJztcblxuZXhwb3J0IGNvbnN0IGxvYWRMaXN0ID0gKCkgPT4gWy4uLnRvZG9MaXN0LmFsbFRhc2tzTGlzdCgpXTtcbmNvbnN0IHNvcnRQYXJhbSA9IChhcnIsIHBhcmFtKSA9PiBbLi4uYXJyXVxuICAuc29ydCgoYSwgYikgPT4gKChhW3BhcmFtXSA8IGJbcGFyYW1dKSA/IC0xIDogMSkpO1xuXG4vLyBVSSBDb250cm9sbGVyXG5leHBvcnQgY29uc3QgdWlDb250cm9sID0gKCgpID0+IHtcbiAgbGV0IGN1cnJlbnRGaWx0ZXIgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIHNldEN1cnJlbnRGaWx0ZXIoa2V5LCB2YWx1ZSkge1xuICAgIGlmIChrZXkpIGN1cnJlbnRGaWx0ZXIgPSB7IGtleSwgdmFsdWUgfTtcbiAgICBlbHNlIGN1cnJlbnRGaWx0ZXIgPSBudWxsO1xuICB9XG5cbiAgY29uc3QgZmlsdGVyQXJyYXkgPSAoYXJyLCBmaWx0ZXIsIHZhbHVlKSA9PiB7XG4gICAgaWYgKGZpbHRlcikgcmV0dXJuIFsuLi5hcnIuZmlsdGVyKChvYmpldG8pID0+IG9iamV0b1tmaWx0ZXJdID09PSB2YWx1ZSldO1xuICAgIHJldHVybiBhcnI7XG4gIH07XG5cbiAgZnVuY3Rpb24gbG9hZCgpIHtcbiAgICBjb25zdCB1aUxpc3QgPSBzb3J0UGFyYW0obG9hZExpc3QoKSwgJ2NoZWNrZWQnKTtcbiAgICBpZiAoY3VycmVudEZpbHRlciAhPT0gbnVsbCkge1xuICAgICAgZmlsdGVyQXJyYXkodWlMaXN0LCBjdXJyZW50RmlsdGVyLmtleSwgY3VycmVudEZpbHRlci52YWx1ZSlcbiAgICAgICAgLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gbG9hZExpc3QoKS5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IG9iai5pZCk7XG4gICAgICAgICAgYWRkTGluZShvYmosIGluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVpTGlzdC5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBsb2FkTGlzdCgpLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gb2JqLmlkKTtcbiAgICAgICAgYWRkTGluZShvYmosIGluZGV4KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZShmaWx0ZXIsIHZhbHVlKSB7XG4gICAgY2xlYXJDb250ZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsaXN0JykpO1xuICAgIGlmIChmaWx0ZXIpIHNldEN1cnJlbnRGaWx0ZXIoZmlsdGVyLCB2YWx1ZSk7XG4gICAgaWYgKGZpbHRlciA9PT0gZmFsc2UpIHNldEN1cnJlbnRGaWx0ZXIoKTtcbiAgICBsb2FkKCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGxvYWQsXG4gICAgdXBkYXRlLFxuICB9O1xufSkoKTtcblxuZnVuY3Rpb24gZmluZFBhcmVudE5vZGUoZWxlbWVudCwgYXR0cmlidXRlTmFtZSkge1xuICBsZXQgeyBwYXJlbnROb2RlIH0gPSBlbGVtZW50O1xuXG4gIHdoaWxlIChwYXJlbnROb2RlKSB7XG4gICAgaWYgKHBhcmVudE5vZGUuaGFzQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpKSB7XG4gICAgICByZXR1cm4gcGFyZW50Tm9kZTtcbiAgICB9XG4gICAgcGFyZW50Tm9kZSA9IHBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgfVxuXG4gIHJldHVybiBudWxsOyAvLyBSZXRvcm5hIG51bGwgc2UgbsOjbyBlbmNvbnRyb3UgbmVuaHVtIG7DsyBwYWkgY29tIG8gYXRyaWJ1dG8gZGVzZWphZG9cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldENoZWNrZWQoZSkge1xuICBjb25zdCB7IHRhcmdldCB9ID0gZTtcbiAgY29uc3QgcG9zID0gZmluZFBhcmVudE5vZGUodGFyZ2V0LCAnZGF0YS1wb3NpdGlvbicpLmdldEF0dHJpYnV0ZSgnZGF0YS1wb3NpdGlvbicpO1xuICB0b2RvTGlzdC5zZWxlY3RJdGVtKHBvcykuZWRpdENoZWNrKCk7XG4gIHNldExpbmVUaHJvdWdoKHRhcmdldCk7XG4gIHVpQ29udHJvbC51cGRhdGUoKTtcbn1cbiIsImltcG9ydCBmbGF0cGlja3IgZnJvbSAnZmxhdHBpY2tyJztcbmltcG9ydCB7IFBvcnR1Z3Vlc2UgfSBmcm9tICdmbGF0cGlja3IvZGlzdC9sMTBuL3B0JztcbmltcG9ydCBJTWFzayBmcm9tICdpbWFzayc7XG5pbXBvcnQgeyBtYXNrRGF0ZSB9IGZyb20gJy4vZGF0ZSc7XG5pbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcblxuZXhwb3J0IGNvbnN0IGlzQ2hlY2tlZCA9IChlKSA9PiBlLmNoZWNrZWQgPT09IHRydWU7XG5cbi8vIHN0YXJ0IG9uTG9hZFxuXG5jb25zdCBzcGVjaWFsQ2hhcnNFbnRyaWVzID0gW1xuICBbJ8OAw4HDgsODw4TDhScsICdBJ10sXG4gIFsnw6DDocOiw6PDpMOlJywgJ2EnXSxcbiAgWyfDiMOJw4rDiycsICdFJ10sXG4gIFsnw6jDqcOqw6snLCAnZSddLFxuICBbJ8OMw43DjsOPJywgJ0knXSxcbiAgWyfDrMOtw67DrycsICdpJ10sXG4gIFsnw5LDk8OVw5TDlicsICdPJ10sXG4gIFsnw7LDs8O1w7TDticsICdvJ10sXG4gIFsnw5nDmsObw5wnLCAnVSddLFxuICBbJ8O5w7rDu8O8JywgJ3UnXSxcbiAgWyfDhycsICdDJ10sXG4gIFsnw6cnLCAnYyddLFxuXTtcblxuY29uc3Qgc3BlY2lhbENoYXJzTWFwID0gT2JqZWN0LmZyb21FbnRyaWVzKFxuICBzcGVjaWFsQ2hhcnNFbnRyaWVzLmZsYXRNYXAoKFtjaGFycywgdmFsdWVdKSA9PiBbLi4uY2hhcnNdLm1hcCgoY2hhcikgPT4gW2NoYXIsIHZhbHVlXSkpLFxuKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldEF0dHJzKGVsZW0sIGF0dHJzKSB7XG4gIE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQgJiYgYXR0cnNba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBlbGVtLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtLnNldEF0dHJpYnV0ZShrZXksICcnKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWcsIGNsYXNzTmFtZXMgPSBbXSwgYXR0cmlidXRlcyA9IHt9KSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gIGlmIChjbGFzc05hbWVzLmxlbmd0aCkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzTmFtZXMpO1xuICBzZXRBdHRycyhlbGVtZW50LCBhdHRyaWJ1dGVzKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPcHRpb24odmFsdWUsIHRleHQsIHNlbGVjdGVkID0gZmFsc2UpIHtcbiAgY29uc3Qgb3B0aW9uID0gY3JlYXRlRWxlbWVudCgnb3B0aW9uJywgW10sIHsgdmFsdWUgfSk7XG4gIG9wdGlvbi50ZXh0Q29udGVudCA9IHRleHQ7XG4gIGlmIChzZWxlY3RlZCkge1xuICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJ3NlbGVjdGVkJyk7XG4gIH1cbiAgcmV0dXJuIG9wdGlvbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyQ29udGVudChlbGVtKSB7XG4gIHdoaWxlIChlbGVtLmZpcnN0Q2hpbGQpIHtcbiAgICBlbGVtLnJlbW92ZUNoaWxkKGVsZW0ubGFzdENoaWxkKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJpb3JpdHlTZWxlY3QoKSB7XG4gIGNvbnN0IHNlbGVjdCA9IGNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcsIFsnZm9ybS1zZWxlY3QnXSwge1xuICAgICdhcmlhLWxhYmVsJzogJ1ByaW9yaWRhZGUnLFxuICB9KTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpICs9IDEpIHtcbiAgICBjb25zdCB0ZXh0ID0gaSA9PT0gMCA/ICdQcmlvcmlkYWRlJyA6IGBQcmlvcmlkYWRlICR7aX1gO1xuICAgIGNvbnN0IHNlbGVjdGVkID0gaSA9PT0gMDtcbiAgICBjb25zdCBvcHRpb24gPSBjcmVhdGVPcHRpb24oaSwgdGV4dCwgc2VsZWN0ZWQpO1xuICAgIHNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICB9XG4gIHJldHVybiBzZWxlY3Q7XG59XG5cbi8vIEFERC9FRElUIE5FVyBUQVNLIFNDUkVFTiBGVU5DVElPTlNcblxuZnVuY3Rpb24gcmVtb3ZlU3BlY2lhbHModGV4dCkge1xuICBsZXQgc2VhcmNoID0gdGV4dDtcbiAgc2VhcmNoID0gc2VhcmNoLnJlcGxhY2UoXG4gICAgL1vDgC3DnMOgLcO8XS9nLFxuICAgIChtYXRjaCkgPT4gc3BlY2lhbENoYXJzTWFwW21hdGNoXSB8fCBtYXRjaCxcbiAgKTtcbiAgcmV0dXJuIHNlYXJjaDtcbn1cbi8vIHByb2plY3RzIGRhdGFsaXN0IGF1dG9jb21wbGV0ZVxuZnVuY3Rpb24gYXV0b0NvbXBsZXRlKHNlYXJjaCkge1xuICBjb25zdCBwcm9qZWN0cyA9IHRvZG9MaXN0LmdldFByb2plY3RzKCk7XG4gIHJldHVybiBwcm9qZWN0cy5maWx0ZXIoKHZhbHVlKSA9PiB7XG4gICAgY29uc3QgdmFsdWVMb3dlcmNhc2UgPSByZW1vdmVTcGVjaWFscyh2YWx1ZS50b0xvd2VyQ2FzZSgpKTtcbiAgICBjb25zdCBzZWFyY2hMb3dlcmNhc2UgPSByZW1vdmVTcGVjaWFscyhzZWFyY2gudG9Mb3dlckNhc2UoKSk7XG4gICAgcmV0dXJuIHZhbHVlTG93ZXJjYXNlLmluY2x1ZGVzKHNlYXJjaExvd2VyY2FzZSk7XG4gIH0pO1xufVxuXG4vLyBjYWxsaW5nIGZ1bmN0aW9ucyB0byBhdXRvY29tcGxldGUgUHJvamVjdCBmaWVsZFxuXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoUHJvamVjdHMoKSB7XG4gIGNvbnN0IGlucHV0UHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbnRlclByb2plY3QnKTtcbiAgY29uc3QgZGF0YWxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkYXRhbGlzdCcpO1xuICBpbnB1dFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoeyB0YXJnZXQgfSkgPT4ge1xuICAgIGNvbnN0IGlucHV0RGF0YSA9IHRhcmdldC52YWx1ZTtcbiAgICBpZiAoaW5wdXREYXRhLmxlbmd0aCkge1xuICAgICAgY29uc3QgYXV0b0NvbXBsZXRlT3B0aW9ucyA9IGF1dG9Db21wbGV0ZShpbnB1dERhdGEpO1xuICAgICAgZGF0YWxpc3QuaW5uZXJIVE1MID0gYCR7YXV0b0NvbXBsZXRlT3B0aW9uc1xuICAgICAgICAubWFwKCh2YWx1ZSkgPT4gYDxvcHRpb24gdmFsdWU9XCIke3ZhbHVlfVwiIC8+YClcbiAgICAgICAgLmpvaW4oJycpfWA7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gREFURVBJQ0tFUiBBTkQgTUFTSyBGVU5DVElPTlNcblxuZXhwb3J0IGZ1bmN0aW9uIGR1ZURhdGVNYXNrKCkge1xuICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2R1ZURhdGUnKTtcbiAgY29uc3QgZmxhdEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuZmxhdHBpY2tyJyk7XG5cbiAgLy8gYXBwbHkgbWFzayB0byBkdWVEYXRlRmllbGRcbiAgY29uc3QgbWFzayA9IElNYXNrKGR1ZURhdGUsIG1hc2tEYXRlKTtcblxuICAvLyBhcHBseSBmbGF0cGlja3IgZGF0ZXBpY2tlciB0byBhbGwgZWxlbWVudHMgaW4gYSBkaXZcbiAgLy8gKGljb24gdG9nZ2xlIGFuZCBpbnB1dCBkYXRlIHVzaW5nIGRhdGEtIGF0dHJpYnV0ZXMpXG4gIGZsYXRwaWNrcihmbGF0RWxlbSwge1xuICAgIGRhdGVGb3JtYXQ6ICdkL20vWScsXG4gICAgZGlzYWJsZU1vYmlsZTogJ3RydWUnLFxuICAgIGFsbG93SW5wdXQ6IHRydWUsXG4gICAgd3JhcDogdHJ1ZSxcbiAgICBsb2NhbGU6IFBvcnR1Z3Vlc2UsXG4gICAgb25DaGFuZ2Uoc2VsZWN0ZWREYXRlcywgZGF0ZVN0cikge1xuICAgICAgbWFzay51cGRhdGVWYWx1ZShkYXRlU3RyKTtcbiAgICB9LFxuICB9KTtcbn1cblxuLy8gbWFpbiBzY3JlZW4gaW50ZXJhY3Rpb25zXG4vLyBjaGVjayB2aXN1YWwgZWZmZWN0XG5leHBvcnQgZnVuY3Rpb24gc2V0TGluZVRocm91Z2goZSkge1xuICBjb25zdCB0ZXh0ID0gZS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gIGlmIChpc0NoZWNrZWQoZSkpIHtcbiAgICB0ZXh0LmNsYXNzTGlzdC5hZGQoJ3RleHQtZGVjb3JhdGlvbi1saW5lLXRocm91Z2gnKTtcbiAgfSBlbHNlIHtcbiAgICB0ZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ3RleHQtZGVjb3JhdGlvbi1saW5lLXRocm91Z2gnKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgYWRkRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCNpdGVtVGl0bGUnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dQbHVzQnRuKCkge1xuICAvLyBFbmNvbnRyYSBvIGJvdMOjbyArXG4gIGNvbnN0IHBsdXNCdG4gPSBhZGRGaWVsZC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gIGNvbnN0IHNhdmVCdG4gPSBwbHVzQnRuLm5leHRFbGVtZW50U2libGluZztcbiAgLy8gU2UgbyB2YWxvciBkbyBjYW1wbyB0w610dWxvIGZvciBkaWZlcmVudGUgZGUgdmF6aW8sXG4gIC8vIGVudMOjbyBlbGUgcmV2ZWxhIG8gYm90w6NvICtcbiAgaWYgKGFkZEZpZWxkLnZhbHVlICE9PSAnJykge1xuICAgIHBsdXNCdG4uY2xhc3NMaXN0LmFkZCgncmV2ZWFsSXRlbScpO1xuICAgIHNhdmVCdG4uY2xhc3NMaXN0LmFkZCgncmV2ZWFsSXRlbScpO1xuICB9XG4gIC8vIGNhc28gY29udHLDoXJpbywgc2Ugdm9jw6ogYXBhZ2FyIHRvZG8gbyB0w610dWxvXG4gIC8vIGVsZSBkw6EgZGlzcGxheTogbm9uZSwgbm8gYm90w6NvICtcbiAgaWYgKGFkZEZpZWxkLnZhbHVlID09PSAnJyAmJiBwbHVzQnRuLmNsYXNzTGlzdC5jb250YWlucygncmV2ZWFsSXRlbScpKSB7XG4gICAgcGx1c0J0bi5jbGFzc0xpc3QucmVtb3ZlKCdyZXZlYWxJdGVtJyk7XG4gICAgc2F2ZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdyZXZlYWxJdGVtJyk7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG5pbXBvcnQgeyBwb3B1bGF0ZVN0b3JhZ2UgfSBmcm9tICcuL0pTT05GdW5jdGlvbnMnO1xuaW1wb3J0IHsgaXNDaGVja2VkLCBjcmVhdGVFbGVtZW50IH0gZnJvbSAnLi91aUZ1bmN0aW9ucyc7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLWN5Y2xlXG5pbXBvcnQgeyBzZXRDaGVja2VkIH0gZnJvbSAnLi91aUNvbnRyb2xzJztcblxuY29uc3QgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNsaXN0Jyk7XG5jb25zdCBoYXNOb3RlcyA9IChvYmopID0+IG9iai5sZW5ndGggPiAwO1xuXG5mdW5jdGlvbiBhZGRDaGVja2VkKGNoZWNrYm94LCBidXR0b24pIHtcbiAgY2hlY2tib3guY2hlY2tlZCA9IHRydWU7XG4gIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCd0ZXh0LWRlY29yYXRpb24tbGluZS10aHJvdWdoJyk7XG59XG5cbmZ1bmN0aW9uIGluc2VydE5vdGUobm90ZXMsIGJvZHkpIHtcbiAgbm90ZXMuZm9yRWFjaCgoY29udGVudCkgPT4ge1xuICAgIGNvbnN0IGNvbnRlbnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250ZW50RGl2LmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgYm9keS5hcHBlbmRDaGlsZChjb250ZW50RGl2KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZExpbmUob2JqLCBudW0pIHtcbiAgLy8gTElTVCBJVEVNIC0tLS0tLVxuXG4gIC8vIGhlYWRlclxuICBjb25zdCBpdGVtID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydhY2NvcmRpb24taXRlbSddLCB7XG4gICAgJ2RhdGEtcG9zaXRpb24nOiBgJHtudW19YCxcbiAgfSk7XG4gIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoJ2gyJywgWydhY2NvcmRpb24taGVhZGVyJywgJ3AtMScsICdkLWZsZXgnLCAnYWxpZ24taXRlbXMtY2VudGVyJywgJ2dhcC0xJ10pO1xuICBjb25zdCBjaGVja2JveCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgWydmb3JtLWNoZWNrLWlucHV0JywgJ3RleHQtYmctd2FybmluZyddLCB7IHR5cGU6ICdjaGVja2JveCcgfSk7XG4gIGNvbnN0IGJ0bkhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIFsnYWNjb3JkaW9uLWJ1dHRvbicsICdjb2xsYXBzZWQnLCAnZmxleC1maWxsJ10sIHtcbiAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAnZGF0YS1icy10b2dnbGUnOiAnY29sbGFwc2UnLFxuICAgICdhcmlhLWV4cGFuZGVkJzogJ2ZhbHNlJyxcbiAgICAnZGF0YS1icy10YXJnZXQnOiBgI2l0ZW0tJHtudW19YCxcbiAgfSk7XG4gIGNvbnN0IHNwYW4gPSBjcmVhdGVFbGVtZW50KCdzcGFuJywgWydmbGV4LWZpbGwnXSk7XG4gIGNvbnN0IGNvZGUgPSBjcmVhdGVFbGVtZW50KCdjb2RlJywgWydzbWFsbCcsICd0ZXh0LW11dGVkJ10pO1xuXG4gIC8vIGJvZHlcbiAgY29uc3QgaXRlbURldGFpbHMgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2FjY29yZGlvbi1jb2xsYXBzZScsICdjb2xsYXBzZSddLCB7XG4gICAgaWQ6IGBpdGVtLSR7bnVtfWAsXG4gIH0pO1xuICBjb25zdCBpdGVtQm9keSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnYWNjb3JkaW9uLWJvZHknXSk7XG5cbiAgY29uc3QgYnRuRWRpdCA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIFsnYnRuJywgJ2J0bi13YXJuaW5nJ10pO1xuICBjb25zdCBidG5EZWxldGUgPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2J0bicsICdidG4tZGFuZ2VyJ10pO1xuXG4gIC8vIEVWRU5UTElTVE5FUlMgT0JKRUNUU1xuICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBzZXRDaGVja2VkKTtcbiAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgcG9wdWxhdGVTdG9yYWdlKTtcblxuICAvLyBGSUxMSU5HIENPTlRFTlRcbiAgLy8gaGVhZGVyXG4gIHNwYW4udGV4dENvbnRlbnQgPSBvYmoudGl0bGU7XG4gIGNvZGUudGV4dENvbnRlbnQgPSBvYmoucHJvamVjdDtcblxuICAvLyBib2R5XG4gIGJ0bkVkaXQudGV4dENvbnRlbnQgPSAnRWRpdCc7XG4gIGJ0bkRlbGV0ZS50ZXh0Q29udGVudCA9ICdEZWxldGUnO1xuXG4gIC8vIEFwcGVuZGluZyBjb250ZW50XG4gIGJ0bkhlYWRlci5hcHBlbmQoc3BhbiwgY29kZSk7XG4gIGhlYWRlci5hcHBlbmQoY2hlY2tib3gsIGJ0bkhlYWRlcik7XG5cbiAgLy8gQm9keSBjb250ZW50XG4gIGlmIChoYXNOb3RlcyhvYmoubm90ZXMpKSB7XG4gICAgaW5zZXJ0Tm90ZShvYmoubm90ZXMsIGl0ZW1Cb2R5KTtcbiAgfVxuICBpdGVtRGV0YWlscy5hcHBlbmRDaGlsZChpdGVtQm9keSk7XG5cbiAgLy8gQXBwZW5kIGVsZW1lbnRzIHRvIGxpc3RcbiAgaXRlbS5hcHBlbmQoaGVhZGVyLCBpdGVtRGV0YWlscyk7XG4gIGxpc3QuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gIGlmIChpc0NoZWNrZWQob2JqKSkgYWRkQ2hlY2tlZChjaGVja2JveCwgYnRuSGVhZGVyKTtcbn1cbmV4cG9ydCBkZWZhdWx0IGFkZExpbmU7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rdG9kb19saXN0XCJdID0gc2VsZltcIndlYnBhY2tDaHVua3RvZG9fbGlzdFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiM3JkcGFydFwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oNzI3MykpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==