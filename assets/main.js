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
function CreateItem(id, title, dueDate = 0, priority = 0, project = null, checked = false) {
  const notes = [];

  function addNote(val) { notes.push(val); }
  function deleteNote(pos) { notes.splice(pos, 1); }
  function editNote(pos, val) { notes[pos] = val; }
  const getAllNotes = () => notes;
  const getNote = (pos) => notes[pos];

  function updateItem(newValues) {
    const updatedValues = {
      title: (newValues.title !== undefined && newValues.title !== title)
        ? newValues.title : title,
      dueDate: (newValues.dueDate !== undefined && newValues.dueDate !== dueDate)
        ? newValues.dueDate : dueDate,
      project: (newValues.project !== undefined && newValues.project !== project)
        ? newValues.project : project,
      priority: (newValues.priority !== undefined && newValues.priority !== priority)
        ? newValues.priority : priority,
      checked: (newValues.checked !== undefined && newValues.checked !== checked)
        ? newValues.checked : checked,
    };
    return CreateItem(
      id,
      updatedValues.title,
      updatedValues.dueDate,
      updatedValues.priority,
      updatedValues.project,
      updatedValues.checked,
    );
  }

  return Object.freeze({
    id,
    title,
    dueDate,
    project,
    priority,
    checked,
    addNote,
    editNote,
    getNote,
    deleteNote,
    getAllNotes,
    updateItem,
  });
}

const todoList = (() => {
  const list = [];

  function findObjPos(idValue) {
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].id === parseInt(idValue, 10)) return i;
    }
    throw Error('Object not found');
  }

  const returnObj = (item) => ({
    title: item.title,
    project: item.project,
    dueDate: item.dueDate,
    priority: item.priority,
    checked: item.checked,
    notes: item.getAllNotes(),
    id: item.id,
  });

  const getItem = (id) => returnObj(list[findObjPos(id)]);
  const getLength = () => list.length;
  const allTasksList = () => list.map((obj) => (returnObj(obj)));
  function reset() { list.length = 0; }

  const getProjects = () => list.map((item) => item.project)
    .filter((value, pos, self) => value !== null && self.indexOf(value) === pos);

  function getBiggerId() {
    const latestObj = list.reduce((max, obj) => (obj.id > max.id ? obj : max), { id: 0 });
    console.log(latestObj);
    return latestObj.id;
  }

  function addItem(obj) {
    const id = list.length === 0 ? 0 : parseInt(getBiggerId(), 10) + 1;
    const newItem = CreateItem(id, obj.title, obj.dueDate, obj.priority, obj.project, obj.checked);
    list.push(newItem);
  }

  function editItem(objID, newObj) {
    const objToEdit = list[findObjPos(objID)];
    const result = objToEdit.updateItem(newObj);
    list[findObjPos(objID)] = result;
  }

  function setChecked(id) {
    const result = { checked: !list[findObjPos(id)].checked };
    editItem(id, result);
  }

  function editNote(id, pos, val) {
    list[findObjPos(id)].editNote(pos, val);
  }
  function addNote(id, val) {
    list[findObjPos(id)].addNote(val);
  }

  function deleteItem(id) {
    list.splice(findObjPos(id), 1);
  }

  const toJSON = () => JSON.stringify(list.map((item) => returnObj(item)));

  const restore = (data) => {
    reset();
    JSON.parse(data).forEach(
      ({
        id, title, project, dueDate, priority, checked, notes,
      }) => {
        const newItem = CreateItem(id, title, dueDate, priority, project, checked);
        notes.forEach((note) => newItem.addNote(note));
        list.push(newItem);
      },
    );
  };

  return {
    getLength,
    addNote,
    editNote,
    editItem,
    addItem,
    deleteItem,
    restore,
    toJSON,
    setChecked,
    getProjects,
    reset,
    returnObj,
    allTasksList,
    getItem,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (todoList);


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

/***/ 1444:
/*!***************************************!*\
  !*** ./src/assets/editConstructor.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ 3317);
/* harmony import */ var _uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uiCommonFunctions */ 4656);
/* harmony import */ var _uiController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uiController */ 5168);
/* eslint-disable import/no-cycle */




function save(title, dueDate, priority, project, notes, id) {
  const newObj = {
    title: title.value,
    dueDate: dueDate.value,
    priority: priority.value,
    project: project.value,
    notes,
  };
  if (id !== undefined) {
    _core__WEBPACK_IMPORTED_MODULE_0__["default"].editItem(id, newObj);
  } else {
    _core__WEBPACK_IMPORTED_MODULE_0__["default"].addItem(newObj);
  }
  _uiController__WEBPACK_IMPORTED_MODULE_2__["default"].update();
}

function uiEditItem(title, dueDate, priority, project, notes, id) {
  const modal = document.querySelector('div.modal-body');
  // creating elements
  const row1 = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', ['row']);
  const titleDiv = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', ['input-group', 'mb-3', 'gap-1']);
  const titleInput = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('input', ['form-control'], {
    id: 'itemTitle',
    type: 'text',
    placeholder: 'Nova Tarefa...',
  });
  const row2 = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', ['bg-gray', 'row', 'g-0', 'gap-2', 'flex-nowrap']);

  const dateDiv = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', ['date', 'flatpickr', 'col']);
  const dateInput = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('input', ['form-control', 'flatpickr-input'], {
    id: 'dueDate',
    type: 'text',
    inputmode: 'numeric',
    'data-input': undefined,
    autocomplete: 'off',
  });
  const datepickerToggle = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('a', ['input-button'], {
    title: 'toggle',
    'data-toggle': undefined,
  });
  const dateIcon = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('i', ['text-warning', 'small', 'bi', 'bi-calendar']);

  const priorityDiv = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', ['col']);
  const prioritySelect = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createPrioritySelect)(priority);

  const projectDiv = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', ['col']);
  const projectInput = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('input', ['form-control'], {
    id: 'enterProject',
    type: 'text',
    list: 'datalistOptions',
    placeholder: 'Projeto',
    autocomplete: 'off',
  });
  const projectDatalist = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('datalist', ['suggestions', 'form'], {
    id: 'datalistOptions',
    dropzone: 'string',
  });

  const row3 = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', ['row', 'pt-2']);

  const notesContainer = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', ['container']);
  const notesHeader = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('h6');
  const notesRow = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', ['row', 'g-2']);
  const notesList = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', ['notesList']);

  const addNoteRow = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', ['row', 'pt-2', 'justify-content-end']);

  const addNoteDiv = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', ['col-auto', 'small', 'text-danger', 'text-warning-emphasis']);
  const addNoteLink = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('a', [], { id: 'addNote' });
  const addNoteIcon = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('i', ['bi', 'bi-plus-circle']);
  const addNoteText = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('span');

  const row4 = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', ['row', 'g-2', 'pt-3', 'justify-content-start', 'flex-row-reverse']);

  const saveDiv = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', ['col-auto']);
  const saveBtn = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('button', ['btn', 'btn-warning'], {
    'data-bs-dismiss': 'modal',
  });
  const cancelDiv = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', ['col-auto']);
  const cancelBtn = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('button', ['btn', 'btn-secondary', 'text-light'], {
    'data-bs-dismiss': 'modal',
  });

  // append elements

  // row 1 (title)
  if (title && (typeof title === 'string' || typeof title.value !== 'undefined')) {
    titleInput.value = typeof title === 'string' ? title : title.value;
  }
  titleDiv.appendChild(titleInput);

  row1.appendChild(titleDiv);

  // row 2 (date, priority, project)

  // date
  if (dueDate !== undefined && dueDate !== 0) {
    dateInput.value = dueDate;
  }
  datepickerToggle.appendChild(dateIcon);
  dateDiv.append(dateInput, datepickerToggle);

  // priority
  priorityDiv.appendChild(prioritySelect);

  // project
  // console.log(project);
  if (typeof project !== 'undefined' && project !== 0) projectInput.value = project;
  projectDiv.append(projectInput, projectDatalist);

  row2.append(dateDiv, priorityDiv, projectDiv);

  // row3 (notes area)
  notesHeader.textContent = 'Notas';
  addNoteText.textContent = 'Nova nota';
  addNoteIcon.textContent = ' '; // fixing a problem for using js

  addNoteLink.append(addNoteIcon, addNoteText);
  addNoteDiv.appendChild(addNoteLink);
  addNoteRow.appendChild(addNoteDiv);
  if (notes) {
    notes.forEach((note) => {
      // preciso cirar o layout das notas
      notesList.innerHTML += `<span>${note}</span>`;
    });
  }
  notesRow.append(notesList, addNoteRow);
  notesContainer.append(notesHeader, notesRow);

  row3.appendChild(notesContainer);

  // row4 (buttons)
  cancelBtn.textContent = 'Cancel';
  saveBtn.textContent = 'Save';
  if (id !== undefined) saveBtn.addEventListener('click', () => save(titleInput, dateInput, prioritySelect, projectInput, notes, id));
  else saveBtn.addEventListener('click', () => save(titleInput, dateInput, prioritySelect, projectInput));
  saveDiv.appendChild(saveBtn);
  cancelDiv.appendChild(cancelBtn);

  row4.append(saveDiv, cancelDiv);

  modal.append(row1, row2, row3, row4);
  (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.dueDateMask)();
  (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.searchProjects)();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (uiEditItem);


/***/ }),

/***/ 2212:
/*!***************************************!*\
  !*** ./src/assets/listConstructor.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ 3317);
/* harmony import */ var _uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uiCommonFunctions */ 4656);
/* harmony import */ var _uiController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uiController */ 5168);
/* eslint-disable import/no-cycle */




function insertNote(notes, body) {
  notes.forEach((content) => {
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = content;
    body.appendChild(contentDiv);
  });
}

function addChecked(checkbox, button, priority) {
  checkbox.checked = true;
  button.classList.add('text-decoration-line-through', 'opacity-50');
  priority.classList.add('opacity-50');
}

function setCheckedHandler(e) {
  const { target } = e;
  const id = target.getAttribute('data-id');
  _core__WEBPACK_IMPORTED_MODULE_0__["default"].setChecked(id);
}

const prioritySettings = {
  0: { title: 'No priority', array: ['bi-octagon'] },
  1: { title: 'Priority 1', array: ['bi-exclamation-octagon-fill', 'text-success'] },
  2: { title: 'Priority 2', array: ['bi-exclamation-octagon-fill', 'text-warning'] },
  3: { title: 'Priority 3', array: ['bi-exclamation-octagon-fill', 'text-danger'] },
};

function selectPriority(num) {
  const obj = prioritySettings[num];
  const standardClasses = ['small', 'ms-2', 'bi'];
  const classes = standardClasses.concat(obj.array);
  const attrs = { 'data-toggle': 'tooltip', 'data-placement': 'top' };
  attrs.title = obj.title;

  return (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('i', classes, attrs);
}

function addLine(obj) {
  // header
  const item = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', ['accordion-item']);
  const header = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', ['accordion-header', 'p-1', 'd-flex', 'align-items-center', 'gap-1']);
  const checkbox = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('input', ['form-check-input', 'text-bg-warning'], {
    type: 'checkbox',
    'data-id': `${obj.id}`,
  });
  const btnHeader = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('button', ['accordion-button', 'collapsed', 'flex-fill'], {
    type: 'button',
    'data-bs-toggle': 'collapse',
    'aria-expanded': 'false',
    'data-bs-target': `#item-${obj.id}`,
  });
  const priority = selectPriority(obj.priority, 10);
  const span = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('span', ['flex-fill']);
  const code = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('code', ['small', 'text-muted']);

  // body
  const itemDetails = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', ['accordion-collapse', 'collapse'], {
    id: `item-${obj.id}`,
    'data-bs-parent': '#list',
  });
  const itemBody = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', ['accordion-body']);
  const editDeleteItem = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('div', ['d-flex', 'flex-row-reverse', 'col', 'gap-2']);

  const btnEdit = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('button', ['btn', 'btn-warning'], {
    'data-id': obj.id,
    'data-bs-target': '#exampleModal',
    'data-bs-toggle': 'modal',
  });
  const btnDelete = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('button', ['btn', 'btn-danger'], {
    'data-id': obj.id,
  });

  // EVENTLISTNERS OBJECTS
  checkbox.addEventListener('change', setCheckedHandler);

  // FILLING CONTENT
  // header
  span.textContent = obj.title;
  code.textContent = obj.project;

  // body
  btnEdit.textContent = 'Edit';
  btnDelete.textContent = 'Delete';

  // Appending content
  btnHeader.append(span, code);
  header.append(checkbox, priority, btnHeader);

  // Body content
  if ((0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.hasNotes)(obj.notes)) {
    insertNote(obj.notes, itemBody);
  }
  btnEdit.addEventListener('click', (elem) => {
    _uiController__WEBPACK_IMPORTED_MODULE_2__["default"].handlers.edit(elem);
  });
  btnDelete.addEventListener('click', _uiController__WEBPACK_IMPORTED_MODULE_2__["default"].handlers.deleteItem);
  editDeleteItem.append(btnDelete, btnEdit);
  itemBody.appendChild(editDeleteItem);
  itemDetails.appendChild(itemBody);

  // Append elements to list
  item.append(header, itemDetails);
  _uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.list.appendChild(item);
  if ((0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.isChecked)(obj)) addChecked(checkbox, btnHeader, priority);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addLine);


/***/ }),

/***/ 7273:
/*!******************************!*\
  !*** ./src/assets/script.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ 3157);
/* harmony import */ var _JSONFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./JSONFunctions */ 2875);
/* harmony import */ var _uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uiCommonFunctions */ 4656);
/* harmony import */ var _editConstructor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editConstructor */ 1444);
/* harmony import */ var _uiController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./uiController */ 5168);
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */







const homeLink = document.querySelector('a#home');
const projectsIcon = document.querySelector('div#projects');
const projectsDropdown = document.querySelector('div#projects div');
const mainModal = document.querySelector('div#exampleModal');

// set max height for list items
function setMaxHeight() {
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
    _uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.list.style.maxHeight = `${maxHeight}px`;
  } else _uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.list.style.maxHeight = 'none';
}

// eventListeners
// home page button functions
homeLink.addEventListener('click', () => {
  _uiController__WEBPACK_IMPORTED_MODULE_4__["default"].update('clear');
});
_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.addTask.addEventListener('click', _editConstructor__WEBPACK_IMPORTED_MODULE_3__["default"]);
_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.addField.addEventListener('keydown', _uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.showPlusBtn);
_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.addField.addEventListener('keyup', _uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.showPlusBtn);
_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.addMore.addEventListener('click', () => _uiController__WEBPACK_IMPORTED_MODULE_4__["default"].handlers.editMore(_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.input));
_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.quickSave.addEventListener('click', () => _uiController__WEBPACK_IMPORTED_MODULE_4__["default"].handlers.fastSave(_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.input));
// set height limit for list items
window.addEventListener('load', setMaxHeight);
window.addEventListener('resize', setMaxHeight);

// auto-save
window.addEventListener('change', () => {
  _uiController__WEBPACK_IMPORTED_MODULE_4__["default"].update();
  (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.showPlusBtn)();
});

// restore data when it's loaded
window.onload = (0,_JSONFunctions__WEBPACK_IMPORTED_MODULE_1__.restoreStorage)();

// menu for mobile version
document.addEventListener('click', (event) => {
  if (!event.target.closest('#projects')) {
    projectsDropdown.classList.add('menu-hide');
  }
});
projectsIcon.addEventListener('click', () => {
  if (projectsDropdown.classList.contains('menu-hide')) {
    projectsDropdown.classList.remove('menu-hide');
  } else {
    projectsDropdown.classList.add('menu-hide');
  }
});

// clear modal content everytime it's closed
mainModal.addEventListener('hidden.bs.modal', () => {
  (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.clearContent)(mainModal.querySelector('.modal-body'));
});

window.addEventListener('DOMContentLoaded', () => {
  const tooltips = document.querySelectorAll('[data-toggle="tooltip"]');
  tooltips.forEach((tip) => {
    // eslint-disable-next-line no-undef
    tip = new bootstrap.Tooltip(tip);
  });
}, false);

// start app
_uiController__WEBPACK_IMPORTED_MODULE_4__["default"].load();


/***/ }),

/***/ 4656:
/*!*****************************************!*\
  !*** ./src/assets/uiCommonFunctions.js ***!
  \*****************************************/
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
/* harmony export */   hasNotes: () => (/* binding */ hasNotes),
/* harmony export */   input: () => (/* binding */ input),
/* harmony export */   isChecked: () => (/* binding */ isChecked),
/* harmony export */   list: () => (/* binding */ list),
/* harmony export */   loadList: () => (/* binding */ loadList),
/* harmony export */   quickSave: () => (/* binding */ quickSave),
/* harmony export */   searchProjects: () => (/* binding */ searchProjects),
/* harmony export */   setAttrs: () => (/* binding */ setAttrs),
/* harmony export */   showPlusBtn: () => (/* binding */ showPlusBtn),
/* harmony export */   sortParam: () => (/* binding */ sortParam)
/* harmony export */ });
/* harmony import */ var flatpickr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flatpickr */ 5840);
/* harmony import */ var flatpickr_dist_l10n_pt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flatpickr/dist/l10n/pt */ 450);
/* harmony import */ var flatpickr_dist_l10n_pt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flatpickr_dist_l10n_pt__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var imask__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! imask */ 3303);
/* harmony import */ var _date__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./date */ 2782);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core */ 3317);






const list = document.querySelector('div#list');
const addField = document.querySelector('input#itemTitle');
const input = document.querySelector('input');
const addTask = document.querySelector('a#addItem');
const addMore = document.querySelector('button#addMore');
const quickSave = document.querySelector('button#saveItem');

const isChecked = (e) => e.checked === true;
const hasNotes = (obj) => obj.length > 0;
const loadList = () => [..._core__WEBPACK_IMPORTED_MODULE_4__["default"].allTasksList()];
const sortParam = (arr, param) => [...arr]
  .sort((a, b) => ((a[param] < b[param]) ? -1 : 1));

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

function createOption(value, text, selected) {
  const option = createElement('option', [], { value });
  option.textContent = text;
  if (selected) {
    option.setAttribute('selected', '');
  }
  return option;
}

function createPrioritySelect(num = 0) {
  const select = createElement('select', ['form-select'], {
    'aria-label': 'Priority',
  });
  for (let i = 0; i < 4; i += 1) {
    const text = i === 0 ? '-- Select Priority' : `Priority ${i}`;
    const selected = i === parseInt(num, 10);
    const option = createOption(i, text, selected);
    select.appendChild(option);
  }
  return select;
}

// UI FUNCTIONS

function clearContent(elem) {
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


/***/ }),

/***/ 5168:
/*!************************************!*\
  !*** ./src/assets/uiController.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _JSONFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JSONFunctions */ 2875);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core */ 3317);
/* harmony import */ var _editConstructor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editConstructor */ 1444);
/* harmony import */ var _listConstructor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./listConstructor */ 2212);
/* harmony import */ var _uiCommonFunctions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./uiCommonFunctions */ 4656);
/* eslint-disable import/no-cycle */






const displayProject = document.querySelector('ul#projects');

const filterProjects = () => _core__WEBPACK_IMPORTED_MODULE_1__["default"].getProjects()
  .filter((value, index, self) => value !== '' && self.indexOf(value) === index);

// UI Controller
const uiControl = (() => {
  let currentFilter = null;

  function setCurrentFilter(key, value) {
    if (typeof key !== 'undefined') currentFilter = { key, value };
    else currentFilter = null;
  }

  const filterArray = (arr, filter, value) => {
    if (filter) return [...arr.filter((objeto) => objeto[filter] === value)];
    return arr;
  };

  function load() {
    // add project list
    constructorProjectList();
    const uiList = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_4__.sortParam)((0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_4__.loadList)(), 'checked');
    if (currentFilter !== null) {
      filterArray(uiList, currentFilter.key, currentFilter.value).forEach(
        (obj) => {
          const index = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_4__.loadList)().findIndex((item) => item.id === obj.id);
          (0,_listConstructor__WEBPACK_IMPORTED_MODULE_3__["default"])(obj, index);
        },
      );
    } else {
      uiList.forEach((obj) => {
        const index = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_4__.loadList)().findIndex((item) => item.id === obj.id);
        (0,_listConstructor__WEBPACK_IMPORTED_MODULE_3__["default"])(obj, index);
      });
    }
  }

  function update(filter, value) {
    (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_4__.clearContent)(_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_4__.list);
    (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_4__.clearContent)(displayProject);
    if (typeof filter !== 'undefined') setCurrentFilter(filter, value);
    if (filter === 'clear') setCurrentFilter();
    load();
    (0,_JSONFunctions__WEBPACK_IMPORTED_MODULE_0__.populateStorage)();
    console.warn('Updated!');
  }

  function constructorProjectList() {
    const projects = filterProjects();
    if (projects.length !== 0) {
      projects.forEach((value) => {
        const listItem = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_4__.createElement)('li', ['d-flex', 'align-items-center']);
        const iconItem = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_4__.createElement)('i', ['bi', 'bi-hash', 'fs-4']);
        const link = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_4__.createElement)('a', [], { 'data-value': value });

        link.textContent = value;
        link.addEventListener('click', () => update('project', link.getAttribute('data-value')));

        listItem.append(iconItem, link);

        displayProject.appendChild(listItem);
      });
    } else displayProject.innerHTML = '<li class="d-flex align-items-center">No projects yet :(</li>';
  }

  const handlers = (() => {
    // home buttons
    function editMore(title) {
      (0,_editConstructor__WEBPACK_IMPORTED_MODULE_2__["default"])(title);
      title.value = '';
    }

    function fastSave(title) {
      const newObj = { title: title.value };
      _core__WEBPACK_IMPORTED_MODULE_1__["default"].addItem(newObj);
      title.value = '';
      update();
    }

    function edit(elem) {
      elem.stopImmediatePropagation();
      const { target } = elem;
      const obj = _core__WEBPACK_IMPORTED_MODULE_1__["default"].getItem(target.getAttribute('data-id'));
      (0,_editConstructor__WEBPACK_IMPORTED_MODULE_2__["default"])(
        obj.title,
        obj.dueDate,
        obj.priority,
        obj.project,
        obj.notes,
        obj.id,
      );
    }

    function deleteItem(item) {
      const { target } = item;
      _core__WEBPACK_IMPORTED_MODULE_1__["default"].deleteItem(target.getAttribute('data-id'));
      update();
    }

    return {
      editMore,
      fastSave,
      edit,
      deleteItem,
    };
  })();

  return {
    handlers,
    setCurrentFilter,
    load,
    update,
  };
})();

// ADD/EDIT ITEMS
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (uiControl);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9KU09ORnVuY3Rpb25zLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvY29yZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL2RhdGUuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9lZGl0Q29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9saXN0Q29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9zY3JpcHQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy91aUNvbW1vbkZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL3VpQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcbi8vIGltcG9ydCBhZGRMaW5lIGZyb20gJy4vdWlMaXN0R2VuZXJhdG9yJztcblxuZXhwb3J0IGZ1bmN0aW9uIHBvcHVsYXRlU3RvcmFnZSgpIHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhdGEnLCB0b2RvTGlzdC50b0pTT04oKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXN0b3JlU3RvcmFnZSgpIHtcbiAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXRhJykgPT09IG51bGwpIHJldHVybjtcbiAgdG9kb0xpc3QucmVzdG9yZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGF0YScpKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbm5lY3QoKSB7XG4gIGNvbnN0IHJlcXVlc3RVUkwgPSAnLi9hc3NldHMvZGF0YS5qc29uJztcbiAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IGZldGNoKHJlcXVlc3RVUkwpO1xuICBpZiAoIXJlcXVlc3Qub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIFN0YXR1czogJHtyZXF1ZXN0LnN0YXR1c31gKTtcbiAgfVxuXG4gIHJldHVybiByZXF1ZXN0O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcG9wdWxhdGUoKSB7XG4gIGNvbnN0IHZhbHVlID0gYXdhaXQgY29ubmVjdCgpO1xuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0KCkge1xuICB0b2RvTGlzdC5yZXN0b3JlKHBvcHVsYXRlKCkpO1xufVxuIiwiZnVuY3Rpb24gQ3JlYXRlSXRlbShpZCwgdGl0bGUsIGR1ZURhdGUgPSAwLCBwcmlvcml0eSA9IDAsIHByb2plY3QgPSBudWxsLCBjaGVja2VkID0gZmFsc2UpIHtcbiAgY29uc3Qgbm90ZXMgPSBbXTtcblxuICBmdW5jdGlvbiBhZGROb3RlKHZhbCkgeyBub3Rlcy5wdXNoKHZhbCk7IH1cbiAgZnVuY3Rpb24gZGVsZXRlTm90ZShwb3MpIHsgbm90ZXMuc3BsaWNlKHBvcywgMSk7IH1cbiAgZnVuY3Rpb24gZWRpdE5vdGUocG9zLCB2YWwpIHsgbm90ZXNbcG9zXSA9IHZhbDsgfVxuICBjb25zdCBnZXRBbGxOb3RlcyA9ICgpID0+IG5vdGVzO1xuICBjb25zdCBnZXROb3RlID0gKHBvcykgPT4gbm90ZXNbcG9zXTtcblxuICBmdW5jdGlvbiB1cGRhdGVJdGVtKG5ld1ZhbHVlcykge1xuICAgIGNvbnN0IHVwZGF0ZWRWYWx1ZXMgPSB7XG4gICAgICB0aXRsZTogKG5ld1ZhbHVlcy50aXRsZSAhPT0gdW5kZWZpbmVkICYmIG5ld1ZhbHVlcy50aXRsZSAhPT0gdGl0bGUpXG4gICAgICAgID8gbmV3VmFsdWVzLnRpdGxlIDogdGl0bGUsXG4gICAgICBkdWVEYXRlOiAobmV3VmFsdWVzLmR1ZURhdGUgIT09IHVuZGVmaW5lZCAmJiBuZXdWYWx1ZXMuZHVlRGF0ZSAhPT0gZHVlRGF0ZSlcbiAgICAgICAgPyBuZXdWYWx1ZXMuZHVlRGF0ZSA6IGR1ZURhdGUsXG4gICAgICBwcm9qZWN0OiAobmV3VmFsdWVzLnByb2plY3QgIT09IHVuZGVmaW5lZCAmJiBuZXdWYWx1ZXMucHJvamVjdCAhPT0gcHJvamVjdClcbiAgICAgICAgPyBuZXdWYWx1ZXMucHJvamVjdCA6IHByb2plY3QsXG4gICAgICBwcmlvcml0eTogKG5ld1ZhbHVlcy5wcmlvcml0eSAhPT0gdW5kZWZpbmVkICYmIG5ld1ZhbHVlcy5wcmlvcml0eSAhPT0gcHJpb3JpdHkpXG4gICAgICAgID8gbmV3VmFsdWVzLnByaW9yaXR5IDogcHJpb3JpdHksXG4gICAgICBjaGVja2VkOiAobmV3VmFsdWVzLmNoZWNrZWQgIT09IHVuZGVmaW5lZCAmJiBuZXdWYWx1ZXMuY2hlY2tlZCAhPT0gY2hlY2tlZClcbiAgICAgICAgPyBuZXdWYWx1ZXMuY2hlY2tlZCA6IGNoZWNrZWQsXG4gICAgfTtcbiAgICByZXR1cm4gQ3JlYXRlSXRlbShcbiAgICAgIGlkLFxuICAgICAgdXBkYXRlZFZhbHVlcy50aXRsZSxcbiAgICAgIHVwZGF0ZWRWYWx1ZXMuZHVlRGF0ZSxcbiAgICAgIHVwZGF0ZWRWYWx1ZXMucHJpb3JpdHksXG4gICAgICB1cGRhdGVkVmFsdWVzLnByb2plY3QsXG4gICAgICB1cGRhdGVkVmFsdWVzLmNoZWNrZWQsXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBPYmplY3QuZnJlZXplKHtcbiAgICBpZCxcbiAgICB0aXRsZSxcbiAgICBkdWVEYXRlLFxuICAgIHByb2plY3QsXG4gICAgcHJpb3JpdHksXG4gICAgY2hlY2tlZCxcbiAgICBhZGROb3RlLFxuICAgIGVkaXROb3RlLFxuICAgIGdldE5vdGUsXG4gICAgZGVsZXRlTm90ZSxcbiAgICBnZXRBbGxOb3RlcyxcbiAgICB1cGRhdGVJdGVtLFxuICB9KTtcbn1cblxuY29uc3QgdG9kb0xpc3QgPSAoKCkgPT4ge1xuICBjb25zdCBsaXN0ID0gW107XG5cbiAgZnVuY3Rpb24gZmluZE9ialBvcyhpZFZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAobGlzdFtpXS5pZCA9PT0gcGFyc2VJbnQoaWRWYWx1ZSwgMTApKSByZXR1cm4gaTtcbiAgICB9XG4gICAgdGhyb3cgRXJyb3IoJ09iamVjdCBub3QgZm91bmQnKTtcbiAgfVxuXG4gIGNvbnN0IHJldHVybk9iaiA9IChpdGVtKSA9PiAoe1xuICAgIHRpdGxlOiBpdGVtLnRpdGxlLFxuICAgIHByb2plY3Q6IGl0ZW0ucHJvamVjdCxcbiAgICBkdWVEYXRlOiBpdGVtLmR1ZURhdGUsXG4gICAgcHJpb3JpdHk6IGl0ZW0ucHJpb3JpdHksXG4gICAgY2hlY2tlZDogaXRlbS5jaGVja2VkLFxuICAgIG5vdGVzOiBpdGVtLmdldEFsbE5vdGVzKCksXG4gICAgaWQ6IGl0ZW0uaWQsXG4gIH0pO1xuXG4gIGNvbnN0IGdldEl0ZW0gPSAoaWQpID0+IHJldHVybk9iaihsaXN0W2ZpbmRPYmpQb3MoaWQpXSk7XG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxpc3QubGVuZ3RoO1xuICBjb25zdCBhbGxUYXNrc0xpc3QgPSAoKSA9PiBsaXN0Lm1hcCgob2JqKSA9PiAocmV0dXJuT2JqKG9iaikpKTtcbiAgZnVuY3Rpb24gcmVzZXQoKSB7IGxpc3QubGVuZ3RoID0gMDsgfVxuXG4gIGNvbnN0IGdldFByb2plY3RzID0gKCkgPT4gbGlzdC5tYXAoKGl0ZW0pID0+IGl0ZW0ucHJvamVjdClcbiAgICAuZmlsdGVyKCh2YWx1ZSwgcG9zLCBzZWxmKSA9PiB2YWx1ZSAhPT0gbnVsbCAmJiBzZWxmLmluZGV4T2YodmFsdWUpID09PSBwb3MpO1xuXG4gIGZ1bmN0aW9uIGdldEJpZ2dlcklkKCkge1xuICAgIGNvbnN0IGxhdGVzdE9iaiA9IGxpc3QucmVkdWNlKChtYXgsIG9iaikgPT4gKG9iai5pZCA+IG1heC5pZCA/IG9iaiA6IG1heCksIHsgaWQ6IDAgfSk7XG4gICAgY29uc29sZS5sb2cobGF0ZXN0T2JqKTtcbiAgICByZXR1cm4gbGF0ZXN0T2JqLmlkO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkSXRlbShvYmopIHtcbiAgICBjb25zdCBpZCA9IGxpc3QubGVuZ3RoID09PSAwID8gMCA6IHBhcnNlSW50KGdldEJpZ2dlcklkKCksIDEwKSArIDE7XG4gICAgY29uc3QgbmV3SXRlbSA9IENyZWF0ZUl0ZW0oaWQsIG9iai50aXRsZSwgb2JqLmR1ZURhdGUsIG9iai5wcmlvcml0eSwgb2JqLnByb2plY3QsIG9iai5jaGVja2VkKTtcbiAgICBsaXN0LnB1c2gobmV3SXRlbSk7XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0SXRlbShvYmpJRCwgbmV3T2JqKSB7XG4gICAgY29uc3Qgb2JqVG9FZGl0ID0gbGlzdFtmaW5kT2JqUG9zKG9iaklEKV07XG4gICAgY29uc3QgcmVzdWx0ID0gb2JqVG9FZGl0LnVwZGF0ZUl0ZW0obmV3T2JqKTtcbiAgICBsaXN0W2ZpbmRPYmpQb3Mob2JqSUQpXSA9IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldENoZWNrZWQoaWQpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7IGNoZWNrZWQ6ICFsaXN0W2ZpbmRPYmpQb3MoaWQpXS5jaGVja2VkIH07XG4gICAgZWRpdEl0ZW0oaWQsIHJlc3VsdCk7XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0Tm90ZShpZCwgcG9zLCB2YWwpIHtcbiAgICBsaXN0W2ZpbmRPYmpQb3MoaWQpXS5lZGl0Tm90ZShwb3MsIHZhbCk7XG4gIH1cbiAgZnVuY3Rpb24gYWRkTm90ZShpZCwgdmFsKSB7XG4gICAgbGlzdFtmaW5kT2JqUG9zKGlkKV0uYWRkTm90ZSh2YWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVsZXRlSXRlbShpZCkge1xuICAgIGxpc3Quc3BsaWNlKGZpbmRPYmpQb3MoaWQpLCAxKTtcbiAgfVxuXG4gIGNvbnN0IHRvSlNPTiA9ICgpID0+IEpTT04uc3RyaW5naWZ5KGxpc3QubWFwKChpdGVtKSA9PiByZXR1cm5PYmooaXRlbSkpKTtcblxuICBjb25zdCByZXN0b3JlID0gKGRhdGEpID0+IHtcbiAgICByZXNldCgpO1xuICAgIEpTT04ucGFyc2UoZGF0YSkuZm9yRWFjaChcbiAgICAgICh7XG4gICAgICAgIGlkLCB0aXRsZSwgcHJvamVjdCwgZHVlRGF0ZSwgcHJpb3JpdHksIGNoZWNrZWQsIG5vdGVzLFxuICAgICAgfSkgPT4ge1xuICAgICAgICBjb25zdCBuZXdJdGVtID0gQ3JlYXRlSXRlbShpZCwgdGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0LCBjaGVja2VkKTtcbiAgICAgICAgbm90ZXMuZm9yRWFjaCgobm90ZSkgPT4gbmV3SXRlbS5hZGROb3RlKG5vdGUpKTtcbiAgICAgICAgbGlzdC5wdXNoKG5ld0l0ZW0pO1xuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZ2V0TGVuZ3RoLFxuICAgIGFkZE5vdGUsXG4gICAgZWRpdE5vdGUsXG4gICAgZWRpdEl0ZW0sXG4gICAgYWRkSXRlbSxcbiAgICBkZWxldGVJdGVtLFxuICAgIHJlc3RvcmUsXG4gICAgdG9KU09OLFxuICAgIHNldENoZWNrZWQsXG4gICAgZ2V0UHJvamVjdHMsXG4gICAgcmVzZXQsXG4gICAgcmV0dXJuT2JqLFxuICAgIGFsbFRhc2tzTGlzdCxcbiAgICBnZXRJdGVtLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdG9kb0xpc3Q7XG4iLCIvLyBpbXBvcnQgeyBwdEJSIH0gZnJvbSAnZGF0ZS1mbnMvbG9jYWxlJztcbmltcG9ydCB7IGZvcm1hdCB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCBJTWFzayBmcm9tICdpbWFzayc7XG5cbmNvbnN0IHNwbGl0VG9Db2RlID0gKGRhdGUpID0+IGRhdGUuc3BsaXQoJy8nKS5yZXZlcnNlKCkuam9pbignLycpLnJlcGxhY2VBbGwoJy8nLCAnLCAnKTtcbmV4cG9ydCBjb25zdCB0b0lucHV0ID0gKGRhdGEpID0+IGZvcm1hdChuZXcgRGF0ZShzcGxpdFRvQ29kZShkYXRhKSksICdkZC9MTC95eXl5Jyk7XG4vLyBjb25zdCBnZXREYXRhID0gKGFycikgPT4gYXJyLmZvckVhY2goZWxlbWVudCA9PiB7XG5cbi8vIH0pO1xuXG5leHBvcnQgY29uc3QgbWFza0RhdGUgPSB7XG4gIG1hc2s6ICdkL2BtL2BZJyxcbiAgYmxvY2tzOiB7XG4gICAgZDoge1xuICAgICAgbWFzazogSU1hc2suTWFza2VkUmFuZ2UsXG4gICAgICBwbGFjZWhvbGRlckNoYXI6ICdkJyxcbiAgICAgIGZyb206IDEsXG4gICAgICB0bzogMzEsXG4gICAgICBtYXhMZW5ndGg6IDIsXG4gICAgfSxcbiAgICBtOiB7XG4gICAgICBtYXNrOiBJTWFzay5NYXNrZWRSYW5nZSxcbiAgICAgIHBsYWNlaG9sZGVyQ2hhcjogJ20nLFxuICAgICAgZnJvbTogMSxcbiAgICAgIHRvOiAxMixcbiAgICAgIG1heExlbmd0aDogMixcbiAgICB9LFxuICAgIFk6IHtcbiAgICAgIG1hc2s6IElNYXNrLk1hc2tlZFJhbmdlLFxuICAgICAgcGxhY2Vob2xkZXJDaGFyOiAnYScsXG4gICAgICBmcm9tOiAxMDAwLFxuICAgICAgdG86IDk5OTksXG4gICAgfSxcbiAgfSxcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tY3ljbGUgKi9cbmltcG9ydCB0b2RvTGlzdCBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IHtcbiAgY3JlYXRlRWxlbWVudCwgY3JlYXRlUHJpb3JpdHlTZWxlY3QsIGR1ZURhdGVNYXNrLCBzZWFyY2hQcm9qZWN0cyxcbn0gZnJvbSAnLi91aUNvbW1vbkZ1bmN0aW9ucyc7XG5pbXBvcnQgdWlDb250cm9sIGZyb20gJy4vdWlDb250cm9sbGVyJztcblxuZnVuY3Rpb24gc2F2ZSh0aXRsZSwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QsIG5vdGVzLCBpZCkge1xuICBjb25zdCBuZXdPYmogPSB7XG4gICAgdGl0bGU6IHRpdGxlLnZhbHVlLFxuICAgIGR1ZURhdGU6IGR1ZURhdGUudmFsdWUsXG4gICAgcHJpb3JpdHk6IHByaW9yaXR5LnZhbHVlLFxuICAgIHByb2plY3Q6IHByb2plY3QudmFsdWUsXG4gICAgbm90ZXMsXG4gIH07XG4gIGlmIChpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdG9kb0xpc3QuZWRpdEl0ZW0oaWQsIG5ld09iaik7XG4gIH0gZWxzZSB7XG4gICAgdG9kb0xpc3QuYWRkSXRlbShuZXdPYmopO1xuICB9XG4gIHVpQ29udHJvbC51cGRhdGUoKTtcbn1cblxuZnVuY3Rpb24gdWlFZGl0SXRlbSh0aXRsZSwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QsIG5vdGVzLCBpZCkge1xuICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5tb2RhbC1ib2R5Jyk7XG4gIC8vIGNyZWF0aW5nIGVsZW1lbnRzXG4gIGNvbnN0IHJvdzEgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3JvdyddKTtcbiAgY29uc3QgdGl0bGVEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2lucHV0LWdyb3VwJywgJ21iLTMnLCAnZ2FwLTEnXSk7XG4gIGNvbnN0IHRpdGxlSW5wdXQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIFsnZm9ybS1jb250cm9sJ10sIHtcbiAgICBpZDogJ2l0ZW1UaXRsZScsXG4gICAgdHlwZTogJ3RleHQnLFxuICAgIHBsYWNlaG9sZGVyOiAnTm92YSBUYXJlZmEuLi4nLFxuICB9KTtcbiAgY29uc3Qgcm93MiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnYmctZ3JheScsICdyb3cnLCAnZy0wJywgJ2dhcC0yJywgJ2ZsZXgtbm93cmFwJ10pO1xuXG4gIGNvbnN0IGRhdGVEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2RhdGUnLCAnZmxhdHBpY2tyJywgJ2NvbCddKTtcbiAgY29uc3QgZGF0ZUlucHV0ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2Zvcm0tY29udHJvbCcsICdmbGF0cGlja3ItaW5wdXQnXSwge1xuICAgIGlkOiAnZHVlRGF0ZScsXG4gICAgdHlwZTogJ3RleHQnLFxuICAgIGlucHV0bW9kZTogJ251bWVyaWMnLFxuICAgICdkYXRhLWlucHV0JzogdW5kZWZpbmVkLFxuICAgIGF1dG9jb21wbGV0ZTogJ29mZicsXG4gIH0pO1xuICBjb25zdCBkYXRlcGlja2VyVG9nZ2xlID0gY3JlYXRlRWxlbWVudCgnYScsIFsnaW5wdXQtYnV0dG9uJ10sIHtcbiAgICB0aXRsZTogJ3RvZ2dsZScsXG4gICAgJ2RhdGEtdG9nZ2xlJzogdW5kZWZpbmVkLFxuICB9KTtcbiAgY29uc3QgZGF0ZUljb24gPSBjcmVhdGVFbGVtZW50KCdpJywgWyd0ZXh0LXdhcm5pbmcnLCAnc21hbGwnLCAnYmknLCAnYmktY2FsZW5kYXInXSk7XG5cbiAgY29uc3QgcHJpb3JpdHlEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbCddKTtcbiAgY29uc3QgcHJpb3JpdHlTZWxlY3QgPSBjcmVhdGVQcmlvcml0eVNlbGVjdChwcmlvcml0eSk7XG5cbiAgY29uc3QgcHJvamVjdERpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29sJ10pO1xuICBjb25zdCBwcm9qZWN0SW5wdXQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIFsnZm9ybS1jb250cm9sJ10sIHtcbiAgICBpZDogJ2VudGVyUHJvamVjdCcsXG4gICAgdHlwZTogJ3RleHQnLFxuICAgIGxpc3Q6ICdkYXRhbGlzdE9wdGlvbnMnLFxuICAgIHBsYWNlaG9sZGVyOiAnUHJvamV0bycsXG4gICAgYXV0b2NvbXBsZXRlOiAnb2ZmJyxcbiAgfSk7XG4gIGNvbnN0IHByb2plY3REYXRhbGlzdCA9IGNyZWF0ZUVsZW1lbnQoJ2RhdGFsaXN0JywgWydzdWdnZXN0aW9ucycsICdmb3JtJ10sIHtcbiAgICBpZDogJ2RhdGFsaXN0T3B0aW9ucycsXG4gICAgZHJvcHpvbmU6ICdzdHJpbmcnLFxuICB9KTtcblxuICBjb25zdCByb3czID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnLCAncHQtMiddKTtcblxuICBjb25zdCBub3Rlc0NvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29udGFpbmVyJ10pO1xuICBjb25zdCBub3Rlc0hlYWRlciA9IGNyZWF0ZUVsZW1lbnQoJ2g2Jyk7XG4gIGNvbnN0IG5vdGVzUm93ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnLCAnZy0yJ10pO1xuICBjb25zdCBub3Rlc0xpc3QgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ25vdGVzTGlzdCddKTtcblxuICBjb25zdCBhZGROb3RlUm93ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnLCAncHQtMicsICdqdXN0aWZ5LWNvbnRlbnQtZW5kJ10pO1xuXG4gIGNvbnN0IGFkZE5vdGVEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbC1hdXRvJywgJ3NtYWxsJywgJ3RleHQtZGFuZ2VyJywgJ3RleHQtd2FybmluZy1lbXBoYXNpcyddKTtcbiAgY29uc3QgYWRkTm90ZUxpbmsgPSBjcmVhdGVFbGVtZW50KCdhJywgW10sIHsgaWQ6ICdhZGROb3RlJyB9KTtcbiAgY29uc3QgYWRkTm90ZUljb24gPSBjcmVhdGVFbGVtZW50KCdpJywgWydiaScsICdiaS1wbHVzLWNpcmNsZSddKTtcbiAgY29uc3QgYWRkTm90ZVRleHQgPSBjcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgY29uc3Qgcm93NCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncm93JywgJ2ctMicsICdwdC0zJywgJ2p1c3RpZnktY29udGVudC1zdGFydCcsICdmbGV4LXJvdy1yZXZlcnNlJ10pO1xuXG4gIGNvbnN0IHNhdmVEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbC1hdXRvJ10pO1xuICBjb25zdCBzYXZlQnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgWydidG4nLCAnYnRuLXdhcm5pbmcnXSwge1xuICAgICdkYXRhLWJzLWRpc21pc3MnOiAnbW9kYWwnLFxuICB9KTtcbiAgY29uc3QgY2FuY2VsRGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydjb2wtYXV0byddKTtcbiAgY29uc3QgY2FuY2VsQnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgWydidG4nLCAnYnRuLXNlY29uZGFyeScsICd0ZXh0LWxpZ2h0J10sIHtcbiAgICAnZGF0YS1icy1kaXNtaXNzJzogJ21vZGFsJyxcbiAgfSk7XG5cbiAgLy8gYXBwZW5kIGVsZW1lbnRzXG5cbiAgLy8gcm93IDEgKHRpdGxlKVxuICBpZiAodGl0bGUgJiYgKHR5cGVvZiB0aXRsZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHRpdGxlLnZhbHVlICE9PSAndW5kZWZpbmVkJykpIHtcbiAgICB0aXRsZUlucHV0LnZhbHVlID0gdHlwZW9mIHRpdGxlID09PSAnc3RyaW5nJyA/IHRpdGxlIDogdGl0bGUudmFsdWU7XG4gIH1cbiAgdGl0bGVEaXYuYXBwZW5kQ2hpbGQodGl0bGVJbnB1dCk7XG5cbiAgcm93MS5hcHBlbmRDaGlsZCh0aXRsZURpdik7XG5cbiAgLy8gcm93IDIgKGRhdGUsIHByaW9yaXR5LCBwcm9qZWN0KVxuXG4gIC8vIGRhdGVcbiAgaWYgKGR1ZURhdGUgIT09IHVuZGVmaW5lZCAmJiBkdWVEYXRlICE9PSAwKSB7XG4gICAgZGF0ZUlucHV0LnZhbHVlID0gZHVlRGF0ZTtcbiAgfVxuICBkYXRlcGlja2VyVG9nZ2xlLmFwcGVuZENoaWxkKGRhdGVJY29uKTtcbiAgZGF0ZURpdi5hcHBlbmQoZGF0ZUlucHV0LCBkYXRlcGlja2VyVG9nZ2xlKTtcblxuICAvLyBwcmlvcml0eVxuICBwcmlvcml0eURpdi5hcHBlbmRDaGlsZChwcmlvcml0eVNlbGVjdCk7XG5cbiAgLy8gcHJvamVjdFxuICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0KTtcbiAgaWYgKHR5cGVvZiBwcm9qZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBwcm9qZWN0ICE9PSAwKSBwcm9qZWN0SW5wdXQudmFsdWUgPSBwcm9qZWN0O1xuICBwcm9qZWN0RGl2LmFwcGVuZChwcm9qZWN0SW5wdXQsIHByb2plY3REYXRhbGlzdCk7XG5cbiAgcm93Mi5hcHBlbmQoZGF0ZURpdiwgcHJpb3JpdHlEaXYsIHByb2plY3REaXYpO1xuXG4gIC8vIHJvdzMgKG5vdGVzIGFyZWEpXG4gIG5vdGVzSGVhZGVyLnRleHRDb250ZW50ID0gJ05vdGFzJztcbiAgYWRkTm90ZVRleHQudGV4dENvbnRlbnQgPSAnTm92YSBub3RhJztcbiAgYWRkTm90ZUljb24udGV4dENvbnRlbnQgPSAnICc7IC8vIGZpeGluZyBhIHByb2JsZW0gZm9yIHVzaW5nIGpzXG5cbiAgYWRkTm90ZUxpbmsuYXBwZW5kKGFkZE5vdGVJY29uLCBhZGROb3RlVGV4dCk7XG4gIGFkZE5vdGVEaXYuYXBwZW5kQ2hpbGQoYWRkTm90ZUxpbmspO1xuICBhZGROb3RlUm93LmFwcGVuZENoaWxkKGFkZE5vdGVEaXYpO1xuICBpZiAobm90ZXMpIHtcbiAgICBub3Rlcy5mb3JFYWNoKChub3RlKSA9PiB7XG4gICAgICAvLyBwcmVjaXNvIGNpcmFyIG8gbGF5b3V0IGRhcyBub3Rhc1xuICAgICAgbm90ZXNMaXN0LmlubmVySFRNTCArPSBgPHNwYW4+JHtub3RlfTwvc3Bhbj5gO1xuICAgIH0pO1xuICB9XG4gIG5vdGVzUm93LmFwcGVuZChub3Rlc0xpc3QsIGFkZE5vdGVSb3cpO1xuICBub3Rlc0NvbnRhaW5lci5hcHBlbmQobm90ZXNIZWFkZXIsIG5vdGVzUm93KTtcblxuICByb3czLmFwcGVuZENoaWxkKG5vdGVzQ29udGFpbmVyKTtcblxuICAvLyByb3c0IChidXR0b25zKVxuICBjYW5jZWxCdG4udGV4dENvbnRlbnQgPSAnQ2FuY2VsJztcbiAgc2F2ZUJ0bi50ZXh0Q29udGVudCA9ICdTYXZlJztcbiAgaWYgKGlkICE9PSB1bmRlZmluZWQpIHNhdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzYXZlKHRpdGxlSW5wdXQsIGRhdGVJbnB1dCwgcHJpb3JpdHlTZWxlY3QsIHByb2plY3RJbnB1dCwgbm90ZXMsIGlkKSk7XG4gIGVsc2Ugc2F2ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNhdmUodGl0bGVJbnB1dCwgZGF0ZUlucHV0LCBwcmlvcml0eVNlbGVjdCwgcHJvamVjdElucHV0KSk7XG4gIHNhdmVEaXYuYXBwZW5kQ2hpbGQoc2F2ZUJ0bik7XG4gIGNhbmNlbERpdi5hcHBlbmRDaGlsZChjYW5jZWxCdG4pO1xuXG4gIHJvdzQuYXBwZW5kKHNhdmVEaXYsIGNhbmNlbERpdik7XG5cbiAgbW9kYWwuYXBwZW5kKHJvdzEsIHJvdzIsIHJvdzMsIHJvdzQpO1xuICBkdWVEYXRlTWFzaygpO1xuICBzZWFyY2hQcm9qZWN0cygpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB1aUVkaXRJdGVtO1xuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWN5Y2xlICovXG5pbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcbmltcG9ydCB7XG4gIGNyZWF0ZUVsZW1lbnQsIGhhc05vdGVzLCBpc0NoZWNrZWQsIGxpc3QsXG59IGZyb20gJy4vdWlDb21tb25GdW5jdGlvbnMnO1xuaW1wb3J0IHVpQ29udHJvbCBmcm9tICcuL3VpQ29udHJvbGxlcic7XG5cbmZ1bmN0aW9uIGluc2VydE5vdGUobm90ZXMsIGJvZHkpIHtcbiAgbm90ZXMuZm9yRWFjaCgoY29udGVudCkgPT4ge1xuICAgIGNvbnN0IGNvbnRlbnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250ZW50RGl2LmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgYm9keS5hcHBlbmRDaGlsZChjb250ZW50RGl2KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZENoZWNrZWQoY2hlY2tib3gsIGJ1dHRvbiwgcHJpb3JpdHkpIHtcbiAgY2hlY2tib3guY2hlY2tlZCA9IHRydWU7XG4gIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCd0ZXh0LWRlY29yYXRpb24tbGluZS10aHJvdWdoJywgJ29wYWNpdHktNTAnKTtcbiAgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgnb3BhY2l0eS01MCcpO1xufVxuXG5mdW5jdGlvbiBzZXRDaGVja2VkSGFuZGxlcihlKSB7XG4gIGNvbnN0IHsgdGFyZ2V0IH0gPSBlO1xuICBjb25zdCBpZCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcbiAgdG9kb0xpc3Quc2V0Q2hlY2tlZChpZCk7XG59XG5cbmNvbnN0IHByaW9yaXR5U2V0dGluZ3MgPSB7XG4gIDA6IHsgdGl0bGU6ICdObyBwcmlvcml0eScsIGFycmF5OiBbJ2JpLW9jdGFnb24nXSB9LFxuICAxOiB7IHRpdGxlOiAnUHJpb3JpdHkgMScsIGFycmF5OiBbJ2JpLWV4Y2xhbWF0aW9uLW9jdGFnb24tZmlsbCcsICd0ZXh0LXN1Y2Nlc3MnXSB9LFxuICAyOiB7IHRpdGxlOiAnUHJpb3JpdHkgMicsIGFycmF5OiBbJ2JpLWV4Y2xhbWF0aW9uLW9jdGFnb24tZmlsbCcsICd0ZXh0LXdhcm5pbmcnXSB9LFxuICAzOiB7IHRpdGxlOiAnUHJpb3JpdHkgMycsIGFycmF5OiBbJ2JpLWV4Y2xhbWF0aW9uLW9jdGFnb24tZmlsbCcsICd0ZXh0LWRhbmdlciddIH0sXG59O1xuXG5mdW5jdGlvbiBzZWxlY3RQcmlvcml0eShudW0pIHtcbiAgY29uc3Qgb2JqID0gcHJpb3JpdHlTZXR0aW5nc1tudW1dO1xuICBjb25zdCBzdGFuZGFyZENsYXNzZXMgPSBbJ3NtYWxsJywgJ21zLTInLCAnYmknXTtcbiAgY29uc3QgY2xhc3NlcyA9IHN0YW5kYXJkQ2xhc3Nlcy5jb25jYXQob2JqLmFycmF5KTtcbiAgY29uc3QgYXR0cnMgPSB7ICdkYXRhLXRvZ2dsZSc6ICd0b29sdGlwJywgJ2RhdGEtcGxhY2VtZW50JzogJ3RvcCcgfTtcbiAgYXR0cnMudGl0bGUgPSBvYmoudGl0bGU7XG5cbiAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoJ2knLCBjbGFzc2VzLCBhdHRycyk7XG59XG5cbmZ1bmN0aW9uIGFkZExpbmUob2JqKSB7XG4gIC8vIGhlYWRlclxuICBjb25zdCBpdGVtID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydhY2NvcmRpb24taXRlbSddKTtcbiAgY29uc3QgaGVhZGVyID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydhY2NvcmRpb24taGVhZGVyJywgJ3AtMScsICdkLWZsZXgnLCAnYWxpZ24taXRlbXMtY2VudGVyJywgJ2dhcC0xJ10pO1xuICBjb25zdCBjaGVja2JveCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgWydmb3JtLWNoZWNrLWlucHV0JywgJ3RleHQtYmctd2FybmluZyddLCB7XG4gICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICAnZGF0YS1pZCc6IGAke29iai5pZH1gLFxuICB9KTtcbiAgY29uc3QgYnRuSGVhZGVyID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgWydhY2NvcmRpb24tYnV0dG9uJywgJ2NvbGxhcHNlZCcsICdmbGV4LWZpbGwnXSwge1xuICAgIHR5cGU6ICdidXR0b24nLFxuICAgICdkYXRhLWJzLXRvZ2dsZSc6ICdjb2xsYXBzZScsXG4gICAgJ2FyaWEtZXhwYW5kZWQnOiAnZmFsc2UnLFxuICAgICdkYXRhLWJzLXRhcmdldCc6IGAjaXRlbS0ke29iai5pZH1gLFxuICB9KTtcbiAgY29uc3QgcHJpb3JpdHkgPSBzZWxlY3RQcmlvcml0eShvYmoucHJpb3JpdHksIDEwKTtcbiAgY29uc3Qgc3BhbiA9IGNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCBbJ2ZsZXgtZmlsbCddKTtcbiAgY29uc3QgY29kZSA9IGNyZWF0ZUVsZW1lbnQoJ2NvZGUnLCBbJ3NtYWxsJywgJ3RleHQtbXV0ZWQnXSk7XG5cbiAgLy8gYm9keVxuICBjb25zdCBpdGVtRGV0YWlscyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnYWNjb3JkaW9uLWNvbGxhcHNlJywgJ2NvbGxhcHNlJ10sIHtcbiAgICBpZDogYGl0ZW0tJHtvYmouaWR9YCxcbiAgICAnZGF0YS1icy1wYXJlbnQnOiAnI2xpc3QnLFxuICB9KTtcbiAgY29uc3QgaXRlbUJvZHkgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2FjY29yZGlvbi1ib2R5J10pO1xuICBjb25zdCBlZGl0RGVsZXRlSXRlbSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZC1mbGV4JywgJ2ZsZXgtcm93LXJldmVyc2UnLCAnY29sJywgJ2dhcC0yJ10pO1xuXG4gIGNvbnN0IGJ0bkVkaXQgPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2J0bicsICdidG4td2FybmluZyddLCB7XG4gICAgJ2RhdGEtaWQnOiBvYmouaWQsXG4gICAgJ2RhdGEtYnMtdGFyZ2V0JzogJyNleGFtcGxlTW9kYWwnLFxuICAgICdkYXRhLWJzLXRvZ2dsZSc6ICdtb2RhbCcsXG4gIH0pO1xuICBjb25zdCBidG5EZWxldGUgPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2J0bicsICdidG4tZGFuZ2VyJ10sIHtcbiAgICAnZGF0YS1pZCc6IG9iai5pZCxcbiAgfSk7XG5cbiAgLy8gRVZFTlRMSVNUTkVSUyBPQkpFQ1RTXG4gIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHNldENoZWNrZWRIYW5kbGVyKTtcblxuICAvLyBGSUxMSU5HIENPTlRFTlRcbiAgLy8gaGVhZGVyXG4gIHNwYW4udGV4dENvbnRlbnQgPSBvYmoudGl0bGU7XG4gIGNvZGUudGV4dENvbnRlbnQgPSBvYmoucHJvamVjdDtcblxuICAvLyBib2R5XG4gIGJ0bkVkaXQudGV4dENvbnRlbnQgPSAnRWRpdCc7XG4gIGJ0bkRlbGV0ZS50ZXh0Q29udGVudCA9ICdEZWxldGUnO1xuXG4gIC8vIEFwcGVuZGluZyBjb250ZW50XG4gIGJ0bkhlYWRlci5hcHBlbmQoc3BhbiwgY29kZSk7XG4gIGhlYWRlci5hcHBlbmQoY2hlY2tib3gsIHByaW9yaXR5LCBidG5IZWFkZXIpO1xuXG4gIC8vIEJvZHkgY29udGVudFxuICBpZiAoaGFzTm90ZXMob2JqLm5vdGVzKSkge1xuICAgIGluc2VydE5vdGUob2JqLm5vdGVzLCBpdGVtQm9keSk7XG4gIH1cbiAgYnRuRWRpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlbGVtKSA9PiB7XG4gICAgdWlDb250cm9sLmhhbmRsZXJzLmVkaXQoZWxlbSk7XG4gIH0pO1xuICBidG5EZWxldGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1aUNvbnRyb2wuaGFuZGxlcnMuZGVsZXRlSXRlbSk7XG4gIGVkaXREZWxldGVJdGVtLmFwcGVuZChidG5EZWxldGUsIGJ0bkVkaXQpO1xuICBpdGVtQm9keS5hcHBlbmRDaGlsZChlZGl0RGVsZXRlSXRlbSk7XG4gIGl0ZW1EZXRhaWxzLmFwcGVuZENoaWxkKGl0ZW1Cb2R5KTtcblxuICAvLyBBcHBlbmQgZWxlbWVudHMgdG8gbGlzdFxuICBpdGVtLmFwcGVuZChoZWFkZXIsIGl0ZW1EZXRhaWxzKTtcbiAgbGlzdC5hcHBlbmRDaGlsZChpdGVtKTtcbiAgaWYgKGlzQ2hlY2tlZChvYmopKSBhZGRDaGVja2VkKGNoZWNrYm94LCBidG5IZWFkZXIsIHByaW9yaXR5KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYWRkTGluZTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG5pbXBvcnQgJy4vc3R5bGUuc2Nzcyc7XG5pbXBvcnQgeyByZXN0b3JlU3RvcmFnZSB9IGZyb20gJy4vSlNPTkZ1bmN0aW9ucyc7XG5cbmltcG9ydCB7XG4gIGNsZWFyQ29udGVudCxcbiAgc2hvd1BsdXNCdG4sXG4gIGFkZEZpZWxkLFxuICBhZGRUYXNrLFxuICBpbnB1dCxcbiAgYWRkTW9yZSxcbiAgcXVpY2tTYXZlLFxuICBsaXN0LFxufSBmcm9tICcuL3VpQ29tbW9uRnVuY3Rpb25zJztcbmltcG9ydCB1aUVkaXRJdGVtIGZyb20gJy4vZWRpdENvbnN0cnVjdG9yJztcbmltcG9ydCB1aUNvbnRyb2wgZnJvbSAnLi91aUNvbnRyb2xsZXInO1xuXG5jb25zdCBob21lTGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2EjaG9tZScpO1xuY29uc3QgcHJvamVjdHNJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2I3Byb2plY3RzJyk7XG5jb25zdCBwcm9qZWN0c0Ryb3Bkb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2I3Byb2plY3RzIGRpdicpO1xuY29uc3QgbWFpbk1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2I2V4YW1wbGVNb2RhbCcpO1xuXG4vLyBzZXQgbWF4IGhlaWdodCBmb3IgbGlzdCBpdGVtc1xuZnVuY3Rpb24gc2V0TWF4SGVpZ2h0KCkge1xuICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAvLyBnZXQgcGFkZGluZyB0b3AgKyBib3R0b20gZm9ybSBtYWluIGVsZW1lbnRcbiAgICBsZXQgbWFpblBhZGRpbmcgPSBwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKSwgbnVsbClcbiAgICAgIC5nZXRQcm9wZXJ0eVZhbHVlKCdwYWRkaW5nLXRvcCcpLm1hdGNoKC9cXGQrKFxcLlxcZCspPy8pKTtcbiAgICBtYWluUGFkZGluZyArPSBwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKSwgbnVsbClcbiAgICAgIC5nZXRQcm9wZXJ0eVZhbHVlKCdwYWRkaW5nLWJvdHRvbScpLm1hdGNoKC9cXGQrKFxcLlxcZCspPy8pKTtcblxuICAgIC8vIGdldCBvdGhlciBlbGVtZW50cyBzaXplXG4gICAgY29uc3QgYm9keUhlaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5vZmZzZXRIZWlnaHQ7XG4gICAgY29uc3QgaW5zZXRJdGVtSGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbiA+IGRpdicpLm9mZnNldEhlaWdodDtcbiAgICBjb25zdCBoZWFkZXJIZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKS5vZmZzZXRIZWlnaHQ7XG4gICAgY29uc3QgYXNpZGVIZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhc2lkZScpLm9mZnNldEhlaWdodDtcbiAgICAvLyBjb25zdCBmb290ZXJIZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb290ZXInKS5vZmZzZXRIZWlnaHQ7XG5cbiAgICAvLyBzZXQgbWF4IHNpemUgZm9yIHRhc2sgbGlzdFxuICAgIGNvbnN0IG1heEhlaWdodCA9IGJvZHlIZWlnaHQgLSBoZWFkZXJIZWlnaHQgLSBpbnNldEl0ZW1IZWlnaHQgLSBhc2lkZUhlaWdodCAtIG1haW5QYWRkaW5nO1xuICAgIGxpc3Quc3R5bGUubWF4SGVpZ2h0ID0gYCR7bWF4SGVpZ2h0fXB4YDtcbiAgfSBlbHNlIGxpc3Quc3R5bGUubWF4SGVpZ2h0ID0gJ25vbmUnO1xufVxuXG4vLyBldmVudExpc3RlbmVyc1xuLy8gaG9tZSBwYWdlIGJ1dHRvbiBmdW5jdGlvbnNcbmhvbWVMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICB1aUNvbnRyb2wudXBkYXRlKCdjbGVhcicpO1xufSk7XG5hZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdWlFZGl0SXRlbSk7XG5hZGRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgc2hvd1BsdXNCdG4pO1xuYWRkRmllbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBzaG93UGx1c0J0bik7XG5hZGRNb3JlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdWlDb250cm9sLmhhbmRsZXJzLmVkaXRNb3JlKGlucHV0KSk7XG5xdWlja1NhdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB1aUNvbnRyb2wuaGFuZGxlcnMuZmFzdFNhdmUoaW5wdXQpKTtcbi8vIHNldCBoZWlnaHQgbGltaXQgZm9yIGxpc3QgaXRlbXNcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgc2V0TWF4SGVpZ2h0KTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzZXRNYXhIZWlnaHQpO1xuXG4vLyBhdXRvLXNhdmVcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gIHVpQ29udHJvbC51cGRhdGUoKTtcbiAgc2hvd1BsdXNCdG4oKTtcbn0pO1xuXG4vLyByZXN0b3JlIGRhdGEgd2hlbiBpdCdzIGxvYWRlZFxud2luZG93Lm9ubG9hZCA9IHJlc3RvcmVTdG9yYWdlKCk7XG5cbi8vIG1lbnUgZm9yIG1vYmlsZSB2ZXJzaW9uXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICBpZiAoIWV2ZW50LnRhcmdldC5jbG9zZXN0KCcjcHJvamVjdHMnKSkge1xuICAgIHByb2plY3RzRHJvcGRvd24uY2xhc3NMaXN0LmFkZCgnbWVudS1oaWRlJyk7XG4gIH1cbn0pO1xucHJvamVjdHNJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBpZiAocHJvamVjdHNEcm9wZG93bi5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtaGlkZScpKSB7XG4gICAgcHJvamVjdHNEcm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKCdtZW51LWhpZGUnKTtcbiAgfSBlbHNlIHtcbiAgICBwcm9qZWN0c0Ryb3Bkb3duLmNsYXNzTGlzdC5hZGQoJ21lbnUtaGlkZScpO1xuICB9XG59KTtcblxuLy8gY2xlYXIgbW9kYWwgY29udGVudCBldmVyeXRpbWUgaXQncyBjbG9zZWRcbm1haW5Nb2RhbC5hZGRFdmVudExpc3RlbmVyKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB7XG4gIGNsZWFyQ29udGVudChtYWluTW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWJvZHknKSk7XG59KTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGNvbnN0IHRvb2x0aXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpO1xuICB0b29sdGlwcy5mb3JFYWNoKCh0aXApID0+IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICB0aXAgPSBuZXcgYm9vdHN0cmFwLlRvb2x0aXAodGlwKTtcbiAgfSk7XG59LCBmYWxzZSk7XG5cbi8vIHN0YXJ0IGFwcFxudWlDb250cm9sLmxvYWQoKTtcbiIsImltcG9ydCBmbGF0cGlja3IgZnJvbSAnZmxhdHBpY2tyJztcbmltcG9ydCB7IFBvcnR1Z3Vlc2UgfSBmcm9tICdmbGF0cGlja3IvZGlzdC9sMTBuL3B0JztcbmltcG9ydCBJTWFzayBmcm9tICdpbWFzayc7XG5pbXBvcnQgeyBtYXNrRGF0ZSB9IGZyb20gJy4vZGF0ZSc7XG5pbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcblxuZXhwb3J0IGNvbnN0IGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYjbGlzdCcpO1xuZXhwb3J0IGNvbnN0IGFkZEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQjaXRlbVRpdGxlJyk7XG5leHBvcnQgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuZXhwb3J0IGNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhI2FkZEl0ZW0nKTtcbmV4cG9ydCBjb25zdCBhZGRNb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uI2FkZE1vcmUnKTtcbmV4cG9ydCBjb25zdCBxdWlja1NhdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24jc2F2ZUl0ZW0nKTtcblxuZXhwb3J0IGNvbnN0IGlzQ2hlY2tlZCA9IChlKSA9PiBlLmNoZWNrZWQgPT09IHRydWU7XG5leHBvcnQgY29uc3QgaGFzTm90ZXMgPSAob2JqKSA9PiBvYmoubGVuZ3RoID4gMDtcbmV4cG9ydCBjb25zdCBsb2FkTGlzdCA9ICgpID0+IFsuLi50b2RvTGlzdC5hbGxUYXNrc0xpc3QoKV07XG5leHBvcnQgY29uc3Qgc29ydFBhcmFtID0gKGFyciwgcGFyYW0pID0+IFsuLi5hcnJdXG4gIC5zb3J0KChhLCBiKSA9PiAoKGFbcGFyYW1dIDwgYltwYXJhbV0pID8gLTEgOiAxKSk7XG5cbmNvbnN0IHNwZWNpYWxDaGFyc0VudHJpZXMgPSBbXG4gIFsnw4DDgcOCw4PDhMOFJywgJ0EnXSxcbiAgWyfDoMOhw6LDo8Okw6UnLCAnYSddLFxuICBbJ8OIw4nDisOLJywgJ0UnXSxcbiAgWyfDqMOpw6rDqycsICdlJ10sXG4gIFsnw4zDjcOOw48nLCAnSSddLFxuICBbJ8Osw63DrsOvJywgJ2knXSxcbiAgWyfDksOTw5XDlMOWJywgJ08nXSxcbiAgWyfDssOzw7XDtMO2JywgJ28nXSxcbiAgWyfDmcOaw5vDnCcsICdVJ10sXG4gIFsnw7nDusO7w7wnLCAndSddLFxuICBbJ8OHJywgJ0MnXSxcbiAgWyfDpycsICdjJ10sXG5dO1xuXG5jb25zdCBzcGVjaWFsQ2hhcnNNYXAgPSBPYmplY3QuZnJvbUVudHJpZXMoXG4gIHNwZWNpYWxDaGFyc0VudHJpZXMuZmxhdE1hcCgoW2NoYXJzLCB2YWx1ZV0pID0+IFsuLi5jaGFyc10ubWFwKChjaGFyKSA9PiBbY2hhciwgdmFsdWVdKSksXG4pO1xuXG4vLyBFTEVNRU5UIENSRUFUT1JTXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRBdHRycyhlbGVtLCBhdHRycykge1xuICBPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkICYmIGF0dHJzW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoa2V5LCAnJyk7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnLCBjbGFzc05hbWVzID0gW10sIGF0dHJpYnV0ZXMgPSB7fSkge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICBpZiAoY2xhc3NOYW1lcy5sZW5ndGgpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCguLi5jbGFzc05hbWVzKTtcbiAgc2V0QXR0cnMoZWxlbWVudCwgYXR0cmlidXRlcyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlT3B0aW9uKHZhbHVlLCB0ZXh0LCBzZWxlY3RlZCkge1xuICBjb25zdCBvcHRpb24gPSBjcmVhdGVFbGVtZW50KCdvcHRpb24nLCBbXSwgeyB2YWx1ZSB9KTtcbiAgb3B0aW9uLnRleHRDb250ZW50ID0gdGV4dDtcbiAgaWYgKHNlbGVjdGVkKSB7XG4gICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnJyk7XG4gIH1cbiAgcmV0dXJuIG9wdGlvbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByaW9yaXR5U2VsZWN0KG51bSA9IDApIHtcbiAgY29uc3Qgc2VsZWN0ID0gY3JlYXRlRWxlbWVudCgnc2VsZWN0JywgWydmb3JtLXNlbGVjdCddLCB7XG4gICAgJ2FyaWEtbGFiZWwnOiAnUHJpb3JpdHknLFxuICB9KTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpICs9IDEpIHtcbiAgICBjb25zdCB0ZXh0ID0gaSA9PT0gMCA/ICctLSBTZWxlY3QgUHJpb3JpdHknIDogYFByaW9yaXR5ICR7aX1gO1xuICAgIGNvbnN0IHNlbGVjdGVkID0gaSA9PT0gcGFyc2VJbnQobnVtLCAxMCk7XG4gICAgY29uc3Qgb3B0aW9uID0gY3JlYXRlT3B0aW9uKGksIHRleHQsIHNlbGVjdGVkKTtcbiAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgfVxuICByZXR1cm4gc2VsZWN0O1xufVxuXG4vLyBVSSBGVU5DVElPTlNcblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyQ29udGVudChlbGVtKSB7XG4gIHdoaWxlIChlbGVtLmZpcnN0Q2hpbGQpIHtcbiAgICBlbGVtLnJlbW92ZUNoaWxkKGVsZW0ubGFzdENoaWxkKTtcbiAgfVxufVxuXG4vLyBBREQvRURJVCBORVcgVEFTSyBTQ1JFRU4gRlVOQ1RJT05TXG5cbmZ1bmN0aW9uIHJlbW92ZVNwZWNpYWxzKHRleHQpIHtcbiAgbGV0IHNlYXJjaCA9IHRleHQ7XG4gIHNlYXJjaCA9IHNlYXJjaC5yZXBsYWNlKFxuICAgIC9bw4Atw5zDoC3DvF0vZyxcbiAgICAobWF0Y2gpID0+IHNwZWNpYWxDaGFyc01hcFttYXRjaF0gfHwgbWF0Y2gsXG4gICk7XG4gIHJldHVybiBzZWFyY2g7XG59XG4vLyBwcm9qZWN0cyBkYXRhbGlzdCBhdXRvY29tcGxldGVcbmZ1bmN0aW9uIGF1dG9Db21wbGV0ZShzZWFyY2gpIHtcbiAgY29uc3QgcHJvamVjdHMgPSB0b2RvTGlzdC5nZXRQcm9qZWN0cygpO1xuICByZXR1cm4gcHJvamVjdHMuZmlsdGVyKCh2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHZhbHVlTG93ZXJjYXNlID0gcmVtb3ZlU3BlY2lhbHModmFsdWUudG9Mb3dlckNhc2UoKSk7XG4gICAgY29uc3Qgc2VhcmNoTG93ZXJjYXNlID0gcmVtb3ZlU3BlY2lhbHMoc2VhcmNoLnRvTG93ZXJDYXNlKCkpO1xuICAgIHJldHVybiB2YWx1ZUxvd2VyY2FzZS5pbmNsdWRlcyhzZWFyY2hMb3dlcmNhc2UpO1xuICB9KTtcbn1cblxuLy8gY2FsbGluZyBmdW5jdGlvbnMgdG8gYXV0b2NvbXBsZXRlIFByb2plY3QgZmllbGRcblxuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaFByb2plY3RzKCkge1xuICBjb25zdCBpbnB1dFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW50ZXJQcm9qZWN0Jyk7XG4gIGNvbnN0IGRhdGFsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGF0YWxpc3QnKTtcbiAgaW5wdXRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKHsgdGFyZ2V0IH0pID0+IHtcbiAgICBjb25zdCBpbnB1dERhdGEgPSB0YXJnZXQudmFsdWU7XG4gICAgaWYgKGlucHV0RGF0YS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGF1dG9Db21wbGV0ZU9wdGlvbnMgPSBhdXRvQ29tcGxldGUoaW5wdXREYXRhKTtcbiAgICAgIGRhdGFsaXN0LmlubmVySFRNTCA9IGAke2F1dG9Db21wbGV0ZU9wdGlvbnNcbiAgICAgICAgLm1hcCgodmFsdWUpID0+IGA8b3B0aW9uIHZhbHVlPVwiJHt2YWx1ZX1cIiAvPmApXG4gICAgICAgIC5qb2luKCcnKX1gO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIERBVEVQSUNLRVIgQU5EIE1BU0sgRlVOQ1RJT05TXG5leHBvcnQgZnVuY3Rpb24gZHVlRGF0ZU1hc2soKSB7XG4gIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZHVlRGF0ZScpO1xuICBjb25zdCBmbGF0RWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5mbGF0cGlja3InKTtcblxuICAvLyBhcHBseSBtYXNrIHRvIGR1ZURhdGVGaWVsZFxuICBjb25zdCBtYXNrID0gSU1hc2soZHVlRGF0ZSwgbWFza0RhdGUpO1xuXG4gIC8vIGFwcGx5IGZsYXRwaWNrciBkYXRlcGlja2VyIHRvIGFsbCBlbGVtZW50cyBpbiBhIGRpdlxuICAvLyAoaWNvbiB0b2dnbGUgYW5kIGlucHV0IGRhdGUgdXNpbmcgZGF0YS0gYXR0cmlidXRlcylcbiAgZmxhdHBpY2tyKGZsYXRFbGVtLCB7XG4gICAgZGF0ZUZvcm1hdDogJ2QvbS9ZJyxcbiAgICBkaXNhYmxlTW9iaWxlOiAndHJ1ZScsXG4gICAgYWxsb3dJbnB1dDogdHJ1ZSxcbiAgICB3cmFwOiB0cnVlLFxuICAgIGxvY2FsZTogUG9ydHVndWVzZSxcbiAgICBvbkNoYW5nZShzZWxlY3RlZERhdGVzLCBkYXRlU3RyKSB7XG4gICAgICBtYXNrLnVwZGF0ZVZhbHVlKGRhdGVTdHIpO1xuICAgIH0sXG4gIH0pO1xufVxuXG4vLyBtYWluIHNjcmVlbiBpbnRlcmFjdGlvbnNcblxuLy8gY2hlY2sgdmlzdWFsIGVmZmVjdFxuZXhwb3J0IGZ1bmN0aW9uIHNob3dQbHVzQnRuKCkge1xuICAvLyBFbmNvbnRyYSBvIGJvdMOjbyArXG4gIGNvbnN0IHBsdXNCdG4gPSBhZGRGaWVsZC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gIGNvbnN0IHNhdmVCdG4gPSBwbHVzQnRuLm5leHRFbGVtZW50U2libGluZztcbiAgLy8gU2UgbyB2YWxvciBkbyBjYW1wbyB0w610dWxvIGZvciBkaWZlcmVudGUgZGUgdmF6aW8sXG4gIC8vIGVudMOjbyBlbGUgcmV2ZWxhIG8gYm90w6NvICtcbiAgaWYgKGFkZEZpZWxkLnZhbHVlICE9PSAnJykge1xuICAgIHBsdXNCdG4uY2xhc3NMaXN0LmFkZCgncmV2ZWFsSXRlbScpO1xuICAgIHNhdmVCdG4uY2xhc3NMaXN0LmFkZCgncmV2ZWFsSXRlbScpO1xuICB9XG4gIC8vIGNhc28gY29udHLDoXJpbywgc2Ugdm9jw6ogYXBhZ2FyIHRvZG8gbyB0w610dWxvXG4gIC8vIGVsZSBkw6EgZGlzcGxheTogbm9uZSwgbm8gYm90w6NvICtcbiAgaWYgKGFkZEZpZWxkLnZhbHVlID09PSAnJyAmJiBwbHVzQnRuLmNsYXNzTGlzdC5jb250YWlucygncmV2ZWFsSXRlbScpKSB7XG4gICAgcGx1c0J0bi5jbGFzc0xpc3QucmVtb3ZlKCdyZXZlYWxJdGVtJyk7XG4gICAgc2F2ZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdyZXZlYWxJdGVtJyk7XG4gIH1cbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIGZpbmRQYXJlbnROb2RlKGVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUpIHtcbi8vICAgbGV0IHsgcGFyZW50Tm9kZSB9ID0gZWxlbWVudDtcbi8vICAgd2hpbGUgKHBhcmVudE5vZGUpIHtcbi8vICAgICBpZiAocGFyZW50Tm9kZS5oYXNBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSkpIHtcbi8vICAgICAgIHJldHVybiBwYXJlbnROb2RlO1xuLy8gICAgIH1cbi8vICAgICBwYXJlbnROb2RlID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuLy8gICB9XG4vLyAgIHJldHVybiBudWxsOyAvLyBSZXRvcm5hIG51bGwgc2UgbsOjbyBlbmNvbnRyb3UgbmVuaHVtIG7DsyBwYWkgY29tIG8gYXRyaWJ1dG8gZGVzZWphZG9cbi8vIH1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1jeWNsZSAqL1xuaW1wb3J0IHsgcG9wdWxhdGVTdG9yYWdlIH0gZnJvbSAnLi9KU09ORnVuY3Rpb25zJztcbmltcG9ydCB0b2RvTGlzdCBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IHVpRWRpdEl0ZW0gZnJvbSAnLi9lZGl0Q29uc3RydWN0b3InO1xuaW1wb3J0IGFkZExpbmUgZnJvbSAnLi9saXN0Q29uc3RydWN0b3InO1xuaW1wb3J0IHtcbiAgY2xlYXJDb250ZW50LCBsaXN0LCBzb3J0UGFyYW0sIGxvYWRMaXN0LCBjcmVhdGVFbGVtZW50LCBzaG93UGx1c0J0bixcbn0gZnJvbSAnLi91aUNvbW1vbkZ1bmN0aW9ucyc7XG5cbmNvbnN0IGRpc3BsYXlQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndWwjcHJvamVjdHMnKTtcblxuY29uc3QgZmlsdGVyUHJvamVjdHMgPSAoKSA9PiB0b2RvTGlzdC5nZXRQcm9qZWN0cygpXG4gIC5maWx0ZXIoKHZhbHVlLCBpbmRleCwgc2VsZikgPT4gdmFsdWUgIT09ICcnICYmIHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4KTtcblxuLy8gVUkgQ29udHJvbGxlclxuY29uc3QgdWlDb250cm9sID0gKCgpID0+IHtcbiAgbGV0IGN1cnJlbnRGaWx0ZXIgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIHNldEN1cnJlbnRGaWx0ZXIoa2V5LCB2YWx1ZSkge1xuICAgIGlmICh0eXBlb2Yga2V5ICE9PSAndW5kZWZpbmVkJykgY3VycmVudEZpbHRlciA9IHsga2V5LCB2YWx1ZSB9O1xuICAgIGVsc2UgY3VycmVudEZpbHRlciA9IG51bGw7XG4gIH1cblxuICBjb25zdCBmaWx0ZXJBcnJheSA9IChhcnIsIGZpbHRlciwgdmFsdWUpID0+IHtcbiAgICBpZiAoZmlsdGVyKSByZXR1cm4gWy4uLmFyci5maWx0ZXIoKG9iamV0bykgPT4gb2JqZXRvW2ZpbHRlcl0gPT09IHZhbHVlKV07XG4gICAgcmV0dXJuIGFycjtcbiAgfTtcblxuICBmdW5jdGlvbiBsb2FkKCkge1xuICAgIC8vIGFkZCBwcm9qZWN0IGxpc3RcbiAgICBjb25zdHJ1Y3RvclByb2plY3RMaXN0KCk7XG4gICAgY29uc3QgdWlMaXN0ID0gc29ydFBhcmFtKGxvYWRMaXN0KCksICdjaGVja2VkJyk7XG4gICAgaWYgKGN1cnJlbnRGaWx0ZXIgIT09IG51bGwpIHtcbiAgICAgIGZpbHRlckFycmF5KHVpTGlzdCwgY3VycmVudEZpbHRlci5rZXksIGN1cnJlbnRGaWx0ZXIudmFsdWUpLmZvckVhY2goXG4gICAgICAgIChvYmopID0+IHtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IGxvYWRMaXN0KCkuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09PSBvYmouaWQpO1xuICAgICAgICAgIGFkZExpbmUob2JqLCBpbmRleCk7XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB1aUxpc3QuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gbG9hZExpc3QoKS5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IG9iai5pZCk7XG4gICAgICAgIGFkZExpbmUob2JqLCBpbmRleCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoZmlsdGVyLCB2YWx1ZSkge1xuICAgIGNsZWFyQ29udGVudChsaXN0KTtcbiAgICBjbGVhckNvbnRlbnQoZGlzcGxheVByb2plY3QpO1xuICAgIGlmICh0eXBlb2YgZmlsdGVyICE9PSAndW5kZWZpbmVkJykgc2V0Q3VycmVudEZpbHRlcihmaWx0ZXIsIHZhbHVlKTtcbiAgICBpZiAoZmlsdGVyID09PSAnY2xlYXInKSBzZXRDdXJyZW50RmlsdGVyKCk7XG4gICAgbG9hZCgpO1xuICAgIHBvcHVsYXRlU3RvcmFnZSgpO1xuICAgIGNvbnNvbGUud2FybignVXBkYXRlZCEnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN0cnVjdG9yUHJvamVjdExpc3QoKSB7XG4gICAgY29uc3QgcHJvamVjdHMgPSBmaWx0ZXJQcm9qZWN0cygpO1xuICAgIGlmIChwcm9qZWN0cy5sZW5ndGggIT09IDApIHtcbiAgICAgIHByb2plY3RzLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnN0IGxpc3RJdGVtID0gY3JlYXRlRWxlbWVudCgnbGknLCBbJ2QtZmxleCcsICdhbGlnbi1pdGVtcy1jZW50ZXInXSk7XG4gICAgICAgIGNvbnN0IGljb25JdGVtID0gY3JlYXRlRWxlbWVudCgnaScsIFsnYmknLCAnYmktaGFzaCcsICdmcy00J10pO1xuICAgICAgICBjb25zdCBsaW5rID0gY3JlYXRlRWxlbWVudCgnYScsIFtdLCB7ICdkYXRhLXZhbHVlJzogdmFsdWUgfSk7XG5cbiAgICAgICAgbGluay50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdXBkYXRlKCdwcm9qZWN0JywgbGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnKSkpO1xuXG4gICAgICAgIGxpc3RJdGVtLmFwcGVuZChpY29uSXRlbSwgbGluayk7XG5cbiAgICAgICAgZGlzcGxheVByb2plY3QuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGRpc3BsYXlQcm9qZWN0LmlubmVySFRNTCA9ICc8bGkgY2xhc3M9XCJkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyXCI+Tm8gcHJvamVjdHMgeWV0IDooPC9saT4nO1xuICB9XG5cbiAgY29uc3QgaGFuZGxlcnMgPSAoKCkgPT4ge1xuICAgIC8vIGhvbWUgYnV0dG9uc1xuICAgIGZ1bmN0aW9uIGVkaXRNb3JlKHRpdGxlKSB7XG4gICAgICB1aUVkaXRJdGVtKHRpdGxlKTtcbiAgICAgIHRpdGxlLnZhbHVlID0gJyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmFzdFNhdmUodGl0bGUpIHtcbiAgICAgIGNvbnN0IG5ld09iaiA9IHsgdGl0bGU6IHRpdGxlLnZhbHVlIH07XG4gICAgICB0b2RvTGlzdC5hZGRJdGVtKG5ld09iaik7XG4gICAgICB0aXRsZS52YWx1ZSA9ICcnO1xuICAgICAgdXBkYXRlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZWRpdChlbGVtKSB7XG4gICAgICBlbGVtLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGVsZW07XG4gICAgICBjb25zdCBvYmogPSB0b2RvTGlzdC5nZXRJdGVtKHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSk7XG4gICAgICB1aUVkaXRJdGVtKFxuICAgICAgICBvYmoudGl0bGUsXG4gICAgICAgIG9iai5kdWVEYXRlLFxuICAgICAgICBvYmoucHJpb3JpdHksXG4gICAgICAgIG9iai5wcm9qZWN0LFxuICAgICAgICBvYmoubm90ZXMsXG4gICAgICAgIG9iai5pZCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVsZXRlSXRlbShpdGVtKSB7XG4gICAgICBjb25zdCB7IHRhcmdldCB9ID0gaXRlbTtcbiAgICAgIHRvZG9MaXN0LmRlbGV0ZUl0ZW0odGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpKTtcbiAgICAgIHVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBlZGl0TW9yZSxcbiAgICAgIGZhc3RTYXZlLFxuICAgICAgZWRpdCxcbiAgICAgIGRlbGV0ZUl0ZW0sXG4gICAgfTtcbiAgfSkoKTtcblxuICByZXR1cm4ge1xuICAgIGhhbmRsZXJzLFxuICAgIHNldEN1cnJlbnRGaWx0ZXIsXG4gICAgbG9hZCxcbiAgICB1cGRhdGUsXG4gIH07XG59KSgpO1xuXG4vLyBBREQvRURJVCBJVEVNU1xuZXhwb3J0IGRlZmF1bHQgdWlDb250cm9sO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua3RvZG9fbGlzdFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt0b2RvX2xpc3RcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcIjNyZHBhcnRcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKDcyNzMpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=