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







_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.addTask.addEventListener('click', _uiAddItemConstructor__WEBPACK_IMPORTED_MODULE_3__["default"]);

// adiciona evento pra quando se começa a digitar
// e quando se para de digitar o título do item.
_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.addField.addEventListener('keydown', _uiFunctions__WEBPACK_IMPORTED_MODULE_5__.showPlusBtn);
_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.addField.addEventListener('keyup', _uiFunctions__WEBPACK_IMPORTED_MODULE_5__.showPlusBtn);
_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.addMore.addEventListener('click', () => (0,_uiAddItemConstructor__WEBPACK_IMPORTED_MODULE_3__.editMore)(_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.input));
_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.quickSave.addEventListener('click', () => (0,_uiControls__WEBPACK_IMPORTED_MODULE_4__.fastSave)(_uiFunctions__WEBPACK_IMPORTED_MODULE_5__.input));

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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   editMore: () => (/* binding */ editMore)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ 3317);
/* harmony import */ var _uiControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uiControls */ 6042);
/* harmony import */ var _uiFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uiFunctions */ 1363);



/* eslint-disable no-unused-vars */

function save(title, dueDate, priority, project) {
  _core__WEBPACK_IMPORTED_MODULE_0__["default"].addItem(title.value, dueDate.value, priority.value, project.value);
  _uiControls__WEBPACK_IMPORTED_MODULE_1__.uiControl.update();
}
function uiEditItem(title, dueDate, priority, project) {
  const modal = document.querySelector('div.modal-body');
  // creating elements
  const row1 = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', ['row']);
  const titleDiv = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', ['input-group', 'mb-3', 'gap-1']);
  const titleInput = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('input', ['form-control'], {
    id: 'itemTitle',
    type: 'text',
    placeholder: 'Nova Tarefa...',
  });
  const row2 = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', ['bg-gray', 'row', 'g-0', 'gap-2', 'flex-nowrap']);

  const dateDiv = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', ['date', 'flatpickr', 'col']);
  const dateInput = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('input', ['form-control', 'flatpickr-input'], {
    id: 'dueDate',
    type: 'text',
    inputmode: 'numeric',
    'data-input': undefined,
    autocomplete: 'off',
  });
  const datepickerToggle = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('a', ['input-button'], {
    title: 'toggle',
    'data-toggle': undefined,
  });
  const dateIcon = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('i', ['text-warning', 'small', 'bi', 'bi-calendar']);

  const priorityDiv = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', ['col']);
  const selectPriority = (typeof priority !== 'undefined')
    ? (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createPrioritySelect)(priority)
    : (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createPrioritySelect)();

  const projectDiv = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', ['col']);
  const projectInput = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('input', ['form-control'], {
    id: 'enterProject',
    type: 'text',
    list: 'datalistOptions',
    placeholder: 'Projeto',
    autocomplete: 'off',
  });
  const projectDatalist = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('datalist', ['suggestions', 'form'], {
    id: 'datalistOptions',
    dropzone: 'string',
  });

  const row3 = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', ['row', 'pt-2']);

  const notesContainer = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', ['container']);
  const notesHeader = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('h6');
  const notesRow = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', ['row', 'g-2']);

  const addNoteRow = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', ['row', 'pt-2', 'justify-content-end']);

  const addNoteDiv = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', ['col-auto', 'small', 'text-danger', 'text-warning-emphasis']);
  const addNoteLink = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('a', [], { id: 'addNote' });
  const addNoteIcon = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('i', ['bi', 'bi-plus-circle']);
  const addNoteText = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('span');

  const row4 = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', ['row', 'g-2', 'pt-3', 'justify-content-start', 'flex-row-reverse']);

  const saveDiv = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', ['col-auto']);
  const saveBtn = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('button', ['btn', 'btn-warning', 'text-light'], {
    'data-bs-dismiss': 'modal',
  });
  const cancelDiv = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', ['col-auto']);
  const cancelBtn = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('button', ['btn', 'btn-secondary', 'text-light'], {
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
  (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.dueDateMask)();
  (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_2__.searchProjects)();
}

function editMore(title) {
  uiEditItem(title);
  title.value = '';
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
/* harmony export */   fastSave: () => (/* binding */ fastSave),
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

function fastSave(title) {
  _core__WEBPACK_IMPORTED_MODULE_0__["default"].addItem(title.value);
  uiControl.update();
}

function setChecked(e) {
  const { target } = e;
  const pos = (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_1__.findParentNode)(target, 'data-position').getAttribute('data-position');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9KU09ORnVuY3Rpb25zLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvY29yZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL2RhdGUuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9zY3JpcHQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy91aUFkZEl0ZW1Db25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL3VpQ29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy91aUZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL3VpTGlzdEdlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcbi8vIGltcG9ydCBhZGRMaW5lIGZyb20gJy4vdWlMaXN0R2VuZXJhdG9yJztcblxuZXhwb3J0IGZ1bmN0aW9uIHBvcHVsYXRlU3RvcmFnZSgpIHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhdGEnLCB0b2RvTGlzdC50b0pTT04oKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXN0b3JlU3RvcmFnZSgpIHtcbiAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXRhJykgPT09IG51bGwpIHJldHVybjtcbiAgdG9kb0xpc3QucmVzdG9yZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGF0YScpKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbm5lY3QoKSB7XG4gIGNvbnN0IHJlcXVlc3RVUkwgPSAnLi9hc3NldHMvZGF0YS5qc29uJztcbiAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IGZldGNoKHJlcXVlc3RVUkwpO1xuICBpZiAoIXJlcXVlc3Qub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIFN0YXR1czogJHtyZXF1ZXN0LnN0YXR1c31gKTtcbiAgfVxuXG4gIHJldHVybiByZXF1ZXN0O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcG9wdWxhdGUoKSB7XG4gIGNvbnN0IHZhbHVlID0gYXdhaXQgY29ubmVjdCgpO1xuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0KCkge1xuICB0b2RvTGlzdC5yZXN0b3JlKHBvcHVsYXRlKCkpO1xufVxuIiwiZnVuY3Rpb24gQ3JlYXRlSXRlbShudW0sIHRleHQsIGRlYWRsaW5lID0gMCwgcHJvamVjdCA9IG51bGwsIHByaW9yaXR5TnVtID0gMCwgY2hlY2sgPSBmYWxzZSkge1xuICBsZXQgdGl0bGUgPSB0ZXh0O1xuICBsZXQgZHVlRGF0ZSA9IGRlYWRsaW5lO1xuICBsZXQgcHJvamVjdE5hbWUgPSBwcm9qZWN0O1xuICBsZXQgcHJpb3JpdHkgPSBwcmlvcml0eU51bTtcbiAgbGV0IGNoZWNrZWQgPSBjaGVjaztcbiAgY29uc3QgaWQgPSBudW07XG4gIGNvbnN0IG5vdGVzID0gW107XG5cbiAgZnVuY3Rpb24gZWRpdFRpdGxlKHZhbCkgeyB0aXRsZSA9IHZhbDsgfVxuICBjb25zdCBnZXRUaXRsZSA9ICgpID0+IHRpdGxlO1xuICBmdW5jdGlvbiBlZGl0UHJpb3JpdHkodmFsKSB7IHByaW9yaXR5ID0gdmFsOyB9XG4gIGNvbnN0IGdldFByaW9yaXR5ID0gKCkgPT4gcHJpb3JpdHk7XG4gIGZ1bmN0aW9uIGRlbGV0ZUR1b0RhdGUoKSB7IGR1ZURhdGUgPSAwOyB9XG4gIGZ1bmN0aW9uIGVkaXREdWVEYXRlKHZhbCkgeyBkdWVEYXRlID0gdmFsOyB9XG4gIGNvbnN0IGdldER1ZURhdGUgPSAoKSA9PiBkdWVEYXRlO1xuICBmdW5jdGlvbiBlZGl0UHJvamVjdCh2YWwpIHsgcHJvamVjdE5hbWUgPSB2YWw7IH1cbiAgY29uc3QgZ2V0UHJvamVjdCA9ICgpID0+IHByb2plY3ROYW1lO1xuICBmdW5jdGlvbiBlZGl0Q2hlY2soKSB7IGNoZWNrZWQgPSAhY2hlY2tlZDsgfVxuICBjb25zdCBnZXRDaGVjayA9ICgpID0+IGNoZWNrZWQ7XG4gIGZ1bmN0aW9uIGFkZE5vdGUodmFsKSB7IG5vdGVzLnB1c2godmFsKTsgfVxuICBmdW5jdGlvbiBkZWxldGVOb3RlKHBvcykgeyBub3Rlcy5zcGxpY2UocG9zLCAxKTsgfVxuICBmdW5jdGlvbiBlZGl0Tm90ZShwb3MsIHZhbCkgeyBub3Rlc1twb3NdID0gdmFsOyB9XG4gIGNvbnN0IGdldEFsbE5vdGVzID0gKCkgPT4gbm90ZXM7XG4gIGNvbnN0IGdldE5vdGUgPSAocG9zKSA9PiBub3Rlc1twb3NdO1xuICBjb25zdCBnZXRJZCA9ICgpID0+IGlkO1xuXG4gIHJldHVybiB7XG4gICAgYWRkTm90ZSxcbiAgICBlZGl0Tm90ZSxcbiAgICBnZXROb3RlLFxuICAgIGRlbGV0ZU5vdGUsXG4gICAgZ2V0QWxsTm90ZXMsXG5cbiAgICBlZGl0VGl0bGUsXG4gICAgZ2V0VGl0bGUsXG5cbiAgICBlZGl0RHVlRGF0ZSxcbiAgICBkZWxldGVEdW9EYXRlLFxuICAgIGdldER1ZURhdGUsXG5cbiAgICBlZGl0UHJvamVjdCxcbiAgICBnZXRQcm9qZWN0LFxuXG4gICAgZWRpdFByaW9yaXR5LFxuICAgIGdldFByaW9yaXR5LFxuXG4gICAgZWRpdENoZWNrLFxuICAgIGdldENoZWNrLFxuXG4gICAgZ2V0SWQsXG4gIH07XG59XG5cbmNvbnN0IHRvZG9MaXN0ID0gKCgpID0+IHtcbiAgY29uc3QgbGlzdCA9IFtdO1xuXG4gIGZ1bmN0aW9uIHJldHVybk9iaihpdGVtKSB7XG4gICAgY29uc3QgaWQgPSBpdGVtLmdldElkKCk7XG4gICAgY29uc3QgdGl0bGUgPSBpdGVtLmdldFRpdGxlKCk7XG4gICAgY29uc3QgcHJvamVjdCA9IGl0ZW0uZ2V0UHJvamVjdCgpO1xuICAgIGNvbnN0IGR1ZURhdGUgPSBpdGVtLmdldER1ZURhdGUoKTtcbiAgICBjb25zdCBwcmlvcml0eSA9IGl0ZW0uZ2V0UHJpb3JpdHkoKTtcbiAgICBjb25zdCBjaGVja2VkID0gaXRlbS5nZXRDaGVjaygpO1xuICAgIGNvbnN0IG5vdGVzID0gaXRlbS5nZXRBbGxOb3RlcygpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkLCB0aXRsZSwgcHJvamVjdCwgZHVlRGF0ZSwgcHJpb3JpdHksIGNoZWNrZWQsIG5vdGVzLFxuICAgIH07XG4gIH1cblxuICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiBsaXN0Lmxlbmd0aDtcbiAgY29uc3Qgc2VsZWN0SXRlbSA9IChwb3MpID0+IGxpc3RbcG9zXTtcbiAgZnVuY3Rpb24gc2V0Q2hlY2tlZChwb3MpIHsgbGlzdFtwb3NdLmVkaXRDaGVjaygpOyB9XG4gIGNvbnN0IGFsbFRhc2tzTGlzdCA9ICgpID0+IGxpc3QubWFwKChvYmopID0+IChyZXR1cm5PYmoob2JqKSkpO1xuICBmdW5jdGlvbiByZXNldCgpIHsgbGlzdC5sZW5ndGggPSAwOyB9XG5cbiAgY29uc3QgZ2V0UHJvamVjdHMgPSAoKSA9PiBsaXN0Lm1hcCgoaXRlbSkgPT4gaXRlbS5nZXRQcm9qZWN0KCkpXG4gICAgLmZpbHRlcigodmFsdWUsIHBvcywgc2VsZikgPT4gdmFsdWUgIT09IG51bGwgJiYgc2VsZi5pbmRleE9mKHZhbHVlKSA9PT0gcG9zKTtcblxuICBmdW5jdGlvbiBhZGRJdGVtKHRleHQsIGRlYWRsaW5lLCBwcm9qZWN0LCBwcmlvcml0eSwgY2hlY2tlZCkge1xuICAgIGNvbnN0IGlkID0gbGlzdC5sZW5ndGg7XG4gICAgY29uc3QgbmV3SXRlbSA9IENyZWF0ZUl0ZW0oaWQsIHRleHQsIGRlYWRsaW5lLCBwcm9qZWN0LCBwcmlvcml0eSwgY2hlY2tlZCk7XG4gICAgbGlzdC5wdXNoKG5ld0l0ZW0pO1xuICB9XG5cbiAgY29uc3QgdG9KU09OID0gKCkgPT4ge1xuICAgIGNvbnN0IGxpc3REYXRhID0gbGlzdC5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICBpZDogaXRlbS5nZXRJZCgpLFxuICAgICAgdGl0bGU6IGl0ZW0uZ2V0VGl0bGUoKSxcbiAgICAgIHByb2plY3Q6IGl0ZW0uZ2V0UHJvamVjdCgpLFxuICAgICAgZHVlRGF0ZTogaXRlbS5nZXREdWVEYXRlKCksXG4gICAgICBwcmlvcml0eTogaXRlbS5nZXRQcmlvcml0eSgpLFxuICAgICAgY2hlY2tlZDogaXRlbS5nZXRDaGVjaygpLFxuICAgICAgbm90ZXM6IGl0ZW0uZ2V0QWxsTm90ZXMoKSxcbiAgICB9KSk7XG5cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoeyBsaXN0OiBsaXN0RGF0YSB9LCAnJywgMSk7XG4gIH07XG5cbiAgY29uc3QgcmVzdG9yZSA9IChkYXRhKSA9PiB7XG4gICAgcmVzZXQoKTtcbiAgICBjb25zdCB7IGxpc3Q6IGxpc3REYXRhIH0gPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgIGxpc3REYXRhLmZvckVhY2goXG4gICAgICAoe1xuICAgICAgICBpZCwgdGl0bGUsIHByb2plY3QsIGR1ZURhdGUsIHByaW9yaXR5LCBjaGVja2VkLCBub3RlcyxcbiAgICAgIH0pID0+IHtcbiAgICAgICAgY29uc3QgbmV3SXRlbSA9IENyZWF0ZUl0ZW0oaWQsIHRpdGxlLCBkdWVEYXRlLCBwcm9qZWN0LCBwcmlvcml0eSwgY2hlY2tlZCk7XG4gICAgICAgIG5vdGVzLmZvckVhY2goKG5vdGUpID0+IG5ld0l0ZW0uYWRkTm90ZShub3RlKSk7XG4gICAgICAgIGxpc3QucHVzaChuZXdJdGVtKTtcbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGdldExlbmd0aCxcbiAgICBzZWxlY3RJdGVtLFxuICAgIGFkZEl0ZW0sXG4gICAgcmVzdG9yZSxcbiAgICB0b0pTT04sXG4gICAgc2V0Q2hlY2tlZCxcbiAgICBnZXRQcm9qZWN0cyxcbiAgICByZXNldCxcbiAgICByZXR1cm5PYmosXG4gICAgYWxsVGFza3NMaXN0LFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdG9kb0xpc3Q7XG5cbi8qXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4jIyMjIyMjIyMjIyMjIyMjICAgICAgICAgICAjIyMjIyMjIyMjIyMjIyMjXG4jIyMjIyMjIyMjIyMjIyMjIFRFU1QgQVJFQSAjIyMjIyMjIyMjIyMjIyMjXG4jIyMjIyMjIyMjIyMjIyMjICAgICAgICAgICAjIyMjIyMjIyMjIyMjIyMjXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4qL1xuIiwiLy8gaW1wb3J0IHsgcHRCUiB9IGZyb20gJ2RhdGUtZm5zL2xvY2FsZSc7XG5pbXBvcnQgeyBmb3JtYXQgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgSU1hc2sgZnJvbSAnaW1hc2snO1xuXG5jb25zdCBzcGxpdFRvQ29kZSA9IChkYXRlKSA9PiBkYXRlLnNwbGl0KCcvJykucmV2ZXJzZSgpLmpvaW4oJy8nKS5yZXBsYWNlQWxsKCcvJywgJywgJyk7XG5leHBvcnQgY29uc3QgdG9JbnB1dCA9IChkYXRhKSA9PiBmb3JtYXQobmV3IERhdGUoc3BsaXRUb0NvZGUoZGF0YSkpLCAnZGQvTEwveXl5eScpO1xuLy8gY29uc3QgZ2V0RGF0YSA9IChhcnIpID0+IGFyci5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4vLyB9KTtcblxuZXhwb3J0IGNvbnN0IG1hc2tEYXRlID0ge1xuICBtYXNrOiAnZC9gbS9gWScsXG4gIGJsb2Nrczoge1xuICAgIGQ6IHtcbiAgICAgIG1hc2s6IElNYXNrLk1hc2tlZFJhbmdlLFxuICAgICAgcGxhY2Vob2xkZXJDaGFyOiAnZCcsXG4gICAgICBmcm9tOiAxLFxuICAgICAgdG86IDMxLFxuICAgICAgbWF4TGVuZ3RoOiAyLFxuICAgIH0sXG4gICAgbToge1xuICAgICAgbWFzazogSU1hc2suTWFza2VkUmFuZ2UsXG4gICAgICBwbGFjZWhvbGRlckNoYXI6ICdtJyxcbiAgICAgIGZyb206IDEsXG4gICAgICB0bzogMTIsXG4gICAgICBtYXhMZW5ndGg6IDIsXG4gICAgfSxcbiAgICBZOiB7XG4gICAgICBtYXNrOiBJTWFzay5NYXNrZWRSYW5nZSxcbiAgICAgIHBsYWNlaG9sZGVyQ2hhcjogJ2EnLFxuICAgICAgZnJvbTogMTAwMCxcbiAgICAgIHRvOiA5OTk5LFxuICAgIH0sXG4gIH0sXG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCAnLi9zdHlsZS5zY3NzJztcbmltcG9ydCB0b2RvTGlzdCBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IHsgcG9wdWxhdGVTdG9yYWdlLCByZXN0b3JlU3RvcmFnZSB9IGZyb20gJy4vSlNPTkZ1bmN0aW9ucyc7XG5pbXBvcnQgdWlFZGl0SXRlbSwgeyBlZGl0TW9yZSB9IGZyb20gJy4vdWlBZGRJdGVtQ29uc3RydWN0b3InO1xuaW1wb3J0IHsgZmFzdFNhdmUsIHVpQ29udHJvbCB9IGZyb20gJy4vdWlDb250cm9scyc7XG5pbXBvcnQge1xuICBjbGVhckNvbnRlbnQsXG4gIHNob3dQbHVzQnRuLFxuICBhZGRGaWVsZCxcbiAgYWRkVGFzayxcbiAgaW5wdXQsXG4gIGFkZE1vcmUsXG4gIHF1aWNrU2F2ZSxcbn0gZnJvbSAnLi91aUZ1bmN0aW9ucyc7XG5cbmFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1aUVkaXRJdGVtKTtcblxuLy8gYWRpY2lvbmEgZXZlbnRvIHByYSBxdWFuZG8gc2UgY29tZcOnYSBhIGRpZ2l0YXJcbi8vIGUgcXVhbmRvIHNlIHBhcmEgZGUgZGlnaXRhciBvIHTDrXR1bG8gZG8gaXRlbS5cbmFkZEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBzaG93UGx1c0J0bik7XG5hZGRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHNob3dQbHVzQnRuKTtcbmFkZE1vcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBlZGl0TW9yZShpbnB1dCkpO1xucXVpY2tTYXZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gZmFzdFNhdmUoaW5wdXQpKTtcblxuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgcG9wdWxhdGVTdG9yYWdlKTtcbmlucHV0LnNldEF0dHJpYnV0ZSgnYXV0b2NvbXBsZXRlJywgJ29mZicpO1xuLy8gaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgcG9wdWxhdGVTdG9yYWdlKTtcbi8vIGlucHV0LnNldEF0dHJpYnV0ZSgnYXV0b2NvbXBsZXRlJywgJ29mZicpO1xud2luZG93Lm9ubG9hZCA9IHJlc3RvcmVTdG9yYWdlKCk7XG5cbmNvbnN0IG1haW5Nb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNleGFtcGxlTW9kYWwnKTtcbm1haW5Nb2RhbC5hZGRFdmVudExpc3RlbmVyKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB7XG4gIGNvbnN0IG1vZGFsQm9keSA9IG1haW5Nb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtYm9keScpO1xuICBjbGVhckNvbnRlbnQobW9kYWxCb2R5KTtcbn0pO1xuXG4vLyB0ZXN0c1xuLy8gY29uc29sZS5sb2codG9kb0xpc3QuZ2V0TGVuZ3RoKCkpO1xuLy8gdG9kb0xpc3QuYWRkSXRlbSgnSXRlbSAxJyk7XG4vLyB0b2RvTGlzdC5hZGRJdGVtKCdpdGVtIDInKTtcbi8vIHRvZG9MaXN0LmFkZEl0ZW0oJ2l0ZW0gMycpO1xuLy8gdG9kb0xpc3QuYWRkSXRlbSgnSXRlbSA0Jyk7XG4vLyB0b2RvTGlzdC5zZWxlY3RJdGVtKDApLmVkaXRQcm9qZWN0KCdQcm9qZXRvIDEnKTtcbi8vIHRvZG9MaXN0LnNlbGVjdEl0ZW0oMSkuZWRpdFByb2plY3QoJ1Byb2plw6fDo28nKTtcbi8vIHRvZG9MaXN0LnNlbGVjdEl0ZW0oMikuZWRpdFByb2plY3QoJ1Byb2pvdGEnKTtcbi8vIHRvZG9MaXN0LnNlbGVjdEl0ZW0oMikuYWRkTm90ZShgXG4vLyAgIDxzdHJvbmc+VGhpcyBpcyB0aGUgZmlyc3QgaXRlbSdzIGFjY29yZGlvbiBib2R5Ljwvc3Ryb25nPiBJdCBpcyBzaG93biBieSBkZWZhdWx0LCB1bnRpbCB0aGUgY29sbGFwc2UgcGx1Z2luIGFkZHMgdGhlIGFwcHJvcHJpYXRlIGNsYXNzZXMgdGhhdCB3ZSB1c2UgdG8gc3R5bGUgZWFjaCBlbGVtZW50LlxuLy8gICBUaGVzZSBjbGFzc2VzIGNvbnRyb2wgdGhlIG92ZXJhbGwgYXBwZWFyYW5jZSwgYXMgd2VsbCBhcyB0aGUgc2hvd2luZyBhbmQgaGlkaW5nIHZpYSBDU1MgdHJhbnNpdGlvbnMuIFlvdSBjYW4gbW9kaWZ5IGFueSBvZiB0aGlzIHdpdGggY3VzdG9tIENTUyBvciBvdmVycmlkaW5nIG91ciBkZWZhdWx0IHZhcmlhYmxlcy5cbi8vICAgSXQncyBhbHNvIHdvcnRoIG5vdGluZyB0aGF0IGp1c3QgYWJvdXQgYW55IEhUTUwgY2FuIGdvIHdpdGhpbiB0aGUgPGNvZGU+LmFjY29yZGlvbi1ib2R5PC9jb2RlPiwgdGhvdWdoIHRoZSB0cmFuc2l0aW9uIGRvZXMgbGltaXQgb3ZlcmZsb3cuXG4vLyBgKTtcblxuLy8gdG9kb0xpc3Quc2V0Q2hlY2tlZCgyKTtcbi8vIHRvZG9MaXN0LnNlbGVjdEl0ZW0oNCkuZWRpdFByb2plY3QoJ1Byb2pvdGEnKTtcbnVpQ29udHJvbC5sb2FkKCk7XG4iLCJpbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcbmltcG9ydCB7IHVpQ29udHJvbCB9IGZyb20gJy4vdWlDb250cm9scyc7XG5pbXBvcnQge1xuICBkdWVEYXRlTWFzayxcbiAgc2VhcmNoUHJvamVjdHMsXG4gIGNyZWF0ZUVsZW1lbnQsXG4gIGNyZWF0ZVByaW9yaXR5U2VsZWN0LFxufSBmcm9tICcuL3VpRnVuY3Rpb25zJztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5cbmZ1bmN0aW9uIHNhdmUodGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSB7XG4gIHRvZG9MaXN0LmFkZEl0ZW0odGl0bGUudmFsdWUsIGR1ZURhdGUudmFsdWUsIHByaW9yaXR5LnZhbHVlLCBwcm9qZWN0LnZhbHVlKTtcbiAgdWlDb250cm9sLnVwZGF0ZSgpO1xufVxuZnVuY3Rpb24gdWlFZGl0SXRlbSh0aXRsZSwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpIHtcbiAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYubW9kYWwtYm9keScpO1xuICAvLyBjcmVhdGluZyBlbGVtZW50c1xuICBjb25zdCByb3cxID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnXSk7XG4gIGNvbnN0IHRpdGxlRGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydpbnB1dC1ncm91cCcsICdtYi0zJywgJ2dhcC0xJ10pO1xuICBjb25zdCB0aXRsZUlucHV0ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2Zvcm0tY29udHJvbCddLCB7XG4gICAgaWQ6ICdpdGVtVGl0bGUnLFxuICAgIHR5cGU6ICd0ZXh0JyxcbiAgICBwbGFjZWhvbGRlcjogJ05vdmEgVGFyZWZhLi4uJyxcbiAgfSk7XG4gIGNvbnN0IHJvdzIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2JnLWdyYXknLCAncm93JywgJ2ctMCcsICdnYXAtMicsICdmbGV4LW5vd3JhcCddKTtcblxuICBjb25zdCBkYXRlRGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydkYXRlJywgJ2ZsYXRwaWNrcicsICdjb2wnXSk7XG4gIGNvbnN0IGRhdGVJbnB1dCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgWydmb3JtLWNvbnRyb2wnLCAnZmxhdHBpY2tyLWlucHV0J10sIHtcbiAgICBpZDogJ2R1ZURhdGUnLFxuICAgIHR5cGU6ICd0ZXh0JyxcbiAgICBpbnB1dG1vZGU6ICdudW1lcmljJyxcbiAgICAnZGF0YS1pbnB1dCc6IHVuZGVmaW5lZCxcbiAgICBhdXRvY29tcGxldGU6ICdvZmYnLFxuICB9KTtcbiAgY29uc3QgZGF0ZXBpY2tlclRvZ2dsZSA9IGNyZWF0ZUVsZW1lbnQoJ2EnLCBbJ2lucHV0LWJ1dHRvbiddLCB7XG4gICAgdGl0bGU6ICd0b2dnbGUnLFxuICAgICdkYXRhLXRvZ2dsZSc6IHVuZGVmaW5lZCxcbiAgfSk7XG4gIGNvbnN0IGRhdGVJY29uID0gY3JlYXRlRWxlbWVudCgnaScsIFsndGV4dC13YXJuaW5nJywgJ3NtYWxsJywgJ2JpJywgJ2JpLWNhbGVuZGFyJ10pO1xuXG4gIGNvbnN0IHByaW9yaXR5RGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydjb2wnXSk7XG4gIGNvbnN0IHNlbGVjdFByaW9yaXR5ID0gKHR5cGVvZiBwcmlvcml0eSAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgPyBjcmVhdGVQcmlvcml0eVNlbGVjdChwcmlvcml0eSlcbiAgICA6IGNyZWF0ZVByaW9yaXR5U2VsZWN0KCk7XG5cbiAgY29uc3QgcHJvamVjdERpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29sJ10pO1xuICBjb25zdCBwcm9qZWN0SW5wdXQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIFsnZm9ybS1jb250cm9sJ10sIHtcbiAgICBpZDogJ2VudGVyUHJvamVjdCcsXG4gICAgdHlwZTogJ3RleHQnLFxuICAgIGxpc3Q6ICdkYXRhbGlzdE9wdGlvbnMnLFxuICAgIHBsYWNlaG9sZGVyOiAnUHJvamV0bycsXG4gICAgYXV0b2NvbXBsZXRlOiAnb2ZmJyxcbiAgfSk7XG4gIGNvbnN0IHByb2plY3REYXRhbGlzdCA9IGNyZWF0ZUVsZW1lbnQoJ2RhdGFsaXN0JywgWydzdWdnZXN0aW9ucycsICdmb3JtJ10sIHtcbiAgICBpZDogJ2RhdGFsaXN0T3B0aW9ucycsXG4gICAgZHJvcHpvbmU6ICdzdHJpbmcnLFxuICB9KTtcblxuICBjb25zdCByb3czID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnLCAncHQtMiddKTtcblxuICBjb25zdCBub3Rlc0NvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29udGFpbmVyJ10pO1xuICBjb25zdCBub3Rlc0hlYWRlciA9IGNyZWF0ZUVsZW1lbnQoJ2g2Jyk7XG4gIGNvbnN0IG5vdGVzUm93ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnLCAnZy0yJ10pO1xuXG4gIGNvbnN0IGFkZE5vdGVSb3cgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3JvdycsICdwdC0yJywgJ2p1c3RpZnktY29udGVudC1lbmQnXSk7XG5cbiAgY29uc3QgYWRkTm90ZURpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29sLWF1dG8nLCAnc21hbGwnLCAndGV4dC1kYW5nZXInLCAndGV4dC13YXJuaW5nLWVtcGhhc2lzJ10pO1xuICBjb25zdCBhZGROb3RlTGluayA9IGNyZWF0ZUVsZW1lbnQoJ2EnLCBbXSwgeyBpZDogJ2FkZE5vdGUnIH0pO1xuICBjb25zdCBhZGROb3RlSWNvbiA9IGNyZWF0ZUVsZW1lbnQoJ2knLCBbJ2JpJywgJ2JpLXBsdXMtY2lyY2xlJ10pO1xuICBjb25zdCBhZGROb3RlVGV4dCA9IGNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICBjb25zdCByb3c0ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnLCAnZy0yJywgJ3B0LTMnLCAnanVzdGlmeS1jb250ZW50LXN0YXJ0JywgJ2ZsZXgtcm93LXJldmVyc2UnXSk7XG5cbiAgY29uc3Qgc2F2ZURpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29sLWF1dG8nXSk7XG4gIGNvbnN0IHNhdmVCdG4gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2J0bicsICdidG4td2FybmluZycsICd0ZXh0LWxpZ2h0J10sIHtcbiAgICAnZGF0YS1icy1kaXNtaXNzJzogJ21vZGFsJyxcbiAgfSk7XG4gIGNvbnN0IGNhbmNlbERpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29sLWF1dG8nXSk7XG4gIGNvbnN0IGNhbmNlbEJ0biA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIFsnYnRuJywgJ2J0bi1zZWNvbmRhcnknLCAndGV4dC1saWdodCddLCB7XG4gICAgJ2RhdGEtYnMtZGlzbWlzcyc6ICdtb2RhbCcsXG4gIH0pO1xuXG4gIC8vIGFwcGVuZCBlbGVtZW50c1xuXG4gIC8vIHJvdyAxICh0aXRsZSlcbiAgaWYgKHR5cGVvZiB0aXRsZS52YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHRpdGxlSW5wdXQudmFsdWUgPSB0aXRsZS52YWx1ZTtcbiAgdGl0bGVEaXYuYXBwZW5kQ2hpbGQodGl0bGVJbnB1dCk7XG5cbiAgcm93MS5hcHBlbmRDaGlsZCh0aXRsZURpdik7XG5cbiAgLy8gcm93IDIgKGRhdGUsIHByaW9yaXR5LCBwcm9qZWN0KVxuXG4gIC8vIGRhdGVcbiAgaWYgKHR5cGVvZiBkdWVEYXRlICE9PSAndW5kZWZpbmVkJyAmJiBkdWVEYXRlICE9PSAwKSBkYXRlSW5wdXQudmFsdWUgPSBkdWVEYXRlO1xuICBkYXRlcGlja2VyVG9nZ2xlLmFwcGVuZENoaWxkKGRhdGVJY29uKTtcbiAgZGF0ZURpdi5hcHBlbmQoZGF0ZUlucHV0LCBkYXRlcGlja2VyVG9nZ2xlKTtcblxuICAvLyBwcmlvcml0eVxuICBwcmlvcml0eURpdi5hcHBlbmRDaGlsZChzZWxlY3RQcmlvcml0eSk7XG5cbiAgLy8gcHJvamVjdFxuICBwcm9qZWN0RGl2LmFwcGVuZChwcm9qZWN0SW5wdXQsIHByb2plY3REYXRhbGlzdCk7XG5cbiAgcm93Mi5hcHBlbmQoZGF0ZURpdiwgcHJpb3JpdHlEaXYsIHByb2plY3REaXYpO1xuXG4gIC8vIHJvdzMgKG5vdGVzIGFyZWEpXG4gIG5vdGVzSGVhZGVyLnRleHRDb250ZW50ID0gJ05vdGFzJztcbiAgYWRkTm90ZVRleHQudGV4dENvbnRlbnQgPSAnTm92YSBub3RhJztcbiAgYWRkTm90ZUljb24udGV4dENvbnRlbnQgPSAnICc7IC8vIGZpeGluZyBhIHByb2JsZW0gZm9yIHVzaW5nIGpzXG5cbiAgYWRkTm90ZUxpbmsuYXBwZW5kKGFkZE5vdGVJY29uLCBhZGROb3RlVGV4dCk7XG4gIGFkZE5vdGVEaXYuYXBwZW5kQ2hpbGQoYWRkTm90ZUxpbmspO1xuICBhZGROb3RlUm93LmFwcGVuZENoaWxkKGFkZE5vdGVEaXYpO1xuICBub3Rlc1Jvdy5hcHBlbmRDaGlsZChhZGROb3RlUm93KTtcbiAgbm90ZXNDb250YWluZXIuYXBwZW5kKG5vdGVzSGVhZGVyLCBub3Rlc1Jvdyk7XG5cbiAgcm93My5hcHBlbmRDaGlsZChub3Rlc0NvbnRhaW5lcik7XG5cbiAgLy8gcm93NCAoYnV0dG9ucylcbiAgY2FuY2VsQnRuLnRleHRDb250ZW50ID0gJ0NhbmNlbCc7XG4gIHNhdmVCdG4udGV4dENvbnRlbnQgPSAnU2F2ZSc7XG4gIHNhdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzYXZlKHRpdGxlSW5wdXQsIGRhdGVJbnB1dCwgcHJvamVjdElucHV0LCBwcm9qZWN0SW5wdXQpKTtcbiAgc2F2ZURpdi5hcHBlbmRDaGlsZChzYXZlQnRuKTtcbiAgY2FuY2VsRGl2LmFwcGVuZENoaWxkKGNhbmNlbEJ0bik7XG5cbiAgcm93NC5hcHBlbmQoc2F2ZURpdiwgY2FuY2VsRGl2KTtcblxuICBtb2RhbC5hcHBlbmQocm93MSwgcm93Miwgcm93Mywgcm93NCk7XG4gIGR1ZURhdGVNYXNrKCk7XG4gIHNlYXJjaFByb2plY3RzKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlZGl0TW9yZSh0aXRsZSkge1xuICB1aUVkaXRJdGVtKHRpdGxlKTtcbiAgdGl0bGUudmFsdWUgPSAnJztcbn1cblxuZXhwb3J0IGRlZmF1bHQgdWlFZGl0SXRlbTtcbiIsImltcG9ydCB0b2RvTGlzdCBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IHsgY2xlYXJDb250ZW50LCBmaW5kUGFyZW50Tm9kZSwgc2V0TGluZVRocm91Z2ggfSBmcm9tICcuL3VpRnVuY3Rpb25zJztcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tY3ljbGVcbmltcG9ydCBhZGRMaW5lIGZyb20gJy4vdWlMaXN0R2VuZXJhdG9yJztcblxuZXhwb3J0IGNvbnN0IGxvYWRMaXN0ID0gKCkgPT4gWy4uLnRvZG9MaXN0LmFsbFRhc2tzTGlzdCgpXTtcbmNvbnN0IHNvcnRQYXJhbSA9IChhcnIsIHBhcmFtKSA9PiBbLi4uYXJyXVxuICAuc29ydCgoYSwgYikgPT4gKChhW3BhcmFtXSA8IGJbcGFyYW1dKSA/IC0xIDogMSkpO1xuXG4vLyBVSSBDb250cm9sbGVyXG5leHBvcnQgY29uc3QgdWlDb250cm9sID0gKCgpID0+IHtcbiAgbGV0IGN1cnJlbnRGaWx0ZXIgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIHNldEN1cnJlbnRGaWx0ZXIoa2V5LCB2YWx1ZSkge1xuICAgIGlmIChrZXkpIGN1cnJlbnRGaWx0ZXIgPSB7IGtleSwgdmFsdWUgfTtcbiAgICBlbHNlIGN1cnJlbnRGaWx0ZXIgPSBudWxsO1xuICB9XG5cbiAgY29uc3QgZmlsdGVyQXJyYXkgPSAoYXJyLCBmaWx0ZXIsIHZhbHVlKSA9PiB7XG4gICAgaWYgKGZpbHRlcikgcmV0dXJuIFsuLi5hcnIuZmlsdGVyKChvYmpldG8pID0+IG9iamV0b1tmaWx0ZXJdID09PSB2YWx1ZSldO1xuICAgIHJldHVybiBhcnI7XG4gIH07XG5cbiAgZnVuY3Rpb24gbG9hZCgpIHtcbiAgICBjb25zdCB1aUxpc3QgPSBzb3J0UGFyYW0obG9hZExpc3QoKSwgJ2NoZWNrZWQnKTtcbiAgICBpZiAoY3VycmVudEZpbHRlciAhPT0gbnVsbCkge1xuICAgICAgZmlsdGVyQXJyYXkodWlMaXN0LCBjdXJyZW50RmlsdGVyLmtleSwgY3VycmVudEZpbHRlci52YWx1ZSlcbiAgICAgICAgLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gbG9hZExpc3QoKS5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IG9iai5pZCk7XG4gICAgICAgICAgYWRkTGluZShvYmosIGluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVpTGlzdC5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBsb2FkTGlzdCgpLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gb2JqLmlkKTtcbiAgICAgICAgYWRkTGluZShvYmosIGluZGV4KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZShmaWx0ZXIsIHZhbHVlKSB7XG4gICAgY2xlYXJDb250ZW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsaXN0JykpO1xuICAgIGlmIChmaWx0ZXIpIHNldEN1cnJlbnRGaWx0ZXIoZmlsdGVyLCB2YWx1ZSk7XG4gICAgaWYgKGZpbHRlciA9PT0gZmFsc2UpIHNldEN1cnJlbnRGaWx0ZXIoKTtcbiAgICBsb2FkKCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGxvYWQsXG4gICAgdXBkYXRlLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZhc3RTYXZlKHRpdGxlKSB7XG4gIHRvZG9MaXN0LmFkZEl0ZW0odGl0bGUudmFsdWUpO1xuICB1aUNvbnRyb2wudXBkYXRlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRDaGVja2VkKGUpIHtcbiAgY29uc3QgeyB0YXJnZXQgfSA9IGU7XG4gIGNvbnN0IHBvcyA9IGZpbmRQYXJlbnROb2RlKHRhcmdldCwgJ2RhdGEtcG9zaXRpb24nKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcG9zaXRpb24nKTtcbiAgdG9kb0xpc3Quc2VsZWN0SXRlbShwb3MpLmVkaXRDaGVjaygpO1xuICBzZXRMaW5lVGhyb3VnaCh0YXJnZXQpO1xuICB1aUNvbnRyb2wudXBkYXRlKCk7XG59XG4iLCJpbXBvcnQgZmxhdHBpY2tyIGZyb20gJ2ZsYXRwaWNrcic7XG5pbXBvcnQgeyBQb3J0dWd1ZXNlIH0gZnJvbSAnZmxhdHBpY2tyL2Rpc3QvbDEwbi9wdCc7XG5pbXBvcnQgSU1hc2sgZnJvbSAnaW1hc2snO1xuaW1wb3J0IHsgbWFza0RhdGUgfSBmcm9tICcuL2RhdGUnO1xuaW1wb3J0IHRvZG9MaXN0IGZyb20gJy4vY29yZSc7XG5cbmV4cG9ydCBjb25zdCBpc0NoZWNrZWQgPSAoZSkgPT4gZS5jaGVja2VkID09PSB0cnVlO1xuXG5leHBvcnQgZnVuY3Rpb24gZmluZFBhcmVudE5vZGUoZWxlbWVudCwgYXR0cmlidXRlTmFtZSkge1xuICBsZXQgeyBwYXJlbnROb2RlIH0gPSBlbGVtZW50O1xuXG4gIHdoaWxlIChwYXJlbnROb2RlKSB7XG4gICAgaWYgKHBhcmVudE5vZGUuaGFzQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpKSB7XG4gICAgICByZXR1cm4gcGFyZW50Tm9kZTtcbiAgICB9XG4gICAgcGFyZW50Tm9kZSA9IHBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgfVxuXG4gIHJldHVybiBudWxsOyAvLyBSZXRvcm5hIG51bGwgc2UgbsOjbyBlbmNvbnRyb3UgbmVuaHVtIG7DsyBwYWkgY29tIG8gYXRyaWJ1dG8gZGVzZWphZG9cbn1cblxuLy8gc3RhcnQgb25Mb2FkXG5cbmNvbnN0IHNwZWNpYWxDaGFyc0VudHJpZXMgPSBbXG4gIFsnw4DDgcOCw4PDhMOFJywgJ0EnXSxcbiAgWyfDoMOhw6LDo8Okw6UnLCAnYSddLFxuICBbJ8OIw4nDisOLJywgJ0UnXSxcbiAgWyfDqMOpw6rDqycsICdlJ10sXG4gIFsnw4zDjcOOw48nLCAnSSddLFxuICBbJ8Osw63DrsOvJywgJ2knXSxcbiAgWyfDksOTw5XDlMOWJywgJ08nXSxcbiAgWyfDssOzw7XDtMO2JywgJ28nXSxcbiAgWyfDmcOaw5vDnCcsICdVJ10sXG4gIFsnw7nDusO7w7wnLCAndSddLFxuICBbJ8OHJywgJ0MnXSxcbiAgWyfDpycsICdjJ10sXG5dO1xuXG5jb25zdCBzcGVjaWFsQ2hhcnNNYXAgPSBPYmplY3QuZnJvbUVudHJpZXMoXG4gIHNwZWNpYWxDaGFyc0VudHJpZXMuZmxhdE1hcCgoW2NoYXJzLCB2YWx1ZV0pID0+IFsuLi5jaGFyc10ubWFwKChjaGFyKSA9PiBbY2hhciwgdmFsdWVdKSksXG4pO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0QXR0cnMoZWxlbSwgYXR0cnMpIHtcbiAgT2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZCAmJiBhdHRyc1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGtleSwgJycpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZywgY2xhc3NOYW1lcyA9IFtdLCBhdHRyaWJ1dGVzID0ge30pIHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgaWYgKGNsYXNzTmFtZXMubGVuZ3RoKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoLi4uY2xhc3NOYW1lcyk7XG4gIHNldEF0dHJzKGVsZW1lbnQsIGF0dHJpYnV0ZXMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU9wdGlvbih2YWx1ZSwgdGV4dCwgc2VsZWN0ZWQgPSBmYWxzZSkge1xuICBjb25zdCBvcHRpb24gPSBjcmVhdGVFbGVtZW50KCdvcHRpb24nLCBbXSwgeyB2YWx1ZSB9KTtcbiAgb3B0aW9uLnRleHRDb250ZW50ID0gdGV4dDtcbiAgaWYgKHNlbGVjdGVkKSB7XG4gICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKTtcbiAgfVxuICByZXR1cm4gb3B0aW9uO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDb250ZW50KGVsZW0pIHtcbiAgd2hpbGUgKGVsZW0uZmlyc3RDaGlsZCkge1xuICAgIGVsZW0ucmVtb3ZlQ2hpbGQoZWxlbS5sYXN0Q2hpbGQpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcmlvcml0eVNlbGVjdChudW0gPSAwKSB7XG4gIGNvbnN0IHNlbGVjdCA9IGNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcsIFsnZm9ybS1zZWxlY3QnXSwge1xuICAgICdhcmlhLWxhYmVsJzogJ1ByaW9yaWRhZGUnLFxuICB9KTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpICs9IDEpIHtcbiAgICBjb25zdCB0ZXh0ID0gaSA9PT0gMCA/ICdQcmlvcmlkYWRlJyA6IGBQcmlvcmlkYWRlICR7aX1gO1xuICAgIGNvbnN0IHNlbGVjdGVkID0gaSA9PT0gbnVtO1xuICAgIGNvbnN0IG9wdGlvbiA9IGNyZWF0ZU9wdGlvbihpLCB0ZXh0LCBzZWxlY3RlZCk7XG4gICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gIH1cbiAgcmV0dXJuIHNlbGVjdDtcbn1cblxuLy8gQUREL0VESVQgTkVXIFRBU0sgU0NSRUVOIEZVTkNUSU9OU1xuXG5mdW5jdGlvbiByZW1vdmVTcGVjaWFscyh0ZXh0KSB7XG4gIGxldCBzZWFyY2ggPSB0ZXh0O1xuICBzZWFyY2ggPSBzZWFyY2gucmVwbGFjZShcbiAgICAvW8OALcOcw6Atw7xdL2csXG4gICAgKG1hdGNoKSA9PiBzcGVjaWFsQ2hhcnNNYXBbbWF0Y2hdIHx8IG1hdGNoLFxuICApO1xuICByZXR1cm4gc2VhcmNoO1xufVxuLy8gcHJvamVjdHMgZGF0YWxpc3QgYXV0b2NvbXBsZXRlXG5mdW5jdGlvbiBhdXRvQ29tcGxldGUoc2VhcmNoKSB7XG4gIGNvbnN0IHByb2plY3RzID0gdG9kb0xpc3QuZ2V0UHJvamVjdHMoKTtcbiAgcmV0dXJuIHByb2plY3RzLmZpbHRlcigodmFsdWUpID0+IHtcbiAgICBjb25zdCB2YWx1ZUxvd2VyY2FzZSA9IHJlbW92ZVNwZWNpYWxzKHZhbHVlLnRvTG93ZXJDYXNlKCkpO1xuICAgIGNvbnN0IHNlYXJjaExvd2VyY2FzZSA9IHJlbW92ZVNwZWNpYWxzKHNlYXJjaC50b0xvd2VyQ2FzZSgpKTtcbiAgICByZXR1cm4gdmFsdWVMb3dlcmNhc2UuaW5jbHVkZXMoc2VhcmNoTG93ZXJjYXNlKTtcbiAgfSk7XG59XG5cbi8vIGNhbGxpbmcgZnVuY3Rpb25zIHRvIGF1dG9jb21wbGV0ZSBQcm9qZWN0IGZpZWxkXG5cbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hQcm9qZWN0cygpIHtcbiAgY29uc3QgaW5wdXRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VudGVyUHJvamVjdCcpO1xuICBjb25zdCBkYXRhbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RhdGFsaXN0Jyk7XG4gIGlucHV0UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICh7IHRhcmdldCB9KSA9PiB7XG4gICAgY29uc3QgaW5wdXREYXRhID0gdGFyZ2V0LnZhbHVlO1xuICAgIGlmIChpbnB1dERhdGEubGVuZ3RoKSB7XG4gICAgICBjb25zdCBhdXRvQ29tcGxldGVPcHRpb25zID0gYXV0b0NvbXBsZXRlKGlucHV0RGF0YSk7XG4gICAgICBkYXRhbGlzdC5pbm5lckhUTUwgPSBgJHthdXRvQ29tcGxldGVPcHRpb25zXG4gICAgICAgIC5tYXAoKHZhbHVlKSA9PiBgPG9wdGlvbiB2YWx1ZT1cIiR7dmFsdWV9XCIgLz5gKVxuICAgICAgICAuam9pbignJyl9YDtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBEQVRFUElDS0VSIEFORCBNQVNLIEZVTkNUSU9OU1xuXG5leHBvcnQgZnVuY3Rpb24gZHVlRGF0ZU1hc2soKSB7XG4gIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZHVlRGF0ZScpO1xuICBjb25zdCBmbGF0RWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5mbGF0cGlja3InKTtcblxuICAvLyBhcHBseSBtYXNrIHRvIGR1ZURhdGVGaWVsZFxuICBjb25zdCBtYXNrID0gSU1hc2soZHVlRGF0ZSwgbWFza0RhdGUpO1xuXG4gIC8vIGFwcGx5IGZsYXRwaWNrciBkYXRlcGlja2VyIHRvIGFsbCBlbGVtZW50cyBpbiBhIGRpdlxuICAvLyAoaWNvbiB0b2dnbGUgYW5kIGlucHV0IGRhdGUgdXNpbmcgZGF0YS0gYXR0cmlidXRlcylcbiAgZmxhdHBpY2tyKGZsYXRFbGVtLCB7XG4gICAgZGF0ZUZvcm1hdDogJ2QvbS9ZJyxcbiAgICBkaXNhYmxlTW9iaWxlOiAndHJ1ZScsXG4gICAgYWxsb3dJbnB1dDogdHJ1ZSxcbiAgICB3cmFwOiB0cnVlLFxuICAgIGxvY2FsZTogUG9ydHVndWVzZSxcbiAgICBvbkNoYW5nZShzZWxlY3RlZERhdGVzLCBkYXRlU3RyKSB7XG4gICAgICBtYXNrLnVwZGF0ZVZhbHVlKGRhdGVTdHIpO1xuICAgIH0sXG4gIH0pO1xufVxuXG4vLyBtYWluIHNjcmVlbiBpbnRlcmFjdGlvbnNcbi8vIGNoZWNrIHZpc3VhbCBlZmZlY3RcbmV4cG9ydCBmdW5jdGlvbiBzZXRMaW5lVGhyb3VnaChlKSB7XG4gIGNvbnN0IHRleHQgPSBlLm5leHRFbGVtZW50U2libGluZztcbiAgaWYgKGlzQ2hlY2tlZChlKSkge1xuICAgIHRleHQuY2xhc3NMaXN0LmFkZCgndGV4dC1kZWNvcmF0aW9uLWxpbmUtdGhyb3VnaCcpO1xuICB9IGVsc2Uge1xuICAgIHRleHQuY2xhc3NMaXN0LnJlbW92ZSgndGV4dC1kZWNvcmF0aW9uLWxpbmUtdGhyb3VnaCcpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBhZGRGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0I2l0ZW1UaXRsZScpO1xuZXhwb3J0IGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcbmV4cG9ydCBjb25zdCBhZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYSNhZGRJdGVtJyk7XG5leHBvcnQgY29uc3QgYWRkTW9yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbiNhZGRNb3JlJyk7XG5leHBvcnQgY29uc3QgcXVpY2tTYXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uI3NhdmVJdGVtJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93UGx1c0J0bigpIHtcbiAgLy8gRW5jb250cmEgbyBib3TDo28gK1xuICBjb25zdCBwbHVzQnRuID0gYWRkRmllbGQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICBjb25zdCBzYXZlQnRuID0gcGx1c0J0bi5uZXh0RWxlbWVudFNpYmxpbmc7XG4gIC8vIFNlIG8gdmFsb3IgZG8gY2FtcG8gdMOtdHVsbyBmb3IgZGlmZXJlbnRlIGRlIHZhemlvLFxuICAvLyBlbnTDo28gZWxlIHJldmVsYSBvIGJvdMOjbyArXG4gIGlmIChhZGRGaWVsZC52YWx1ZSAhPT0gJycpIHtcbiAgICBwbHVzQnRuLmNsYXNzTGlzdC5hZGQoJ3JldmVhbEl0ZW0nKTtcbiAgICBzYXZlQnRuLmNsYXNzTGlzdC5hZGQoJ3JldmVhbEl0ZW0nKTtcbiAgfVxuICAvLyBjYXNvIGNvbnRyw6FyaW8sIHNlIHZvY8OqIGFwYWdhciB0b2RvIG8gdMOtdHVsb1xuICAvLyBlbGUgZMOhIGRpc3BsYXk6IG5vbmUsIG5vIGJvdMOjbyArXG4gIGlmIChhZGRGaWVsZC52YWx1ZSA9PT0gJycgJiYgcGx1c0J0bi5jbGFzc0xpc3QuY29udGFpbnMoJ3JldmVhbEl0ZW0nKSkge1xuICAgIHBsdXNCdG4uY2xhc3NMaXN0LnJlbW92ZSgncmV2ZWFsSXRlbScpO1xuICAgIHNhdmVCdG4uY2xhc3NMaXN0LnJlbW92ZSgncmV2ZWFsSXRlbScpO1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuaW1wb3J0IHsgcG9wdWxhdGVTdG9yYWdlIH0gZnJvbSAnLi9KU09ORnVuY3Rpb25zJztcbmltcG9ydCB7IGlzQ2hlY2tlZCwgY3JlYXRlRWxlbWVudCB9IGZyb20gJy4vdWlGdW5jdGlvbnMnO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1jeWNsZVxuaW1wb3J0IHsgc2V0Q2hlY2tlZCB9IGZyb20gJy4vdWlDb250cm9scyc7XG5cbmNvbnN0IGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYjbGlzdCcpO1xuY29uc3QgaGFzTm90ZXMgPSAob2JqKSA9PiBvYmoubGVuZ3RoID4gMDtcblxuZnVuY3Rpb24gYWRkQ2hlY2tlZChjaGVja2JveCwgYnV0dG9uKSB7XG4gIGNoZWNrYm94LmNoZWNrZWQgPSB0cnVlO1xuICBidXR0b24uY2xhc3NMaXN0LmFkZCgndGV4dC1kZWNvcmF0aW9uLWxpbmUtdGhyb3VnaCcpO1xufVxuXG5mdW5jdGlvbiBpbnNlcnROb3RlKG5vdGVzLCBib2R5KSB7XG4gIG5vdGVzLmZvckVhY2goKGNvbnRlbnQpID0+IHtcbiAgICBjb25zdCBjb250ZW50RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29udGVudERpdi5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoY29udGVudERpdik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRMaW5lKG9iaiwgbnVtKSB7XG4gIC8vIExJU1QgSVRFTSAtLS0tLS1cblxuICAvLyBoZWFkZXJcbiAgY29uc3QgaXRlbSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnYWNjb3JkaW9uLWl0ZW0nXSwge1xuICAgICdkYXRhLXBvc2l0aW9uJzogYCR7bnVtfWAsXG4gIH0pO1xuICBjb25zdCBoZWFkZXIgPSBjcmVhdGVFbGVtZW50KCdoMicsIFsnYWNjb3JkaW9uLWhlYWRlcicsICdwLTEnLCAnZC1mbGV4JywgJ2FsaWduLWl0ZW1zLWNlbnRlcicsICdnYXAtMSddKTtcbiAgY29uc3QgY2hlY2tib3ggPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIFsnZm9ybS1jaGVjay1pbnB1dCcsICd0ZXh0LWJnLXdhcm5pbmcnXSwgeyB0eXBlOiAnY2hlY2tib3gnIH0pO1xuICBjb25zdCBidG5IZWFkZXIgPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2FjY29yZGlvbi1idXR0b24nLCAnY29sbGFwc2VkJywgJ2ZsZXgtZmlsbCddLCB7XG4gICAgdHlwZTogJ2J1dHRvbicsXG4gICAgJ2RhdGEtYnMtdG9nZ2xlJzogJ2NvbGxhcHNlJyxcbiAgICAnYXJpYS1leHBhbmRlZCc6ICdmYWxzZScsXG4gICAgJ2RhdGEtYnMtdGFyZ2V0JzogYCNpdGVtLSR7bnVtfWAsXG4gIH0pO1xuICBjb25zdCBzcGFuID0gY3JlYXRlRWxlbWVudCgnc3BhbicsIFsnZmxleC1maWxsJ10pO1xuICBjb25zdCBjb2RlID0gY3JlYXRlRWxlbWVudCgnY29kZScsIFsnc21hbGwnLCAndGV4dC1tdXRlZCddKTtcblxuICAvLyBib2R5XG4gIGNvbnN0IGl0ZW1EZXRhaWxzID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydhY2NvcmRpb24tY29sbGFwc2UnLCAnY29sbGFwc2UnXSwge1xuICAgIGlkOiBgaXRlbS0ke251bX1gLFxuICB9KTtcbiAgY29uc3QgaXRlbUJvZHkgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2FjY29yZGlvbi1ib2R5J10pO1xuXG4gIGNvbnN0IGJ0bkVkaXQgPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2J0bicsICdidG4td2FybmluZyddKTtcbiAgY29uc3QgYnRuRGVsZXRlID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgWydidG4nLCAnYnRuLWRhbmdlciddKTtcblxuICAvLyBFVkVOVExJU1RORVJTIE9CSkVDVFNcbiAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgc2V0Q2hlY2tlZCk7XG4gIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHBvcHVsYXRlU3RvcmFnZSk7XG5cbiAgLy8gRklMTElORyBDT05URU5UXG4gIC8vIGhlYWRlclxuICBzcGFuLnRleHRDb250ZW50ID0gb2JqLnRpdGxlO1xuICBjb2RlLnRleHRDb250ZW50ID0gb2JqLnByb2plY3Q7XG5cbiAgLy8gYm9keVxuICBidG5FZGl0LnRleHRDb250ZW50ID0gJ0VkaXQnO1xuICBidG5EZWxldGUudGV4dENvbnRlbnQgPSAnRGVsZXRlJztcblxuICAvLyBBcHBlbmRpbmcgY29udGVudFxuICBidG5IZWFkZXIuYXBwZW5kKHNwYW4sIGNvZGUpO1xuICBoZWFkZXIuYXBwZW5kKGNoZWNrYm94LCBidG5IZWFkZXIpO1xuXG4gIC8vIEJvZHkgY29udGVudFxuICBpZiAoaGFzTm90ZXMob2JqLm5vdGVzKSkge1xuICAgIGluc2VydE5vdGUob2JqLm5vdGVzLCBpdGVtQm9keSk7XG4gIH1cbiAgaXRlbURldGFpbHMuYXBwZW5kQ2hpbGQoaXRlbUJvZHkpO1xuXG4gIC8vIEFwcGVuZCBlbGVtZW50cyB0byBsaXN0XG4gIGl0ZW0uYXBwZW5kKGhlYWRlciwgaXRlbURldGFpbHMpO1xuICBsaXN0LmFwcGVuZENoaWxkKGl0ZW0pO1xuICBpZiAoaXNDaGVja2VkKG9iaikpIGFkZENoZWNrZWQoY2hlY2tib3gsIGJ0bkhlYWRlcik7XG59XG5leHBvcnQgZGVmYXVsdCBhZGRMaW5lO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua3RvZG9fbGlzdFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt0b2RvX2xpc3RcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcIjNyZHBhcnRcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKDcyNzMpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=