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
    title,
    dueDate,
    project,
    priority,
    checked,
    id,
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

  const toJSON = () => JSON.stringify(list.map((item) => returnObj(item)), '', 1);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9KU09ORnVuY3Rpb25zLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvY29yZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL2RhdGUuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9lZGl0Q29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9saXN0Q29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9zY3JpcHQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy91aUNvbW1vbkZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL3VpQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcbi8vIGltcG9ydCBhZGRMaW5lIGZyb20gJy4vdWlMaXN0R2VuZXJhdG9yJztcblxuZXhwb3J0IGZ1bmN0aW9uIHBvcHVsYXRlU3RvcmFnZSgpIHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhdGEnLCB0b2RvTGlzdC50b0pTT04oKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXN0b3JlU3RvcmFnZSgpIHtcbiAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXRhJykgPT09IG51bGwpIHJldHVybjtcbiAgdG9kb0xpc3QucmVzdG9yZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGF0YScpKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbm5lY3QoKSB7XG4gIGNvbnN0IHJlcXVlc3RVUkwgPSAnLi9hc3NldHMvZGF0YS5qc29uJztcbiAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IGZldGNoKHJlcXVlc3RVUkwpO1xuICBpZiAoIXJlcXVlc3Qub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIFN0YXR1czogJHtyZXF1ZXN0LnN0YXR1c31gKTtcbiAgfVxuXG4gIHJldHVybiByZXF1ZXN0O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcG9wdWxhdGUoKSB7XG4gIGNvbnN0IHZhbHVlID0gYXdhaXQgY29ubmVjdCgpO1xuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0KCkge1xuICB0b2RvTGlzdC5yZXN0b3JlKHBvcHVsYXRlKCkpO1xufVxuIiwiZnVuY3Rpb24gQ3JlYXRlSXRlbShpZCwgdGl0bGUsIGR1ZURhdGUgPSAwLCBwcmlvcml0eSA9IDAsIHByb2plY3QgPSBudWxsLCBjaGVja2VkID0gZmFsc2UpIHtcbiAgY29uc3Qgbm90ZXMgPSBbXTtcblxuICBmdW5jdGlvbiBhZGROb3RlKHZhbCkgeyBub3Rlcy5wdXNoKHZhbCk7IH1cbiAgZnVuY3Rpb24gZGVsZXRlTm90ZShwb3MpIHsgbm90ZXMuc3BsaWNlKHBvcywgMSk7IH1cbiAgZnVuY3Rpb24gZWRpdE5vdGUocG9zLCB2YWwpIHsgbm90ZXNbcG9zXSA9IHZhbDsgfVxuICBjb25zdCBnZXRBbGxOb3RlcyA9ICgpID0+IG5vdGVzO1xuICBjb25zdCBnZXROb3RlID0gKHBvcykgPT4gbm90ZXNbcG9zXTtcblxuICBmdW5jdGlvbiB1cGRhdGVJdGVtKG5ld1ZhbHVlcykge1xuICAgIGNvbnN0IHVwZGF0ZWRWYWx1ZXMgPSB7XG4gICAgICB0aXRsZTogKG5ld1ZhbHVlcy50aXRsZSAhPT0gdW5kZWZpbmVkICYmIG5ld1ZhbHVlcy50aXRsZSAhPT0gdGl0bGUpXG4gICAgICAgID8gbmV3VmFsdWVzLnRpdGxlIDogdGl0bGUsXG4gICAgICBkdWVEYXRlOiAobmV3VmFsdWVzLmR1ZURhdGUgIT09IHVuZGVmaW5lZCAmJiBuZXdWYWx1ZXMuZHVlRGF0ZSAhPT0gZHVlRGF0ZSlcbiAgICAgICAgPyBuZXdWYWx1ZXMuZHVlRGF0ZSA6IGR1ZURhdGUsXG4gICAgICBwcm9qZWN0OiAobmV3VmFsdWVzLnByb2plY3QgIT09IHVuZGVmaW5lZCAmJiBuZXdWYWx1ZXMucHJvamVjdCAhPT0gcHJvamVjdClcbiAgICAgICAgPyBuZXdWYWx1ZXMucHJvamVjdCA6IHByb2plY3QsXG4gICAgICBwcmlvcml0eTogKG5ld1ZhbHVlcy5wcmlvcml0eSAhPT0gdW5kZWZpbmVkICYmIG5ld1ZhbHVlcy5wcmlvcml0eSAhPT0gcHJpb3JpdHkpXG4gICAgICAgID8gbmV3VmFsdWVzLnByaW9yaXR5IDogcHJpb3JpdHksXG4gICAgICBjaGVja2VkOiAobmV3VmFsdWVzLmNoZWNrZWQgIT09IHVuZGVmaW5lZCAmJiBuZXdWYWx1ZXMuY2hlY2tlZCAhPT0gY2hlY2tlZClcbiAgICAgICAgPyBuZXdWYWx1ZXMuY2hlY2tlZCA6IGNoZWNrZWQsXG4gICAgfTtcbiAgICByZXR1cm4gQ3JlYXRlSXRlbShcbiAgICAgIGlkLFxuICAgICAgdXBkYXRlZFZhbHVlcy50aXRsZSxcbiAgICAgIHVwZGF0ZWRWYWx1ZXMuZHVlRGF0ZSxcbiAgICAgIHVwZGF0ZWRWYWx1ZXMucHJpb3JpdHksXG4gICAgICB1cGRhdGVkVmFsdWVzLnByb2plY3QsXG4gICAgICB1cGRhdGVkVmFsdWVzLmNoZWNrZWQsXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBPYmplY3QuZnJlZXplKHtcbiAgICB0aXRsZSxcbiAgICBkdWVEYXRlLFxuICAgIHByb2plY3QsXG4gICAgcHJpb3JpdHksXG4gICAgY2hlY2tlZCxcbiAgICBpZCxcbiAgICBhZGROb3RlLFxuICAgIGVkaXROb3RlLFxuICAgIGdldE5vdGUsXG4gICAgZGVsZXRlTm90ZSxcbiAgICBnZXRBbGxOb3RlcyxcbiAgICB1cGRhdGVJdGVtLFxuICB9KTtcbn1cblxuY29uc3QgdG9kb0xpc3QgPSAoKCkgPT4ge1xuICBjb25zdCBsaXN0ID0gW107XG5cbiAgZnVuY3Rpb24gZmluZE9ialBvcyhpZFZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAobGlzdFtpXS5pZCA9PT0gcGFyc2VJbnQoaWRWYWx1ZSwgMTApKSByZXR1cm4gaTtcbiAgICB9XG4gICAgdGhyb3cgRXJyb3IoJ09iamVjdCBub3QgZm91bmQnKTtcbiAgfVxuXG4gIGNvbnN0IHJldHVybk9iaiA9IChpdGVtKSA9PiAoe1xuICAgIHRpdGxlOiBpdGVtLnRpdGxlLFxuICAgIHByb2plY3Q6IGl0ZW0ucHJvamVjdCxcbiAgICBkdWVEYXRlOiBpdGVtLmR1ZURhdGUsXG4gICAgcHJpb3JpdHk6IGl0ZW0ucHJpb3JpdHksXG4gICAgY2hlY2tlZDogaXRlbS5jaGVja2VkLFxuICAgIG5vdGVzOiBpdGVtLmdldEFsbE5vdGVzKCksXG4gICAgaWQ6IGl0ZW0uaWQsXG4gIH0pO1xuXG4gIGNvbnN0IGdldEl0ZW0gPSAoaWQpID0+IHJldHVybk9iaihsaXN0W2ZpbmRPYmpQb3MoaWQpXSk7XG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxpc3QubGVuZ3RoO1xuICBjb25zdCBhbGxUYXNrc0xpc3QgPSAoKSA9PiBsaXN0Lm1hcCgob2JqKSA9PiAocmV0dXJuT2JqKG9iaikpKTtcbiAgZnVuY3Rpb24gcmVzZXQoKSB7IGxpc3QubGVuZ3RoID0gMDsgfVxuXG4gIGNvbnN0IGdldFByb2plY3RzID0gKCkgPT4gbGlzdC5tYXAoKGl0ZW0pID0+IGl0ZW0ucHJvamVjdClcbiAgICAuZmlsdGVyKCh2YWx1ZSwgcG9zLCBzZWxmKSA9PiB2YWx1ZSAhPT0gbnVsbCAmJiBzZWxmLmluZGV4T2YodmFsdWUpID09PSBwb3MpO1xuXG4gIGZ1bmN0aW9uIGdldEJpZ2dlcklkKCkge1xuICAgIGNvbnN0IGxhdGVzdE9iaiA9IGxpc3QucmVkdWNlKChtYXgsIG9iaikgPT4gKG9iai5pZCA+IG1heC5pZCA/IG9iaiA6IG1heCksIHsgaWQ6IDAgfSk7XG4gICAgY29uc29sZS5sb2cobGF0ZXN0T2JqKTtcbiAgICByZXR1cm4gbGF0ZXN0T2JqLmlkO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkSXRlbShvYmopIHtcbiAgICBjb25zdCBpZCA9IGxpc3QubGVuZ3RoID09PSAwID8gMCA6IHBhcnNlSW50KGdldEJpZ2dlcklkKCksIDEwKSArIDE7XG4gICAgY29uc3QgbmV3SXRlbSA9IENyZWF0ZUl0ZW0oaWQsIG9iai50aXRsZSwgb2JqLmR1ZURhdGUsIG9iai5wcmlvcml0eSwgb2JqLnByb2plY3QsIG9iai5jaGVja2VkKTtcbiAgICBsaXN0LnB1c2gobmV3SXRlbSk7XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0SXRlbShvYmpJRCwgbmV3T2JqKSB7XG4gICAgY29uc3Qgb2JqVG9FZGl0ID0gbGlzdFtmaW5kT2JqUG9zKG9iaklEKV07XG4gICAgY29uc3QgcmVzdWx0ID0gb2JqVG9FZGl0LnVwZGF0ZUl0ZW0obmV3T2JqKTtcbiAgICBsaXN0W2ZpbmRPYmpQb3Mob2JqSUQpXSA9IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldENoZWNrZWQoaWQpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7IGNoZWNrZWQ6ICFsaXN0W2ZpbmRPYmpQb3MoaWQpXS5jaGVja2VkIH07XG4gICAgZWRpdEl0ZW0oaWQsIHJlc3VsdCk7XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0Tm90ZShpZCwgcG9zLCB2YWwpIHtcbiAgICBsaXN0W2ZpbmRPYmpQb3MoaWQpXS5lZGl0Tm90ZShwb3MsIHZhbCk7XG4gIH1cbiAgZnVuY3Rpb24gYWRkTm90ZShpZCwgdmFsKSB7XG4gICAgbGlzdFtmaW5kT2JqUG9zKGlkKV0uYWRkTm90ZSh2YWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVsZXRlSXRlbShpZCkge1xuICAgIGxpc3Quc3BsaWNlKGZpbmRPYmpQb3MoaWQpLCAxKTtcbiAgfVxuXG4gIGNvbnN0IHRvSlNPTiA9ICgpID0+IEpTT04uc3RyaW5naWZ5KGxpc3QubWFwKChpdGVtKSA9PiByZXR1cm5PYmooaXRlbSkpLCAnJywgMSk7XG5cbiAgY29uc3QgcmVzdG9yZSA9IChkYXRhKSA9PiB7XG4gICAgcmVzZXQoKTtcbiAgICBKU09OLnBhcnNlKGRhdGEpLmZvckVhY2goXG4gICAgICAoe1xuICAgICAgICBpZCwgdGl0bGUsIHByb2plY3QsIGR1ZURhdGUsIHByaW9yaXR5LCBjaGVja2VkLCBub3RlcyxcbiAgICAgIH0pID0+IHtcbiAgICAgICAgY29uc3QgbmV3SXRlbSA9IENyZWF0ZUl0ZW0oaWQsIHRpdGxlLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCwgY2hlY2tlZCk7XG4gICAgICAgIG5vdGVzLmZvckVhY2goKG5vdGUpID0+IG5ld0l0ZW0uYWRkTm90ZShub3RlKSk7XG4gICAgICAgIGxpc3QucHVzaChuZXdJdGVtKTtcbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGdldExlbmd0aCxcbiAgICBhZGROb3RlLFxuICAgIGVkaXROb3RlLFxuICAgIGVkaXRJdGVtLFxuICAgIGFkZEl0ZW0sXG4gICAgZGVsZXRlSXRlbSxcbiAgICByZXN0b3JlLFxuICAgIHRvSlNPTixcbiAgICBzZXRDaGVja2VkLFxuICAgIGdldFByb2plY3RzLFxuICAgIHJlc2V0LFxuICAgIHJldHVybk9iaixcbiAgICBhbGxUYXNrc0xpc3QsXG4gICAgZ2V0SXRlbSxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHRvZG9MaXN0O1xuIiwiLy8gaW1wb3J0IHsgcHRCUiB9IGZyb20gJ2RhdGUtZm5zL2xvY2FsZSc7XG5pbXBvcnQgeyBmb3JtYXQgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgSU1hc2sgZnJvbSAnaW1hc2snO1xuXG5jb25zdCBzcGxpdFRvQ29kZSA9IChkYXRlKSA9PiBkYXRlLnNwbGl0KCcvJykucmV2ZXJzZSgpLmpvaW4oJy8nKS5yZXBsYWNlQWxsKCcvJywgJywgJyk7XG5leHBvcnQgY29uc3QgdG9JbnB1dCA9IChkYXRhKSA9PiBmb3JtYXQobmV3IERhdGUoc3BsaXRUb0NvZGUoZGF0YSkpLCAnZGQvTEwveXl5eScpO1xuLy8gY29uc3QgZ2V0RGF0YSA9IChhcnIpID0+IGFyci5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4vLyB9KTtcblxuZXhwb3J0IGNvbnN0IG1hc2tEYXRlID0ge1xuICBtYXNrOiAnZC9gbS9gWScsXG4gIGJsb2Nrczoge1xuICAgIGQ6IHtcbiAgICAgIG1hc2s6IElNYXNrLk1hc2tlZFJhbmdlLFxuICAgICAgcGxhY2Vob2xkZXJDaGFyOiAnZCcsXG4gICAgICBmcm9tOiAxLFxuICAgICAgdG86IDMxLFxuICAgICAgbWF4TGVuZ3RoOiAyLFxuICAgIH0sXG4gICAgbToge1xuICAgICAgbWFzazogSU1hc2suTWFza2VkUmFuZ2UsXG4gICAgICBwbGFjZWhvbGRlckNoYXI6ICdtJyxcbiAgICAgIGZyb206IDEsXG4gICAgICB0bzogMTIsXG4gICAgICBtYXhMZW5ndGg6IDIsXG4gICAgfSxcbiAgICBZOiB7XG4gICAgICBtYXNrOiBJTWFzay5NYXNrZWRSYW5nZSxcbiAgICAgIHBsYWNlaG9sZGVyQ2hhcjogJ2EnLFxuICAgICAgZnJvbTogMTAwMCxcbiAgICAgIHRvOiA5OTk5LFxuICAgIH0sXG4gIH0sXG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWN5Y2xlICovXG5pbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcbmltcG9ydCB7XG4gIGNyZWF0ZUVsZW1lbnQsIGNyZWF0ZVByaW9yaXR5U2VsZWN0LCBkdWVEYXRlTWFzaywgc2VhcmNoUHJvamVjdHMsXG59IGZyb20gJy4vdWlDb21tb25GdW5jdGlvbnMnO1xuaW1wb3J0IHVpQ29udHJvbCBmcm9tICcuL3VpQ29udHJvbGxlcic7XG5cbmZ1bmN0aW9uIHNhdmUodGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0LCBub3RlcywgaWQpIHtcbiAgY29uc3QgbmV3T2JqID0ge1xuICAgIHRpdGxlOiB0aXRsZS52YWx1ZSxcbiAgICBkdWVEYXRlOiBkdWVEYXRlLnZhbHVlLFxuICAgIHByaW9yaXR5OiBwcmlvcml0eS52YWx1ZSxcbiAgICBwcm9qZWN0OiBwcm9qZWN0LnZhbHVlLFxuICAgIG5vdGVzLFxuICB9O1xuICBpZiAoaWQgIT09IHVuZGVmaW5lZCkge1xuICAgIHRvZG9MaXN0LmVkaXRJdGVtKGlkLCBuZXdPYmopO1xuICB9IGVsc2Uge1xuICAgIHRvZG9MaXN0LmFkZEl0ZW0obmV3T2JqKTtcbiAgfVxuICB1aUNvbnRyb2wudXBkYXRlKCk7XG59XG5cbmZ1bmN0aW9uIHVpRWRpdEl0ZW0odGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0LCBub3RlcywgaWQpIHtcbiAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYubW9kYWwtYm9keScpO1xuICAvLyBjcmVhdGluZyBlbGVtZW50c1xuICBjb25zdCByb3cxID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnXSk7XG4gIGNvbnN0IHRpdGxlRGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydpbnB1dC1ncm91cCcsICdtYi0zJywgJ2dhcC0xJ10pO1xuICBjb25zdCB0aXRsZUlucHV0ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2Zvcm0tY29udHJvbCddLCB7XG4gICAgaWQ6ICdpdGVtVGl0bGUnLFxuICAgIHR5cGU6ICd0ZXh0JyxcbiAgICBwbGFjZWhvbGRlcjogJ05vdmEgVGFyZWZhLi4uJyxcbiAgfSk7XG4gIGNvbnN0IHJvdzIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2JnLWdyYXknLCAncm93JywgJ2ctMCcsICdnYXAtMicsICdmbGV4LW5vd3JhcCddKTtcblxuICBjb25zdCBkYXRlRGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydkYXRlJywgJ2ZsYXRwaWNrcicsICdjb2wnXSk7XG4gIGNvbnN0IGRhdGVJbnB1dCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgWydmb3JtLWNvbnRyb2wnLCAnZmxhdHBpY2tyLWlucHV0J10sIHtcbiAgICBpZDogJ2R1ZURhdGUnLFxuICAgIHR5cGU6ICd0ZXh0JyxcbiAgICBpbnB1dG1vZGU6ICdudW1lcmljJyxcbiAgICAnZGF0YS1pbnB1dCc6IHVuZGVmaW5lZCxcbiAgICBhdXRvY29tcGxldGU6ICdvZmYnLFxuICB9KTtcbiAgY29uc3QgZGF0ZXBpY2tlclRvZ2dsZSA9IGNyZWF0ZUVsZW1lbnQoJ2EnLCBbJ2lucHV0LWJ1dHRvbiddLCB7XG4gICAgdGl0bGU6ICd0b2dnbGUnLFxuICAgICdkYXRhLXRvZ2dsZSc6IHVuZGVmaW5lZCxcbiAgfSk7XG4gIGNvbnN0IGRhdGVJY29uID0gY3JlYXRlRWxlbWVudCgnaScsIFsndGV4dC13YXJuaW5nJywgJ3NtYWxsJywgJ2JpJywgJ2JpLWNhbGVuZGFyJ10pO1xuXG4gIGNvbnN0IHByaW9yaXR5RGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydjb2wnXSk7XG4gIGNvbnN0IHByaW9yaXR5U2VsZWN0ID0gY3JlYXRlUHJpb3JpdHlTZWxlY3QocHJpb3JpdHkpO1xuXG4gIGNvbnN0IHByb2plY3REaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbCddKTtcbiAgY29uc3QgcHJvamVjdElucHV0ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2Zvcm0tY29udHJvbCddLCB7XG4gICAgaWQ6ICdlbnRlclByb2plY3QnLFxuICAgIHR5cGU6ICd0ZXh0JyxcbiAgICBsaXN0OiAnZGF0YWxpc3RPcHRpb25zJyxcbiAgICBwbGFjZWhvbGRlcjogJ1Byb2pldG8nLFxuICAgIGF1dG9jb21wbGV0ZTogJ29mZicsXG4gIH0pO1xuICBjb25zdCBwcm9qZWN0RGF0YWxpc3QgPSBjcmVhdGVFbGVtZW50KCdkYXRhbGlzdCcsIFsnc3VnZ2VzdGlvbnMnLCAnZm9ybSddLCB7XG4gICAgaWQ6ICdkYXRhbGlzdE9wdGlvbnMnLFxuICAgIGRyb3B6b25lOiAnc3RyaW5nJyxcbiAgfSk7XG5cbiAgY29uc3Qgcm93MyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncm93JywgJ3B0LTInXSk7XG5cbiAgY29uc3Qgbm90ZXNDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbnRhaW5lciddKTtcbiAgY29uc3Qgbm90ZXNIZWFkZXIgPSBjcmVhdGVFbGVtZW50KCdoNicpO1xuICBjb25zdCBub3Rlc1JvdyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncm93JywgJ2ctMiddKTtcbiAgY29uc3Qgbm90ZXNMaXN0ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydub3Rlc0xpc3QnXSk7XG5cbiAgY29uc3QgYWRkTm90ZVJvdyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncm93JywgJ3B0LTInLCAnanVzdGlmeS1jb250ZW50LWVuZCddKTtcblxuICBjb25zdCBhZGROb3RlRGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydjb2wtYXV0bycsICdzbWFsbCcsICd0ZXh0LWRhbmdlcicsICd0ZXh0LXdhcm5pbmctZW1waGFzaXMnXSk7XG4gIGNvbnN0IGFkZE5vdGVMaW5rID0gY3JlYXRlRWxlbWVudCgnYScsIFtdLCB7IGlkOiAnYWRkTm90ZScgfSk7XG4gIGNvbnN0IGFkZE5vdGVJY29uID0gY3JlYXRlRWxlbWVudCgnaScsIFsnYmknLCAnYmktcGx1cy1jaXJjbGUnXSk7XG4gIGNvbnN0IGFkZE5vdGVUZXh0ID0gY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gIGNvbnN0IHJvdzQgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3JvdycsICdnLTInLCAncHQtMycsICdqdXN0aWZ5LWNvbnRlbnQtc3RhcnQnLCAnZmxleC1yb3ctcmV2ZXJzZSddKTtcblxuICBjb25zdCBzYXZlRGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydjb2wtYXV0byddKTtcbiAgY29uc3Qgc2F2ZUJ0biA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIFsnYnRuJywgJ2J0bi13YXJuaW5nJ10sIHtcbiAgICAnZGF0YS1icy1kaXNtaXNzJzogJ21vZGFsJyxcbiAgfSk7XG4gIGNvbnN0IGNhbmNlbERpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29sLWF1dG8nXSk7XG4gIGNvbnN0IGNhbmNlbEJ0biA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIFsnYnRuJywgJ2J0bi1zZWNvbmRhcnknLCAndGV4dC1saWdodCddLCB7XG4gICAgJ2RhdGEtYnMtZGlzbWlzcyc6ICdtb2RhbCcsXG4gIH0pO1xuXG4gIC8vIGFwcGVuZCBlbGVtZW50c1xuXG4gIC8vIHJvdyAxICh0aXRsZSlcbiAgaWYgKHRpdGxlICYmICh0eXBlb2YgdGl0bGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0aXRsZS52YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgdGl0bGVJbnB1dC52YWx1ZSA9IHR5cGVvZiB0aXRsZSA9PT0gJ3N0cmluZycgPyB0aXRsZSA6IHRpdGxlLnZhbHVlO1xuICB9XG4gIHRpdGxlRGl2LmFwcGVuZENoaWxkKHRpdGxlSW5wdXQpO1xuXG4gIHJvdzEuYXBwZW5kQ2hpbGQodGl0bGVEaXYpO1xuXG4gIC8vIHJvdyAyIChkYXRlLCBwcmlvcml0eSwgcHJvamVjdClcblxuICAvLyBkYXRlXG4gIGlmIChkdWVEYXRlICE9PSB1bmRlZmluZWQgJiYgZHVlRGF0ZSAhPT0gMCkge1xuICAgIGRhdGVJbnB1dC52YWx1ZSA9IGR1ZURhdGU7XG4gIH1cbiAgZGF0ZXBpY2tlclRvZ2dsZS5hcHBlbmRDaGlsZChkYXRlSWNvbik7XG4gIGRhdGVEaXYuYXBwZW5kKGRhdGVJbnB1dCwgZGF0ZXBpY2tlclRvZ2dsZSk7XG5cbiAgLy8gcHJpb3JpdHlcbiAgcHJpb3JpdHlEaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlTZWxlY3QpO1xuXG4gIC8vIHByb2plY3RcbiAgLy8gY29uc29sZS5sb2cocHJvamVjdCk7XG4gIGlmICh0eXBlb2YgcHJvamVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvamVjdCAhPT0gMCkgcHJvamVjdElucHV0LnZhbHVlID0gcHJvamVjdDtcbiAgcHJvamVjdERpdi5hcHBlbmQocHJvamVjdElucHV0LCBwcm9qZWN0RGF0YWxpc3QpO1xuXG4gIHJvdzIuYXBwZW5kKGRhdGVEaXYsIHByaW9yaXR5RGl2LCBwcm9qZWN0RGl2KTtcblxuICAvLyByb3czIChub3RlcyBhcmVhKVxuICBub3Rlc0hlYWRlci50ZXh0Q29udGVudCA9ICdOb3Rhcyc7XG4gIGFkZE5vdGVUZXh0LnRleHRDb250ZW50ID0gJ05vdmEgbm90YSc7XG4gIGFkZE5vdGVJY29uLnRleHRDb250ZW50ID0gJyAnOyAvLyBmaXhpbmcgYSBwcm9ibGVtIGZvciB1c2luZyBqc1xuXG4gIGFkZE5vdGVMaW5rLmFwcGVuZChhZGROb3RlSWNvbiwgYWRkTm90ZVRleHQpO1xuICBhZGROb3RlRGl2LmFwcGVuZENoaWxkKGFkZE5vdGVMaW5rKTtcbiAgYWRkTm90ZVJvdy5hcHBlbmRDaGlsZChhZGROb3RlRGl2KTtcbiAgaWYgKG5vdGVzKSB7XG4gICAgbm90ZXMuZm9yRWFjaCgobm90ZSkgPT4ge1xuICAgICAgLy8gcHJlY2lzbyBjaXJhciBvIGxheW91dCBkYXMgbm90YXNcbiAgICAgIG5vdGVzTGlzdC5pbm5lckhUTUwgKz0gYDxzcGFuPiR7bm90ZX08L3NwYW4+YDtcbiAgICB9KTtcbiAgfVxuICBub3Rlc1Jvdy5hcHBlbmQobm90ZXNMaXN0LCBhZGROb3RlUm93KTtcbiAgbm90ZXNDb250YWluZXIuYXBwZW5kKG5vdGVzSGVhZGVyLCBub3Rlc1Jvdyk7XG5cbiAgcm93My5hcHBlbmRDaGlsZChub3Rlc0NvbnRhaW5lcik7XG5cbiAgLy8gcm93NCAoYnV0dG9ucylcbiAgY2FuY2VsQnRuLnRleHRDb250ZW50ID0gJ0NhbmNlbCc7XG4gIHNhdmVCdG4udGV4dENvbnRlbnQgPSAnU2F2ZSc7XG4gIGlmIChpZCAhPT0gdW5kZWZpbmVkKSBzYXZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc2F2ZSh0aXRsZUlucHV0LCBkYXRlSW5wdXQsIHByaW9yaXR5U2VsZWN0LCBwcm9qZWN0SW5wdXQsIG5vdGVzLCBpZCkpO1xuICBlbHNlIHNhdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzYXZlKHRpdGxlSW5wdXQsIGRhdGVJbnB1dCwgcHJpb3JpdHlTZWxlY3QsIHByb2plY3RJbnB1dCkpO1xuICBzYXZlRGl2LmFwcGVuZENoaWxkKHNhdmVCdG4pO1xuICBjYW5jZWxEaXYuYXBwZW5kQ2hpbGQoY2FuY2VsQnRuKTtcblxuICByb3c0LmFwcGVuZChzYXZlRGl2LCBjYW5jZWxEaXYpO1xuXG4gIG1vZGFsLmFwcGVuZChyb3cxLCByb3cyLCByb3czLCByb3c0KTtcbiAgZHVlRGF0ZU1hc2soKTtcbiAgc2VhcmNoUHJvamVjdHMoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdWlFZGl0SXRlbTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1jeWNsZSAqL1xuaW1wb3J0IHRvZG9MaXN0IGZyb20gJy4vY29yZSc7XG5pbXBvcnQge1xuICBjcmVhdGVFbGVtZW50LCBoYXNOb3RlcywgaXNDaGVja2VkLCBsaXN0LFxufSBmcm9tICcuL3VpQ29tbW9uRnVuY3Rpb25zJztcbmltcG9ydCB1aUNvbnRyb2wgZnJvbSAnLi91aUNvbnRyb2xsZXInO1xuXG5mdW5jdGlvbiBpbnNlcnROb3RlKG5vdGVzLCBib2R5KSB7XG4gIG5vdGVzLmZvckVhY2goKGNvbnRlbnQpID0+IHtcbiAgICBjb25zdCBjb250ZW50RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29udGVudERpdi5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoY29udGVudERpdik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRDaGVja2VkKGNoZWNrYm94LCBidXR0b24sIHByaW9yaXR5KSB7XG4gIGNoZWNrYm94LmNoZWNrZWQgPSB0cnVlO1xuICBidXR0b24uY2xhc3NMaXN0LmFkZCgndGV4dC1kZWNvcmF0aW9uLWxpbmUtdGhyb3VnaCcsICdvcGFjaXR5LTUwJyk7XG4gIHByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ29wYWNpdHktNTAnKTtcbn1cblxuZnVuY3Rpb24gc2V0Q2hlY2tlZEhhbmRsZXIoZSkge1xuICBjb25zdCB7IHRhcmdldCB9ID0gZTtcbiAgY29uc3QgaWQgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XG4gIHRvZG9MaXN0LnNldENoZWNrZWQoaWQpO1xufVxuXG5jb25zdCBwcmlvcml0eVNldHRpbmdzID0ge1xuICAwOiB7IHRpdGxlOiAnTm8gcHJpb3JpdHknLCBhcnJheTogWydiaS1vY3RhZ29uJ10gfSxcbiAgMTogeyB0aXRsZTogJ1ByaW9yaXR5IDEnLCBhcnJheTogWydiaS1leGNsYW1hdGlvbi1vY3RhZ29uLWZpbGwnLCAndGV4dC1zdWNjZXNzJ10gfSxcbiAgMjogeyB0aXRsZTogJ1ByaW9yaXR5IDInLCBhcnJheTogWydiaS1leGNsYW1hdGlvbi1vY3RhZ29uLWZpbGwnLCAndGV4dC13YXJuaW5nJ10gfSxcbiAgMzogeyB0aXRsZTogJ1ByaW9yaXR5IDMnLCBhcnJheTogWydiaS1leGNsYW1hdGlvbi1vY3RhZ29uLWZpbGwnLCAndGV4dC1kYW5nZXInXSB9LFxufTtcblxuZnVuY3Rpb24gc2VsZWN0UHJpb3JpdHkobnVtKSB7XG4gIGNvbnN0IG9iaiA9IHByaW9yaXR5U2V0dGluZ3NbbnVtXTtcbiAgY29uc3Qgc3RhbmRhcmRDbGFzc2VzID0gWydzbWFsbCcsICdtcy0yJywgJ2JpJ107XG4gIGNvbnN0IGNsYXNzZXMgPSBzdGFuZGFyZENsYXNzZXMuY29uY2F0KG9iai5hcnJheSk7XG4gIGNvbnN0IGF0dHJzID0geyAnZGF0YS10b2dnbGUnOiAndG9vbHRpcCcsICdkYXRhLXBsYWNlbWVudCc6ICd0b3AnIH07XG4gIGF0dHJzLnRpdGxlID0gb2JqLnRpdGxlO1xuXG4gIHJldHVybiBjcmVhdGVFbGVtZW50KCdpJywgY2xhc3NlcywgYXR0cnMpO1xufVxuXG5mdW5jdGlvbiBhZGRMaW5lKG9iaikge1xuICAvLyBoZWFkZXJcbiAgY29uc3QgaXRlbSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnYWNjb3JkaW9uLWl0ZW0nXSk7XG4gIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnYWNjb3JkaW9uLWhlYWRlcicsICdwLTEnLCAnZC1mbGV4JywgJ2FsaWduLWl0ZW1zLWNlbnRlcicsICdnYXAtMSddKTtcbiAgY29uc3QgY2hlY2tib3ggPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIFsnZm9ybS1jaGVjay1pbnB1dCcsICd0ZXh0LWJnLXdhcm5pbmcnXSwge1xuICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgJ2RhdGEtaWQnOiBgJHtvYmouaWR9YCxcbiAgfSk7XG4gIGNvbnN0IGJ0bkhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIFsnYWNjb3JkaW9uLWJ1dHRvbicsICdjb2xsYXBzZWQnLCAnZmxleC1maWxsJ10sIHtcbiAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAnZGF0YS1icy10b2dnbGUnOiAnY29sbGFwc2UnLFxuICAgICdhcmlhLWV4cGFuZGVkJzogJ2ZhbHNlJyxcbiAgICAnZGF0YS1icy10YXJnZXQnOiBgI2l0ZW0tJHtvYmouaWR9YCxcbiAgfSk7XG4gIGNvbnN0IHByaW9yaXR5ID0gc2VsZWN0UHJpb3JpdHkob2JqLnByaW9yaXR5LCAxMCk7XG4gIGNvbnN0IHNwYW4gPSBjcmVhdGVFbGVtZW50KCdzcGFuJywgWydmbGV4LWZpbGwnXSk7XG4gIGNvbnN0IGNvZGUgPSBjcmVhdGVFbGVtZW50KCdjb2RlJywgWydzbWFsbCcsICd0ZXh0LW11dGVkJ10pO1xuXG4gIC8vIGJvZHlcbiAgY29uc3QgaXRlbURldGFpbHMgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2FjY29yZGlvbi1jb2xsYXBzZScsICdjb2xsYXBzZSddLCB7XG4gICAgaWQ6IGBpdGVtLSR7b2JqLmlkfWAsXG4gICAgJ2RhdGEtYnMtcGFyZW50JzogJyNsaXN0JyxcbiAgfSk7XG4gIGNvbnN0IGl0ZW1Cb2R5ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydhY2NvcmRpb24tYm9keSddKTtcbiAgY29uc3QgZWRpdERlbGV0ZUl0ZW0gPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2QtZmxleCcsICdmbGV4LXJvdy1yZXZlcnNlJywgJ2NvbCcsICdnYXAtMiddKTtcblxuICBjb25zdCBidG5FZGl0ID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgWydidG4nLCAnYnRuLXdhcm5pbmcnXSwge1xuICAgICdkYXRhLWlkJzogb2JqLmlkLFxuICAgICdkYXRhLWJzLXRhcmdldCc6ICcjZXhhbXBsZU1vZGFsJyxcbiAgICAnZGF0YS1icy10b2dnbGUnOiAnbW9kYWwnLFxuICB9KTtcbiAgY29uc3QgYnRuRGVsZXRlID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgWydidG4nLCAnYnRuLWRhbmdlciddLCB7XG4gICAgJ2RhdGEtaWQnOiBvYmouaWQsXG4gIH0pO1xuXG4gIC8vIEVWRU5UTElTVE5FUlMgT0JKRUNUU1xuICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBzZXRDaGVja2VkSGFuZGxlcik7XG5cbiAgLy8gRklMTElORyBDT05URU5UXG4gIC8vIGhlYWRlclxuICBzcGFuLnRleHRDb250ZW50ID0gb2JqLnRpdGxlO1xuICBjb2RlLnRleHRDb250ZW50ID0gb2JqLnByb2plY3Q7XG5cbiAgLy8gYm9keVxuICBidG5FZGl0LnRleHRDb250ZW50ID0gJ0VkaXQnO1xuICBidG5EZWxldGUudGV4dENvbnRlbnQgPSAnRGVsZXRlJztcblxuICAvLyBBcHBlbmRpbmcgY29udGVudFxuICBidG5IZWFkZXIuYXBwZW5kKHNwYW4sIGNvZGUpO1xuICBoZWFkZXIuYXBwZW5kKGNoZWNrYm94LCBwcmlvcml0eSwgYnRuSGVhZGVyKTtcblxuICAvLyBCb2R5IGNvbnRlbnRcbiAgaWYgKGhhc05vdGVzKG9iai5ub3RlcykpIHtcbiAgICBpbnNlcnROb3RlKG9iai5ub3RlcywgaXRlbUJvZHkpO1xuICB9XG4gIGJ0bkVkaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZWxlbSkgPT4ge1xuICAgIHVpQ29udHJvbC5oYW5kbGVycy5lZGl0KGVsZW0pO1xuICB9KTtcbiAgYnRuRGVsZXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdWlDb250cm9sLmhhbmRsZXJzLmRlbGV0ZUl0ZW0pO1xuICBlZGl0RGVsZXRlSXRlbS5hcHBlbmQoYnRuRGVsZXRlLCBidG5FZGl0KTtcbiAgaXRlbUJvZHkuYXBwZW5kQ2hpbGQoZWRpdERlbGV0ZUl0ZW0pO1xuICBpdGVtRGV0YWlscy5hcHBlbmRDaGlsZChpdGVtQm9keSk7XG5cbiAgLy8gQXBwZW5kIGVsZW1lbnRzIHRvIGxpc3RcbiAgaXRlbS5hcHBlbmQoaGVhZGVyLCBpdGVtRGV0YWlscyk7XG4gIGxpc3QuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gIGlmIChpc0NoZWNrZWQob2JqKSkgYWRkQ2hlY2tlZChjaGVja2JveCwgYnRuSGVhZGVyLCBwcmlvcml0eSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFkZExpbmU7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xuaW1wb3J0IHsgcmVzdG9yZVN0b3JhZ2UgfSBmcm9tICcuL0pTT05GdW5jdGlvbnMnO1xuXG5pbXBvcnQge1xuICBjbGVhckNvbnRlbnQsXG4gIHNob3dQbHVzQnRuLFxuICBhZGRGaWVsZCxcbiAgYWRkVGFzayxcbiAgaW5wdXQsXG4gIGFkZE1vcmUsXG4gIHF1aWNrU2F2ZSxcbiAgbGlzdCxcbn0gZnJvbSAnLi91aUNvbW1vbkZ1bmN0aW9ucyc7XG5pbXBvcnQgdWlFZGl0SXRlbSBmcm9tICcuL2VkaXRDb25zdHJ1Y3Rvcic7XG5pbXBvcnQgdWlDb250cm9sIGZyb20gJy4vdWlDb250cm9sbGVyJztcblxuY29uc3QgaG9tZUxpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhI2hvbWUnKTtcbmNvbnN0IHByb2plY3RzSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNwcm9qZWN0cycpO1xuY29uc3QgcHJvamVjdHNEcm9wZG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNwcm9qZWN0cyBkaXYnKTtcbmNvbnN0IG1haW5Nb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNleGFtcGxlTW9kYWwnKTtcblxuLy8gc2V0IG1heCBoZWlnaHQgZm9yIGxpc3QgaXRlbXNcbmZ1bmN0aW9uIHNldE1heEhlaWdodCgpIHtcbiAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gICAgLy8gZ2V0IHBhZGRpbmcgdG9wICsgYm90dG9tIGZvcm0gbWFpbiBlbGVtZW50XG4gICAgbGV0IG1haW5QYWRkaW5nID0gcGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyksIG51bGwpXG4gICAgICAuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy10b3AnKS5tYXRjaCgvXFxkKyhcXC5cXGQrKT8vKSk7XG4gICAgbWFpblBhZGRpbmcgKz0gcGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyksIG51bGwpXG4gICAgICAuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy1ib3R0b20nKS5tYXRjaCgvXFxkKyhcXC5cXGQrKT8vKSk7XG5cbiAgICAvLyBnZXQgb3RoZXIgZWxlbWVudHMgc2l6ZVxuICAgIGNvbnN0IGJvZHlIZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jykub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IGluc2V0SXRlbUhlaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4gPiBkaXYnKS5vZmZzZXRIZWlnaHQ7XG4gICAgY29uc3QgaGVhZGVySGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJykub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IGFzaWRlSGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXNpZGUnKS5vZmZzZXRIZWlnaHQ7XG4gICAgLy8gY29uc3QgZm9vdGVySGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9vdGVyJykub2Zmc2V0SGVpZ2h0O1xuXG4gICAgLy8gc2V0IG1heCBzaXplIGZvciB0YXNrIGxpc3RcbiAgICBjb25zdCBtYXhIZWlnaHQgPSBib2R5SGVpZ2h0IC0gaGVhZGVySGVpZ2h0IC0gaW5zZXRJdGVtSGVpZ2h0IC0gYXNpZGVIZWlnaHQgLSBtYWluUGFkZGluZztcbiAgICBsaXN0LnN0eWxlLm1heEhlaWdodCA9IGAke21heEhlaWdodH1weGA7XG4gIH0gZWxzZSBsaXN0LnN0eWxlLm1heEhlaWdodCA9ICdub25lJztcbn1cblxuLy8gZXZlbnRMaXN0ZW5lcnNcbi8vIGhvbWUgcGFnZSBidXR0b24gZnVuY3Rpb25zXG5ob21lTGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgdWlDb250cm9sLnVwZGF0ZSgnY2xlYXInKTtcbn0pO1xuYWRkVGFzay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHVpRWRpdEl0ZW0pO1xuYWRkRmllbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHNob3dQbHVzQnRuKTtcbmFkZEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgc2hvd1BsdXNCdG4pO1xuYWRkTW9yZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHVpQ29udHJvbC5oYW5kbGVycy5lZGl0TW9yZShpbnB1dCkpO1xucXVpY2tTYXZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdWlDb250cm9sLmhhbmRsZXJzLmZhc3RTYXZlKGlucHV0KSk7XG5cbi8vIHNldCBoZWlnaHQgbGltaXQgZm9yIGxpc3QgaXRlbXNcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgc2V0TWF4SGVpZ2h0KTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzZXRNYXhIZWlnaHQpO1xuXG4vLyBhdXRvLXNhdmVcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gIHVpQ29udHJvbC51cGRhdGUoKTtcbn0pO1xuXG4vLyByZXN0b3JlIGRhdGEgd2hlbiBpdCdzIGxvYWRlZFxud2luZG93Lm9ubG9hZCA9IHJlc3RvcmVTdG9yYWdlKCk7XG5cbi8vIG1lbnUgZm9yIG1vYmlsZSB2ZXJzaW9uXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICBpZiAoIWV2ZW50LnRhcmdldC5jbG9zZXN0KCcjcHJvamVjdHMnKSkge1xuICAgIHByb2plY3RzRHJvcGRvd24uY2xhc3NMaXN0LmFkZCgnbWVudS1oaWRlJyk7XG4gIH1cbn0pO1xucHJvamVjdHNJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBpZiAocHJvamVjdHNEcm9wZG93bi5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtaGlkZScpKSB7XG4gICAgcHJvamVjdHNEcm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKCdtZW51LWhpZGUnKTtcbiAgfSBlbHNlIHtcbiAgICBwcm9qZWN0c0Ryb3Bkb3duLmNsYXNzTGlzdC5hZGQoJ21lbnUtaGlkZScpO1xuICB9XG59KTtcblxuLy8gY2xlYXIgbW9kYWwgY29udGVudCBldmVyeXRpbWUgaXQncyBjbG9zZWRcbm1haW5Nb2RhbC5hZGRFdmVudExpc3RlbmVyKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB7XG4gIGNsZWFyQ29udGVudChtYWluTW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWJvZHknKSk7XG59KTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGNvbnN0IHRvb2x0aXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpO1xuICB0b29sdGlwcy5mb3JFYWNoKCh0aXApID0+IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICB0aXAgPSBuZXcgYm9vdHN0cmFwLlRvb2x0aXAodGlwKTtcbiAgfSk7XG59LCBmYWxzZSk7XG5cbi8vIHN0YXJ0IGFwcFxudWlDb250cm9sLmxvYWQoKTtcbiIsImltcG9ydCBmbGF0cGlja3IgZnJvbSAnZmxhdHBpY2tyJztcbmltcG9ydCB7IFBvcnR1Z3Vlc2UgfSBmcm9tICdmbGF0cGlja3IvZGlzdC9sMTBuL3B0JztcbmltcG9ydCBJTWFzayBmcm9tICdpbWFzayc7XG5pbXBvcnQgeyBtYXNrRGF0ZSB9IGZyb20gJy4vZGF0ZSc7XG5pbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcblxuZXhwb3J0IGNvbnN0IGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYjbGlzdCcpO1xuZXhwb3J0IGNvbnN0IGFkZEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQjaXRlbVRpdGxlJyk7XG5leHBvcnQgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuZXhwb3J0IGNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhI2FkZEl0ZW0nKTtcbmV4cG9ydCBjb25zdCBhZGRNb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uI2FkZE1vcmUnKTtcbmV4cG9ydCBjb25zdCBxdWlja1NhdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24jc2F2ZUl0ZW0nKTtcblxuZXhwb3J0IGNvbnN0IGlzQ2hlY2tlZCA9IChlKSA9PiBlLmNoZWNrZWQgPT09IHRydWU7XG5leHBvcnQgY29uc3QgaGFzTm90ZXMgPSAob2JqKSA9PiBvYmoubGVuZ3RoID4gMDtcbmV4cG9ydCBjb25zdCBsb2FkTGlzdCA9ICgpID0+IFsuLi50b2RvTGlzdC5hbGxUYXNrc0xpc3QoKV07XG5leHBvcnQgY29uc3Qgc29ydFBhcmFtID0gKGFyciwgcGFyYW0pID0+IFsuLi5hcnJdXG4gIC5zb3J0KChhLCBiKSA9PiAoKGFbcGFyYW1dIDwgYltwYXJhbV0pID8gLTEgOiAxKSk7XG5cbmNvbnN0IHNwZWNpYWxDaGFyc0VudHJpZXMgPSBbXG4gIFsnw4DDgcOCw4PDhMOFJywgJ0EnXSxcbiAgWyfDoMOhw6LDo8Okw6UnLCAnYSddLFxuICBbJ8OIw4nDisOLJywgJ0UnXSxcbiAgWyfDqMOpw6rDqycsICdlJ10sXG4gIFsnw4zDjcOOw48nLCAnSSddLFxuICBbJ8Osw63DrsOvJywgJ2knXSxcbiAgWyfDksOTw5XDlMOWJywgJ08nXSxcbiAgWyfDssOzw7XDtMO2JywgJ28nXSxcbiAgWyfDmcOaw5vDnCcsICdVJ10sXG4gIFsnw7nDusO7w7wnLCAndSddLFxuICBbJ8OHJywgJ0MnXSxcbiAgWyfDpycsICdjJ10sXG5dO1xuXG5jb25zdCBzcGVjaWFsQ2hhcnNNYXAgPSBPYmplY3QuZnJvbUVudHJpZXMoXG4gIHNwZWNpYWxDaGFyc0VudHJpZXMuZmxhdE1hcCgoW2NoYXJzLCB2YWx1ZV0pID0+IFsuLi5jaGFyc10ubWFwKChjaGFyKSA9PiBbY2hhciwgdmFsdWVdKSksXG4pO1xuXG4vLyBFTEVNRU5UIENSRUFUT1JTXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRBdHRycyhlbGVtLCBhdHRycykge1xuICBPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkICYmIGF0dHJzW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoa2V5LCAnJyk7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnLCBjbGFzc05hbWVzID0gW10sIGF0dHJpYnV0ZXMgPSB7fSkge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICBpZiAoY2xhc3NOYW1lcy5sZW5ndGgpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCguLi5jbGFzc05hbWVzKTtcbiAgc2V0QXR0cnMoZWxlbWVudCwgYXR0cmlidXRlcyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlT3B0aW9uKHZhbHVlLCB0ZXh0LCBzZWxlY3RlZCkge1xuICBjb25zdCBvcHRpb24gPSBjcmVhdGVFbGVtZW50KCdvcHRpb24nLCBbXSwgeyB2YWx1ZSB9KTtcbiAgb3B0aW9uLnRleHRDb250ZW50ID0gdGV4dDtcbiAgaWYgKHNlbGVjdGVkKSB7XG4gICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnJyk7XG4gIH1cbiAgcmV0dXJuIG9wdGlvbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByaW9yaXR5U2VsZWN0KG51bSA9IDApIHtcbiAgY29uc3Qgc2VsZWN0ID0gY3JlYXRlRWxlbWVudCgnc2VsZWN0JywgWydmb3JtLXNlbGVjdCddLCB7XG4gICAgJ2FyaWEtbGFiZWwnOiAnUHJpb3JpdHknLFxuICB9KTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpICs9IDEpIHtcbiAgICBjb25zdCB0ZXh0ID0gaSA9PT0gMCA/ICctLSBTZWxlY3QgUHJpb3JpdHknIDogYFByaW9yaXR5ICR7aX1gO1xuICAgIGNvbnN0IHNlbGVjdGVkID0gaSA9PT0gcGFyc2VJbnQobnVtLCAxMCk7XG4gICAgY29uc3Qgb3B0aW9uID0gY3JlYXRlT3B0aW9uKGksIHRleHQsIHNlbGVjdGVkKTtcbiAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgfVxuICByZXR1cm4gc2VsZWN0O1xufVxuXG4vLyBVSSBGVU5DVElPTlNcblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyQ29udGVudChlbGVtKSB7XG4gIHdoaWxlIChlbGVtLmZpcnN0Q2hpbGQpIHtcbiAgICBlbGVtLnJlbW92ZUNoaWxkKGVsZW0ubGFzdENoaWxkKTtcbiAgfVxufVxuXG4vLyBBREQvRURJVCBORVcgVEFTSyBTQ1JFRU4gRlVOQ1RJT05TXG5cbmZ1bmN0aW9uIHJlbW92ZVNwZWNpYWxzKHRleHQpIHtcbiAgbGV0IHNlYXJjaCA9IHRleHQ7XG4gIHNlYXJjaCA9IHNlYXJjaC5yZXBsYWNlKFxuICAgIC9bw4Atw5zDoC3DvF0vZyxcbiAgICAobWF0Y2gpID0+IHNwZWNpYWxDaGFyc01hcFttYXRjaF0gfHwgbWF0Y2gsXG4gICk7XG4gIHJldHVybiBzZWFyY2g7XG59XG4vLyBwcm9qZWN0cyBkYXRhbGlzdCBhdXRvY29tcGxldGVcbmZ1bmN0aW9uIGF1dG9Db21wbGV0ZShzZWFyY2gpIHtcbiAgY29uc3QgcHJvamVjdHMgPSB0b2RvTGlzdC5nZXRQcm9qZWN0cygpO1xuICByZXR1cm4gcHJvamVjdHMuZmlsdGVyKCh2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHZhbHVlTG93ZXJjYXNlID0gcmVtb3ZlU3BlY2lhbHModmFsdWUudG9Mb3dlckNhc2UoKSk7XG4gICAgY29uc3Qgc2VhcmNoTG93ZXJjYXNlID0gcmVtb3ZlU3BlY2lhbHMoc2VhcmNoLnRvTG93ZXJDYXNlKCkpO1xuICAgIHJldHVybiB2YWx1ZUxvd2VyY2FzZS5pbmNsdWRlcyhzZWFyY2hMb3dlcmNhc2UpO1xuICB9KTtcbn1cblxuLy8gY2FsbGluZyBmdW5jdGlvbnMgdG8gYXV0b2NvbXBsZXRlIFByb2plY3QgZmllbGRcblxuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaFByb2plY3RzKCkge1xuICBjb25zdCBpbnB1dFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW50ZXJQcm9qZWN0Jyk7XG4gIGNvbnN0IGRhdGFsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGF0YWxpc3QnKTtcbiAgaW5wdXRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKHsgdGFyZ2V0IH0pID0+IHtcbiAgICBjb25zdCBpbnB1dERhdGEgPSB0YXJnZXQudmFsdWU7XG4gICAgaWYgKGlucHV0RGF0YS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGF1dG9Db21wbGV0ZU9wdGlvbnMgPSBhdXRvQ29tcGxldGUoaW5wdXREYXRhKTtcbiAgICAgIGRhdGFsaXN0LmlubmVySFRNTCA9IGAke2F1dG9Db21wbGV0ZU9wdGlvbnNcbiAgICAgICAgLm1hcCgodmFsdWUpID0+IGA8b3B0aW9uIHZhbHVlPVwiJHt2YWx1ZX1cIiAvPmApXG4gICAgICAgIC5qb2luKCcnKX1gO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIERBVEVQSUNLRVIgQU5EIE1BU0sgRlVOQ1RJT05TXG5leHBvcnQgZnVuY3Rpb24gZHVlRGF0ZU1hc2soKSB7XG4gIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZHVlRGF0ZScpO1xuICBjb25zdCBmbGF0RWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5mbGF0cGlja3InKTtcblxuICAvLyBhcHBseSBtYXNrIHRvIGR1ZURhdGVGaWVsZFxuICBjb25zdCBtYXNrID0gSU1hc2soZHVlRGF0ZSwgbWFza0RhdGUpO1xuXG4gIC8vIGFwcGx5IGZsYXRwaWNrciBkYXRlcGlja2VyIHRvIGFsbCBlbGVtZW50cyBpbiBhIGRpdlxuICAvLyAoaWNvbiB0b2dnbGUgYW5kIGlucHV0IGRhdGUgdXNpbmcgZGF0YS0gYXR0cmlidXRlcylcbiAgZmxhdHBpY2tyKGZsYXRFbGVtLCB7XG4gICAgZGF0ZUZvcm1hdDogJ2QvbS9ZJyxcbiAgICBkaXNhYmxlTW9iaWxlOiAndHJ1ZScsXG4gICAgYWxsb3dJbnB1dDogdHJ1ZSxcbiAgICB3cmFwOiB0cnVlLFxuICAgIGxvY2FsZTogUG9ydHVndWVzZSxcbiAgICBvbkNoYW5nZShzZWxlY3RlZERhdGVzLCBkYXRlU3RyKSB7XG4gICAgICBtYXNrLnVwZGF0ZVZhbHVlKGRhdGVTdHIpO1xuICAgIH0sXG4gIH0pO1xufVxuXG4vLyBtYWluIHNjcmVlbiBpbnRlcmFjdGlvbnNcblxuLy8gY2hlY2sgdmlzdWFsIGVmZmVjdFxuZXhwb3J0IGZ1bmN0aW9uIHNob3dQbHVzQnRuKCkge1xuICAvLyBFbmNvbnRyYSBvIGJvdMOjbyArXG4gIGNvbnN0IHBsdXNCdG4gPSBhZGRGaWVsZC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gIGNvbnN0IHNhdmVCdG4gPSBwbHVzQnRuLm5leHRFbGVtZW50U2libGluZztcbiAgLy8gU2UgbyB2YWxvciBkbyBjYW1wbyB0w610dWxvIGZvciBkaWZlcmVudGUgZGUgdmF6aW8sXG4gIC8vIGVudMOjbyBlbGUgcmV2ZWxhIG8gYm90w6NvICtcbiAgaWYgKGFkZEZpZWxkLnZhbHVlICE9PSAnJykge1xuICAgIHBsdXNCdG4uY2xhc3NMaXN0LmFkZCgncmV2ZWFsSXRlbScpO1xuICAgIHNhdmVCdG4uY2xhc3NMaXN0LmFkZCgncmV2ZWFsSXRlbScpO1xuICB9XG4gIC8vIGNhc28gY29udHLDoXJpbywgc2Ugdm9jw6ogYXBhZ2FyIHRvZG8gbyB0w610dWxvXG4gIC8vIGVsZSBkw6EgZGlzcGxheTogbm9uZSwgbm8gYm90w6NvICtcbiAgaWYgKGFkZEZpZWxkLnZhbHVlID09PSAnJyAmJiBwbHVzQnRuLmNsYXNzTGlzdC5jb250YWlucygncmV2ZWFsSXRlbScpKSB7XG4gICAgcGx1c0J0bi5jbGFzc0xpc3QucmVtb3ZlKCdyZXZlYWxJdGVtJyk7XG4gICAgc2F2ZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdyZXZlYWxJdGVtJyk7XG4gIH1cbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIGZpbmRQYXJlbnROb2RlKGVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUpIHtcbi8vICAgbGV0IHsgcGFyZW50Tm9kZSB9ID0gZWxlbWVudDtcbi8vICAgd2hpbGUgKHBhcmVudE5vZGUpIHtcbi8vICAgICBpZiAocGFyZW50Tm9kZS5oYXNBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSkpIHtcbi8vICAgICAgIHJldHVybiBwYXJlbnROb2RlO1xuLy8gICAgIH1cbi8vICAgICBwYXJlbnROb2RlID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuLy8gICB9XG4vLyAgIHJldHVybiBudWxsOyAvLyBSZXRvcm5hIG51bGwgc2UgbsOjbyBlbmNvbnRyb3UgbmVuaHVtIG7DsyBwYWkgY29tIG8gYXRyaWJ1dG8gZGVzZWphZG9cbi8vIH1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1jeWNsZSAqL1xuaW1wb3J0IHsgcG9wdWxhdGVTdG9yYWdlIH0gZnJvbSAnLi9KU09ORnVuY3Rpb25zJztcbmltcG9ydCB0b2RvTGlzdCBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IHVpRWRpdEl0ZW0gZnJvbSAnLi9lZGl0Q29uc3RydWN0b3InO1xuaW1wb3J0IGFkZExpbmUgZnJvbSAnLi9saXN0Q29uc3RydWN0b3InO1xuaW1wb3J0IHtcbiAgY2xlYXJDb250ZW50LCBsaXN0LCBzb3J0UGFyYW0sIGxvYWRMaXN0LCBjcmVhdGVFbGVtZW50LFxufSBmcm9tICcuL3VpQ29tbW9uRnVuY3Rpb25zJztcblxuY29uc3QgZGlzcGxheVByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd1bCNwcm9qZWN0cycpO1xuXG5jb25zdCBmaWx0ZXJQcm9qZWN0cyA9ICgpID0+IHRvZG9MaXN0LmdldFByb2plY3RzKClcbiAgLmZpbHRlcigodmFsdWUsIGluZGV4LCBzZWxmKSA9PiB2YWx1ZSAhPT0gJycgJiYgc2VsZi5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXgpO1xuXG4vLyBVSSBDb250cm9sbGVyXG5jb25zdCB1aUNvbnRyb2wgPSAoKCkgPT4ge1xuICBsZXQgY3VycmVudEZpbHRlciA9IG51bGw7XG5cbiAgZnVuY3Rpb24gc2V0Q3VycmVudEZpbHRlcihrZXksIHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBrZXkgIT09ICd1bmRlZmluZWQnKSBjdXJyZW50RmlsdGVyID0geyBrZXksIHZhbHVlIH07XG4gICAgZWxzZSBjdXJyZW50RmlsdGVyID0gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGZpbHRlckFycmF5ID0gKGFyciwgZmlsdGVyLCB2YWx1ZSkgPT4ge1xuICAgIGlmIChmaWx0ZXIpIHJldHVybiBbLi4uYXJyLmZpbHRlcigob2JqZXRvKSA9PiBvYmpldG9bZmlsdGVyXSA9PT0gdmFsdWUpXTtcbiAgICByZXR1cm4gYXJyO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGxvYWQoKSB7XG4gICAgLy8gYWRkIHByb2plY3QgbGlzdFxuICAgIGNvbnN0cnVjdG9yUHJvamVjdExpc3QoKTtcbiAgICBjb25zdCB1aUxpc3QgPSBzb3J0UGFyYW0obG9hZExpc3QoKSwgJ2NoZWNrZWQnKTtcbiAgICBpZiAoY3VycmVudEZpbHRlciAhPT0gbnVsbCkge1xuICAgICAgZmlsdGVyQXJyYXkodWlMaXN0LCBjdXJyZW50RmlsdGVyLmtleSwgY3VycmVudEZpbHRlci52YWx1ZSkuZm9yRWFjaChcbiAgICAgICAgKG9iaikgPT4ge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gbG9hZExpc3QoKS5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IG9iai5pZCk7XG4gICAgICAgICAgYWRkTGluZShvYmosIGluZGV4KTtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVpTGlzdC5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBsb2FkTGlzdCgpLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gb2JqLmlkKTtcbiAgICAgICAgYWRkTGluZShvYmosIGluZGV4KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZShmaWx0ZXIsIHZhbHVlKSB7XG4gICAgY2xlYXJDb250ZW50KGxpc3QpO1xuICAgIGNsZWFyQ29udGVudChkaXNwbGF5UHJvamVjdCk7XG4gICAgaWYgKHR5cGVvZiBmaWx0ZXIgIT09ICd1bmRlZmluZWQnKSBzZXRDdXJyZW50RmlsdGVyKGZpbHRlciwgdmFsdWUpO1xuICAgIGlmIChmaWx0ZXIgPT09ICdjbGVhcicpIHNldEN1cnJlbnRGaWx0ZXIoKTtcbiAgICBsb2FkKCk7XG4gICAgcG9wdWxhdGVTdG9yYWdlKCk7XG4gICAgY29uc29sZS53YXJuKCdVcGRhdGVkIScpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29uc3RydWN0b3JQcm9qZWN0TGlzdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0cyA9IGZpbHRlclByb2plY3RzKCk7XG4gICAgaWYgKHByb2plY3RzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgcHJvamVjdHMuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSBjcmVhdGVFbGVtZW50KCdsaScsIFsnZC1mbGV4JywgJ2FsaWduLWl0ZW1zLWNlbnRlciddKTtcbiAgICAgICAgY29uc3QgaWNvbkl0ZW0gPSBjcmVhdGVFbGVtZW50KCdpJywgWydiaScsICdiaS1oYXNoJywgJ2ZzLTQnXSk7XG4gICAgICAgIGNvbnN0IGxpbmsgPSBjcmVhdGVFbGVtZW50KCdhJywgW10sIHsgJ2RhdGEtdmFsdWUnOiB2YWx1ZSB9KTtcblxuICAgICAgICBsaW5rLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB1cGRhdGUoJ3Byb2plY3QnLCBsaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpKSk7XG5cbiAgICAgICAgbGlzdEl0ZW0uYXBwZW5kKGljb25JdGVtLCBsaW5rKTtcblxuICAgICAgICBkaXNwbGF5UHJvamVjdC5hcHBlbmRDaGlsZChsaXN0SXRlbSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgZGlzcGxheVByb2plY3QuaW5uZXJIVE1MID0gJzxsaSBjbGFzcz1cImQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXJcIj5ObyBwcm9qZWN0cyB5ZXQgOig8L2xpPic7XG4gIH1cblxuICBjb25zdCBoYW5kbGVycyA9ICgoKSA9PiB7XG4gICAgLy8gaG9tZSBidXR0b25zXG4gICAgZnVuY3Rpb24gZWRpdE1vcmUodGl0bGUpIHtcbiAgICAgIHVpRWRpdEl0ZW0odGl0bGUpO1xuICAgICAgdGl0bGUudmFsdWUgPSAnJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmYXN0U2F2ZSh0aXRsZSkge1xuICAgICAgY29uc3QgbmV3T2JqID0geyB0aXRsZTogdGl0bGUudmFsdWUgfTtcbiAgICAgIHRvZG9MaXN0LmFkZEl0ZW0obmV3T2JqKTtcbiAgICAgIHRpdGxlLnZhbHVlID0gJyc7XG4gICAgICB1cGRhdGUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlZGl0KGVsZW0pIHtcbiAgICAgIGVsZW0uc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICBjb25zdCB7IHRhcmdldCB9ID0gZWxlbTtcbiAgICAgIGNvbnN0IG9iaiA9IHRvZG9MaXN0LmdldEl0ZW0odGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpKTtcbiAgICAgIHVpRWRpdEl0ZW0oXG4gICAgICAgIG9iai50aXRsZSxcbiAgICAgICAgb2JqLmR1ZURhdGUsXG4gICAgICAgIG9iai5wcmlvcml0eSxcbiAgICAgICAgb2JqLnByb2plY3QsXG4gICAgICAgIG9iai5ub3RlcyxcbiAgICAgICAgb2JqLmlkLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxldGVJdGVtKGl0ZW0pIHtcbiAgICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBpdGVtO1xuICAgICAgdG9kb0xpc3QuZGVsZXRlSXRlbSh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJykpO1xuICAgICAgdXBkYXRlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGVkaXRNb3JlLFxuICAgICAgZmFzdFNhdmUsXG4gICAgICBlZGl0LFxuICAgICAgZGVsZXRlSXRlbSxcbiAgICB9O1xuICB9KSgpO1xuXG4gIHJldHVybiB7XG4gICAgaGFuZGxlcnMsXG4gICAgc2V0Q3VycmVudEZpbHRlcixcbiAgICBsb2FkLFxuICAgIHVwZGF0ZSxcbiAgfTtcbn0pKCk7XG5cbi8vIEFERC9FRElUIElURU1TXG5leHBvcnQgZGVmYXVsdCB1aUNvbnRyb2w7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rdG9kb19saXN0XCJdID0gc2VsZltcIndlYnBhY2tDaHVua3RvZG9fbGlzdFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiM3JkcGFydFwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oNzI3MykpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==