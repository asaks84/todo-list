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

  function addItem(obj) {
    const id = list.length;
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
  console.log(` uiEditItem
    id: ${id}
    title: ${title}
    dueDate: ${dueDate}
    priority: ${priority}
    project: ${project}
    notes ${notes}
  `);
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
  const saveBtn = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('button', ['btn', 'btn-warning', 'text-light'], {
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

/***/ 7659:
/*!********************************!*\
  !*** ./src/assets/handlers.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteItem: () => (/* binding */ deleteItem),
/* harmony export */   edit: () => (/* binding */ edit),
/* harmony export */   editMore: () => (/* binding */ editMore),
/* harmony export */   fastSave: () => (/* binding */ fastSave),
/* harmony export */   setCheckedHandler: () => (/* binding */ setCheckedHandler)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ 3317);
/* harmony import */ var _editConstructor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editConstructor */ 1444);
/* harmony import */ var _uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uiCommonFunctions */ 4656);
/* harmony import */ var _uiController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./uiController */ 5168);
/* eslint-disable import/no-cycle */





function setCheckedHandler(e) {
  const { target } = e;
  const id = target.getAttribute('data-id');
  _core__WEBPACK_IMPORTED_MODULE_0__["default"].setChecked(id);
  (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.setLineThrough)(target);
}

// home buttons
function editMore(title) {
  (0,_editConstructor__WEBPACK_IMPORTED_MODULE_1__["default"])(title);
  title.value = '';
}

function fastSave(title) {
  _core__WEBPACK_IMPORTED_MODULE_0__["default"].addItem(title.value);
  _uiController__WEBPACK_IMPORTED_MODULE_3__["default"].update();
}

function edit(elem) {
  elem.stopImmediatePropagation();
  const { target } = elem;
  const obj = _core__WEBPACK_IMPORTED_MODULE_0__["default"].getItem(target.getAttribute('data-id'));
  console.log(obj);
  (0,_editConstructor__WEBPACK_IMPORTED_MODULE_1__["default"])(obj.title, obj.dueDate, obj.priority, obj.project, obj.notes, obj.id);
}

function deleteItem(item) {
  const { target } = item;
  _core__WEBPACK_IMPORTED_MODULE_0__["default"].deleteItem(target.getAttribute('data-id'));
  _uiController__WEBPACK_IMPORTED_MODULE_3__["default"].update();
}


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
/* harmony import */ var _JSONFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JSONFunctions */ 2875);
/* harmony import */ var _handlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handlers */ 7659);
/* harmony import */ var _uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uiCommonFunctions */ 4656);
/* eslint-disable import/no-cycle */




function insertNote(notes, body) {
  notes.forEach((content) => {
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = content;
    body.appendChild(contentDiv);
  });
}

function addLine(obj) {
  // header
  const item = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', ['accordion-item']);
  const header = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('h2', ['accordion-header', 'p-1', 'd-flex', 'align-items-center', 'gap-1']);
  const checkbox = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('input', ['form-check-input', 'text-bg-warning'], {
    type: 'checkbox',
    'data-id': `${obj.id}`,
  });
  const btnHeader = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('button', ['accordion-button', 'collapsed', 'flex-fill'], {
    type: 'button',
    'data-bs-toggle': 'collapse',
    'aria-expanded': 'false',
    'data-bs-target': `#item-${obj.id}`,
  });
  const span = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('span', ['flex-fill']);
  const code = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('code', ['small', 'text-muted']);

  // body
  const itemDetails = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', ['accordion-collapse', 'collapse'], {
    id: `item-${obj.id}`,
    'data-bs-parent': '#list',
  });
  const itemBody = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', ['accordion-body']);
  const editDeleteItem = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', ['d-flex', 'flex-row-reverse', 'col', 'gap-2']);

  const btnEdit = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('button', ['btn', 'btn-warning'], {
    'data-id': obj.id,
    'data-bs-target': '#exampleModal',
    'data-bs-toggle': 'modal',
  });
  const btnDelete = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('button', ['btn', 'btn-danger'], {
    'data-id': obj.id,
  });

  // EVENTLISTNERS OBJECTS
  checkbox.addEventListener('change', _handlers__WEBPACK_IMPORTED_MODULE_1__.setCheckedHandler);
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
  if ((0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.hasNotes)(obj.notes)) {
    insertNote(obj.notes, itemBody);
  }
  btnEdit.addEventListener('click', (elem) => {
    (0,_handlers__WEBPACK_IMPORTED_MODULE_1__.edit)(elem);
  });
  btnDelete.addEventListener('click', _handlers__WEBPACK_IMPORTED_MODULE_1__.deleteItem);
  editDeleteItem.append(btnDelete, btnEdit);
  itemBody.appendChild(editDeleteItem);
  itemDetails.appendChild(itemBody);

  // Append elements to list
  item.append(header, itemDetails);
  _uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.list.appendChild(item);
  if ((0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.isChecked)(obj)) (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.addChecked)(checkbox, btnHeader);
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
/* harmony import */ var _handlers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./handlers */ 7659);
/* harmony import */ var _uiController__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./uiController */ 5168);
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
_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.addMore.addEventListener('click', () => (0,_handlers__WEBPACK_IMPORTED_MODULE_4__.editMore)(_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.input));
_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.quickSave.addEventListener('click', () => (0,_handlers__WEBPACK_IMPORTED_MODULE_4__.fastSave)(_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.input));

// set height limit for list items
window.addEventListener('load', setMaxHeight);
window.addEventListener('resize', setMaxHeight);

// auto-save
window.addEventListener('change', () => {
  _uiController__WEBPACK_IMPORTED_MODULE_5__["default"].update();
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

// start app
_uiController__WEBPACK_IMPORTED_MODULE_5__["default"].load();


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
/* harmony export */   setLineThrough: () => (/* binding */ setLineThrough),
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
    'aria-label': 'Prioridade',
  });
  for (let i = 0; i < 4; i += 1) {
    const text = i === 0 ? 'Prioridade' : `Prioridade ${i}`;
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
function setLineThrough(e) {
  const text = e.nextElementSibling;
  if (isChecked(e)) {
    text.classList.add('text-decoration-line-through');
  } else {
    text.classList.remove('text-decoration-line-through');
  }
}

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
/* harmony import */ var _listConstructor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./listConstructor */ 2212);
/* harmony import */ var _uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uiCommonFunctions */ 4656);
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
    const uiList = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.sortParam)((0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.loadList)(), 'checked');
    if (currentFilter !== null) {
      filterArray(uiList, currentFilter.key, currentFilter.value)
        .forEach((obj) => {
          const index = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.loadList)().findIndex((item) => item.id === obj.id);
          (0,_listConstructor__WEBPACK_IMPORTED_MODULE_1__["default"])(obj, index);
        });
    } else {
      uiList.forEach((obj) => {
        const index = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.loadList)().findIndex((item) => item.id === obj.id);
        (0,_listConstructor__WEBPACK_IMPORTED_MODULE_1__["default"])(obj, index);
      });
    }
  }

  function update(filter, value) {
    (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.clearContent)(_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.list);
    if (typeof filter !== 'undefined') setCurrentFilter(filter, value);
    load();
    (0,_JSONFunctions__WEBPACK_IMPORTED_MODULE_0__.populateStorage)();
    console.warn('Updated!');
  }

  return {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL3N0eWxlLnNjc3M/M2M1NSIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL0pTT05GdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9jb3JlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvZGF0ZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL2VkaXRDb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL2hhbmRsZXJzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvbGlzdENvbnN0cnVjdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvc2NyaXB0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvdWlDb21tb25GdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy91aUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHRvZG9MaXN0IGZyb20gJy4vY29yZSc7XG4vLyBpbXBvcnQgYWRkTGluZSBmcm9tICcuL3VpTGlzdEdlbmVyYXRvcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBwb3B1bGF0ZVN0b3JhZ2UoKSB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXRhJywgdG9kb0xpc3QudG9KU09OKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzdG9yZVN0b3JhZ2UoKSB7XG4gIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGF0YScpID09PSBudWxsKSByZXR1cm47XG4gIHRvZG9MaXN0LnJlc3RvcmUobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhdGEnKSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25uZWN0KCkge1xuICBjb25zdCByZXF1ZXN0VVJMID0gJy4vYXNzZXRzL2RhdGEuanNvbic7XG4gIGNvbnN0IHJlcXVlc3QgPSBhd2FpdCBmZXRjaChyZXF1ZXN0VVJMKTtcbiAgaWYgKCFyZXF1ZXN0Lm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBIVFRQIGVycm9yISBTdGF0dXM6ICR7cmVxdWVzdC5zdGF0dXN9YCk7XG4gIH1cblxuICByZXR1cm4gcmVxdWVzdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBvcHVsYXRlKCkge1xuICBjb25zdCB2YWx1ZSA9IGF3YWl0IGNvbm5lY3QoKTtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGVzdCgpIHtcbiAgdG9kb0xpc3QucmVzdG9yZShwb3B1bGF0ZSgpKTtcbn1cbiIsImZ1bmN0aW9uIENyZWF0ZUl0ZW0obnVtLCB0ZXh0LCBkZWFkbGluZSA9IDAsIHByaW9yaXR5TnVtID0gMCwgcHJvamVjdCA9IG51bGwsIGNoZWNrID0gZmFsc2UpIHtcbiAgbGV0IHRpdGxlID0gdGV4dDtcbiAgbGV0IGR1ZURhdGUgPSBkZWFkbGluZTtcbiAgbGV0IHByb2plY3ROYW1lID0gcHJvamVjdDtcbiAgbGV0IHByaW9yaXR5ID0gcHJpb3JpdHlOdW07XG4gIGxldCBjaGVja2VkID0gY2hlY2s7XG4gIGNvbnN0IGlkID0gbnVtLnRvU3RyaW5nKCk7XG4gIGNvbnN0IG5vdGVzID0gW107XG5cbiAgZnVuY3Rpb24gZWRpdFRpdGxlKHZhbCkgeyB0aXRsZSA9IHZhbDsgfVxuICBjb25zdCBnZXRUaXRsZSA9ICgpID0+IHRpdGxlO1xuICBmdW5jdGlvbiBlZGl0UHJpb3JpdHkodmFsKSB7IHByaW9yaXR5ID0gdmFsOyB9XG4gIGNvbnN0IGdldFByaW9yaXR5ID0gKCkgPT4gcHJpb3JpdHk7XG4gIGZ1bmN0aW9uIGRlbGV0ZUR1b0RhdGUoKSB7IGR1ZURhdGUgPSAwOyB9XG4gIGZ1bmN0aW9uIGVkaXREdWVEYXRlKHZhbCkgeyBkdWVEYXRlID0gdmFsOyB9XG4gIGNvbnN0IGdldER1ZURhdGUgPSAoKSA9PiBkdWVEYXRlO1xuICBmdW5jdGlvbiBlZGl0UHJvamVjdCh2YWwpIHsgcHJvamVjdE5hbWUgPSB2YWw7IH1cbiAgY29uc3QgZ2V0UHJvamVjdCA9ICgpID0+IHByb2plY3ROYW1lO1xuICBmdW5jdGlvbiBlZGl0Q2hlY2soKSB7IGNoZWNrZWQgPSAhY2hlY2tlZDsgfVxuICBjb25zdCBnZXRDaGVjayA9ICgpID0+IGNoZWNrZWQ7XG4gIGZ1bmN0aW9uIGFkZE5vdGUodmFsKSB7IG5vdGVzLnB1c2godmFsKTsgfVxuICBmdW5jdGlvbiBkZWxldGVOb3RlKHBvcykgeyBub3Rlcy5zcGxpY2UocG9zLCAxKTsgfVxuICBmdW5jdGlvbiBlZGl0Tm90ZShwb3MsIHZhbCkgeyBub3Rlc1twb3NdID0gdmFsOyB9XG4gIGNvbnN0IGdldEFsbE5vdGVzID0gKCkgPT4gbm90ZXM7XG4gIGNvbnN0IGdldE5vdGUgPSAocG9zKSA9PiBub3Rlc1twb3NdO1xuICBjb25zdCBnZXRJZCA9ICgpID0+IGlkO1xuXG4gIHJldHVybiB7XG4gICAgYWRkTm90ZSxcbiAgICBlZGl0Tm90ZSxcbiAgICBnZXROb3RlLFxuICAgIGRlbGV0ZU5vdGUsXG4gICAgZ2V0QWxsTm90ZXMsXG5cbiAgICBlZGl0VGl0bGUsXG4gICAgZ2V0VGl0bGUsXG5cbiAgICBlZGl0RHVlRGF0ZSxcbiAgICBkZWxldGVEdW9EYXRlLFxuICAgIGdldER1ZURhdGUsXG5cbiAgICBlZGl0UHJvamVjdCxcbiAgICBnZXRQcm9qZWN0LFxuXG4gICAgZWRpdFByaW9yaXR5LFxuICAgIGdldFByaW9yaXR5LFxuXG4gICAgZWRpdENoZWNrLFxuICAgIGdldENoZWNrLFxuXG4gICAgZ2V0SWQsXG4gIH07XG59XG5cbmNvbnN0IHRvZG9MaXN0ID0gKCgpID0+IHtcbiAgY29uc3QgbGlzdCA9IFtdO1xuXG4gIGZ1bmN0aW9uIGZpbmRPYmpQb3MoaWRWYWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGxpc3RbaV0uZ2V0SWQoKSA9PT0gaWRWYWx1ZSkgcmV0dXJuIGk7XG4gICAgfVxuICAgIHRocm93IEVycm9yKCdPYmplY3Qgbm90IGZvdW5kJyk7XG4gIH1cblxuICBmdW5jdGlvbiByZXR1cm5PYmooaXRlbSkge1xuICAgIGNvbnN0IHRpdGxlID0gaXRlbS5nZXRUaXRsZSgpO1xuICAgIGNvbnN0IHByb2plY3QgPSBpdGVtLmdldFByb2plY3QoKTtcbiAgICBjb25zdCBkdWVEYXRlID0gaXRlbS5nZXREdWVEYXRlKCk7XG4gICAgY29uc3QgcHJpb3JpdHkgPSBpdGVtLmdldFByaW9yaXR5KCk7XG4gICAgY29uc3QgY2hlY2tlZCA9IGl0ZW0uZ2V0Q2hlY2soKTtcbiAgICBjb25zdCBub3RlcyA9IGl0ZW0uZ2V0QWxsTm90ZXMoKTtcbiAgICBjb25zdCBpZCA9IGl0ZW0uZ2V0SWQoKTtcblxuICAgIHJldHVybiB7XG4gICAgICBpZCwgdGl0bGUsIHByb2plY3QsIGR1ZURhdGUsIHByaW9yaXR5LCBjaGVja2VkLCBub3RlcyxcbiAgICB9O1xuICB9XG4gIGNvbnN0IGdldEl0ZW0gPSAoaWQpID0+IHJldHVybk9iaihsaXN0W2ZpbmRPYmpQb3MoaWQpXSk7XG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxpc3QubGVuZ3RoO1xuICBmdW5jdGlvbiBzZXRDaGVja2VkKGlkKSB7IGxpc3RbZmluZE9ialBvcyhpZCldLmVkaXRDaGVjaygpOyB9XG4gIGNvbnN0IGFsbFRhc2tzTGlzdCA9ICgpID0+IGxpc3QubWFwKChvYmopID0+IChyZXR1cm5PYmoob2JqKSkpO1xuICBmdW5jdGlvbiByZXNldCgpIHsgbGlzdC5sZW5ndGggPSAwOyB9XG5cbiAgY29uc3QgZ2V0UHJvamVjdHMgPSAoKSA9PiBsaXN0Lm1hcCgoaXRlbSkgPT4gaXRlbS5nZXRQcm9qZWN0KCkpXG4gICAgLmZpbHRlcigodmFsdWUsIHBvcywgc2VsZikgPT4gdmFsdWUgIT09IG51bGwgJiYgc2VsZi5pbmRleE9mKHZhbHVlKSA9PT0gcG9zKTtcblxuICBmdW5jdGlvbiBhZGRJdGVtKG9iaikge1xuICAgIGNvbnN0IGlkID0gbGlzdC5sZW5ndGg7XG4gICAgY29uc3QgbmV3SXRlbSA9IENyZWF0ZUl0ZW0oaWQsIG9iai50aXRsZSwgb2JqLmR1ZURhdGUsIG9iai5wcmlvcml0eSwgb2JqLnByb2plY3QsIG9iai5jaGVja2VkKTtcbiAgICBsaXN0LnB1c2gobmV3SXRlbSk7XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0SXRlbShvYmpJRCwgbmV3T2JqKSB7XG4gICAgY29uc3Qgb2JqVG9FZGl0ID0gbGlzdFtmaW5kT2JqUG9zKG9iaklEKV07XG4gICAgY29uc3QgaXRlbSA9IHJldHVybk9iaihvYmpUb0VkaXQpO1xuICAgIE9iamVjdC5rZXlzKG5ld09iaikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoaXRlbVtrZXldICE9PSB1bmRlZmluZWQgJiYgaXRlbVtrZXldICE9PSBuZXdPYmpba2V5XSkge1xuICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgIGNhc2UgJ3RpdGxlJzpcbiAgICAgICAgICAgIG9ialRvRWRpdC5lZGl0VGl0bGUobmV3T2JqW2tleV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncHJvamVjdCc6XG4gICAgICAgICAgICBvYmpUb0VkaXQuZWRpdFByb2plY3QobmV3T2JqW2tleV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnZHVlRGF0ZSc6XG4gICAgICAgICAgICBvYmpUb0VkaXQuZWRpdER1ZURhdGUobmV3T2JqW2tleV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncHJpb3JpdHknOlxuICAgICAgICAgICAgb2JqVG9FZGl0LmVkaXRQcmlvcml0eShuZXdPYmpba2V5XSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0NoYXZlIGludsOhbGlkYScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0Tm90ZShpZCwgcG9zLCB2YWwpIHtcbiAgICBsaXN0W2ZpbmRPYmpQb3MoaWQpXS5lZGl0Tm90ZShwb3MsIHZhbCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWxldGVJdGVtKGlkKSB7XG4gICAgbGlzdC5zcGxpY2UoZmluZE9ialBvcyhpZCksIDEpO1xuICB9XG5cbiAgY29uc3QgdG9KU09OID0gKCkgPT4ge1xuICAgIGNvbnN0IGxpc3REYXRhID0gbGlzdC5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICBpZDogaXRlbS5nZXRJZCgpLFxuICAgICAgdGl0bGU6IGl0ZW0uZ2V0VGl0bGUoKSxcbiAgICAgIHByb2plY3Q6IGl0ZW0uZ2V0UHJvamVjdCgpLFxuICAgICAgZHVlRGF0ZTogaXRlbS5nZXREdWVEYXRlKCksXG4gICAgICBwcmlvcml0eTogaXRlbS5nZXRQcmlvcml0eSgpLFxuICAgICAgY2hlY2tlZDogaXRlbS5nZXRDaGVjaygpLFxuICAgICAgbm90ZXM6IGl0ZW0uZ2V0QWxsTm90ZXMoKSxcbiAgICB9KSk7XG5cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoeyBsaXN0OiBsaXN0RGF0YSB9LCAnJywgMSk7XG4gIH07XG5cbiAgY29uc3QgcmVzdG9yZSA9IChkYXRhKSA9PiB7XG4gICAgcmVzZXQoKTtcbiAgICBjb25zdCB7IGxpc3Q6IGxpc3REYXRhIH0gPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgIGxpc3REYXRhLmZvckVhY2goXG4gICAgICAoe1xuICAgICAgICBpZCwgdGl0bGUsIHByb2plY3QsIGR1ZURhdGUsIHByaW9yaXR5LCBjaGVja2VkLCBub3RlcyxcbiAgICAgIH0pID0+IHtcbiAgICAgICAgY29uc3QgbmV3SXRlbSA9IENyZWF0ZUl0ZW0oaWQsIHRpdGxlLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCwgY2hlY2tlZCk7XG4gICAgICAgIG5vdGVzLmZvckVhY2goKG5vdGUpID0+IG5ld0l0ZW0uYWRkTm90ZShub3RlKSk7XG4gICAgICAgIGxpc3QucHVzaChuZXdJdGVtKTtcbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGdldExlbmd0aCxcbiAgICBlZGl0Tm90ZSxcbiAgICBlZGl0SXRlbSxcbiAgICBhZGRJdGVtLFxuICAgIGRlbGV0ZUl0ZW0sXG4gICAgcmVzdG9yZSxcbiAgICB0b0pTT04sXG4gICAgc2V0Q2hlY2tlZCxcbiAgICBnZXRQcm9qZWN0cyxcbiAgICByZXNldCxcbiAgICByZXR1cm5PYmosXG4gICAgYWxsVGFza3NMaXN0LFxuICAgIGdldEl0ZW0sXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCB0b2RvTGlzdDtcbiIsIi8vIGltcG9ydCB7IHB0QlIgfSBmcm9tICdkYXRlLWZucy9sb2NhbGUnO1xuaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IElNYXNrIGZyb20gJ2ltYXNrJztcblxuY29uc3Qgc3BsaXRUb0NvZGUgPSAoZGF0ZSkgPT4gZGF0ZS5zcGxpdCgnLycpLnJldmVyc2UoKS5qb2luKCcvJykucmVwbGFjZUFsbCgnLycsICcsICcpO1xuZXhwb3J0IGNvbnN0IHRvSW5wdXQgPSAoZGF0YSkgPT4gZm9ybWF0KG5ldyBEYXRlKHNwbGl0VG9Db2RlKGRhdGEpKSwgJ2RkL0xML3l5eXknKTtcbi8vIGNvbnN0IGdldERhdGEgPSAoYXJyKSA9PiBhcnIuZm9yRWFjaChlbGVtZW50ID0+IHtcblxuLy8gfSk7XG5cbmV4cG9ydCBjb25zdCBtYXNrRGF0ZSA9IHtcbiAgbWFzazogJ2QvYG0vYFknLFxuICBibG9ja3M6IHtcbiAgICBkOiB7XG4gICAgICBtYXNrOiBJTWFzay5NYXNrZWRSYW5nZSxcbiAgICAgIHBsYWNlaG9sZGVyQ2hhcjogJ2QnLFxuICAgICAgZnJvbTogMSxcbiAgICAgIHRvOiAzMSxcbiAgICAgIG1heExlbmd0aDogMixcbiAgICB9LFxuICAgIG06IHtcbiAgICAgIG1hc2s6IElNYXNrLk1hc2tlZFJhbmdlLFxuICAgICAgcGxhY2Vob2xkZXJDaGFyOiAnbScsXG4gICAgICBmcm9tOiAxLFxuICAgICAgdG86IDEyLFxuICAgICAgbWF4TGVuZ3RoOiAyLFxuICAgIH0sXG4gICAgWToge1xuICAgICAgbWFzazogSU1hc2suTWFza2VkUmFuZ2UsXG4gICAgICBwbGFjZWhvbGRlckNoYXI6ICdhJyxcbiAgICAgIGZyb206IDEwMDAsXG4gICAgICB0bzogOTk5OSxcbiAgICB9LFxuICB9LFxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1jeWNsZSAqL1xuaW1wb3J0IHRvZG9MaXN0IGZyb20gJy4vY29yZSc7XG5pbXBvcnQge1xuICBjcmVhdGVFbGVtZW50LCBjcmVhdGVQcmlvcml0eVNlbGVjdCwgZHVlRGF0ZU1hc2ssIHNlYXJjaFByb2plY3RzLFxufSBmcm9tICcuL3VpQ29tbW9uRnVuY3Rpb25zJztcbmltcG9ydCB1aUNvbnRyb2wgZnJvbSAnLi91aUNvbnRyb2xsZXInO1xuXG5mdW5jdGlvbiBzYXZlKHRpdGxlLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCwgbm90ZXMsIGlkKSB7XG4gIGNvbnN0IG5ld09iaiA9IHtcbiAgICB0aXRsZTogdGl0bGUudmFsdWUsXG4gICAgZHVlRGF0ZTogZHVlRGF0ZS52YWx1ZSxcbiAgICBwcmlvcml0eTogcHJpb3JpdHkudmFsdWUsXG4gICAgcHJvamVjdDogcHJvamVjdC52YWx1ZSxcbiAgICBub3RlcyxcbiAgfTtcbiAgaWYgKGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICB0b2RvTGlzdC5lZGl0SXRlbShpZCwgbmV3T2JqKTtcbiAgfSBlbHNlIHtcbiAgICB0b2RvTGlzdC5hZGRJdGVtKG5ld09iaik7XG4gIH1cbiAgdWlDb250cm9sLnVwZGF0ZSgpO1xufVxuXG5mdW5jdGlvbiB1aUVkaXRJdGVtKHRpdGxlLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCwgbm90ZXMsIGlkKSB7XG4gIGNvbnNvbGUubG9nKGAgdWlFZGl0SXRlbVxuICAgIGlkOiAke2lkfVxuICAgIHRpdGxlOiAke3RpdGxlfVxuICAgIGR1ZURhdGU6ICR7ZHVlRGF0ZX1cbiAgICBwcmlvcml0eTogJHtwcmlvcml0eX1cbiAgICBwcm9qZWN0OiAke3Byb2plY3R9XG4gICAgbm90ZXMgJHtub3Rlc31cbiAgYCk7XG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2Lm1vZGFsLWJvZHknKTtcbiAgLy8gY3JlYXRpbmcgZWxlbWVudHNcbiAgY29uc3Qgcm93MSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncm93J10pO1xuICBjb25zdCB0aXRsZURpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnaW5wdXQtZ3JvdXAnLCAnbWItMycsICdnYXAtMSddKTtcbiAgY29uc3QgdGl0bGVJbnB1dCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgWydmb3JtLWNvbnRyb2wnXSwge1xuICAgIGlkOiAnaXRlbVRpdGxlJyxcbiAgICB0eXBlOiAndGV4dCcsXG4gICAgcGxhY2Vob2xkZXI6ICdOb3ZhIFRhcmVmYS4uLicsXG4gIH0pO1xuICBjb25zdCByb3cyID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydiZy1ncmF5JywgJ3JvdycsICdnLTAnLCAnZ2FwLTInLCAnZmxleC1ub3dyYXAnXSk7XG5cbiAgY29uc3QgZGF0ZURpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZGF0ZScsICdmbGF0cGlja3InLCAnY29sJ10pO1xuICBjb25zdCBkYXRlSW5wdXQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIFsnZm9ybS1jb250cm9sJywgJ2ZsYXRwaWNrci1pbnB1dCddLCB7XG4gICAgaWQ6ICdkdWVEYXRlJyxcbiAgICB0eXBlOiAndGV4dCcsXG4gICAgaW5wdXRtb2RlOiAnbnVtZXJpYycsXG4gICAgJ2RhdGEtaW5wdXQnOiB1bmRlZmluZWQsXG4gICAgYXV0b2NvbXBsZXRlOiAnb2ZmJyxcbiAgfSk7XG4gIGNvbnN0IGRhdGVwaWNrZXJUb2dnbGUgPSBjcmVhdGVFbGVtZW50KCdhJywgWydpbnB1dC1idXR0b24nXSwge1xuICAgIHRpdGxlOiAndG9nZ2xlJyxcbiAgICAnZGF0YS10b2dnbGUnOiB1bmRlZmluZWQsXG4gIH0pO1xuICBjb25zdCBkYXRlSWNvbiA9IGNyZWF0ZUVsZW1lbnQoJ2knLCBbJ3RleHQtd2FybmluZycsICdzbWFsbCcsICdiaScsICdiaS1jYWxlbmRhciddKTtcblxuICBjb25zdCBwcmlvcml0eURpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29sJ10pO1xuICBjb25zdCBwcmlvcml0eVNlbGVjdCA9IGNyZWF0ZVByaW9yaXR5U2VsZWN0KHByaW9yaXR5KTtcblxuICBjb25zdCBwcm9qZWN0RGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydjb2wnXSk7XG4gIGNvbnN0IHByb2plY3RJbnB1dCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgWydmb3JtLWNvbnRyb2wnXSwge1xuICAgIGlkOiAnZW50ZXJQcm9qZWN0JyxcbiAgICB0eXBlOiAndGV4dCcsXG4gICAgbGlzdDogJ2RhdGFsaXN0T3B0aW9ucycsXG4gICAgcGxhY2Vob2xkZXI6ICdQcm9qZXRvJyxcbiAgICBhdXRvY29tcGxldGU6ICdvZmYnLFxuICB9KTtcbiAgY29uc3QgcHJvamVjdERhdGFsaXN0ID0gY3JlYXRlRWxlbWVudCgnZGF0YWxpc3QnLCBbJ3N1Z2dlc3Rpb25zJywgJ2Zvcm0nXSwge1xuICAgIGlkOiAnZGF0YWxpc3RPcHRpb25zJyxcbiAgICBkcm9wem9uZTogJ3N0cmluZycsXG4gIH0pO1xuXG4gIGNvbnN0IHJvdzMgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3JvdycsICdwdC0yJ10pO1xuXG4gIGNvbnN0IG5vdGVzQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydjb250YWluZXInXSk7XG4gIGNvbnN0IG5vdGVzSGVhZGVyID0gY3JlYXRlRWxlbWVudCgnaDYnKTtcbiAgY29uc3Qgbm90ZXNSb3cgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3JvdycsICdnLTInXSk7XG4gIGNvbnN0IG5vdGVzTGlzdCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnbm90ZXNMaXN0J10pO1xuXG4gIGNvbnN0IGFkZE5vdGVSb3cgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3JvdycsICdwdC0yJywgJ2p1c3RpZnktY29udGVudC1lbmQnXSk7XG5cbiAgY29uc3QgYWRkTm90ZURpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29sLWF1dG8nLCAnc21hbGwnLCAndGV4dC1kYW5nZXInLCAndGV4dC13YXJuaW5nLWVtcGhhc2lzJ10pO1xuICBjb25zdCBhZGROb3RlTGluayA9IGNyZWF0ZUVsZW1lbnQoJ2EnLCBbXSwgeyBpZDogJ2FkZE5vdGUnIH0pO1xuICBjb25zdCBhZGROb3RlSWNvbiA9IGNyZWF0ZUVsZW1lbnQoJ2knLCBbJ2JpJywgJ2JpLXBsdXMtY2lyY2xlJ10pO1xuICBjb25zdCBhZGROb3RlVGV4dCA9IGNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICBjb25zdCByb3c0ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnLCAnZy0yJywgJ3B0LTMnLCAnanVzdGlmeS1jb250ZW50LXN0YXJ0JywgJ2ZsZXgtcm93LXJldmVyc2UnXSk7XG5cbiAgY29uc3Qgc2F2ZURpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29sLWF1dG8nXSk7XG4gIGNvbnN0IHNhdmVCdG4gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2J0bicsICdidG4td2FybmluZycsICd0ZXh0LWxpZ2h0J10sIHtcbiAgICAnZGF0YS1icy1kaXNtaXNzJzogJ21vZGFsJyxcbiAgfSk7XG4gIGNvbnN0IGNhbmNlbERpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29sLWF1dG8nXSk7XG4gIGNvbnN0IGNhbmNlbEJ0biA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIFsnYnRuJywgJ2J0bi1zZWNvbmRhcnknLCAndGV4dC1saWdodCddLCB7XG4gICAgJ2RhdGEtYnMtZGlzbWlzcyc6ICdtb2RhbCcsXG4gIH0pO1xuXG4gIC8vIGFwcGVuZCBlbGVtZW50c1xuXG4gIC8vIHJvdyAxICh0aXRsZSlcbiAgaWYgKHRpdGxlICYmICh0eXBlb2YgdGl0bGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0aXRsZS52YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgdGl0bGVJbnB1dC52YWx1ZSA9IHR5cGVvZiB0aXRsZSA9PT0gJ3N0cmluZycgPyB0aXRsZSA6IHRpdGxlLnZhbHVlO1xuICB9XG4gIHRpdGxlRGl2LmFwcGVuZENoaWxkKHRpdGxlSW5wdXQpO1xuXG4gIHJvdzEuYXBwZW5kQ2hpbGQodGl0bGVEaXYpO1xuXG4gIC8vIHJvdyAyIChkYXRlLCBwcmlvcml0eSwgcHJvamVjdClcblxuICAvLyBkYXRlXG4gIGlmIChkdWVEYXRlICE9PSB1bmRlZmluZWQgJiYgZHVlRGF0ZSAhPT0gMCkge1xuICAgIGRhdGVJbnB1dC52YWx1ZSA9IGR1ZURhdGU7XG4gIH1cbiAgZGF0ZXBpY2tlclRvZ2dsZS5hcHBlbmRDaGlsZChkYXRlSWNvbik7XG4gIGRhdGVEaXYuYXBwZW5kKGRhdGVJbnB1dCwgZGF0ZXBpY2tlclRvZ2dsZSk7XG5cbiAgLy8gcHJpb3JpdHlcbiAgcHJpb3JpdHlEaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlTZWxlY3QpO1xuXG4gIC8vIHByb2plY3RcbiAgLy8gY29uc29sZS5sb2cocHJvamVjdCk7XG4gIGlmICh0eXBlb2YgcHJvamVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvamVjdCAhPT0gMCkgcHJvamVjdElucHV0LnZhbHVlID0gcHJvamVjdDtcbiAgcHJvamVjdERpdi5hcHBlbmQocHJvamVjdElucHV0LCBwcm9qZWN0RGF0YWxpc3QpO1xuXG4gIHJvdzIuYXBwZW5kKGRhdGVEaXYsIHByaW9yaXR5RGl2LCBwcm9qZWN0RGl2KTtcblxuICAvLyByb3czIChub3RlcyBhcmVhKVxuICBub3Rlc0hlYWRlci50ZXh0Q29udGVudCA9ICdOb3Rhcyc7XG4gIGFkZE5vdGVUZXh0LnRleHRDb250ZW50ID0gJ05vdmEgbm90YSc7XG4gIGFkZE5vdGVJY29uLnRleHRDb250ZW50ID0gJyAnOyAvLyBmaXhpbmcgYSBwcm9ibGVtIGZvciB1c2luZyBqc1xuXG4gIGFkZE5vdGVMaW5rLmFwcGVuZChhZGROb3RlSWNvbiwgYWRkTm90ZVRleHQpO1xuICBhZGROb3RlRGl2LmFwcGVuZENoaWxkKGFkZE5vdGVMaW5rKTtcbiAgYWRkTm90ZVJvdy5hcHBlbmRDaGlsZChhZGROb3RlRGl2KTtcbiAgaWYgKG5vdGVzKSB7XG4gICAgbm90ZXMuZm9yRWFjaCgobm90ZSkgPT4ge1xuICAgICAgLy8gcHJlY2lzbyBjaXJhciBvIGxheW91dCBkYXMgbm90YXNcbiAgICAgIG5vdGVzTGlzdC5pbm5lckhUTUwgKz0gYDxzcGFuPiR7bm90ZX08L3NwYW4+YDtcbiAgICB9KTtcbiAgfVxuICBub3Rlc1Jvdy5hcHBlbmQobm90ZXNMaXN0LCBhZGROb3RlUm93KTtcbiAgbm90ZXNDb250YWluZXIuYXBwZW5kKG5vdGVzSGVhZGVyLCBub3Rlc1Jvdyk7XG5cbiAgcm93My5hcHBlbmRDaGlsZChub3Rlc0NvbnRhaW5lcik7XG5cbiAgLy8gcm93NCAoYnV0dG9ucylcbiAgY2FuY2VsQnRuLnRleHRDb250ZW50ID0gJ0NhbmNlbCc7XG4gIHNhdmVCdG4udGV4dENvbnRlbnQgPSAnU2F2ZSc7XG4gIGlmIChpZCAhPT0gdW5kZWZpbmVkKSBzYXZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc2F2ZSh0aXRsZUlucHV0LCBkYXRlSW5wdXQsIHByaW9yaXR5U2VsZWN0LCBwcm9qZWN0SW5wdXQsIG5vdGVzLCBpZCkpO1xuICBlbHNlIHNhdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzYXZlKHRpdGxlSW5wdXQsIGRhdGVJbnB1dCwgcHJpb3JpdHlTZWxlY3QsIHByb2plY3RJbnB1dCkpO1xuICBzYXZlRGl2LmFwcGVuZENoaWxkKHNhdmVCdG4pO1xuICBjYW5jZWxEaXYuYXBwZW5kQ2hpbGQoY2FuY2VsQnRuKTtcblxuICByb3c0LmFwcGVuZChzYXZlRGl2LCBjYW5jZWxEaXYpO1xuXG4gIG1vZGFsLmFwcGVuZChyb3cxLCByb3cyLCByb3czLCByb3c0KTtcbiAgZHVlRGF0ZU1hc2soKTtcbiAgc2VhcmNoUHJvamVjdHMoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdWlFZGl0SXRlbTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1jeWNsZSAqL1xuaW1wb3J0IHRvZG9MaXN0IGZyb20gJy4vY29yZSc7XG5pbXBvcnQgdWlFZGl0SXRlbSBmcm9tICcuL2VkaXRDb25zdHJ1Y3Rvcic7XG5pbXBvcnQgeyBzZXRMaW5lVGhyb3VnaCB9IGZyb20gJy4vdWlDb21tb25GdW5jdGlvbnMnO1xuaW1wb3J0IHVpQ29udHJvbCBmcm9tICcuL3VpQ29udHJvbGxlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRDaGVja2VkSGFuZGxlcihlKSB7XG4gIGNvbnN0IHsgdGFyZ2V0IH0gPSBlO1xuICBjb25zdCBpZCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcbiAgdG9kb0xpc3Quc2V0Q2hlY2tlZChpZCk7XG4gIHNldExpbmVUaHJvdWdoKHRhcmdldCk7XG59XG5cbi8vIGhvbWUgYnV0dG9uc1xuZXhwb3J0IGZ1bmN0aW9uIGVkaXRNb3JlKHRpdGxlKSB7XG4gIHVpRWRpdEl0ZW0odGl0bGUpO1xuICB0aXRsZS52YWx1ZSA9ICcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmFzdFNhdmUodGl0bGUpIHtcbiAgdG9kb0xpc3QuYWRkSXRlbSh0aXRsZS52YWx1ZSk7XG4gIHVpQ29udHJvbC51cGRhdGUoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVkaXQoZWxlbSkge1xuICBlbGVtLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICBjb25zdCB7IHRhcmdldCB9ID0gZWxlbTtcbiAgY29uc3Qgb2JqID0gdG9kb0xpc3QuZ2V0SXRlbSh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJykpO1xuICBjb25zb2xlLmxvZyhvYmopO1xuICB1aUVkaXRJdGVtKG9iai50aXRsZSwgb2JqLmR1ZURhdGUsIG9iai5wcmlvcml0eSwgb2JqLnByb2plY3QsIG9iai5ub3Rlcywgb2JqLmlkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUl0ZW0oaXRlbSkge1xuICBjb25zdCB7IHRhcmdldCB9ID0gaXRlbTtcbiAgdG9kb0xpc3QuZGVsZXRlSXRlbSh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJykpO1xuICB1aUNvbnRyb2wudXBkYXRlKCk7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tY3ljbGUgKi9cbmltcG9ydCB7IHBvcHVsYXRlU3RvcmFnZSB9IGZyb20gJy4vSlNPTkZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBkZWxldGVJdGVtLCBlZGl0LCBzZXRDaGVja2VkSGFuZGxlciB9IGZyb20gJy4vaGFuZGxlcnMnO1xuaW1wb3J0IHtcbiAgYWRkQ2hlY2tlZCwgY3JlYXRlRWxlbWVudCwgaGFzTm90ZXMsIGlzQ2hlY2tlZCwgbGlzdCxcbn0gZnJvbSAnLi91aUNvbW1vbkZ1bmN0aW9ucyc7XG5cbmZ1bmN0aW9uIGluc2VydE5vdGUobm90ZXMsIGJvZHkpIHtcbiAgbm90ZXMuZm9yRWFjaCgoY29udGVudCkgPT4ge1xuICAgIGNvbnN0IGNvbnRlbnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250ZW50RGl2LmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgYm9keS5hcHBlbmRDaGlsZChjb250ZW50RGl2KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZExpbmUob2JqKSB7XG4gIC8vIGhlYWRlclxuICBjb25zdCBpdGVtID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydhY2NvcmRpb24taXRlbSddKTtcbiAgY29uc3QgaGVhZGVyID0gY3JlYXRlRWxlbWVudCgnaDInLCBbJ2FjY29yZGlvbi1oZWFkZXInLCAncC0xJywgJ2QtZmxleCcsICdhbGlnbi1pdGVtcy1jZW50ZXInLCAnZ2FwLTEnXSk7XG4gIGNvbnN0IGNoZWNrYm94ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2Zvcm0tY2hlY2staW5wdXQnLCAndGV4dC1iZy13YXJuaW5nJ10sIHtcbiAgICB0eXBlOiAnY2hlY2tib3gnLFxuICAgICdkYXRhLWlkJzogYCR7b2JqLmlkfWAsXG4gIH0pO1xuICBjb25zdCBidG5IZWFkZXIgPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2FjY29yZGlvbi1idXR0b24nLCAnY29sbGFwc2VkJywgJ2ZsZXgtZmlsbCddLCB7XG4gICAgdHlwZTogJ2J1dHRvbicsXG4gICAgJ2RhdGEtYnMtdG9nZ2xlJzogJ2NvbGxhcHNlJyxcbiAgICAnYXJpYS1leHBhbmRlZCc6ICdmYWxzZScsXG4gICAgJ2RhdGEtYnMtdGFyZ2V0JzogYCNpdGVtLSR7b2JqLmlkfWAsXG4gIH0pO1xuICBjb25zdCBzcGFuID0gY3JlYXRlRWxlbWVudCgnc3BhbicsIFsnZmxleC1maWxsJ10pO1xuICBjb25zdCBjb2RlID0gY3JlYXRlRWxlbWVudCgnY29kZScsIFsnc21hbGwnLCAndGV4dC1tdXRlZCddKTtcblxuICAvLyBib2R5XG4gIGNvbnN0IGl0ZW1EZXRhaWxzID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydhY2NvcmRpb24tY29sbGFwc2UnLCAnY29sbGFwc2UnXSwge1xuICAgIGlkOiBgaXRlbS0ke29iai5pZH1gLFxuICAgICdkYXRhLWJzLXBhcmVudCc6ICcjbGlzdCcsXG4gIH0pO1xuICBjb25zdCBpdGVtQm9keSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnYWNjb3JkaW9uLWJvZHknXSk7XG4gIGNvbnN0IGVkaXREZWxldGVJdGVtID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydkLWZsZXgnLCAnZmxleC1yb3ctcmV2ZXJzZScsICdjb2wnLCAnZ2FwLTInXSk7XG5cbiAgY29uc3QgYnRuRWRpdCA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIFsnYnRuJywgJ2J0bi13YXJuaW5nJ10sIHtcbiAgICAnZGF0YS1pZCc6IG9iai5pZCxcbiAgICAnZGF0YS1icy10YXJnZXQnOiAnI2V4YW1wbGVNb2RhbCcsXG4gICAgJ2RhdGEtYnMtdG9nZ2xlJzogJ21vZGFsJyxcbiAgfSk7XG4gIGNvbnN0IGJ0bkRlbGV0ZSA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIFsnYnRuJywgJ2J0bi1kYW5nZXInXSwge1xuICAgICdkYXRhLWlkJzogb2JqLmlkLFxuICB9KTtcblxuICAvLyBFVkVOVExJU1RORVJTIE9CSkVDVFNcbiAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgc2V0Q2hlY2tlZEhhbmRsZXIpO1xuICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBwb3B1bGF0ZVN0b3JhZ2UpO1xuXG4gIC8vIEZJTExJTkcgQ09OVEVOVFxuICAvLyBoZWFkZXJcbiAgc3Bhbi50ZXh0Q29udGVudCA9IG9iai50aXRsZTtcbiAgY29kZS50ZXh0Q29udGVudCA9IG9iai5wcm9qZWN0O1xuXG4gIC8vIGJvZHlcbiAgYnRuRWRpdC50ZXh0Q29udGVudCA9ICdFZGl0JztcbiAgYnRuRGVsZXRlLnRleHRDb250ZW50ID0gJ0RlbGV0ZSc7XG5cbiAgLy8gQXBwZW5kaW5nIGNvbnRlbnRcbiAgYnRuSGVhZGVyLmFwcGVuZChzcGFuLCBjb2RlKTtcbiAgaGVhZGVyLmFwcGVuZChjaGVja2JveCwgYnRuSGVhZGVyKTtcblxuICAvLyBCb2R5IGNvbnRlbnRcbiAgaWYgKGhhc05vdGVzKG9iai5ub3RlcykpIHtcbiAgICBpbnNlcnROb3RlKG9iai5ub3RlcywgaXRlbUJvZHkpO1xuICB9XG4gIGJ0bkVkaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZWxlbSkgPT4ge1xuICAgIGVkaXQoZWxlbSk7XG4gIH0pO1xuICBidG5EZWxldGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkZWxldGVJdGVtKTtcbiAgZWRpdERlbGV0ZUl0ZW0uYXBwZW5kKGJ0bkRlbGV0ZSwgYnRuRWRpdCk7XG4gIGl0ZW1Cb2R5LmFwcGVuZENoaWxkKGVkaXREZWxldGVJdGVtKTtcbiAgaXRlbURldGFpbHMuYXBwZW5kQ2hpbGQoaXRlbUJvZHkpO1xuXG4gIC8vIEFwcGVuZCBlbGVtZW50cyB0byBsaXN0XG4gIGl0ZW0uYXBwZW5kKGhlYWRlciwgaXRlbURldGFpbHMpO1xuICBsaXN0LmFwcGVuZENoaWxkKGl0ZW0pO1xuICBpZiAoaXNDaGVja2VkKG9iaikpIGFkZENoZWNrZWQoY2hlY2tib3gsIGJ0bkhlYWRlcik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFkZExpbmU7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xuaW1wb3J0IHsgcG9wdWxhdGVTdG9yYWdlLCByZXN0b3JlU3RvcmFnZSB9IGZyb20gJy4vSlNPTkZ1bmN0aW9ucyc7XG5cbmltcG9ydCB7XG4gIGNsZWFyQ29udGVudCxcbiAgc2hvd1BsdXNCdG4sXG4gIGFkZEZpZWxkLFxuICBhZGRUYXNrLFxuICBpbnB1dCxcbiAgYWRkTW9yZSxcbiAgcXVpY2tTYXZlLFxuICBsaXN0LFxufSBmcm9tICcuL3VpQ29tbW9uRnVuY3Rpb25zJztcbmltcG9ydCB1aUVkaXRJdGVtIGZyb20gJy4vZWRpdENvbnN0cnVjdG9yJztcbmltcG9ydCB7IGVkaXRNb3JlLCBmYXN0U2F2ZSB9IGZyb20gJy4vaGFuZGxlcnMnO1xuaW1wb3J0IHVpQ29udHJvbCBmcm9tICcuL3VpQ29udHJvbGxlcic7XG5cbmNvbnN0IHByb2plY3RzSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNwcm9qZWN0cycpO1xuY29uc3QgcHJvamVjdHNEcm9wZG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNwcm9qZWN0cyBkaXYnKTtcbmNvbnN0IG1haW5Nb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNleGFtcGxlTW9kYWwnKTtcblxuLy8gc2V0IG1heCBoZWlnaHQgZm9yIGxpc3QgaXRlbXNcbmZ1bmN0aW9uIHNldE1heEhlaWdodCgpIHtcbiAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gICAgLy8gZ2V0IHBhZGRpbmcgdG9wICsgYm90dG9tIGZvcm0gbWFpbiBlbGVtZW50XG4gICAgbGV0IG1haW5QYWRkaW5nID0gcGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyksIG51bGwpXG4gICAgICAuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy10b3AnKS5tYXRjaCgvXFxkKyhcXC5cXGQrKT8vKSk7XG4gICAgbWFpblBhZGRpbmcgKz0gcGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyksIG51bGwpXG4gICAgICAuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy1ib3R0b20nKS5tYXRjaCgvXFxkKyhcXC5cXGQrKT8vKSk7XG5cbiAgICAvLyBnZXQgb3RoZXIgZWxlbWVudHMgc2l6ZVxuICAgIGNvbnN0IGJvZHlIZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jykub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IGluc2V0SXRlbUhlaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4gPiBkaXYnKS5vZmZzZXRIZWlnaHQ7XG4gICAgY29uc3QgaGVhZGVySGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJykub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IGFzaWRlSGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXNpZGUnKS5vZmZzZXRIZWlnaHQ7XG4gICAgLy8gY29uc3QgZm9vdGVySGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9vdGVyJykub2Zmc2V0SGVpZ2h0O1xuXG4gICAgLy8gc2V0IG1heCBzaXplIGZvciB0YXNrIGxpc3RcbiAgICBjb25zdCBtYXhIZWlnaHQgPSBib2R5SGVpZ2h0IC0gaGVhZGVySGVpZ2h0IC0gaW5zZXRJdGVtSGVpZ2h0IC0gYXNpZGVIZWlnaHQgLSBtYWluUGFkZGluZztcbiAgICBsaXN0LnN0eWxlLm1heEhlaWdodCA9IGAke21heEhlaWdodH1weGA7XG4gIH0gZWxzZSBsaXN0LnN0eWxlLm1heEhlaWdodCA9ICdub25lJztcbn1cblxuLy8gZXZlbnRMaXN0ZW5lcnNcblxuLy8gaG9tZSBwYWdlIGJ1dHRvbiBmdW5jdGlvbnNcbmFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1aUVkaXRJdGVtKTtcbmFkZEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBzaG93UGx1c0J0bik7XG5hZGRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHNob3dQbHVzQnRuKTtcbmFkZE1vcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBlZGl0TW9yZShpbnB1dCkpO1xucXVpY2tTYXZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gZmFzdFNhdmUoaW5wdXQpKTtcblxuLy8gc2V0IGhlaWdodCBsaW1pdCBmb3IgbGlzdCBpdGVtc1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBzZXRNYXhIZWlnaHQpO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHNldE1heEhlaWdodCk7XG5cbi8vIGF1dG8tc2F2ZVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgdWlDb250cm9sLnVwZGF0ZSgpO1xufSk7XG5cbi8vIHJlc3RvcmUgZGF0YSB3aGVuIGl0J3MgbG9hZGVkXG53aW5kb3cub25sb2FkID0gcmVzdG9yZVN0b3JhZ2UoKTtcblxuLy8gbWVudSBmb3IgbW9iaWxlIHZlcnNpb25cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gIGlmICghZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJyNwcm9qZWN0cycpKSB7XG4gICAgcHJvamVjdHNEcm9wZG93bi5jbGFzc0xpc3QuYWRkKCdtZW51LWhpZGUnKTtcbiAgfVxufSk7XG5wcm9qZWN0c0ljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGlmIChwcm9qZWN0c0Ryb3Bkb3duLmNsYXNzTGlzdC5jb250YWlucygnbWVudS1oaWRlJykpIHtcbiAgICBwcm9qZWN0c0Ryb3Bkb3duLmNsYXNzTGlzdC5yZW1vdmUoJ21lbnUtaGlkZScpO1xuICB9IGVsc2Uge1xuICAgIHByb2plY3RzRHJvcGRvd24uY2xhc3NMaXN0LmFkZCgnbWVudS1oaWRlJyk7XG4gIH1cbn0pO1xuXG4vLyBjbGVhciBtb2RhbCBjb250ZW50IGV2ZXJ5dGltZSBpdCdzIGNsb3NlZFxubWFpbk1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2hpZGRlbi5icy5tb2RhbCcsICgpID0+IHtcbiAgY2xlYXJDb250ZW50KG1haW5Nb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtYm9keScpKTtcbn0pO1xuXG4vLyBzdGFydCBhcHBcbnVpQ29udHJvbC5sb2FkKCk7XG4iLCJpbXBvcnQgZmxhdHBpY2tyIGZyb20gJ2ZsYXRwaWNrcic7XG5pbXBvcnQgeyBQb3J0dWd1ZXNlIH0gZnJvbSAnZmxhdHBpY2tyL2Rpc3QvbDEwbi9wdCc7XG5pbXBvcnQgSU1hc2sgZnJvbSAnaW1hc2snO1xuaW1wb3J0IHsgbWFza0RhdGUgfSBmcm9tICcuL2RhdGUnO1xuaW1wb3J0IHRvZG9MaXN0IGZyb20gJy4vY29yZSc7XG5cbmV4cG9ydCBjb25zdCBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2I2xpc3QnKTtcbmV4cG9ydCBjb25zdCBhZGRGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0I2l0ZW1UaXRsZScpO1xuZXhwb3J0IGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcbmV4cG9ydCBjb25zdCBhZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYSNhZGRJdGVtJyk7XG5leHBvcnQgY29uc3QgYWRkTW9yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbiNhZGRNb3JlJyk7XG5leHBvcnQgY29uc3QgcXVpY2tTYXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uI3NhdmVJdGVtJyk7XG5cbmV4cG9ydCBjb25zdCBpc0NoZWNrZWQgPSAoZSkgPT4gZS5jaGVja2VkID09PSB0cnVlO1xuZXhwb3J0IGNvbnN0IGhhc05vdGVzID0gKG9iaikgPT4gb2JqLmxlbmd0aCA+IDA7XG5leHBvcnQgY29uc3QgbG9hZExpc3QgPSAoKSA9PiBbLi4udG9kb0xpc3QuYWxsVGFza3NMaXN0KCldO1xuZXhwb3J0IGNvbnN0IHNvcnRQYXJhbSA9IChhcnIsIHBhcmFtKSA9PiBbLi4uYXJyXVxuICAuc29ydCgoYSwgYikgPT4gKChhW3BhcmFtXSA8IGJbcGFyYW1dKSA/IC0xIDogMSkpO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkQ2hlY2tlZChjaGVja2JveCwgYnV0dG9uKSB7XG4gIGNoZWNrYm94LmNoZWNrZWQgPSB0cnVlO1xuICBidXR0b24uY2xhc3NMaXN0LmFkZCgndGV4dC1kZWNvcmF0aW9uLWxpbmUtdGhyb3VnaCcpO1xufVxuXG5jb25zdCBzcGVjaWFsQ2hhcnNFbnRyaWVzID0gW1xuICBbJ8OAw4HDgsODw4TDhScsICdBJ10sXG4gIFsnw6DDocOiw6PDpMOlJywgJ2EnXSxcbiAgWyfDiMOJw4rDiycsICdFJ10sXG4gIFsnw6jDqcOqw6snLCAnZSddLFxuICBbJ8OMw43DjsOPJywgJ0knXSxcbiAgWyfDrMOtw67DrycsICdpJ10sXG4gIFsnw5LDk8OVw5TDlicsICdPJ10sXG4gIFsnw7LDs8O1w7TDticsICdvJ10sXG4gIFsnw5nDmsObw5wnLCAnVSddLFxuICBbJ8O5w7rDu8O8JywgJ3UnXSxcbiAgWyfDhycsICdDJ10sXG4gIFsnw6cnLCAnYyddLFxuXTtcblxuY29uc3Qgc3BlY2lhbENoYXJzTWFwID0gT2JqZWN0LmZyb21FbnRyaWVzKFxuICBzcGVjaWFsQ2hhcnNFbnRyaWVzLmZsYXRNYXAoKFtjaGFycywgdmFsdWVdKSA9PiBbLi4uY2hhcnNdLm1hcCgoY2hhcikgPT4gW2NoYXIsIHZhbHVlXSkpLFxuKTtcblxuLy8gRUxFTUVOVCBDUkVBVE9SU1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0QXR0cnMoZWxlbSwgYXR0cnMpIHtcbiAgT2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZCAmJiBhdHRyc1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGtleSwgJycpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZywgY2xhc3NOYW1lcyA9IFtdLCBhdHRyaWJ1dGVzID0ge30pIHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgaWYgKGNsYXNzTmFtZXMubGVuZ3RoKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoLi4uY2xhc3NOYW1lcyk7XG4gIHNldEF0dHJzKGVsZW1lbnQsIGF0dHJpYnV0ZXMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU9wdGlvbih2YWx1ZSwgdGV4dCwgc2VsZWN0ZWQpIHtcbiAgY29uc3Qgb3B0aW9uID0gY3JlYXRlRWxlbWVudCgnb3B0aW9uJywgW10sIHsgdmFsdWUgfSk7XG4gIG9wdGlvbi50ZXh0Q29udGVudCA9IHRleHQ7XG4gIGlmIChzZWxlY3RlZCkge1xuICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJycpO1xuICB9XG4gIHJldHVybiBvcHRpb247XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcmlvcml0eVNlbGVjdChudW0gPSAwKSB7XG4gIGNvbnN0IHNlbGVjdCA9IGNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcsIFsnZm9ybS1zZWxlY3QnXSwge1xuICAgICdhcmlhLWxhYmVsJzogJ1ByaW9yaWRhZGUnLFxuICB9KTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpICs9IDEpIHtcbiAgICBjb25zdCB0ZXh0ID0gaSA9PT0gMCA/ICdQcmlvcmlkYWRlJyA6IGBQcmlvcmlkYWRlICR7aX1gO1xuICAgIGNvbnN0IHNlbGVjdGVkID0gaSA9PT0gcGFyc2VJbnQobnVtLCAxMCk7XG4gICAgY29uc3Qgb3B0aW9uID0gY3JlYXRlT3B0aW9uKGksIHRleHQsIHNlbGVjdGVkKTtcbiAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgfVxuICByZXR1cm4gc2VsZWN0O1xufVxuXG4vLyBVSSBGVU5DVElPTlNcblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyQ29udGVudChlbGVtKSB7XG4gIHdoaWxlIChlbGVtLmZpcnN0Q2hpbGQpIHtcbiAgICBlbGVtLnJlbW92ZUNoaWxkKGVsZW0ubGFzdENoaWxkKTtcbiAgfVxufVxuXG4vLyBBREQvRURJVCBORVcgVEFTSyBTQ1JFRU4gRlVOQ1RJT05TXG5cbmZ1bmN0aW9uIHJlbW92ZVNwZWNpYWxzKHRleHQpIHtcbiAgbGV0IHNlYXJjaCA9IHRleHQ7XG4gIHNlYXJjaCA9IHNlYXJjaC5yZXBsYWNlKFxuICAgIC9bw4Atw5zDoC3DvF0vZyxcbiAgICAobWF0Y2gpID0+IHNwZWNpYWxDaGFyc01hcFttYXRjaF0gfHwgbWF0Y2gsXG4gICk7XG4gIHJldHVybiBzZWFyY2g7XG59XG4vLyBwcm9qZWN0cyBkYXRhbGlzdCBhdXRvY29tcGxldGVcbmZ1bmN0aW9uIGF1dG9Db21wbGV0ZShzZWFyY2gpIHtcbiAgY29uc3QgcHJvamVjdHMgPSB0b2RvTGlzdC5nZXRQcm9qZWN0cygpO1xuICByZXR1cm4gcHJvamVjdHMuZmlsdGVyKCh2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHZhbHVlTG93ZXJjYXNlID0gcmVtb3ZlU3BlY2lhbHModmFsdWUudG9Mb3dlckNhc2UoKSk7XG4gICAgY29uc3Qgc2VhcmNoTG93ZXJjYXNlID0gcmVtb3ZlU3BlY2lhbHMoc2VhcmNoLnRvTG93ZXJDYXNlKCkpO1xuICAgIHJldHVybiB2YWx1ZUxvd2VyY2FzZS5pbmNsdWRlcyhzZWFyY2hMb3dlcmNhc2UpO1xuICB9KTtcbn1cblxuLy8gY2FsbGluZyBmdW5jdGlvbnMgdG8gYXV0b2NvbXBsZXRlIFByb2plY3QgZmllbGRcblxuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaFByb2plY3RzKCkge1xuICBjb25zdCBpbnB1dFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW50ZXJQcm9qZWN0Jyk7XG4gIGNvbnN0IGRhdGFsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGF0YWxpc3QnKTtcbiAgaW5wdXRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKHsgdGFyZ2V0IH0pID0+IHtcbiAgICBjb25zdCBpbnB1dERhdGEgPSB0YXJnZXQudmFsdWU7XG4gICAgaWYgKGlucHV0RGF0YS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGF1dG9Db21wbGV0ZU9wdGlvbnMgPSBhdXRvQ29tcGxldGUoaW5wdXREYXRhKTtcbiAgICAgIGRhdGFsaXN0LmlubmVySFRNTCA9IGAke2F1dG9Db21wbGV0ZU9wdGlvbnNcbiAgICAgICAgLm1hcCgodmFsdWUpID0+IGA8b3B0aW9uIHZhbHVlPVwiJHt2YWx1ZX1cIiAvPmApXG4gICAgICAgIC5qb2luKCcnKX1gO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIERBVEVQSUNLRVIgQU5EIE1BU0sgRlVOQ1RJT05TXG5leHBvcnQgZnVuY3Rpb24gZHVlRGF0ZU1hc2soKSB7XG4gIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZHVlRGF0ZScpO1xuICBjb25zdCBmbGF0RWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5mbGF0cGlja3InKTtcblxuICAvLyBhcHBseSBtYXNrIHRvIGR1ZURhdGVGaWVsZFxuICBjb25zdCBtYXNrID0gSU1hc2soZHVlRGF0ZSwgbWFza0RhdGUpO1xuXG4gIC8vIGFwcGx5IGZsYXRwaWNrciBkYXRlcGlja2VyIHRvIGFsbCBlbGVtZW50cyBpbiBhIGRpdlxuICAvLyAoaWNvbiB0b2dnbGUgYW5kIGlucHV0IGRhdGUgdXNpbmcgZGF0YS0gYXR0cmlidXRlcylcbiAgZmxhdHBpY2tyKGZsYXRFbGVtLCB7XG4gICAgZGF0ZUZvcm1hdDogJ2QvbS9ZJyxcbiAgICBkaXNhYmxlTW9iaWxlOiAndHJ1ZScsXG4gICAgYWxsb3dJbnB1dDogdHJ1ZSxcbiAgICB3cmFwOiB0cnVlLFxuICAgIGxvY2FsZTogUG9ydHVndWVzZSxcbiAgICBvbkNoYW5nZShzZWxlY3RlZERhdGVzLCBkYXRlU3RyKSB7XG4gICAgICBtYXNrLnVwZGF0ZVZhbHVlKGRhdGVTdHIpO1xuICAgIH0sXG4gIH0pO1xufVxuXG4vLyBtYWluIHNjcmVlbiBpbnRlcmFjdGlvbnNcbi8vIGNoZWNrIHZpc3VhbCBlZmZlY3RcbmV4cG9ydCBmdW5jdGlvbiBzZXRMaW5lVGhyb3VnaChlKSB7XG4gIGNvbnN0IHRleHQgPSBlLm5leHRFbGVtZW50U2libGluZztcbiAgaWYgKGlzQ2hlY2tlZChlKSkge1xuICAgIHRleHQuY2xhc3NMaXN0LmFkZCgndGV4dC1kZWNvcmF0aW9uLWxpbmUtdGhyb3VnaCcpO1xuICB9IGVsc2Uge1xuICAgIHRleHQuY2xhc3NMaXN0LnJlbW92ZSgndGV4dC1kZWNvcmF0aW9uLWxpbmUtdGhyb3VnaCcpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93UGx1c0J0bigpIHtcbiAgLy8gRW5jb250cmEgbyBib3TDo28gK1xuICBjb25zdCBwbHVzQnRuID0gYWRkRmllbGQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICBjb25zdCBzYXZlQnRuID0gcGx1c0J0bi5uZXh0RWxlbWVudFNpYmxpbmc7XG4gIC8vIFNlIG8gdmFsb3IgZG8gY2FtcG8gdMOtdHVsbyBmb3IgZGlmZXJlbnRlIGRlIHZhemlvLFxuICAvLyBlbnTDo28gZWxlIHJldmVsYSBvIGJvdMOjbyArXG4gIGlmIChhZGRGaWVsZC52YWx1ZSAhPT0gJycpIHtcbiAgICBwbHVzQnRuLmNsYXNzTGlzdC5hZGQoJ3JldmVhbEl0ZW0nKTtcbiAgICBzYXZlQnRuLmNsYXNzTGlzdC5hZGQoJ3JldmVhbEl0ZW0nKTtcbiAgfVxuICAvLyBjYXNvIGNvbnRyw6FyaW8sIHNlIHZvY8OqIGFwYWdhciB0b2RvIG8gdMOtdHVsb1xuICAvLyBlbGUgZMOhIGRpc3BsYXk6IG5vbmUsIG5vIGJvdMOjbyArXG4gIGlmIChhZGRGaWVsZC52YWx1ZSA9PT0gJycgJiYgcGx1c0J0bi5jbGFzc0xpc3QuY29udGFpbnMoJ3JldmVhbEl0ZW0nKSkge1xuICAgIHBsdXNCdG4uY2xhc3NMaXN0LnJlbW92ZSgncmV2ZWFsSXRlbScpO1xuICAgIHNhdmVCdG4uY2xhc3NMaXN0LnJlbW92ZSgncmV2ZWFsSXRlbScpO1xuICB9XG59XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBmaW5kUGFyZW50Tm9kZShlbGVtZW50LCBhdHRyaWJ1dGVOYW1lKSB7XG4vLyAgIGxldCB7IHBhcmVudE5vZGUgfSA9IGVsZW1lbnQ7XG4vLyAgIHdoaWxlIChwYXJlbnROb2RlKSB7XG4vLyAgICAgaWYgKHBhcmVudE5vZGUuaGFzQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpKSB7XG4vLyAgICAgICByZXR1cm4gcGFyZW50Tm9kZTtcbi8vICAgICB9XG4vLyAgICAgcGFyZW50Tm9kZSA9IHBhcmVudE5vZGUucGFyZW50Tm9kZTtcbi8vICAgfVxuLy8gICByZXR1cm4gbnVsbDsgLy8gUmV0b3JuYSBudWxsIHNlIG7Do28gZW5jb250cm91IG5lbmh1bSBuw7MgcGFpIGNvbSBvIGF0cmlidXRvIGRlc2VqYWRvXG4vLyB9XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tY3ljbGUgKi9cbmltcG9ydCB7IHBvcHVsYXRlU3RvcmFnZSB9IGZyb20gJy4vSlNPTkZ1bmN0aW9ucyc7XG5pbXBvcnQgYWRkTGluZSBmcm9tICcuL2xpc3RDb25zdHJ1Y3Rvcic7XG5pbXBvcnQge1xuICBjbGVhckNvbnRlbnQsXG4gIGxpc3QsXG4gIHNvcnRQYXJhbSxcbiAgbG9hZExpc3QsXG59IGZyb20gJy4vdWlDb21tb25GdW5jdGlvbnMnO1xuXG4vLyBVSSBDb250cm9sbGVyXG5cbmNvbnN0IHVpQ29udHJvbCA9ICgoKSA9PiB7XG4gIGxldCBjdXJyZW50RmlsdGVyID0gbnVsbDtcblxuICBmdW5jdGlvbiBzZXRDdXJyZW50RmlsdGVyKGtleSwgdmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3VuZGVmaW5lZCcpIGN1cnJlbnRGaWx0ZXIgPSB7IGtleSwgdmFsdWUgfTtcbiAgICBlbHNlIGN1cnJlbnRGaWx0ZXIgPSBudWxsO1xuICB9XG5cbiAgY29uc3QgZmlsdGVyQXJyYXkgPSAoYXJyLCBmaWx0ZXIsIHZhbHVlKSA9PiB7XG4gICAgaWYgKGZpbHRlcikgcmV0dXJuIFsuLi5hcnIuZmlsdGVyKChvYmpldG8pID0+IG9iamV0b1tmaWx0ZXJdID09PSB2YWx1ZSldO1xuICAgIHJldHVybiBhcnI7XG4gIH07XG5cbiAgZnVuY3Rpb24gbG9hZCgpIHtcbiAgICBjb25zdCB1aUxpc3QgPSBzb3J0UGFyYW0obG9hZExpc3QoKSwgJ2NoZWNrZWQnKTtcbiAgICBpZiAoY3VycmVudEZpbHRlciAhPT0gbnVsbCkge1xuICAgICAgZmlsdGVyQXJyYXkodWlMaXN0LCBjdXJyZW50RmlsdGVyLmtleSwgY3VycmVudEZpbHRlci52YWx1ZSlcbiAgICAgICAgLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gbG9hZExpc3QoKS5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IG9iai5pZCk7XG4gICAgICAgICAgYWRkTGluZShvYmosIGluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVpTGlzdC5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBsb2FkTGlzdCgpLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gb2JqLmlkKTtcbiAgICAgICAgYWRkTGluZShvYmosIGluZGV4KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZShmaWx0ZXIsIHZhbHVlKSB7XG4gICAgY2xlYXJDb250ZW50KGxpc3QpO1xuICAgIGlmICh0eXBlb2YgZmlsdGVyICE9PSAndW5kZWZpbmVkJykgc2V0Q3VycmVudEZpbHRlcihmaWx0ZXIsIHZhbHVlKTtcbiAgICBsb2FkKCk7XG4gICAgcG9wdWxhdGVTdG9yYWdlKCk7XG4gICAgY29uc29sZS53YXJuKCdVcGRhdGVkIScpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzZXRDdXJyZW50RmlsdGVyLFxuICAgIGxvYWQsXG4gICAgdXBkYXRlLFxuICB9O1xufSkoKTtcblxuLy8gQUREL0VESVQgSVRFTVNcbmV4cG9ydCBkZWZhdWx0IHVpQ29udHJvbDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt0b2RvX2xpc3RcIl0gPSBzZWxmW1wid2VicGFja0NodW5rdG9kb19saXN0XCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCIzcmRwYXJ0XCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyg3MjczKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9