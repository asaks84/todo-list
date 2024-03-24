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
  const priority = (() => {
    switch (parseInt(obj.priority, 10)) {
      case 1:
        return (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('i', ['me-2', 'bi', 'bi-flag-fill', 'text-success'], {
          'data-toggle': 'tooltip',
          'data-placement': 'top',
          title: 'Priority 1',
        });
      case 2:
        return (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('i', ['me-2', 'bi', 'bi-flag-fill', 'text-warning'], {
          'data-toggle': 'tooltip',
          'data-placement': 'top',
          title: 'Priority 2',
        });
      case 3:
        return (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('i', ['me-2', 'bi', 'bi-flag-fill', 'text-danger'], {
          'data-toggle': 'tooltip',
          'data-placement': 'top',
          title: 'Priority 3',
        });
      default:
        return (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)('i', ['me-2', 'bi', 'bi-flag'], {
          'data-toggle': 'tooltip',
          'data-placement': 'top',
          title: 'Priority 0',
        });
    }
  })();
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
  btnHeader.append(span, priority, code);
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

window.addEventListener('DOMContentLoaded', () => {
  const tooltips = document.querySelectorAll('[data-toggle="tooltip"]');
  tooltips.forEach((tip) => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9KU09ORnVuY3Rpb25zLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvY29yZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL2RhdGUuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9lZGl0Q29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9saXN0Q29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9zY3JpcHQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy91aUNvbW1vbkZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL3VpQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcbi8vIGltcG9ydCBhZGRMaW5lIGZyb20gJy4vdWlMaXN0R2VuZXJhdG9yJztcblxuZXhwb3J0IGZ1bmN0aW9uIHBvcHVsYXRlU3RvcmFnZSgpIHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhdGEnLCB0b2RvTGlzdC50b0pTT04oKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXN0b3JlU3RvcmFnZSgpIHtcbiAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXRhJykgPT09IG51bGwpIHJldHVybjtcbiAgdG9kb0xpc3QucmVzdG9yZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGF0YScpKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbm5lY3QoKSB7XG4gIGNvbnN0IHJlcXVlc3RVUkwgPSAnLi9hc3NldHMvZGF0YS5qc29uJztcbiAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IGZldGNoKHJlcXVlc3RVUkwpO1xuICBpZiAoIXJlcXVlc3Qub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIFN0YXR1czogJHtyZXF1ZXN0LnN0YXR1c31gKTtcbiAgfVxuXG4gIHJldHVybiByZXF1ZXN0O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcG9wdWxhdGUoKSB7XG4gIGNvbnN0IHZhbHVlID0gYXdhaXQgY29ubmVjdCgpO1xuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0KCkge1xuICB0b2RvTGlzdC5yZXN0b3JlKHBvcHVsYXRlKCkpO1xufVxuIiwiZnVuY3Rpb24gQ3JlYXRlSXRlbShudW0sIHRleHQsIGRlYWRsaW5lID0gMCwgcHJpb3JpdHlOdW0gPSAwLCBwcm9qZWN0ID0gbnVsbCwgY2hlY2sgPSBmYWxzZSkge1xuICBsZXQgdGl0bGUgPSB0ZXh0O1xuICBsZXQgZHVlRGF0ZSA9IGRlYWRsaW5lO1xuICBsZXQgcHJvamVjdE5hbWUgPSBwcm9qZWN0O1xuICBsZXQgcHJpb3JpdHkgPSBwcmlvcml0eU51bTtcbiAgbGV0IGNoZWNrZWQgPSBjaGVjaztcbiAgY29uc3QgaWQgPSBudW0udG9TdHJpbmcoKTtcbiAgY29uc3Qgbm90ZXMgPSBbXTtcblxuICBmdW5jdGlvbiBlZGl0VGl0bGUodmFsKSB7IHRpdGxlID0gdmFsOyB9XG4gIGNvbnN0IGdldFRpdGxlID0gKCkgPT4gdGl0bGU7XG4gIGZ1bmN0aW9uIGVkaXRQcmlvcml0eSh2YWwpIHsgcHJpb3JpdHkgPSB2YWw7IH1cbiAgY29uc3QgZ2V0UHJpb3JpdHkgPSAoKSA9PiBwcmlvcml0eTtcbiAgZnVuY3Rpb24gZGVsZXRlRHVvRGF0ZSgpIHsgZHVlRGF0ZSA9IDA7IH1cbiAgZnVuY3Rpb24gZWRpdER1ZURhdGUodmFsKSB7IGR1ZURhdGUgPSB2YWw7IH1cbiAgY29uc3QgZ2V0RHVlRGF0ZSA9ICgpID0+IGR1ZURhdGU7XG4gIGZ1bmN0aW9uIGVkaXRQcm9qZWN0KHZhbCkgeyBwcm9qZWN0TmFtZSA9IHZhbDsgfVxuICBjb25zdCBnZXRQcm9qZWN0ID0gKCkgPT4gcHJvamVjdE5hbWU7XG4gIGZ1bmN0aW9uIGVkaXRDaGVjaygpIHsgY2hlY2tlZCA9ICFjaGVja2VkOyB9XG4gIGNvbnN0IGdldENoZWNrID0gKCkgPT4gY2hlY2tlZDtcbiAgZnVuY3Rpb24gYWRkTm90ZSh2YWwpIHsgbm90ZXMucHVzaCh2YWwpOyB9XG4gIGZ1bmN0aW9uIGRlbGV0ZU5vdGUocG9zKSB7IG5vdGVzLnNwbGljZShwb3MsIDEpOyB9XG4gIGZ1bmN0aW9uIGVkaXROb3RlKHBvcywgdmFsKSB7IG5vdGVzW3Bvc10gPSB2YWw7IH1cbiAgY29uc3QgZ2V0QWxsTm90ZXMgPSAoKSA9PiBub3RlcztcbiAgY29uc3QgZ2V0Tm90ZSA9IChwb3MpID0+IG5vdGVzW3Bvc107XG4gIGNvbnN0IGdldElkID0gKCkgPT4gaWQ7XG5cbiAgcmV0dXJuIHtcbiAgICBhZGROb3RlLFxuICAgIGVkaXROb3RlLFxuICAgIGdldE5vdGUsXG4gICAgZGVsZXRlTm90ZSxcbiAgICBnZXRBbGxOb3RlcyxcblxuICAgIGVkaXRUaXRsZSxcbiAgICBnZXRUaXRsZSxcblxuICAgIGVkaXREdWVEYXRlLFxuICAgIGRlbGV0ZUR1b0RhdGUsXG4gICAgZ2V0RHVlRGF0ZSxcblxuICAgIGVkaXRQcm9qZWN0LFxuICAgIGdldFByb2plY3QsXG5cbiAgICBlZGl0UHJpb3JpdHksXG4gICAgZ2V0UHJpb3JpdHksXG5cbiAgICBlZGl0Q2hlY2ssXG4gICAgZ2V0Q2hlY2ssXG5cbiAgICBnZXRJZCxcbiAgfTtcbn1cblxuY29uc3QgdG9kb0xpc3QgPSAoKCkgPT4ge1xuICBjb25zdCBsaXN0ID0gW107XG5cbiAgZnVuY3Rpb24gZmluZE9ialBvcyhpZFZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAobGlzdFtpXS5nZXRJZCgpID09PSBpZFZhbHVlKSByZXR1cm4gaTtcbiAgICB9XG4gICAgdGhyb3cgRXJyb3IoJ09iamVjdCBub3QgZm91bmQnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJldHVybk9iaihpdGVtKSB7XG4gICAgY29uc3QgdGl0bGUgPSBpdGVtLmdldFRpdGxlKCk7XG4gICAgY29uc3QgcHJvamVjdCA9IGl0ZW0uZ2V0UHJvamVjdCgpO1xuICAgIGNvbnN0IGR1ZURhdGUgPSBpdGVtLmdldER1ZURhdGUoKTtcbiAgICBjb25zdCBwcmlvcml0eSA9IGl0ZW0uZ2V0UHJpb3JpdHkoKTtcbiAgICBjb25zdCBjaGVja2VkID0gaXRlbS5nZXRDaGVjaygpO1xuICAgIGNvbnN0IG5vdGVzID0gaXRlbS5nZXRBbGxOb3RlcygpO1xuICAgIGNvbnN0IGlkID0gaXRlbS5nZXRJZCgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkLCB0aXRsZSwgcHJvamVjdCwgZHVlRGF0ZSwgcHJpb3JpdHksIGNoZWNrZWQsIG5vdGVzLFxuICAgIH07XG4gIH1cbiAgY29uc3QgZ2V0SXRlbSA9IChpZCkgPT4gcmV0dXJuT2JqKGxpc3RbZmluZE9ialBvcyhpZCldKTtcbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGlzdC5sZW5ndGg7XG4gIGZ1bmN0aW9uIHNldENoZWNrZWQoaWQpIHsgbGlzdFtmaW5kT2JqUG9zKGlkKV0uZWRpdENoZWNrKCk7IH1cbiAgY29uc3QgYWxsVGFza3NMaXN0ID0gKCkgPT4gbGlzdC5tYXAoKG9iaikgPT4gKHJldHVybk9iaihvYmopKSk7XG4gIGZ1bmN0aW9uIHJlc2V0KCkgeyBsaXN0Lmxlbmd0aCA9IDA7IH1cblxuICBjb25zdCBnZXRQcm9qZWN0cyA9ICgpID0+IGxpc3QubWFwKChpdGVtKSA9PiBpdGVtLmdldFByb2plY3QoKSlcbiAgICAuZmlsdGVyKCh2YWx1ZSwgcG9zLCBzZWxmKSA9PiB2YWx1ZSAhPT0gbnVsbCAmJiBzZWxmLmluZGV4T2YodmFsdWUpID09PSBwb3MpO1xuXG4gIGZ1bmN0aW9uIGdldEJpZ2dlcklkKCkge1xuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkgcmV0dXJuIDA7XG4gICAgY29uc3QgbGF0ZXN0T2JqID0gbGlzdC5yZWR1Y2UoKG1heCwgb2JqKSA9PiAob2JqLmdldElkKCkgPiBtYXguZ2V0SWQoKSA/IG9iaiA6IG1heCkpO1xuICAgIGNvbnNvbGUubG9nKGxhdGVzdE9iai5nZXRJZCgpKTtcbiAgICByZXR1cm4gbGF0ZXN0T2JqLmdldElkKCk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRJdGVtKG9iaikge1xuICAgIGNvbnN0IGlkID0gZ2V0QmlnZ2VySWQoKSA9PT0gMCA/IDAgOiBwYXJzZUludChnZXRCaWdnZXJJZCgpLCAxMCkgKyAxO1xuICAgIGNvbnN0IG5ld0l0ZW0gPSBDcmVhdGVJdGVtKGlkLCBvYmoudGl0bGUsIG9iai5kdWVEYXRlLCBvYmoucHJpb3JpdHksIG9iai5wcm9qZWN0LCBvYmouY2hlY2tlZCk7XG4gICAgbGlzdC5wdXNoKG5ld0l0ZW0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZWRpdEl0ZW0ob2JqSUQsIG5ld09iaikge1xuICAgIGNvbnN0IG9ialRvRWRpdCA9IGxpc3RbZmluZE9ialBvcyhvYmpJRCldO1xuICAgIGNvbnN0IGl0ZW0gPSByZXR1cm5PYmoob2JqVG9FZGl0KTtcbiAgICBPYmplY3Qua2V5cyhuZXdPYmopLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKGl0ZW1ba2V5XSAhPT0gdW5kZWZpbmVkICYmIGl0ZW1ba2V5XSAhPT0gbmV3T2JqW2tleV0pIHtcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICBjYXNlICd0aXRsZSc6XG4gICAgICAgICAgICBvYmpUb0VkaXQuZWRpdFRpdGxlKG5ld09ialtrZXldKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3Byb2plY3QnOlxuICAgICAgICAgICAgb2JqVG9FZGl0LmVkaXRQcm9qZWN0KG5ld09ialtrZXldKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2R1ZURhdGUnOlxuICAgICAgICAgICAgb2JqVG9FZGl0LmVkaXREdWVEYXRlKG5ld09ialtrZXldKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3ByaW9yaXR5JzpcbiAgICAgICAgICAgIG9ialRvRWRpdC5lZGl0UHJpb3JpdHkobmV3T2JqW2tleV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdDaGF2ZSBpbnbDoWxpZGEnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZWRpdE5vdGUoaWQsIHBvcywgdmFsKSB7XG4gICAgbGlzdFtmaW5kT2JqUG9zKGlkKV0uZWRpdE5vdGUocG9zLCB2YWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVsZXRlSXRlbShpZCkge1xuICAgIGxpc3Quc3BsaWNlKGZpbmRPYmpQb3MoaWQpLCAxKTtcbiAgfVxuXG4gIGNvbnN0IHRvSlNPTiA9ICgpID0+IHtcbiAgICBjb25zdCBsaXN0RGF0YSA9IGxpc3QubWFwKChpdGVtKSA9PiAoe1xuICAgICAgaWQ6IGl0ZW0uZ2V0SWQoKSxcbiAgICAgIHRpdGxlOiBpdGVtLmdldFRpdGxlKCksXG4gICAgICBwcm9qZWN0OiBpdGVtLmdldFByb2plY3QoKSxcbiAgICAgIGR1ZURhdGU6IGl0ZW0uZ2V0RHVlRGF0ZSgpLFxuICAgICAgcHJpb3JpdHk6IGl0ZW0uZ2V0UHJpb3JpdHkoKSxcbiAgICAgIGNoZWNrZWQ6IGl0ZW0uZ2V0Q2hlY2soKSxcbiAgICAgIG5vdGVzOiBpdGVtLmdldEFsbE5vdGVzKCksXG4gICAgfSkpO1xuXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHsgbGlzdDogbGlzdERhdGEgfSwgJycsIDEpO1xuICB9O1xuXG4gIGNvbnN0IHJlc3RvcmUgPSAoZGF0YSkgPT4ge1xuICAgIHJlc2V0KCk7XG4gICAgY29uc3QgeyBsaXN0OiBsaXN0RGF0YSB9ID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICBsaXN0RGF0YS5mb3JFYWNoKFxuICAgICAgKHtcbiAgICAgICAgaWQsIHRpdGxlLCBwcm9qZWN0LCBkdWVEYXRlLCBwcmlvcml0eSwgY2hlY2tlZCwgbm90ZXMsXG4gICAgICB9KSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0l0ZW0gPSBDcmVhdGVJdGVtKGlkLCB0aXRsZSwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QsIGNoZWNrZWQpO1xuICAgICAgICBub3Rlcy5mb3JFYWNoKChub3RlKSA9PiBuZXdJdGVtLmFkZE5vdGUobm90ZSkpO1xuICAgICAgICBsaXN0LnB1c2gobmV3SXRlbSk7XG4gICAgICB9LFxuICAgICk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRMZW5ndGgsXG4gICAgZWRpdE5vdGUsXG4gICAgZWRpdEl0ZW0sXG4gICAgYWRkSXRlbSxcbiAgICBkZWxldGVJdGVtLFxuICAgIHJlc3RvcmUsXG4gICAgdG9KU09OLFxuICAgIHNldENoZWNrZWQsXG4gICAgZ2V0UHJvamVjdHMsXG4gICAgcmVzZXQsXG4gICAgcmV0dXJuT2JqLFxuICAgIGFsbFRhc2tzTGlzdCxcbiAgICBnZXRJdGVtLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdG9kb0xpc3Q7XG4iLCIvLyBpbXBvcnQgeyBwdEJSIH0gZnJvbSAnZGF0ZS1mbnMvbG9jYWxlJztcbmltcG9ydCB7IGZvcm1hdCB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCBJTWFzayBmcm9tICdpbWFzayc7XG5cbmNvbnN0IHNwbGl0VG9Db2RlID0gKGRhdGUpID0+IGRhdGUuc3BsaXQoJy8nKS5yZXZlcnNlKCkuam9pbignLycpLnJlcGxhY2VBbGwoJy8nLCAnLCAnKTtcbmV4cG9ydCBjb25zdCB0b0lucHV0ID0gKGRhdGEpID0+IGZvcm1hdChuZXcgRGF0ZShzcGxpdFRvQ29kZShkYXRhKSksICdkZC9MTC95eXl5Jyk7XG4vLyBjb25zdCBnZXREYXRhID0gKGFycikgPT4gYXJyLmZvckVhY2goZWxlbWVudCA9PiB7XG5cbi8vIH0pO1xuXG5leHBvcnQgY29uc3QgbWFza0RhdGUgPSB7XG4gIG1hc2s6ICdkL2BtL2BZJyxcbiAgYmxvY2tzOiB7XG4gICAgZDoge1xuICAgICAgbWFzazogSU1hc2suTWFza2VkUmFuZ2UsXG4gICAgICBwbGFjZWhvbGRlckNoYXI6ICdkJyxcbiAgICAgIGZyb206IDEsXG4gICAgICB0bzogMzEsXG4gICAgICBtYXhMZW5ndGg6IDIsXG4gICAgfSxcbiAgICBtOiB7XG4gICAgICBtYXNrOiBJTWFzay5NYXNrZWRSYW5nZSxcbiAgICAgIHBsYWNlaG9sZGVyQ2hhcjogJ20nLFxuICAgICAgZnJvbTogMSxcbiAgICAgIHRvOiAxMixcbiAgICAgIG1heExlbmd0aDogMixcbiAgICB9LFxuICAgIFk6IHtcbiAgICAgIG1hc2s6IElNYXNrLk1hc2tlZFJhbmdlLFxuICAgICAgcGxhY2Vob2xkZXJDaGFyOiAnYScsXG4gICAgICBmcm9tOiAxMDAwLFxuICAgICAgdG86IDk5OTksXG4gICAgfSxcbiAgfSxcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tY3ljbGUgKi9cbmltcG9ydCB0b2RvTGlzdCBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IHtcbiAgY3JlYXRlRWxlbWVudCwgY3JlYXRlUHJpb3JpdHlTZWxlY3QsIGR1ZURhdGVNYXNrLCBzZWFyY2hQcm9qZWN0cyxcbn0gZnJvbSAnLi91aUNvbW1vbkZ1bmN0aW9ucyc7XG5pbXBvcnQgdWlDb250cm9sIGZyb20gJy4vdWlDb250cm9sbGVyJztcblxuZnVuY3Rpb24gc2F2ZSh0aXRsZSwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QsIG5vdGVzLCBpZCkge1xuICBjb25zdCBuZXdPYmogPSB7XG4gICAgdGl0bGU6IHRpdGxlLnZhbHVlLFxuICAgIGR1ZURhdGU6IGR1ZURhdGUudmFsdWUsXG4gICAgcHJpb3JpdHk6IHByaW9yaXR5LnZhbHVlLFxuICAgIHByb2plY3Q6IHByb2plY3QudmFsdWUsXG4gICAgbm90ZXMsXG4gIH07XG4gIGlmIChpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdG9kb0xpc3QuZWRpdEl0ZW0oaWQsIG5ld09iaik7XG4gIH0gZWxzZSB7XG4gICAgdG9kb0xpc3QuYWRkSXRlbShuZXdPYmopO1xuICB9XG4gIHVpQ29udHJvbC51cGRhdGUoKTtcbn1cblxuZnVuY3Rpb24gdWlFZGl0SXRlbSh0aXRsZSwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QsIG5vdGVzLCBpZCkge1xuICBjb25zb2xlLmxvZyhgIHVpRWRpdEl0ZW1cbiAgICBpZDogJHtpZH1cbiAgICB0aXRsZTogJHt0aXRsZX1cbiAgICBkdWVEYXRlOiAke2R1ZURhdGV9XG4gICAgcHJpb3JpdHk6ICR7cHJpb3JpdHl9XG4gICAgcHJvamVjdDogJHtwcm9qZWN0fVxuICAgIG5vdGVzICR7bm90ZXN9XG4gIGApO1xuICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5tb2RhbC1ib2R5Jyk7XG4gIC8vIGNyZWF0aW5nIGVsZW1lbnRzXG4gIGNvbnN0IHJvdzEgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3JvdyddKTtcbiAgY29uc3QgdGl0bGVEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2lucHV0LWdyb3VwJywgJ21iLTMnLCAnZ2FwLTEnXSk7XG4gIGNvbnN0IHRpdGxlSW5wdXQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIFsnZm9ybS1jb250cm9sJ10sIHtcbiAgICBpZDogJ2l0ZW1UaXRsZScsXG4gICAgdHlwZTogJ3RleHQnLFxuICAgIHBsYWNlaG9sZGVyOiAnTm92YSBUYXJlZmEuLi4nLFxuICB9KTtcbiAgY29uc3Qgcm93MiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnYmctZ3JheScsICdyb3cnLCAnZy0wJywgJ2dhcC0yJywgJ2ZsZXgtbm93cmFwJ10pO1xuXG4gIGNvbnN0IGRhdGVEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2RhdGUnLCAnZmxhdHBpY2tyJywgJ2NvbCddKTtcbiAgY29uc3QgZGF0ZUlucHV0ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2Zvcm0tY29udHJvbCcsICdmbGF0cGlja3ItaW5wdXQnXSwge1xuICAgIGlkOiAnZHVlRGF0ZScsXG4gICAgdHlwZTogJ3RleHQnLFxuICAgIGlucHV0bW9kZTogJ251bWVyaWMnLFxuICAgICdkYXRhLWlucHV0JzogdW5kZWZpbmVkLFxuICAgIGF1dG9jb21wbGV0ZTogJ29mZicsXG4gIH0pO1xuICBjb25zdCBkYXRlcGlja2VyVG9nZ2xlID0gY3JlYXRlRWxlbWVudCgnYScsIFsnaW5wdXQtYnV0dG9uJ10sIHtcbiAgICB0aXRsZTogJ3RvZ2dsZScsXG4gICAgJ2RhdGEtdG9nZ2xlJzogdW5kZWZpbmVkLFxuICB9KTtcbiAgY29uc3QgZGF0ZUljb24gPSBjcmVhdGVFbGVtZW50KCdpJywgWyd0ZXh0LXdhcm5pbmcnLCAnc21hbGwnLCAnYmknLCAnYmktY2FsZW5kYXInXSk7XG5cbiAgY29uc3QgcHJpb3JpdHlEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbCddKTtcbiAgY29uc3QgcHJpb3JpdHlTZWxlY3QgPSBjcmVhdGVQcmlvcml0eVNlbGVjdChwcmlvcml0eSk7XG5cbiAgY29uc3QgcHJvamVjdERpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29sJ10pO1xuICBjb25zdCBwcm9qZWN0SW5wdXQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIFsnZm9ybS1jb250cm9sJ10sIHtcbiAgICBpZDogJ2VudGVyUHJvamVjdCcsXG4gICAgdHlwZTogJ3RleHQnLFxuICAgIGxpc3Q6ICdkYXRhbGlzdE9wdGlvbnMnLFxuICAgIHBsYWNlaG9sZGVyOiAnUHJvamV0bycsXG4gICAgYXV0b2NvbXBsZXRlOiAnb2ZmJyxcbiAgfSk7XG4gIGNvbnN0IHByb2plY3REYXRhbGlzdCA9IGNyZWF0ZUVsZW1lbnQoJ2RhdGFsaXN0JywgWydzdWdnZXN0aW9ucycsICdmb3JtJ10sIHtcbiAgICBpZDogJ2RhdGFsaXN0T3B0aW9ucycsXG4gICAgZHJvcHpvbmU6ICdzdHJpbmcnLFxuICB9KTtcblxuICBjb25zdCByb3czID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnLCAncHQtMiddKTtcblxuICBjb25zdCBub3Rlc0NvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29udGFpbmVyJ10pO1xuICBjb25zdCBub3Rlc0hlYWRlciA9IGNyZWF0ZUVsZW1lbnQoJ2g2Jyk7XG4gIGNvbnN0IG5vdGVzUm93ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnLCAnZy0yJ10pO1xuICBjb25zdCBub3Rlc0xpc3QgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ25vdGVzTGlzdCddKTtcblxuICBjb25zdCBhZGROb3RlUm93ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnLCAncHQtMicsICdqdXN0aWZ5LWNvbnRlbnQtZW5kJ10pO1xuXG4gIGNvbnN0IGFkZE5vdGVEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbC1hdXRvJywgJ3NtYWxsJywgJ3RleHQtZGFuZ2VyJywgJ3RleHQtd2FybmluZy1lbXBoYXNpcyddKTtcbiAgY29uc3QgYWRkTm90ZUxpbmsgPSBjcmVhdGVFbGVtZW50KCdhJywgW10sIHsgaWQ6ICdhZGROb3RlJyB9KTtcbiAgY29uc3QgYWRkTm90ZUljb24gPSBjcmVhdGVFbGVtZW50KCdpJywgWydiaScsICdiaS1wbHVzLWNpcmNsZSddKTtcbiAgY29uc3QgYWRkTm90ZVRleHQgPSBjcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgY29uc3Qgcm93NCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncm93JywgJ2ctMicsICdwdC0zJywgJ2p1c3RpZnktY29udGVudC1zdGFydCcsICdmbGV4LXJvdy1yZXZlcnNlJ10pO1xuXG4gIGNvbnN0IHNhdmVEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbC1hdXRvJ10pO1xuICBjb25zdCBzYXZlQnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgWydidG4nLCAnYnRuLXdhcm5pbmcnLCAndGV4dC1saWdodCddLCB7XG4gICAgJ2RhdGEtYnMtZGlzbWlzcyc6ICdtb2RhbCcsXG4gIH0pO1xuICBjb25zdCBjYW5jZWxEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbC1hdXRvJ10pO1xuICBjb25zdCBjYW5jZWxCdG4gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2J0bicsICdidG4tc2Vjb25kYXJ5JywgJ3RleHQtbGlnaHQnXSwge1xuICAgICdkYXRhLWJzLWRpc21pc3MnOiAnbW9kYWwnLFxuICB9KTtcblxuICAvLyBhcHBlbmQgZWxlbWVudHNcblxuICAvLyByb3cgMSAodGl0bGUpXG4gIGlmICh0aXRsZSAmJiAodHlwZW9mIHRpdGxlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdGl0bGUudmFsdWUgIT09ICd1bmRlZmluZWQnKSkge1xuICAgIHRpdGxlSW5wdXQudmFsdWUgPSB0eXBlb2YgdGl0bGUgPT09ICdzdHJpbmcnID8gdGl0bGUgOiB0aXRsZS52YWx1ZTtcbiAgfVxuICB0aXRsZURpdi5hcHBlbmRDaGlsZCh0aXRsZUlucHV0KTtcblxuICByb3cxLmFwcGVuZENoaWxkKHRpdGxlRGl2KTtcblxuICAvLyByb3cgMiAoZGF0ZSwgcHJpb3JpdHksIHByb2plY3QpXG5cbiAgLy8gZGF0ZVxuICBpZiAoZHVlRGF0ZSAhPT0gdW5kZWZpbmVkICYmIGR1ZURhdGUgIT09IDApIHtcbiAgICBkYXRlSW5wdXQudmFsdWUgPSBkdWVEYXRlO1xuICB9XG4gIGRhdGVwaWNrZXJUb2dnbGUuYXBwZW5kQ2hpbGQoZGF0ZUljb24pO1xuICBkYXRlRGl2LmFwcGVuZChkYXRlSW5wdXQsIGRhdGVwaWNrZXJUb2dnbGUpO1xuXG4gIC8vIHByaW9yaXR5XG4gIHByaW9yaXR5RGl2LmFwcGVuZENoaWxkKHByaW9yaXR5U2VsZWN0KTtcblxuICAvLyBwcm9qZWN0XG4gIC8vIGNvbnNvbGUubG9nKHByb2plY3QpO1xuICBpZiAodHlwZW9mIHByb2plY3QgIT09ICd1bmRlZmluZWQnICYmIHByb2plY3QgIT09IDApIHByb2plY3RJbnB1dC52YWx1ZSA9IHByb2plY3Q7XG4gIHByb2plY3REaXYuYXBwZW5kKHByb2plY3RJbnB1dCwgcHJvamVjdERhdGFsaXN0KTtcblxuICByb3cyLmFwcGVuZChkYXRlRGl2LCBwcmlvcml0eURpdiwgcHJvamVjdERpdik7XG5cbiAgLy8gcm93MyAobm90ZXMgYXJlYSlcbiAgbm90ZXNIZWFkZXIudGV4dENvbnRlbnQgPSAnTm90YXMnO1xuICBhZGROb3RlVGV4dC50ZXh0Q29udGVudCA9ICdOb3ZhIG5vdGEnO1xuICBhZGROb3RlSWNvbi50ZXh0Q29udGVudCA9ICcgJzsgLy8gZml4aW5nIGEgcHJvYmxlbSBmb3IgdXNpbmcganNcblxuICBhZGROb3RlTGluay5hcHBlbmQoYWRkTm90ZUljb24sIGFkZE5vdGVUZXh0KTtcbiAgYWRkTm90ZURpdi5hcHBlbmRDaGlsZChhZGROb3RlTGluayk7XG4gIGFkZE5vdGVSb3cuYXBwZW5kQ2hpbGQoYWRkTm90ZURpdik7XG4gIGlmIChub3Rlcykge1xuICAgIG5vdGVzLmZvckVhY2goKG5vdGUpID0+IHtcbiAgICAgIC8vIHByZWNpc28gY2lyYXIgbyBsYXlvdXQgZGFzIG5vdGFzXG4gICAgICBub3Rlc0xpc3QuaW5uZXJIVE1MICs9IGA8c3Bhbj4ke25vdGV9PC9zcGFuPmA7XG4gICAgfSk7XG4gIH1cbiAgbm90ZXNSb3cuYXBwZW5kKG5vdGVzTGlzdCwgYWRkTm90ZVJvdyk7XG4gIG5vdGVzQ29udGFpbmVyLmFwcGVuZChub3Rlc0hlYWRlciwgbm90ZXNSb3cpO1xuXG4gIHJvdzMuYXBwZW5kQ2hpbGQobm90ZXNDb250YWluZXIpO1xuXG4gIC8vIHJvdzQgKGJ1dHRvbnMpXG4gIGNhbmNlbEJ0bi50ZXh0Q29udGVudCA9ICdDYW5jZWwnO1xuICBzYXZlQnRuLnRleHRDb250ZW50ID0gJ1NhdmUnO1xuICBpZiAoaWQgIT09IHVuZGVmaW5lZCkgc2F2ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNhdmUodGl0bGVJbnB1dCwgZGF0ZUlucHV0LCBwcmlvcml0eVNlbGVjdCwgcHJvamVjdElucHV0LCBub3RlcywgaWQpKTtcbiAgZWxzZSBzYXZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc2F2ZSh0aXRsZUlucHV0LCBkYXRlSW5wdXQsIHByaW9yaXR5U2VsZWN0LCBwcm9qZWN0SW5wdXQpKTtcbiAgc2F2ZURpdi5hcHBlbmRDaGlsZChzYXZlQnRuKTtcbiAgY2FuY2VsRGl2LmFwcGVuZENoaWxkKGNhbmNlbEJ0bik7XG5cbiAgcm93NC5hcHBlbmQoc2F2ZURpdiwgY2FuY2VsRGl2KTtcblxuICBtb2RhbC5hcHBlbmQocm93MSwgcm93Miwgcm93Mywgcm93NCk7XG4gIGR1ZURhdGVNYXNrKCk7XG4gIHNlYXJjaFByb2plY3RzKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHVpRWRpdEl0ZW07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tY3ljbGUgKi9cbmltcG9ydCB7XG4gIGFkZENoZWNrZWQsIGNyZWF0ZUVsZW1lbnQsIGhhc05vdGVzLCBpc0NoZWNrZWQsIGxpc3QsXG59IGZyb20gJy4vdWlDb21tb25GdW5jdGlvbnMnO1xuaW1wb3J0IHVpQ29udHJvbCBmcm9tICcuL3VpQ29udHJvbGxlcic7XG5cbmZ1bmN0aW9uIGluc2VydE5vdGUobm90ZXMsIGJvZHkpIHtcbiAgbm90ZXMuZm9yRWFjaCgoY29udGVudCkgPT4ge1xuICAgIGNvbnN0IGNvbnRlbnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250ZW50RGl2LmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgYm9keS5hcHBlbmRDaGlsZChjb250ZW50RGl2KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZExpbmUob2JqKSB7XG4gIC8vIGhlYWRlclxuICBjb25zdCBpdGVtID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydhY2NvcmRpb24taXRlbSddKTtcbiAgY29uc3QgaGVhZGVyID0gY3JlYXRlRWxlbWVudCgnaDInLCBbJ2FjY29yZGlvbi1oZWFkZXInLCAncC0xJywgJ2QtZmxleCcsICdhbGlnbi1pdGVtcy1jZW50ZXInLCAnZ2FwLTEnXSk7XG4gIGNvbnN0IGNoZWNrYm94ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2Zvcm0tY2hlY2staW5wdXQnLCAndGV4dC1iZy13YXJuaW5nJ10sIHtcbiAgICB0eXBlOiAnY2hlY2tib3gnLFxuICAgICdkYXRhLWlkJzogYCR7b2JqLmlkfWAsXG4gIH0pO1xuICBjb25zdCBidG5IZWFkZXIgPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2FjY29yZGlvbi1idXR0b24nLCAnY29sbGFwc2VkJywgJ2ZsZXgtZmlsbCddLCB7XG4gICAgdHlwZTogJ2J1dHRvbicsXG4gICAgJ2RhdGEtYnMtdG9nZ2xlJzogJ2NvbGxhcHNlJyxcbiAgICAnYXJpYS1leHBhbmRlZCc6ICdmYWxzZScsXG4gICAgJ2RhdGEtYnMtdGFyZ2V0JzogYCNpdGVtLSR7b2JqLmlkfWAsXG4gIH0pO1xuICBjb25zdCBwcmlvcml0eSA9ICgoKSA9PiB7XG4gICAgc3dpdGNoIChwYXJzZUludChvYmoucHJpb3JpdHksIDEwKSkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gY3JlYXRlRWxlbWVudCgnaScsIFsnbWUtMicsICdiaScsICdiaS1mbGFnLWZpbGwnLCAndGV4dC1zdWNjZXNzJ10sIHtcbiAgICAgICAgICAnZGF0YS10b2dnbGUnOiAndG9vbHRpcCcsXG4gICAgICAgICAgJ2RhdGEtcGxhY2VtZW50JzogJ3RvcCcsXG4gICAgICAgICAgdGl0bGU6ICdQcmlvcml0eSAxJyxcbiAgICAgICAgfSk7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiBjcmVhdGVFbGVtZW50KCdpJywgWydtZS0yJywgJ2JpJywgJ2JpLWZsYWctZmlsbCcsICd0ZXh0LXdhcm5pbmcnXSwge1xuICAgICAgICAgICdkYXRhLXRvZ2dsZSc6ICd0b29sdGlwJyxcbiAgICAgICAgICAnZGF0YS1wbGFjZW1lbnQnOiAndG9wJyxcbiAgICAgICAgICB0aXRsZTogJ1ByaW9yaXR5IDInLFxuICAgICAgICB9KTtcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoJ2knLCBbJ21lLTInLCAnYmknLCAnYmktZmxhZy1maWxsJywgJ3RleHQtZGFuZ2VyJ10sIHtcbiAgICAgICAgICAnZGF0YS10b2dnbGUnOiAndG9vbHRpcCcsXG4gICAgICAgICAgJ2RhdGEtcGxhY2VtZW50JzogJ3RvcCcsXG4gICAgICAgICAgdGl0bGU6ICdQcmlvcml0eSAzJyxcbiAgICAgICAgfSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gY3JlYXRlRWxlbWVudCgnaScsIFsnbWUtMicsICdiaScsICdiaS1mbGFnJ10sIHtcbiAgICAgICAgICAnZGF0YS10b2dnbGUnOiAndG9vbHRpcCcsXG4gICAgICAgICAgJ2RhdGEtcGxhY2VtZW50JzogJ3RvcCcsXG4gICAgICAgICAgdGl0bGU6ICdQcmlvcml0eSAwJyxcbiAgICAgICAgfSk7XG4gICAgfVxuICB9KSgpO1xuICBjb25zdCBzcGFuID0gY3JlYXRlRWxlbWVudCgnc3BhbicsIFsnZmxleC1maWxsJ10pO1xuICBjb25zdCBjb2RlID0gY3JlYXRlRWxlbWVudCgnY29kZScsIFsnc21hbGwnLCAndGV4dC1tdXRlZCddKTtcblxuICAvLyBib2R5XG4gIGNvbnN0IGl0ZW1EZXRhaWxzID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydhY2NvcmRpb24tY29sbGFwc2UnLCAnY29sbGFwc2UnXSwge1xuICAgIGlkOiBgaXRlbS0ke29iai5pZH1gLFxuICAgICdkYXRhLWJzLXBhcmVudCc6ICcjbGlzdCcsXG4gIH0pO1xuICBjb25zdCBpdGVtQm9keSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnYWNjb3JkaW9uLWJvZHknXSk7XG4gIGNvbnN0IGVkaXREZWxldGVJdGVtID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydkLWZsZXgnLCAnZmxleC1yb3ctcmV2ZXJzZScsICdjb2wnLCAnZ2FwLTInXSk7XG5cbiAgY29uc3QgYnRuRWRpdCA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIFsnYnRuJywgJ2J0bi13YXJuaW5nJ10sIHtcbiAgICAnZGF0YS1pZCc6IG9iai5pZCxcbiAgICAnZGF0YS1icy10YXJnZXQnOiAnI2V4YW1wbGVNb2RhbCcsXG4gICAgJ2RhdGEtYnMtdG9nZ2xlJzogJ21vZGFsJyxcbiAgfSk7XG4gIGNvbnN0IGJ0bkRlbGV0ZSA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIFsnYnRuJywgJ2J0bi1kYW5nZXInXSwge1xuICAgICdkYXRhLWlkJzogb2JqLmlkLFxuICB9KTtcblxuICAvLyBFVkVOVExJU1RORVJTIE9CSkVDVFNcbiAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdWlDb250cm9sLmhhbmRsZXJzLnNldENoZWNrZWRIYW5kbGVyKTtcblxuICAvLyBGSUxMSU5HIENPTlRFTlRcbiAgLy8gaGVhZGVyXG4gIHNwYW4udGV4dENvbnRlbnQgPSBvYmoudGl0bGU7XG4gIGNvZGUudGV4dENvbnRlbnQgPSBvYmoucHJvamVjdDtcblxuICAvLyBib2R5XG4gIGJ0bkVkaXQudGV4dENvbnRlbnQgPSAnRWRpdCc7XG4gIGJ0bkRlbGV0ZS50ZXh0Q29udGVudCA9ICdEZWxldGUnO1xuXG4gIC8vIEFwcGVuZGluZyBjb250ZW50XG4gIGJ0bkhlYWRlci5hcHBlbmQoc3BhbiwgcHJpb3JpdHksIGNvZGUpO1xuICBoZWFkZXIuYXBwZW5kKGNoZWNrYm94LCBidG5IZWFkZXIpO1xuXG4gIC8vIEJvZHkgY29udGVudFxuICBpZiAoaGFzTm90ZXMob2JqLm5vdGVzKSkge1xuICAgIGluc2VydE5vdGUob2JqLm5vdGVzLCBpdGVtQm9keSk7XG4gIH1cbiAgYnRuRWRpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlbGVtKSA9PiB7XG4gICAgdWlDb250cm9sLmhhbmRsZXJzLmVkaXQoZWxlbSk7XG4gIH0pO1xuICBidG5EZWxldGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1aUNvbnRyb2wuaGFuZGxlcnMuZGVsZXRlSXRlbSk7XG4gIGVkaXREZWxldGVJdGVtLmFwcGVuZChidG5EZWxldGUsIGJ0bkVkaXQpO1xuICBpdGVtQm9keS5hcHBlbmRDaGlsZChlZGl0RGVsZXRlSXRlbSk7XG4gIGl0ZW1EZXRhaWxzLmFwcGVuZENoaWxkKGl0ZW1Cb2R5KTtcblxuICAvLyBBcHBlbmQgZWxlbWVudHMgdG8gbGlzdFxuICBpdGVtLmFwcGVuZChoZWFkZXIsIGl0ZW1EZXRhaWxzKTtcbiAgbGlzdC5hcHBlbmRDaGlsZChpdGVtKTtcbiAgaWYgKGlzQ2hlY2tlZChvYmopKSBhZGRDaGVja2VkKGNoZWNrYm94LCBidG5IZWFkZXIpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhZGRMaW5lO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCAnLi9zdHlsZS5zY3NzJztcbmltcG9ydCB7IHJlc3RvcmVTdG9yYWdlIH0gZnJvbSAnLi9KU09ORnVuY3Rpb25zJztcblxuaW1wb3J0IHtcbiAgY2xlYXJDb250ZW50LFxuICBzaG93UGx1c0J0bixcbiAgYWRkRmllbGQsXG4gIGFkZFRhc2ssXG4gIGlucHV0LFxuICBhZGRNb3JlLFxuICBxdWlja1NhdmUsXG4gIGxpc3QsXG59IGZyb20gJy4vdWlDb21tb25GdW5jdGlvbnMnO1xuaW1wb3J0IHVpRWRpdEl0ZW0gZnJvbSAnLi9lZGl0Q29uc3RydWN0b3InO1xuaW1wb3J0IHVpQ29udHJvbCBmcm9tICcuL3VpQ29udHJvbGxlcic7XG5cbmNvbnN0IHByb2plY3RzSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNwcm9qZWN0cycpO1xuY29uc3QgcHJvamVjdHNEcm9wZG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNwcm9qZWN0cyBkaXYnKTtcbmNvbnN0IG1haW5Nb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNleGFtcGxlTW9kYWwnKTtcblxuLy8gc2V0IG1heCBoZWlnaHQgZm9yIGxpc3QgaXRlbXNcbmZ1bmN0aW9uIHNldE1heEhlaWdodCgpIHtcbiAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gICAgLy8gZ2V0IHBhZGRpbmcgdG9wICsgYm90dG9tIGZvcm0gbWFpbiBlbGVtZW50XG4gICAgbGV0IG1haW5QYWRkaW5nID0gcGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyksIG51bGwpXG4gICAgICAuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy10b3AnKS5tYXRjaCgvXFxkKyhcXC5cXGQrKT8vKSk7XG4gICAgbWFpblBhZGRpbmcgKz0gcGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyksIG51bGwpXG4gICAgICAuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy1ib3R0b20nKS5tYXRjaCgvXFxkKyhcXC5cXGQrKT8vKSk7XG5cbiAgICAvLyBnZXQgb3RoZXIgZWxlbWVudHMgc2l6ZVxuICAgIGNvbnN0IGJvZHlIZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jykub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IGluc2V0SXRlbUhlaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4gPiBkaXYnKS5vZmZzZXRIZWlnaHQ7XG4gICAgY29uc3QgaGVhZGVySGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJykub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IGFzaWRlSGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXNpZGUnKS5vZmZzZXRIZWlnaHQ7XG4gICAgLy8gY29uc3QgZm9vdGVySGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9vdGVyJykub2Zmc2V0SGVpZ2h0O1xuXG4gICAgLy8gc2V0IG1heCBzaXplIGZvciB0YXNrIGxpc3RcbiAgICBjb25zdCBtYXhIZWlnaHQgPSBib2R5SGVpZ2h0IC0gaGVhZGVySGVpZ2h0IC0gaW5zZXRJdGVtSGVpZ2h0IC0gYXNpZGVIZWlnaHQgLSBtYWluUGFkZGluZztcbiAgICBsaXN0LnN0eWxlLm1heEhlaWdodCA9IGAke21heEhlaWdodH1weGA7XG4gIH0gZWxzZSBsaXN0LnN0eWxlLm1heEhlaWdodCA9ICdub25lJztcbn1cblxuLy8gZXZlbnRMaXN0ZW5lcnNcbi8vIGhvbWUgcGFnZSBidXR0b24gZnVuY3Rpb25zXG5hZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdWlFZGl0SXRlbSk7XG5hZGRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgc2hvd1BsdXNCdG4pO1xuYWRkRmllbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBzaG93UGx1c0J0bik7XG5hZGRNb3JlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdWlDb250cm9sLmhhbmRsZXJzLmVkaXRNb3JlKGlucHV0KSk7XG5xdWlja1NhdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB1aUNvbnRyb2wuaGFuZGxlcnMuZmFzdFNhdmUoaW5wdXQpKTtcblxuLy8gc2V0IGhlaWdodCBsaW1pdCBmb3IgbGlzdCBpdGVtc1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBzZXRNYXhIZWlnaHQpO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHNldE1heEhlaWdodCk7XG5cbi8vIGF1dG8tc2F2ZVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgdWlDb250cm9sLnVwZGF0ZSgpO1xufSk7XG5cbi8vIHJlc3RvcmUgZGF0YSB3aGVuIGl0J3MgbG9hZGVkXG53aW5kb3cub25sb2FkID0gcmVzdG9yZVN0b3JhZ2UoKTtcblxuLy8gbWVudSBmb3IgbW9iaWxlIHZlcnNpb25cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gIGlmICghZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJyNwcm9qZWN0cycpKSB7XG4gICAgcHJvamVjdHNEcm9wZG93bi5jbGFzc0xpc3QuYWRkKCdtZW51LWhpZGUnKTtcbiAgfVxufSk7XG5wcm9qZWN0c0ljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGlmIChwcm9qZWN0c0Ryb3Bkb3duLmNsYXNzTGlzdC5jb250YWlucygnbWVudS1oaWRlJykpIHtcbiAgICBwcm9qZWN0c0Ryb3Bkb3duLmNsYXNzTGlzdC5yZW1vdmUoJ21lbnUtaGlkZScpO1xuICB9IGVsc2Uge1xuICAgIHByb2plY3RzRHJvcGRvd24uY2xhc3NMaXN0LmFkZCgnbWVudS1oaWRlJyk7XG4gIH1cbn0pO1xuXG4vLyBjbGVhciBtb2RhbCBjb250ZW50IGV2ZXJ5dGltZSBpdCdzIGNsb3NlZFxubWFpbk1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2hpZGRlbi5icy5tb2RhbCcsICgpID0+IHtcbiAgY2xlYXJDb250ZW50KG1haW5Nb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtYm9keScpKTtcbn0pO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgY29uc3QgdG9vbHRpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJyk7XG4gIHRvb2x0aXBzLmZvckVhY2goKHRpcCkgPT4ge1xuICAgIHRpcCA9IG5ldyBib290c3RyYXAuVG9vbHRpcCh0aXApO1xuICB9KTtcbn0sIGZhbHNlKTtcblxuLy8gc3RhcnQgYXBwXG51aUNvbnRyb2wubG9hZCgpO1xuIiwiaW1wb3J0IGZsYXRwaWNrciBmcm9tICdmbGF0cGlja3InO1xuaW1wb3J0IHsgUG9ydHVndWVzZSB9IGZyb20gJ2ZsYXRwaWNrci9kaXN0L2wxMG4vcHQnO1xuaW1wb3J0IElNYXNrIGZyb20gJ2ltYXNrJztcbmltcG9ydCB7IG1hc2tEYXRlIH0gZnJvbSAnLi9kYXRlJztcbmltcG9ydCB0b2RvTGlzdCBmcm9tICcuL2NvcmUnO1xuXG5leHBvcnQgY29uc3QgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNsaXN0Jyk7XG5leHBvcnQgY29uc3QgYWRkRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCNpdGVtVGl0bGUnKTtcbmV4cG9ydCBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG5leHBvcnQgY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2EjYWRkSXRlbScpO1xuZXhwb3J0IGNvbnN0IGFkZE1vcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24jYWRkTW9yZScpO1xuZXhwb3J0IGNvbnN0IHF1aWNrU2F2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbiNzYXZlSXRlbScpO1xuXG5leHBvcnQgY29uc3QgaXNDaGVja2VkID0gKGUpID0+IGUuY2hlY2tlZCA9PT0gdHJ1ZTtcbmV4cG9ydCBjb25zdCBoYXNOb3RlcyA9IChvYmopID0+IG9iai5sZW5ndGggPiAwO1xuZXhwb3J0IGNvbnN0IGxvYWRMaXN0ID0gKCkgPT4gWy4uLnRvZG9MaXN0LmFsbFRhc2tzTGlzdCgpXTtcbmV4cG9ydCBjb25zdCBzb3J0UGFyYW0gPSAoYXJyLCBwYXJhbSkgPT4gWy4uLmFycl1cbiAgLnNvcnQoKGEsIGIpID0+ICgoYVtwYXJhbV0gPCBiW3BhcmFtXSkgPyAtMSA6IDEpKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZENoZWNrZWQoY2hlY2tib3gsIGJ1dHRvbikge1xuICBjaGVja2JveC5jaGVja2VkID0gdHJ1ZTtcbiAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3RleHQtZGVjb3JhdGlvbi1saW5lLXRocm91Z2gnKTtcbn1cblxuY29uc3Qgc3BlY2lhbENoYXJzRW50cmllcyA9IFtcbiAgWyfDgMOBw4LDg8OEw4UnLCAnQSddLFxuICBbJ8Ogw6HDosOjw6TDpScsICdhJ10sXG4gIFsnw4jDicOKw4snLCAnRSddLFxuICBbJ8Oow6nDqsOrJywgJ2UnXSxcbiAgWyfDjMONw47DjycsICdJJ10sXG4gIFsnw6zDrcOuw68nLCAnaSddLFxuICBbJ8OSw5PDlcOUw5YnLCAnTyddLFxuICBbJ8Oyw7PDtcO0w7YnLCAnbyddLFxuICBbJ8OZw5rDm8OcJywgJ1UnXSxcbiAgWyfDucO6w7vDvCcsICd1J10sXG4gIFsnw4cnLCAnQyddLFxuICBbJ8OnJywgJ2MnXSxcbl07XG5cbmNvbnN0IHNwZWNpYWxDaGFyc01hcCA9IE9iamVjdC5mcm9tRW50cmllcyhcbiAgc3BlY2lhbENoYXJzRW50cmllcy5mbGF0TWFwKChbY2hhcnMsIHZhbHVlXSkgPT4gWy4uLmNoYXJzXS5tYXAoKGNoYXIpID0+IFtjaGFyLCB2YWx1ZV0pKSxcbik7XG5cbi8vIEVMRU1FTlQgQ1JFQVRPUlNcblxuZXhwb3J0IGZ1bmN0aW9uIHNldEF0dHJzKGVsZW0sIGF0dHJzKSB7XG4gIE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQgJiYgYXR0cnNba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBlbGVtLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtLnNldEF0dHJpYnV0ZShrZXksICcnKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWcsIGNsYXNzTmFtZXMgPSBbXSwgYXR0cmlidXRlcyA9IHt9KSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gIGlmIChjbGFzc05hbWVzLmxlbmd0aCkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzTmFtZXMpO1xuICBzZXRBdHRycyhlbGVtZW50LCBhdHRyaWJ1dGVzKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPcHRpb24odmFsdWUsIHRleHQsIHNlbGVjdGVkKSB7XG4gIGNvbnN0IG9wdGlvbiA9IGNyZWF0ZUVsZW1lbnQoJ29wdGlvbicsIFtdLCB7IHZhbHVlIH0pO1xuICBvcHRpb24udGV4dENvbnRlbnQgPSB0ZXh0O1xuICBpZiAoc2VsZWN0ZWQpIHtcbiAgICBvcHRpb24uc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICcnKTtcbiAgfVxuICByZXR1cm4gb3B0aW9uO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJpb3JpdHlTZWxlY3QobnVtID0gMCkge1xuICBjb25zdCBzZWxlY3QgPSBjcmVhdGVFbGVtZW50KCdzZWxlY3QnLCBbJ2Zvcm0tc2VsZWN0J10sIHtcbiAgICAnYXJpYS1sYWJlbCc6ICdQcmlvcmlkYWRlJyxcbiAgfSk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSArPSAxKSB7XG4gICAgY29uc3QgdGV4dCA9IGkgPT09IDAgPyAnUHJpb3JpZGFkZScgOiBgUHJpb3JpZGFkZSAke2l9YDtcbiAgICBjb25zdCBzZWxlY3RlZCA9IGkgPT09IHBhcnNlSW50KG51bSwgMTApO1xuICAgIGNvbnN0IG9wdGlvbiA9IGNyZWF0ZU9wdGlvbihpLCB0ZXh0LCBzZWxlY3RlZCk7XG4gICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gIH1cbiAgcmV0dXJuIHNlbGVjdDtcbn1cblxuLy8gVUkgRlVOQ1RJT05TXG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckNvbnRlbnQoZWxlbSkge1xuICB3aGlsZSAoZWxlbS5maXJzdENoaWxkKSB7XG4gICAgZWxlbS5yZW1vdmVDaGlsZChlbGVtLmxhc3RDaGlsZCk7XG4gIH1cbn1cblxuLy8gQUREL0VESVQgTkVXIFRBU0sgU0NSRUVOIEZVTkNUSU9OU1xuXG5mdW5jdGlvbiByZW1vdmVTcGVjaWFscyh0ZXh0KSB7XG4gIGxldCBzZWFyY2ggPSB0ZXh0O1xuICBzZWFyY2ggPSBzZWFyY2gucmVwbGFjZShcbiAgICAvW8OALcOcw6Atw7xdL2csXG4gICAgKG1hdGNoKSA9PiBzcGVjaWFsQ2hhcnNNYXBbbWF0Y2hdIHx8IG1hdGNoLFxuICApO1xuICByZXR1cm4gc2VhcmNoO1xufVxuLy8gcHJvamVjdHMgZGF0YWxpc3QgYXV0b2NvbXBsZXRlXG5mdW5jdGlvbiBhdXRvQ29tcGxldGUoc2VhcmNoKSB7XG4gIGNvbnN0IHByb2plY3RzID0gdG9kb0xpc3QuZ2V0UHJvamVjdHMoKTtcbiAgcmV0dXJuIHByb2plY3RzLmZpbHRlcigodmFsdWUpID0+IHtcbiAgICBjb25zdCB2YWx1ZUxvd2VyY2FzZSA9IHJlbW92ZVNwZWNpYWxzKHZhbHVlLnRvTG93ZXJDYXNlKCkpO1xuICAgIGNvbnN0IHNlYXJjaExvd2VyY2FzZSA9IHJlbW92ZVNwZWNpYWxzKHNlYXJjaC50b0xvd2VyQ2FzZSgpKTtcbiAgICByZXR1cm4gdmFsdWVMb3dlcmNhc2UuaW5jbHVkZXMoc2VhcmNoTG93ZXJjYXNlKTtcbiAgfSk7XG59XG5cbi8vIGNhbGxpbmcgZnVuY3Rpb25zIHRvIGF1dG9jb21wbGV0ZSBQcm9qZWN0IGZpZWxkXG5cbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hQcm9qZWN0cygpIHtcbiAgY29uc3QgaW5wdXRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VudGVyUHJvamVjdCcpO1xuICBjb25zdCBkYXRhbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RhdGFsaXN0Jyk7XG4gIGlucHV0UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICh7IHRhcmdldCB9KSA9PiB7XG4gICAgY29uc3QgaW5wdXREYXRhID0gdGFyZ2V0LnZhbHVlO1xuICAgIGlmIChpbnB1dERhdGEubGVuZ3RoKSB7XG4gICAgICBjb25zdCBhdXRvQ29tcGxldGVPcHRpb25zID0gYXV0b0NvbXBsZXRlKGlucHV0RGF0YSk7XG4gICAgICBkYXRhbGlzdC5pbm5lckhUTUwgPSBgJHthdXRvQ29tcGxldGVPcHRpb25zXG4gICAgICAgIC5tYXAoKHZhbHVlKSA9PiBgPG9wdGlvbiB2YWx1ZT1cIiR7dmFsdWV9XCIgLz5gKVxuICAgICAgICAuam9pbignJyl9YDtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBEQVRFUElDS0VSIEFORCBNQVNLIEZVTkNUSU9OU1xuZXhwb3J0IGZ1bmN0aW9uIGR1ZURhdGVNYXNrKCkge1xuICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2R1ZURhdGUnKTtcbiAgY29uc3QgZmxhdEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuZmxhdHBpY2tyJyk7XG5cbiAgLy8gYXBwbHkgbWFzayB0byBkdWVEYXRlRmllbGRcbiAgY29uc3QgbWFzayA9IElNYXNrKGR1ZURhdGUsIG1hc2tEYXRlKTtcblxuICAvLyBhcHBseSBmbGF0cGlja3IgZGF0ZXBpY2tlciB0byBhbGwgZWxlbWVudHMgaW4gYSBkaXZcbiAgLy8gKGljb24gdG9nZ2xlIGFuZCBpbnB1dCBkYXRlIHVzaW5nIGRhdGEtIGF0dHJpYnV0ZXMpXG4gIGZsYXRwaWNrcihmbGF0RWxlbSwge1xuICAgIGRhdGVGb3JtYXQ6ICdkL20vWScsXG4gICAgZGlzYWJsZU1vYmlsZTogJ3RydWUnLFxuICAgIGFsbG93SW5wdXQ6IHRydWUsXG4gICAgd3JhcDogdHJ1ZSxcbiAgICBsb2NhbGU6IFBvcnR1Z3Vlc2UsXG4gICAgb25DaGFuZ2Uoc2VsZWN0ZWREYXRlcywgZGF0ZVN0cikge1xuICAgICAgbWFzay51cGRhdGVWYWx1ZShkYXRlU3RyKTtcbiAgICB9LFxuICB9KTtcbn1cblxuLy8gbWFpbiBzY3JlZW4gaW50ZXJhY3Rpb25zXG4vLyBjaGVjayB2aXN1YWwgZWZmZWN0XG5leHBvcnQgZnVuY3Rpb24gc2V0TGluZVRocm91Z2goZSkge1xuICBjb25zdCB0ZXh0ID0gZS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gIGlmIChpc0NoZWNrZWQoZSkpIHtcbiAgICB0ZXh0LmNsYXNzTGlzdC5hZGQoJ3RleHQtZGVjb3JhdGlvbi1saW5lLXRocm91Z2gnKTtcbiAgfSBlbHNlIHtcbiAgICB0ZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ3RleHQtZGVjb3JhdGlvbi1saW5lLXRocm91Z2gnKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd1BsdXNCdG4oKSB7XG4gIC8vIEVuY29udHJhIG8gYm90w6NvICtcbiAgY29uc3QgcGx1c0J0biA9IGFkZEZpZWxkLm5leHRFbGVtZW50U2libGluZztcbiAgY29uc3Qgc2F2ZUJ0biA9IHBsdXNCdG4ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAvLyBTZSBvIHZhbG9yIGRvIGNhbXBvIHTDrXR1bG8gZm9yIGRpZmVyZW50ZSBkZSB2YXppbyxcbiAgLy8gZW50w6NvIGVsZSByZXZlbGEgbyBib3TDo28gK1xuICBpZiAoYWRkRmllbGQudmFsdWUgIT09ICcnKSB7XG4gICAgcGx1c0J0bi5jbGFzc0xpc3QuYWRkKCdyZXZlYWxJdGVtJyk7XG4gICAgc2F2ZUJ0bi5jbGFzc0xpc3QuYWRkKCdyZXZlYWxJdGVtJyk7XG4gIH1cbiAgLy8gY2FzbyBjb250csOhcmlvLCBzZSB2b2PDqiBhcGFnYXIgdG9kbyBvIHTDrXR1bG9cbiAgLy8gZWxlIGTDoSBkaXNwbGF5OiBub25lLCBubyBib3TDo28gK1xuICBpZiAoYWRkRmllbGQudmFsdWUgPT09ICcnICYmIHBsdXNCdG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdyZXZlYWxJdGVtJykpIHtcbiAgICBwbHVzQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3JldmVhbEl0ZW0nKTtcbiAgICBzYXZlQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3JldmVhbEl0ZW0nKTtcbiAgfVxufVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gZmluZFBhcmVudE5vZGUoZWxlbWVudCwgYXR0cmlidXRlTmFtZSkge1xuLy8gICBsZXQgeyBwYXJlbnROb2RlIH0gPSBlbGVtZW50O1xuLy8gICB3aGlsZSAocGFyZW50Tm9kZSkge1xuLy8gICAgIGlmIChwYXJlbnROb2RlLmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKSkge1xuLy8gICAgICAgcmV0dXJuIHBhcmVudE5vZGU7XG4vLyAgICAgfVxuLy8gICAgIHBhcmVudE5vZGUgPSBwYXJlbnROb2RlLnBhcmVudE5vZGU7XG4vLyAgIH1cbi8vICAgcmV0dXJuIG51bGw7IC8vIFJldG9ybmEgbnVsbCBzZSBuw6NvIGVuY29udHJvdSBuZW5odW0gbsOzIHBhaSBjb20gbyBhdHJpYnV0byBkZXNlamFkb1xuLy8gfVxuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWN5Y2xlICovXG5pbXBvcnQgeyBwb3B1bGF0ZVN0b3JhZ2UgfSBmcm9tICcuL0pTT05GdW5jdGlvbnMnO1xuaW1wb3J0IHRvZG9MaXN0IGZyb20gJy4vY29yZSc7XG5pbXBvcnQgdWlFZGl0SXRlbSBmcm9tICcuL2VkaXRDb25zdHJ1Y3Rvcic7XG5pbXBvcnQgYWRkTGluZSBmcm9tICcuL2xpc3RDb25zdHJ1Y3Rvcic7XG5pbXBvcnQge1xuICBjbGVhckNvbnRlbnQsXG4gIGxpc3QsXG4gIHNvcnRQYXJhbSxcbiAgbG9hZExpc3QsXG4gIHNldExpbmVUaHJvdWdoLFxufSBmcm9tICcuL3VpQ29tbW9uRnVuY3Rpb25zJztcblxuLy8gVUkgQ29udHJvbGxlclxuXG5jb25zdCB1aUNvbnRyb2wgPSAoKCkgPT4ge1xuICBsZXQgY3VycmVudEZpbHRlciA9IG51bGw7XG5cbiAgZnVuY3Rpb24gc2V0Q3VycmVudEZpbHRlcihrZXksIHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBrZXkgIT09ICd1bmRlZmluZWQnKSBjdXJyZW50RmlsdGVyID0geyBrZXksIHZhbHVlIH07XG4gICAgZWxzZSBjdXJyZW50RmlsdGVyID0gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGZpbHRlckFycmF5ID0gKGFyciwgZmlsdGVyLCB2YWx1ZSkgPT4ge1xuICAgIGlmIChmaWx0ZXIpIHJldHVybiBbLi4uYXJyLmZpbHRlcigob2JqZXRvKSA9PiBvYmpldG9bZmlsdGVyXSA9PT0gdmFsdWUpXTtcbiAgICByZXR1cm4gYXJyO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGxvYWQoKSB7XG4gICAgY29uc3QgdWlMaXN0ID0gc29ydFBhcmFtKGxvYWRMaXN0KCksICdjaGVja2VkJyk7XG4gICAgaWYgKGN1cnJlbnRGaWx0ZXIgIT09IG51bGwpIHtcbiAgICAgIGZpbHRlckFycmF5KHVpTGlzdCwgY3VycmVudEZpbHRlci5rZXksIGN1cnJlbnRGaWx0ZXIudmFsdWUpXG4gICAgICAgIC5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICBjb25zdCBpbmRleCA9IGxvYWRMaXN0KCkuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09PSBvYmouaWQpO1xuICAgICAgICAgIGFkZExpbmUob2JqLCBpbmRleCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB1aUxpc3QuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gbG9hZExpc3QoKS5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IG9iai5pZCk7XG4gICAgICAgIGFkZExpbmUob2JqLCBpbmRleCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoZmlsdGVyLCB2YWx1ZSkge1xuICAgIGNsZWFyQ29udGVudChsaXN0KTtcbiAgICBpZiAodHlwZW9mIGZpbHRlciAhPT0gJ3VuZGVmaW5lZCcpIHNldEN1cnJlbnRGaWx0ZXIoZmlsdGVyLCB2YWx1ZSk7XG4gICAgbG9hZCgpO1xuICAgIHBvcHVsYXRlU3RvcmFnZSgpO1xuICAgIGNvbnNvbGUud2FybignVXBkYXRlZCEnKTtcbiAgfVxuXG4gIGNvbnN0IGhhbmRsZXJzID0gKCgpID0+IHtcbiAgICBmdW5jdGlvbiBzZXRDaGVja2VkSGFuZGxlcihlKSB7XG4gICAgICBjb25zdCB7IHRhcmdldCB9ID0gZTtcbiAgICAgIGNvbnN0IGlkID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xuICAgICAgdG9kb0xpc3Quc2V0Q2hlY2tlZChpZCk7XG4gICAgICBzZXRMaW5lVGhyb3VnaCh0YXJnZXQpO1xuICAgICAgdXBkYXRlKCk7XG4gICAgfVxuXG4gICAgLy8gaG9tZSBidXR0b25zXG4gICAgZnVuY3Rpb24gZWRpdE1vcmUodGl0bGUpIHtcbiAgICAgIHVpRWRpdEl0ZW0odGl0bGUpO1xuICAgICAgdGl0bGUudmFsdWUgPSAnJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmYXN0U2F2ZSh0aXRsZSkge1xuICAgICAgY29uc3QgbmV3T2JqID0geyB0aXRsZTogdGl0bGUudmFsdWUgfTtcbiAgICAgIHRvZG9MaXN0LmFkZEl0ZW0obmV3T2JqKTtcbiAgICAgIHRpdGxlLnZhbHVlID0gJyc7XG4gICAgICB1cGRhdGUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlZGl0KGVsZW0pIHtcbiAgICAgIGVsZW0uc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICBjb25zdCB7IHRhcmdldCB9ID0gZWxlbTtcbiAgICAgIGNvbnN0IG9iaiA9IHRvZG9MaXN0LmdldEl0ZW0odGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpKTtcbiAgICAgIGNvbnNvbGUubG9nKG9iaik7XG4gICAgICB1aUVkaXRJdGVtKG9iai50aXRsZSwgb2JqLmR1ZURhdGUsIG9iai5wcmlvcml0eSwgb2JqLnByb2plY3QsIG9iai5ub3Rlcywgb2JqLmlkKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxldGVJdGVtKGl0ZW0pIHtcbiAgICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBpdGVtO1xuICAgICAgdG9kb0xpc3QuZGVsZXRlSXRlbSh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJykpO1xuICAgICAgdXBkYXRlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNldENoZWNrZWRIYW5kbGVyLFxuICAgICAgZWRpdE1vcmUsXG4gICAgICBmYXN0U2F2ZSxcbiAgICAgIGVkaXQsXG4gICAgICBkZWxldGVJdGVtLFxuICAgIH07XG4gIH0pKCk7XG5cbiAgcmV0dXJuIHtcbiAgICBoYW5kbGVycyxcbiAgICBzZXRDdXJyZW50RmlsdGVyLFxuICAgIGxvYWQsXG4gICAgdXBkYXRlLFxuICB9O1xufSkoKTtcblxuLy8gQUREL0VESVQgSVRFTVNcbmV4cG9ydCBkZWZhdWx0IHVpQ29udHJvbDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt0b2RvX2xpc3RcIl0gPSBzZWxmW1wid2VicGFja0NodW5rdG9kb19saXN0XCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCIzcmRwYXJ0XCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyg3MjczKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9