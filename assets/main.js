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
function CreateItem(num, text, deadline = 0, priorityNum = 0, project = null, check = false) {
  let title = text;
  let dueDate = deadline;
  let projectName = project;
  let priority = priorityNum;
  let checked = check;
  const id = num.toString();
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
  function setChecked(id) { list[findObjPos(id)].editCheck(); }
  const allTasksList = () => list.map((obj) => (returnObj(obj)));
  function reset() { list.length = 0; }

  const getProjects = () => list.map((item) => item.getProject())
    .filter((value, pos, self) => value !== null && self.indexOf(value) === pos);

  function getBiggerId() {
    if (list.length === 0) return 0;
    const latestObj = list.reduce((max, obj) => (obj.getId() > max.getId() ? obj : max));
    console.log(latestObj.getId());
    return latestObj.getId();
  }

  function addItem(obj) {
    const id = getBiggerId() === 0 ? 0 : parseInt(getBiggerId(), 10) + 1;
    const newItem = CreateItem(id, obj.title, obj.dueDate, obj.priority, obj.project, obj.checked);
    list.push(newItem);
  }

  function editItem(objID, newObj) {
    const objToEdit = list[findObjPos(objID)];
    const item = returnObj(objToEdit);
    Object.keys(newObj).forEach((key) => {
      if (item[key] !== undefined && item[key] !== newObj[key]) {
        switch (key) {
          case 'title':
            objToEdit.editTitle(newObj[key]);
            break;
          case 'project':
            objToEdit.editProject(newObj[key]);
            break;
          case 'dueDate':
            objToEdit.editDueDate(newObj[key]);
            break;
          case 'priority':
            objToEdit.editPriority(newObj[key]);
            break;
          default:
            throw Error('Chave inválida');
        }
      }
    });
  }

  function editNote(id, pos, val) {
    list[findObjPos(id)].editNote(pos, val);
  }

  function deleteItem(id) {
    list.splice(findObjPos(id), 1);
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
        const newItem = CreateItem(id, title, dueDate, priority, project, checked);
        notes.forEach((note) => newItem.addNote(note));
        list.push(newItem);
      },
    );
  };

  return {
    getLength,
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
  const priority = selectPriority(parseInt(obj.priority, 10));
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
  if ((0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.isChecked)(obj)) (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.addChecked)(checkbox, btnHeader);
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
/* harmony export */   addChecked: () => (/* binding */ addChecked),
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

function addChecked(checkbox, button) {
  checkbox.checked = true;
  button.classList.add('text-decoration-line-through');
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9zdHlsZS5zY3NzPzNjNTUiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9KU09ORnVuY3Rpb25zLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvY29yZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL2RhdGUuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9lZGl0Q29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9saXN0Q29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9zY3JpcHQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy91aUNvbW1vbkZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL3VpQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcbi8vIGltcG9ydCBhZGRMaW5lIGZyb20gJy4vdWlMaXN0R2VuZXJhdG9yJztcblxuZXhwb3J0IGZ1bmN0aW9uIHBvcHVsYXRlU3RvcmFnZSgpIHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhdGEnLCB0b2RvTGlzdC50b0pTT04oKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXN0b3JlU3RvcmFnZSgpIHtcbiAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXRhJykgPT09IG51bGwpIHJldHVybjtcbiAgdG9kb0xpc3QucmVzdG9yZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGF0YScpKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbm5lY3QoKSB7XG4gIGNvbnN0IHJlcXVlc3RVUkwgPSAnLi9hc3NldHMvZGF0YS5qc29uJztcbiAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IGZldGNoKHJlcXVlc3RVUkwpO1xuICBpZiAoIXJlcXVlc3Qub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIFN0YXR1czogJHtyZXF1ZXN0LnN0YXR1c31gKTtcbiAgfVxuXG4gIHJldHVybiByZXF1ZXN0O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcG9wdWxhdGUoKSB7XG4gIGNvbnN0IHZhbHVlID0gYXdhaXQgY29ubmVjdCgpO1xuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0KCkge1xuICB0b2RvTGlzdC5yZXN0b3JlKHBvcHVsYXRlKCkpO1xufVxuIiwiZnVuY3Rpb24gQ3JlYXRlSXRlbShudW0sIHRleHQsIGRlYWRsaW5lID0gMCwgcHJpb3JpdHlOdW0gPSAwLCBwcm9qZWN0ID0gbnVsbCwgY2hlY2sgPSBmYWxzZSkge1xuICBsZXQgdGl0bGUgPSB0ZXh0O1xuICBsZXQgZHVlRGF0ZSA9IGRlYWRsaW5lO1xuICBsZXQgcHJvamVjdE5hbWUgPSBwcm9qZWN0O1xuICBsZXQgcHJpb3JpdHkgPSBwcmlvcml0eU51bTtcbiAgbGV0IGNoZWNrZWQgPSBjaGVjaztcbiAgY29uc3QgaWQgPSBudW0udG9TdHJpbmcoKTtcbiAgY29uc3Qgbm90ZXMgPSBbXTtcblxuICBmdW5jdGlvbiBlZGl0VGl0bGUodmFsKSB7IHRpdGxlID0gdmFsOyB9XG4gIGNvbnN0IGdldFRpdGxlID0gKCkgPT4gdGl0bGU7XG4gIGZ1bmN0aW9uIGVkaXRQcmlvcml0eSh2YWwpIHsgcHJpb3JpdHkgPSB2YWw7IH1cbiAgY29uc3QgZ2V0UHJpb3JpdHkgPSAoKSA9PiBwcmlvcml0eTtcbiAgZnVuY3Rpb24gZGVsZXRlRHVvRGF0ZSgpIHsgZHVlRGF0ZSA9IDA7IH1cbiAgZnVuY3Rpb24gZWRpdER1ZURhdGUodmFsKSB7IGR1ZURhdGUgPSB2YWw7IH1cbiAgY29uc3QgZ2V0RHVlRGF0ZSA9ICgpID0+IGR1ZURhdGU7XG4gIGZ1bmN0aW9uIGVkaXRQcm9qZWN0KHZhbCkgeyBwcm9qZWN0TmFtZSA9IHZhbDsgfVxuICBjb25zdCBnZXRQcm9qZWN0ID0gKCkgPT4gcHJvamVjdE5hbWU7XG4gIGZ1bmN0aW9uIGVkaXRDaGVjaygpIHsgY2hlY2tlZCA9ICFjaGVja2VkOyB9XG4gIGNvbnN0IGdldENoZWNrID0gKCkgPT4gY2hlY2tlZDtcbiAgZnVuY3Rpb24gYWRkTm90ZSh2YWwpIHsgbm90ZXMucHVzaCh2YWwpOyB9XG4gIGZ1bmN0aW9uIGRlbGV0ZU5vdGUocG9zKSB7IG5vdGVzLnNwbGljZShwb3MsIDEpOyB9XG4gIGZ1bmN0aW9uIGVkaXROb3RlKHBvcywgdmFsKSB7IG5vdGVzW3Bvc10gPSB2YWw7IH1cbiAgY29uc3QgZ2V0QWxsTm90ZXMgPSAoKSA9PiBub3RlcztcbiAgY29uc3QgZ2V0Tm90ZSA9IChwb3MpID0+IG5vdGVzW3Bvc107XG4gIGNvbnN0IGdldElkID0gKCkgPT4gaWQ7XG5cbiAgcmV0dXJuIHtcbiAgICBhZGROb3RlLFxuICAgIGVkaXROb3RlLFxuICAgIGdldE5vdGUsXG4gICAgZGVsZXRlTm90ZSxcbiAgICBnZXRBbGxOb3RlcyxcblxuICAgIGVkaXRUaXRsZSxcbiAgICBnZXRUaXRsZSxcblxuICAgIGVkaXREdWVEYXRlLFxuICAgIGRlbGV0ZUR1b0RhdGUsXG4gICAgZ2V0RHVlRGF0ZSxcblxuICAgIGVkaXRQcm9qZWN0LFxuICAgIGdldFByb2plY3QsXG5cbiAgICBlZGl0UHJpb3JpdHksXG4gICAgZ2V0UHJpb3JpdHksXG5cbiAgICBlZGl0Q2hlY2ssXG4gICAgZ2V0Q2hlY2ssXG5cbiAgICBnZXRJZCxcbiAgfTtcbn1cblxuY29uc3QgdG9kb0xpc3QgPSAoKCkgPT4ge1xuICBjb25zdCBsaXN0ID0gW107XG5cbiAgZnVuY3Rpb24gZmluZE9ialBvcyhpZFZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAobGlzdFtpXS5nZXRJZCgpID09PSBpZFZhbHVlKSByZXR1cm4gaTtcbiAgICB9XG4gICAgdGhyb3cgRXJyb3IoJ09iamVjdCBub3QgZm91bmQnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJldHVybk9iaihpdGVtKSB7XG4gICAgY29uc3QgdGl0bGUgPSBpdGVtLmdldFRpdGxlKCk7XG4gICAgY29uc3QgcHJvamVjdCA9IGl0ZW0uZ2V0UHJvamVjdCgpO1xuICAgIGNvbnN0IGR1ZURhdGUgPSBpdGVtLmdldER1ZURhdGUoKTtcbiAgICBjb25zdCBwcmlvcml0eSA9IGl0ZW0uZ2V0UHJpb3JpdHkoKTtcbiAgICBjb25zdCBjaGVja2VkID0gaXRlbS5nZXRDaGVjaygpO1xuICAgIGNvbnN0IG5vdGVzID0gaXRlbS5nZXRBbGxOb3RlcygpO1xuICAgIGNvbnN0IGlkID0gaXRlbS5nZXRJZCgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkLCB0aXRsZSwgcHJvamVjdCwgZHVlRGF0ZSwgcHJpb3JpdHksIGNoZWNrZWQsIG5vdGVzLFxuICAgIH07XG4gIH1cbiAgY29uc3QgZ2V0SXRlbSA9IChpZCkgPT4gcmV0dXJuT2JqKGxpc3RbZmluZE9ialBvcyhpZCldKTtcbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGlzdC5sZW5ndGg7XG4gIGZ1bmN0aW9uIHNldENoZWNrZWQoaWQpIHsgbGlzdFtmaW5kT2JqUG9zKGlkKV0uZWRpdENoZWNrKCk7IH1cbiAgY29uc3QgYWxsVGFza3NMaXN0ID0gKCkgPT4gbGlzdC5tYXAoKG9iaikgPT4gKHJldHVybk9iaihvYmopKSk7XG4gIGZ1bmN0aW9uIHJlc2V0KCkgeyBsaXN0Lmxlbmd0aCA9IDA7IH1cblxuICBjb25zdCBnZXRQcm9qZWN0cyA9ICgpID0+IGxpc3QubWFwKChpdGVtKSA9PiBpdGVtLmdldFByb2plY3QoKSlcbiAgICAuZmlsdGVyKCh2YWx1ZSwgcG9zLCBzZWxmKSA9PiB2YWx1ZSAhPT0gbnVsbCAmJiBzZWxmLmluZGV4T2YodmFsdWUpID09PSBwb3MpO1xuXG4gIGZ1bmN0aW9uIGdldEJpZ2dlcklkKCkge1xuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkgcmV0dXJuIDA7XG4gICAgY29uc3QgbGF0ZXN0T2JqID0gbGlzdC5yZWR1Y2UoKG1heCwgb2JqKSA9PiAob2JqLmdldElkKCkgPiBtYXguZ2V0SWQoKSA/IG9iaiA6IG1heCkpO1xuICAgIGNvbnNvbGUubG9nKGxhdGVzdE9iai5nZXRJZCgpKTtcbiAgICByZXR1cm4gbGF0ZXN0T2JqLmdldElkKCk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRJdGVtKG9iaikge1xuICAgIGNvbnN0IGlkID0gZ2V0QmlnZ2VySWQoKSA9PT0gMCA/IDAgOiBwYXJzZUludChnZXRCaWdnZXJJZCgpLCAxMCkgKyAxO1xuICAgIGNvbnN0IG5ld0l0ZW0gPSBDcmVhdGVJdGVtKGlkLCBvYmoudGl0bGUsIG9iai5kdWVEYXRlLCBvYmoucHJpb3JpdHksIG9iai5wcm9qZWN0LCBvYmouY2hlY2tlZCk7XG4gICAgbGlzdC5wdXNoKG5ld0l0ZW0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZWRpdEl0ZW0ob2JqSUQsIG5ld09iaikge1xuICAgIGNvbnN0IG9ialRvRWRpdCA9IGxpc3RbZmluZE9ialBvcyhvYmpJRCldO1xuICAgIGNvbnN0IGl0ZW0gPSByZXR1cm5PYmoob2JqVG9FZGl0KTtcbiAgICBPYmplY3Qua2V5cyhuZXdPYmopLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKGl0ZW1ba2V5XSAhPT0gdW5kZWZpbmVkICYmIGl0ZW1ba2V5XSAhPT0gbmV3T2JqW2tleV0pIHtcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICBjYXNlICd0aXRsZSc6XG4gICAgICAgICAgICBvYmpUb0VkaXQuZWRpdFRpdGxlKG5ld09ialtrZXldKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3Byb2plY3QnOlxuICAgICAgICAgICAgb2JqVG9FZGl0LmVkaXRQcm9qZWN0KG5ld09ialtrZXldKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2R1ZURhdGUnOlxuICAgICAgICAgICAgb2JqVG9FZGl0LmVkaXREdWVEYXRlKG5ld09ialtrZXldKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3ByaW9yaXR5JzpcbiAgICAgICAgICAgIG9ialRvRWRpdC5lZGl0UHJpb3JpdHkobmV3T2JqW2tleV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdDaGF2ZSBpbnbDoWxpZGEnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZWRpdE5vdGUoaWQsIHBvcywgdmFsKSB7XG4gICAgbGlzdFtmaW5kT2JqUG9zKGlkKV0uZWRpdE5vdGUocG9zLCB2YWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVsZXRlSXRlbShpZCkge1xuICAgIGxpc3Quc3BsaWNlKGZpbmRPYmpQb3MoaWQpLCAxKTtcbiAgfVxuXG4gIGNvbnN0IHRvSlNPTiA9ICgpID0+IHtcbiAgICBjb25zdCBsaXN0RGF0YSA9IGxpc3QubWFwKChpdGVtKSA9PiAoe1xuICAgICAgaWQ6IGl0ZW0uZ2V0SWQoKSxcbiAgICAgIHRpdGxlOiBpdGVtLmdldFRpdGxlKCksXG4gICAgICBwcm9qZWN0OiBpdGVtLmdldFByb2plY3QoKSxcbiAgICAgIGR1ZURhdGU6IGl0ZW0uZ2V0RHVlRGF0ZSgpLFxuICAgICAgcHJpb3JpdHk6IGl0ZW0uZ2V0UHJpb3JpdHkoKSxcbiAgICAgIGNoZWNrZWQ6IGl0ZW0uZ2V0Q2hlY2soKSxcbiAgICAgIG5vdGVzOiBpdGVtLmdldEFsbE5vdGVzKCksXG4gICAgfSkpO1xuXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHsgbGlzdDogbGlzdERhdGEgfSwgJycsIDEpO1xuICB9O1xuXG4gIGNvbnN0IHJlc3RvcmUgPSAoZGF0YSkgPT4ge1xuICAgIHJlc2V0KCk7XG4gICAgY29uc3QgeyBsaXN0OiBsaXN0RGF0YSB9ID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICBsaXN0RGF0YS5mb3JFYWNoKFxuICAgICAgKHtcbiAgICAgICAgaWQsIHRpdGxlLCBwcm9qZWN0LCBkdWVEYXRlLCBwcmlvcml0eSwgY2hlY2tlZCwgbm90ZXMsXG4gICAgICB9KSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0l0ZW0gPSBDcmVhdGVJdGVtKGlkLCB0aXRsZSwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QsIGNoZWNrZWQpO1xuICAgICAgICBub3Rlcy5mb3JFYWNoKChub3RlKSA9PiBuZXdJdGVtLmFkZE5vdGUobm90ZSkpO1xuICAgICAgICBsaXN0LnB1c2gobmV3SXRlbSk7XG4gICAgICB9LFxuICAgICk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRMZW5ndGgsXG4gICAgZWRpdE5vdGUsXG4gICAgZWRpdEl0ZW0sXG4gICAgYWRkSXRlbSxcbiAgICBkZWxldGVJdGVtLFxuICAgIHJlc3RvcmUsXG4gICAgdG9KU09OLFxuICAgIHNldENoZWNrZWQsXG4gICAgZ2V0UHJvamVjdHMsXG4gICAgcmVzZXQsXG4gICAgcmV0dXJuT2JqLFxuICAgIGFsbFRhc2tzTGlzdCxcbiAgICBnZXRJdGVtLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdG9kb0xpc3Q7XG4iLCIvLyBpbXBvcnQgeyBwdEJSIH0gZnJvbSAnZGF0ZS1mbnMvbG9jYWxlJztcbmltcG9ydCB7IGZvcm1hdCB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCBJTWFzayBmcm9tICdpbWFzayc7XG5cbmNvbnN0IHNwbGl0VG9Db2RlID0gKGRhdGUpID0+IGRhdGUuc3BsaXQoJy8nKS5yZXZlcnNlKCkuam9pbignLycpLnJlcGxhY2VBbGwoJy8nLCAnLCAnKTtcbmV4cG9ydCBjb25zdCB0b0lucHV0ID0gKGRhdGEpID0+IGZvcm1hdChuZXcgRGF0ZShzcGxpdFRvQ29kZShkYXRhKSksICdkZC9MTC95eXl5Jyk7XG4vLyBjb25zdCBnZXREYXRhID0gKGFycikgPT4gYXJyLmZvckVhY2goZWxlbWVudCA9PiB7XG5cbi8vIH0pO1xuXG5leHBvcnQgY29uc3QgbWFza0RhdGUgPSB7XG4gIG1hc2s6ICdkL2BtL2BZJyxcbiAgYmxvY2tzOiB7XG4gICAgZDoge1xuICAgICAgbWFzazogSU1hc2suTWFza2VkUmFuZ2UsXG4gICAgICBwbGFjZWhvbGRlckNoYXI6ICdkJyxcbiAgICAgIGZyb206IDEsXG4gICAgICB0bzogMzEsXG4gICAgICBtYXhMZW5ndGg6IDIsXG4gICAgfSxcbiAgICBtOiB7XG4gICAgICBtYXNrOiBJTWFzay5NYXNrZWRSYW5nZSxcbiAgICAgIHBsYWNlaG9sZGVyQ2hhcjogJ20nLFxuICAgICAgZnJvbTogMSxcbiAgICAgIHRvOiAxMixcbiAgICAgIG1heExlbmd0aDogMixcbiAgICB9LFxuICAgIFk6IHtcbiAgICAgIG1hc2s6IElNYXNrLk1hc2tlZFJhbmdlLFxuICAgICAgcGxhY2Vob2xkZXJDaGFyOiAnYScsXG4gICAgICBmcm9tOiAxMDAwLFxuICAgICAgdG86IDk5OTksXG4gICAgfSxcbiAgfSxcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tY3ljbGUgKi9cbmltcG9ydCB0b2RvTGlzdCBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IHtcbiAgY3JlYXRlRWxlbWVudCwgY3JlYXRlUHJpb3JpdHlTZWxlY3QsIGR1ZURhdGVNYXNrLCBzZWFyY2hQcm9qZWN0cyxcbn0gZnJvbSAnLi91aUNvbW1vbkZ1bmN0aW9ucyc7XG5pbXBvcnQgdWlDb250cm9sIGZyb20gJy4vdWlDb250cm9sbGVyJztcblxuZnVuY3Rpb24gc2F2ZSh0aXRsZSwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QsIG5vdGVzLCBpZCkge1xuICBjb25zdCBuZXdPYmogPSB7XG4gICAgdGl0bGU6IHRpdGxlLnZhbHVlLFxuICAgIGR1ZURhdGU6IGR1ZURhdGUudmFsdWUsXG4gICAgcHJpb3JpdHk6IHByaW9yaXR5LnZhbHVlLFxuICAgIHByb2plY3Q6IHByb2plY3QudmFsdWUsXG4gICAgbm90ZXMsXG4gIH07XG4gIGlmIChpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdG9kb0xpc3QuZWRpdEl0ZW0oaWQsIG5ld09iaik7XG4gIH0gZWxzZSB7XG4gICAgdG9kb0xpc3QuYWRkSXRlbShuZXdPYmopO1xuICB9XG4gIHVpQ29udHJvbC51cGRhdGUoKTtcbn1cblxuZnVuY3Rpb24gdWlFZGl0SXRlbSh0aXRsZSwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QsIG5vdGVzLCBpZCkge1xuICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5tb2RhbC1ib2R5Jyk7XG4gIC8vIGNyZWF0aW5nIGVsZW1lbnRzXG4gIGNvbnN0IHJvdzEgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3JvdyddKTtcbiAgY29uc3QgdGl0bGVEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2lucHV0LWdyb3VwJywgJ21iLTMnLCAnZ2FwLTEnXSk7XG4gIGNvbnN0IHRpdGxlSW5wdXQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIFsnZm9ybS1jb250cm9sJ10sIHtcbiAgICBpZDogJ2l0ZW1UaXRsZScsXG4gICAgdHlwZTogJ3RleHQnLFxuICAgIHBsYWNlaG9sZGVyOiAnTm92YSBUYXJlZmEuLi4nLFxuICB9KTtcbiAgY29uc3Qgcm93MiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnYmctZ3JheScsICdyb3cnLCAnZy0wJywgJ2dhcC0yJywgJ2ZsZXgtbm93cmFwJ10pO1xuXG4gIGNvbnN0IGRhdGVEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2RhdGUnLCAnZmxhdHBpY2tyJywgJ2NvbCddKTtcbiAgY29uc3QgZGF0ZUlucHV0ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2Zvcm0tY29udHJvbCcsICdmbGF0cGlja3ItaW5wdXQnXSwge1xuICAgIGlkOiAnZHVlRGF0ZScsXG4gICAgdHlwZTogJ3RleHQnLFxuICAgIGlucHV0bW9kZTogJ251bWVyaWMnLFxuICAgICdkYXRhLWlucHV0JzogdW5kZWZpbmVkLFxuICAgIGF1dG9jb21wbGV0ZTogJ29mZicsXG4gIH0pO1xuICBjb25zdCBkYXRlcGlja2VyVG9nZ2xlID0gY3JlYXRlRWxlbWVudCgnYScsIFsnaW5wdXQtYnV0dG9uJ10sIHtcbiAgICB0aXRsZTogJ3RvZ2dsZScsXG4gICAgJ2RhdGEtdG9nZ2xlJzogdW5kZWZpbmVkLFxuICB9KTtcbiAgY29uc3QgZGF0ZUljb24gPSBjcmVhdGVFbGVtZW50KCdpJywgWyd0ZXh0LXdhcm5pbmcnLCAnc21hbGwnLCAnYmknLCAnYmktY2FsZW5kYXInXSk7XG5cbiAgY29uc3QgcHJpb3JpdHlEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbCddKTtcbiAgY29uc3QgcHJpb3JpdHlTZWxlY3QgPSBjcmVhdGVQcmlvcml0eVNlbGVjdChwcmlvcml0eSk7XG5cbiAgY29uc3QgcHJvamVjdERpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29sJ10pO1xuICBjb25zdCBwcm9qZWN0SW5wdXQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIFsnZm9ybS1jb250cm9sJ10sIHtcbiAgICBpZDogJ2VudGVyUHJvamVjdCcsXG4gICAgdHlwZTogJ3RleHQnLFxuICAgIGxpc3Q6ICdkYXRhbGlzdE9wdGlvbnMnLFxuICAgIHBsYWNlaG9sZGVyOiAnUHJvamV0bycsXG4gICAgYXV0b2NvbXBsZXRlOiAnb2ZmJyxcbiAgfSk7XG4gIGNvbnN0IHByb2plY3REYXRhbGlzdCA9IGNyZWF0ZUVsZW1lbnQoJ2RhdGFsaXN0JywgWydzdWdnZXN0aW9ucycsICdmb3JtJ10sIHtcbiAgICBpZDogJ2RhdGFsaXN0T3B0aW9ucycsXG4gICAgZHJvcHpvbmU6ICdzdHJpbmcnLFxuICB9KTtcblxuICBjb25zdCByb3czID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnLCAncHQtMiddKTtcblxuICBjb25zdCBub3Rlc0NvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29udGFpbmVyJ10pO1xuICBjb25zdCBub3Rlc0hlYWRlciA9IGNyZWF0ZUVsZW1lbnQoJ2g2Jyk7XG4gIGNvbnN0IG5vdGVzUm93ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnLCAnZy0yJ10pO1xuICBjb25zdCBub3Rlc0xpc3QgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ25vdGVzTGlzdCddKTtcblxuICBjb25zdCBhZGROb3RlUm93ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnLCAncHQtMicsICdqdXN0aWZ5LWNvbnRlbnQtZW5kJ10pO1xuXG4gIGNvbnN0IGFkZE5vdGVEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbC1hdXRvJywgJ3NtYWxsJywgJ3RleHQtZGFuZ2VyJywgJ3RleHQtd2FybmluZy1lbXBoYXNpcyddKTtcbiAgY29uc3QgYWRkTm90ZUxpbmsgPSBjcmVhdGVFbGVtZW50KCdhJywgW10sIHsgaWQ6ICdhZGROb3RlJyB9KTtcbiAgY29uc3QgYWRkTm90ZUljb24gPSBjcmVhdGVFbGVtZW50KCdpJywgWydiaScsICdiaS1wbHVzLWNpcmNsZSddKTtcbiAgY29uc3QgYWRkTm90ZVRleHQgPSBjcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgY29uc3Qgcm93NCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncm93JywgJ2ctMicsICdwdC0zJywgJ2p1c3RpZnktY29udGVudC1zdGFydCcsICdmbGV4LXJvdy1yZXZlcnNlJ10pO1xuXG4gIGNvbnN0IHNhdmVEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbC1hdXRvJ10pO1xuICBjb25zdCBzYXZlQnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgWydidG4nLCAnYnRuLXdhcm5pbmcnXSwge1xuICAgICdkYXRhLWJzLWRpc21pc3MnOiAnbW9kYWwnLFxuICB9KTtcbiAgY29uc3QgY2FuY2VsRGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydjb2wtYXV0byddKTtcbiAgY29uc3QgY2FuY2VsQnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgWydidG4nLCAnYnRuLXNlY29uZGFyeScsICd0ZXh0LWxpZ2h0J10sIHtcbiAgICAnZGF0YS1icy1kaXNtaXNzJzogJ21vZGFsJyxcbiAgfSk7XG5cbiAgLy8gYXBwZW5kIGVsZW1lbnRzXG5cbiAgLy8gcm93IDEgKHRpdGxlKVxuICBpZiAodGl0bGUgJiYgKHR5cGVvZiB0aXRsZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHRpdGxlLnZhbHVlICE9PSAndW5kZWZpbmVkJykpIHtcbiAgICB0aXRsZUlucHV0LnZhbHVlID0gdHlwZW9mIHRpdGxlID09PSAnc3RyaW5nJyA/IHRpdGxlIDogdGl0bGUudmFsdWU7XG4gIH1cbiAgdGl0bGVEaXYuYXBwZW5kQ2hpbGQodGl0bGVJbnB1dCk7XG5cbiAgcm93MS5hcHBlbmRDaGlsZCh0aXRsZURpdik7XG5cbiAgLy8gcm93IDIgKGRhdGUsIHByaW9yaXR5LCBwcm9qZWN0KVxuXG4gIC8vIGRhdGVcbiAgaWYgKGR1ZURhdGUgIT09IHVuZGVmaW5lZCAmJiBkdWVEYXRlICE9PSAwKSB7XG4gICAgZGF0ZUlucHV0LnZhbHVlID0gZHVlRGF0ZTtcbiAgfVxuICBkYXRlcGlja2VyVG9nZ2xlLmFwcGVuZENoaWxkKGRhdGVJY29uKTtcbiAgZGF0ZURpdi5hcHBlbmQoZGF0ZUlucHV0LCBkYXRlcGlja2VyVG9nZ2xlKTtcblxuICAvLyBwcmlvcml0eVxuICBwcmlvcml0eURpdi5hcHBlbmRDaGlsZChwcmlvcml0eVNlbGVjdCk7XG5cbiAgLy8gcHJvamVjdFxuICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0KTtcbiAgaWYgKHR5cGVvZiBwcm9qZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBwcm9qZWN0ICE9PSAwKSBwcm9qZWN0SW5wdXQudmFsdWUgPSBwcm9qZWN0O1xuICBwcm9qZWN0RGl2LmFwcGVuZChwcm9qZWN0SW5wdXQsIHByb2plY3REYXRhbGlzdCk7XG5cbiAgcm93Mi5hcHBlbmQoZGF0ZURpdiwgcHJpb3JpdHlEaXYsIHByb2plY3REaXYpO1xuXG4gIC8vIHJvdzMgKG5vdGVzIGFyZWEpXG4gIG5vdGVzSGVhZGVyLnRleHRDb250ZW50ID0gJ05vdGFzJztcbiAgYWRkTm90ZVRleHQudGV4dENvbnRlbnQgPSAnTm92YSBub3RhJztcbiAgYWRkTm90ZUljb24udGV4dENvbnRlbnQgPSAnICc7IC8vIGZpeGluZyBhIHByb2JsZW0gZm9yIHVzaW5nIGpzXG5cbiAgYWRkTm90ZUxpbmsuYXBwZW5kKGFkZE5vdGVJY29uLCBhZGROb3RlVGV4dCk7XG4gIGFkZE5vdGVEaXYuYXBwZW5kQ2hpbGQoYWRkTm90ZUxpbmspO1xuICBhZGROb3RlUm93LmFwcGVuZENoaWxkKGFkZE5vdGVEaXYpO1xuICBpZiAobm90ZXMpIHtcbiAgICBub3Rlcy5mb3JFYWNoKChub3RlKSA9PiB7XG4gICAgICAvLyBwcmVjaXNvIGNpcmFyIG8gbGF5b3V0IGRhcyBub3Rhc1xuICAgICAgbm90ZXNMaXN0LmlubmVySFRNTCArPSBgPHNwYW4+JHtub3RlfTwvc3Bhbj5gO1xuICAgIH0pO1xuICB9XG4gIG5vdGVzUm93LmFwcGVuZChub3Rlc0xpc3QsIGFkZE5vdGVSb3cpO1xuICBub3Rlc0NvbnRhaW5lci5hcHBlbmQobm90ZXNIZWFkZXIsIG5vdGVzUm93KTtcblxuICByb3czLmFwcGVuZENoaWxkKG5vdGVzQ29udGFpbmVyKTtcblxuICAvLyByb3c0IChidXR0b25zKVxuICBjYW5jZWxCdG4udGV4dENvbnRlbnQgPSAnQ2FuY2VsJztcbiAgc2F2ZUJ0bi50ZXh0Q29udGVudCA9ICdTYXZlJztcbiAgaWYgKGlkICE9PSB1bmRlZmluZWQpIHNhdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzYXZlKHRpdGxlSW5wdXQsIGRhdGVJbnB1dCwgcHJpb3JpdHlTZWxlY3QsIHByb2plY3RJbnB1dCwgbm90ZXMsIGlkKSk7XG4gIGVsc2Ugc2F2ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNhdmUodGl0bGVJbnB1dCwgZGF0ZUlucHV0LCBwcmlvcml0eVNlbGVjdCwgcHJvamVjdElucHV0KSk7XG4gIHNhdmVEaXYuYXBwZW5kQ2hpbGQoc2F2ZUJ0bik7XG4gIGNhbmNlbERpdi5hcHBlbmRDaGlsZChjYW5jZWxCdG4pO1xuXG4gIHJvdzQuYXBwZW5kKHNhdmVEaXYsIGNhbmNlbERpdik7XG5cbiAgbW9kYWwuYXBwZW5kKHJvdzEsIHJvdzIsIHJvdzMsIHJvdzQpO1xuICBkdWVEYXRlTWFzaygpO1xuICBzZWFyY2hQcm9qZWN0cygpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB1aUVkaXRJdGVtO1xuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWN5Y2xlICovXG5pbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcbmltcG9ydCB7XG4gIGFkZENoZWNrZWQsIGNyZWF0ZUVsZW1lbnQsIGhhc05vdGVzLCBpc0NoZWNrZWQsIGxpc3QsXG59IGZyb20gJy4vdWlDb21tb25GdW5jdGlvbnMnO1xuaW1wb3J0IHVpQ29udHJvbCBmcm9tICcuL3VpQ29udHJvbGxlcic7XG5cbmZ1bmN0aW9uIGluc2VydE5vdGUobm90ZXMsIGJvZHkpIHtcbiAgbm90ZXMuZm9yRWFjaCgoY29udGVudCkgPT4ge1xuICAgIGNvbnN0IGNvbnRlbnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250ZW50RGl2LmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgYm9keS5hcHBlbmRDaGlsZChjb250ZW50RGl2KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldENoZWNrZWRIYW5kbGVyKGUpIHtcbiAgY29uc3QgeyB0YXJnZXQgfSA9IGU7XG4gIGNvbnN0IGlkID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xuICB0b2RvTGlzdC5zZXRDaGVja2VkKGlkKTtcbn1cblxuY29uc3QgcHJpb3JpdHlTZXR0aW5ncyA9IHtcbiAgMDogeyB0aXRsZTogJ05vIHByaW9yaXR5JywgYXJyYXk6IFsnYmktb2N0YWdvbiddIH0sXG4gIDE6IHsgdGl0bGU6ICdQcmlvcml0eSAxJywgYXJyYXk6IFsnYmktZXhjbGFtYXRpb24tb2N0YWdvbi1maWxsJywgJ3RleHQtc3VjY2VzcyddIH0sXG4gIDI6IHsgdGl0bGU6ICdQcmlvcml0eSAyJywgYXJyYXk6IFsnYmktZXhjbGFtYXRpb24tb2N0YWdvbi1maWxsJywgJ3RleHQtd2FybmluZyddIH0sXG4gIDM6IHsgdGl0bGU6ICdQcmlvcml0eSAzJywgYXJyYXk6IFsnYmktZXhjbGFtYXRpb24tb2N0YWdvbi1maWxsJywgJ3RleHQtZGFuZ2VyJ10gfSxcbn07XG5cbmZ1bmN0aW9uIHNlbGVjdFByaW9yaXR5KG51bSkge1xuICBjb25zdCBvYmogPSBwcmlvcml0eVNldHRpbmdzW251bV07XG4gIGNvbnN0IHN0YW5kYXJkQ2xhc3NlcyA9IFsnc21hbGwnLCAnbXMtMicsICdiaSddO1xuICBjb25zdCBjbGFzc2VzID0gc3RhbmRhcmRDbGFzc2VzLmNvbmNhdChvYmouYXJyYXkpO1xuICBjb25zdCBhdHRycyA9IHsgJ2RhdGEtdG9nZ2xlJzogJ3Rvb2x0aXAnLCAnZGF0YS1wbGFjZW1lbnQnOiAndG9wJyB9O1xuICBhdHRycy50aXRsZSA9IG9iai50aXRsZTtcblxuICByZXR1cm4gY3JlYXRlRWxlbWVudCgnaScsIGNsYXNzZXMsIGF0dHJzKTtcbn1cblxuZnVuY3Rpb24gYWRkTGluZShvYmopIHtcbiAgLy8gaGVhZGVyXG4gIGNvbnN0IGl0ZW0gPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2FjY29yZGlvbi1pdGVtJ10pO1xuICBjb25zdCBoZWFkZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2FjY29yZGlvbi1oZWFkZXInLCAncC0xJywgJ2QtZmxleCcsICdhbGlnbi1pdGVtcy1jZW50ZXInLCAnZ2FwLTEnXSk7XG4gIGNvbnN0IGNoZWNrYm94ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2Zvcm0tY2hlY2staW5wdXQnLCAndGV4dC1iZy13YXJuaW5nJ10sIHtcbiAgICB0eXBlOiAnY2hlY2tib3gnLFxuICAgICdkYXRhLWlkJzogYCR7b2JqLmlkfWAsXG4gIH0pO1xuICBjb25zdCBidG5IZWFkZXIgPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2FjY29yZGlvbi1idXR0b24nLCAnY29sbGFwc2VkJywgJ2ZsZXgtZmlsbCddLCB7XG4gICAgdHlwZTogJ2J1dHRvbicsXG4gICAgJ2RhdGEtYnMtdG9nZ2xlJzogJ2NvbGxhcHNlJyxcbiAgICAnYXJpYS1leHBhbmRlZCc6ICdmYWxzZScsXG4gICAgJ2RhdGEtYnMtdGFyZ2V0JzogYCNpdGVtLSR7b2JqLmlkfWAsXG4gIH0pO1xuICBjb25zdCBwcmlvcml0eSA9IHNlbGVjdFByaW9yaXR5KHBhcnNlSW50KG9iai5wcmlvcml0eSwgMTApKTtcbiAgY29uc3Qgc3BhbiA9IGNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCBbJ2ZsZXgtZmlsbCddKTtcbiAgY29uc3QgY29kZSA9IGNyZWF0ZUVsZW1lbnQoJ2NvZGUnLCBbJ3NtYWxsJywgJ3RleHQtbXV0ZWQnXSk7XG5cbiAgLy8gYm9keVxuICBjb25zdCBpdGVtRGV0YWlscyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnYWNjb3JkaW9uLWNvbGxhcHNlJywgJ2NvbGxhcHNlJ10sIHtcbiAgICBpZDogYGl0ZW0tJHtvYmouaWR9YCxcbiAgICAnZGF0YS1icy1wYXJlbnQnOiAnI2xpc3QnLFxuICB9KTtcbiAgY29uc3QgaXRlbUJvZHkgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2FjY29yZGlvbi1ib2R5J10pO1xuICBjb25zdCBlZGl0RGVsZXRlSXRlbSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZC1mbGV4JywgJ2ZsZXgtcm93LXJldmVyc2UnLCAnY29sJywgJ2dhcC0yJ10pO1xuXG4gIGNvbnN0IGJ0bkVkaXQgPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2J0bicsICdidG4td2FybmluZyddLCB7XG4gICAgJ2RhdGEtaWQnOiBvYmouaWQsXG4gICAgJ2RhdGEtYnMtdGFyZ2V0JzogJyNleGFtcGxlTW9kYWwnLFxuICAgICdkYXRhLWJzLXRvZ2dsZSc6ICdtb2RhbCcsXG4gIH0pO1xuICBjb25zdCBidG5EZWxldGUgPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2J0bicsICdidG4tZGFuZ2VyJ10sIHtcbiAgICAnZGF0YS1pZCc6IG9iai5pZCxcbiAgfSk7XG5cbiAgLy8gRVZFTlRMSVNUTkVSUyBPQkpFQ1RTXG4gIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHNldENoZWNrZWRIYW5kbGVyKTtcblxuICAvLyBGSUxMSU5HIENPTlRFTlRcbiAgLy8gaGVhZGVyXG4gIHNwYW4udGV4dENvbnRlbnQgPSBvYmoudGl0bGU7XG4gIGNvZGUudGV4dENvbnRlbnQgPSBvYmoucHJvamVjdDtcblxuICAvLyBib2R5XG4gIGJ0bkVkaXQudGV4dENvbnRlbnQgPSAnRWRpdCc7XG4gIGJ0bkRlbGV0ZS50ZXh0Q29udGVudCA9ICdEZWxldGUnO1xuXG4gIC8vIEFwcGVuZGluZyBjb250ZW50XG4gIGJ0bkhlYWRlci5hcHBlbmQoc3BhbiwgY29kZSk7XG4gIGhlYWRlci5hcHBlbmQoY2hlY2tib3gsIHByaW9yaXR5LCBidG5IZWFkZXIpO1xuXG4gIC8vIEJvZHkgY29udGVudFxuICBpZiAoaGFzTm90ZXMob2JqLm5vdGVzKSkge1xuICAgIGluc2VydE5vdGUob2JqLm5vdGVzLCBpdGVtQm9keSk7XG4gIH1cbiAgYnRuRWRpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlbGVtKSA9PiB7XG4gICAgdWlDb250cm9sLmhhbmRsZXJzLmVkaXQoZWxlbSk7XG4gIH0pO1xuICBidG5EZWxldGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1aUNvbnRyb2wuaGFuZGxlcnMuZGVsZXRlSXRlbSk7XG4gIGVkaXREZWxldGVJdGVtLmFwcGVuZChidG5EZWxldGUsIGJ0bkVkaXQpO1xuICBpdGVtQm9keS5hcHBlbmRDaGlsZChlZGl0RGVsZXRlSXRlbSk7XG4gIGl0ZW1EZXRhaWxzLmFwcGVuZENoaWxkKGl0ZW1Cb2R5KTtcblxuICAvLyBBcHBlbmQgZWxlbWVudHMgdG8gbGlzdFxuICBpdGVtLmFwcGVuZChoZWFkZXIsIGl0ZW1EZXRhaWxzKTtcbiAgbGlzdC5hcHBlbmRDaGlsZChpdGVtKTtcbiAgaWYgKGlzQ2hlY2tlZChvYmopKSBhZGRDaGVja2VkKGNoZWNrYm94LCBidG5IZWFkZXIpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhZGRMaW5lO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCAnLi9zdHlsZS5zY3NzJztcbmltcG9ydCB7IHJlc3RvcmVTdG9yYWdlIH0gZnJvbSAnLi9KU09ORnVuY3Rpb25zJztcblxuaW1wb3J0IHtcbiAgY2xlYXJDb250ZW50LFxuICBzaG93UGx1c0J0bixcbiAgYWRkRmllbGQsXG4gIGFkZFRhc2ssXG4gIGlucHV0LFxuICBhZGRNb3JlLFxuICBxdWlja1NhdmUsXG4gIGxpc3QsXG59IGZyb20gJy4vdWlDb21tb25GdW5jdGlvbnMnO1xuaW1wb3J0IHVpRWRpdEl0ZW0gZnJvbSAnLi9lZGl0Q29uc3RydWN0b3InO1xuaW1wb3J0IHVpQ29udHJvbCBmcm9tICcuL3VpQ29udHJvbGxlcic7XG5cbmNvbnN0IHByb2plY3RzSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNwcm9qZWN0cycpO1xuY29uc3QgcHJvamVjdHNEcm9wZG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNwcm9qZWN0cyBkaXYnKTtcbmNvbnN0IG1haW5Nb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNleGFtcGxlTW9kYWwnKTtcblxuLy8gc2V0IG1heCBoZWlnaHQgZm9yIGxpc3QgaXRlbXNcbmZ1bmN0aW9uIHNldE1heEhlaWdodCgpIHtcbiAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gICAgLy8gZ2V0IHBhZGRpbmcgdG9wICsgYm90dG9tIGZvcm0gbWFpbiBlbGVtZW50XG4gICAgbGV0IG1haW5QYWRkaW5nID0gcGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyksIG51bGwpXG4gICAgICAuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy10b3AnKS5tYXRjaCgvXFxkKyhcXC5cXGQrKT8vKSk7XG4gICAgbWFpblBhZGRpbmcgKz0gcGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyksIG51bGwpXG4gICAgICAuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy1ib3R0b20nKS5tYXRjaCgvXFxkKyhcXC5cXGQrKT8vKSk7XG5cbiAgICAvLyBnZXQgb3RoZXIgZWxlbWVudHMgc2l6ZVxuICAgIGNvbnN0IGJvZHlIZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jykub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IGluc2V0SXRlbUhlaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4gPiBkaXYnKS5vZmZzZXRIZWlnaHQ7XG4gICAgY29uc3QgaGVhZGVySGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJykub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IGFzaWRlSGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXNpZGUnKS5vZmZzZXRIZWlnaHQ7XG4gICAgLy8gY29uc3QgZm9vdGVySGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9vdGVyJykub2Zmc2V0SGVpZ2h0O1xuXG4gICAgLy8gc2V0IG1heCBzaXplIGZvciB0YXNrIGxpc3RcbiAgICBjb25zdCBtYXhIZWlnaHQgPSBib2R5SGVpZ2h0IC0gaGVhZGVySGVpZ2h0IC0gaW5zZXRJdGVtSGVpZ2h0IC0gYXNpZGVIZWlnaHQgLSBtYWluUGFkZGluZztcbiAgICBsaXN0LnN0eWxlLm1heEhlaWdodCA9IGAke21heEhlaWdodH1weGA7XG4gIH0gZWxzZSBsaXN0LnN0eWxlLm1heEhlaWdodCA9ICdub25lJztcbn1cblxuLy8gZXZlbnRMaXN0ZW5lcnNcbi8vIGhvbWUgcGFnZSBidXR0b24gZnVuY3Rpb25zXG5hZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdWlFZGl0SXRlbSk7XG5hZGRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgc2hvd1BsdXNCdG4pO1xuYWRkRmllbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBzaG93UGx1c0J0bik7XG5hZGRNb3JlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdWlDb250cm9sLmhhbmRsZXJzLmVkaXRNb3JlKGlucHV0KSk7XG5xdWlja1NhdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB1aUNvbnRyb2wuaGFuZGxlcnMuZmFzdFNhdmUoaW5wdXQpKTtcblxuLy8gc2V0IGhlaWdodCBsaW1pdCBmb3IgbGlzdCBpdGVtc1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBzZXRNYXhIZWlnaHQpO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHNldE1heEhlaWdodCk7XG5cbi8vIGF1dG8tc2F2ZVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgdWlDb250cm9sLnVwZGF0ZSgpO1xufSk7XG5cbi8vIHJlc3RvcmUgZGF0YSB3aGVuIGl0J3MgbG9hZGVkXG53aW5kb3cub25sb2FkID0gcmVzdG9yZVN0b3JhZ2UoKTtcblxuLy8gbWVudSBmb3IgbW9iaWxlIHZlcnNpb25cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gIGlmICghZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJyNwcm9qZWN0cycpKSB7XG4gICAgcHJvamVjdHNEcm9wZG93bi5jbGFzc0xpc3QuYWRkKCdtZW51LWhpZGUnKTtcbiAgfVxufSk7XG5wcm9qZWN0c0ljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGlmIChwcm9qZWN0c0Ryb3Bkb3duLmNsYXNzTGlzdC5jb250YWlucygnbWVudS1oaWRlJykpIHtcbiAgICBwcm9qZWN0c0Ryb3Bkb3duLmNsYXNzTGlzdC5yZW1vdmUoJ21lbnUtaGlkZScpO1xuICB9IGVsc2Uge1xuICAgIHByb2plY3RzRHJvcGRvd24uY2xhc3NMaXN0LmFkZCgnbWVudS1oaWRlJyk7XG4gIH1cbn0pO1xuXG4vLyBjbGVhciBtb2RhbCBjb250ZW50IGV2ZXJ5dGltZSBpdCdzIGNsb3NlZFxubWFpbk1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2hpZGRlbi5icy5tb2RhbCcsICgpID0+IHtcbiAgY2xlYXJDb250ZW50KG1haW5Nb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtYm9keScpKTtcbn0pO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgY29uc3QgdG9vbHRpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJyk7XG4gIHRvb2x0aXBzLmZvckVhY2goKHRpcCkgPT4ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIHRpcCA9IG5ldyBib290c3RyYXAuVG9vbHRpcCh0aXApO1xuICB9KTtcbn0sIGZhbHNlKTtcblxuLy8gc3RhcnQgYXBwXG51aUNvbnRyb2wubG9hZCgpO1xuIiwiaW1wb3J0IGZsYXRwaWNrciBmcm9tICdmbGF0cGlja3InO1xuaW1wb3J0IHsgUG9ydHVndWVzZSB9IGZyb20gJ2ZsYXRwaWNrci9kaXN0L2wxMG4vcHQnO1xuaW1wb3J0IElNYXNrIGZyb20gJ2ltYXNrJztcbmltcG9ydCB7IG1hc2tEYXRlIH0gZnJvbSAnLi9kYXRlJztcbmltcG9ydCB0b2RvTGlzdCBmcm9tICcuL2NvcmUnO1xuXG5leHBvcnQgY29uc3QgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNsaXN0Jyk7XG5leHBvcnQgY29uc3QgYWRkRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCNpdGVtVGl0bGUnKTtcbmV4cG9ydCBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG5leHBvcnQgY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2EjYWRkSXRlbScpO1xuZXhwb3J0IGNvbnN0IGFkZE1vcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24jYWRkTW9yZScpO1xuZXhwb3J0IGNvbnN0IHF1aWNrU2F2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbiNzYXZlSXRlbScpO1xuXG5leHBvcnQgY29uc3QgaXNDaGVja2VkID0gKGUpID0+IGUuY2hlY2tlZCA9PT0gdHJ1ZTtcbmV4cG9ydCBjb25zdCBoYXNOb3RlcyA9IChvYmopID0+IG9iai5sZW5ndGggPiAwO1xuZXhwb3J0IGNvbnN0IGxvYWRMaXN0ID0gKCkgPT4gWy4uLnRvZG9MaXN0LmFsbFRhc2tzTGlzdCgpXTtcbmV4cG9ydCBjb25zdCBzb3J0UGFyYW0gPSAoYXJyLCBwYXJhbSkgPT4gWy4uLmFycl1cbiAgLnNvcnQoKGEsIGIpID0+ICgoYVtwYXJhbV0gPCBiW3BhcmFtXSkgPyAtMSA6IDEpKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZENoZWNrZWQoY2hlY2tib3gsIGJ1dHRvbikge1xuICBjaGVja2JveC5jaGVja2VkID0gdHJ1ZTtcbiAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3RleHQtZGVjb3JhdGlvbi1saW5lLXRocm91Z2gnKTtcbn1cblxuY29uc3Qgc3BlY2lhbENoYXJzRW50cmllcyA9IFtcbiAgWyfDgMOBw4LDg8OEw4UnLCAnQSddLFxuICBbJ8Ogw6HDosOjw6TDpScsICdhJ10sXG4gIFsnw4jDicOKw4snLCAnRSddLFxuICBbJ8Oow6nDqsOrJywgJ2UnXSxcbiAgWyfDjMONw47DjycsICdJJ10sXG4gIFsnw6zDrcOuw68nLCAnaSddLFxuICBbJ8OSw5PDlcOUw5YnLCAnTyddLFxuICBbJ8Oyw7PDtcO0w7YnLCAnbyddLFxuICBbJ8OZw5rDm8OcJywgJ1UnXSxcbiAgWyfDucO6w7vDvCcsICd1J10sXG4gIFsnw4cnLCAnQyddLFxuICBbJ8OnJywgJ2MnXSxcbl07XG5cbmNvbnN0IHNwZWNpYWxDaGFyc01hcCA9IE9iamVjdC5mcm9tRW50cmllcyhcbiAgc3BlY2lhbENoYXJzRW50cmllcy5mbGF0TWFwKChbY2hhcnMsIHZhbHVlXSkgPT4gWy4uLmNoYXJzXS5tYXAoKGNoYXIpID0+IFtjaGFyLCB2YWx1ZV0pKSxcbik7XG5cbi8vIEVMRU1FTlQgQ1JFQVRPUlNcblxuZXhwb3J0IGZ1bmN0aW9uIHNldEF0dHJzKGVsZW0sIGF0dHJzKSB7XG4gIE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQgJiYgYXR0cnNba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBlbGVtLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtLnNldEF0dHJpYnV0ZShrZXksICcnKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWcsIGNsYXNzTmFtZXMgPSBbXSwgYXR0cmlidXRlcyA9IHt9KSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gIGlmIChjbGFzc05hbWVzLmxlbmd0aCkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzTmFtZXMpO1xuICBzZXRBdHRycyhlbGVtZW50LCBhdHRyaWJ1dGVzKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPcHRpb24odmFsdWUsIHRleHQsIHNlbGVjdGVkKSB7XG4gIGNvbnN0IG9wdGlvbiA9IGNyZWF0ZUVsZW1lbnQoJ29wdGlvbicsIFtdLCB7IHZhbHVlIH0pO1xuICBvcHRpb24udGV4dENvbnRlbnQgPSB0ZXh0O1xuICBpZiAoc2VsZWN0ZWQpIHtcbiAgICBvcHRpb24uc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICcnKTtcbiAgfVxuICByZXR1cm4gb3B0aW9uO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJpb3JpdHlTZWxlY3QobnVtID0gMCkge1xuICBjb25zdCBzZWxlY3QgPSBjcmVhdGVFbGVtZW50KCdzZWxlY3QnLCBbJ2Zvcm0tc2VsZWN0J10sIHtcbiAgICAnYXJpYS1sYWJlbCc6ICdQcmlvcml0eScsXG4gIH0pO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkgKz0gMSkge1xuICAgIGNvbnN0IHRleHQgPSBpID09PSAwID8gJy0tIFNlbGVjdCBQcmlvcml0eScgOiBgUHJpb3JpdHkgJHtpfWA7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSBpID09PSBwYXJzZUludChudW0sIDEwKTtcbiAgICBjb25zdCBvcHRpb24gPSBjcmVhdGVPcHRpb24oaSwgdGV4dCwgc2VsZWN0ZWQpO1xuICAgIHNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICB9XG4gIHJldHVybiBzZWxlY3Q7XG59XG5cbi8vIFVJIEZVTkNUSU9OU1xuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDb250ZW50KGVsZW0pIHtcbiAgd2hpbGUgKGVsZW0uZmlyc3RDaGlsZCkge1xuICAgIGVsZW0ucmVtb3ZlQ2hpbGQoZWxlbS5sYXN0Q2hpbGQpO1xuICB9XG59XG5cbi8vIEFERC9FRElUIE5FVyBUQVNLIFNDUkVFTiBGVU5DVElPTlNcblxuZnVuY3Rpb24gcmVtb3ZlU3BlY2lhbHModGV4dCkge1xuICBsZXQgc2VhcmNoID0gdGV4dDtcbiAgc2VhcmNoID0gc2VhcmNoLnJlcGxhY2UoXG4gICAgL1vDgC3DnMOgLcO8XS9nLFxuICAgIChtYXRjaCkgPT4gc3BlY2lhbENoYXJzTWFwW21hdGNoXSB8fCBtYXRjaCxcbiAgKTtcbiAgcmV0dXJuIHNlYXJjaDtcbn1cbi8vIHByb2plY3RzIGRhdGFsaXN0IGF1dG9jb21wbGV0ZVxuZnVuY3Rpb24gYXV0b0NvbXBsZXRlKHNlYXJjaCkge1xuICBjb25zdCBwcm9qZWN0cyA9IHRvZG9MaXN0LmdldFByb2plY3RzKCk7XG4gIHJldHVybiBwcm9qZWN0cy5maWx0ZXIoKHZhbHVlKSA9PiB7XG4gICAgY29uc3QgdmFsdWVMb3dlcmNhc2UgPSByZW1vdmVTcGVjaWFscyh2YWx1ZS50b0xvd2VyQ2FzZSgpKTtcbiAgICBjb25zdCBzZWFyY2hMb3dlcmNhc2UgPSByZW1vdmVTcGVjaWFscyhzZWFyY2gudG9Mb3dlckNhc2UoKSk7XG4gICAgcmV0dXJuIHZhbHVlTG93ZXJjYXNlLmluY2x1ZGVzKHNlYXJjaExvd2VyY2FzZSk7XG4gIH0pO1xufVxuXG4vLyBjYWxsaW5nIGZ1bmN0aW9ucyB0byBhdXRvY29tcGxldGUgUHJvamVjdCBmaWVsZFxuXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoUHJvamVjdHMoKSB7XG4gIGNvbnN0IGlucHV0UHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbnRlclByb2plY3QnKTtcbiAgY29uc3QgZGF0YWxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkYXRhbGlzdCcpO1xuICBpbnB1dFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoeyB0YXJnZXQgfSkgPT4ge1xuICAgIGNvbnN0IGlucHV0RGF0YSA9IHRhcmdldC52YWx1ZTtcbiAgICBpZiAoaW5wdXREYXRhLmxlbmd0aCkge1xuICAgICAgY29uc3QgYXV0b0NvbXBsZXRlT3B0aW9ucyA9IGF1dG9Db21wbGV0ZShpbnB1dERhdGEpO1xuICAgICAgZGF0YWxpc3QuaW5uZXJIVE1MID0gYCR7YXV0b0NvbXBsZXRlT3B0aW9uc1xuICAgICAgICAubWFwKCh2YWx1ZSkgPT4gYDxvcHRpb24gdmFsdWU9XCIke3ZhbHVlfVwiIC8+YClcbiAgICAgICAgLmpvaW4oJycpfWA7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gREFURVBJQ0tFUiBBTkQgTUFTSyBGVU5DVElPTlNcbmV4cG9ydCBmdW5jdGlvbiBkdWVEYXRlTWFzaygpIHtcbiAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkdWVEYXRlJyk7XG4gIGNvbnN0IGZsYXRFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LmZsYXRwaWNrcicpO1xuXG4gIC8vIGFwcGx5IG1hc2sgdG8gZHVlRGF0ZUZpZWxkXG4gIGNvbnN0IG1hc2sgPSBJTWFzayhkdWVEYXRlLCBtYXNrRGF0ZSk7XG5cbiAgLy8gYXBwbHkgZmxhdHBpY2tyIGRhdGVwaWNrZXIgdG8gYWxsIGVsZW1lbnRzIGluIGEgZGl2XG4gIC8vIChpY29uIHRvZ2dsZSBhbmQgaW5wdXQgZGF0ZSB1c2luZyBkYXRhLSBhdHRyaWJ1dGVzKVxuICBmbGF0cGlja3IoZmxhdEVsZW0sIHtcbiAgICBkYXRlRm9ybWF0OiAnZC9tL1knLFxuICAgIGRpc2FibGVNb2JpbGU6ICd0cnVlJyxcbiAgICBhbGxvd0lucHV0OiB0cnVlLFxuICAgIHdyYXA6IHRydWUsXG4gICAgbG9jYWxlOiBQb3J0dWd1ZXNlLFxuICAgIG9uQ2hhbmdlKHNlbGVjdGVkRGF0ZXMsIGRhdGVTdHIpIHtcbiAgICAgIG1hc2sudXBkYXRlVmFsdWUoZGF0ZVN0cik7XG4gICAgfSxcbiAgfSk7XG59XG5cbi8vIG1haW4gc2NyZWVuIGludGVyYWN0aW9uc1xuLy8gY2hlY2sgdmlzdWFsIGVmZmVjdFxuZXhwb3J0IGZ1bmN0aW9uIHNob3dQbHVzQnRuKCkge1xuICAvLyBFbmNvbnRyYSBvIGJvdMOjbyArXG4gIGNvbnN0IHBsdXNCdG4gPSBhZGRGaWVsZC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gIGNvbnN0IHNhdmVCdG4gPSBwbHVzQnRuLm5leHRFbGVtZW50U2libGluZztcbiAgLy8gU2UgbyB2YWxvciBkbyBjYW1wbyB0w610dWxvIGZvciBkaWZlcmVudGUgZGUgdmF6aW8sXG4gIC8vIGVudMOjbyBlbGUgcmV2ZWxhIG8gYm90w6NvICtcbiAgaWYgKGFkZEZpZWxkLnZhbHVlICE9PSAnJykge1xuICAgIHBsdXNCdG4uY2xhc3NMaXN0LmFkZCgncmV2ZWFsSXRlbScpO1xuICAgIHNhdmVCdG4uY2xhc3NMaXN0LmFkZCgncmV2ZWFsSXRlbScpO1xuICB9XG4gIC8vIGNhc28gY29udHLDoXJpbywgc2Ugdm9jw6ogYXBhZ2FyIHRvZG8gbyB0w610dWxvXG4gIC8vIGVsZSBkw6EgZGlzcGxheTogbm9uZSwgbm8gYm90w6NvICtcbiAgaWYgKGFkZEZpZWxkLnZhbHVlID09PSAnJyAmJiBwbHVzQnRuLmNsYXNzTGlzdC5jb250YWlucygncmV2ZWFsSXRlbScpKSB7XG4gICAgcGx1c0J0bi5jbGFzc0xpc3QucmVtb3ZlKCdyZXZlYWxJdGVtJyk7XG4gICAgc2F2ZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdyZXZlYWxJdGVtJyk7XG4gIH1cbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIGZpbmRQYXJlbnROb2RlKGVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUpIHtcbi8vICAgbGV0IHsgcGFyZW50Tm9kZSB9ID0gZWxlbWVudDtcbi8vICAgd2hpbGUgKHBhcmVudE5vZGUpIHtcbi8vICAgICBpZiAocGFyZW50Tm9kZS5oYXNBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSkpIHtcbi8vICAgICAgIHJldHVybiBwYXJlbnROb2RlO1xuLy8gICAgIH1cbi8vICAgICBwYXJlbnROb2RlID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuLy8gICB9XG4vLyAgIHJldHVybiBudWxsOyAvLyBSZXRvcm5hIG51bGwgc2UgbsOjbyBlbmNvbnRyb3UgbmVuaHVtIG7DsyBwYWkgY29tIG8gYXRyaWJ1dG8gZGVzZWphZG9cbi8vIH1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1jeWNsZSAqL1xuaW1wb3J0IHsgcG9wdWxhdGVTdG9yYWdlIH0gZnJvbSAnLi9KU09ORnVuY3Rpb25zJztcbmltcG9ydCB0b2RvTGlzdCBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IHVpRWRpdEl0ZW0gZnJvbSAnLi9lZGl0Q29uc3RydWN0b3InO1xuaW1wb3J0IGFkZExpbmUgZnJvbSAnLi9saXN0Q29uc3RydWN0b3InO1xuaW1wb3J0IHtcbiAgY2xlYXJDb250ZW50LFxuICBsaXN0LFxuICBzb3J0UGFyYW0sXG4gIGxvYWRMaXN0LFxufSBmcm9tICcuL3VpQ29tbW9uRnVuY3Rpb25zJztcblxuLy8gVUkgQ29udHJvbGxlclxuXG5jb25zdCB1aUNvbnRyb2wgPSAoKCkgPT4ge1xuICBsZXQgY3VycmVudEZpbHRlciA9IG51bGw7XG5cbiAgZnVuY3Rpb24gc2V0Q3VycmVudEZpbHRlcihrZXksIHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBrZXkgIT09ICd1bmRlZmluZWQnKSBjdXJyZW50RmlsdGVyID0geyBrZXksIHZhbHVlIH07XG4gICAgZWxzZSBjdXJyZW50RmlsdGVyID0gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGZpbHRlckFycmF5ID0gKGFyciwgZmlsdGVyLCB2YWx1ZSkgPT4ge1xuICAgIGlmIChmaWx0ZXIpIHJldHVybiBbLi4uYXJyLmZpbHRlcigob2JqZXRvKSA9PiBvYmpldG9bZmlsdGVyXSA9PT0gdmFsdWUpXTtcbiAgICByZXR1cm4gYXJyO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGxvYWQoKSB7XG4gICAgY29uc3QgdWlMaXN0ID0gc29ydFBhcmFtKGxvYWRMaXN0KCksICdjaGVja2VkJyk7XG4gICAgaWYgKGN1cnJlbnRGaWx0ZXIgIT09IG51bGwpIHtcbiAgICAgIGZpbHRlckFycmF5KHVpTGlzdCwgY3VycmVudEZpbHRlci5rZXksIGN1cnJlbnRGaWx0ZXIudmFsdWUpXG4gICAgICAgIC5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IGxvYWRMaXN0KCkuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09PSBvYmouaWQpO1xuICAgICAgICAgIGFkZExpbmUob2JqLCBpbmRleCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB1aUxpc3QuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gbG9hZExpc3QoKS5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IG9iai5pZCk7XG4gICAgICAgIGFkZExpbmUob2JqLCBpbmRleCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoZmlsdGVyLCB2YWx1ZSkge1xuICAgIGNsZWFyQ29udGVudChsaXN0KTtcbiAgICBpZiAodHlwZW9mIGZpbHRlciAhPT0gJ3VuZGVmaW5lZCcpIHNldEN1cnJlbnRGaWx0ZXIoZmlsdGVyLCB2YWx1ZSk7XG4gICAgbG9hZCgpO1xuICAgIHBvcHVsYXRlU3RvcmFnZSgpO1xuICAgIGNvbnNvbGUud2FybignVXBkYXRlZCEnKTtcbiAgfVxuXG4gIGNvbnN0IGhhbmRsZXJzID0gKCgpID0+IHtcbiAgICAvLyBob21lIGJ1dHRvbnNcbiAgICBmdW5jdGlvbiBlZGl0TW9yZSh0aXRsZSkge1xuICAgICAgdWlFZGl0SXRlbSh0aXRsZSk7XG4gICAgICB0aXRsZS52YWx1ZSA9ICcnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZhc3RTYXZlKHRpdGxlKSB7XG4gICAgICBjb25zdCBuZXdPYmogPSB7IHRpdGxlOiB0aXRsZS52YWx1ZSB9O1xuICAgICAgdG9kb0xpc3QuYWRkSXRlbShuZXdPYmopO1xuICAgICAgdGl0bGUudmFsdWUgPSAnJztcbiAgICAgIHVwZGF0ZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVkaXQoZWxlbSkge1xuICAgICAgZWxlbS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBlbGVtO1xuICAgICAgY29uc3Qgb2JqID0gdG9kb0xpc3QuZ2V0SXRlbSh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJykpO1xuICAgICAgdWlFZGl0SXRlbShvYmoudGl0bGUsIG9iai5kdWVEYXRlLCBvYmoucHJpb3JpdHksIG9iai5wcm9qZWN0LCBvYmoubm90ZXMsIG9iai5pZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVsZXRlSXRlbShpdGVtKSB7XG4gICAgICBjb25zdCB7IHRhcmdldCB9ID0gaXRlbTtcbiAgICAgIHRvZG9MaXN0LmRlbGV0ZUl0ZW0odGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpKTtcbiAgICAgIHVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBlZGl0TW9yZSxcbiAgICAgIGZhc3RTYXZlLFxuICAgICAgZWRpdCxcbiAgICAgIGRlbGV0ZUl0ZW0sXG4gICAgfTtcbiAgfSkoKTtcblxuICByZXR1cm4ge1xuICAgIGhhbmRsZXJzLFxuICAgIHNldEN1cnJlbnRGaWx0ZXIsXG4gICAgbG9hZCxcbiAgICB1cGRhdGUsXG4gIH07XG59KSgpO1xuXG4vLyBBREQvRURJVCBJVEVNU1xuZXhwb3J0IGRlZmF1bHQgdWlDb250cm9sO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua3RvZG9fbGlzdFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt0b2RvX2xpc3RcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcIjNyZHBhcnRcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKDcyNzMpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=