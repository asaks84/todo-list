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

/***/ 2212:
/*!***************************************!*\
  !*** ./src/assets/listConstructor.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _uiCommonFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uiCommonFunctions */ 4656);
/* harmony import */ var _uiController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uiController */ 5168);
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
  const item = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', ['accordion-item']);
  const header = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('h2', ['accordion-header', 'p-1', 'd-flex', 'align-items-center', 'gap-1']);
  const checkbox = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', ['form-check-input', 'text-bg-warning'], {
    type: 'checkbox',
    'data-id': `${obj.id}`,
  });
  const btnHeader = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', ['accordion-button', 'collapsed', 'flex-fill'], {
    type: 'button',
    'data-bs-toggle': 'collapse',
    'aria-expanded': 'false',
    'data-bs-target': `#item-${obj.id}`,
  });
  const span = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('span', ['flex-fill']);
  const code = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('code', ['small', 'text-muted']);

  // body
  const itemDetails = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', ['accordion-collapse', 'collapse'], {
    id: `item-${obj.id}`,
    'data-bs-parent': '#list',
  });
  const itemBody = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', ['accordion-body']);
  const editDeleteItem = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', ['d-flex', 'flex-row-reverse', 'col', 'gap-2']);

  const btnEdit = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', ['btn', 'btn-warning'], {
    'data-id': obj.id,
    'data-bs-target': '#exampleModal',
    'data-bs-toggle': 'modal',
  });
  const btnDelete = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', ['btn', 'btn-danger'], {
    'data-id': obj.id,
  });

  // EVENTLISTNERS OBJECTS
  checkbox.addEventListener('change', _uiController__WEBPACK_IMPORTED_MODULE_1__["default"].handlers.setCheckedHandler);

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
  if ((0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_0__.hasNotes)(obj.notes)) {
    insertNote(obj.notes, itemBody);
  }
  btnEdit.addEventListener('click', (elem) => {
    _uiController__WEBPACK_IMPORTED_MODULE_1__["default"].handlers.edit(elem);
  });
  btnDelete.addEventListener('click', _uiController__WEBPACK_IMPORTED_MODULE_1__["default"].handlers.deleteItem);
  editDeleteItem.append(btnDelete, btnEdit);
  itemBody.appendChild(editDeleteItem);
  itemDetails.appendChild(itemBody);

  // Append elements to list
  item.append(header, itemDetails);
  _uiCommonFunctions__WEBPACK_IMPORTED_MODULE_0__.list.appendChild(item);
  if ((0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_0__.isChecked)(obj)) (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_0__.addChecked)(checkbox, btnHeader);
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
    function setCheckedHandler(e) {
      const { target } = e;
      const id = target.getAttribute('data-id');
      _core__WEBPACK_IMPORTED_MODULE_1__["default"].setChecked(id);
      (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_4__.setLineThrough)(target);
      update();
    }

    // home buttons
    function editMore(title) {
      (0,_editConstructor__WEBPACK_IMPORTED_MODULE_2__["default"])(title);
      title.value = '';
    }

    function fastSave(title) {
      console.log(title.value);
      const newObj = { title: title.value };
      _core__WEBPACK_IMPORTED_MODULE_1__["default"].addItem(newObj);
      title.value = '';
      update();
    }

    function edit(elem) {
      elem.stopImmediatePropagation();
      const { target } = elem;
      const obj = _core__WEBPACK_IMPORTED_MODULE_1__["default"].getItem(target.getAttribute('data-id'));
      console.log(obj);
      (0,_editConstructor__WEBPACK_IMPORTED_MODULE_2__["default"])(obj.title, obj.dueDate, obj.priority, obj.project, obj.notes, obj.id);
    }

    function deleteItem(item) {
      const { target } = item;
      _core__WEBPACK_IMPORTED_MODULE_1__["default"].deleteItem(target.getAttribute('data-id'));
      update();
    }

    return {
      setCheckedHandler,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hc3NldHMvbWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0E4QjtBQUM5Qjs7QUFFTztBQUNQLCtCQUErQiw2Q0FBUTtBQUN2Qzs7QUFFTztBQUNQO0FBQ0EsRUFBRSw2Q0FBUTtBQUNWOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLGVBQWU7QUFDMUQ7O0FBRUE7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFTztBQUNQLEVBQUUsNkNBQVE7QUFDVjs7Ozs7Ozs7Ozs7Ozs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCO0FBQzVCO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0EsNkJBQTZCO0FBQzdCLDhCQUE4QjtBQUM5QjtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBLDBCQUEwQjtBQUMxQiw2QkFBNkI7QUFDN0IsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsaUJBQWlCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0EscUJBQXFCOztBQUVyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMLDRCQUE0QixnQkFBZ0I7QUFDNUM7O0FBRUE7QUFDQTtBQUNBLFlBQVksaUJBQWlCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGlFQUFlLFFBQVEsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUt4QixZQUFZLE9BQU87QUFDZTtBQUNSOztBQUUxQjtBQUNPLDBCQUEwQixnREFBTTtBQUN2Qzs7QUFFQSxJQUFJOztBQUVHO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsWUFBWSx5REFBaUI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLHlEQUFpQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVkseURBQWlCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xDQTtBQUM4QjtBQUdEO0FBQ1U7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksNkNBQVE7QUFDWixJQUFJO0FBQ0osSUFBSSw2Q0FBUTtBQUNaO0FBQ0EsRUFBRSxxREFBUztBQUNYOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsYUFBYTtBQUNiLGVBQWU7QUFDZixnQkFBZ0I7QUFDaEIsZUFBZTtBQUNmLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlFQUFhO0FBQzVCLG1CQUFtQixpRUFBYTtBQUNoQyxxQkFBcUIsaUVBQWE7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILGVBQWUsaUVBQWE7O0FBRTVCLGtCQUFrQixpRUFBYTtBQUMvQixvQkFBb0IsaUVBQWE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCwyQkFBMkIsaUVBQWE7QUFDeEM7QUFDQTtBQUNBLEdBQUc7QUFDSCxtQkFBbUIsaUVBQWE7O0FBRWhDLHNCQUFzQixpRUFBYTtBQUNuQyx5QkFBeUIsd0VBQW9COztBQUU3QyxxQkFBcUIsaUVBQWE7QUFDbEMsdUJBQXVCLGlFQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsMEJBQTBCLGlFQUFhO0FBQ3ZDO0FBQ0E7QUFDQSxHQUFHOztBQUVILGVBQWUsaUVBQWE7O0FBRTVCLHlCQUF5QixpRUFBYTtBQUN0QyxzQkFBc0IsaUVBQWE7QUFDbkMsbUJBQW1CLGlFQUFhO0FBQ2hDLG9CQUFvQixpRUFBYTs7QUFFakMscUJBQXFCLGlFQUFhOztBQUVsQyxxQkFBcUIsaUVBQWE7QUFDbEMsc0JBQXNCLGlFQUFhLFlBQVksZUFBZTtBQUM5RCxzQkFBc0IsaUVBQWE7QUFDbkMsc0JBQXNCLGlFQUFhOztBQUVuQyxlQUFlLGlFQUFhOztBQUU1QixrQkFBa0IsaUVBQWE7QUFDL0Isa0JBQWtCLGlFQUFhO0FBQy9CO0FBQ0EsR0FBRztBQUNILG9CQUFvQixpRUFBYTtBQUNqQyxvQkFBb0IsaUVBQWE7QUFDakM7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsS0FBSztBQUMzQyxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsRUFBRSwrREFBVztBQUNiLEVBQUUsa0VBQWM7QUFDaEI7O0FBRUEsaUVBQWUsVUFBVSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2pLMUI7QUFHNkI7QUFDVTs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxpRUFBYTtBQUM1QixpQkFBaUIsaUVBQWE7QUFDOUIsbUJBQW1CLGlFQUFhO0FBQ2hDO0FBQ0Esa0JBQWtCLE9BQU87QUFDekIsR0FBRztBQUNILG9CQUFvQixpRUFBYTtBQUNqQztBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsT0FBTztBQUN0QyxHQUFHO0FBQ0gsZUFBZSxpRUFBYTtBQUM1QixlQUFlLGlFQUFhOztBQUU1QjtBQUNBLHNCQUFzQixpRUFBYTtBQUNuQyxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBLEdBQUc7QUFDSCxtQkFBbUIsaUVBQWE7QUFDaEMseUJBQXlCLGlFQUFhOztBQUV0QyxrQkFBa0IsaUVBQWE7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILG9CQUFvQixpRUFBYTtBQUNqQztBQUNBLEdBQUc7O0FBRUg7QUFDQSxzQ0FBc0MscURBQVM7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNLDREQUFRO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsSUFBSSxxREFBUztBQUNiLEdBQUc7QUFDSCxzQ0FBc0MscURBQVM7QUFDL0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFLG9EQUFJO0FBQ04sTUFBTSw2REFBUyxPQUFPLDhEQUFVO0FBQ2hDOztBQUVBLGlFQUFlLE9BQU8sRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRnZCO0FBQ0E7QUFDc0I7QUFDMkI7O0FBV3BCO0FBQ2M7QUFDSjs7QUFFdkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJLG9EQUFJLHNCQUFzQixVQUFVO0FBQ3hDLElBQUksS0FBSyxvREFBSTtBQUNiOztBQUVBOztBQUVBO0FBQ0EsdURBQU8sMkJBQTJCLHdEQUFVO0FBQzVDLHdEQUFRLDZCQUE2QiwyREFBVztBQUNoRCx3REFBUSwyQkFBMkIsMkRBQVc7QUFDOUMsdURBQU8saUNBQWlDLHFEQUFTLG1CQUFtQixxREFBSztBQUN6RSx5REFBUyxpQ0FBaUMscURBQVMsbUJBQW1CLHFEQUFLOztBQUUzRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUUscURBQVM7QUFDWCxDQUFDOztBQUVEO0FBQ0EsZ0JBQWdCLDhEQUFjOztBQUU5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsRUFBRSxnRUFBWTtBQUNkLENBQUM7O0FBRUQ7QUFDQSxxREFBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JGeUI7QUFDa0I7QUFDMUI7QUFDUTtBQUNKOztBQUV2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJCQUEyQiw2Q0FBUTtBQUNuQztBQUNQOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRU8sNERBQTREO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUCwrQ0FBK0MsT0FBTztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNILGtCQUFrQixPQUFPO0FBQ3pCLHdEQUF3RCxFQUFFO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDZDQUFRO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVPO0FBQ1A7QUFDQTtBQUNBLDRDQUE0QyxRQUFRO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QiwwQ0FBMEMsTUFBTTtBQUNoRCxrQkFBa0I7QUFDbEI7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLGlEQUFLLFVBQVUsMkNBQVE7O0FBRXRDO0FBQ0E7QUFDQSxFQUFFLHFEQUFTO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDhEQUFVO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsYUFBYTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUxBO0FBQ2tEO0FBQ3BCO0FBQ2E7QUFDSDtBQU9YOztBQUU3Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esc0RBQXNEO0FBQ3REO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsNkRBQVMsQ0FBQyw0REFBUTtBQUNyQztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsNERBQVE7QUFDaEMsVUFBVSw0REFBTztBQUNqQixTQUFTO0FBQ1QsTUFBTTtBQUNOO0FBQ0Esc0JBQXNCLDREQUFRO0FBQzlCLFFBQVEsNERBQU87QUFDZixPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLElBQUksZ0VBQVksQ0FBQyxvREFBSTtBQUNyQjtBQUNBO0FBQ0EsSUFBSSwrREFBZTtBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjLFNBQVM7QUFDdkI7QUFDQSxNQUFNLDZDQUFRO0FBQ2QsTUFBTSxrRUFBYztBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNLDREQUFVO0FBQ2hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QixNQUFNLDZDQUFRO0FBQ2Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjLFNBQVM7QUFDdkIsa0JBQWtCLDZDQUFRO0FBQzFCO0FBQ0EsTUFBTSw0REFBVTtBQUNoQjs7QUFFQTtBQUNBLGNBQWMsU0FBUztBQUN2QixNQUFNLDZDQUFRO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLGlFQUFlLFNBQVMsRUFBQzs7Ozs7OztVQzNHekI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9KU09ORnVuY3Rpb25zLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvY29yZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL2RhdGUuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9lZGl0Q29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9saXN0Q29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9zY3JpcHQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy91aUNvbW1vbkZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL3VpQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcbi8vIGltcG9ydCBhZGRMaW5lIGZyb20gJy4vdWlMaXN0R2VuZXJhdG9yJztcblxuZXhwb3J0IGZ1bmN0aW9uIHBvcHVsYXRlU3RvcmFnZSgpIHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhdGEnLCB0b2RvTGlzdC50b0pTT04oKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXN0b3JlU3RvcmFnZSgpIHtcbiAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXRhJykgPT09IG51bGwpIHJldHVybjtcbiAgdG9kb0xpc3QucmVzdG9yZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGF0YScpKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbm5lY3QoKSB7XG4gIGNvbnN0IHJlcXVlc3RVUkwgPSAnLi9hc3NldHMvZGF0YS5qc29uJztcbiAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IGZldGNoKHJlcXVlc3RVUkwpO1xuICBpZiAoIXJlcXVlc3Qub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIFN0YXR1czogJHtyZXF1ZXN0LnN0YXR1c31gKTtcbiAgfVxuXG4gIHJldHVybiByZXF1ZXN0O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcG9wdWxhdGUoKSB7XG4gIGNvbnN0IHZhbHVlID0gYXdhaXQgY29ubmVjdCgpO1xuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0KCkge1xuICB0b2RvTGlzdC5yZXN0b3JlKHBvcHVsYXRlKCkpO1xufVxuIiwiZnVuY3Rpb24gQ3JlYXRlSXRlbShudW0sIHRleHQsIGRlYWRsaW5lID0gMCwgcHJpb3JpdHlOdW0gPSAwLCBwcm9qZWN0ID0gbnVsbCwgY2hlY2sgPSBmYWxzZSkge1xuICBsZXQgdGl0bGUgPSB0ZXh0O1xuICBsZXQgZHVlRGF0ZSA9IGRlYWRsaW5lO1xuICBsZXQgcHJvamVjdE5hbWUgPSBwcm9qZWN0O1xuICBsZXQgcHJpb3JpdHkgPSBwcmlvcml0eU51bTtcbiAgbGV0IGNoZWNrZWQgPSBjaGVjaztcbiAgY29uc3QgaWQgPSBudW0udG9TdHJpbmcoKTtcbiAgY29uc3Qgbm90ZXMgPSBbXTtcblxuICBmdW5jdGlvbiBlZGl0VGl0bGUodmFsKSB7IHRpdGxlID0gdmFsOyB9XG4gIGNvbnN0IGdldFRpdGxlID0gKCkgPT4gdGl0bGU7XG4gIGZ1bmN0aW9uIGVkaXRQcmlvcml0eSh2YWwpIHsgcHJpb3JpdHkgPSB2YWw7IH1cbiAgY29uc3QgZ2V0UHJpb3JpdHkgPSAoKSA9PiBwcmlvcml0eTtcbiAgZnVuY3Rpb24gZGVsZXRlRHVvRGF0ZSgpIHsgZHVlRGF0ZSA9IDA7IH1cbiAgZnVuY3Rpb24gZWRpdER1ZURhdGUodmFsKSB7IGR1ZURhdGUgPSB2YWw7IH1cbiAgY29uc3QgZ2V0RHVlRGF0ZSA9ICgpID0+IGR1ZURhdGU7XG4gIGZ1bmN0aW9uIGVkaXRQcm9qZWN0KHZhbCkgeyBwcm9qZWN0TmFtZSA9IHZhbDsgfVxuICBjb25zdCBnZXRQcm9qZWN0ID0gKCkgPT4gcHJvamVjdE5hbWU7XG4gIGZ1bmN0aW9uIGVkaXRDaGVjaygpIHsgY2hlY2tlZCA9ICFjaGVja2VkOyB9XG4gIGNvbnN0IGdldENoZWNrID0gKCkgPT4gY2hlY2tlZDtcbiAgZnVuY3Rpb24gYWRkTm90ZSh2YWwpIHsgbm90ZXMucHVzaCh2YWwpOyB9XG4gIGZ1bmN0aW9uIGRlbGV0ZU5vdGUocG9zKSB7IG5vdGVzLnNwbGljZShwb3MsIDEpOyB9XG4gIGZ1bmN0aW9uIGVkaXROb3RlKHBvcywgdmFsKSB7IG5vdGVzW3Bvc10gPSB2YWw7IH1cbiAgY29uc3QgZ2V0QWxsTm90ZXMgPSAoKSA9PiBub3RlcztcbiAgY29uc3QgZ2V0Tm90ZSA9IChwb3MpID0+IG5vdGVzW3Bvc107XG4gIGNvbnN0IGdldElkID0gKCkgPT4gaWQ7XG5cbiAgcmV0dXJuIHtcbiAgICBhZGROb3RlLFxuICAgIGVkaXROb3RlLFxuICAgIGdldE5vdGUsXG4gICAgZGVsZXRlTm90ZSxcbiAgICBnZXRBbGxOb3RlcyxcblxuICAgIGVkaXRUaXRsZSxcbiAgICBnZXRUaXRsZSxcblxuICAgIGVkaXREdWVEYXRlLFxuICAgIGRlbGV0ZUR1b0RhdGUsXG4gICAgZ2V0RHVlRGF0ZSxcblxuICAgIGVkaXRQcm9qZWN0LFxuICAgIGdldFByb2plY3QsXG5cbiAgICBlZGl0UHJpb3JpdHksXG4gICAgZ2V0UHJpb3JpdHksXG5cbiAgICBlZGl0Q2hlY2ssXG4gICAgZ2V0Q2hlY2ssXG5cbiAgICBnZXRJZCxcbiAgfTtcbn1cblxuY29uc3QgdG9kb0xpc3QgPSAoKCkgPT4ge1xuICBjb25zdCBsaXN0ID0gW107XG5cbiAgZnVuY3Rpb24gZmluZE9ialBvcyhpZFZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAobGlzdFtpXS5nZXRJZCgpID09PSBpZFZhbHVlKSByZXR1cm4gaTtcbiAgICB9XG4gICAgdGhyb3cgRXJyb3IoJ09iamVjdCBub3QgZm91bmQnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJldHVybk9iaihpdGVtKSB7XG4gICAgY29uc3QgdGl0bGUgPSBpdGVtLmdldFRpdGxlKCk7XG4gICAgY29uc3QgcHJvamVjdCA9IGl0ZW0uZ2V0UHJvamVjdCgpO1xuICAgIGNvbnN0IGR1ZURhdGUgPSBpdGVtLmdldER1ZURhdGUoKTtcbiAgICBjb25zdCBwcmlvcml0eSA9IGl0ZW0uZ2V0UHJpb3JpdHkoKTtcbiAgICBjb25zdCBjaGVja2VkID0gaXRlbS5nZXRDaGVjaygpO1xuICAgIGNvbnN0IG5vdGVzID0gaXRlbS5nZXRBbGxOb3RlcygpO1xuICAgIGNvbnN0IGlkID0gaXRlbS5nZXRJZCgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkLCB0aXRsZSwgcHJvamVjdCwgZHVlRGF0ZSwgcHJpb3JpdHksIGNoZWNrZWQsIG5vdGVzLFxuICAgIH07XG4gIH1cbiAgY29uc3QgZ2V0SXRlbSA9IChpZCkgPT4gcmV0dXJuT2JqKGxpc3RbZmluZE9ialBvcyhpZCldKTtcbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGlzdC5sZW5ndGg7XG4gIGZ1bmN0aW9uIHNldENoZWNrZWQoaWQpIHsgbGlzdFtmaW5kT2JqUG9zKGlkKV0uZWRpdENoZWNrKCk7IH1cbiAgY29uc3QgYWxsVGFza3NMaXN0ID0gKCkgPT4gbGlzdC5tYXAoKG9iaikgPT4gKHJldHVybk9iaihvYmopKSk7XG4gIGZ1bmN0aW9uIHJlc2V0KCkgeyBsaXN0Lmxlbmd0aCA9IDA7IH1cblxuICBjb25zdCBnZXRQcm9qZWN0cyA9ICgpID0+IGxpc3QubWFwKChpdGVtKSA9PiBpdGVtLmdldFByb2plY3QoKSlcbiAgICAuZmlsdGVyKCh2YWx1ZSwgcG9zLCBzZWxmKSA9PiB2YWx1ZSAhPT0gbnVsbCAmJiBzZWxmLmluZGV4T2YodmFsdWUpID09PSBwb3MpO1xuXG4gIGZ1bmN0aW9uIGFkZEl0ZW0ob2JqKSB7XG4gICAgY29uc3QgaWQgPSBsaXN0Lmxlbmd0aDtcbiAgICBjb25zdCBuZXdJdGVtID0gQ3JlYXRlSXRlbShpZCwgb2JqLnRpdGxlLCBvYmouZHVlRGF0ZSwgb2JqLnByaW9yaXR5LCBvYmoucHJvamVjdCwgb2JqLmNoZWNrZWQpO1xuICAgIGxpc3QucHVzaChuZXdJdGVtKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVkaXRJdGVtKG9iaklELCBuZXdPYmopIHtcbiAgICBjb25zdCBvYmpUb0VkaXQgPSBsaXN0W2ZpbmRPYmpQb3Mob2JqSUQpXTtcbiAgICBjb25zdCBpdGVtID0gcmV0dXJuT2JqKG9ialRvRWRpdCk7XG4gICAgT2JqZWN0LmtleXMobmV3T2JqKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmIChpdGVtW2tleV0gIT09IHVuZGVmaW5lZCAmJiBpdGVtW2tleV0gIT09IG5ld09ialtrZXldKSB7XG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgY2FzZSAndGl0bGUnOlxuICAgICAgICAgICAgb2JqVG9FZGl0LmVkaXRUaXRsZShuZXdPYmpba2V5XSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdwcm9qZWN0JzpcbiAgICAgICAgICAgIG9ialRvRWRpdC5lZGl0UHJvamVjdChuZXdPYmpba2V5XSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdkdWVEYXRlJzpcbiAgICAgICAgICAgIG9ialRvRWRpdC5lZGl0RHVlRGF0ZShuZXdPYmpba2V5XSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdwcmlvcml0eSc6XG4gICAgICAgICAgICBvYmpUb0VkaXQuZWRpdFByaW9yaXR5KG5ld09ialtrZXldKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignQ2hhdmUgaW52w6FsaWRhJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVkaXROb3RlKGlkLCBwb3MsIHZhbCkge1xuICAgIGxpc3RbZmluZE9ialBvcyhpZCldLmVkaXROb3RlKHBvcywgdmFsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbGV0ZUl0ZW0oaWQpIHtcbiAgICBsaXN0LnNwbGljZShmaW5kT2JqUG9zKGlkKSwgMSk7XG4gIH1cblxuICBjb25zdCB0b0pTT04gPSAoKSA9PiB7XG4gICAgY29uc3QgbGlzdERhdGEgPSBsaXN0Lm1hcCgoaXRlbSkgPT4gKHtcbiAgICAgIGlkOiBpdGVtLmdldElkKCksXG4gICAgICB0aXRsZTogaXRlbS5nZXRUaXRsZSgpLFxuICAgICAgcHJvamVjdDogaXRlbS5nZXRQcm9qZWN0KCksXG4gICAgICBkdWVEYXRlOiBpdGVtLmdldER1ZURhdGUoKSxcbiAgICAgIHByaW9yaXR5OiBpdGVtLmdldFByaW9yaXR5KCksXG4gICAgICBjaGVja2VkOiBpdGVtLmdldENoZWNrKCksXG4gICAgICBub3RlczogaXRlbS5nZXRBbGxOb3RlcygpLFxuICAgIH0pKTtcblxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7IGxpc3Q6IGxpc3REYXRhIH0sICcnLCAxKTtcbiAgfTtcblxuICBjb25zdCByZXN0b3JlID0gKGRhdGEpID0+IHtcbiAgICByZXNldCgpO1xuICAgIGNvbnN0IHsgbGlzdDogbGlzdERhdGEgfSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgbGlzdERhdGEuZm9yRWFjaChcbiAgICAgICh7XG4gICAgICAgIGlkLCB0aXRsZSwgcHJvamVjdCwgZHVlRGF0ZSwgcHJpb3JpdHksIGNoZWNrZWQsIG5vdGVzLFxuICAgICAgfSkgPT4ge1xuICAgICAgICBjb25zdCBuZXdJdGVtID0gQ3JlYXRlSXRlbShpZCwgdGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0LCBjaGVja2VkKTtcbiAgICAgICAgbm90ZXMuZm9yRWFjaCgobm90ZSkgPT4gbmV3SXRlbS5hZGROb3RlKG5vdGUpKTtcbiAgICAgICAgbGlzdC5wdXNoKG5ld0l0ZW0pO1xuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZ2V0TGVuZ3RoLFxuICAgIGVkaXROb3RlLFxuICAgIGVkaXRJdGVtLFxuICAgIGFkZEl0ZW0sXG4gICAgZGVsZXRlSXRlbSxcbiAgICByZXN0b3JlLFxuICAgIHRvSlNPTixcbiAgICBzZXRDaGVja2VkLFxuICAgIGdldFByb2plY3RzLFxuICAgIHJlc2V0LFxuICAgIHJldHVybk9iaixcbiAgICBhbGxUYXNrc0xpc3QsXG4gICAgZ2V0SXRlbSxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHRvZG9MaXN0O1xuIiwiLy8gaW1wb3J0IHsgcHRCUiB9IGZyb20gJ2RhdGUtZm5zL2xvY2FsZSc7XG5pbXBvcnQgeyBmb3JtYXQgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgSU1hc2sgZnJvbSAnaW1hc2snO1xuXG5jb25zdCBzcGxpdFRvQ29kZSA9IChkYXRlKSA9PiBkYXRlLnNwbGl0KCcvJykucmV2ZXJzZSgpLmpvaW4oJy8nKS5yZXBsYWNlQWxsKCcvJywgJywgJyk7XG5leHBvcnQgY29uc3QgdG9JbnB1dCA9IChkYXRhKSA9PiBmb3JtYXQobmV3IERhdGUoc3BsaXRUb0NvZGUoZGF0YSkpLCAnZGQvTEwveXl5eScpO1xuLy8gY29uc3QgZ2V0RGF0YSA9IChhcnIpID0+IGFyci5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4vLyB9KTtcblxuZXhwb3J0IGNvbnN0IG1hc2tEYXRlID0ge1xuICBtYXNrOiAnZC9gbS9gWScsXG4gIGJsb2Nrczoge1xuICAgIGQ6IHtcbiAgICAgIG1hc2s6IElNYXNrLk1hc2tlZFJhbmdlLFxuICAgICAgcGxhY2Vob2xkZXJDaGFyOiAnZCcsXG4gICAgICBmcm9tOiAxLFxuICAgICAgdG86IDMxLFxuICAgICAgbWF4TGVuZ3RoOiAyLFxuICAgIH0sXG4gICAgbToge1xuICAgICAgbWFzazogSU1hc2suTWFza2VkUmFuZ2UsXG4gICAgICBwbGFjZWhvbGRlckNoYXI6ICdtJyxcbiAgICAgIGZyb206IDEsXG4gICAgICB0bzogMTIsXG4gICAgICBtYXhMZW5ndGg6IDIsXG4gICAgfSxcbiAgICBZOiB7XG4gICAgICBtYXNrOiBJTWFzay5NYXNrZWRSYW5nZSxcbiAgICAgIHBsYWNlaG9sZGVyQ2hhcjogJ2EnLFxuICAgICAgZnJvbTogMTAwMCxcbiAgICAgIHRvOiA5OTk5LFxuICAgIH0sXG4gIH0sXG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWN5Y2xlICovXG5pbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcbmltcG9ydCB7XG4gIGNyZWF0ZUVsZW1lbnQsIGNyZWF0ZVByaW9yaXR5U2VsZWN0LCBkdWVEYXRlTWFzaywgc2VhcmNoUHJvamVjdHMsXG59IGZyb20gJy4vdWlDb21tb25GdW5jdGlvbnMnO1xuaW1wb3J0IHVpQ29udHJvbCBmcm9tICcuL3VpQ29udHJvbGxlcic7XG5cbmZ1bmN0aW9uIHNhdmUodGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0LCBub3RlcywgaWQpIHtcbiAgY29uc3QgbmV3T2JqID0ge1xuICAgIHRpdGxlOiB0aXRsZS52YWx1ZSxcbiAgICBkdWVEYXRlOiBkdWVEYXRlLnZhbHVlLFxuICAgIHByaW9yaXR5OiBwcmlvcml0eS52YWx1ZSxcbiAgICBwcm9qZWN0OiBwcm9qZWN0LnZhbHVlLFxuICAgIG5vdGVzLFxuICB9O1xuICBpZiAoaWQgIT09IHVuZGVmaW5lZCkge1xuICAgIHRvZG9MaXN0LmVkaXRJdGVtKGlkLCBuZXdPYmopO1xuICB9IGVsc2Uge1xuICAgIHRvZG9MaXN0LmFkZEl0ZW0obmV3T2JqKTtcbiAgfVxuICB1aUNvbnRyb2wudXBkYXRlKCk7XG59XG5cbmZ1bmN0aW9uIHVpRWRpdEl0ZW0odGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0LCBub3RlcywgaWQpIHtcbiAgY29uc29sZS5sb2coYCB1aUVkaXRJdGVtXG4gICAgaWQ6ICR7aWR9XG4gICAgdGl0bGU6ICR7dGl0bGV9XG4gICAgZHVlRGF0ZTogJHtkdWVEYXRlfVxuICAgIHByaW9yaXR5OiAke3ByaW9yaXR5fVxuICAgIHByb2plY3Q6ICR7cHJvamVjdH1cbiAgICBub3RlcyAke25vdGVzfVxuICBgKTtcbiAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYubW9kYWwtYm9keScpO1xuICAvLyBjcmVhdGluZyBlbGVtZW50c1xuICBjb25zdCByb3cxID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnXSk7XG4gIGNvbnN0IHRpdGxlRGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydpbnB1dC1ncm91cCcsICdtYi0zJywgJ2dhcC0xJ10pO1xuICBjb25zdCB0aXRsZUlucHV0ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2Zvcm0tY29udHJvbCddLCB7XG4gICAgaWQ6ICdpdGVtVGl0bGUnLFxuICAgIHR5cGU6ICd0ZXh0JyxcbiAgICBwbGFjZWhvbGRlcjogJ05vdmEgVGFyZWZhLi4uJyxcbiAgfSk7XG4gIGNvbnN0IHJvdzIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2JnLWdyYXknLCAncm93JywgJ2ctMCcsICdnYXAtMicsICdmbGV4LW5vd3JhcCddKTtcblxuICBjb25zdCBkYXRlRGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydkYXRlJywgJ2ZsYXRwaWNrcicsICdjb2wnXSk7XG4gIGNvbnN0IGRhdGVJbnB1dCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgWydmb3JtLWNvbnRyb2wnLCAnZmxhdHBpY2tyLWlucHV0J10sIHtcbiAgICBpZDogJ2R1ZURhdGUnLFxuICAgIHR5cGU6ICd0ZXh0JyxcbiAgICBpbnB1dG1vZGU6ICdudW1lcmljJyxcbiAgICAnZGF0YS1pbnB1dCc6IHVuZGVmaW5lZCxcbiAgICBhdXRvY29tcGxldGU6ICdvZmYnLFxuICB9KTtcbiAgY29uc3QgZGF0ZXBpY2tlclRvZ2dsZSA9IGNyZWF0ZUVsZW1lbnQoJ2EnLCBbJ2lucHV0LWJ1dHRvbiddLCB7XG4gICAgdGl0bGU6ICd0b2dnbGUnLFxuICAgICdkYXRhLXRvZ2dsZSc6IHVuZGVmaW5lZCxcbiAgfSk7XG4gIGNvbnN0IGRhdGVJY29uID0gY3JlYXRlRWxlbWVudCgnaScsIFsndGV4dC13YXJuaW5nJywgJ3NtYWxsJywgJ2JpJywgJ2JpLWNhbGVuZGFyJ10pO1xuXG4gIGNvbnN0IHByaW9yaXR5RGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydjb2wnXSk7XG4gIGNvbnN0IHByaW9yaXR5U2VsZWN0ID0gY3JlYXRlUHJpb3JpdHlTZWxlY3QocHJpb3JpdHkpO1xuXG4gIGNvbnN0IHByb2plY3REaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbCddKTtcbiAgY29uc3QgcHJvamVjdElucHV0ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2Zvcm0tY29udHJvbCddLCB7XG4gICAgaWQ6ICdlbnRlclByb2plY3QnLFxuICAgIHR5cGU6ICd0ZXh0JyxcbiAgICBsaXN0OiAnZGF0YWxpc3RPcHRpb25zJyxcbiAgICBwbGFjZWhvbGRlcjogJ1Byb2pldG8nLFxuICAgIGF1dG9jb21wbGV0ZTogJ29mZicsXG4gIH0pO1xuICBjb25zdCBwcm9qZWN0RGF0YWxpc3QgPSBjcmVhdGVFbGVtZW50KCdkYXRhbGlzdCcsIFsnc3VnZ2VzdGlvbnMnLCAnZm9ybSddLCB7XG4gICAgaWQ6ICdkYXRhbGlzdE9wdGlvbnMnLFxuICAgIGRyb3B6b25lOiAnc3RyaW5nJyxcbiAgfSk7XG5cbiAgY29uc3Qgcm93MyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncm93JywgJ3B0LTInXSk7XG5cbiAgY29uc3Qgbm90ZXNDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbnRhaW5lciddKTtcbiAgY29uc3Qgbm90ZXNIZWFkZXIgPSBjcmVhdGVFbGVtZW50KCdoNicpO1xuICBjb25zdCBub3Rlc1JvdyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncm93JywgJ2ctMiddKTtcbiAgY29uc3Qgbm90ZXNMaXN0ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydub3Rlc0xpc3QnXSk7XG5cbiAgY29uc3QgYWRkTm90ZVJvdyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncm93JywgJ3B0LTInLCAnanVzdGlmeS1jb250ZW50LWVuZCddKTtcblxuICBjb25zdCBhZGROb3RlRGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydjb2wtYXV0bycsICdzbWFsbCcsICd0ZXh0LWRhbmdlcicsICd0ZXh0LXdhcm5pbmctZW1waGFzaXMnXSk7XG4gIGNvbnN0IGFkZE5vdGVMaW5rID0gY3JlYXRlRWxlbWVudCgnYScsIFtdLCB7IGlkOiAnYWRkTm90ZScgfSk7XG4gIGNvbnN0IGFkZE5vdGVJY29uID0gY3JlYXRlRWxlbWVudCgnaScsIFsnYmknLCAnYmktcGx1cy1jaXJjbGUnXSk7XG4gIGNvbnN0IGFkZE5vdGVUZXh0ID0gY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gIGNvbnN0IHJvdzQgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3JvdycsICdnLTInLCAncHQtMycsICdqdXN0aWZ5LWNvbnRlbnQtc3RhcnQnLCAnZmxleC1yb3ctcmV2ZXJzZSddKTtcblxuICBjb25zdCBzYXZlRGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydjb2wtYXV0byddKTtcbiAgY29uc3Qgc2F2ZUJ0biA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIFsnYnRuJywgJ2J0bi13YXJuaW5nJywgJ3RleHQtbGlnaHQnXSwge1xuICAgICdkYXRhLWJzLWRpc21pc3MnOiAnbW9kYWwnLFxuICB9KTtcbiAgY29uc3QgY2FuY2VsRGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydjb2wtYXV0byddKTtcbiAgY29uc3QgY2FuY2VsQnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgWydidG4nLCAnYnRuLXNlY29uZGFyeScsICd0ZXh0LWxpZ2h0J10sIHtcbiAgICAnZGF0YS1icy1kaXNtaXNzJzogJ21vZGFsJyxcbiAgfSk7XG5cbiAgLy8gYXBwZW5kIGVsZW1lbnRzXG5cbiAgLy8gcm93IDEgKHRpdGxlKVxuICBpZiAodGl0bGUgJiYgKHR5cGVvZiB0aXRsZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHRpdGxlLnZhbHVlICE9PSAndW5kZWZpbmVkJykpIHtcbiAgICB0aXRsZUlucHV0LnZhbHVlID0gdHlwZW9mIHRpdGxlID09PSAnc3RyaW5nJyA/IHRpdGxlIDogdGl0bGUudmFsdWU7XG4gIH1cbiAgdGl0bGVEaXYuYXBwZW5kQ2hpbGQodGl0bGVJbnB1dCk7XG5cbiAgcm93MS5hcHBlbmRDaGlsZCh0aXRsZURpdik7XG5cbiAgLy8gcm93IDIgKGRhdGUsIHByaW9yaXR5LCBwcm9qZWN0KVxuXG4gIC8vIGRhdGVcbiAgaWYgKGR1ZURhdGUgIT09IHVuZGVmaW5lZCAmJiBkdWVEYXRlICE9PSAwKSB7XG4gICAgZGF0ZUlucHV0LnZhbHVlID0gZHVlRGF0ZTtcbiAgfVxuICBkYXRlcGlja2VyVG9nZ2xlLmFwcGVuZENoaWxkKGRhdGVJY29uKTtcbiAgZGF0ZURpdi5hcHBlbmQoZGF0ZUlucHV0LCBkYXRlcGlja2VyVG9nZ2xlKTtcblxuICAvLyBwcmlvcml0eVxuICBwcmlvcml0eURpdi5hcHBlbmRDaGlsZChwcmlvcml0eVNlbGVjdCk7XG5cbiAgLy8gcHJvamVjdFxuICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0KTtcbiAgaWYgKHR5cGVvZiBwcm9qZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBwcm9qZWN0ICE9PSAwKSBwcm9qZWN0SW5wdXQudmFsdWUgPSBwcm9qZWN0O1xuICBwcm9qZWN0RGl2LmFwcGVuZChwcm9qZWN0SW5wdXQsIHByb2plY3REYXRhbGlzdCk7XG5cbiAgcm93Mi5hcHBlbmQoZGF0ZURpdiwgcHJpb3JpdHlEaXYsIHByb2plY3REaXYpO1xuXG4gIC8vIHJvdzMgKG5vdGVzIGFyZWEpXG4gIG5vdGVzSGVhZGVyLnRleHRDb250ZW50ID0gJ05vdGFzJztcbiAgYWRkTm90ZVRleHQudGV4dENvbnRlbnQgPSAnTm92YSBub3RhJztcbiAgYWRkTm90ZUljb24udGV4dENvbnRlbnQgPSAnICc7IC8vIGZpeGluZyBhIHByb2JsZW0gZm9yIHVzaW5nIGpzXG5cbiAgYWRkTm90ZUxpbmsuYXBwZW5kKGFkZE5vdGVJY29uLCBhZGROb3RlVGV4dCk7XG4gIGFkZE5vdGVEaXYuYXBwZW5kQ2hpbGQoYWRkTm90ZUxpbmspO1xuICBhZGROb3RlUm93LmFwcGVuZENoaWxkKGFkZE5vdGVEaXYpO1xuICBpZiAobm90ZXMpIHtcbiAgICBub3Rlcy5mb3JFYWNoKChub3RlKSA9PiB7XG4gICAgICAvLyBwcmVjaXNvIGNpcmFyIG8gbGF5b3V0IGRhcyBub3Rhc1xuICAgICAgbm90ZXNMaXN0LmlubmVySFRNTCArPSBgPHNwYW4+JHtub3RlfTwvc3Bhbj5gO1xuICAgIH0pO1xuICB9XG4gIG5vdGVzUm93LmFwcGVuZChub3Rlc0xpc3QsIGFkZE5vdGVSb3cpO1xuICBub3Rlc0NvbnRhaW5lci5hcHBlbmQobm90ZXNIZWFkZXIsIG5vdGVzUm93KTtcblxuICByb3czLmFwcGVuZENoaWxkKG5vdGVzQ29udGFpbmVyKTtcblxuICAvLyByb3c0IChidXR0b25zKVxuICBjYW5jZWxCdG4udGV4dENvbnRlbnQgPSAnQ2FuY2VsJztcbiAgc2F2ZUJ0bi50ZXh0Q29udGVudCA9ICdTYXZlJztcbiAgaWYgKGlkICE9PSB1bmRlZmluZWQpIHNhdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzYXZlKHRpdGxlSW5wdXQsIGRhdGVJbnB1dCwgcHJpb3JpdHlTZWxlY3QsIHByb2plY3RJbnB1dCwgbm90ZXMsIGlkKSk7XG4gIGVsc2Ugc2F2ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNhdmUodGl0bGVJbnB1dCwgZGF0ZUlucHV0LCBwcmlvcml0eVNlbGVjdCwgcHJvamVjdElucHV0KSk7XG4gIHNhdmVEaXYuYXBwZW5kQ2hpbGQoc2F2ZUJ0bik7XG4gIGNhbmNlbERpdi5hcHBlbmRDaGlsZChjYW5jZWxCdG4pO1xuXG4gIHJvdzQuYXBwZW5kKHNhdmVEaXYsIGNhbmNlbERpdik7XG5cbiAgbW9kYWwuYXBwZW5kKHJvdzEsIHJvdzIsIHJvdzMsIHJvdzQpO1xuICBkdWVEYXRlTWFzaygpO1xuICBzZWFyY2hQcm9qZWN0cygpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB1aUVkaXRJdGVtO1xuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWN5Y2xlICovXG5pbXBvcnQge1xuICBhZGRDaGVja2VkLCBjcmVhdGVFbGVtZW50LCBoYXNOb3RlcywgaXNDaGVja2VkLCBsaXN0LFxufSBmcm9tICcuL3VpQ29tbW9uRnVuY3Rpb25zJztcbmltcG9ydCB1aUNvbnRyb2wgZnJvbSAnLi91aUNvbnRyb2xsZXInO1xuXG5mdW5jdGlvbiBpbnNlcnROb3RlKG5vdGVzLCBib2R5KSB7XG4gIG5vdGVzLmZvckVhY2goKGNvbnRlbnQpID0+IHtcbiAgICBjb25zdCBjb250ZW50RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29udGVudERpdi5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoY29udGVudERpdik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRMaW5lKG9iaikge1xuICAvLyBoZWFkZXJcbiAgY29uc3QgaXRlbSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnYWNjb3JkaW9uLWl0ZW0nXSk7XG4gIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoJ2gyJywgWydhY2NvcmRpb24taGVhZGVyJywgJ3AtMScsICdkLWZsZXgnLCAnYWxpZ24taXRlbXMtY2VudGVyJywgJ2dhcC0xJ10pO1xuICBjb25zdCBjaGVja2JveCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgWydmb3JtLWNoZWNrLWlucHV0JywgJ3RleHQtYmctd2FybmluZyddLCB7XG4gICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICAnZGF0YS1pZCc6IGAke29iai5pZH1gLFxuICB9KTtcbiAgY29uc3QgYnRuSGVhZGVyID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgWydhY2NvcmRpb24tYnV0dG9uJywgJ2NvbGxhcHNlZCcsICdmbGV4LWZpbGwnXSwge1xuICAgIHR5cGU6ICdidXR0b24nLFxuICAgICdkYXRhLWJzLXRvZ2dsZSc6ICdjb2xsYXBzZScsXG4gICAgJ2FyaWEtZXhwYW5kZWQnOiAnZmFsc2UnLFxuICAgICdkYXRhLWJzLXRhcmdldCc6IGAjaXRlbS0ke29iai5pZH1gLFxuICB9KTtcbiAgY29uc3Qgc3BhbiA9IGNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCBbJ2ZsZXgtZmlsbCddKTtcbiAgY29uc3QgY29kZSA9IGNyZWF0ZUVsZW1lbnQoJ2NvZGUnLCBbJ3NtYWxsJywgJ3RleHQtbXV0ZWQnXSk7XG5cbiAgLy8gYm9keVxuICBjb25zdCBpdGVtRGV0YWlscyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnYWNjb3JkaW9uLWNvbGxhcHNlJywgJ2NvbGxhcHNlJ10sIHtcbiAgICBpZDogYGl0ZW0tJHtvYmouaWR9YCxcbiAgICAnZGF0YS1icy1wYXJlbnQnOiAnI2xpc3QnLFxuICB9KTtcbiAgY29uc3QgaXRlbUJvZHkgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2FjY29yZGlvbi1ib2R5J10pO1xuICBjb25zdCBlZGl0RGVsZXRlSXRlbSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZC1mbGV4JywgJ2ZsZXgtcm93LXJldmVyc2UnLCAnY29sJywgJ2dhcC0yJ10pO1xuXG4gIGNvbnN0IGJ0bkVkaXQgPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2J0bicsICdidG4td2FybmluZyddLCB7XG4gICAgJ2RhdGEtaWQnOiBvYmouaWQsXG4gICAgJ2RhdGEtYnMtdGFyZ2V0JzogJyNleGFtcGxlTW9kYWwnLFxuICAgICdkYXRhLWJzLXRvZ2dsZSc6ICdtb2RhbCcsXG4gIH0pO1xuICBjb25zdCBidG5EZWxldGUgPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2J0bicsICdidG4tZGFuZ2VyJ10sIHtcbiAgICAnZGF0YS1pZCc6IG9iai5pZCxcbiAgfSk7XG5cbiAgLy8gRVZFTlRMSVNUTkVSUyBPQkpFQ1RTXG4gIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHVpQ29udHJvbC5oYW5kbGVycy5zZXRDaGVja2VkSGFuZGxlcik7XG5cbiAgLy8gRklMTElORyBDT05URU5UXG4gIC8vIGhlYWRlclxuICBzcGFuLnRleHRDb250ZW50ID0gb2JqLnRpdGxlO1xuICBjb2RlLnRleHRDb250ZW50ID0gb2JqLnByb2plY3Q7XG5cbiAgLy8gYm9keVxuICBidG5FZGl0LnRleHRDb250ZW50ID0gJ0VkaXQnO1xuICBidG5EZWxldGUudGV4dENvbnRlbnQgPSAnRGVsZXRlJztcblxuICAvLyBBcHBlbmRpbmcgY29udGVudFxuICBidG5IZWFkZXIuYXBwZW5kKHNwYW4sIGNvZGUpO1xuICBoZWFkZXIuYXBwZW5kKGNoZWNrYm94LCBidG5IZWFkZXIpO1xuXG4gIC8vIEJvZHkgY29udGVudFxuICBpZiAoaGFzTm90ZXMob2JqLm5vdGVzKSkge1xuICAgIGluc2VydE5vdGUob2JqLm5vdGVzLCBpdGVtQm9keSk7XG4gIH1cbiAgYnRuRWRpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlbGVtKSA9PiB7XG4gICAgdWlDb250cm9sLmhhbmRsZXJzLmVkaXQoZWxlbSk7XG4gIH0pO1xuICBidG5EZWxldGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1aUNvbnRyb2wuaGFuZGxlcnMuZGVsZXRlSXRlbSk7XG4gIGVkaXREZWxldGVJdGVtLmFwcGVuZChidG5EZWxldGUsIGJ0bkVkaXQpO1xuICBpdGVtQm9keS5hcHBlbmRDaGlsZChlZGl0RGVsZXRlSXRlbSk7XG4gIGl0ZW1EZXRhaWxzLmFwcGVuZENoaWxkKGl0ZW1Cb2R5KTtcblxuICAvLyBBcHBlbmQgZWxlbWVudHMgdG8gbGlzdFxuICBpdGVtLmFwcGVuZChoZWFkZXIsIGl0ZW1EZXRhaWxzKTtcbiAgbGlzdC5hcHBlbmRDaGlsZChpdGVtKTtcbiAgaWYgKGlzQ2hlY2tlZChvYmopKSBhZGRDaGVja2VkKGNoZWNrYm94LCBidG5IZWFkZXIpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhZGRMaW5lO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCAnLi9zdHlsZS5zY3NzJztcbmltcG9ydCB7IHJlc3RvcmVTdG9yYWdlIH0gZnJvbSAnLi9KU09ORnVuY3Rpb25zJztcblxuaW1wb3J0IHtcbiAgY2xlYXJDb250ZW50LFxuICBzaG93UGx1c0J0bixcbiAgYWRkRmllbGQsXG4gIGFkZFRhc2ssXG4gIGlucHV0LFxuICBhZGRNb3JlLFxuICBxdWlja1NhdmUsXG4gIGxpc3QsXG59IGZyb20gJy4vdWlDb21tb25GdW5jdGlvbnMnO1xuaW1wb3J0IHVpRWRpdEl0ZW0gZnJvbSAnLi9lZGl0Q29uc3RydWN0b3InO1xuaW1wb3J0IHVpQ29udHJvbCBmcm9tICcuL3VpQ29udHJvbGxlcic7XG5cbmNvbnN0IHByb2plY3RzSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNwcm9qZWN0cycpO1xuY29uc3QgcHJvamVjdHNEcm9wZG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNwcm9qZWN0cyBkaXYnKTtcbmNvbnN0IG1haW5Nb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNleGFtcGxlTW9kYWwnKTtcblxuLy8gc2V0IG1heCBoZWlnaHQgZm9yIGxpc3QgaXRlbXNcbmZ1bmN0aW9uIHNldE1heEhlaWdodCgpIHtcbiAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gICAgLy8gZ2V0IHBhZGRpbmcgdG9wICsgYm90dG9tIGZvcm0gbWFpbiBlbGVtZW50XG4gICAgbGV0IG1haW5QYWRkaW5nID0gcGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyksIG51bGwpXG4gICAgICAuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy10b3AnKS5tYXRjaCgvXFxkKyhcXC5cXGQrKT8vKSk7XG4gICAgbWFpblBhZGRpbmcgKz0gcGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyksIG51bGwpXG4gICAgICAuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy1ib3R0b20nKS5tYXRjaCgvXFxkKyhcXC5cXGQrKT8vKSk7XG5cbiAgICAvLyBnZXQgb3RoZXIgZWxlbWVudHMgc2l6ZVxuICAgIGNvbnN0IGJvZHlIZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jykub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IGluc2V0SXRlbUhlaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4gPiBkaXYnKS5vZmZzZXRIZWlnaHQ7XG4gICAgY29uc3QgaGVhZGVySGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJykub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IGFzaWRlSGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXNpZGUnKS5vZmZzZXRIZWlnaHQ7XG4gICAgLy8gY29uc3QgZm9vdGVySGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9vdGVyJykub2Zmc2V0SGVpZ2h0O1xuXG4gICAgLy8gc2V0IG1heCBzaXplIGZvciB0YXNrIGxpc3RcbiAgICBjb25zdCBtYXhIZWlnaHQgPSBib2R5SGVpZ2h0IC0gaGVhZGVySGVpZ2h0IC0gaW5zZXRJdGVtSGVpZ2h0IC0gYXNpZGVIZWlnaHQgLSBtYWluUGFkZGluZztcbiAgICBsaXN0LnN0eWxlLm1heEhlaWdodCA9IGAke21heEhlaWdodH1weGA7XG4gIH0gZWxzZSBsaXN0LnN0eWxlLm1heEhlaWdodCA9ICdub25lJztcbn1cblxuLy8gZXZlbnRMaXN0ZW5lcnNcblxuLy8gaG9tZSBwYWdlIGJ1dHRvbiBmdW5jdGlvbnNcbmFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1aUVkaXRJdGVtKTtcbmFkZEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBzaG93UGx1c0J0bik7XG5hZGRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHNob3dQbHVzQnRuKTtcbmFkZE1vcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB1aUNvbnRyb2wuaGFuZGxlcnMuZWRpdE1vcmUoaW5wdXQpKTtcbnF1aWNrU2F2ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHVpQ29udHJvbC5oYW5kbGVycy5mYXN0U2F2ZShpbnB1dCkpO1xuXG4vLyBzZXQgaGVpZ2h0IGxpbWl0IGZvciBsaXN0IGl0ZW1zXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHNldE1heEhlaWdodCk7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgc2V0TWF4SGVpZ2h0KTtcblxuLy8gYXV0by1zYXZlXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICB1aUNvbnRyb2wudXBkYXRlKCk7XG59KTtcblxuLy8gcmVzdG9yZSBkYXRhIHdoZW4gaXQncyBsb2FkZWRcbndpbmRvdy5vbmxvYWQgPSByZXN0b3JlU3RvcmFnZSgpO1xuXG4vLyBtZW51IGZvciBtb2JpbGUgdmVyc2lvblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgaWYgKCFldmVudC50YXJnZXQuY2xvc2VzdCgnI3Byb2plY3RzJykpIHtcbiAgICBwcm9qZWN0c0Ryb3Bkb3duLmNsYXNzTGlzdC5hZGQoJ21lbnUtaGlkZScpO1xuICB9XG59KTtcbnByb2plY3RzSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgaWYgKHByb2plY3RzRHJvcGRvd24uY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWhpZGUnKSkge1xuICAgIHByb2plY3RzRHJvcGRvd24uY2xhc3NMaXN0LnJlbW92ZSgnbWVudS1oaWRlJyk7XG4gIH0gZWxzZSB7XG4gICAgcHJvamVjdHNEcm9wZG93bi5jbGFzc0xpc3QuYWRkKCdtZW51LWhpZGUnKTtcbiAgfVxufSk7XG5cbi8vIGNsZWFyIG1vZGFsIGNvbnRlbnQgZXZlcnl0aW1lIGl0J3MgY2xvc2VkXG5tYWluTW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignaGlkZGVuLmJzLm1vZGFsJywgKCkgPT4ge1xuICBjbGVhckNvbnRlbnQobWFpbk1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1ib2R5JykpO1xufSk7XG5cbi8vIHN0YXJ0IGFwcFxudWlDb250cm9sLmxvYWQoKTtcbiIsImltcG9ydCBmbGF0cGlja3IgZnJvbSAnZmxhdHBpY2tyJztcbmltcG9ydCB7IFBvcnR1Z3Vlc2UgfSBmcm9tICdmbGF0cGlja3IvZGlzdC9sMTBuL3B0JztcbmltcG9ydCBJTWFzayBmcm9tICdpbWFzayc7XG5pbXBvcnQgeyBtYXNrRGF0ZSB9IGZyb20gJy4vZGF0ZSc7XG5pbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcblxuZXhwb3J0IGNvbnN0IGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYjbGlzdCcpO1xuZXhwb3J0IGNvbnN0IGFkZEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQjaXRlbVRpdGxlJyk7XG5leHBvcnQgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuZXhwb3J0IGNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhI2FkZEl0ZW0nKTtcbmV4cG9ydCBjb25zdCBhZGRNb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uI2FkZE1vcmUnKTtcbmV4cG9ydCBjb25zdCBxdWlja1NhdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24jc2F2ZUl0ZW0nKTtcblxuZXhwb3J0IGNvbnN0IGlzQ2hlY2tlZCA9IChlKSA9PiBlLmNoZWNrZWQgPT09IHRydWU7XG5leHBvcnQgY29uc3QgaGFzTm90ZXMgPSAob2JqKSA9PiBvYmoubGVuZ3RoID4gMDtcbmV4cG9ydCBjb25zdCBsb2FkTGlzdCA9ICgpID0+IFsuLi50b2RvTGlzdC5hbGxUYXNrc0xpc3QoKV07XG5leHBvcnQgY29uc3Qgc29ydFBhcmFtID0gKGFyciwgcGFyYW0pID0+IFsuLi5hcnJdXG4gIC5zb3J0KChhLCBiKSA9PiAoKGFbcGFyYW1dIDwgYltwYXJhbV0pID8gLTEgOiAxKSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRDaGVja2VkKGNoZWNrYm94LCBidXR0b24pIHtcbiAgY2hlY2tib3guY2hlY2tlZCA9IHRydWU7XG4gIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCd0ZXh0LWRlY29yYXRpb24tbGluZS10aHJvdWdoJyk7XG59XG5cbmNvbnN0IHNwZWNpYWxDaGFyc0VudHJpZXMgPSBbXG4gIFsnw4DDgcOCw4PDhMOFJywgJ0EnXSxcbiAgWyfDoMOhw6LDo8Okw6UnLCAnYSddLFxuICBbJ8OIw4nDisOLJywgJ0UnXSxcbiAgWyfDqMOpw6rDqycsICdlJ10sXG4gIFsnw4zDjcOOw48nLCAnSSddLFxuICBbJ8Osw63DrsOvJywgJ2knXSxcbiAgWyfDksOTw5XDlMOWJywgJ08nXSxcbiAgWyfDssOzw7XDtMO2JywgJ28nXSxcbiAgWyfDmcOaw5vDnCcsICdVJ10sXG4gIFsnw7nDusO7w7wnLCAndSddLFxuICBbJ8OHJywgJ0MnXSxcbiAgWyfDpycsICdjJ10sXG5dO1xuXG5jb25zdCBzcGVjaWFsQ2hhcnNNYXAgPSBPYmplY3QuZnJvbUVudHJpZXMoXG4gIHNwZWNpYWxDaGFyc0VudHJpZXMuZmxhdE1hcCgoW2NoYXJzLCB2YWx1ZV0pID0+IFsuLi5jaGFyc10ubWFwKChjaGFyKSA9PiBbY2hhciwgdmFsdWVdKSksXG4pO1xuXG4vLyBFTEVNRU5UIENSRUFUT1JTXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRBdHRycyhlbGVtLCBhdHRycykge1xuICBPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkICYmIGF0dHJzW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoa2V5LCAnJyk7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnLCBjbGFzc05hbWVzID0gW10sIGF0dHJpYnV0ZXMgPSB7fSkge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICBpZiAoY2xhc3NOYW1lcy5sZW5ndGgpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCguLi5jbGFzc05hbWVzKTtcbiAgc2V0QXR0cnMoZWxlbWVudCwgYXR0cmlidXRlcyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlT3B0aW9uKHZhbHVlLCB0ZXh0LCBzZWxlY3RlZCkge1xuICBjb25zdCBvcHRpb24gPSBjcmVhdGVFbGVtZW50KCdvcHRpb24nLCBbXSwgeyB2YWx1ZSB9KTtcbiAgb3B0aW9uLnRleHRDb250ZW50ID0gdGV4dDtcbiAgaWYgKHNlbGVjdGVkKSB7XG4gICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnJyk7XG4gIH1cbiAgcmV0dXJuIG9wdGlvbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByaW9yaXR5U2VsZWN0KG51bSA9IDApIHtcbiAgY29uc3Qgc2VsZWN0ID0gY3JlYXRlRWxlbWVudCgnc2VsZWN0JywgWydmb3JtLXNlbGVjdCddLCB7XG4gICAgJ2FyaWEtbGFiZWwnOiAnUHJpb3JpZGFkZScsXG4gIH0pO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkgKz0gMSkge1xuICAgIGNvbnN0IHRleHQgPSBpID09PSAwID8gJ1ByaW9yaWRhZGUnIDogYFByaW9yaWRhZGUgJHtpfWA7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSBpID09PSBwYXJzZUludChudW0sIDEwKTtcbiAgICBjb25zdCBvcHRpb24gPSBjcmVhdGVPcHRpb24oaSwgdGV4dCwgc2VsZWN0ZWQpO1xuICAgIHNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICB9XG4gIHJldHVybiBzZWxlY3Q7XG59XG5cbi8vIFVJIEZVTkNUSU9OU1xuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDb250ZW50KGVsZW0pIHtcbiAgd2hpbGUgKGVsZW0uZmlyc3RDaGlsZCkge1xuICAgIGVsZW0ucmVtb3ZlQ2hpbGQoZWxlbS5sYXN0Q2hpbGQpO1xuICB9XG59XG5cbi8vIEFERC9FRElUIE5FVyBUQVNLIFNDUkVFTiBGVU5DVElPTlNcblxuZnVuY3Rpb24gcmVtb3ZlU3BlY2lhbHModGV4dCkge1xuICBsZXQgc2VhcmNoID0gdGV4dDtcbiAgc2VhcmNoID0gc2VhcmNoLnJlcGxhY2UoXG4gICAgL1vDgC3DnMOgLcO8XS9nLFxuICAgIChtYXRjaCkgPT4gc3BlY2lhbENoYXJzTWFwW21hdGNoXSB8fCBtYXRjaCxcbiAgKTtcbiAgcmV0dXJuIHNlYXJjaDtcbn1cbi8vIHByb2plY3RzIGRhdGFsaXN0IGF1dG9jb21wbGV0ZVxuZnVuY3Rpb24gYXV0b0NvbXBsZXRlKHNlYXJjaCkge1xuICBjb25zdCBwcm9qZWN0cyA9IHRvZG9MaXN0LmdldFByb2plY3RzKCk7XG4gIHJldHVybiBwcm9qZWN0cy5maWx0ZXIoKHZhbHVlKSA9PiB7XG4gICAgY29uc3QgdmFsdWVMb3dlcmNhc2UgPSByZW1vdmVTcGVjaWFscyh2YWx1ZS50b0xvd2VyQ2FzZSgpKTtcbiAgICBjb25zdCBzZWFyY2hMb3dlcmNhc2UgPSByZW1vdmVTcGVjaWFscyhzZWFyY2gudG9Mb3dlckNhc2UoKSk7XG4gICAgcmV0dXJuIHZhbHVlTG93ZXJjYXNlLmluY2x1ZGVzKHNlYXJjaExvd2VyY2FzZSk7XG4gIH0pO1xufVxuXG4vLyBjYWxsaW5nIGZ1bmN0aW9ucyB0byBhdXRvY29tcGxldGUgUHJvamVjdCBmaWVsZFxuXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoUHJvamVjdHMoKSB7XG4gIGNvbnN0IGlucHV0UHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbnRlclByb2plY3QnKTtcbiAgY29uc3QgZGF0YWxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkYXRhbGlzdCcpO1xuICBpbnB1dFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoeyB0YXJnZXQgfSkgPT4ge1xuICAgIGNvbnN0IGlucHV0RGF0YSA9IHRhcmdldC52YWx1ZTtcbiAgICBpZiAoaW5wdXREYXRhLmxlbmd0aCkge1xuICAgICAgY29uc3QgYXV0b0NvbXBsZXRlT3B0aW9ucyA9IGF1dG9Db21wbGV0ZShpbnB1dERhdGEpO1xuICAgICAgZGF0YWxpc3QuaW5uZXJIVE1MID0gYCR7YXV0b0NvbXBsZXRlT3B0aW9uc1xuICAgICAgICAubWFwKCh2YWx1ZSkgPT4gYDxvcHRpb24gdmFsdWU9XCIke3ZhbHVlfVwiIC8+YClcbiAgICAgICAgLmpvaW4oJycpfWA7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gREFURVBJQ0tFUiBBTkQgTUFTSyBGVU5DVElPTlNcbmV4cG9ydCBmdW5jdGlvbiBkdWVEYXRlTWFzaygpIHtcbiAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkdWVEYXRlJyk7XG4gIGNvbnN0IGZsYXRFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LmZsYXRwaWNrcicpO1xuXG4gIC8vIGFwcGx5IG1hc2sgdG8gZHVlRGF0ZUZpZWxkXG4gIGNvbnN0IG1hc2sgPSBJTWFzayhkdWVEYXRlLCBtYXNrRGF0ZSk7XG5cbiAgLy8gYXBwbHkgZmxhdHBpY2tyIGRhdGVwaWNrZXIgdG8gYWxsIGVsZW1lbnRzIGluIGEgZGl2XG4gIC8vIChpY29uIHRvZ2dsZSBhbmQgaW5wdXQgZGF0ZSB1c2luZyBkYXRhLSBhdHRyaWJ1dGVzKVxuICBmbGF0cGlja3IoZmxhdEVsZW0sIHtcbiAgICBkYXRlRm9ybWF0OiAnZC9tL1knLFxuICAgIGRpc2FibGVNb2JpbGU6ICd0cnVlJyxcbiAgICBhbGxvd0lucHV0OiB0cnVlLFxuICAgIHdyYXA6IHRydWUsXG4gICAgbG9jYWxlOiBQb3J0dWd1ZXNlLFxuICAgIG9uQ2hhbmdlKHNlbGVjdGVkRGF0ZXMsIGRhdGVTdHIpIHtcbiAgICAgIG1hc2sudXBkYXRlVmFsdWUoZGF0ZVN0cik7XG4gICAgfSxcbiAgfSk7XG59XG5cbi8vIG1haW4gc2NyZWVuIGludGVyYWN0aW9uc1xuLy8gY2hlY2sgdmlzdWFsIGVmZmVjdFxuZXhwb3J0IGZ1bmN0aW9uIHNldExpbmVUaHJvdWdoKGUpIHtcbiAgY29uc3QgdGV4dCA9IGUubmV4dEVsZW1lbnRTaWJsaW5nO1xuICBpZiAoaXNDaGVja2VkKGUpKSB7XG4gICAgdGV4dC5jbGFzc0xpc3QuYWRkKCd0ZXh0LWRlY29yYXRpb24tbGluZS10aHJvdWdoJyk7XG4gIH0gZWxzZSB7XG4gICAgdGV4dC5jbGFzc0xpc3QucmVtb3ZlKCd0ZXh0LWRlY29yYXRpb24tbGluZS10aHJvdWdoJyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dQbHVzQnRuKCkge1xuICAvLyBFbmNvbnRyYSBvIGJvdMOjbyArXG4gIGNvbnN0IHBsdXNCdG4gPSBhZGRGaWVsZC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gIGNvbnN0IHNhdmVCdG4gPSBwbHVzQnRuLm5leHRFbGVtZW50U2libGluZztcbiAgLy8gU2UgbyB2YWxvciBkbyBjYW1wbyB0w610dWxvIGZvciBkaWZlcmVudGUgZGUgdmF6aW8sXG4gIC8vIGVudMOjbyBlbGUgcmV2ZWxhIG8gYm90w6NvICtcbiAgaWYgKGFkZEZpZWxkLnZhbHVlICE9PSAnJykge1xuICAgIHBsdXNCdG4uY2xhc3NMaXN0LmFkZCgncmV2ZWFsSXRlbScpO1xuICAgIHNhdmVCdG4uY2xhc3NMaXN0LmFkZCgncmV2ZWFsSXRlbScpO1xuICB9XG4gIC8vIGNhc28gY29udHLDoXJpbywgc2Ugdm9jw6ogYXBhZ2FyIHRvZG8gbyB0w610dWxvXG4gIC8vIGVsZSBkw6EgZGlzcGxheTogbm9uZSwgbm8gYm90w6NvICtcbiAgaWYgKGFkZEZpZWxkLnZhbHVlID09PSAnJyAmJiBwbHVzQnRuLmNsYXNzTGlzdC5jb250YWlucygncmV2ZWFsSXRlbScpKSB7XG4gICAgcGx1c0J0bi5jbGFzc0xpc3QucmVtb3ZlKCdyZXZlYWxJdGVtJyk7XG4gICAgc2F2ZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdyZXZlYWxJdGVtJyk7XG4gIH1cbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIGZpbmRQYXJlbnROb2RlKGVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUpIHtcbi8vICAgbGV0IHsgcGFyZW50Tm9kZSB9ID0gZWxlbWVudDtcbi8vICAgd2hpbGUgKHBhcmVudE5vZGUpIHtcbi8vICAgICBpZiAocGFyZW50Tm9kZS5oYXNBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSkpIHtcbi8vICAgICAgIHJldHVybiBwYXJlbnROb2RlO1xuLy8gICAgIH1cbi8vICAgICBwYXJlbnROb2RlID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuLy8gICB9XG4vLyAgIHJldHVybiBudWxsOyAvLyBSZXRvcm5hIG51bGwgc2UgbsOjbyBlbmNvbnRyb3UgbmVuaHVtIG7DsyBwYWkgY29tIG8gYXRyaWJ1dG8gZGVzZWphZG9cbi8vIH1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1jeWNsZSAqL1xuaW1wb3J0IHsgcG9wdWxhdGVTdG9yYWdlIH0gZnJvbSAnLi9KU09ORnVuY3Rpb25zJztcbmltcG9ydCB0b2RvTGlzdCBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IHVpRWRpdEl0ZW0gZnJvbSAnLi9lZGl0Q29uc3RydWN0b3InO1xuaW1wb3J0IGFkZExpbmUgZnJvbSAnLi9saXN0Q29uc3RydWN0b3InO1xuaW1wb3J0IHtcbiAgY2xlYXJDb250ZW50LFxuICBsaXN0LFxuICBzb3J0UGFyYW0sXG4gIGxvYWRMaXN0LFxuICBzZXRMaW5lVGhyb3VnaCxcbn0gZnJvbSAnLi91aUNvbW1vbkZ1bmN0aW9ucyc7XG5cbi8vIFVJIENvbnRyb2xsZXJcblxuY29uc3QgdWlDb250cm9sID0gKCgpID0+IHtcbiAgbGV0IGN1cnJlbnRGaWx0ZXIgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIHNldEN1cnJlbnRGaWx0ZXIoa2V5LCB2YWx1ZSkge1xuICAgIGlmICh0eXBlb2Yga2V5ICE9PSAndW5kZWZpbmVkJykgY3VycmVudEZpbHRlciA9IHsga2V5LCB2YWx1ZSB9O1xuICAgIGVsc2UgY3VycmVudEZpbHRlciA9IG51bGw7XG4gIH1cblxuICBjb25zdCBmaWx0ZXJBcnJheSA9IChhcnIsIGZpbHRlciwgdmFsdWUpID0+IHtcbiAgICBpZiAoZmlsdGVyKSByZXR1cm4gWy4uLmFyci5maWx0ZXIoKG9iamV0bykgPT4gb2JqZXRvW2ZpbHRlcl0gPT09IHZhbHVlKV07XG4gICAgcmV0dXJuIGFycjtcbiAgfTtcblxuICBmdW5jdGlvbiBsb2FkKCkge1xuICAgIGNvbnN0IHVpTGlzdCA9IHNvcnRQYXJhbShsb2FkTGlzdCgpLCAnY2hlY2tlZCcpO1xuICAgIGlmIChjdXJyZW50RmlsdGVyICE9PSBudWxsKSB7XG4gICAgICBmaWx0ZXJBcnJheSh1aUxpc3QsIGN1cnJlbnRGaWx0ZXIua2V5LCBjdXJyZW50RmlsdGVyLnZhbHVlKVxuICAgICAgICAuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSBsb2FkTGlzdCgpLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gb2JqLmlkKTtcbiAgICAgICAgICBhZGRMaW5lKG9iaiwgaW5kZXgpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdWlMaXN0LmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICBjb25zdCBpbmRleCA9IGxvYWRMaXN0KCkuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09PSBvYmouaWQpO1xuICAgICAgICBhZGRMaW5lKG9iaiwgaW5kZXgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKGZpbHRlciwgdmFsdWUpIHtcbiAgICBjbGVhckNvbnRlbnQobGlzdCk7XG4gICAgaWYgKHR5cGVvZiBmaWx0ZXIgIT09ICd1bmRlZmluZWQnKSBzZXRDdXJyZW50RmlsdGVyKGZpbHRlciwgdmFsdWUpO1xuICAgIGxvYWQoKTtcbiAgICBwb3B1bGF0ZVN0b3JhZ2UoKTtcbiAgICBjb25zb2xlLndhcm4oJ1VwZGF0ZWQhJyk7XG4gIH1cblxuICBjb25zdCBoYW5kbGVycyA9ICgoKSA9PiB7XG4gICAgZnVuY3Rpb24gc2V0Q2hlY2tlZEhhbmRsZXIoZSkge1xuICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGU7XG4gICAgICBjb25zdCBpZCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcbiAgICAgIHRvZG9MaXN0LnNldENoZWNrZWQoaWQpO1xuICAgICAgc2V0TGluZVRocm91Z2godGFyZ2V0KTtcbiAgICAgIHVwZGF0ZSgpO1xuICAgIH1cblxuICAgIC8vIGhvbWUgYnV0dG9uc1xuICAgIGZ1bmN0aW9uIGVkaXRNb3JlKHRpdGxlKSB7XG4gICAgICB1aUVkaXRJdGVtKHRpdGxlKTtcbiAgICAgIHRpdGxlLnZhbHVlID0gJyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmFzdFNhdmUodGl0bGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKHRpdGxlLnZhbHVlKTtcbiAgICAgIGNvbnN0IG5ld09iaiA9IHsgdGl0bGU6IHRpdGxlLnZhbHVlIH07XG4gICAgICB0b2RvTGlzdC5hZGRJdGVtKG5ld09iaik7XG4gICAgICB0aXRsZS52YWx1ZSA9ICcnO1xuICAgICAgdXBkYXRlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZWRpdChlbGVtKSB7XG4gICAgICBlbGVtLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGVsZW07XG4gICAgICBjb25zdCBvYmogPSB0b2RvTGlzdC5nZXRJdGVtKHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSk7XG4gICAgICBjb25zb2xlLmxvZyhvYmopO1xuICAgICAgdWlFZGl0SXRlbShvYmoudGl0bGUsIG9iai5kdWVEYXRlLCBvYmoucHJpb3JpdHksIG9iai5wcm9qZWN0LCBvYmoubm90ZXMsIG9iai5pZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVsZXRlSXRlbShpdGVtKSB7XG4gICAgICBjb25zdCB7IHRhcmdldCB9ID0gaXRlbTtcbiAgICAgIHRvZG9MaXN0LmRlbGV0ZUl0ZW0odGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpKTtcbiAgICAgIHVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBzZXRDaGVja2VkSGFuZGxlcixcbiAgICAgIGVkaXRNb3JlLFxuICAgICAgZmFzdFNhdmUsXG4gICAgICBlZGl0LFxuICAgICAgZGVsZXRlSXRlbSxcbiAgICB9O1xuICB9KSgpO1xuXG4gIHJldHVybiB7XG4gICAgaGFuZGxlcnMsXG4gICAgc2V0Q3VycmVudEZpbHRlcixcbiAgICBsb2FkLFxuICAgIHVwZGF0ZSxcbiAgfTtcbn0pKCk7XG5cbi8vIEFERC9FRElUIElURU1TXG5leHBvcnQgZGVmYXVsdCB1aUNvbnRyb2w7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rdG9kb19saXN0XCJdID0gc2VsZltcIndlYnBhY2tDaHVua3RvZG9fbGlzdFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiM3JkcGFydFwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oNzI3MykpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==