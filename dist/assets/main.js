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
function CreateItem(num, text, deadline = 0, priorityNum = 0, projectName = null, check = false) {
  const title = text;
  const dueDate = deadline;
  const project = projectName;
  const priority = priorityNum;
  const checked = check;
  const id = num.toString();
  const notes = [];

  const getTitle = () => title;
  const getPriority = () => priority;
  const getDueDate = () => dueDate;
  const getProject = () => project;
  const getCheck = () => checked;
  function addNote(val) { notes.push(val); }
  function deleteNote(pos) { notes.splice(pos, 1); }
  function editNote(pos, val) { notes[pos] = val; }
  const getAllNotes = () => notes;
  const getNote = (pos) => notes[pos];
  const getId = () => id;

  function updateItem(newValues) {
    const updatedValues = {
      title: (newValues.title !== undefined && newValues.title !== getTitle())
        ? newValues.title : getTitle(),
      dueDate: (newValues.dueDate !== undefined && newValues.dueDate !== getDueDate())
        ? newValues.dueDate : getDueDate(),
      project: (newValues.project !== undefined
        && newValues.project !== getProject())
        ? newValues.project : getProject(),
      priority: (newValues.priority !== undefined
        && newValues.priority !== getPriority())
        ? newValues.priority : getPriority(),
      checked: (newValues.checked !== undefined && newValues.checked !== getCheck())
        ? newValues.checked : getCheck(),
    };
    return CreateItem(
      getId(),
      updatedValues.title,
      updatedValues.dueDate,
      updatedValues.priority,
      updatedValues.project,
      updatedValues.checked,
    );
  }

  return {
    addNote,
    editNote,
    getNote,
    deleteNote,
    getAllNotes,
    getTitle,
    getDueDate,
    getProject,
    getPriority,
    getCheck,
    getId,
    updateItem,
  };
}

const todoList = (() => {
  const list = [];

  function findObjPos(idValue) {
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].getId() === idValue) return i;
    }
    throw Error('Object not found');
  }

  function returnObj(item) {
    const title = item.getTitle();
    const project = item.getProject();
    const dueDate = item.getDueDate();
    const priority = item.getPriority();
    const checked = item.getCheck();
    const notes = item.getAllNotes();
    const id = item.getId();

    return {
      id, title, project, dueDate, priority, checked, notes,
    };
  }
  const getItem = (id) => returnObj(list[findObjPos(id)]);
  const getLength = () => list.length;
  const allTasksList = () => list.map((obj) => (returnObj(obj)));
  function reset() { list.length = 0; }

  const getProjects = () => list.map((item) => item.getProject())
    .filter((value, pos, self) => value !== null && self.indexOf(value) === pos);

  function getBiggerId() {
    if (list.length === 0) return 0;
    const latestObj = list.reduce((max, obj) => (obj.getId() > max.getId() ? obj : max));
    return latestObj.getId();
  }

  function addItem(obj) {
    const id = getBiggerId() === 0 ? 0 : parseInt(getBiggerId(), 10) + 1;
    const newItem = CreateItem(id, obj.title, obj.dueDate, obj.priority, obj.project, obj.checked);
    list.push(newItem);
  }

  function editItem(objID, newObj) {
    const objToEdit = list[findObjPos(objID)];
    const result = objToEdit.updateItem(newObj);
    list[findObjPos(objID)] = result;
  }

  function setChecked(id) {
    const result = { checked: !list[findObjPos(id)].getCheck() };
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
    const uiList = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_4__.sortParam)((0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_4__.loadList)(), 'checked');
    if (currentFilter !== null) {
      filterArray(uiList, currentFilter.key, currentFilter.value)
        .forEach((obj) => {
          const index = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_4__.loadList)().findIndex((item) => item.id === obj.id);
          (0,_listConstructor__WEBPACK_IMPORTED_MODULE_3__["default"])(obj, index);
        });
    } else {
      uiList.forEach((obj) => {
        const index = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_4__.loadList)().findIndex((item) => item.id === obj.id);
        (0,_listConstructor__WEBPACK_IMPORTED_MODULE_3__["default"])(obj, index);
      });
    }
  }

  function update(filter, value) {
    (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_4__.clearContent)(_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_4__.list);
    if (typeof filter !== 'undefined') setCurrentFilter(filter, value);
    load();
    (0,_JSONFunctions__WEBPACK_IMPORTED_MODULE_0__.populateStorage)();
    console.warn('Updated!');
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
      (0,_editConstructor__WEBPACK_IMPORTED_MODULE_2__["default"])(obj.title, obj.dueDate, obj.priority, obj.project, obj.notes, obj.id);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9zdHlsZS5zY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvSlNPTkZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL2NvcmUuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9kYXRlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvZWRpdENvbnN0cnVjdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvbGlzdENvbnN0cnVjdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvc2NyaXB0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvdWlDb21tb25GdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy91aUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHRvZG9MaXN0IGZyb20gJy4vY29yZSc7XG4vLyBpbXBvcnQgYWRkTGluZSBmcm9tICcuL3VpTGlzdEdlbmVyYXRvcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBwb3B1bGF0ZVN0b3JhZ2UoKSB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXRhJywgdG9kb0xpc3QudG9KU09OKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzdG9yZVN0b3JhZ2UoKSB7XG4gIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGF0YScpID09PSBudWxsKSByZXR1cm47XG4gIHRvZG9MaXN0LnJlc3RvcmUobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhdGEnKSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25uZWN0KCkge1xuICBjb25zdCByZXF1ZXN0VVJMID0gJy4vYXNzZXRzL2RhdGEuanNvbic7XG4gIGNvbnN0IHJlcXVlc3QgPSBhd2FpdCBmZXRjaChyZXF1ZXN0VVJMKTtcbiAgaWYgKCFyZXF1ZXN0Lm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBIVFRQIGVycm9yISBTdGF0dXM6ICR7cmVxdWVzdC5zdGF0dXN9YCk7XG4gIH1cblxuICByZXR1cm4gcmVxdWVzdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBvcHVsYXRlKCkge1xuICBjb25zdCB2YWx1ZSA9IGF3YWl0IGNvbm5lY3QoKTtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGVzdCgpIHtcbiAgdG9kb0xpc3QucmVzdG9yZShwb3B1bGF0ZSgpKTtcbn1cbiIsImZ1bmN0aW9uIENyZWF0ZUl0ZW0obnVtLCB0ZXh0LCBkZWFkbGluZSA9IDAsIHByaW9yaXR5TnVtID0gMCwgcHJvamVjdE5hbWUgPSBudWxsLCBjaGVjayA9IGZhbHNlKSB7XG4gIGNvbnN0IHRpdGxlID0gdGV4dDtcbiAgY29uc3QgZHVlRGF0ZSA9IGRlYWRsaW5lO1xuICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdE5hbWU7XG4gIGNvbnN0IHByaW9yaXR5ID0gcHJpb3JpdHlOdW07XG4gIGNvbnN0IGNoZWNrZWQgPSBjaGVjaztcbiAgY29uc3QgaWQgPSBudW0udG9TdHJpbmcoKTtcbiAgY29uc3Qgbm90ZXMgPSBbXTtcblxuICBjb25zdCBnZXRUaXRsZSA9ICgpID0+IHRpdGxlO1xuICBjb25zdCBnZXRQcmlvcml0eSA9ICgpID0+IHByaW9yaXR5O1xuICBjb25zdCBnZXREdWVEYXRlID0gKCkgPT4gZHVlRGF0ZTtcbiAgY29uc3QgZ2V0UHJvamVjdCA9ICgpID0+IHByb2plY3Q7XG4gIGNvbnN0IGdldENoZWNrID0gKCkgPT4gY2hlY2tlZDtcbiAgZnVuY3Rpb24gYWRkTm90ZSh2YWwpIHsgbm90ZXMucHVzaCh2YWwpOyB9XG4gIGZ1bmN0aW9uIGRlbGV0ZU5vdGUocG9zKSB7IG5vdGVzLnNwbGljZShwb3MsIDEpOyB9XG4gIGZ1bmN0aW9uIGVkaXROb3RlKHBvcywgdmFsKSB7IG5vdGVzW3Bvc10gPSB2YWw7IH1cbiAgY29uc3QgZ2V0QWxsTm90ZXMgPSAoKSA9PiBub3RlcztcbiAgY29uc3QgZ2V0Tm90ZSA9IChwb3MpID0+IG5vdGVzW3Bvc107XG4gIGNvbnN0IGdldElkID0gKCkgPT4gaWQ7XG5cbiAgZnVuY3Rpb24gdXBkYXRlSXRlbShuZXdWYWx1ZXMpIHtcbiAgICBjb25zdCB1cGRhdGVkVmFsdWVzID0ge1xuICAgICAgdGl0bGU6IChuZXdWYWx1ZXMudGl0bGUgIT09IHVuZGVmaW5lZCAmJiBuZXdWYWx1ZXMudGl0bGUgIT09IGdldFRpdGxlKCkpXG4gICAgICAgID8gbmV3VmFsdWVzLnRpdGxlIDogZ2V0VGl0bGUoKSxcbiAgICAgIGR1ZURhdGU6IChuZXdWYWx1ZXMuZHVlRGF0ZSAhPT0gdW5kZWZpbmVkICYmIG5ld1ZhbHVlcy5kdWVEYXRlICE9PSBnZXREdWVEYXRlKCkpXG4gICAgICAgID8gbmV3VmFsdWVzLmR1ZURhdGUgOiBnZXREdWVEYXRlKCksXG4gICAgICBwcm9qZWN0OiAobmV3VmFsdWVzLnByb2plY3QgIT09IHVuZGVmaW5lZFxuICAgICAgICAmJiBuZXdWYWx1ZXMucHJvamVjdCAhPT0gZ2V0UHJvamVjdCgpKVxuICAgICAgICA/IG5ld1ZhbHVlcy5wcm9qZWN0IDogZ2V0UHJvamVjdCgpLFxuICAgICAgcHJpb3JpdHk6IChuZXdWYWx1ZXMucHJpb3JpdHkgIT09IHVuZGVmaW5lZFxuICAgICAgICAmJiBuZXdWYWx1ZXMucHJpb3JpdHkgIT09IGdldFByaW9yaXR5KCkpXG4gICAgICAgID8gbmV3VmFsdWVzLnByaW9yaXR5IDogZ2V0UHJpb3JpdHkoKSxcbiAgICAgIGNoZWNrZWQ6IChuZXdWYWx1ZXMuY2hlY2tlZCAhPT0gdW5kZWZpbmVkICYmIG5ld1ZhbHVlcy5jaGVja2VkICE9PSBnZXRDaGVjaygpKVxuICAgICAgICA/IG5ld1ZhbHVlcy5jaGVja2VkIDogZ2V0Q2hlY2soKSxcbiAgICB9O1xuICAgIHJldHVybiBDcmVhdGVJdGVtKFxuICAgICAgZ2V0SWQoKSxcbiAgICAgIHVwZGF0ZWRWYWx1ZXMudGl0bGUsXG4gICAgICB1cGRhdGVkVmFsdWVzLmR1ZURhdGUsXG4gICAgICB1cGRhdGVkVmFsdWVzLnByaW9yaXR5LFxuICAgICAgdXBkYXRlZFZhbHVlcy5wcm9qZWN0LFxuICAgICAgdXBkYXRlZFZhbHVlcy5jaGVja2VkLFxuICAgICk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGFkZE5vdGUsXG4gICAgZWRpdE5vdGUsXG4gICAgZ2V0Tm90ZSxcbiAgICBkZWxldGVOb3RlLFxuICAgIGdldEFsbE5vdGVzLFxuICAgIGdldFRpdGxlLFxuICAgIGdldER1ZURhdGUsXG4gICAgZ2V0UHJvamVjdCxcbiAgICBnZXRQcmlvcml0eSxcbiAgICBnZXRDaGVjayxcbiAgICBnZXRJZCxcbiAgICB1cGRhdGVJdGVtLFxuICB9O1xufVxuXG5jb25zdCB0b2RvTGlzdCA9ICgoKSA9PiB7XG4gIGNvbnN0IGxpc3QgPSBbXTtcblxuICBmdW5jdGlvbiBmaW5kT2JqUG9zKGlkVmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChsaXN0W2ldLmdldElkKCkgPT09IGlkVmFsdWUpIHJldHVybiBpO1xuICAgIH1cbiAgICB0aHJvdyBFcnJvcignT2JqZWN0IG5vdCBmb3VuZCcpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmV0dXJuT2JqKGl0ZW0pIHtcbiAgICBjb25zdCB0aXRsZSA9IGl0ZW0uZ2V0VGl0bGUoKTtcbiAgICBjb25zdCBwcm9qZWN0ID0gaXRlbS5nZXRQcm9qZWN0KCk7XG4gICAgY29uc3QgZHVlRGF0ZSA9IGl0ZW0uZ2V0RHVlRGF0ZSgpO1xuICAgIGNvbnN0IHByaW9yaXR5ID0gaXRlbS5nZXRQcmlvcml0eSgpO1xuICAgIGNvbnN0IGNoZWNrZWQgPSBpdGVtLmdldENoZWNrKCk7XG4gICAgY29uc3Qgbm90ZXMgPSBpdGVtLmdldEFsbE5vdGVzKCk7XG4gICAgY29uc3QgaWQgPSBpdGVtLmdldElkKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgaWQsIHRpdGxlLCBwcm9qZWN0LCBkdWVEYXRlLCBwcmlvcml0eSwgY2hlY2tlZCwgbm90ZXMsXG4gICAgfTtcbiAgfVxuICBjb25zdCBnZXRJdGVtID0gKGlkKSA9PiByZXR1cm5PYmoobGlzdFtmaW5kT2JqUG9zKGlkKV0pO1xuICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiBsaXN0Lmxlbmd0aDtcbiAgY29uc3QgYWxsVGFza3NMaXN0ID0gKCkgPT4gbGlzdC5tYXAoKG9iaikgPT4gKHJldHVybk9iaihvYmopKSk7XG4gIGZ1bmN0aW9uIHJlc2V0KCkgeyBsaXN0Lmxlbmd0aCA9IDA7IH1cblxuICBjb25zdCBnZXRQcm9qZWN0cyA9ICgpID0+IGxpc3QubWFwKChpdGVtKSA9PiBpdGVtLmdldFByb2plY3QoKSlcbiAgICAuZmlsdGVyKCh2YWx1ZSwgcG9zLCBzZWxmKSA9PiB2YWx1ZSAhPT0gbnVsbCAmJiBzZWxmLmluZGV4T2YodmFsdWUpID09PSBwb3MpO1xuXG4gIGZ1bmN0aW9uIGdldEJpZ2dlcklkKCkge1xuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkgcmV0dXJuIDA7XG4gICAgY29uc3QgbGF0ZXN0T2JqID0gbGlzdC5yZWR1Y2UoKG1heCwgb2JqKSA9PiAob2JqLmdldElkKCkgPiBtYXguZ2V0SWQoKSA/IG9iaiA6IG1heCkpO1xuICAgIHJldHVybiBsYXRlc3RPYmouZ2V0SWQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZEl0ZW0ob2JqKSB7XG4gICAgY29uc3QgaWQgPSBnZXRCaWdnZXJJZCgpID09PSAwID8gMCA6IHBhcnNlSW50KGdldEJpZ2dlcklkKCksIDEwKSArIDE7XG4gICAgY29uc3QgbmV3SXRlbSA9IENyZWF0ZUl0ZW0oaWQsIG9iai50aXRsZSwgb2JqLmR1ZURhdGUsIG9iai5wcmlvcml0eSwgb2JqLnByb2plY3QsIG9iai5jaGVja2VkKTtcbiAgICBsaXN0LnB1c2gobmV3SXRlbSk7XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0SXRlbShvYmpJRCwgbmV3T2JqKSB7XG4gICAgY29uc3Qgb2JqVG9FZGl0ID0gbGlzdFtmaW5kT2JqUG9zKG9iaklEKV07XG4gICAgY29uc3QgcmVzdWx0ID0gb2JqVG9FZGl0LnVwZGF0ZUl0ZW0obmV3T2JqKTtcbiAgICBsaXN0W2ZpbmRPYmpQb3Mob2JqSUQpXSA9IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldENoZWNrZWQoaWQpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7IGNoZWNrZWQ6ICFsaXN0W2ZpbmRPYmpQb3MoaWQpXS5nZXRDaGVjaygpIH07XG4gICAgZWRpdEl0ZW0oaWQsIHJlc3VsdCk7XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0Tm90ZShpZCwgcG9zLCB2YWwpIHtcbiAgICBsaXN0W2ZpbmRPYmpQb3MoaWQpXS5lZGl0Tm90ZShwb3MsIHZhbCk7XG4gIH1cbiAgZnVuY3Rpb24gYWRkTm90ZShpZCwgdmFsKSB7XG4gICAgbGlzdFtmaW5kT2JqUG9zKGlkKV0uYWRkTm90ZSh2YWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVsZXRlSXRlbShpZCkge1xuICAgIGxpc3Quc3BsaWNlKGZpbmRPYmpQb3MoaWQpLCAxKTtcbiAgfVxuXG4gIGNvbnN0IHRvSlNPTiA9ICgpID0+IEpTT04uc3RyaW5naWZ5KGxpc3QubWFwKChpdGVtKSA9PiByZXR1cm5PYmooaXRlbSkpLCAnJywgMSk7XG5cbiAgY29uc3QgcmVzdG9yZSA9IChkYXRhKSA9PiB7XG4gICAgcmVzZXQoKTtcbiAgICBKU09OLnBhcnNlKGRhdGEpLmZvckVhY2goXG4gICAgICAoe1xuICAgICAgICBpZCwgdGl0bGUsIHByb2plY3QsIGR1ZURhdGUsIHByaW9yaXR5LCBjaGVja2VkLCBub3RlcyxcbiAgICAgIH0pID0+IHtcbiAgICAgICAgY29uc3QgbmV3SXRlbSA9IENyZWF0ZUl0ZW0oaWQsIHRpdGxlLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCwgY2hlY2tlZCk7XG4gICAgICAgIG5vdGVzLmZvckVhY2goKG5vdGUpID0+IG5ld0l0ZW0uYWRkTm90ZShub3RlKSk7XG4gICAgICAgIGxpc3QucHVzaChuZXdJdGVtKTtcbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGdldExlbmd0aCxcbiAgICBhZGROb3RlLFxuICAgIGVkaXROb3RlLFxuICAgIGVkaXRJdGVtLFxuICAgIGFkZEl0ZW0sXG4gICAgZGVsZXRlSXRlbSxcbiAgICByZXN0b3JlLFxuICAgIHRvSlNPTixcbiAgICBzZXRDaGVja2VkLFxuICAgIGdldFByb2plY3RzLFxuICAgIHJlc2V0LFxuICAgIHJldHVybk9iaixcbiAgICBhbGxUYXNrc0xpc3QsXG4gICAgZ2V0SXRlbSxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHRvZG9MaXN0O1xuIiwiLy8gaW1wb3J0IHsgcHRCUiB9IGZyb20gJ2RhdGUtZm5zL2xvY2FsZSc7XG5pbXBvcnQgeyBmb3JtYXQgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgSU1hc2sgZnJvbSAnaW1hc2snO1xuXG5jb25zdCBzcGxpdFRvQ29kZSA9IChkYXRlKSA9PiBkYXRlLnNwbGl0KCcvJykucmV2ZXJzZSgpLmpvaW4oJy8nKS5yZXBsYWNlQWxsKCcvJywgJywgJyk7XG5leHBvcnQgY29uc3QgdG9JbnB1dCA9IChkYXRhKSA9PiBmb3JtYXQobmV3IERhdGUoc3BsaXRUb0NvZGUoZGF0YSkpLCAnZGQvTEwveXl5eScpO1xuLy8gY29uc3QgZ2V0RGF0YSA9IChhcnIpID0+IGFyci5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4vLyB9KTtcblxuZXhwb3J0IGNvbnN0IG1hc2tEYXRlID0ge1xuICBtYXNrOiAnZC9gbS9gWScsXG4gIGJsb2Nrczoge1xuICAgIGQ6IHtcbiAgICAgIG1hc2s6IElNYXNrLk1hc2tlZFJhbmdlLFxuICAgICAgcGxhY2Vob2xkZXJDaGFyOiAnZCcsXG4gICAgICBmcm9tOiAxLFxuICAgICAgdG86IDMxLFxuICAgICAgbWF4TGVuZ3RoOiAyLFxuICAgIH0sXG4gICAgbToge1xuICAgICAgbWFzazogSU1hc2suTWFza2VkUmFuZ2UsXG4gICAgICBwbGFjZWhvbGRlckNoYXI6ICdtJyxcbiAgICAgIGZyb206IDEsXG4gICAgICB0bzogMTIsXG4gICAgICBtYXhMZW5ndGg6IDIsXG4gICAgfSxcbiAgICBZOiB7XG4gICAgICBtYXNrOiBJTWFzay5NYXNrZWRSYW5nZSxcbiAgICAgIHBsYWNlaG9sZGVyQ2hhcjogJ2EnLFxuICAgICAgZnJvbTogMTAwMCxcbiAgICAgIHRvOiA5OTk5LFxuICAgIH0sXG4gIH0sXG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWN5Y2xlICovXG5pbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcbmltcG9ydCB7XG4gIGNyZWF0ZUVsZW1lbnQsIGNyZWF0ZVByaW9yaXR5U2VsZWN0LCBkdWVEYXRlTWFzaywgc2VhcmNoUHJvamVjdHMsXG59IGZyb20gJy4vdWlDb21tb25GdW5jdGlvbnMnO1xuaW1wb3J0IHVpQ29udHJvbCBmcm9tICcuL3VpQ29udHJvbGxlcic7XG5cbmZ1bmN0aW9uIHNhdmUodGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0LCBub3RlcywgaWQpIHtcbiAgY29uc3QgbmV3T2JqID0ge1xuICAgIHRpdGxlOiB0aXRsZS52YWx1ZSxcbiAgICBkdWVEYXRlOiBkdWVEYXRlLnZhbHVlLFxuICAgIHByaW9yaXR5OiBwcmlvcml0eS52YWx1ZSxcbiAgICBwcm9qZWN0OiBwcm9qZWN0LnZhbHVlLFxuICAgIG5vdGVzLFxuICB9O1xuICBpZiAoaWQgIT09IHVuZGVmaW5lZCkge1xuICAgIHRvZG9MaXN0LmVkaXRJdGVtKGlkLCBuZXdPYmopO1xuICB9IGVsc2Uge1xuICAgIHRvZG9MaXN0LmFkZEl0ZW0obmV3T2JqKTtcbiAgfVxuICB1aUNvbnRyb2wudXBkYXRlKCk7XG59XG5cbmZ1bmN0aW9uIHVpRWRpdEl0ZW0odGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0LCBub3RlcywgaWQpIHtcbiAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYubW9kYWwtYm9keScpO1xuICAvLyBjcmVhdGluZyBlbGVtZW50c1xuICBjb25zdCByb3cxID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnXSk7XG4gIGNvbnN0IHRpdGxlRGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydpbnB1dC1ncm91cCcsICdtYi0zJywgJ2dhcC0xJ10pO1xuICBjb25zdCB0aXRsZUlucHV0ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2Zvcm0tY29udHJvbCddLCB7XG4gICAgaWQ6ICdpdGVtVGl0bGUnLFxuICAgIHR5cGU6ICd0ZXh0JyxcbiAgICBwbGFjZWhvbGRlcjogJ05vdmEgVGFyZWZhLi4uJyxcbiAgfSk7XG4gIGNvbnN0IHJvdzIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2JnLWdyYXknLCAncm93JywgJ2ctMCcsICdnYXAtMicsICdmbGV4LW5vd3JhcCddKTtcblxuICBjb25zdCBkYXRlRGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydkYXRlJywgJ2ZsYXRwaWNrcicsICdjb2wnXSk7XG4gIGNvbnN0IGRhdGVJbnB1dCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgWydmb3JtLWNvbnRyb2wnLCAnZmxhdHBpY2tyLWlucHV0J10sIHtcbiAgICBpZDogJ2R1ZURhdGUnLFxuICAgIHR5cGU6ICd0ZXh0JyxcbiAgICBpbnB1dG1vZGU6ICdudW1lcmljJyxcbiAgICAnZGF0YS1pbnB1dCc6IHVuZGVmaW5lZCxcbiAgICBhdXRvY29tcGxldGU6ICdvZmYnLFxuICB9KTtcbiAgY29uc3QgZGF0ZXBpY2tlclRvZ2dsZSA9IGNyZWF0ZUVsZW1lbnQoJ2EnLCBbJ2lucHV0LWJ1dHRvbiddLCB7XG4gICAgdGl0bGU6ICd0b2dnbGUnLFxuICAgICdkYXRhLXRvZ2dsZSc6IHVuZGVmaW5lZCxcbiAgfSk7XG4gIGNvbnN0IGRhdGVJY29uID0gY3JlYXRlRWxlbWVudCgnaScsIFsndGV4dC13YXJuaW5nJywgJ3NtYWxsJywgJ2JpJywgJ2JpLWNhbGVuZGFyJ10pO1xuXG4gIGNvbnN0IHByaW9yaXR5RGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydjb2wnXSk7XG4gIGNvbnN0IHByaW9yaXR5U2VsZWN0ID0gY3JlYXRlUHJpb3JpdHlTZWxlY3QocHJpb3JpdHkpO1xuXG4gIGNvbnN0IHByb2plY3REaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbCddKTtcbiAgY29uc3QgcHJvamVjdElucHV0ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2Zvcm0tY29udHJvbCddLCB7XG4gICAgaWQ6ICdlbnRlclByb2plY3QnLFxuICAgIHR5cGU6ICd0ZXh0JyxcbiAgICBsaXN0OiAnZGF0YWxpc3RPcHRpb25zJyxcbiAgICBwbGFjZWhvbGRlcjogJ1Byb2pldG8nLFxuICAgIGF1dG9jb21wbGV0ZTogJ29mZicsXG4gIH0pO1xuICBjb25zdCBwcm9qZWN0RGF0YWxpc3QgPSBjcmVhdGVFbGVtZW50KCdkYXRhbGlzdCcsIFsnc3VnZ2VzdGlvbnMnLCAnZm9ybSddLCB7XG4gICAgaWQ6ICdkYXRhbGlzdE9wdGlvbnMnLFxuICAgIGRyb3B6b25lOiAnc3RyaW5nJyxcbiAgfSk7XG5cbiAgY29uc3Qgcm93MyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncm93JywgJ3B0LTInXSk7XG5cbiAgY29uc3Qgbm90ZXNDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbnRhaW5lciddKTtcbiAgY29uc3Qgbm90ZXNIZWFkZXIgPSBjcmVhdGVFbGVtZW50KCdoNicpO1xuICBjb25zdCBub3Rlc1JvdyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncm93JywgJ2ctMiddKTtcbiAgY29uc3Qgbm90ZXNMaXN0ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydub3Rlc0xpc3QnXSk7XG5cbiAgY29uc3QgYWRkTm90ZVJvdyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncm93JywgJ3B0LTInLCAnanVzdGlmeS1jb250ZW50LWVuZCddKTtcblxuICBjb25zdCBhZGROb3RlRGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydjb2wtYXV0bycsICdzbWFsbCcsICd0ZXh0LWRhbmdlcicsICd0ZXh0LXdhcm5pbmctZW1waGFzaXMnXSk7XG4gIGNvbnN0IGFkZE5vdGVMaW5rID0gY3JlYXRlRWxlbWVudCgnYScsIFtdLCB7IGlkOiAnYWRkTm90ZScgfSk7XG4gIGNvbnN0IGFkZE5vdGVJY29uID0gY3JlYXRlRWxlbWVudCgnaScsIFsnYmknLCAnYmktcGx1cy1jaXJjbGUnXSk7XG4gIGNvbnN0IGFkZE5vdGVUZXh0ID0gY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gIGNvbnN0IHJvdzQgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3JvdycsICdnLTInLCAncHQtMycsICdqdXN0aWZ5LWNvbnRlbnQtc3RhcnQnLCAnZmxleC1yb3ctcmV2ZXJzZSddKTtcblxuICBjb25zdCBzYXZlRGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydjb2wtYXV0byddKTtcbiAgY29uc3Qgc2F2ZUJ0biA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIFsnYnRuJywgJ2J0bi13YXJuaW5nJ10sIHtcbiAgICAnZGF0YS1icy1kaXNtaXNzJzogJ21vZGFsJyxcbiAgfSk7XG4gIGNvbnN0IGNhbmNlbERpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29sLWF1dG8nXSk7XG4gIGNvbnN0IGNhbmNlbEJ0biA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIFsnYnRuJywgJ2J0bi1zZWNvbmRhcnknLCAndGV4dC1saWdodCddLCB7XG4gICAgJ2RhdGEtYnMtZGlzbWlzcyc6ICdtb2RhbCcsXG4gIH0pO1xuXG4gIC8vIGFwcGVuZCBlbGVtZW50c1xuXG4gIC8vIHJvdyAxICh0aXRsZSlcbiAgaWYgKHRpdGxlICYmICh0eXBlb2YgdGl0bGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0aXRsZS52YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgdGl0bGVJbnB1dC52YWx1ZSA9IHR5cGVvZiB0aXRsZSA9PT0gJ3N0cmluZycgPyB0aXRsZSA6IHRpdGxlLnZhbHVlO1xuICB9XG4gIHRpdGxlRGl2LmFwcGVuZENoaWxkKHRpdGxlSW5wdXQpO1xuXG4gIHJvdzEuYXBwZW5kQ2hpbGQodGl0bGVEaXYpO1xuXG4gIC8vIHJvdyAyIChkYXRlLCBwcmlvcml0eSwgcHJvamVjdClcblxuICAvLyBkYXRlXG4gIGlmIChkdWVEYXRlICE9PSB1bmRlZmluZWQgJiYgZHVlRGF0ZSAhPT0gMCkge1xuICAgIGRhdGVJbnB1dC52YWx1ZSA9IGR1ZURhdGU7XG4gIH1cbiAgZGF0ZXBpY2tlclRvZ2dsZS5hcHBlbmRDaGlsZChkYXRlSWNvbik7XG4gIGRhdGVEaXYuYXBwZW5kKGRhdGVJbnB1dCwgZGF0ZXBpY2tlclRvZ2dsZSk7XG5cbiAgLy8gcHJpb3JpdHlcbiAgcHJpb3JpdHlEaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlTZWxlY3QpO1xuXG4gIC8vIHByb2plY3RcbiAgLy8gY29uc29sZS5sb2cocHJvamVjdCk7XG4gIGlmICh0eXBlb2YgcHJvamVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvamVjdCAhPT0gMCkgcHJvamVjdElucHV0LnZhbHVlID0gcHJvamVjdDtcbiAgcHJvamVjdERpdi5hcHBlbmQocHJvamVjdElucHV0LCBwcm9qZWN0RGF0YWxpc3QpO1xuXG4gIHJvdzIuYXBwZW5kKGRhdGVEaXYsIHByaW9yaXR5RGl2LCBwcm9qZWN0RGl2KTtcblxuICAvLyByb3czIChub3RlcyBhcmVhKVxuICBub3Rlc0hlYWRlci50ZXh0Q29udGVudCA9ICdOb3Rhcyc7XG4gIGFkZE5vdGVUZXh0LnRleHRDb250ZW50ID0gJ05vdmEgbm90YSc7XG4gIGFkZE5vdGVJY29uLnRleHRDb250ZW50ID0gJyAnOyAvLyBmaXhpbmcgYSBwcm9ibGVtIGZvciB1c2luZyBqc1xuXG4gIGFkZE5vdGVMaW5rLmFwcGVuZChhZGROb3RlSWNvbiwgYWRkTm90ZVRleHQpO1xuICBhZGROb3RlRGl2LmFwcGVuZENoaWxkKGFkZE5vdGVMaW5rKTtcbiAgYWRkTm90ZVJvdy5hcHBlbmRDaGlsZChhZGROb3RlRGl2KTtcbiAgaWYgKG5vdGVzKSB7XG4gICAgbm90ZXMuZm9yRWFjaCgobm90ZSkgPT4ge1xuICAgICAgLy8gcHJlY2lzbyBjaXJhciBvIGxheW91dCBkYXMgbm90YXNcbiAgICAgIG5vdGVzTGlzdC5pbm5lckhUTUwgKz0gYDxzcGFuPiR7bm90ZX08L3NwYW4+YDtcbiAgICB9KTtcbiAgfVxuICBub3Rlc1Jvdy5hcHBlbmQobm90ZXNMaXN0LCBhZGROb3RlUm93KTtcbiAgbm90ZXNDb250YWluZXIuYXBwZW5kKG5vdGVzSGVhZGVyLCBub3Rlc1Jvdyk7XG5cbiAgcm93My5hcHBlbmRDaGlsZChub3Rlc0NvbnRhaW5lcik7XG5cbiAgLy8gcm93NCAoYnV0dG9ucylcbiAgY2FuY2VsQnRuLnRleHRDb250ZW50ID0gJ0NhbmNlbCc7XG4gIHNhdmVCdG4udGV4dENvbnRlbnQgPSAnU2F2ZSc7XG4gIGlmIChpZCAhPT0gdW5kZWZpbmVkKSBzYXZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc2F2ZSh0aXRsZUlucHV0LCBkYXRlSW5wdXQsIHByaW9yaXR5U2VsZWN0LCBwcm9qZWN0SW5wdXQsIG5vdGVzLCBpZCkpO1xuICBlbHNlIHNhdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzYXZlKHRpdGxlSW5wdXQsIGRhdGVJbnB1dCwgcHJpb3JpdHlTZWxlY3QsIHByb2plY3RJbnB1dCkpO1xuICBzYXZlRGl2LmFwcGVuZENoaWxkKHNhdmVCdG4pO1xuICBjYW5jZWxEaXYuYXBwZW5kQ2hpbGQoY2FuY2VsQnRuKTtcblxuICByb3c0LmFwcGVuZChzYXZlRGl2LCBjYW5jZWxEaXYpO1xuXG4gIG1vZGFsLmFwcGVuZChyb3cxLCByb3cyLCByb3czLCByb3c0KTtcbiAgZHVlRGF0ZU1hc2soKTtcbiAgc2VhcmNoUHJvamVjdHMoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdWlFZGl0SXRlbTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1jeWNsZSAqL1xuaW1wb3J0IHRvZG9MaXN0IGZyb20gJy4vY29yZSc7XG5pbXBvcnQge1xuICBjcmVhdGVFbGVtZW50LCBoYXNOb3RlcywgaXNDaGVja2VkLCBsaXN0LFxufSBmcm9tICcuL3VpQ29tbW9uRnVuY3Rpb25zJztcbmltcG9ydCB1aUNvbnRyb2wgZnJvbSAnLi91aUNvbnRyb2xsZXInO1xuXG5mdW5jdGlvbiBpbnNlcnROb3RlKG5vdGVzLCBib2R5KSB7XG4gIG5vdGVzLmZvckVhY2goKGNvbnRlbnQpID0+IHtcbiAgICBjb25zdCBjb250ZW50RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29udGVudERpdi5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoY29udGVudERpdik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRDaGVja2VkKGNoZWNrYm94LCBidXR0b24sIHByaW9yaXR5KSB7XG4gIGNoZWNrYm94LmNoZWNrZWQgPSB0cnVlO1xuICBidXR0b24uY2xhc3NMaXN0LmFkZCgndGV4dC1kZWNvcmF0aW9uLWxpbmUtdGhyb3VnaCcsICdvcGFjaXR5LTUwJyk7XG4gIHByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ29wYWNpdHktNTAnKTtcbn1cblxuZnVuY3Rpb24gc2V0Q2hlY2tlZEhhbmRsZXIoZSkge1xuICBjb25zdCB7IHRhcmdldCB9ID0gZTtcbiAgY29uc3QgaWQgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XG4gIHRvZG9MaXN0LnNldENoZWNrZWQoaWQpO1xufVxuXG5jb25zdCBwcmlvcml0eVNldHRpbmdzID0ge1xuICAwOiB7IHRpdGxlOiAnTm8gcHJpb3JpdHknLCBhcnJheTogWydiaS1vY3RhZ29uJ10gfSxcbiAgMTogeyB0aXRsZTogJ1ByaW9yaXR5IDEnLCBhcnJheTogWydiaS1leGNsYW1hdGlvbi1vY3RhZ29uLWZpbGwnLCAndGV4dC1zdWNjZXNzJ10gfSxcbiAgMjogeyB0aXRsZTogJ1ByaW9yaXR5IDInLCBhcnJheTogWydiaS1leGNsYW1hdGlvbi1vY3RhZ29uLWZpbGwnLCAndGV4dC13YXJuaW5nJ10gfSxcbiAgMzogeyB0aXRsZTogJ1ByaW9yaXR5IDMnLCBhcnJheTogWydiaS1leGNsYW1hdGlvbi1vY3RhZ29uLWZpbGwnLCAndGV4dC1kYW5nZXInXSB9LFxufTtcblxuZnVuY3Rpb24gc2VsZWN0UHJpb3JpdHkobnVtKSB7XG4gIGNvbnN0IG9iaiA9IHByaW9yaXR5U2V0dGluZ3NbbnVtXTtcbiAgY29uc3Qgc3RhbmRhcmRDbGFzc2VzID0gWydzbWFsbCcsICdtcy0yJywgJ2JpJ107XG4gIGNvbnN0IGNsYXNzZXMgPSBzdGFuZGFyZENsYXNzZXMuY29uY2F0KG9iai5hcnJheSk7XG4gIGNvbnN0IGF0dHJzID0geyAnZGF0YS10b2dnbGUnOiAndG9vbHRpcCcsICdkYXRhLXBsYWNlbWVudCc6ICd0b3AnIH07XG4gIGF0dHJzLnRpdGxlID0gb2JqLnRpdGxlO1xuXG4gIHJldHVybiBjcmVhdGVFbGVtZW50KCdpJywgY2xhc3NlcywgYXR0cnMpO1xufVxuXG5mdW5jdGlvbiBhZGRMaW5lKG9iaikge1xuICAvLyBoZWFkZXJcbiAgY29uc3QgaXRlbSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnYWNjb3JkaW9uLWl0ZW0nXSk7XG4gIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnYWNjb3JkaW9uLWhlYWRlcicsICdwLTEnLCAnZC1mbGV4JywgJ2FsaWduLWl0ZW1zLWNlbnRlcicsICdnYXAtMSddKTtcbiAgY29uc3QgY2hlY2tib3ggPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIFsnZm9ybS1jaGVjay1pbnB1dCcsICd0ZXh0LWJnLXdhcm5pbmcnXSwge1xuICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgJ2RhdGEtaWQnOiBgJHtvYmouaWR9YCxcbiAgfSk7XG4gIGNvbnN0IGJ0bkhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIFsnYWNjb3JkaW9uLWJ1dHRvbicsICdjb2xsYXBzZWQnLCAnZmxleC1maWxsJ10sIHtcbiAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAnZGF0YS1icy10b2dnbGUnOiAnY29sbGFwc2UnLFxuICAgICdhcmlhLWV4cGFuZGVkJzogJ2ZhbHNlJyxcbiAgICAnZGF0YS1icy10YXJnZXQnOiBgI2l0ZW0tJHtvYmouaWR9YCxcbiAgfSk7XG4gIGNvbnN0IHByaW9yaXR5ID0gc2VsZWN0UHJpb3JpdHkob2JqLnByaW9yaXR5LCAxMCk7XG4gIGNvbnN0IHNwYW4gPSBjcmVhdGVFbGVtZW50KCdzcGFuJywgWydmbGV4LWZpbGwnXSk7XG4gIGNvbnN0IGNvZGUgPSBjcmVhdGVFbGVtZW50KCdjb2RlJywgWydzbWFsbCcsICd0ZXh0LW11dGVkJ10pO1xuXG4gIC8vIGJvZHlcbiAgY29uc3QgaXRlbURldGFpbHMgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2FjY29yZGlvbi1jb2xsYXBzZScsICdjb2xsYXBzZSddLCB7XG4gICAgaWQ6IGBpdGVtLSR7b2JqLmlkfWAsXG4gICAgJ2RhdGEtYnMtcGFyZW50JzogJyNsaXN0JyxcbiAgfSk7XG4gIGNvbnN0IGl0ZW1Cb2R5ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydhY2NvcmRpb24tYm9keSddKTtcbiAgY29uc3QgZWRpdERlbGV0ZUl0ZW0gPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2QtZmxleCcsICdmbGV4LXJvdy1yZXZlcnNlJywgJ2NvbCcsICdnYXAtMiddKTtcblxuICBjb25zdCBidG5FZGl0ID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgWydidG4nLCAnYnRuLXdhcm5pbmcnXSwge1xuICAgICdkYXRhLWlkJzogb2JqLmlkLFxuICAgICdkYXRhLWJzLXRhcmdldCc6ICcjZXhhbXBsZU1vZGFsJyxcbiAgICAnZGF0YS1icy10b2dnbGUnOiAnbW9kYWwnLFxuICB9KTtcbiAgY29uc3QgYnRuRGVsZXRlID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgWydidG4nLCAnYnRuLWRhbmdlciddLCB7XG4gICAgJ2RhdGEtaWQnOiBvYmouaWQsXG4gIH0pO1xuXG4gIC8vIEVWRU5UTElTVE5FUlMgT0JKRUNUU1xuICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBzZXRDaGVja2VkSGFuZGxlcik7XG5cbiAgLy8gRklMTElORyBDT05URU5UXG4gIC8vIGhlYWRlclxuICBzcGFuLnRleHRDb250ZW50ID0gb2JqLnRpdGxlO1xuICBjb2RlLnRleHRDb250ZW50ID0gb2JqLnByb2plY3Q7XG5cbiAgLy8gYm9keVxuICBidG5FZGl0LnRleHRDb250ZW50ID0gJ0VkaXQnO1xuICBidG5EZWxldGUudGV4dENvbnRlbnQgPSAnRGVsZXRlJztcblxuICAvLyBBcHBlbmRpbmcgY29udGVudFxuICBidG5IZWFkZXIuYXBwZW5kKHNwYW4sIGNvZGUpO1xuICBoZWFkZXIuYXBwZW5kKGNoZWNrYm94LCBwcmlvcml0eSwgYnRuSGVhZGVyKTtcblxuICAvLyBCb2R5IGNvbnRlbnRcbiAgaWYgKGhhc05vdGVzKG9iai5ub3RlcykpIHtcbiAgICBpbnNlcnROb3RlKG9iai5ub3RlcywgaXRlbUJvZHkpO1xuICB9XG4gIGJ0bkVkaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZWxlbSkgPT4ge1xuICAgIHVpQ29udHJvbC5oYW5kbGVycy5lZGl0KGVsZW0pO1xuICB9KTtcbiAgYnRuRGVsZXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdWlDb250cm9sLmhhbmRsZXJzLmRlbGV0ZUl0ZW0pO1xuICBlZGl0RGVsZXRlSXRlbS5hcHBlbmQoYnRuRGVsZXRlLCBidG5FZGl0KTtcbiAgaXRlbUJvZHkuYXBwZW5kQ2hpbGQoZWRpdERlbGV0ZUl0ZW0pO1xuICBpdGVtRGV0YWlscy5hcHBlbmRDaGlsZChpdGVtQm9keSk7XG5cbiAgLy8gQXBwZW5kIGVsZW1lbnRzIHRvIGxpc3RcbiAgaXRlbS5hcHBlbmQoaGVhZGVyLCBpdGVtRGV0YWlscyk7XG4gIGxpc3QuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gIGlmIChpc0NoZWNrZWQob2JqKSkgYWRkQ2hlY2tlZChjaGVja2JveCwgYnRuSGVhZGVyLCBwcmlvcml0eSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFkZExpbmU7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xuaW1wb3J0IHsgcmVzdG9yZVN0b3JhZ2UgfSBmcm9tICcuL0pTT05GdW5jdGlvbnMnO1xuXG5pbXBvcnQge1xuICBjbGVhckNvbnRlbnQsXG4gIHNob3dQbHVzQnRuLFxuICBhZGRGaWVsZCxcbiAgYWRkVGFzayxcbiAgaW5wdXQsXG4gIGFkZE1vcmUsXG4gIHF1aWNrU2F2ZSxcbiAgbGlzdCxcbn0gZnJvbSAnLi91aUNvbW1vbkZ1bmN0aW9ucyc7XG5pbXBvcnQgdWlFZGl0SXRlbSBmcm9tICcuL2VkaXRDb25zdHJ1Y3Rvcic7XG5pbXBvcnQgdWlDb250cm9sIGZyb20gJy4vdWlDb250cm9sbGVyJztcblxuY29uc3QgcHJvamVjdHNJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2I3Byb2plY3RzJyk7XG5jb25zdCBwcm9qZWN0c0Ryb3Bkb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2I3Byb2plY3RzIGRpdicpO1xuY29uc3QgbWFpbk1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2I2V4YW1wbGVNb2RhbCcpO1xuXG4vLyBzZXQgbWF4IGhlaWdodCBmb3IgbGlzdCBpdGVtc1xuZnVuY3Rpb24gc2V0TWF4SGVpZ2h0KCkge1xuICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAvLyBnZXQgcGFkZGluZyB0b3AgKyBib3R0b20gZm9ybSBtYWluIGVsZW1lbnRcbiAgICBsZXQgbWFpblBhZGRpbmcgPSBwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKSwgbnVsbClcbiAgICAgIC5nZXRQcm9wZXJ0eVZhbHVlKCdwYWRkaW5nLXRvcCcpLm1hdGNoKC9cXGQrKFxcLlxcZCspPy8pKTtcbiAgICBtYWluUGFkZGluZyArPSBwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKSwgbnVsbClcbiAgICAgIC5nZXRQcm9wZXJ0eVZhbHVlKCdwYWRkaW5nLWJvdHRvbScpLm1hdGNoKC9cXGQrKFxcLlxcZCspPy8pKTtcblxuICAgIC8vIGdldCBvdGhlciBlbGVtZW50cyBzaXplXG4gICAgY29uc3QgYm9keUhlaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5vZmZzZXRIZWlnaHQ7XG4gICAgY29uc3QgaW5zZXRJdGVtSGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbiA+IGRpdicpLm9mZnNldEhlaWdodDtcbiAgICBjb25zdCBoZWFkZXJIZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKS5vZmZzZXRIZWlnaHQ7XG4gICAgY29uc3QgYXNpZGVIZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhc2lkZScpLm9mZnNldEhlaWdodDtcbiAgICAvLyBjb25zdCBmb290ZXJIZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb290ZXInKS5vZmZzZXRIZWlnaHQ7XG5cbiAgICAvLyBzZXQgbWF4IHNpemUgZm9yIHRhc2sgbGlzdFxuICAgIGNvbnN0IG1heEhlaWdodCA9IGJvZHlIZWlnaHQgLSBoZWFkZXJIZWlnaHQgLSBpbnNldEl0ZW1IZWlnaHQgLSBhc2lkZUhlaWdodCAtIG1haW5QYWRkaW5nO1xuICAgIGxpc3Quc3R5bGUubWF4SGVpZ2h0ID0gYCR7bWF4SGVpZ2h0fXB4YDtcbiAgfSBlbHNlIGxpc3Quc3R5bGUubWF4SGVpZ2h0ID0gJ25vbmUnO1xufVxuXG4vLyBldmVudExpc3RlbmVyc1xuLy8gaG9tZSBwYWdlIGJ1dHRvbiBmdW5jdGlvbnNcbmFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1aUVkaXRJdGVtKTtcbmFkZEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBzaG93UGx1c0J0bik7XG5hZGRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHNob3dQbHVzQnRuKTtcbmFkZE1vcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB1aUNvbnRyb2wuaGFuZGxlcnMuZWRpdE1vcmUoaW5wdXQpKTtcbnF1aWNrU2F2ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHVpQ29udHJvbC5oYW5kbGVycy5mYXN0U2F2ZShpbnB1dCkpO1xuXG4vLyBzZXQgaGVpZ2h0IGxpbWl0IGZvciBsaXN0IGl0ZW1zXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHNldE1heEhlaWdodCk7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgc2V0TWF4SGVpZ2h0KTtcblxuLy8gYXV0by1zYXZlXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICB1aUNvbnRyb2wudXBkYXRlKCk7XG59KTtcblxuLy8gcmVzdG9yZSBkYXRhIHdoZW4gaXQncyBsb2FkZWRcbndpbmRvdy5vbmxvYWQgPSByZXN0b3JlU3RvcmFnZSgpO1xuXG4vLyBtZW51IGZvciBtb2JpbGUgdmVyc2lvblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgaWYgKCFldmVudC50YXJnZXQuY2xvc2VzdCgnI3Byb2plY3RzJykpIHtcbiAgICBwcm9qZWN0c0Ryb3Bkb3duLmNsYXNzTGlzdC5hZGQoJ21lbnUtaGlkZScpO1xuICB9XG59KTtcbnByb2plY3RzSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgaWYgKHByb2plY3RzRHJvcGRvd24uY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWhpZGUnKSkge1xuICAgIHByb2plY3RzRHJvcGRvd24uY2xhc3NMaXN0LnJlbW92ZSgnbWVudS1oaWRlJyk7XG4gIH0gZWxzZSB7XG4gICAgcHJvamVjdHNEcm9wZG93bi5jbGFzc0xpc3QuYWRkKCdtZW51LWhpZGUnKTtcbiAgfVxufSk7XG5cbi8vIGNsZWFyIG1vZGFsIGNvbnRlbnQgZXZlcnl0aW1lIGl0J3MgY2xvc2VkXG5tYWluTW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignaGlkZGVuLmJzLm1vZGFsJywgKCkgPT4ge1xuICBjbGVhckNvbnRlbnQobWFpbk1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1ib2R5JykpO1xufSk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBjb25zdCB0b29sdGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKTtcbiAgdG9vbHRpcHMuZm9yRWFjaCgodGlwKSA9PiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgdGlwID0gbmV3IGJvb3RzdHJhcC5Ub29sdGlwKHRpcCk7XG4gIH0pO1xufSwgZmFsc2UpO1xuXG4vLyBzdGFydCBhcHBcbnVpQ29udHJvbC5sb2FkKCk7XG4iLCJpbXBvcnQgZmxhdHBpY2tyIGZyb20gJ2ZsYXRwaWNrcic7XG5pbXBvcnQgeyBQb3J0dWd1ZXNlIH0gZnJvbSAnZmxhdHBpY2tyL2Rpc3QvbDEwbi9wdCc7XG5pbXBvcnQgSU1hc2sgZnJvbSAnaW1hc2snO1xuaW1wb3J0IHsgbWFza0RhdGUgfSBmcm9tICcuL2RhdGUnO1xuaW1wb3J0IHRvZG9MaXN0IGZyb20gJy4vY29yZSc7XG5cbmV4cG9ydCBjb25zdCBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2I2xpc3QnKTtcbmV4cG9ydCBjb25zdCBhZGRGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0I2l0ZW1UaXRsZScpO1xuZXhwb3J0IGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcbmV4cG9ydCBjb25zdCBhZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYSNhZGRJdGVtJyk7XG5leHBvcnQgY29uc3QgYWRkTW9yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbiNhZGRNb3JlJyk7XG5leHBvcnQgY29uc3QgcXVpY2tTYXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uI3NhdmVJdGVtJyk7XG5cbmV4cG9ydCBjb25zdCBpc0NoZWNrZWQgPSAoZSkgPT4gZS5jaGVja2VkID09PSB0cnVlO1xuZXhwb3J0IGNvbnN0IGhhc05vdGVzID0gKG9iaikgPT4gb2JqLmxlbmd0aCA+IDA7XG5leHBvcnQgY29uc3QgbG9hZExpc3QgPSAoKSA9PiBbLi4udG9kb0xpc3QuYWxsVGFza3NMaXN0KCldO1xuZXhwb3J0IGNvbnN0IHNvcnRQYXJhbSA9IChhcnIsIHBhcmFtKSA9PiBbLi4uYXJyXVxuICAuc29ydCgoYSwgYikgPT4gKChhW3BhcmFtXSA8IGJbcGFyYW1dKSA/IC0xIDogMSkpO1xuXG5jb25zdCBzcGVjaWFsQ2hhcnNFbnRyaWVzID0gW1xuICBbJ8OAw4HDgsODw4TDhScsICdBJ10sXG4gIFsnw6DDocOiw6PDpMOlJywgJ2EnXSxcbiAgWyfDiMOJw4rDiycsICdFJ10sXG4gIFsnw6jDqcOqw6snLCAnZSddLFxuICBbJ8OMw43DjsOPJywgJ0knXSxcbiAgWyfDrMOtw67DrycsICdpJ10sXG4gIFsnw5LDk8OVw5TDlicsICdPJ10sXG4gIFsnw7LDs8O1w7TDticsICdvJ10sXG4gIFsnw5nDmsObw5wnLCAnVSddLFxuICBbJ8O5w7rDu8O8JywgJ3UnXSxcbiAgWyfDhycsICdDJ10sXG4gIFsnw6cnLCAnYyddLFxuXTtcblxuY29uc3Qgc3BlY2lhbENoYXJzTWFwID0gT2JqZWN0LmZyb21FbnRyaWVzKFxuICBzcGVjaWFsQ2hhcnNFbnRyaWVzLmZsYXRNYXAoKFtjaGFycywgdmFsdWVdKSA9PiBbLi4uY2hhcnNdLm1hcCgoY2hhcikgPT4gW2NoYXIsIHZhbHVlXSkpLFxuKTtcblxuLy8gRUxFTUVOVCBDUkVBVE9SU1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0QXR0cnMoZWxlbSwgYXR0cnMpIHtcbiAgT2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZCAmJiBhdHRyc1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGtleSwgJycpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZywgY2xhc3NOYW1lcyA9IFtdLCBhdHRyaWJ1dGVzID0ge30pIHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgaWYgKGNsYXNzTmFtZXMubGVuZ3RoKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoLi4uY2xhc3NOYW1lcyk7XG4gIHNldEF0dHJzKGVsZW1lbnQsIGF0dHJpYnV0ZXMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU9wdGlvbih2YWx1ZSwgdGV4dCwgc2VsZWN0ZWQpIHtcbiAgY29uc3Qgb3B0aW9uID0gY3JlYXRlRWxlbWVudCgnb3B0aW9uJywgW10sIHsgdmFsdWUgfSk7XG4gIG9wdGlvbi50ZXh0Q29udGVudCA9IHRleHQ7XG4gIGlmIChzZWxlY3RlZCkge1xuICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJycpO1xuICB9XG4gIHJldHVybiBvcHRpb247XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcmlvcml0eVNlbGVjdChudW0gPSAwKSB7XG4gIGNvbnN0IHNlbGVjdCA9IGNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcsIFsnZm9ybS1zZWxlY3QnXSwge1xuICAgICdhcmlhLWxhYmVsJzogJ1ByaW9yaXR5JyxcbiAgfSk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSArPSAxKSB7XG4gICAgY29uc3QgdGV4dCA9IGkgPT09IDAgPyAnLS0gU2VsZWN0IFByaW9yaXR5JyA6IGBQcmlvcml0eSAke2l9YDtcbiAgICBjb25zdCBzZWxlY3RlZCA9IGkgPT09IHBhcnNlSW50KG51bSwgMTApO1xuICAgIGNvbnN0IG9wdGlvbiA9IGNyZWF0ZU9wdGlvbihpLCB0ZXh0LCBzZWxlY3RlZCk7XG4gICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gIH1cbiAgcmV0dXJuIHNlbGVjdDtcbn1cblxuLy8gVUkgRlVOQ1RJT05TXG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckNvbnRlbnQoZWxlbSkge1xuICB3aGlsZSAoZWxlbS5maXJzdENoaWxkKSB7XG4gICAgZWxlbS5yZW1vdmVDaGlsZChlbGVtLmxhc3RDaGlsZCk7XG4gIH1cbn1cblxuLy8gQUREL0VESVQgTkVXIFRBU0sgU0NSRUVOIEZVTkNUSU9OU1xuXG5mdW5jdGlvbiByZW1vdmVTcGVjaWFscyh0ZXh0KSB7XG4gIGxldCBzZWFyY2ggPSB0ZXh0O1xuICBzZWFyY2ggPSBzZWFyY2gucmVwbGFjZShcbiAgICAvW8OALcOcw6Atw7xdL2csXG4gICAgKG1hdGNoKSA9PiBzcGVjaWFsQ2hhcnNNYXBbbWF0Y2hdIHx8IG1hdGNoLFxuICApO1xuICByZXR1cm4gc2VhcmNoO1xufVxuLy8gcHJvamVjdHMgZGF0YWxpc3QgYXV0b2NvbXBsZXRlXG5mdW5jdGlvbiBhdXRvQ29tcGxldGUoc2VhcmNoKSB7XG4gIGNvbnN0IHByb2plY3RzID0gdG9kb0xpc3QuZ2V0UHJvamVjdHMoKTtcbiAgcmV0dXJuIHByb2plY3RzLmZpbHRlcigodmFsdWUpID0+IHtcbiAgICBjb25zdCB2YWx1ZUxvd2VyY2FzZSA9IHJlbW92ZVNwZWNpYWxzKHZhbHVlLnRvTG93ZXJDYXNlKCkpO1xuICAgIGNvbnN0IHNlYXJjaExvd2VyY2FzZSA9IHJlbW92ZVNwZWNpYWxzKHNlYXJjaC50b0xvd2VyQ2FzZSgpKTtcbiAgICByZXR1cm4gdmFsdWVMb3dlcmNhc2UuaW5jbHVkZXMoc2VhcmNoTG93ZXJjYXNlKTtcbiAgfSk7XG59XG5cbi8vIGNhbGxpbmcgZnVuY3Rpb25zIHRvIGF1dG9jb21wbGV0ZSBQcm9qZWN0IGZpZWxkXG5cbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hQcm9qZWN0cygpIHtcbiAgY29uc3QgaW5wdXRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VudGVyUHJvamVjdCcpO1xuICBjb25zdCBkYXRhbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RhdGFsaXN0Jyk7XG4gIGlucHV0UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICh7IHRhcmdldCB9KSA9PiB7XG4gICAgY29uc3QgaW5wdXREYXRhID0gdGFyZ2V0LnZhbHVlO1xuICAgIGlmIChpbnB1dERhdGEubGVuZ3RoKSB7XG4gICAgICBjb25zdCBhdXRvQ29tcGxldGVPcHRpb25zID0gYXV0b0NvbXBsZXRlKGlucHV0RGF0YSk7XG4gICAgICBkYXRhbGlzdC5pbm5lckhUTUwgPSBgJHthdXRvQ29tcGxldGVPcHRpb25zXG4gICAgICAgIC5tYXAoKHZhbHVlKSA9PiBgPG9wdGlvbiB2YWx1ZT1cIiR7dmFsdWV9XCIgLz5gKVxuICAgICAgICAuam9pbignJyl9YDtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBEQVRFUElDS0VSIEFORCBNQVNLIEZVTkNUSU9OU1xuZXhwb3J0IGZ1bmN0aW9uIGR1ZURhdGVNYXNrKCkge1xuICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2R1ZURhdGUnKTtcbiAgY29uc3QgZmxhdEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuZmxhdHBpY2tyJyk7XG5cbiAgLy8gYXBwbHkgbWFzayB0byBkdWVEYXRlRmllbGRcbiAgY29uc3QgbWFzayA9IElNYXNrKGR1ZURhdGUsIG1hc2tEYXRlKTtcblxuICAvLyBhcHBseSBmbGF0cGlja3IgZGF0ZXBpY2tlciB0byBhbGwgZWxlbWVudHMgaW4gYSBkaXZcbiAgLy8gKGljb24gdG9nZ2xlIGFuZCBpbnB1dCBkYXRlIHVzaW5nIGRhdGEtIGF0dHJpYnV0ZXMpXG4gIGZsYXRwaWNrcihmbGF0RWxlbSwge1xuICAgIGRhdGVGb3JtYXQ6ICdkL20vWScsXG4gICAgZGlzYWJsZU1vYmlsZTogJ3RydWUnLFxuICAgIGFsbG93SW5wdXQ6IHRydWUsXG4gICAgd3JhcDogdHJ1ZSxcbiAgICBsb2NhbGU6IFBvcnR1Z3Vlc2UsXG4gICAgb25DaGFuZ2Uoc2VsZWN0ZWREYXRlcywgZGF0ZVN0cikge1xuICAgICAgbWFzay51cGRhdGVWYWx1ZShkYXRlU3RyKTtcbiAgICB9LFxuICB9KTtcbn1cblxuLy8gbWFpbiBzY3JlZW4gaW50ZXJhY3Rpb25zXG4vLyBjaGVjayB2aXN1YWwgZWZmZWN0XG5leHBvcnQgZnVuY3Rpb24gc2hvd1BsdXNCdG4oKSB7XG4gIC8vIEVuY29udHJhIG8gYm90w6NvICtcbiAgY29uc3QgcGx1c0J0biA9IGFkZEZpZWxkLm5leHRFbGVtZW50U2libGluZztcbiAgY29uc3Qgc2F2ZUJ0biA9IHBsdXNCdG4ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAvLyBTZSBvIHZhbG9yIGRvIGNhbXBvIHTDrXR1bG8gZm9yIGRpZmVyZW50ZSBkZSB2YXppbyxcbiAgLy8gZW50w6NvIGVsZSByZXZlbGEgbyBib3TDo28gK1xuICBpZiAoYWRkRmllbGQudmFsdWUgIT09ICcnKSB7XG4gICAgcGx1c0J0bi5jbGFzc0xpc3QuYWRkKCdyZXZlYWxJdGVtJyk7XG4gICAgc2F2ZUJ0bi5jbGFzc0xpc3QuYWRkKCdyZXZlYWxJdGVtJyk7XG4gIH1cbiAgLy8gY2FzbyBjb250csOhcmlvLCBzZSB2b2PDqiBhcGFnYXIgdG9kbyBvIHTDrXR1bG9cbiAgLy8gZWxlIGTDoSBkaXNwbGF5OiBub25lLCBubyBib3TDo28gK1xuICBpZiAoYWRkRmllbGQudmFsdWUgPT09ICcnICYmIHBsdXNCdG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdyZXZlYWxJdGVtJykpIHtcbiAgICBwbHVzQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3JldmVhbEl0ZW0nKTtcbiAgICBzYXZlQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3JldmVhbEl0ZW0nKTtcbiAgfVxufVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gZmluZFBhcmVudE5vZGUoZWxlbWVudCwgYXR0cmlidXRlTmFtZSkge1xuLy8gICBsZXQgeyBwYXJlbnROb2RlIH0gPSBlbGVtZW50O1xuLy8gICB3aGlsZSAocGFyZW50Tm9kZSkge1xuLy8gICAgIGlmIChwYXJlbnROb2RlLmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKSkge1xuLy8gICAgICAgcmV0dXJuIHBhcmVudE5vZGU7XG4vLyAgICAgfVxuLy8gICAgIHBhcmVudE5vZGUgPSBwYXJlbnROb2RlLnBhcmVudE5vZGU7XG4vLyAgIH1cbi8vICAgcmV0dXJuIG51bGw7IC8vIFJldG9ybmEgbnVsbCBzZSBuw6NvIGVuY29udHJvdSBuZW5odW0gbsOzIHBhaSBjb20gbyBhdHJpYnV0byBkZXNlamFkb1xuLy8gfVxuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWN5Y2xlICovXG5pbXBvcnQgeyBwb3B1bGF0ZVN0b3JhZ2UgfSBmcm9tICcuL0pTT05GdW5jdGlvbnMnO1xuaW1wb3J0IHRvZG9MaXN0IGZyb20gJy4vY29yZSc7XG5pbXBvcnQgdWlFZGl0SXRlbSBmcm9tICcuL2VkaXRDb25zdHJ1Y3Rvcic7XG5pbXBvcnQgYWRkTGluZSBmcm9tICcuL2xpc3RDb25zdHJ1Y3Rvcic7XG5pbXBvcnQge1xuICBjbGVhckNvbnRlbnQsXG4gIGxpc3QsXG4gIHNvcnRQYXJhbSxcbiAgbG9hZExpc3QsXG59IGZyb20gJy4vdWlDb21tb25GdW5jdGlvbnMnO1xuXG4vLyBVSSBDb250cm9sbGVyXG5cbmNvbnN0IHVpQ29udHJvbCA9ICgoKSA9PiB7XG4gIGxldCBjdXJyZW50RmlsdGVyID0gbnVsbDtcblxuICBmdW5jdGlvbiBzZXRDdXJyZW50RmlsdGVyKGtleSwgdmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3VuZGVmaW5lZCcpIGN1cnJlbnRGaWx0ZXIgPSB7IGtleSwgdmFsdWUgfTtcbiAgICBlbHNlIGN1cnJlbnRGaWx0ZXIgPSBudWxsO1xuICB9XG5cbiAgY29uc3QgZmlsdGVyQXJyYXkgPSAoYXJyLCBmaWx0ZXIsIHZhbHVlKSA9PiB7XG4gICAgaWYgKGZpbHRlcikgcmV0dXJuIFsuLi5hcnIuZmlsdGVyKChvYmpldG8pID0+IG9iamV0b1tmaWx0ZXJdID09PSB2YWx1ZSldO1xuICAgIHJldHVybiBhcnI7XG4gIH07XG5cbiAgZnVuY3Rpb24gbG9hZCgpIHtcbiAgICBjb25zdCB1aUxpc3QgPSBzb3J0UGFyYW0obG9hZExpc3QoKSwgJ2NoZWNrZWQnKTtcbiAgICBpZiAoY3VycmVudEZpbHRlciAhPT0gbnVsbCkge1xuICAgICAgZmlsdGVyQXJyYXkodWlMaXN0LCBjdXJyZW50RmlsdGVyLmtleSwgY3VycmVudEZpbHRlci52YWx1ZSlcbiAgICAgICAgLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gbG9hZExpc3QoKS5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IG9iai5pZCk7XG4gICAgICAgICAgYWRkTGluZShvYmosIGluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVpTGlzdC5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBsb2FkTGlzdCgpLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gb2JqLmlkKTtcbiAgICAgICAgYWRkTGluZShvYmosIGluZGV4KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZShmaWx0ZXIsIHZhbHVlKSB7XG4gICAgY2xlYXJDb250ZW50KGxpc3QpO1xuICAgIGlmICh0eXBlb2YgZmlsdGVyICE9PSAndW5kZWZpbmVkJykgc2V0Q3VycmVudEZpbHRlcihmaWx0ZXIsIHZhbHVlKTtcbiAgICBsb2FkKCk7XG4gICAgcG9wdWxhdGVTdG9yYWdlKCk7XG4gICAgY29uc29sZS53YXJuKCdVcGRhdGVkIScpO1xuICB9XG5cbiAgY29uc3QgaGFuZGxlcnMgPSAoKCkgPT4ge1xuICAgIC8vIGhvbWUgYnV0dG9uc1xuICAgIGZ1bmN0aW9uIGVkaXRNb3JlKHRpdGxlKSB7XG4gICAgICB1aUVkaXRJdGVtKHRpdGxlKTtcbiAgICAgIHRpdGxlLnZhbHVlID0gJyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmFzdFNhdmUodGl0bGUpIHtcbiAgICAgIGNvbnN0IG5ld09iaiA9IHsgdGl0bGU6IHRpdGxlLnZhbHVlIH07XG4gICAgICB0b2RvTGlzdC5hZGRJdGVtKG5ld09iaik7XG4gICAgICB0aXRsZS52YWx1ZSA9ICcnO1xuICAgICAgdXBkYXRlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZWRpdChlbGVtKSB7XG4gICAgICBlbGVtLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGVsZW07XG4gICAgICBjb25zdCBvYmogPSB0b2RvTGlzdC5nZXRJdGVtKHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSk7XG4gICAgICB1aUVkaXRJdGVtKG9iai50aXRsZSwgb2JqLmR1ZURhdGUsIG9iai5wcmlvcml0eSwgb2JqLnByb2plY3QsIG9iai5ub3Rlcywgb2JqLmlkKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxldGVJdGVtKGl0ZW0pIHtcbiAgICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBpdGVtO1xuICAgICAgdG9kb0xpc3QuZGVsZXRlSXRlbSh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJykpO1xuICAgICAgdXBkYXRlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGVkaXRNb3JlLFxuICAgICAgZmFzdFNhdmUsXG4gICAgICBlZGl0LFxuICAgICAgZGVsZXRlSXRlbSxcbiAgICB9O1xuICB9KSgpO1xuXG4gIHJldHVybiB7XG4gICAgaGFuZGxlcnMsXG4gICAgc2V0Q3VycmVudEZpbHRlcixcbiAgICBsb2FkLFxuICAgIHVwZGF0ZSxcbiAgfTtcbn0pKCk7XG5cbi8vIEFERC9FRElUIElURU1TXG5leHBvcnQgZGVmYXVsdCB1aUNvbnRyb2w7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rdG9kb19saXN0XCJdID0gc2VsZltcIndlYnBhY2tDaHVua3RvZG9fbGlzdFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiM3JkcGFydFwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oNzI3MykpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==