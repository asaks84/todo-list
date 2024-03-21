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







function editMore(title) {
  (0,_uiAddItemConstructor__WEBPACK_IMPORTED_MODULE_3__["default"])(title);
  title.value = '';
}
function fastSave(title) {
  _core__WEBPACK_IMPORTED_MODULE_1__["default"].addItem(title.value);
  _uiControls__WEBPACK_IMPORTED_MODULE_4__["default"].update();
}

_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.addTask.addEventListener('click', _uiAddItemConstructor__WEBPACK_IMPORTED_MODULE_3__["default"]);

// adiciona evento pra quando se começa a digitar
// e quando se para de digitar o título do item.
_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.addField.addEventListener('keydown', _uiFunctions__WEBPACK_IMPORTED_MODULE_5__.showPlusBtn);
_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.addField.addEventListener('keyup', _uiFunctions__WEBPACK_IMPORTED_MODULE_5__.showPlusBtn);
_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.addMore.addEventListener('click', () => editMore(_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.input));
_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.quickSave.addEventListener('click', () => fastSave(_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.input));

_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.input.addEventListener('change', _JSONFunctions__WEBPACK_IMPORTED_MODULE_2__.populateStorage);
_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.input.setAttribute('autocomplete', 'off');
// input.addEventListener('change', populateStorage);
// input.setAttribute('autocomplete', 'off');
window.onload = (0,_JSONFunctions__WEBPACK_IMPORTED_MODULE_2__.restoreStorage)();

const mainModal = document.querySelector('div#exampleModal');
mainModal.addEventListener('hidden.bs.modal', () => {
  const modalBody = mainModal.querySelector('.modal-body');
  (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.clearContent)(modalBody);
});

_uiControls__WEBPACK_IMPORTED_MODULE_4__["default"].load();


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
/* harmony import */ var _JSONFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JSONFunctions */ 2875);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core */ 3317);
/* harmony import */ var _uiControls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uiControls */ 6042);
/* harmony import */ var _uiFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./uiFunctions */ 1363);





function save(title, dueDate, priority, project) {
  _core__WEBPACK_IMPORTED_MODULE_1__["default"].addItem(title.value, dueDate.value, priority.value, project.value);
  _uiControls__WEBPACK_IMPORTED_MODULE_2__["default"].update();
  (0,_JSONFunctions__WEBPACK_IMPORTED_MODULE_0__.populateStorage)();
}
function uiEditItem(title, dueDate, priority, project) {
  const modal = document.querySelector('div.modal-body');
  // creating elements
  const row1 = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createElement)('div', ['row']);
  const titleDiv = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createElement)('div', ['input-group', 'mb-3', 'gap-1']);
  const titleInput = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createElement)('input', ['form-control'], {
    id: 'itemTitle',
    type: 'text',
    placeholder: 'Nova Tarefa...',
  });
  const row2 = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createElement)('div', ['bg-gray', 'row', 'g-0', 'gap-2', 'flex-nowrap']);

  const dateDiv = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createElement)('div', ['date', 'flatpickr', 'col']);
  const dateInput = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createElement)('input', ['form-control', 'flatpickr-input'], {
    id: 'dueDate',
    type: 'text',
    inputmode: 'numeric',
    'data-input': undefined,
    autocomplete: 'off',
  });
  const datepickerToggle = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createElement)('a', ['input-button'], {
    title: 'toggle',
    'data-toggle': undefined,
  });
  const dateIcon = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createElement)('i', ['text-warning', 'small', 'bi', 'bi-calendar']);

  const priorityDiv = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createElement)('div', ['col']);
  const selectPriority = (typeof priority !== 'undefined')
    ? (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createPrioritySelect)(priority)
    : (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createPrioritySelect)();

  const projectDiv = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createElement)('div', ['col']);
  const projectInput = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createElement)('input', ['form-control'], {
    id: 'enterProject',
    type: 'text',
    list: 'datalistOptions',
    placeholder: 'Projeto',
    autocomplete: 'off',
  });
  const projectDatalist = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createElement)('datalist', ['suggestions', 'form'], {
    id: 'datalistOptions',
    dropzone: 'string',
  });

  const row3 = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createElement)('div', ['row', 'pt-2']);

  const notesContainer = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createElement)('div', ['container']);
  const notesHeader = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createElement)('h6');
  const notesRow = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createElement)('div', ['row', 'g-2']);

  const addNoteRow = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createElement)('div', ['row', 'pt-2', 'justify-content-end']);

  const addNoteDiv = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createElement)('div', ['col-auto', 'small', 'text-danger', 'text-warning-emphasis']);
  const addNoteLink = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createElement)('a', [], { id: 'addNote' });
  const addNoteIcon = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createElement)('i', ['bi', 'bi-plus-circle']);
  const addNoteText = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createElement)('span');

  const row4 = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createElement)('div', ['row', 'g-2', 'pt-3', 'justify-content-start', 'flex-row-reverse']);

  const saveDiv = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createElement)('div', ['col-auto']);
  const saveBtn = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createElement)('button', ['btn', 'btn-warning', 'text-light'], {
    'data-bs-dismiss': 'modal',
  });
  const cancelDiv = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createElement)('div', ['col-auto']);
  const cancelBtn = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.createElement)('button', ['btn', 'btn-secondary', 'text-light'], {
    'data-bs-dismiss': 'modal',
  });

  // append elements

  // row 1 (title)
  if (typeof title.value !== 'undefined') titleInput.value = title.value;
  titleDiv.appendChild(titleInput);

  row1.appendChild(titleDiv);

  // row 2 (date, priority, project)

  // date
  if (typeof dueDate !== 'undefined' && dueDate !== 0) dateInput.value = dueDate;
  datepickerToggle.appendChild(dateIcon);
  dateDiv.append(dateInput, datepickerToggle);

  // priority
  priorityDiv.appendChild(selectPriority);

  // project
  if (typeof project !== 'undefined' && project !== 0) dateInput.value = project;
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
  saveBtn.addEventListener('click', () => save(titleInput, dateInput, projectInput, projectInput));
  saveDiv.appendChild(saveBtn);
  cancelDiv.appendChild(cancelBtn);

  row4.append(saveDiv, cancelDiv);

  modal.append(row1, row2, row3, row4);
  (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.dueDateMask)();
  (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_3__.searchProjects)();
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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ 3317);
/* harmony import */ var _uiFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uiFunctions */ 1363);
/* harmony import */ var _uiListGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uiListGenerator */ 179);




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
    console.log(loadList());
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (uiControl);


/***/ }),

/***/ 1363:
/*!***********************************!*\
  !*** ./src/assets/uiFunctions.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addField: () => (/* binding */ addField),
/* harmony export */   addMore: () => (/* binding */ addMore),
/* harmony export */   addTask: () => (/* binding */ addTask),
/* harmony export */   clearContent: () => (/* binding */ clearContent),
/* harmony export */   createElement: () => (/* binding */ createElement),
/* harmony export */   createOption: () => (/* binding */ createOption),
/* harmony export */   createPrioritySelect: () => (/* binding */ createPrioritySelect),
/* harmony export */   dueDateMask: () => (/* binding */ dueDateMask),
/* harmony export */   findParentNode: () => (/* binding */ findParentNode),
/* harmony export */   input: () => (/* binding */ input),
/* harmony export */   isChecked: () => (/* binding */ isChecked),
/* harmony export */   quickSave: () => (/* binding */ quickSave),
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

function createPrioritySelect(num = 0) {
  const select = createElement('select', ['form-select'], {
    'aria-label': 'Prioridade',
  });
  for (let i = 0; i < 4; i += 1) {
    const text = i === 0 ? 'Prioridade' : `Prioridade ${i}`;
    const selected = i === num;
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
const input = document.querySelector('input');
const addTask = document.querySelector('a#addItem');
const addMore = document.querySelector('button#addMore');
const quickSave = document.querySelector('button#saveItem');

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

/***/ 179:
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
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core */ 3317);
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

function setCheckedHandler(e) {
  const { target } = e;
  const pos = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_1__.findParentNode)(target, 'data-position').getAttribute('data-position');
  _core__WEBPACK_IMPORTED_MODULE_3__["default"].selectItem(pos).editCheck();
  (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_1__.setLineThrough)(target);
  _uiControls__WEBPACK_IMPORTED_MODULE_2__["default"].update();
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
  checkbox.addEventListener('change', setCheckedHandler);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9zdHlsZS5zY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvSlNPTkZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL2NvcmUuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9kYXRlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvc2NyaXB0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvdWlBZGRJdGVtQ29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy91aUNvbnRyb2xzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvdWlGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy91aUxpc3RHZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHRvZG9MaXN0IGZyb20gJy4vY29yZSc7XG4vLyBpbXBvcnQgYWRkTGluZSBmcm9tICcuL3VpTGlzdEdlbmVyYXRvcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBwb3B1bGF0ZVN0b3JhZ2UoKSB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXRhJywgdG9kb0xpc3QudG9KU09OKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzdG9yZVN0b3JhZ2UoKSB7XG4gIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGF0YScpID09PSBudWxsKSByZXR1cm47XG4gIHRvZG9MaXN0LnJlc3RvcmUobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhdGEnKSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25uZWN0KCkge1xuICBjb25zdCByZXF1ZXN0VVJMID0gJy4vYXNzZXRzL2RhdGEuanNvbic7XG4gIGNvbnN0IHJlcXVlc3QgPSBhd2FpdCBmZXRjaChyZXF1ZXN0VVJMKTtcbiAgaWYgKCFyZXF1ZXN0Lm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBIVFRQIGVycm9yISBTdGF0dXM6ICR7cmVxdWVzdC5zdGF0dXN9YCk7XG4gIH1cblxuICByZXR1cm4gcmVxdWVzdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBvcHVsYXRlKCkge1xuICBjb25zdCB2YWx1ZSA9IGF3YWl0IGNvbm5lY3QoKTtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGVzdCgpIHtcbiAgdG9kb0xpc3QucmVzdG9yZShwb3B1bGF0ZSgpKTtcbn1cbiIsImZ1bmN0aW9uIENyZWF0ZUl0ZW0obnVtLCB0ZXh0LCBkZWFkbGluZSA9IDAsIHByb2plY3QgPSBudWxsLCBwcmlvcml0eU51bSA9IDAsIGNoZWNrID0gZmFsc2UpIHtcbiAgbGV0IHRpdGxlID0gdGV4dDtcbiAgbGV0IGR1ZURhdGUgPSBkZWFkbGluZTtcbiAgbGV0IHByb2plY3ROYW1lID0gcHJvamVjdDtcbiAgbGV0IHByaW9yaXR5ID0gcHJpb3JpdHlOdW07XG4gIGxldCBjaGVja2VkID0gY2hlY2s7XG4gIGNvbnN0IGlkID0gbnVtO1xuICBjb25zdCBub3RlcyA9IFtdO1xuXG4gIGZ1bmN0aW9uIGVkaXRUaXRsZSh2YWwpIHsgdGl0bGUgPSB2YWw7IH1cbiAgY29uc3QgZ2V0VGl0bGUgPSAoKSA9PiB0aXRsZTtcbiAgZnVuY3Rpb24gZWRpdFByaW9yaXR5KHZhbCkgeyBwcmlvcml0eSA9IHZhbDsgfVxuICBjb25zdCBnZXRQcmlvcml0eSA9ICgpID0+IHByaW9yaXR5O1xuICBmdW5jdGlvbiBkZWxldGVEdW9EYXRlKCkgeyBkdWVEYXRlID0gMDsgfVxuICBmdW5jdGlvbiBlZGl0RHVlRGF0ZSh2YWwpIHsgZHVlRGF0ZSA9IHZhbDsgfVxuICBjb25zdCBnZXREdWVEYXRlID0gKCkgPT4gZHVlRGF0ZTtcbiAgZnVuY3Rpb24gZWRpdFByb2plY3QodmFsKSB7IHByb2plY3ROYW1lID0gdmFsOyB9XG4gIGNvbnN0IGdldFByb2plY3QgPSAoKSA9PiBwcm9qZWN0TmFtZTtcbiAgZnVuY3Rpb24gZWRpdENoZWNrKCkgeyBjaGVja2VkID0gIWNoZWNrZWQ7IH1cbiAgY29uc3QgZ2V0Q2hlY2sgPSAoKSA9PiBjaGVja2VkO1xuICBmdW5jdGlvbiBhZGROb3RlKHZhbCkgeyBub3Rlcy5wdXNoKHZhbCk7IH1cbiAgZnVuY3Rpb24gZGVsZXRlTm90ZShwb3MpIHsgbm90ZXMuc3BsaWNlKHBvcywgMSk7IH1cbiAgZnVuY3Rpb24gZWRpdE5vdGUocG9zLCB2YWwpIHsgbm90ZXNbcG9zXSA9IHZhbDsgfVxuICBjb25zdCBnZXRBbGxOb3RlcyA9ICgpID0+IG5vdGVzO1xuICBjb25zdCBnZXROb3RlID0gKHBvcykgPT4gbm90ZXNbcG9zXTtcbiAgY29uc3QgZ2V0SWQgPSAoKSA9PiBpZDtcblxuICByZXR1cm4ge1xuICAgIGFkZE5vdGUsXG4gICAgZWRpdE5vdGUsXG4gICAgZ2V0Tm90ZSxcbiAgICBkZWxldGVOb3RlLFxuICAgIGdldEFsbE5vdGVzLFxuXG4gICAgZWRpdFRpdGxlLFxuICAgIGdldFRpdGxlLFxuXG4gICAgZWRpdER1ZURhdGUsXG4gICAgZGVsZXRlRHVvRGF0ZSxcbiAgICBnZXREdWVEYXRlLFxuXG4gICAgZWRpdFByb2plY3QsXG4gICAgZ2V0UHJvamVjdCxcblxuICAgIGVkaXRQcmlvcml0eSxcbiAgICBnZXRQcmlvcml0eSxcblxuICAgIGVkaXRDaGVjayxcbiAgICBnZXRDaGVjayxcblxuICAgIGdldElkLFxuICB9O1xufVxuXG5jb25zdCB0b2RvTGlzdCA9ICgoKSA9PiB7XG4gIGNvbnN0IGxpc3QgPSBbXTtcblxuICBmdW5jdGlvbiByZXR1cm5PYmooaXRlbSkge1xuICAgIGNvbnN0IGlkID0gaXRlbS5nZXRJZCgpO1xuICAgIGNvbnN0IHRpdGxlID0gaXRlbS5nZXRUaXRsZSgpO1xuICAgIGNvbnN0IHByb2plY3QgPSBpdGVtLmdldFByb2plY3QoKTtcbiAgICBjb25zdCBkdWVEYXRlID0gaXRlbS5nZXREdWVEYXRlKCk7XG4gICAgY29uc3QgcHJpb3JpdHkgPSBpdGVtLmdldFByaW9yaXR5KCk7XG4gICAgY29uc3QgY2hlY2tlZCA9IGl0ZW0uZ2V0Q2hlY2soKTtcbiAgICBjb25zdCBub3RlcyA9IGl0ZW0uZ2V0QWxsTm90ZXMoKTtcblxuICAgIHJldHVybiB7XG4gICAgICBpZCwgdGl0bGUsIHByb2plY3QsIGR1ZURhdGUsIHByaW9yaXR5LCBjaGVja2VkLCBub3RlcyxcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGlzdC5sZW5ndGg7XG4gIGNvbnN0IHNlbGVjdEl0ZW0gPSAocG9zKSA9PiBsaXN0W3Bvc107XG4gIGZ1bmN0aW9uIHNldENoZWNrZWQocG9zKSB7IGxpc3RbcG9zXS5lZGl0Q2hlY2soKTsgfVxuICBjb25zdCBhbGxUYXNrc0xpc3QgPSAoKSA9PiBsaXN0Lm1hcCgob2JqKSA9PiAocmV0dXJuT2JqKG9iaikpKTtcbiAgZnVuY3Rpb24gcmVzZXQoKSB7IGxpc3QubGVuZ3RoID0gMDsgfVxuXG4gIGNvbnN0IGdldFByb2plY3RzID0gKCkgPT4gbGlzdC5tYXAoKGl0ZW0pID0+IGl0ZW0uZ2V0UHJvamVjdCgpKVxuICAgIC5maWx0ZXIoKHZhbHVlLCBwb3MsIHNlbGYpID0+IHZhbHVlICE9PSBudWxsICYmIHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IHBvcyk7XG5cbiAgZnVuY3Rpb24gYWRkSXRlbSh0ZXh0LCBkZWFkbGluZSwgcHJvamVjdCwgcHJpb3JpdHksIGNoZWNrZWQpIHtcbiAgICBjb25zdCBpZCA9IGxpc3QubGVuZ3RoO1xuICAgIGNvbnN0IG5ld0l0ZW0gPSBDcmVhdGVJdGVtKGlkLCB0ZXh0LCBkZWFkbGluZSwgcHJvamVjdCwgcHJpb3JpdHksIGNoZWNrZWQpO1xuICAgIGxpc3QucHVzaChuZXdJdGVtKTtcbiAgfVxuXG4gIGNvbnN0IHRvSlNPTiA9ICgpID0+IHtcbiAgICBjb25zdCBsaXN0RGF0YSA9IGxpc3QubWFwKChpdGVtKSA9PiAoe1xuICAgICAgaWQ6IGl0ZW0uZ2V0SWQoKSxcbiAgICAgIHRpdGxlOiBpdGVtLmdldFRpdGxlKCksXG4gICAgICBwcm9qZWN0OiBpdGVtLmdldFByb2plY3QoKSxcbiAgICAgIGR1ZURhdGU6IGl0ZW0uZ2V0RHVlRGF0ZSgpLFxuICAgICAgcHJpb3JpdHk6IGl0ZW0uZ2V0UHJpb3JpdHkoKSxcbiAgICAgIGNoZWNrZWQ6IGl0ZW0uZ2V0Q2hlY2soKSxcbiAgICAgIG5vdGVzOiBpdGVtLmdldEFsbE5vdGVzKCksXG4gICAgfSkpO1xuXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHsgbGlzdDogbGlzdERhdGEgfSwgJycsIDEpO1xuICB9O1xuXG4gIGNvbnN0IHJlc3RvcmUgPSAoZGF0YSkgPT4ge1xuICAgIHJlc2V0KCk7XG4gICAgY29uc3QgeyBsaXN0OiBsaXN0RGF0YSB9ID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICBsaXN0RGF0YS5mb3JFYWNoKFxuICAgICAgKHtcbiAgICAgICAgaWQsIHRpdGxlLCBwcm9qZWN0LCBkdWVEYXRlLCBwcmlvcml0eSwgY2hlY2tlZCwgbm90ZXMsXG4gICAgICB9KSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0l0ZW0gPSBDcmVhdGVJdGVtKGlkLCB0aXRsZSwgZHVlRGF0ZSwgcHJvamVjdCwgcHJpb3JpdHksIGNoZWNrZWQpO1xuICAgICAgICBub3Rlcy5mb3JFYWNoKChub3RlKSA9PiBuZXdJdGVtLmFkZE5vdGUobm90ZSkpO1xuICAgICAgICBsaXN0LnB1c2gobmV3SXRlbSk7XG4gICAgICB9LFxuICAgICk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRMZW5ndGgsXG4gICAgc2VsZWN0SXRlbSxcbiAgICBhZGRJdGVtLFxuICAgIHJlc3RvcmUsXG4gICAgdG9KU09OLFxuICAgIHNldENoZWNrZWQsXG4gICAgZ2V0UHJvamVjdHMsXG4gICAgcmVzZXQsXG4gICAgcmV0dXJuT2JqLFxuICAgIGFsbFRhc2tzTGlzdCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHRvZG9MaXN0O1xuXG4vKlxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyMjIyMjIyMjIyMjIyMjIyAgICAgICAgICAgIyMjIyMjIyMjIyMjIyMjI1xuIyMjIyMjIyMjIyMjIyMjIyBURVNUIEFSRUEgIyMjIyMjIyMjIyMjIyMjI1xuIyMjIyMjIyMjIyMjIyMjIyAgICAgICAgICAgIyMjIyMjIyMjIyMjIyMjI1xuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuKi9cbiIsIi8vIGltcG9ydCB7IHB0QlIgfSBmcm9tICdkYXRlLWZucy9sb2NhbGUnO1xuaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IElNYXNrIGZyb20gJ2ltYXNrJztcblxuY29uc3Qgc3BsaXRUb0NvZGUgPSAoZGF0ZSkgPT4gZGF0ZS5zcGxpdCgnLycpLnJldmVyc2UoKS5qb2luKCcvJykucmVwbGFjZUFsbCgnLycsICcsICcpO1xuZXhwb3J0IGNvbnN0IHRvSW5wdXQgPSAoZGF0YSkgPT4gZm9ybWF0KG5ldyBEYXRlKHNwbGl0VG9Db2RlKGRhdGEpKSwgJ2RkL0xML3l5eXknKTtcbi8vIGNvbnN0IGdldERhdGEgPSAoYXJyKSA9PiBhcnIuZm9yRWFjaChlbGVtZW50ID0+IHtcblxuLy8gfSk7XG5cbmV4cG9ydCBjb25zdCBtYXNrRGF0ZSA9IHtcbiAgbWFzazogJ2QvYG0vYFknLFxuICBibG9ja3M6IHtcbiAgICBkOiB7XG4gICAgICBtYXNrOiBJTWFzay5NYXNrZWRSYW5nZSxcbiAgICAgIHBsYWNlaG9sZGVyQ2hhcjogJ2QnLFxuICAgICAgZnJvbTogMSxcbiAgICAgIHRvOiAzMSxcbiAgICAgIG1heExlbmd0aDogMixcbiAgICB9LFxuICAgIG06IHtcbiAgICAgIG1hc2s6IElNYXNrLk1hc2tlZFJhbmdlLFxuICAgICAgcGxhY2Vob2xkZXJDaGFyOiAnbScsXG4gICAgICBmcm9tOiAxLFxuICAgICAgdG86IDEyLFxuICAgICAgbWF4TGVuZ3RoOiAyLFxuICAgIH0sXG4gICAgWToge1xuICAgICAgbWFzazogSU1hc2suTWFza2VkUmFuZ2UsXG4gICAgICBwbGFjZWhvbGRlckNoYXI6ICdhJyxcbiAgICAgIGZyb206IDEwMDAsXG4gICAgICB0bzogOTk5OSxcbiAgICB9LFxuICB9LFxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQgJy4vc3R5bGUuc2Nzcyc7XG5pbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcbmltcG9ydCB7IHBvcHVsYXRlU3RvcmFnZSwgcmVzdG9yZVN0b3JhZ2UgfSBmcm9tICcuL0pTT05GdW5jdGlvbnMnO1xuaW1wb3J0IHVpRWRpdEl0ZW0gZnJvbSAnLi91aUFkZEl0ZW1Db25zdHJ1Y3Rvcic7XG5pbXBvcnQgdWlDb250cm9sIGZyb20gJy4vdWlDb250cm9scyc7XG5pbXBvcnQge1xuICBjbGVhckNvbnRlbnQsXG4gIHNob3dQbHVzQnRuLFxuICBhZGRGaWVsZCxcbiAgYWRkVGFzayxcbiAgaW5wdXQsXG4gIGFkZE1vcmUsXG4gIHF1aWNrU2F2ZSxcbn0gZnJvbSAnLi91aUZ1bmN0aW9ucyc7XG5cbmZ1bmN0aW9uIGVkaXRNb3JlKHRpdGxlKSB7XG4gIHVpRWRpdEl0ZW0odGl0bGUpO1xuICB0aXRsZS52YWx1ZSA9ICcnO1xufVxuZnVuY3Rpb24gZmFzdFNhdmUodGl0bGUpIHtcbiAgdG9kb0xpc3QuYWRkSXRlbSh0aXRsZS52YWx1ZSk7XG4gIHVpQ29udHJvbC51cGRhdGUoKTtcbn1cblxuYWRkVGFzay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHVpRWRpdEl0ZW0pO1xuXG4vLyBhZGljaW9uYSBldmVudG8gcHJhIHF1YW5kbyBzZSBjb21lw6dhIGEgZGlnaXRhclxuLy8gZSBxdWFuZG8gc2UgcGFyYSBkZSBkaWdpdGFyIG8gdMOtdHVsbyBkbyBpdGVtLlxuYWRkRmllbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHNob3dQbHVzQnRuKTtcbmFkZEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgc2hvd1BsdXNCdG4pO1xuYWRkTW9yZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGVkaXRNb3JlKGlucHV0KSk7XG5xdWlja1NhdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBmYXN0U2F2ZShpbnB1dCkpO1xuXG5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBwb3B1bGF0ZVN0b3JhZ2UpO1xuaW5wdXQuc2V0QXR0cmlidXRlKCdhdXRvY29tcGxldGUnLCAnb2ZmJyk7XG4vLyBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBwb3B1bGF0ZVN0b3JhZ2UpO1xuLy8gaW5wdXQuc2V0QXR0cmlidXRlKCdhdXRvY29tcGxldGUnLCAnb2ZmJyk7XG53aW5kb3cub25sb2FkID0gcmVzdG9yZVN0b3JhZ2UoKTtcblxuY29uc3QgbWFpbk1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2I2V4YW1wbGVNb2RhbCcpO1xubWFpbk1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2hpZGRlbi5icy5tb2RhbCcsICgpID0+IHtcbiAgY29uc3QgbW9kYWxCb2R5ID0gbWFpbk1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1ib2R5Jyk7XG4gIGNsZWFyQ29udGVudChtb2RhbEJvZHkpO1xufSk7XG5cbnVpQ29udHJvbC5sb2FkKCk7XG4iLCJpbXBvcnQgeyBwb3B1bGF0ZVN0b3JhZ2UgfSBmcm9tICcuL0pTT05GdW5jdGlvbnMnO1xuaW1wb3J0IHRvZG9MaXN0IGZyb20gJy4vY29yZSc7XG5pbXBvcnQgdWlDb250cm9sIGZyb20gJy4vdWlDb250cm9scyc7XG5pbXBvcnQge1xuICBkdWVEYXRlTWFzayxcbiAgc2VhcmNoUHJvamVjdHMsXG4gIGNyZWF0ZUVsZW1lbnQsXG4gIGNyZWF0ZVByaW9yaXR5U2VsZWN0LFxufSBmcm9tICcuL3VpRnVuY3Rpb25zJztcblxuZnVuY3Rpb24gc2F2ZSh0aXRsZSwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpIHtcbiAgdG9kb0xpc3QuYWRkSXRlbSh0aXRsZS52YWx1ZSwgZHVlRGF0ZS52YWx1ZSwgcHJpb3JpdHkudmFsdWUsIHByb2plY3QudmFsdWUpO1xuICB1aUNvbnRyb2wudXBkYXRlKCk7XG4gIHBvcHVsYXRlU3RvcmFnZSgpO1xufVxuZnVuY3Rpb24gdWlFZGl0SXRlbSh0aXRsZSwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpIHtcbiAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYubW9kYWwtYm9keScpO1xuICAvLyBjcmVhdGluZyBlbGVtZW50c1xuICBjb25zdCByb3cxID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnXSk7XG4gIGNvbnN0IHRpdGxlRGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydpbnB1dC1ncm91cCcsICdtYi0zJywgJ2dhcC0xJ10pO1xuICBjb25zdCB0aXRsZUlucHV0ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2Zvcm0tY29udHJvbCddLCB7XG4gICAgaWQ6ICdpdGVtVGl0bGUnLFxuICAgIHR5cGU6ICd0ZXh0JyxcbiAgICBwbGFjZWhvbGRlcjogJ05vdmEgVGFyZWZhLi4uJyxcbiAgfSk7XG4gIGNvbnN0IHJvdzIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2JnLWdyYXknLCAncm93JywgJ2ctMCcsICdnYXAtMicsICdmbGV4LW5vd3JhcCddKTtcblxuICBjb25zdCBkYXRlRGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydkYXRlJywgJ2ZsYXRwaWNrcicsICdjb2wnXSk7XG4gIGNvbnN0IGRhdGVJbnB1dCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgWydmb3JtLWNvbnRyb2wnLCAnZmxhdHBpY2tyLWlucHV0J10sIHtcbiAgICBpZDogJ2R1ZURhdGUnLFxuICAgIHR5cGU6ICd0ZXh0JyxcbiAgICBpbnB1dG1vZGU6ICdudW1lcmljJyxcbiAgICAnZGF0YS1pbnB1dCc6IHVuZGVmaW5lZCxcbiAgICBhdXRvY29tcGxldGU6ICdvZmYnLFxuICB9KTtcbiAgY29uc3QgZGF0ZXBpY2tlclRvZ2dsZSA9IGNyZWF0ZUVsZW1lbnQoJ2EnLCBbJ2lucHV0LWJ1dHRvbiddLCB7XG4gICAgdGl0bGU6ICd0b2dnbGUnLFxuICAgICdkYXRhLXRvZ2dsZSc6IHVuZGVmaW5lZCxcbiAgfSk7XG4gIGNvbnN0IGRhdGVJY29uID0gY3JlYXRlRWxlbWVudCgnaScsIFsndGV4dC13YXJuaW5nJywgJ3NtYWxsJywgJ2JpJywgJ2JpLWNhbGVuZGFyJ10pO1xuXG4gIGNvbnN0IHByaW9yaXR5RGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydjb2wnXSk7XG4gIGNvbnN0IHNlbGVjdFByaW9yaXR5ID0gKHR5cGVvZiBwcmlvcml0eSAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgPyBjcmVhdGVQcmlvcml0eVNlbGVjdChwcmlvcml0eSlcbiAgICA6IGNyZWF0ZVByaW9yaXR5U2VsZWN0KCk7XG5cbiAgY29uc3QgcHJvamVjdERpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29sJ10pO1xuICBjb25zdCBwcm9qZWN0SW5wdXQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIFsnZm9ybS1jb250cm9sJ10sIHtcbiAgICBpZDogJ2VudGVyUHJvamVjdCcsXG4gICAgdHlwZTogJ3RleHQnLFxuICAgIGxpc3Q6ICdkYXRhbGlzdE9wdGlvbnMnLFxuICAgIHBsYWNlaG9sZGVyOiAnUHJvamV0bycsXG4gICAgYXV0b2NvbXBsZXRlOiAnb2ZmJyxcbiAgfSk7XG4gIGNvbnN0IHByb2plY3REYXRhbGlzdCA9IGNyZWF0ZUVsZW1lbnQoJ2RhdGFsaXN0JywgWydzdWdnZXN0aW9ucycsICdmb3JtJ10sIHtcbiAgICBpZDogJ2RhdGFsaXN0T3B0aW9ucycsXG4gICAgZHJvcHpvbmU6ICdzdHJpbmcnLFxuICB9KTtcblxuICBjb25zdCByb3czID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnLCAncHQtMiddKTtcblxuICBjb25zdCBub3Rlc0NvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29udGFpbmVyJ10pO1xuICBjb25zdCBub3Rlc0hlYWRlciA9IGNyZWF0ZUVsZW1lbnQoJ2g2Jyk7XG4gIGNvbnN0IG5vdGVzUm93ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnLCAnZy0yJ10pO1xuXG4gIGNvbnN0IGFkZE5vdGVSb3cgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3JvdycsICdwdC0yJywgJ2p1c3RpZnktY29udGVudC1lbmQnXSk7XG5cbiAgY29uc3QgYWRkTm90ZURpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29sLWF1dG8nLCAnc21hbGwnLCAndGV4dC1kYW5nZXInLCAndGV4dC13YXJuaW5nLWVtcGhhc2lzJ10pO1xuICBjb25zdCBhZGROb3RlTGluayA9IGNyZWF0ZUVsZW1lbnQoJ2EnLCBbXSwgeyBpZDogJ2FkZE5vdGUnIH0pO1xuICBjb25zdCBhZGROb3RlSWNvbiA9IGNyZWF0ZUVsZW1lbnQoJ2knLCBbJ2JpJywgJ2JpLXBsdXMtY2lyY2xlJ10pO1xuICBjb25zdCBhZGROb3RlVGV4dCA9IGNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICBjb25zdCByb3c0ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnLCAnZy0yJywgJ3B0LTMnLCAnanVzdGlmeS1jb250ZW50LXN0YXJ0JywgJ2ZsZXgtcm93LXJldmVyc2UnXSk7XG5cbiAgY29uc3Qgc2F2ZURpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29sLWF1dG8nXSk7XG4gIGNvbnN0IHNhdmVCdG4gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2J0bicsICdidG4td2FybmluZycsICd0ZXh0LWxpZ2h0J10sIHtcbiAgICAnZGF0YS1icy1kaXNtaXNzJzogJ21vZGFsJyxcbiAgfSk7XG4gIGNvbnN0IGNhbmNlbERpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29sLWF1dG8nXSk7XG4gIGNvbnN0IGNhbmNlbEJ0biA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIFsnYnRuJywgJ2J0bi1zZWNvbmRhcnknLCAndGV4dC1saWdodCddLCB7XG4gICAgJ2RhdGEtYnMtZGlzbWlzcyc6ICdtb2RhbCcsXG4gIH0pO1xuXG4gIC8vIGFwcGVuZCBlbGVtZW50c1xuXG4gIC8vIHJvdyAxICh0aXRsZSlcbiAgaWYgKHR5cGVvZiB0aXRsZS52YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHRpdGxlSW5wdXQudmFsdWUgPSB0aXRsZS52YWx1ZTtcbiAgdGl0bGVEaXYuYXBwZW5kQ2hpbGQodGl0bGVJbnB1dCk7XG5cbiAgcm93MS5hcHBlbmRDaGlsZCh0aXRsZURpdik7XG5cbiAgLy8gcm93IDIgKGRhdGUsIHByaW9yaXR5LCBwcm9qZWN0KVxuXG4gIC8vIGRhdGVcbiAgaWYgKHR5cGVvZiBkdWVEYXRlICE9PSAndW5kZWZpbmVkJyAmJiBkdWVEYXRlICE9PSAwKSBkYXRlSW5wdXQudmFsdWUgPSBkdWVEYXRlO1xuICBkYXRlcGlja2VyVG9nZ2xlLmFwcGVuZENoaWxkKGRhdGVJY29uKTtcbiAgZGF0ZURpdi5hcHBlbmQoZGF0ZUlucHV0LCBkYXRlcGlja2VyVG9nZ2xlKTtcblxuICAvLyBwcmlvcml0eVxuICBwcmlvcml0eURpdi5hcHBlbmRDaGlsZChzZWxlY3RQcmlvcml0eSk7XG5cbiAgLy8gcHJvamVjdFxuICBpZiAodHlwZW9mIHByb2plY3QgIT09ICd1bmRlZmluZWQnICYmIHByb2plY3QgIT09IDApIGRhdGVJbnB1dC52YWx1ZSA9IHByb2plY3Q7XG4gIHByb2plY3REaXYuYXBwZW5kKHByb2plY3RJbnB1dCwgcHJvamVjdERhdGFsaXN0KTtcblxuICByb3cyLmFwcGVuZChkYXRlRGl2LCBwcmlvcml0eURpdiwgcHJvamVjdERpdik7XG5cbiAgLy8gcm93MyAobm90ZXMgYXJlYSlcbiAgbm90ZXNIZWFkZXIudGV4dENvbnRlbnQgPSAnTm90YXMnO1xuICBhZGROb3RlVGV4dC50ZXh0Q29udGVudCA9ICdOb3ZhIG5vdGEnO1xuICBhZGROb3RlSWNvbi50ZXh0Q29udGVudCA9ICcgJzsgLy8gZml4aW5nIGEgcHJvYmxlbSBmb3IgdXNpbmcganNcblxuICBhZGROb3RlTGluay5hcHBlbmQoYWRkTm90ZUljb24sIGFkZE5vdGVUZXh0KTtcbiAgYWRkTm90ZURpdi5hcHBlbmRDaGlsZChhZGROb3RlTGluayk7XG4gIGFkZE5vdGVSb3cuYXBwZW5kQ2hpbGQoYWRkTm90ZURpdik7XG4gIG5vdGVzUm93LmFwcGVuZENoaWxkKGFkZE5vdGVSb3cpO1xuICBub3Rlc0NvbnRhaW5lci5hcHBlbmQobm90ZXNIZWFkZXIsIG5vdGVzUm93KTtcblxuICByb3czLmFwcGVuZENoaWxkKG5vdGVzQ29udGFpbmVyKTtcblxuICAvLyByb3c0IChidXR0b25zKVxuICBjYW5jZWxCdG4udGV4dENvbnRlbnQgPSAnQ2FuY2VsJztcbiAgc2F2ZUJ0bi50ZXh0Q29udGVudCA9ICdTYXZlJztcbiAgc2F2ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNhdmUodGl0bGVJbnB1dCwgZGF0ZUlucHV0LCBwcm9qZWN0SW5wdXQsIHByb2plY3RJbnB1dCkpO1xuICBzYXZlRGl2LmFwcGVuZENoaWxkKHNhdmVCdG4pO1xuICBjYW5jZWxEaXYuYXBwZW5kQ2hpbGQoY2FuY2VsQnRuKTtcblxuICByb3c0LmFwcGVuZChzYXZlRGl2LCBjYW5jZWxEaXYpO1xuXG4gIG1vZGFsLmFwcGVuZChyb3cxLCByb3cyLCByb3czLCByb3c0KTtcbiAgZHVlRGF0ZU1hc2soKTtcbiAgc2VhcmNoUHJvamVjdHMoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdWlFZGl0SXRlbTtcbiIsImltcG9ydCB0b2RvTGlzdCBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IHsgY2xlYXJDb250ZW50IH0gZnJvbSAnLi91aUZ1bmN0aW9ucyc7XG5pbXBvcnQgYWRkTGluZSBmcm9tICcuL3VpTGlzdEdlbmVyYXRvcic7XG5cbmNvbnN0IGxvYWRMaXN0ID0gKCkgPT4gWy4uLnRvZG9MaXN0LmFsbFRhc2tzTGlzdCgpXTtcbmNvbnN0IHNvcnRQYXJhbSA9IChhcnIsIHBhcmFtKSA9PiBbLi4uYXJyXVxuICAuc29ydCgoYSwgYikgPT4gKChhW3BhcmFtXSA8IGJbcGFyYW1dKSA/IC0xIDogMSkpO1xuXG4vLyBVSSBDb250cm9sbGVyXG5jb25zdCB1aUNvbnRyb2wgPSAoKCkgPT4ge1xuICBsZXQgY3VycmVudEZpbHRlciA9IG51bGw7XG5cbiAgZnVuY3Rpb24gc2V0Q3VycmVudEZpbHRlcihrZXksIHZhbHVlKSB7XG4gICAgaWYgKGtleSkgY3VycmVudEZpbHRlciA9IHsga2V5LCB2YWx1ZSB9O1xuICAgIGVsc2UgY3VycmVudEZpbHRlciA9IG51bGw7XG4gIH1cblxuICBjb25zdCBmaWx0ZXJBcnJheSA9IChhcnIsIGZpbHRlciwgdmFsdWUpID0+IHtcbiAgICBpZiAoZmlsdGVyKSByZXR1cm4gWy4uLmFyci5maWx0ZXIoKG9iamV0bykgPT4gb2JqZXRvW2ZpbHRlcl0gPT09IHZhbHVlKV07XG4gICAgcmV0dXJuIGFycjtcbiAgfTtcblxuICBmdW5jdGlvbiBsb2FkKCkge1xuICAgIGNvbnNvbGUubG9nKGxvYWRMaXN0KCkpO1xuICAgIGNvbnN0IHVpTGlzdCA9IHNvcnRQYXJhbShsb2FkTGlzdCgpLCAnY2hlY2tlZCcpO1xuICAgIGlmIChjdXJyZW50RmlsdGVyICE9PSBudWxsKSB7XG4gICAgICBmaWx0ZXJBcnJheSh1aUxpc3QsIGN1cnJlbnRGaWx0ZXIua2V5LCBjdXJyZW50RmlsdGVyLnZhbHVlKVxuICAgICAgICAuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBsb2FkTGlzdCgpLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gb2JqLmlkKTtcbiAgICAgICAgICBhZGRMaW5lKG9iaiwgaW5kZXgpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdWlMaXN0LmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICBjb25zdCBpbmRleCA9IGxvYWRMaXN0KCkuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09PSBvYmouaWQpO1xuICAgICAgICBhZGRMaW5lKG9iaiwgaW5kZXgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKGZpbHRlciwgdmFsdWUpIHtcbiAgICBjbGVhckNvbnRlbnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xpc3QnKSk7XG4gICAgaWYgKGZpbHRlcikgc2V0Q3VycmVudEZpbHRlcihmaWx0ZXIsIHZhbHVlKTtcbiAgICBpZiAoZmlsdGVyID09PSBmYWxzZSkgc2V0Q3VycmVudEZpbHRlcigpO1xuICAgIGxvYWQoKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbG9hZCxcbiAgICB1cGRhdGUsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCB1aUNvbnRyb2w7XG4iLCJpbXBvcnQgZmxhdHBpY2tyIGZyb20gJ2ZsYXRwaWNrcic7XG5pbXBvcnQgeyBQb3J0dWd1ZXNlIH0gZnJvbSAnZmxhdHBpY2tyL2Rpc3QvbDEwbi9wdCc7XG5pbXBvcnQgSU1hc2sgZnJvbSAnaW1hc2snO1xuaW1wb3J0IHsgbWFza0RhdGUgfSBmcm9tICcuL2RhdGUnO1xuaW1wb3J0IHRvZG9MaXN0IGZyb20gJy4vY29yZSc7XG5cbmV4cG9ydCBjb25zdCBpc0NoZWNrZWQgPSAoZSkgPT4gZS5jaGVja2VkID09PSB0cnVlO1xuXG5leHBvcnQgZnVuY3Rpb24gZmluZFBhcmVudE5vZGUoZWxlbWVudCwgYXR0cmlidXRlTmFtZSkge1xuICBsZXQgeyBwYXJlbnROb2RlIH0gPSBlbGVtZW50O1xuXG4gIHdoaWxlIChwYXJlbnROb2RlKSB7XG4gICAgaWYgKHBhcmVudE5vZGUuaGFzQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpKSB7XG4gICAgICByZXR1cm4gcGFyZW50Tm9kZTtcbiAgICB9XG4gICAgcGFyZW50Tm9kZSA9IHBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgfVxuXG4gIHJldHVybiBudWxsOyAvLyBSZXRvcm5hIG51bGwgc2UgbsOjbyBlbmNvbnRyb3UgbmVuaHVtIG7DsyBwYWkgY29tIG8gYXRyaWJ1dG8gZGVzZWphZG9cbn1cblxuLy8gc3RhcnQgb25Mb2FkXG5cbmNvbnN0IHNwZWNpYWxDaGFyc0VudHJpZXMgPSBbXG4gIFsnw4DDgcOCw4PDhMOFJywgJ0EnXSxcbiAgWyfDoMOhw6LDo8Okw6UnLCAnYSddLFxuICBbJ8OIw4nDisOLJywgJ0UnXSxcbiAgWyfDqMOpw6rDqycsICdlJ10sXG4gIFsnw4zDjcOOw48nLCAnSSddLFxuICBbJ8Osw63DrsOvJywgJ2knXSxcbiAgWyfDksOTw5XDlMOWJywgJ08nXSxcbiAgWyfDssOzw7XDtMO2JywgJ28nXSxcbiAgWyfDmcOaw5vDnCcsICdVJ10sXG4gIFsnw7nDusO7w7wnLCAndSddLFxuICBbJ8OHJywgJ0MnXSxcbiAgWyfDpycsICdjJ10sXG5dO1xuXG5jb25zdCBzcGVjaWFsQ2hhcnNNYXAgPSBPYmplY3QuZnJvbUVudHJpZXMoXG4gIHNwZWNpYWxDaGFyc0VudHJpZXMuZmxhdE1hcCgoW2NoYXJzLCB2YWx1ZV0pID0+IFsuLi5jaGFyc10ubWFwKChjaGFyKSA9PiBbY2hhciwgdmFsdWVdKSksXG4pO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0QXR0cnMoZWxlbSwgYXR0cnMpIHtcbiAgT2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZCAmJiBhdHRyc1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGtleSwgJycpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZywgY2xhc3NOYW1lcyA9IFtdLCBhdHRyaWJ1dGVzID0ge30pIHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgaWYgKGNsYXNzTmFtZXMubGVuZ3RoKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoLi4uY2xhc3NOYW1lcyk7XG4gIHNldEF0dHJzKGVsZW1lbnQsIGF0dHJpYnV0ZXMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU9wdGlvbih2YWx1ZSwgdGV4dCwgc2VsZWN0ZWQgPSBmYWxzZSkge1xuICBjb25zdCBvcHRpb24gPSBjcmVhdGVFbGVtZW50KCdvcHRpb24nLCBbXSwgeyB2YWx1ZSB9KTtcbiAgb3B0aW9uLnRleHRDb250ZW50ID0gdGV4dDtcbiAgaWYgKHNlbGVjdGVkKSB7XG4gICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKTtcbiAgfVxuICByZXR1cm4gb3B0aW9uO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDb250ZW50KGVsZW0pIHtcbiAgd2hpbGUgKGVsZW0uZmlyc3RDaGlsZCkge1xuICAgIGVsZW0ucmVtb3ZlQ2hpbGQoZWxlbS5sYXN0Q2hpbGQpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcmlvcml0eVNlbGVjdChudW0gPSAwKSB7XG4gIGNvbnN0IHNlbGVjdCA9IGNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcsIFsnZm9ybS1zZWxlY3QnXSwge1xuICAgICdhcmlhLWxhYmVsJzogJ1ByaW9yaWRhZGUnLFxuICB9KTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpICs9IDEpIHtcbiAgICBjb25zdCB0ZXh0ID0gaSA9PT0gMCA/ICdQcmlvcmlkYWRlJyA6IGBQcmlvcmlkYWRlICR7aX1gO1xuICAgIGNvbnN0IHNlbGVjdGVkID0gaSA9PT0gbnVtO1xuICAgIGNvbnN0IG9wdGlvbiA9IGNyZWF0ZU9wdGlvbihpLCB0ZXh0LCBzZWxlY3RlZCk7XG4gICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gIH1cbiAgcmV0dXJuIHNlbGVjdDtcbn1cblxuLy8gQUREL0VESVQgTkVXIFRBU0sgU0NSRUVOIEZVTkNUSU9OU1xuXG5mdW5jdGlvbiByZW1vdmVTcGVjaWFscyh0ZXh0KSB7XG4gIGxldCBzZWFyY2ggPSB0ZXh0O1xuICBzZWFyY2ggPSBzZWFyY2gucmVwbGFjZShcbiAgICAvW8OALcOcw6Atw7xdL2csXG4gICAgKG1hdGNoKSA9PiBzcGVjaWFsQ2hhcnNNYXBbbWF0Y2hdIHx8IG1hdGNoLFxuICApO1xuICByZXR1cm4gc2VhcmNoO1xufVxuLy8gcHJvamVjdHMgZGF0YWxpc3QgYXV0b2NvbXBsZXRlXG5mdW5jdGlvbiBhdXRvQ29tcGxldGUoc2VhcmNoKSB7XG4gIGNvbnN0IHByb2plY3RzID0gdG9kb0xpc3QuZ2V0UHJvamVjdHMoKTtcbiAgcmV0dXJuIHByb2plY3RzLmZpbHRlcigodmFsdWUpID0+IHtcbiAgICBjb25zdCB2YWx1ZUxvd2VyY2FzZSA9IHJlbW92ZVNwZWNpYWxzKHZhbHVlLnRvTG93ZXJDYXNlKCkpO1xuICAgIGNvbnN0IHNlYXJjaExvd2VyY2FzZSA9IHJlbW92ZVNwZWNpYWxzKHNlYXJjaC50b0xvd2VyQ2FzZSgpKTtcbiAgICByZXR1cm4gdmFsdWVMb3dlcmNhc2UuaW5jbHVkZXMoc2VhcmNoTG93ZXJjYXNlKTtcbiAgfSk7XG59XG5cbi8vIGNhbGxpbmcgZnVuY3Rpb25zIHRvIGF1dG9jb21wbGV0ZSBQcm9qZWN0IGZpZWxkXG5cbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hQcm9qZWN0cygpIHtcbiAgY29uc3QgaW5wdXRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VudGVyUHJvamVjdCcpO1xuICBjb25zdCBkYXRhbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RhdGFsaXN0Jyk7XG4gIGlucHV0UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICh7IHRhcmdldCB9KSA9PiB7XG4gICAgY29uc3QgaW5wdXREYXRhID0gdGFyZ2V0LnZhbHVlO1xuICAgIGlmIChpbnB1dERhdGEubGVuZ3RoKSB7XG4gICAgICBjb25zdCBhdXRvQ29tcGxldGVPcHRpb25zID0gYXV0b0NvbXBsZXRlKGlucHV0RGF0YSk7XG4gICAgICBkYXRhbGlzdC5pbm5lckhUTUwgPSBgJHthdXRvQ29tcGxldGVPcHRpb25zXG4gICAgICAgIC5tYXAoKHZhbHVlKSA9PiBgPG9wdGlvbiB2YWx1ZT1cIiR7dmFsdWV9XCIgLz5gKVxuICAgICAgICAuam9pbignJyl9YDtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBEQVRFUElDS0VSIEFORCBNQVNLIEZVTkNUSU9OU1xuXG5leHBvcnQgZnVuY3Rpb24gZHVlRGF0ZU1hc2soKSB7XG4gIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZHVlRGF0ZScpO1xuICBjb25zdCBmbGF0RWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5mbGF0cGlja3InKTtcblxuICAvLyBhcHBseSBtYXNrIHRvIGR1ZURhdGVGaWVsZFxuICBjb25zdCBtYXNrID0gSU1hc2soZHVlRGF0ZSwgbWFza0RhdGUpO1xuXG4gIC8vIGFwcGx5IGZsYXRwaWNrciBkYXRlcGlja2VyIHRvIGFsbCBlbGVtZW50cyBpbiBhIGRpdlxuICAvLyAoaWNvbiB0b2dnbGUgYW5kIGlucHV0IGRhdGUgdXNpbmcgZGF0YS0gYXR0cmlidXRlcylcbiAgZmxhdHBpY2tyKGZsYXRFbGVtLCB7XG4gICAgZGF0ZUZvcm1hdDogJ2QvbS9ZJyxcbiAgICBkaXNhYmxlTW9iaWxlOiAndHJ1ZScsXG4gICAgYWxsb3dJbnB1dDogdHJ1ZSxcbiAgICB3cmFwOiB0cnVlLFxuICAgIGxvY2FsZTogUG9ydHVndWVzZSxcbiAgICBvbkNoYW5nZShzZWxlY3RlZERhdGVzLCBkYXRlU3RyKSB7XG4gICAgICBtYXNrLnVwZGF0ZVZhbHVlKGRhdGVTdHIpO1xuICAgIH0sXG4gIH0pO1xufVxuXG4vLyBtYWluIHNjcmVlbiBpbnRlcmFjdGlvbnNcbi8vIGNoZWNrIHZpc3VhbCBlZmZlY3RcbmV4cG9ydCBmdW5jdGlvbiBzZXRMaW5lVGhyb3VnaChlKSB7XG4gIGNvbnN0IHRleHQgPSBlLm5leHRFbGVtZW50U2libGluZztcbiAgaWYgKGlzQ2hlY2tlZChlKSkge1xuICAgIHRleHQuY2xhc3NMaXN0LmFkZCgndGV4dC1kZWNvcmF0aW9uLWxpbmUtdGhyb3VnaCcpO1xuICB9IGVsc2Uge1xuICAgIHRleHQuY2xhc3NMaXN0LnJlbW92ZSgndGV4dC1kZWNvcmF0aW9uLWxpbmUtdGhyb3VnaCcpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBhZGRGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0I2l0ZW1UaXRsZScpO1xuZXhwb3J0IGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcbmV4cG9ydCBjb25zdCBhZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYSNhZGRJdGVtJyk7XG5leHBvcnQgY29uc3QgYWRkTW9yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbiNhZGRNb3JlJyk7XG5leHBvcnQgY29uc3QgcXVpY2tTYXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uI3NhdmVJdGVtJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93UGx1c0J0bigpIHtcbiAgLy8gRW5jb250cmEgbyBib3TDo28gK1xuICBjb25zdCBwbHVzQnRuID0gYWRkRmllbGQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICBjb25zdCBzYXZlQnRuID0gcGx1c0J0bi5uZXh0RWxlbWVudFNpYmxpbmc7XG4gIC8vIFNlIG8gdmFsb3IgZG8gY2FtcG8gdMOtdHVsbyBmb3IgZGlmZXJlbnRlIGRlIHZhemlvLFxuICAvLyBlbnTDo28gZWxlIHJldmVsYSBvIGJvdMOjbyArXG4gIGlmIChhZGRGaWVsZC52YWx1ZSAhPT0gJycpIHtcbiAgICBwbHVzQnRuLmNsYXNzTGlzdC5hZGQoJ3JldmVhbEl0ZW0nKTtcbiAgICBzYXZlQnRuLmNsYXNzTGlzdC5hZGQoJ3JldmVhbEl0ZW0nKTtcbiAgfVxuICAvLyBjYXNvIGNvbnRyw6FyaW8sIHNlIHZvY8OqIGFwYWdhciB0b2RvIG8gdMOtdHVsb1xuICAvLyBlbGUgZMOhIGRpc3BsYXk6IG5vbmUsIG5vIGJvdMOjbyArXG4gIGlmIChhZGRGaWVsZC52YWx1ZSA9PT0gJycgJiYgcGx1c0J0bi5jbGFzc0xpc3QuY29udGFpbnMoJ3JldmVhbEl0ZW0nKSkge1xuICAgIHBsdXNCdG4uY2xhc3NMaXN0LnJlbW92ZSgncmV2ZWFsSXRlbScpO1xuICAgIHNhdmVCdG4uY2xhc3NMaXN0LnJlbW92ZSgncmV2ZWFsSXRlbScpO1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuaW1wb3J0IHsgcG9wdWxhdGVTdG9yYWdlIH0gZnJvbSAnLi9KU09ORnVuY3Rpb25zJztcbmltcG9ydCB7XG4gIGlzQ2hlY2tlZCxcbiAgY3JlYXRlRWxlbWVudCxcbiAgZmluZFBhcmVudE5vZGUsXG4gIHNldExpbmVUaHJvdWdoLFxufSBmcm9tICcuL3VpRnVuY3Rpb25zJztcbmltcG9ydCB1aUNvbnRyb2wgZnJvbSAnLi91aUNvbnRyb2xzJztcblxuaW1wb3J0IHRvZG9MaXN0IGZyb20gJy4vY29yZSc7XG5cbmNvbnN0IGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYjbGlzdCcpO1xuY29uc3QgaGFzTm90ZXMgPSAob2JqKSA9PiBvYmoubGVuZ3RoID4gMDtcblxuZnVuY3Rpb24gYWRkQ2hlY2tlZChjaGVja2JveCwgYnV0dG9uKSB7XG4gIGNoZWNrYm94LmNoZWNrZWQgPSB0cnVlO1xuICBidXR0b24uY2xhc3NMaXN0LmFkZCgndGV4dC1kZWNvcmF0aW9uLWxpbmUtdGhyb3VnaCcpO1xufVxuXG5mdW5jdGlvbiBpbnNlcnROb3RlKG5vdGVzLCBib2R5KSB7XG4gIG5vdGVzLmZvckVhY2goKGNvbnRlbnQpID0+IHtcbiAgICBjb25zdCBjb250ZW50RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29udGVudERpdi5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoY29udGVudERpdik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRDaGVja2VkSGFuZGxlcihlKSB7XG4gIGNvbnN0IHsgdGFyZ2V0IH0gPSBlO1xuICBjb25zdCBwb3MgPSBmaW5kUGFyZW50Tm9kZSh0YXJnZXQsICdkYXRhLXBvc2l0aW9uJykuZ2V0QXR0cmlidXRlKCdkYXRhLXBvc2l0aW9uJyk7XG4gIHRvZG9MaXN0LnNlbGVjdEl0ZW0ocG9zKS5lZGl0Q2hlY2soKTtcbiAgc2V0TGluZVRocm91Z2godGFyZ2V0KTtcbiAgdWlDb250cm9sLnVwZGF0ZSgpO1xufVxuXG5mdW5jdGlvbiBhZGRMaW5lKG9iaiwgbnVtKSB7XG4gIC8vIExJU1QgSVRFTSAtLS0tLS1cblxuICAvLyBoZWFkZXJcbiAgY29uc3QgaXRlbSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnYWNjb3JkaW9uLWl0ZW0nXSwge1xuICAgICdkYXRhLXBvc2l0aW9uJzogYCR7bnVtfWAsXG4gIH0pO1xuICBjb25zdCBoZWFkZXIgPSBjcmVhdGVFbGVtZW50KCdoMicsIFsnYWNjb3JkaW9uLWhlYWRlcicsICdwLTEnLCAnZC1mbGV4JywgJ2FsaWduLWl0ZW1zLWNlbnRlcicsICdnYXAtMSddKTtcbiAgY29uc3QgY2hlY2tib3ggPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIFsnZm9ybS1jaGVjay1pbnB1dCcsICd0ZXh0LWJnLXdhcm5pbmcnXSwgeyB0eXBlOiAnY2hlY2tib3gnIH0pO1xuICBjb25zdCBidG5IZWFkZXIgPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2FjY29yZGlvbi1idXR0b24nLCAnY29sbGFwc2VkJywgJ2ZsZXgtZmlsbCddLCB7XG4gICAgdHlwZTogJ2J1dHRvbicsXG4gICAgJ2RhdGEtYnMtdG9nZ2xlJzogJ2NvbGxhcHNlJyxcbiAgICAnYXJpYS1leHBhbmRlZCc6ICdmYWxzZScsXG4gICAgJ2RhdGEtYnMtdGFyZ2V0JzogYCNpdGVtLSR7bnVtfWAsXG4gIH0pO1xuICBjb25zdCBzcGFuID0gY3JlYXRlRWxlbWVudCgnc3BhbicsIFsnZmxleC1maWxsJ10pO1xuICBjb25zdCBjb2RlID0gY3JlYXRlRWxlbWVudCgnY29kZScsIFsnc21hbGwnLCAndGV4dC1tdXRlZCddKTtcblxuICAvLyBib2R5XG4gIGNvbnN0IGl0ZW1EZXRhaWxzID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydhY2NvcmRpb24tY29sbGFwc2UnLCAnY29sbGFwc2UnXSwge1xuICAgIGlkOiBgaXRlbS0ke251bX1gLFxuICB9KTtcbiAgY29uc3QgaXRlbUJvZHkgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2FjY29yZGlvbi1ib2R5J10pO1xuXG4gIGNvbnN0IGJ0bkVkaXQgPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2J0bicsICdidG4td2FybmluZyddKTtcbiAgY29uc3QgYnRuRGVsZXRlID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgWydidG4nLCAnYnRuLWRhbmdlciddKTtcblxuICAvLyBFVkVOVExJU1RORVJTIE9CSkVDVFNcbiAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgc2V0Q2hlY2tlZEhhbmRsZXIpO1xuICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBwb3B1bGF0ZVN0b3JhZ2UpO1xuXG4gIC8vIEZJTExJTkcgQ09OVEVOVFxuICAvLyBoZWFkZXJcbiAgc3Bhbi50ZXh0Q29udGVudCA9IG9iai50aXRsZTtcbiAgY29kZS50ZXh0Q29udGVudCA9IG9iai5wcm9qZWN0O1xuXG4gIC8vIGJvZHlcbiAgYnRuRWRpdC50ZXh0Q29udGVudCA9ICdFZGl0JztcbiAgYnRuRGVsZXRlLnRleHRDb250ZW50ID0gJ0RlbGV0ZSc7XG5cbiAgLy8gQXBwZW5kaW5nIGNvbnRlbnRcbiAgYnRuSGVhZGVyLmFwcGVuZChzcGFuLCBjb2RlKTtcbiAgaGVhZGVyLmFwcGVuZChjaGVja2JveCwgYnRuSGVhZGVyKTtcblxuICAvLyBCb2R5IGNvbnRlbnRcbiAgaWYgKGhhc05vdGVzKG9iai5ub3RlcykpIHtcbiAgICBpbnNlcnROb3RlKG9iai5ub3RlcywgaXRlbUJvZHkpO1xuICB9XG4gIGl0ZW1EZXRhaWxzLmFwcGVuZENoaWxkKGl0ZW1Cb2R5KTtcblxuICAvLyBBcHBlbmQgZWxlbWVudHMgdG8gbGlzdFxuICBpdGVtLmFwcGVuZChoZWFkZXIsIGl0ZW1EZXRhaWxzKTtcbiAgbGlzdC5hcHBlbmRDaGlsZChpdGVtKTtcbiAgaWYgKGlzQ2hlY2tlZChvYmopKSBhZGRDaGVja2VkKGNoZWNrYm94LCBidG5IZWFkZXIpO1xufVxuZXhwb3J0IGRlZmF1bHQgYWRkTGluZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt0b2RvX2xpc3RcIl0gPSBzZWxmW1wid2VicGFja0NodW5rdG9kb19saXN0XCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCIzcmRwYXJ0XCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyg3MjczKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9