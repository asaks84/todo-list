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
  (0,_JSONFunctions__WEBPACK_IMPORTED_MODULE_2__.populateStorage)();
}

function setMaxHeight() {
  const list = document.getElementById('list');
  if (window.innerWidth < 768) {
    // get padding top + bottom form main element
    let mainPadding = parseFloat(window.getComputedStyle(document.querySelector('main'), null)
      .getPropertyValue('padding-top').match(/\d+(\.\d+)?/));
    mainPadding += parseFloat(window.getComputedStyle(document.querySelector('main'), null)
      .getPropertyValue('padding-bottom').match(/\d+(\.\d+)?/));

    // get other elements size
    const bodyHeight = document.querySelector('body').offsetHeight;
    const insetItemHeight = document.querySelector('main > div').offsetHeight;
    const headerHeight = document.querySelector('header').offsetHeight;
    const asideHeight = document.querySelector('aside').offsetHeight;
    // const footerHeight = document.querySelector('footer').offsetHeight;

    // set max size for task list
    const maxHeight = bodyHeight - headerHeight - insetItemHeight - asideHeight - mainPadding;
    list.style.maxHeight = `${maxHeight}px`;
  } else list.style.maxHeight = 'none';
}

const projectsIcon = document.querySelector('div#projects');
const projectsDropdown = document.querySelector('div#projects div');

projectsIcon.addEventListener('click', (event) => {
  // event.stopPropagation();

  if (projectsDropdown.classList.contains('opacity-0')) {
    projectsDropdown.classList.remove('opacity-0');
    projectsDropdown.classList.add('opacity-100');
  } else {
    projectsDropdown.classList.remove('opacity-100');
    projectsDropdown.classList.add('opacity-0'); // Ocultando a div se estiver visível
  }
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('#projects')) {
    projectsDropdown.classList.remove('opacity-100');
    projectsDropdown.classList.add('opacity-0');
  }
});

_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.addTask.addEventListener('click', _uiAddItemConstructor__WEBPACK_IMPORTED_MODULE_3__["default"]);
_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.addField.addEventListener('keydown', _uiFunctions__WEBPACK_IMPORTED_MODULE_5__.showPlusBtn);
_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.addField.addEventListener('keyup', _uiFunctions__WEBPACK_IMPORTED_MODULE_5__.showPlusBtn);
_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.addMore.addEventListener('click', () => editMore(_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.input));
_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.quickSave.addEventListener('click', () => fastSave(_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.input));

window.addEventListener('change', () => {
  (0,_JSONFunctions__WEBPACK_IMPORTED_MODULE_2__.populateStorage)();
  _uiControls__WEBPACK_IMPORTED_MODULE_4__["default"].update();
  console.log('atualizou');
});
window.onload = (0,_JSONFunctions__WEBPACK_IMPORTED_MODULE_2__.restoreStorage)();

const mainModal = document.querySelector('div#exampleModal');
mainModal.addEventListener('hidden.bs.modal', () => {
  const modalBody = mainModal.querySelector('.modal-body');
  (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.clearContent)(modalBody);
});

window.addEventListener('load', setMaxHeight);
window.addEventListener('resize', setMaxHeight);

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
/* harmony import */ var _uiListGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uiListGenerator */ 6179);




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
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core */ 3317);
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
  _core__WEBPACK_IMPORTED_MODULE_2__["default"].selectItem(pos).editCheck();
  (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_1__.setLineThrough)(target);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9zdHlsZS5zY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvSlNPTkZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL2NvcmUuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9kYXRlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvc2NyaXB0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvdWlBZGRJdGVtQ29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy91aUNvbnRyb2xzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvdWlGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy91aUxpc3RHZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHRvZG9MaXN0IGZyb20gJy4vY29yZSc7XG4vLyBpbXBvcnQgYWRkTGluZSBmcm9tICcuL3VpTGlzdEdlbmVyYXRvcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBwb3B1bGF0ZVN0b3JhZ2UoKSB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXRhJywgdG9kb0xpc3QudG9KU09OKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzdG9yZVN0b3JhZ2UoKSB7XG4gIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGF0YScpID09PSBudWxsKSByZXR1cm47XG4gIHRvZG9MaXN0LnJlc3RvcmUobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhdGEnKSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25uZWN0KCkge1xuICBjb25zdCByZXF1ZXN0VVJMID0gJy4vYXNzZXRzL2RhdGEuanNvbic7XG4gIGNvbnN0IHJlcXVlc3QgPSBhd2FpdCBmZXRjaChyZXF1ZXN0VVJMKTtcbiAgaWYgKCFyZXF1ZXN0Lm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBIVFRQIGVycm9yISBTdGF0dXM6ICR7cmVxdWVzdC5zdGF0dXN9YCk7XG4gIH1cblxuICByZXR1cm4gcmVxdWVzdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBvcHVsYXRlKCkge1xuICBjb25zdCB2YWx1ZSA9IGF3YWl0IGNvbm5lY3QoKTtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGVzdCgpIHtcbiAgdG9kb0xpc3QucmVzdG9yZShwb3B1bGF0ZSgpKTtcbn1cbiIsImZ1bmN0aW9uIENyZWF0ZUl0ZW0obnVtLCB0ZXh0LCBkZWFkbGluZSA9IDAsIHByb2plY3QgPSBudWxsLCBwcmlvcml0eU51bSA9IDAsIGNoZWNrID0gZmFsc2UpIHtcbiAgbGV0IHRpdGxlID0gdGV4dDtcbiAgbGV0IGR1ZURhdGUgPSBkZWFkbGluZTtcbiAgbGV0IHByb2plY3ROYW1lID0gcHJvamVjdDtcbiAgbGV0IHByaW9yaXR5ID0gcHJpb3JpdHlOdW07XG4gIGxldCBjaGVja2VkID0gY2hlY2s7XG4gIGNvbnN0IGlkID0gbnVtO1xuICBjb25zdCBub3RlcyA9IFtdO1xuXG4gIGZ1bmN0aW9uIGVkaXRUaXRsZSh2YWwpIHsgdGl0bGUgPSB2YWw7IH1cbiAgY29uc3QgZ2V0VGl0bGUgPSAoKSA9PiB0aXRsZTtcbiAgZnVuY3Rpb24gZWRpdFByaW9yaXR5KHZhbCkgeyBwcmlvcml0eSA9IHZhbDsgfVxuICBjb25zdCBnZXRQcmlvcml0eSA9ICgpID0+IHByaW9yaXR5O1xuICBmdW5jdGlvbiBkZWxldGVEdW9EYXRlKCkgeyBkdWVEYXRlID0gMDsgfVxuICBmdW5jdGlvbiBlZGl0RHVlRGF0ZSh2YWwpIHsgZHVlRGF0ZSA9IHZhbDsgfVxuICBjb25zdCBnZXREdWVEYXRlID0gKCkgPT4gZHVlRGF0ZTtcbiAgZnVuY3Rpb24gZWRpdFByb2plY3QodmFsKSB7IHByb2plY3ROYW1lID0gdmFsOyB9XG4gIGNvbnN0IGdldFByb2plY3QgPSAoKSA9PiBwcm9qZWN0TmFtZTtcbiAgZnVuY3Rpb24gZWRpdENoZWNrKCkgeyBjaGVja2VkID0gIWNoZWNrZWQ7IH1cbiAgY29uc3QgZ2V0Q2hlY2sgPSAoKSA9PiBjaGVja2VkO1xuICBmdW5jdGlvbiBhZGROb3RlKHZhbCkgeyBub3Rlcy5wdXNoKHZhbCk7IH1cbiAgZnVuY3Rpb24gZGVsZXRlTm90ZShwb3MpIHsgbm90ZXMuc3BsaWNlKHBvcywgMSk7IH1cbiAgZnVuY3Rpb24gZWRpdE5vdGUocG9zLCB2YWwpIHsgbm90ZXNbcG9zXSA9IHZhbDsgfVxuICBjb25zdCBnZXRBbGxOb3RlcyA9ICgpID0+IG5vdGVzO1xuICBjb25zdCBnZXROb3RlID0gKHBvcykgPT4gbm90ZXNbcG9zXTtcbiAgY29uc3QgZ2V0SWQgPSAoKSA9PiBpZDtcblxuICByZXR1cm4ge1xuICAgIGFkZE5vdGUsXG4gICAgZWRpdE5vdGUsXG4gICAgZ2V0Tm90ZSxcbiAgICBkZWxldGVOb3RlLFxuICAgIGdldEFsbE5vdGVzLFxuXG4gICAgZWRpdFRpdGxlLFxuICAgIGdldFRpdGxlLFxuXG4gICAgZWRpdER1ZURhdGUsXG4gICAgZGVsZXRlRHVvRGF0ZSxcbiAgICBnZXREdWVEYXRlLFxuXG4gICAgZWRpdFByb2plY3QsXG4gICAgZ2V0UHJvamVjdCxcblxuICAgIGVkaXRQcmlvcml0eSxcbiAgICBnZXRQcmlvcml0eSxcblxuICAgIGVkaXRDaGVjayxcbiAgICBnZXRDaGVjayxcblxuICAgIGdldElkLFxuICB9O1xufVxuXG5jb25zdCB0b2RvTGlzdCA9ICgoKSA9PiB7XG4gIGNvbnN0IGxpc3QgPSBbXTtcblxuICBmdW5jdGlvbiByZXR1cm5PYmooaXRlbSkge1xuICAgIGNvbnN0IGlkID0gaXRlbS5nZXRJZCgpO1xuICAgIGNvbnN0IHRpdGxlID0gaXRlbS5nZXRUaXRsZSgpO1xuICAgIGNvbnN0IHByb2plY3QgPSBpdGVtLmdldFByb2plY3QoKTtcbiAgICBjb25zdCBkdWVEYXRlID0gaXRlbS5nZXREdWVEYXRlKCk7XG4gICAgY29uc3QgcHJpb3JpdHkgPSBpdGVtLmdldFByaW9yaXR5KCk7XG4gICAgY29uc3QgY2hlY2tlZCA9IGl0ZW0uZ2V0Q2hlY2soKTtcbiAgICBjb25zdCBub3RlcyA9IGl0ZW0uZ2V0QWxsTm90ZXMoKTtcblxuICAgIHJldHVybiB7XG4gICAgICBpZCwgdGl0bGUsIHByb2plY3QsIGR1ZURhdGUsIHByaW9yaXR5LCBjaGVja2VkLCBub3RlcyxcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGlzdC5sZW5ndGg7XG4gIGNvbnN0IHNlbGVjdEl0ZW0gPSAocG9zKSA9PiBsaXN0W3Bvc107XG4gIGZ1bmN0aW9uIHNldENoZWNrZWQocG9zKSB7IGxpc3RbcG9zXS5lZGl0Q2hlY2soKTsgfVxuICBjb25zdCBhbGxUYXNrc0xpc3QgPSAoKSA9PiBsaXN0Lm1hcCgob2JqKSA9PiAocmV0dXJuT2JqKG9iaikpKTtcbiAgZnVuY3Rpb24gcmVzZXQoKSB7IGxpc3QubGVuZ3RoID0gMDsgfVxuXG4gIGNvbnN0IGdldFByb2plY3RzID0gKCkgPT4gbGlzdC5tYXAoKGl0ZW0pID0+IGl0ZW0uZ2V0UHJvamVjdCgpKVxuICAgIC5maWx0ZXIoKHZhbHVlLCBwb3MsIHNlbGYpID0+IHZhbHVlICE9PSBudWxsICYmIHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IHBvcyk7XG5cbiAgZnVuY3Rpb24gYWRkSXRlbSh0ZXh0LCBkZWFkbGluZSwgcHJvamVjdCwgcHJpb3JpdHksIGNoZWNrZWQpIHtcbiAgICBjb25zdCBpZCA9IGxpc3QubGVuZ3RoO1xuICAgIGNvbnN0IG5ld0l0ZW0gPSBDcmVhdGVJdGVtKGlkLCB0ZXh0LCBkZWFkbGluZSwgcHJvamVjdCwgcHJpb3JpdHksIGNoZWNrZWQpO1xuICAgIGxpc3QucHVzaChuZXdJdGVtKTtcbiAgfVxuXG4gIGNvbnN0IHRvSlNPTiA9ICgpID0+IHtcbiAgICBjb25zdCBsaXN0RGF0YSA9IGxpc3QubWFwKChpdGVtKSA9PiAoe1xuICAgICAgaWQ6IGl0ZW0uZ2V0SWQoKSxcbiAgICAgIHRpdGxlOiBpdGVtLmdldFRpdGxlKCksXG4gICAgICBwcm9qZWN0OiBpdGVtLmdldFByb2plY3QoKSxcbiAgICAgIGR1ZURhdGU6IGl0ZW0uZ2V0RHVlRGF0ZSgpLFxuICAgICAgcHJpb3JpdHk6IGl0ZW0uZ2V0UHJpb3JpdHkoKSxcbiAgICAgIGNoZWNrZWQ6IGl0ZW0uZ2V0Q2hlY2soKSxcbiAgICAgIG5vdGVzOiBpdGVtLmdldEFsbE5vdGVzKCksXG4gICAgfSkpO1xuXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHsgbGlzdDogbGlzdERhdGEgfSwgJycsIDEpO1xuICB9O1xuXG4gIGNvbnN0IHJlc3RvcmUgPSAoZGF0YSkgPT4ge1xuICAgIHJlc2V0KCk7XG4gICAgY29uc3QgeyBsaXN0OiBsaXN0RGF0YSB9ID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICBsaXN0RGF0YS5mb3JFYWNoKFxuICAgICAgKHtcbiAgICAgICAgaWQsIHRpdGxlLCBwcm9qZWN0LCBkdWVEYXRlLCBwcmlvcml0eSwgY2hlY2tlZCwgbm90ZXMsXG4gICAgICB9KSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0l0ZW0gPSBDcmVhdGVJdGVtKGlkLCB0aXRsZSwgZHVlRGF0ZSwgcHJvamVjdCwgcHJpb3JpdHksIGNoZWNrZWQpO1xuICAgICAgICBub3Rlcy5mb3JFYWNoKChub3RlKSA9PiBuZXdJdGVtLmFkZE5vdGUobm90ZSkpO1xuICAgICAgICBsaXN0LnB1c2gobmV3SXRlbSk7XG4gICAgICB9LFxuICAgICk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRMZW5ndGgsXG4gICAgc2VsZWN0SXRlbSxcbiAgICBhZGRJdGVtLFxuICAgIHJlc3RvcmUsXG4gICAgdG9KU09OLFxuICAgIHNldENoZWNrZWQsXG4gICAgZ2V0UHJvamVjdHMsXG4gICAgcmVzZXQsXG4gICAgcmV0dXJuT2JqLFxuICAgIGFsbFRhc2tzTGlzdCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHRvZG9MaXN0O1xuXG4vKlxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyMjIyMjIyMjIyMjIyMjIyAgICAgICAgICAgIyMjIyMjIyMjIyMjIyMjI1xuIyMjIyMjIyMjIyMjIyMjIyBURVNUIEFSRUEgIyMjIyMjIyMjIyMjIyMjI1xuIyMjIyMjIyMjIyMjIyMjIyAgICAgICAgICAgIyMjIyMjIyMjIyMjIyMjI1xuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuKi9cbiIsIi8vIGltcG9ydCB7IHB0QlIgfSBmcm9tICdkYXRlLWZucy9sb2NhbGUnO1xuaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IElNYXNrIGZyb20gJ2ltYXNrJztcblxuY29uc3Qgc3BsaXRUb0NvZGUgPSAoZGF0ZSkgPT4gZGF0ZS5zcGxpdCgnLycpLnJldmVyc2UoKS5qb2luKCcvJykucmVwbGFjZUFsbCgnLycsICcsICcpO1xuZXhwb3J0IGNvbnN0IHRvSW5wdXQgPSAoZGF0YSkgPT4gZm9ybWF0KG5ldyBEYXRlKHNwbGl0VG9Db2RlKGRhdGEpKSwgJ2RkL0xML3l5eXknKTtcbi8vIGNvbnN0IGdldERhdGEgPSAoYXJyKSA9PiBhcnIuZm9yRWFjaChlbGVtZW50ID0+IHtcblxuLy8gfSk7XG5cbmV4cG9ydCBjb25zdCBtYXNrRGF0ZSA9IHtcbiAgbWFzazogJ2QvYG0vYFknLFxuICBibG9ja3M6IHtcbiAgICBkOiB7XG4gICAgICBtYXNrOiBJTWFzay5NYXNrZWRSYW5nZSxcbiAgICAgIHBsYWNlaG9sZGVyQ2hhcjogJ2QnLFxuICAgICAgZnJvbTogMSxcbiAgICAgIHRvOiAzMSxcbiAgICAgIG1heExlbmd0aDogMixcbiAgICB9LFxuICAgIG06IHtcbiAgICAgIG1hc2s6IElNYXNrLk1hc2tlZFJhbmdlLFxuICAgICAgcGxhY2Vob2xkZXJDaGFyOiAnbScsXG4gICAgICBmcm9tOiAxLFxuICAgICAgdG86IDEyLFxuICAgICAgbWF4TGVuZ3RoOiAyLFxuICAgIH0sXG4gICAgWToge1xuICAgICAgbWFzazogSU1hc2suTWFza2VkUmFuZ2UsXG4gICAgICBwbGFjZWhvbGRlckNoYXI6ICdhJyxcbiAgICAgIGZyb206IDEwMDAsXG4gICAgICB0bzogOTk5OSxcbiAgICB9LFxuICB9LFxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQgJy4vc3R5bGUuc2Nzcyc7XG5pbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcbmltcG9ydCB7IHBvcHVsYXRlU3RvcmFnZSwgcmVzdG9yZVN0b3JhZ2UgfSBmcm9tICcuL0pTT05GdW5jdGlvbnMnO1xuaW1wb3J0IHVpRWRpdEl0ZW0gZnJvbSAnLi91aUFkZEl0ZW1Db25zdHJ1Y3Rvcic7XG5pbXBvcnQgdWlDb250cm9sIGZyb20gJy4vdWlDb250cm9scyc7XG5pbXBvcnQge1xuICBjbGVhckNvbnRlbnQsXG4gIHNob3dQbHVzQnRuLFxuICBhZGRGaWVsZCxcbiAgYWRkVGFzayxcbiAgaW5wdXQsXG4gIGFkZE1vcmUsXG4gIHF1aWNrU2F2ZSxcbn0gZnJvbSAnLi91aUZ1bmN0aW9ucyc7XG5cbmZ1bmN0aW9uIGVkaXRNb3JlKHRpdGxlKSB7XG4gIHVpRWRpdEl0ZW0odGl0bGUpO1xuICB0aXRsZS52YWx1ZSA9ICcnO1xufVxuZnVuY3Rpb24gZmFzdFNhdmUodGl0bGUpIHtcbiAgdG9kb0xpc3QuYWRkSXRlbSh0aXRsZS52YWx1ZSk7XG4gIHVpQ29udHJvbC51cGRhdGUoKTtcbiAgcG9wdWxhdGVTdG9yYWdlKCk7XG59XG5cbmZ1bmN0aW9uIHNldE1heEhlaWdodCgpIHtcbiAgY29uc3QgbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0Jyk7XG4gIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkge1xuICAgIC8vIGdldCBwYWRkaW5nIHRvcCArIGJvdHRvbSBmb3JtIG1haW4gZWxlbWVudFxuICAgIGxldCBtYWluUGFkZGluZyA9IHBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpLCBudWxsKVxuICAgICAgLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctdG9wJykubWF0Y2goL1xcZCsoXFwuXFxkKyk/LykpO1xuICAgIG1haW5QYWRkaW5nICs9IHBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpLCBudWxsKVxuICAgICAgLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctYm90dG9tJykubWF0Y2goL1xcZCsoXFwuXFxkKyk/LykpO1xuXG4gICAgLy8gZ2V0IG90aGVyIGVsZW1lbnRzIHNpemVcbiAgICBjb25zdCBib2R5SGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLm9mZnNldEhlaWdodDtcbiAgICBjb25zdCBpbnNldEl0ZW1IZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluID4gZGl2Jykub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IGhlYWRlckhlaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpLm9mZnNldEhlaWdodDtcbiAgICBjb25zdCBhc2lkZUhlaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FzaWRlJykub2Zmc2V0SGVpZ2h0O1xuICAgIC8vIGNvbnN0IGZvb3RlckhlaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvb3RlcicpLm9mZnNldEhlaWdodDtcblxuICAgIC8vIHNldCBtYXggc2l6ZSBmb3IgdGFzayBsaXN0XG4gICAgY29uc3QgbWF4SGVpZ2h0ID0gYm9keUhlaWdodCAtIGhlYWRlckhlaWdodCAtIGluc2V0SXRlbUhlaWdodCAtIGFzaWRlSGVpZ2h0IC0gbWFpblBhZGRpbmc7XG4gICAgbGlzdC5zdHlsZS5tYXhIZWlnaHQgPSBgJHttYXhIZWlnaHR9cHhgO1xuICB9IGVsc2UgbGlzdC5zdHlsZS5tYXhIZWlnaHQgPSAnbm9uZSc7XG59XG5cbmNvbnN0IHByb2plY3RzSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNwcm9qZWN0cycpO1xuY29uc3QgcHJvamVjdHNEcm9wZG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNwcm9qZWN0cyBkaXYnKTtcblxucHJvamVjdHNJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gIC8vIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gIGlmIChwcm9qZWN0c0Ryb3Bkb3duLmNsYXNzTGlzdC5jb250YWlucygnb3BhY2l0eS0wJykpIHtcbiAgICBwcm9qZWN0c0Ryb3Bkb3duLmNsYXNzTGlzdC5yZW1vdmUoJ29wYWNpdHktMCcpO1xuICAgIHByb2plY3RzRHJvcGRvd24uY2xhc3NMaXN0LmFkZCgnb3BhY2l0eS0xMDAnKTtcbiAgfSBlbHNlIHtcbiAgICBwcm9qZWN0c0Ryb3Bkb3duLmNsYXNzTGlzdC5yZW1vdmUoJ29wYWNpdHktMTAwJyk7XG4gICAgcHJvamVjdHNEcm9wZG93bi5jbGFzc0xpc3QuYWRkKCdvcGFjaXR5LTAnKTsgLy8gT2N1bHRhbmRvIGEgZGl2IHNlIGVzdGl2ZXIgdmlzw612ZWxcbiAgfVxufSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gIGlmICghZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJyNwcm9qZWN0cycpKSB7XG4gICAgcHJvamVjdHNEcm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKCdvcGFjaXR5LTEwMCcpO1xuICAgIHByb2plY3RzRHJvcGRvd24uY2xhc3NMaXN0LmFkZCgnb3BhY2l0eS0wJyk7XG4gIH1cbn0pO1xuXG5hZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdWlFZGl0SXRlbSk7XG5hZGRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgc2hvd1BsdXNCdG4pO1xuYWRkRmllbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBzaG93UGx1c0J0bik7XG5hZGRNb3JlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gZWRpdE1vcmUoaW5wdXQpKTtcbnF1aWNrU2F2ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGZhc3RTYXZlKGlucHV0KSk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gIHBvcHVsYXRlU3RvcmFnZSgpO1xuICB1aUNvbnRyb2wudXBkYXRlKCk7XG4gIGNvbnNvbGUubG9nKCdhdHVhbGl6b3UnKTtcbn0pO1xud2luZG93Lm9ubG9hZCA9IHJlc3RvcmVTdG9yYWdlKCk7XG5cbmNvbnN0IG1haW5Nb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNleGFtcGxlTW9kYWwnKTtcbm1haW5Nb2RhbC5hZGRFdmVudExpc3RlbmVyKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB7XG4gIGNvbnN0IG1vZGFsQm9keSA9IG1haW5Nb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtYm9keScpO1xuICBjbGVhckNvbnRlbnQobW9kYWxCb2R5KTtcbn0pO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHNldE1heEhlaWdodCk7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgc2V0TWF4SGVpZ2h0KTtcblxudWlDb250cm9sLmxvYWQoKTtcbiIsImltcG9ydCB7IHBvcHVsYXRlU3RvcmFnZSB9IGZyb20gJy4vSlNPTkZ1bmN0aW9ucyc7XG5pbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcbmltcG9ydCB1aUNvbnRyb2wgZnJvbSAnLi91aUNvbnRyb2xzJztcbmltcG9ydCB7XG4gIGR1ZURhdGVNYXNrLFxuICBzZWFyY2hQcm9qZWN0cyxcbiAgY3JlYXRlRWxlbWVudCxcbiAgY3JlYXRlUHJpb3JpdHlTZWxlY3QsXG59IGZyb20gJy4vdWlGdW5jdGlvbnMnO1xuXG5mdW5jdGlvbiBzYXZlKHRpdGxlLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCkge1xuICB0b2RvTGlzdC5hZGRJdGVtKHRpdGxlLnZhbHVlLCBkdWVEYXRlLnZhbHVlLCBwcmlvcml0eS52YWx1ZSwgcHJvamVjdC52YWx1ZSk7XG4gIHVpQ29udHJvbC51cGRhdGUoKTtcbiAgcG9wdWxhdGVTdG9yYWdlKCk7XG59XG5cbmZ1bmN0aW9uIHVpRWRpdEl0ZW0odGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSB7XG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2Lm1vZGFsLWJvZHknKTtcbiAgLy8gY3JlYXRpbmcgZWxlbWVudHNcbiAgY29uc3Qgcm93MSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncm93J10pO1xuICBjb25zdCB0aXRsZURpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnaW5wdXQtZ3JvdXAnLCAnbWItMycsICdnYXAtMSddKTtcbiAgY29uc3QgdGl0bGVJbnB1dCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgWydmb3JtLWNvbnRyb2wnXSwge1xuICAgIGlkOiAnaXRlbVRpdGxlJyxcbiAgICB0eXBlOiAndGV4dCcsXG4gICAgcGxhY2Vob2xkZXI6ICdOb3ZhIFRhcmVmYS4uLicsXG4gIH0pO1xuICBjb25zdCByb3cyID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydiZy1ncmF5JywgJ3JvdycsICdnLTAnLCAnZ2FwLTInLCAnZmxleC1ub3dyYXAnXSk7XG5cbiAgY29uc3QgZGF0ZURpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZGF0ZScsICdmbGF0cGlja3InLCAnY29sJ10pO1xuICBjb25zdCBkYXRlSW5wdXQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIFsnZm9ybS1jb250cm9sJywgJ2ZsYXRwaWNrci1pbnB1dCddLCB7XG4gICAgaWQ6ICdkdWVEYXRlJyxcbiAgICB0eXBlOiAndGV4dCcsXG4gICAgaW5wdXRtb2RlOiAnbnVtZXJpYycsXG4gICAgJ2RhdGEtaW5wdXQnOiB1bmRlZmluZWQsXG4gICAgYXV0b2NvbXBsZXRlOiAnb2ZmJyxcbiAgfSk7XG4gIGNvbnN0IGRhdGVwaWNrZXJUb2dnbGUgPSBjcmVhdGVFbGVtZW50KCdhJywgWydpbnB1dC1idXR0b24nXSwge1xuICAgIHRpdGxlOiAndG9nZ2xlJyxcbiAgICAnZGF0YS10b2dnbGUnOiB1bmRlZmluZWQsXG4gIH0pO1xuICBjb25zdCBkYXRlSWNvbiA9IGNyZWF0ZUVsZW1lbnQoJ2knLCBbJ3RleHQtd2FybmluZycsICdzbWFsbCcsICdiaScsICdiaS1jYWxlbmRhciddKTtcblxuICBjb25zdCBwcmlvcml0eURpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29sJ10pO1xuICBjb25zdCBzZWxlY3RQcmlvcml0eSA9ICh0eXBlb2YgcHJpb3JpdHkgIT09ICd1bmRlZmluZWQnKVxuICAgID8gY3JlYXRlUHJpb3JpdHlTZWxlY3QocHJpb3JpdHkpXG4gICAgOiBjcmVhdGVQcmlvcml0eVNlbGVjdCgpO1xuXG4gIGNvbnN0IHByb2plY3REaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbCddKTtcbiAgY29uc3QgcHJvamVjdElucHV0ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2Zvcm0tY29udHJvbCddLCB7XG4gICAgaWQ6ICdlbnRlclByb2plY3QnLFxuICAgIHR5cGU6ICd0ZXh0JyxcbiAgICBsaXN0OiAnZGF0YWxpc3RPcHRpb25zJyxcbiAgICBwbGFjZWhvbGRlcjogJ1Byb2pldG8nLFxuICAgIGF1dG9jb21wbGV0ZTogJ29mZicsXG4gIH0pO1xuICBjb25zdCBwcm9qZWN0RGF0YWxpc3QgPSBjcmVhdGVFbGVtZW50KCdkYXRhbGlzdCcsIFsnc3VnZ2VzdGlvbnMnLCAnZm9ybSddLCB7XG4gICAgaWQ6ICdkYXRhbGlzdE9wdGlvbnMnLFxuICAgIGRyb3B6b25lOiAnc3RyaW5nJyxcbiAgfSk7XG5cbiAgY29uc3Qgcm93MyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncm93JywgJ3B0LTInXSk7XG5cbiAgY29uc3Qgbm90ZXNDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbnRhaW5lciddKTtcbiAgY29uc3Qgbm90ZXNIZWFkZXIgPSBjcmVhdGVFbGVtZW50KCdoNicpO1xuICBjb25zdCBub3Rlc1JvdyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncm93JywgJ2ctMiddKTtcblxuICBjb25zdCBhZGROb3RlUm93ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnLCAncHQtMicsICdqdXN0aWZ5LWNvbnRlbnQtZW5kJ10pO1xuXG4gIGNvbnN0IGFkZE5vdGVEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbC1hdXRvJywgJ3NtYWxsJywgJ3RleHQtZGFuZ2VyJywgJ3RleHQtd2FybmluZy1lbXBoYXNpcyddKTtcbiAgY29uc3QgYWRkTm90ZUxpbmsgPSBjcmVhdGVFbGVtZW50KCdhJywgW10sIHsgaWQ6ICdhZGROb3RlJyB9KTtcbiAgY29uc3QgYWRkTm90ZUljb24gPSBjcmVhdGVFbGVtZW50KCdpJywgWydiaScsICdiaS1wbHVzLWNpcmNsZSddKTtcbiAgY29uc3QgYWRkTm90ZVRleHQgPSBjcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgY29uc3Qgcm93NCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncm93JywgJ2ctMicsICdwdC0zJywgJ2p1c3RpZnktY29udGVudC1zdGFydCcsICdmbGV4LXJvdy1yZXZlcnNlJ10pO1xuXG4gIGNvbnN0IHNhdmVEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbC1hdXRvJ10pO1xuICBjb25zdCBzYXZlQnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgWydidG4nLCAnYnRuLXdhcm5pbmcnLCAndGV4dC1saWdodCddLCB7XG4gICAgJ2RhdGEtYnMtZGlzbWlzcyc6ICdtb2RhbCcsXG4gIH0pO1xuICBjb25zdCBjYW5jZWxEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbC1hdXRvJ10pO1xuICBjb25zdCBjYW5jZWxCdG4gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2J0bicsICdidG4tc2Vjb25kYXJ5JywgJ3RleHQtbGlnaHQnXSwge1xuICAgICdkYXRhLWJzLWRpc21pc3MnOiAnbW9kYWwnLFxuICB9KTtcblxuICAvLyBhcHBlbmQgZWxlbWVudHNcblxuICAvLyByb3cgMSAodGl0bGUpXG4gIGlmICh0eXBlb2YgdGl0bGUudmFsdWUgIT09ICd1bmRlZmluZWQnKSB0aXRsZUlucHV0LnZhbHVlID0gdGl0bGUudmFsdWU7XG4gIHRpdGxlRGl2LmFwcGVuZENoaWxkKHRpdGxlSW5wdXQpO1xuXG4gIHJvdzEuYXBwZW5kQ2hpbGQodGl0bGVEaXYpO1xuXG4gIC8vIHJvdyAyIChkYXRlLCBwcmlvcml0eSwgcHJvamVjdClcblxuICAvLyBkYXRlXG4gIGlmICh0eXBlb2YgZHVlRGF0ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgZHVlRGF0ZSAhPT0gMCkgZGF0ZUlucHV0LnZhbHVlID0gZHVlRGF0ZTtcbiAgZGF0ZXBpY2tlclRvZ2dsZS5hcHBlbmRDaGlsZChkYXRlSWNvbik7XG4gIGRhdGVEaXYuYXBwZW5kKGRhdGVJbnB1dCwgZGF0ZXBpY2tlclRvZ2dsZSk7XG5cbiAgLy8gcHJpb3JpdHlcbiAgcHJpb3JpdHlEaXYuYXBwZW5kQ2hpbGQoc2VsZWN0UHJpb3JpdHkpO1xuXG4gIC8vIHByb2plY3RcbiAgaWYgKHR5cGVvZiBwcm9qZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBwcm9qZWN0ICE9PSAwKSBkYXRlSW5wdXQudmFsdWUgPSBwcm9qZWN0O1xuICBwcm9qZWN0RGl2LmFwcGVuZChwcm9qZWN0SW5wdXQsIHByb2plY3REYXRhbGlzdCk7XG5cbiAgcm93Mi5hcHBlbmQoZGF0ZURpdiwgcHJpb3JpdHlEaXYsIHByb2plY3REaXYpO1xuXG4gIC8vIHJvdzMgKG5vdGVzIGFyZWEpXG4gIG5vdGVzSGVhZGVyLnRleHRDb250ZW50ID0gJ05vdGFzJztcbiAgYWRkTm90ZVRleHQudGV4dENvbnRlbnQgPSAnTm92YSBub3RhJztcbiAgYWRkTm90ZUljb24udGV4dENvbnRlbnQgPSAnICc7IC8vIGZpeGluZyBhIHByb2JsZW0gZm9yIHVzaW5nIGpzXG5cbiAgYWRkTm90ZUxpbmsuYXBwZW5kKGFkZE5vdGVJY29uLCBhZGROb3RlVGV4dCk7XG4gIGFkZE5vdGVEaXYuYXBwZW5kQ2hpbGQoYWRkTm90ZUxpbmspO1xuICBhZGROb3RlUm93LmFwcGVuZENoaWxkKGFkZE5vdGVEaXYpO1xuICBub3Rlc1Jvdy5hcHBlbmRDaGlsZChhZGROb3RlUm93KTtcbiAgbm90ZXNDb250YWluZXIuYXBwZW5kKG5vdGVzSGVhZGVyLCBub3Rlc1Jvdyk7XG5cbiAgcm93My5hcHBlbmRDaGlsZChub3Rlc0NvbnRhaW5lcik7XG5cbiAgLy8gcm93NCAoYnV0dG9ucylcbiAgY2FuY2VsQnRuLnRleHRDb250ZW50ID0gJ0NhbmNlbCc7XG4gIHNhdmVCdG4udGV4dENvbnRlbnQgPSAnU2F2ZSc7XG4gIHNhdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzYXZlKHRpdGxlSW5wdXQsIGRhdGVJbnB1dCwgcHJvamVjdElucHV0LCBwcm9qZWN0SW5wdXQpKTtcbiAgc2F2ZURpdi5hcHBlbmRDaGlsZChzYXZlQnRuKTtcbiAgY2FuY2VsRGl2LmFwcGVuZENoaWxkKGNhbmNlbEJ0bik7XG5cbiAgcm93NC5hcHBlbmQoc2F2ZURpdiwgY2FuY2VsRGl2KTtcblxuICBtb2RhbC5hcHBlbmQocm93MSwgcm93Miwgcm93Mywgcm93NCk7XG4gIGR1ZURhdGVNYXNrKCk7XG4gIHNlYXJjaFByb2plY3RzKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHVpRWRpdEl0ZW07XG4iLCJpbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcbmltcG9ydCB7IGNsZWFyQ29udGVudCB9IGZyb20gJy4vdWlGdW5jdGlvbnMnO1xuaW1wb3J0IGFkZExpbmUgZnJvbSAnLi91aUxpc3RHZW5lcmF0b3InO1xuXG5jb25zdCBsb2FkTGlzdCA9ICgpID0+IFsuLi50b2RvTGlzdC5hbGxUYXNrc0xpc3QoKV07XG5jb25zdCBzb3J0UGFyYW0gPSAoYXJyLCBwYXJhbSkgPT4gWy4uLmFycl1cbiAgLnNvcnQoKGEsIGIpID0+ICgoYVtwYXJhbV0gPCBiW3BhcmFtXSkgPyAtMSA6IDEpKTtcblxuLy8gVUkgQ29udHJvbGxlclxuY29uc3QgdWlDb250cm9sID0gKCgpID0+IHtcbiAgbGV0IGN1cnJlbnRGaWx0ZXIgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIHNldEN1cnJlbnRGaWx0ZXIoa2V5LCB2YWx1ZSkge1xuICAgIGlmIChrZXkpIGN1cnJlbnRGaWx0ZXIgPSB7IGtleSwgdmFsdWUgfTtcbiAgICBlbHNlIGN1cnJlbnRGaWx0ZXIgPSBudWxsO1xuICB9XG5cbiAgY29uc3QgZmlsdGVyQXJyYXkgPSAoYXJyLCBmaWx0ZXIsIHZhbHVlKSA9PiB7XG4gICAgaWYgKGZpbHRlcikgcmV0dXJuIFsuLi5hcnIuZmlsdGVyKChvYmpldG8pID0+IG9iamV0b1tmaWx0ZXJdID09PSB2YWx1ZSldO1xuICAgIHJldHVybiBhcnI7XG4gIH07XG5cbiAgZnVuY3Rpb24gbG9hZCgpIHtcbiAgICBjb25zdCB1aUxpc3QgPSBzb3J0UGFyYW0obG9hZExpc3QoKSwgJ2NoZWNrZWQnKTtcbiAgICBpZiAoY3VycmVudEZpbHRlciAhPT0gbnVsbCkge1xuICAgICAgZmlsdGVyQXJyYXkodWlMaXN0LCBjdXJyZW50RmlsdGVyLmtleSwgY3VycmVudEZpbHRlci52YWx1ZSlcbiAgICAgICAgLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gbG9hZExpc3QoKS5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IG9iai5pZCk7XG4gICAgICAgICAgYWRkTGluZShvYmosIGluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVpTGlzdC5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBsb2FkTGlzdCgpLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gb2JqLmlkKTtcbiAgICAgICAgYWRkTGluZShvYmosIGluZGV4KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZShmaWx0ZXIsIHZhbHVlKSB7XG4gICAgY2xlYXJDb250ZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsaXN0JykpO1xuICAgIGlmIChmaWx0ZXIpIHNldEN1cnJlbnRGaWx0ZXIoZmlsdGVyLCB2YWx1ZSk7XG4gICAgaWYgKGZpbHRlciA9PT0gZmFsc2UpIHNldEN1cnJlbnRGaWx0ZXIoKTtcbiAgICBsb2FkKCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGxvYWQsXG4gICAgdXBkYXRlLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdWlDb250cm9sO1xuIiwiaW1wb3J0IGZsYXRwaWNrciBmcm9tICdmbGF0cGlja3InO1xuaW1wb3J0IHsgUG9ydHVndWVzZSB9IGZyb20gJ2ZsYXRwaWNrci9kaXN0L2wxMG4vcHQnO1xuaW1wb3J0IElNYXNrIGZyb20gJ2ltYXNrJztcbmltcG9ydCB7IG1hc2tEYXRlIH0gZnJvbSAnLi9kYXRlJztcbmltcG9ydCB0b2RvTGlzdCBmcm9tICcuL2NvcmUnO1xuXG5leHBvcnQgY29uc3QgaXNDaGVja2VkID0gKGUpID0+IGUuY2hlY2tlZCA9PT0gdHJ1ZTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRQYXJlbnROb2RlKGVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUpIHtcbiAgbGV0IHsgcGFyZW50Tm9kZSB9ID0gZWxlbWVudDtcblxuICB3aGlsZSAocGFyZW50Tm9kZSkge1xuICAgIGlmIChwYXJlbnROb2RlLmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKSkge1xuICAgICAgcmV0dXJuIHBhcmVudE5vZGU7XG4gICAgfVxuICAgIHBhcmVudE5vZGUgPSBwYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gIH1cblxuICByZXR1cm4gbnVsbDsgLy8gUmV0b3JuYSBudWxsIHNlIG7Do28gZW5jb250cm91IG5lbmh1bSBuw7MgcGFpIGNvbSBvIGF0cmlidXRvIGRlc2VqYWRvXG59XG5cbi8vIHN0YXJ0IG9uTG9hZFxuXG5jb25zdCBzcGVjaWFsQ2hhcnNFbnRyaWVzID0gW1xuICBbJ8OAw4HDgsODw4TDhScsICdBJ10sXG4gIFsnw6DDocOiw6PDpMOlJywgJ2EnXSxcbiAgWyfDiMOJw4rDiycsICdFJ10sXG4gIFsnw6jDqcOqw6snLCAnZSddLFxuICBbJ8OMw43DjsOPJywgJ0knXSxcbiAgWyfDrMOtw67DrycsICdpJ10sXG4gIFsnw5LDk8OVw5TDlicsICdPJ10sXG4gIFsnw7LDs8O1w7TDticsICdvJ10sXG4gIFsnw5nDmsObw5wnLCAnVSddLFxuICBbJ8O5w7rDu8O8JywgJ3UnXSxcbiAgWyfDhycsICdDJ10sXG4gIFsnw6cnLCAnYyddLFxuXTtcblxuY29uc3Qgc3BlY2lhbENoYXJzTWFwID0gT2JqZWN0LmZyb21FbnRyaWVzKFxuICBzcGVjaWFsQ2hhcnNFbnRyaWVzLmZsYXRNYXAoKFtjaGFycywgdmFsdWVdKSA9PiBbLi4uY2hhcnNdLm1hcCgoY2hhcikgPT4gW2NoYXIsIHZhbHVlXSkpLFxuKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldEF0dHJzKGVsZW0sIGF0dHJzKSB7XG4gIE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQgJiYgYXR0cnNba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBlbGVtLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtLnNldEF0dHJpYnV0ZShrZXksICcnKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWcsIGNsYXNzTmFtZXMgPSBbXSwgYXR0cmlidXRlcyA9IHt9KSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gIGlmIChjbGFzc05hbWVzLmxlbmd0aCkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzTmFtZXMpO1xuICBzZXRBdHRycyhlbGVtZW50LCBhdHRyaWJ1dGVzKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPcHRpb24odmFsdWUsIHRleHQsIHNlbGVjdGVkID0gZmFsc2UpIHtcbiAgY29uc3Qgb3B0aW9uID0gY3JlYXRlRWxlbWVudCgnb3B0aW9uJywgW10sIHsgdmFsdWUgfSk7XG4gIG9wdGlvbi50ZXh0Q29udGVudCA9IHRleHQ7XG4gIGlmIChzZWxlY3RlZCkge1xuICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJ3NlbGVjdGVkJyk7XG4gIH1cbiAgcmV0dXJuIG9wdGlvbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyQ29udGVudChlbGVtKSB7XG4gIHdoaWxlIChlbGVtLmZpcnN0Q2hpbGQpIHtcbiAgICBlbGVtLnJlbW92ZUNoaWxkKGVsZW0ubGFzdENoaWxkKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJpb3JpdHlTZWxlY3QobnVtID0gMCkge1xuICBjb25zdCBzZWxlY3QgPSBjcmVhdGVFbGVtZW50KCdzZWxlY3QnLCBbJ2Zvcm0tc2VsZWN0J10sIHtcbiAgICAnYXJpYS1sYWJlbCc6ICdQcmlvcmlkYWRlJyxcbiAgfSk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSArPSAxKSB7XG4gICAgY29uc3QgdGV4dCA9IGkgPT09IDAgPyAnUHJpb3JpZGFkZScgOiBgUHJpb3JpZGFkZSAke2l9YDtcbiAgICBjb25zdCBzZWxlY3RlZCA9IGkgPT09IG51bTtcbiAgICBjb25zdCBvcHRpb24gPSBjcmVhdGVPcHRpb24oaSwgdGV4dCwgc2VsZWN0ZWQpO1xuICAgIHNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICB9XG4gIHJldHVybiBzZWxlY3Q7XG59XG5cbi8vIEFERC9FRElUIE5FVyBUQVNLIFNDUkVFTiBGVU5DVElPTlNcblxuZnVuY3Rpb24gcmVtb3ZlU3BlY2lhbHModGV4dCkge1xuICBsZXQgc2VhcmNoID0gdGV4dDtcbiAgc2VhcmNoID0gc2VhcmNoLnJlcGxhY2UoXG4gICAgL1vDgC3DnMOgLcO8XS9nLFxuICAgIChtYXRjaCkgPT4gc3BlY2lhbENoYXJzTWFwW21hdGNoXSB8fCBtYXRjaCxcbiAgKTtcbiAgcmV0dXJuIHNlYXJjaDtcbn1cbi8vIHByb2plY3RzIGRhdGFsaXN0IGF1dG9jb21wbGV0ZVxuZnVuY3Rpb24gYXV0b0NvbXBsZXRlKHNlYXJjaCkge1xuICBjb25zdCBwcm9qZWN0cyA9IHRvZG9MaXN0LmdldFByb2plY3RzKCk7XG4gIHJldHVybiBwcm9qZWN0cy5maWx0ZXIoKHZhbHVlKSA9PiB7XG4gICAgY29uc3QgdmFsdWVMb3dlcmNhc2UgPSByZW1vdmVTcGVjaWFscyh2YWx1ZS50b0xvd2VyQ2FzZSgpKTtcbiAgICBjb25zdCBzZWFyY2hMb3dlcmNhc2UgPSByZW1vdmVTcGVjaWFscyhzZWFyY2gudG9Mb3dlckNhc2UoKSk7XG4gICAgcmV0dXJuIHZhbHVlTG93ZXJjYXNlLmluY2x1ZGVzKHNlYXJjaExvd2VyY2FzZSk7XG4gIH0pO1xufVxuXG4vLyBjYWxsaW5nIGZ1bmN0aW9ucyB0byBhdXRvY29tcGxldGUgUHJvamVjdCBmaWVsZFxuXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoUHJvamVjdHMoKSB7XG4gIGNvbnN0IGlucHV0UHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbnRlclByb2plY3QnKTtcbiAgY29uc3QgZGF0YWxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkYXRhbGlzdCcpO1xuICBpbnB1dFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoeyB0YXJnZXQgfSkgPT4ge1xuICAgIGNvbnN0IGlucHV0RGF0YSA9IHRhcmdldC52YWx1ZTtcbiAgICBpZiAoaW5wdXREYXRhLmxlbmd0aCkge1xuICAgICAgY29uc3QgYXV0b0NvbXBsZXRlT3B0aW9ucyA9IGF1dG9Db21wbGV0ZShpbnB1dERhdGEpO1xuICAgICAgZGF0YWxpc3QuaW5uZXJIVE1MID0gYCR7YXV0b0NvbXBsZXRlT3B0aW9uc1xuICAgICAgICAubWFwKCh2YWx1ZSkgPT4gYDxvcHRpb24gdmFsdWU9XCIke3ZhbHVlfVwiIC8+YClcbiAgICAgICAgLmpvaW4oJycpfWA7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gREFURVBJQ0tFUiBBTkQgTUFTSyBGVU5DVElPTlNcblxuZXhwb3J0IGZ1bmN0aW9uIGR1ZURhdGVNYXNrKCkge1xuICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2R1ZURhdGUnKTtcbiAgY29uc3QgZmxhdEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuZmxhdHBpY2tyJyk7XG5cbiAgLy8gYXBwbHkgbWFzayB0byBkdWVEYXRlRmllbGRcbiAgY29uc3QgbWFzayA9IElNYXNrKGR1ZURhdGUsIG1hc2tEYXRlKTtcblxuICAvLyBhcHBseSBmbGF0cGlja3IgZGF0ZXBpY2tlciB0byBhbGwgZWxlbWVudHMgaW4gYSBkaXZcbiAgLy8gKGljb24gdG9nZ2xlIGFuZCBpbnB1dCBkYXRlIHVzaW5nIGRhdGEtIGF0dHJpYnV0ZXMpXG4gIGZsYXRwaWNrcihmbGF0RWxlbSwge1xuICAgIGRhdGVGb3JtYXQ6ICdkL20vWScsXG4gICAgZGlzYWJsZU1vYmlsZTogJ3RydWUnLFxuICAgIGFsbG93SW5wdXQ6IHRydWUsXG4gICAgd3JhcDogdHJ1ZSxcbiAgICBsb2NhbGU6IFBvcnR1Z3Vlc2UsXG4gICAgb25DaGFuZ2Uoc2VsZWN0ZWREYXRlcywgZGF0ZVN0cikge1xuICAgICAgbWFzay51cGRhdGVWYWx1ZShkYXRlU3RyKTtcbiAgICB9LFxuICB9KTtcbn1cblxuLy8gbWFpbiBzY3JlZW4gaW50ZXJhY3Rpb25zXG4vLyBjaGVjayB2aXN1YWwgZWZmZWN0XG5leHBvcnQgZnVuY3Rpb24gc2V0TGluZVRocm91Z2goZSkge1xuICBjb25zdCB0ZXh0ID0gZS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gIGlmIChpc0NoZWNrZWQoZSkpIHtcbiAgICB0ZXh0LmNsYXNzTGlzdC5hZGQoJ3RleHQtZGVjb3JhdGlvbi1saW5lLXRocm91Z2gnKTtcbiAgfSBlbHNlIHtcbiAgICB0ZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ3RleHQtZGVjb3JhdGlvbi1saW5lLXRocm91Z2gnKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgYWRkRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCNpdGVtVGl0bGUnKTtcbmV4cG9ydCBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG5leHBvcnQgY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2EjYWRkSXRlbScpO1xuZXhwb3J0IGNvbnN0IGFkZE1vcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24jYWRkTW9yZScpO1xuZXhwb3J0IGNvbnN0IHF1aWNrU2F2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbiNzYXZlSXRlbScpO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hvd1BsdXNCdG4oKSB7XG4gIC8vIEVuY29udHJhIG8gYm90w6NvICtcbiAgY29uc3QgcGx1c0J0biA9IGFkZEZpZWxkLm5leHRFbGVtZW50U2libGluZztcbiAgY29uc3Qgc2F2ZUJ0biA9IHBsdXNCdG4ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAvLyBTZSBvIHZhbG9yIGRvIGNhbXBvIHTDrXR1bG8gZm9yIGRpZmVyZW50ZSBkZSB2YXppbyxcbiAgLy8gZW50w6NvIGVsZSByZXZlbGEgbyBib3TDo28gK1xuICBpZiAoYWRkRmllbGQudmFsdWUgIT09ICcnKSB7XG4gICAgcGx1c0J0bi5jbGFzc0xpc3QuYWRkKCdyZXZlYWxJdGVtJyk7XG4gICAgc2F2ZUJ0bi5jbGFzc0xpc3QuYWRkKCdyZXZlYWxJdGVtJyk7XG4gIH1cbiAgLy8gY2FzbyBjb250csOhcmlvLCBzZSB2b2PDqiBhcGFnYXIgdG9kbyBvIHTDrXR1bG9cbiAgLy8gZWxlIGTDoSBkaXNwbGF5OiBub25lLCBubyBib3TDo28gK1xuICBpZiAoYWRkRmllbGQudmFsdWUgPT09ICcnICYmIHBsdXNCdG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdyZXZlYWxJdGVtJykpIHtcbiAgICBwbHVzQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3JldmVhbEl0ZW0nKTtcbiAgICBzYXZlQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3JldmVhbEl0ZW0nKTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbmltcG9ydCB7IHBvcHVsYXRlU3RvcmFnZSB9IGZyb20gJy4vSlNPTkZ1bmN0aW9ucyc7XG5pbXBvcnQge1xuICBpc0NoZWNrZWQsXG4gIGNyZWF0ZUVsZW1lbnQsXG4gIGZpbmRQYXJlbnROb2RlLFxuICBzZXRMaW5lVGhyb3VnaCxcbn0gZnJvbSAnLi91aUZ1bmN0aW9ucyc7XG5cbmltcG9ydCB0b2RvTGlzdCBmcm9tICcuL2NvcmUnO1xuXG5jb25zdCBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2I2xpc3QnKTtcbmNvbnN0IGhhc05vdGVzID0gKG9iaikgPT4gb2JqLmxlbmd0aCA+IDA7XG5cbmZ1bmN0aW9uIGFkZENoZWNrZWQoY2hlY2tib3gsIGJ1dHRvbikge1xuICBjaGVja2JveC5jaGVja2VkID0gdHJ1ZTtcbiAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3RleHQtZGVjb3JhdGlvbi1saW5lLXRocm91Z2gnKTtcbn1cblxuZnVuY3Rpb24gaW5zZXJ0Tm90ZShub3RlcywgYm9keSkge1xuICBub3Rlcy5mb3JFYWNoKChjb250ZW50KSA9PiB7XG4gICAgY29uc3QgY29udGVudERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnRlbnREaXYuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICBib2R5LmFwcGVuZENoaWxkKGNvbnRlbnREaXYpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0Q2hlY2tlZEhhbmRsZXIoZSkge1xuICBjb25zdCB7IHRhcmdldCB9ID0gZTtcbiAgY29uc3QgcG9zID0gZmluZFBhcmVudE5vZGUodGFyZ2V0LCAnZGF0YS1wb3NpdGlvbicpLmdldEF0dHJpYnV0ZSgnZGF0YS1wb3NpdGlvbicpO1xuICB0b2RvTGlzdC5zZWxlY3RJdGVtKHBvcykuZWRpdENoZWNrKCk7XG4gIHNldExpbmVUaHJvdWdoKHRhcmdldCk7XG59XG5cbmZ1bmN0aW9uIGFkZExpbmUob2JqLCBudW0pIHtcbiAgLy8gTElTVCBJVEVNIC0tLS0tLVxuXG4gIC8vIGhlYWRlclxuICBjb25zdCBpdGVtID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydhY2NvcmRpb24taXRlbSddLCB7XG4gICAgJ2RhdGEtcG9zaXRpb24nOiBgJHtudW19YCxcbiAgfSk7XG4gIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoJ2gyJywgWydhY2NvcmRpb24taGVhZGVyJywgJ3AtMScsICdkLWZsZXgnLCAnYWxpZ24taXRlbXMtY2VudGVyJywgJ2dhcC0xJ10pO1xuICBjb25zdCBjaGVja2JveCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgWydmb3JtLWNoZWNrLWlucHV0JywgJ3RleHQtYmctd2FybmluZyddLCB7IHR5cGU6ICdjaGVja2JveCcgfSk7XG4gIGNvbnN0IGJ0bkhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIFsnYWNjb3JkaW9uLWJ1dHRvbicsICdjb2xsYXBzZWQnLCAnZmxleC1maWxsJ10sIHtcbiAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAnZGF0YS1icy10b2dnbGUnOiAnY29sbGFwc2UnLFxuICAgICdhcmlhLWV4cGFuZGVkJzogJ2ZhbHNlJyxcbiAgICAnZGF0YS1icy10YXJnZXQnOiBgI2l0ZW0tJHtudW19YCxcbiAgfSk7XG4gIGNvbnN0IHNwYW4gPSBjcmVhdGVFbGVtZW50KCdzcGFuJywgWydmbGV4LWZpbGwnXSk7XG4gIGNvbnN0IGNvZGUgPSBjcmVhdGVFbGVtZW50KCdjb2RlJywgWydzbWFsbCcsICd0ZXh0LW11dGVkJ10pO1xuXG4gIC8vIGJvZHlcbiAgY29uc3QgaXRlbURldGFpbHMgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2FjY29yZGlvbi1jb2xsYXBzZScsICdjb2xsYXBzZSddLCB7XG4gICAgaWQ6IGBpdGVtLSR7bnVtfWAsXG4gIH0pO1xuICBjb25zdCBpdGVtQm9keSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnYWNjb3JkaW9uLWJvZHknXSk7XG5cbiAgY29uc3QgYnRuRWRpdCA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIFsnYnRuJywgJ2J0bi13YXJuaW5nJ10pO1xuICBjb25zdCBidG5EZWxldGUgPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2J0bicsICdidG4tZGFuZ2VyJ10pO1xuXG4gIC8vIEVWRU5UTElTVE5FUlMgT0JKRUNUU1xuICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBzZXRDaGVja2VkSGFuZGxlcik7XG4gIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHBvcHVsYXRlU3RvcmFnZSk7XG5cbiAgLy8gRklMTElORyBDT05URU5UXG4gIC8vIGhlYWRlclxuICBzcGFuLnRleHRDb250ZW50ID0gb2JqLnRpdGxlO1xuICBjb2RlLnRleHRDb250ZW50ID0gb2JqLnByb2plY3Q7XG5cbiAgLy8gYm9keVxuICBidG5FZGl0LnRleHRDb250ZW50ID0gJ0VkaXQnO1xuICBidG5EZWxldGUudGV4dENvbnRlbnQgPSAnRGVsZXRlJztcblxuICAvLyBBcHBlbmRpbmcgY29udGVudFxuICBidG5IZWFkZXIuYXBwZW5kKHNwYW4sIGNvZGUpO1xuICBoZWFkZXIuYXBwZW5kKGNoZWNrYm94LCBidG5IZWFkZXIpO1xuXG4gIC8vIEJvZHkgY29udGVudFxuICBpZiAoaGFzTm90ZXMob2JqLm5vdGVzKSkge1xuICAgIGluc2VydE5vdGUob2JqLm5vdGVzLCBpdGVtQm9keSk7XG4gIH1cbiAgaXRlbURldGFpbHMuYXBwZW5kQ2hpbGQoaXRlbUJvZHkpO1xuXG4gIC8vIEFwcGVuZCBlbGVtZW50cyB0byBsaXN0XG4gIGl0ZW0uYXBwZW5kKGhlYWRlciwgaXRlbURldGFpbHMpO1xuICBsaXN0LmFwcGVuZENoaWxkKGl0ZW0pO1xuICBpZiAoaXNDaGVja2VkKG9iaikpIGFkZENoZWNrZWQoY2hlY2tib3gsIGJ0bkhlYWRlcik7XG59XG5leHBvcnQgZGVmYXVsdCBhZGRMaW5lO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua3RvZG9fbGlzdFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt0b2RvX2xpc3RcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcIjNyZHBhcnRcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKDcyNzMpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=