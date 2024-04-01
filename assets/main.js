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
/* harmony export */   populateStorage: () => (/* binding */ populateStorage),
/* harmony export */   restoreStorage: () => (/* binding */ restoreStorage)
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
    const newObj = CreateItem(
      id,
      updatedValues.title,
      updatedValues.dueDate,
      updatedValues.priority,
      updatedValues.project,
      updatedValues.checked,
    );
    if (notes.length > 0) notes.forEach((note) => newObj.addNote(note));
    return newObj;
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




const isChecked = (e) => e.checked === true;

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
  if (isChecked(obj)) addChecked(checkbox, btnHeader, priority);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addLine);


/***/ }),

/***/ 7505:
/*!**********************************************!*\
  !*** ./src/assets/projectListConstructor.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ 3317);
/* harmony import */ var _uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uiCommonFunctions */ 4656);
/* harmony import */ var _uiController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uiController */ 5168);
/* eslint-disable import/no-cycle */




function constructorProjectList() {
  const filteredProjects = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.setFilterList)(_core__WEBPACK_IMPORTED_MODULE_0__["default"].getProjects());
  if (filteredProjects.length !== 0) {
    filteredProjects.forEach((value) => {
      const listItem = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('li', ['d-flex', 'align-items-center']);
      const iconItem = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('i', ['bi', 'bi-hash', 'fs-4']);
      const link = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('a', [], { 'data-value': value });

      link.textContent = value;
      link.addEventListener('click', () => _uiController__WEBPACK_IMPORTED_MODULE_2__["default"].update('project', link.getAttribute('data-value')));

      listItem.append(iconItem, link);

      _uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.displayProject.appendChild(listItem);
    });
  } else _uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.displayProject.innerHTML = '<li class="d-flex align-items-center">No projects yet :(</li>';
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (constructorProjectList);


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
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core */ 3317);
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
    // eslint-disable-next-line no-undef, no-param-reassign
    tip = new bootstrap.Tooltip(tip);
  });
}, false);

// start app
_uiController__WEBPACK_IMPORTED_MODULE_4__["default"].load();

(function startDemo() {
  if (_core__WEBPACK_IMPORTED_MODULE_5__["default"].getLength() !== 0) return;
  _core__WEBPACK_IMPORTED_MODULE_5__["default"].addItem({ title: 'Clean the house', priority: 1, project: 'House' });
  _core__WEBPACK_IMPORTED_MODULE_5__["default"].addItem({ title: 'Supermarket', priority: 3, project: 'Shopping' });
  _core__WEBPACK_IMPORTED_MODULE_5__["default"].addItem({ title: 'Free Market', project: 'Shopping' });
  _core__WEBPACK_IMPORTED_MODULE_5__["default"].addItem({ title: 'PC Maintenance', priority: 2, project: 'Work' });
  _core__WEBPACK_IMPORTED_MODULE_5__["default"].addNote(2, 'Banana');
  _core__WEBPACK_IMPORTED_MODULE_5__["default"].addNote(2, 'Green onions');
  _core__WEBPACK_IMPORTED_MODULE_5__["default"].addNote(2, 'Radish');
  _core__WEBPACK_IMPORTED_MODULE_5__["default"].addNote(2, 'Pastel for lunch :)');
  _uiController__WEBPACK_IMPORTED_MODULE_4__["default"].update();
}());


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
/* harmony export */   displayProject: () => (/* binding */ displayProject),
/* harmony export */   dueDateMask: () => (/* binding */ dueDateMask),
/* harmony export */   hasNotes: () => (/* binding */ hasNotes),
/* harmony export */   input: () => (/* binding */ input),
/* harmony export */   list: () => (/* binding */ list),
/* harmony export */   loadList: () => (/* binding */ loadList),
/* harmony export */   quickSave: () => (/* binding */ quickSave),
/* harmony export */   searchProjects: () => (/* binding */ searchProjects),
/* harmony export */   setAttrs: () => (/* binding */ setAttrs),
/* harmony export */   setFilterList: () => (/* binding */ setFilterList),
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
const displayProject = document.querySelector('ul#projects');

const setFilterList = (elem) => elem.filter((value, index, self) => value !== '' && self.indexOf(value) === index);
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
const autoComplete = (search) => _core__WEBPACK_IMPORTED_MODULE_4__["default"].getProjects().filter((value) => {
  const valueLowercase = removeSpecials(value.toLowerCase());
  const searchLowercase = removeSpecials(search.toLowerCase());
  return valueLowercase.includes(searchLowercase);
});

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
/* harmony import */ var _projectListConstructor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./projectListConstructor */ 7505);
/* harmony import */ var _uiCommonFunctions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./uiCommonFunctions */ 4656);
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
    // add project list
    (0,_projectListConstructor__WEBPACK_IMPORTED_MODULE_4__["default"])();
    const uiList = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_5__.sortParam)((0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_5__.loadList)(), 'checked');
    if (currentFilter !== null) {
      filterArray(uiList, currentFilter.key, currentFilter.value).forEach((obj) => (0,_listConstructor__WEBPACK_IMPORTED_MODULE_3__["default"])(obj));
    } else {
      uiList.forEach((obj) => (0,_listConstructor__WEBPACK_IMPORTED_MODULE_3__["default"])(obj));
    }
  }

  function update(filter, value) {
    (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_5__.clearContent)(_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_5__.list);
    (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_5__.clearContent)(_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_5__.displayProject);
    if (typeof filter !== 'undefined') setCurrentFilter(filter, value);
    if (filter === 'clear') setCurrentFilter();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9KU09ORnVuY3Rpb25zLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvY29yZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL2RhdGUuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9lZGl0Q29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9saXN0Q29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9wcm9qZWN0TGlzdENvbnN0cnVjdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvc2NyaXB0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvdWlDb21tb25GdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy91aUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHRvZG9MaXN0IGZyb20gJy4vY29yZSc7XG4vLyBpbXBvcnQgYWRkTGluZSBmcm9tICcuL3VpTGlzdEdlbmVyYXRvcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBwb3B1bGF0ZVN0b3JhZ2UoKSB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXRhJywgdG9kb0xpc3QudG9KU09OKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzdG9yZVN0b3JhZ2UoKSB7XG4gIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGF0YScpID09PSBudWxsKSByZXR1cm47XG4gIHRvZG9MaXN0LnJlc3RvcmUobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhdGEnKSk7XG59XG4iLCJmdW5jdGlvbiBDcmVhdGVJdGVtKGlkLCB0aXRsZSwgZHVlRGF0ZSA9IDAsIHByaW9yaXR5ID0gMCwgcHJvamVjdCA9IG51bGwsIGNoZWNrZWQgPSBmYWxzZSkge1xuICBjb25zdCBub3RlcyA9IFtdO1xuXG4gIGZ1bmN0aW9uIGFkZE5vdGUodmFsKSB7IG5vdGVzLnB1c2godmFsKTsgfVxuICBmdW5jdGlvbiBkZWxldGVOb3RlKHBvcykgeyBub3Rlcy5zcGxpY2UocG9zLCAxKTsgfVxuICBmdW5jdGlvbiBlZGl0Tm90ZShwb3MsIHZhbCkgeyBub3Rlc1twb3NdID0gdmFsOyB9XG4gIGNvbnN0IGdldEFsbE5vdGVzID0gKCkgPT4gbm90ZXM7XG4gIGNvbnN0IGdldE5vdGUgPSAocG9zKSA9PiBub3Rlc1twb3NdO1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZUl0ZW0obmV3VmFsdWVzKSB7XG4gICAgY29uc3QgdXBkYXRlZFZhbHVlcyA9IHtcbiAgICAgIHRpdGxlOiAobmV3VmFsdWVzLnRpdGxlICE9PSB1bmRlZmluZWQgJiYgbmV3VmFsdWVzLnRpdGxlICE9PSB0aXRsZSlcbiAgICAgICAgPyBuZXdWYWx1ZXMudGl0bGUgOiB0aXRsZSxcbiAgICAgIGR1ZURhdGU6IChuZXdWYWx1ZXMuZHVlRGF0ZSAhPT0gdW5kZWZpbmVkICYmIG5ld1ZhbHVlcy5kdWVEYXRlICE9PSBkdWVEYXRlKVxuICAgICAgICA/IG5ld1ZhbHVlcy5kdWVEYXRlIDogZHVlRGF0ZSxcbiAgICAgIHByb2plY3Q6IChuZXdWYWx1ZXMucHJvamVjdCAhPT0gdW5kZWZpbmVkICYmIG5ld1ZhbHVlcy5wcm9qZWN0ICE9PSBwcm9qZWN0KVxuICAgICAgICA/IG5ld1ZhbHVlcy5wcm9qZWN0IDogcHJvamVjdCxcbiAgICAgIHByaW9yaXR5OiAobmV3VmFsdWVzLnByaW9yaXR5ICE9PSB1bmRlZmluZWQgJiYgbmV3VmFsdWVzLnByaW9yaXR5ICE9PSBwcmlvcml0eSlcbiAgICAgICAgPyBuZXdWYWx1ZXMucHJpb3JpdHkgOiBwcmlvcml0eSxcbiAgICAgIGNoZWNrZWQ6IChuZXdWYWx1ZXMuY2hlY2tlZCAhPT0gdW5kZWZpbmVkICYmIG5ld1ZhbHVlcy5jaGVja2VkICE9PSBjaGVja2VkKVxuICAgICAgICA/IG5ld1ZhbHVlcy5jaGVja2VkIDogY2hlY2tlZCxcbiAgICB9O1xuICAgIGNvbnN0IG5ld09iaiA9IENyZWF0ZUl0ZW0oXG4gICAgICBpZCxcbiAgICAgIHVwZGF0ZWRWYWx1ZXMudGl0bGUsXG4gICAgICB1cGRhdGVkVmFsdWVzLmR1ZURhdGUsXG4gICAgICB1cGRhdGVkVmFsdWVzLnByaW9yaXR5LFxuICAgICAgdXBkYXRlZFZhbHVlcy5wcm9qZWN0LFxuICAgICAgdXBkYXRlZFZhbHVlcy5jaGVja2VkLFxuICAgICk7XG4gICAgaWYgKG5vdGVzLmxlbmd0aCA+IDApIG5vdGVzLmZvckVhY2goKG5vdGUpID0+IG5ld09iai5hZGROb3RlKG5vdGUpKTtcbiAgICByZXR1cm4gbmV3T2JqO1xuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5mcmVlemUoe1xuICAgIGlkLFxuICAgIHRpdGxlLFxuICAgIGR1ZURhdGUsXG4gICAgcHJvamVjdCxcbiAgICBwcmlvcml0eSxcbiAgICBjaGVja2VkLFxuICAgIGFkZE5vdGUsXG4gICAgZWRpdE5vdGUsXG4gICAgZ2V0Tm90ZSxcbiAgICBkZWxldGVOb3RlLFxuICAgIGdldEFsbE5vdGVzLFxuICAgIHVwZGF0ZUl0ZW0sXG4gIH0pO1xufVxuXG5jb25zdCB0b2RvTGlzdCA9ICgoKSA9PiB7XG4gIGNvbnN0IGxpc3QgPSBbXTtcblxuICBmdW5jdGlvbiBmaW5kT2JqUG9zKGlkVmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChsaXN0W2ldLmlkID09PSBwYXJzZUludChpZFZhbHVlLCAxMCkpIHJldHVybiBpO1xuICAgIH1cbiAgICB0aHJvdyBFcnJvcignT2JqZWN0IG5vdCBmb3VuZCcpO1xuICB9XG5cbiAgY29uc3QgcmV0dXJuT2JqID0gKGl0ZW0pID0+ICh7XG4gICAgdGl0bGU6IGl0ZW0udGl0bGUsXG4gICAgcHJvamVjdDogaXRlbS5wcm9qZWN0LFxuICAgIGR1ZURhdGU6IGl0ZW0uZHVlRGF0ZSxcbiAgICBwcmlvcml0eTogaXRlbS5wcmlvcml0eSxcbiAgICBjaGVja2VkOiBpdGVtLmNoZWNrZWQsXG4gICAgbm90ZXM6IGl0ZW0uZ2V0QWxsTm90ZXMoKSxcbiAgICBpZDogaXRlbS5pZCxcbiAgfSk7XG5cbiAgY29uc3QgZ2V0SXRlbSA9IChpZCkgPT4gcmV0dXJuT2JqKGxpc3RbZmluZE9ialBvcyhpZCldKTtcbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGlzdC5sZW5ndGg7XG4gIGNvbnN0IGFsbFRhc2tzTGlzdCA9ICgpID0+IGxpc3QubWFwKChvYmopID0+IChyZXR1cm5PYmoob2JqKSkpO1xuICBmdW5jdGlvbiByZXNldCgpIHsgbGlzdC5sZW5ndGggPSAwOyB9XG5cbiAgY29uc3QgZ2V0UHJvamVjdHMgPSAoKSA9PiBsaXN0Lm1hcCgoaXRlbSkgPT4gaXRlbS5wcm9qZWN0KVxuICAgIC5maWx0ZXIoKHZhbHVlLCBwb3MsIHNlbGYpID0+IHZhbHVlICE9PSBudWxsICYmIHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IHBvcyk7XG5cbiAgZnVuY3Rpb24gZ2V0QmlnZ2VySWQoKSB7XG4gICAgY29uc3QgbGF0ZXN0T2JqID0gbGlzdC5yZWR1Y2UoKG1heCwgb2JqKSA9PiAob2JqLmlkID4gbWF4LmlkID8gb2JqIDogbWF4KSwgeyBpZDogMCB9KTtcbiAgICByZXR1cm4gbGF0ZXN0T2JqLmlkO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkSXRlbShvYmopIHtcbiAgICBjb25zdCBpZCA9IGxpc3QubGVuZ3RoID09PSAwID8gMCA6IHBhcnNlSW50KGdldEJpZ2dlcklkKCksIDEwKSArIDE7XG4gICAgY29uc3QgbmV3SXRlbSA9IENyZWF0ZUl0ZW0oaWQsIG9iai50aXRsZSwgb2JqLmR1ZURhdGUsIG9iai5wcmlvcml0eSwgb2JqLnByb2plY3QsIG9iai5jaGVja2VkKTtcbiAgICBsaXN0LnB1c2gobmV3SXRlbSk7XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0SXRlbShvYmpJRCwgbmV3T2JqKSB7XG4gICAgY29uc3Qgb2JqVG9FZGl0ID0gbGlzdFtmaW5kT2JqUG9zKG9iaklEKV07XG4gICAgY29uc3QgcmVzdWx0ID0gb2JqVG9FZGl0LnVwZGF0ZUl0ZW0obmV3T2JqKTtcbiAgICBsaXN0W2ZpbmRPYmpQb3Mob2JqSUQpXSA9IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldENoZWNrZWQoaWQpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7IGNoZWNrZWQ6ICFsaXN0W2ZpbmRPYmpQb3MoaWQpXS5jaGVja2VkIH07XG4gICAgZWRpdEl0ZW0oaWQsIHJlc3VsdCk7XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0Tm90ZShpZCwgcG9zLCB2YWwpIHtcbiAgICBsaXN0W2ZpbmRPYmpQb3MoaWQpXS5lZGl0Tm90ZShwb3MsIHZhbCk7XG4gIH1cbiAgZnVuY3Rpb24gYWRkTm90ZShpZCwgdmFsKSB7XG4gICAgbGlzdFtmaW5kT2JqUG9zKGlkKV0uYWRkTm90ZSh2YWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVsZXRlSXRlbShpZCkge1xuICAgIGxpc3Quc3BsaWNlKGZpbmRPYmpQb3MoaWQpLCAxKTtcbiAgfVxuXG4gIGNvbnN0IHRvSlNPTiA9ICgpID0+IEpTT04uc3RyaW5naWZ5KGxpc3QubWFwKChpdGVtKSA9PiByZXR1cm5PYmooaXRlbSkpKTtcblxuICBjb25zdCByZXN0b3JlID0gKGRhdGEpID0+IHtcbiAgICByZXNldCgpO1xuICAgIEpTT04ucGFyc2UoZGF0YSkuZm9yRWFjaChcbiAgICAgICh7XG4gICAgICAgIGlkLCB0aXRsZSwgcHJvamVjdCwgZHVlRGF0ZSwgcHJpb3JpdHksIGNoZWNrZWQsIG5vdGVzLFxuICAgICAgfSkgPT4ge1xuICAgICAgICBjb25zdCBuZXdJdGVtID0gQ3JlYXRlSXRlbShpZCwgdGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0LCBjaGVja2VkKTtcbiAgICAgICAgbm90ZXMuZm9yRWFjaCgobm90ZSkgPT4gbmV3SXRlbS5hZGROb3RlKG5vdGUpKTtcbiAgICAgICAgbGlzdC5wdXNoKG5ld0l0ZW0pO1xuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZ2V0TGVuZ3RoLFxuICAgIGFkZE5vdGUsXG4gICAgZWRpdE5vdGUsXG4gICAgZWRpdEl0ZW0sXG4gICAgYWRkSXRlbSxcbiAgICBkZWxldGVJdGVtLFxuICAgIHJlc3RvcmUsXG4gICAgdG9KU09OLFxuICAgIHNldENoZWNrZWQsXG4gICAgZ2V0UHJvamVjdHMsXG4gICAgcmVzZXQsXG4gICAgcmV0dXJuT2JqLFxuICAgIGFsbFRhc2tzTGlzdCxcbiAgICBnZXRJdGVtLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdG9kb0xpc3Q7XG4iLCIvLyBpbXBvcnQgeyBwdEJSIH0gZnJvbSAnZGF0ZS1mbnMvbG9jYWxlJztcbmltcG9ydCB7IGZvcm1hdCB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCBJTWFzayBmcm9tICdpbWFzayc7XG5cbmNvbnN0IHNwbGl0VG9Db2RlID0gKGRhdGUpID0+IGRhdGUuc3BsaXQoJy8nKS5yZXZlcnNlKCkuam9pbignLycpLnJlcGxhY2VBbGwoJy8nLCAnLCAnKTtcbmV4cG9ydCBjb25zdCB0b0lucHV0ID0gKGRhdGEpID0+IGZvcm1hdChuZXcgRGF0ZShzcGxpdFRvQ29kZShkYXRhKSksICdkZC9MTC95eXl5Jyk7XG4vLyBjb25zdCBnZXREYXRhID0gKGFycikgPT4gYXJyLmZvckVhY2goZWxlbWVudCA9PiB7XG5cbi8vIH0pO1xuXG5leHBvcnQgY29uc3QgbWFza0RhdGUgPSB7XG4gIG1hc2s6ICdkL2BtL2BZJyxcbiAgYmxvY2tzOiB7XG4gICAgZDoge1xuICAgICAgbWFzazogSU1hc2suTWFza2VkUmFuZ2UsXG4gICAgICBwbGFjZWhvbGRlckNoYXI6ICdkJyxcbiAgICAgIGZyb206IDEsXG4gICAgICB0bzogMzEsXG4gICAgICBtYXhMZW5ndGg6IDIsXG4gICAgfSxcbiAgICBtOiB7XG4gICAgICBtYXNrOiBJTWFzay5NYXNrZWRSYW5nZSxcbiAgICAgIHBsYWNlaG9sZGVyQ2hhcjogJ20nLFxuICAgICAgZnJvbTogMSxcbiAgICAgIHRvOiAxMixcbiAgICAgIG1heExlbmd0aDogMixcbiAgICB9LFxuICAgIFk6IHtcbiAgICAgIG1hc2s6IElNYXNrLk1hc2tlZFJhbmdlLFxuICAgICAgcGxhY2Vob2xkZXJDaGFyOiAnYScsXG4gICAgICBmcm9tOiAxMDAwLFxuICAgICAgdG86IDk5OTksXG4gICAgfSxcbiAgfSxcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tY3ljbGUgKi9cbmltcG9ydCB0b2RvTGlzdCBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IHtcbiAgY3JlYXRlRWxlbWVudCwgY3JlYXRlUHJpb3JpdHlTZWxlY3QsIGR1ZURhdGVNYXNrLCBzZWFyY2hQcm9qZWN0cyxcbn0gZnJvbSAnLi91aUNvbW1vbkZ1bmN0aW9ucyc7XG5pbXBvcnQgdWlDb250cm9sIGZyb20gJy4vdWlDb250cm9sbGVyJztcblxuZnVuY3Rpb24gc2F2ZSh0aXRsZSwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QsIG5vdGVzLCBpZCkge1xuICBjb25zdCBuZXdPYmogPSB7XG4gICAgdGl0bGU6IHRpdGxlLnZhbHVlLFxuICAgIGR1ZURhdGU6IGR1ZURhdGUudmFsdWUsXG4gICAgcHJpb3JpdHk6IHByaW9yaXR5LnZhbHVlLFxuICAgIHByb2plY3Q6IHByb2plY3QudmFsdWUsXG4gICAgbm90ZXMsXG4gIH07XG4gIGlmIChpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdG9kb0xpc3QuZWRpdEl0ZW0oaWQsIG5ld09iaik7XG4gIH0gZWxzZSB7XG4gICAgdG9kb0xpc3QuYWRkSXRlbShuZXdPYmopO1xuICB9XG4gIHVpQ29udHJvbC51cGRhdGUoKTtcbn1cblxuZnVuY3Rpb24gdWlFZGl0SXRlbSh0aXRsZSwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QsIG5vdGVzLCBpZCkge1xuICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5tb2RhbC1ib2R5Jyk7XG4gIC8vIGNyZWF0aW5nIGVsZW1lbnRzXG4gIGNvbnN0IHJvdzEgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3JvdyddKTtcbiAgY29uc3QgdGl0bGVEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2lucHV0LWdyb3VwJywgJ21iLTMnLCAnZ2FwLTEnXSk7XG4gIGNvbnN0IHRpdGxlSW5wdXQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIFsnZm9ybS1jb250cm9sJ10sIHtcbiAgICBpZDogJ2l0ZW1UaXRsZScsXG4gICAgdHlwZTogJ3RleHQnLFxuICAgIHBsYWNlaG9sZGVyOiAnTm92YSBUYXJlZmEuLi4nLFxuICB9KTtcbiAgY29uc3Qgcm93MiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnYmctZ3JheScsICdyb3cnLCAnZy0wJywgJ2dhcC0yJywgJ2ZsZXgtbm93cmFwJ10pO1xuXG4gIGNvbnN0IGRhdGVEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2RhdGUnLCAnZmxhdHBpY2tyJywgJ2NvbCddKTtcbiAgY29uc3QgZGF0ZUlucHV0ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2Zvcm0tY29udHJvbCcsICdmbGF0cGlja3ItaW5wdXQnXSwge1xuICAgIGlkOiAnZHVlRGF0ZScsXG4gICAgdHlwZTogJ3RleHQnLFxuICAgIGlucHV0bW9kZTogJ251bWVyaWMnLFxuICAgICdkYXRhLWlucHV0JzogdW5kZWZpbmVkLFxuICAgIGF1dG9jb21wbGV0ZTogJ29mZicsXG4gIH0pO1xuICBjb25zdCBkYXRlcGlja2VyVG9nZ2xlID0gY3JlYXRlRWxlbWVudCgnYScsIFsnaW5wdXQtYnV0dG9uJ10sIHtcbiAgICB0aXRsZTogJ3RvZ2dsZScsXG4gICAgJ2RhdGEtdG9nZ2xlJzogdW5kZWZpbmVkLFxuICB9KTtcbiAgY29uc3QgZGF0ZUljb24gPSBjcmVhdGVFbGVtZW50KCdpJywgWyd0ZXh0LXdhcm5pbmcnLCAnc21hbGwnLCAnYmknLCAnYmktY2FsZW5kYXInXSk7XG5cbiAgY29uc3QgcHJpb3JpdHlEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbCddKTtcbiAgY29uc3QgcHJpb3JpdHlTZWxlY3QgPSBjcmVhdGVQcmlvcml0eVNlbGVjdChwcmlvcml0eSk7XG5cbiAgY29uc3QgcHJvamVjdERpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29sJ10pO1xuICBjb25zdCBwcm9qZWN0SW5wdXQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIFsnZm9ybS1jb250cm9sJ10sIHtcbiAgICBpZDogJ2VudGVyUHJvamVjdCcsXG4gICAgdHlwZTogJ3RleHQnLFxuICAgIGxpc3Q6ICdkYXRhbGlzdE9wdGlvbnMnLFxuICAgIHBsYWNlaG9sZGVyOiAnUHJvamV0bycsXG4gICAgYXV0b2NvbXBsZXRlOiAnb2ZmJyxcbiAgfSk7XG4gIGNvbnN0IHByb2plY3REYXRhbGlzdCA9IGNyZWF0ZUVsZW1lbnQoJ2RhdGFsaXN0JywgWydzdWdnZXN0aW9ucycsICdmb3JtJ10sIHtcbiAgICBpZDogJ2RhdGFsaXN0T3B0aW9ucycsXG4gICAgZHJvcHpvbmU6ICdzdHJpbmcnLFxuICB9KTtcblxuICBjb25zdCByb3czID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnLCAncHQtMiddKTtcblxuICBjb25zdCBub3Rlc0NvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29udGFpbmVyJ10pO1xuICBjb25zdCBub3Rlc0hlYWRlciA9IGNyZWF0ZUVsZW1lbnQoJ2g2Jyk7XG4gIGNvbnN0IG5vdGVzUm93ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnLCAnZy0yJ10pO1xuICBjb25zdCBub3Rlc0xpc3QgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ25vdGVzTGlzdCddKTtcblxuICBjb25zdCBhZGROb3RlUm93ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnLCAncHQtMicsICdqdXN0aWZ5LWNvbnRlbnQtZW5kJ10pO1xuXG4gIGNvbnN0IGFkZE5vdGVEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbC1hdXRvJywgJ3NtYWxsJywgJ3RleHQtZGFuZ2VyJywgJ3RleHQtd2FybmluZy1lbXBoYXNpcyddKTtcbiAgY29uc3QgYWRkTm90ZUxpbmsgPSBjcmVhdGVFbGVtZW50KCdhJywgW10sIHsgaWQ6ICdhZGROb3RlJyB9KTtcbiAgY29uc3QgYWRkTm90ZUljb24gPSBjcmVhdGVFbGVtZW50KCdpJywgWydiaScsICdiaS1wbHVzLWNpcmNsZSddKTtcbiAgY29uc3QgYWRkTm90ZVRleHQgPSBjcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgY29uc3Qgcm93NCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsncm93JywgJ2ctMicsICdwdC0zJywgJ2p1c3RpZnktY29udGVudC1zdGFydCcsICdmbGV4LXJvdy1yZXZlcnNlJ10pO1xuXG4gIGNvbnN0IHNhdmVEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbC1hdXRvJ10pO1xuICBjb25zdCBzYXZlQnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgWydidG4nLCAnYnRuLXdhcm5pbmcnXSwge1xuICAgICdkYXRhLWJzLWRpc21pc3MnOiAnbW9kYWwnLFxuICB9KTtcbiAgY29uc3QgY2FuY2VsRGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydjb2wtYXV0byddKTtcbiAgY29uc3QgY2FuY2VsQnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgWydidG4nLCAnYnRuLXNlY29uZGFyeScsICd0ZXh0LWxpZ2h0J10sIHtcbiAgICAnZGF0YS1icy1kaXNtaXNzJzogJ21vZGFsJyxcbiAgfSk7XG5cbiAgLy8gYXBwZW5kIGVsZW1lbnRzXG5cbiAgLy8gcm93IDEgKHRpdGxlKVxuICBpZiAodGl0bGUgJiYgKHR5cGVvZiB0aXRsZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHRpdGxlLnZhbHVlICE9PSAndW5kZWZpbmVkJykpIHtcbiAgICB0aXRsZUlucHV0LnZhbHVlID0gdHlwZW9mIHRpdGxlID09PSAnc3RyaW5nJyA/IHRpdGxlIDogdGl0bGUudmFsdWU7XG4gIH1cbiAgdGl0bGVEaXYuYXBwZW5kQ2hpbGQodGl0bGVJbnB1dCk7XG5cbiAgcm93MS5hcHBlbmRDaGlsZCh0aXRsZURpdik7XG5cbiAgLy8gcm93IDIgKGRhdGUsIHByaW9yaXR5LCBwcm9qZWN0KVxuXG4gIC8vIGRhdGVcbiAgaWYgKGR1ZURhdGUgIT09IHVuZGVmaW5lZCAmJiBkdWVEYXRlICE9PSAwKSB7XG4gICAgZGF0ZUlucHV0LnZhbHVlID0gZHVlRGF0ZTtcbiAgfVxuICBkYXRlcGlja2VyVG9nZ2xlLmFwcGVuZENoaWxkKGRhdGVJY29uKTtcbiAgZGF0ZURpdi5hcHBlbmQoZGF0ZUlucHV0LCBkYXRlcGlja2VyVG9nZ2xlKTtcblxuICAvLyBwcmlvcml0eVxuICBwcmlvcml0eURpdi5hcHBlbmRDaGlsZChwcmlvcml0eVNlbGVjdCk7XG5cbiAgLy8gcHJvamVjdFxuICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0KTtcbiAgaWYgKHR5cGVvZiBwcm9qZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBwcm9qZWN0ICE9PSAwKSBwcm9qZWN0SW5wdXQudmFsdWUgPSBwcm9qZWN0O1xuICBwcm9qZWN0RGl2LmFwcGVuZChwcm9qZWN0SW5wdXQsIHByb2plY3REYXRhbGlzdCk7XG5cbiAgcm93Mi5hcHBlbmQoZGF0ZURpdiwgcHJpb3JpdHlEaXYsIHByb2plY3REaXYpO1xuXG4gIC8vIHJvdzMgKG5vdGVzIGFyZWEpXG4gIG5vdGVzSGVhZGVyLnRleHRDb250ZW50ID0gJ05vdGFzJztcbiAgYWRkTm90ZVRleHQudGV4dENvbnRlbnQgPSAnTm92YSBub3RhJztcbiAgYWRkTm90ZUljb24udGV4dENvbnRlbnQgPSAnICc7IC8vIGZpeGluZyBhIHByb2JsZW0gZm9yIHVzaW5nIGpzXG5cbiAgYWRkTm90ZUxpbmsuYXBwZW5kKGFkZE5vdGVJY29uLCBhZGROb3RlVGV4dCk7XG4gIGFkZE5vdGVEaXYuYXBwZW5kQ2hpbGQoYWRkTm90ZUxpbmspO1xuICBhZGROb3RlUm93LmFwcGVuZENoaWxkKGFkZE5vdGVEaXYpO1xuICBpZiAobm90ZXMpIHtcbiAgICBub3Rlcy5mb3JFYWNoKChub3RlKSA9PiB7XG4gICAgICAvLyBwcmVjaXNvIGNpcmFyIG8gbGF5b3V0IGRhcyBub3Rhc1xuICAgICAgbm90ZXNMaXN0LmlubmVySFRNTCArPSBgPHNwYW4+JHtub3RlfTwvc3Bhbj5gO1xuICAgIH0pO1xuICB9XG4gIG5vdGVzUm93LmFwcGVuZChub3Rlc0xpc3QsIGFkZE5vdGVSb3cpO1xuICBub3Rlc0NvbnRhaW5lci5hcHBlbmQobm90ZXNIZWFkZXIsIG5vdGVzUm93KTtcblxuICByb3czLmFwcGVuZENoaWxkKG5vdGVzQ29udGFpbmVyKTtcblxuICAvLyByb3c0IChidXR0b25zKVxuICBjYW5jZWxCdG4udGV4dENvbnRlbnQgPSAnQ2FuY2VsJztcbiAgc2F2ZUJ0bi50ZXh0Q29udGVudCA9ICdTYXZlJztcbiAgaWYgKGlkICE9PSB1bmRlZmluZWQpIHNhdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzYXZlKHRpdGxlSW5wdXQsIGRhdGVJbnB1dCwgcHJpb3JpdHlTZWxlY3QsIHByb2plY3RJbnB1dCwgbm90ZXMsIGlkKSk7XG4gIGVsc2Ugc2F2ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNhdmUodGl0bGVJbnB1dCwgZGF0ZUlucHV0LCBwcmlvcml0eVNlbGVjdCwgcHJvamVjdElucHV0KSk7XG4gIHNhdmVEaXYuYXBwZW5kQ2hpbGQoc2F2ZUJ0bik7XG4gIGNhbmNlbERpdi5hcHBlbmRDaGlsZChjYW5jZWxCdG4pO1xuXG4gIHJvdzQuYXBwZW5kKHNhdmVEaXYsIGNhbmNlbERpdik7XG5cbiAgbW9kYWwuYXBwZW5kKHJvdzEsIHJvdzIsIHJvdzMsIHJvdzQpO1xuICBkdWVEYXRlTWFzaygpO1xuICBzZWFyY2hQcm9qZWN0cygpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB1aUVkaXRJdGVtO1xuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWN5Y2xlICovXG5pbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcbmltcG9ydCB7XG4gIGNyZWF0ZUVsZW1lbnQsIGhhc05vdGVzLCBsaXN0LFxufSBmcm9tICcuL3VpQ29tbW9uRnVuY3Rpb25zJztcbmltcG9ydCB1aUNvbnRyb2wgZnJvbSAnLi91aUNvbnRyb2xsZXInO1xuXG5jb25zdCBpc0NoZWNrZWQgPSAoZSkgPT4gZS5jaGVja2VkID09PSB0cnVlO1xuXG5mdW5jdGlvbiBpbnNlcnROb3RlKG5vdGVzLCBib2R5KSB7XG4gIG5vdGVzLmZvckVhY2goKGNvbnRlbnQpID0+IHtcbiAgICBjb25zdCBjb250ZW50RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29udGVudERpdi5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoY29udGVudERpdik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRDaGVja2VkKGNoZWNrYm94LCBidXR0b24sIHByaW9yaXR5KSB7XG4gIGNoZWNrYm94LmNoZWNrZWQgPSB0cnVlO1xuICBidXR0b24uY2xhc3NMaXN0LmFkZCgndGV4dC1kZWNvcmF0aW9uLWxpbmUtdGhyb3VnaCcsICdvcGFjaXR5LTUwJyk7XG4gIHByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ29wYWNpdHktNTAnKTtcbn1cblxuZnVuY3Rpb24gc2V0Q2hlY2tlZEhhbmRsZXIoZSkge1xuICBjb25zdCB7IHRhcmdldCB9ID0gZTtcbiAgY29uc3QgaWQgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XG4gIHRvZG9MaXN0LnNldENoZWNrZWQoaWQpO1xufVxuXG5jb25zdCBwcmlvcml0eVNldHRpbmdzID0ge1xuICAwOiB7IHRpdGxlOiAnTm8gcHJpb3JpdHknLCBhcnJheTogWydiaS1vY3RhZ29uJ10gfSxcbiAgMTogeyB0aXRsZTogJ1ByaW9yaXR5IDEnLCBhcnJheTogWydiaS1leGNsYW1hdGlvbi1vY3RhZ29uLWZpbGwnLCAndGV4dC1zdWNjZXNzJ10gfSxcbiAgMjogeyB0aXRsZTogJ1ByaW9yaXR5IDInLCBhcnJheTogWydiaS1leGNsYW1hdGlvbi1vY3RhZ29uLWZpbGwnLCAndGV4dC13YXJuaW5nJ10gfSxcbiAgMzogeyB0aXRsZTogJ1ByaW9yaXR5IDMnLCBhcnJheTogWydiaS1leGNsYW1hdGlvbi1vY3RhZ29uLWZpbGwnLCAndGV4dC1kYW5nZXInXSB9LFxufTtcblxuZnVuY3Rpb24gc2VsZWN0UHJpb3JpdHkobnVtKSB7XG4gIGNvbnN0IG9iaiA9IHByaW9yaXR5U2V0dGluZ3NbbnVtXTtcbiAgY29uc3Qgc3RhbmRhcmRDbGFzc2VzID0gWydzbWFsbCcsICdtcy0yJywgJ2JpJ107XG4gIGNvbnN0IGNsYXNzZXMgPSBzdGFuZGFyZENsYXNzZXMuY29uY2F0KG9iai5hcnJheSk7XG4gIGNvbnN0IGF0dHJzID0geyAnZGF0YS10b2dnbGUnOiAndG9vbHRpcCcsICdkYXRhLXBsYWNlbWVudCc6ICd0b3AnIH07XG4gIGF0dHJzLnRpdGxlID0gb2JqLnRpdGxlO1xuXG4gIHJldHVybiBjcmVhdGVFbGVtZW50KCdpJywgY2xhc3NlcywgYXR0cnMpO1xufVxuXG5mdW5jdGlvbiBhZGRMaW5lKG9iaikge1xuICAvLyBoZWFkZXJcbiAgY29uc3QgaXRlbSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnYWNjb3JkaW9uLWl0ZW0nXSk7XG4gIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnYWNjb3JkaW9uLWhlYWRlcicsICdwLTEnLCAnZC1mbGV4JywgJ2FsaWduLWl0ZW1zLWNlbnRlcicsICdnYXAtMSddKTtcbiAgY29uc3QgY2hlY2tib3ggPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIFsnZm9ybS1jaGVjay1pbnB1dCcsICd0ZXh0LWJnLXdhcm5pbmcnXSwge1xuICAgIHR5cGU6ICdjaGVja2JveCcsXG4gICAgJ2RhdGEtaWQnOiBgJHtvYmouaWR9YCxcbiAgfSk7XG4gIGNvbnN0IGJ0bkhlYWRlciA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIFsnYWNjb3JkaW9uLWJ1dHRvbicsICdjb2xsYXBzZWQnLCAnZmxleC1maWxsJ10sIHtcbiAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAnZGF0YS1icy10b2dnbGUnOiAnY29sbGFwc2UnLFxuICAgICdhcmlhLWV4cGFuZGVkJzogJ2ZhbHNlJyxcbiAgICAnZGF0YS1icy10YXJnZXQnOiBgI2l0ZW0tJHtvYmouaWR9YCxcbiAgfSk7XG4gIGNvbnN0IHByaW9yaXR5ID0gc2VsZWN0UHJpb3JpdHkob2JqLnByaW9yaXR5LCAxMCk7XG4gIGNvbnN0IHNwYW4gPSBjcmVhdGVFbGVtZW50KCdzcGFuJywgWydmbGV4LWZpbGwnXSk7XG4gIGNvbnN0IGNvZGUgPSBjcmVhdGVFbGVtZW50KCdjb2RlJywgWydzbWFsbCcsICd0ZXh0LW11dGVkJ10pO1xuXG4gIC8vIGJvZHlcbiAgY29uc3QgaXRlbURldGFpbHMgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2FjY29yZGlvbi1jb2xsYXBzZScsICdjb2xsYXBzZSddLCB7XG4gICAgaWQ6IGBpdGVtLSR7b2JqLmlkfWAsXG4gICAgJ2RhdGEtYnMtcGFyZW50JzogJyNsaXN0JyxcbiAgfSk7XG4gIGNvbnN0IGl0ZW1Cb2R5ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydhY2NvcmRpb24tYm9keSddKTtcbiAgY29uc3QgZWRpdERlbGV0ZUl0ZW0gPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2QtZmxleCcsICdmbGV4LXJvdy1yZXZlcnNlJywgJ2NvbCcsICdnYXAtMiddKTtcblxuICBjb25zdCBidG5FZGl0ID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgWydidG4nLCAnYnRuLXdhcm5pbmcnXSwge1xuICAgICdkYXRhLWlkJzogb2JqLmlkLFxuICAgICdkYXRhLWJzLXRhcmdldCc6ICcjZXhhbXBsZU1vZGFsJyxcbiAgICAnZGF0YS1icy10b2dnbGUnOiAnbW9kYWwnLFxuICB9KTtcbiAgY29uc3QgYnRuRGVsZXRlID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgWydidG4nLCAnYnRuLWRhbmdlciddLCB7XG4gICAgJ2RhdGEtaWQnOiBvYmouaWQsXG4gIH0pO1xuXG4gIC8vIEVWRU5UTElTVE5FUlMgT0JKRUNUU1xuICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBzZXRDaGVja2VkSGFuZGxlcik7XG5cbiAgLy8gRklMTElORyBDT05URU5UXG4gIC8vIGhlYWRlclxuICBzcGFuLnRleHRDb250ZW50ID0gb2JqLnRpdGxlO1xuICBjb2RlLnRleHRDb250ZW50ID0gb2JqLnByb2plY3Q7XG5cbiAgLy8gYm9keVxuICBidG5FZGl0LnRleHRDb250ZW50ID0gJ0VkaXQnO1xuICBidG5EZWxldGUudGV4dENvbnRlbnQgPSAnRGVsZXRlJztcblxuICAvLyBBcHBlbmRpbmcgY29udGVudFxuICBidG5IZWFkZXIuYXBwZW5kKHNwYW4sIGNvZGUpO1xuICBoZWFkZXIuYXBwZW5kKGNoZWNrYm94LCBwcmlvcml0eSwgYnRuSGVhZGVyKTtcblxuICAvLyBCb2R5IGNvbnRlbnRcbiAgaWYgKGhhc05vdGVzKG9iai5ub3RlcykpIHtcbiAgICBpbnNlcnROb3RlKG9iai5ub3RlcywgaXRlbUJvZHkpO1xuICB9XG4gIGJ0bkVkaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZWxlbSkgPT4ge1xuICAgIHVpQ29udHJvbC5oYW5kbGVycy5lZGl0KGVsZW0pO1xuICB9KTtcbiAgYnRuRGVsZXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdWlDb250cm9sLmhhbmRsZXJzLmRlbGV0ZUl0ZW0pO1xuICBlZGl0RGVsZXRlSXRlbS5hcHBlbmQoYnRuRGVsZXRlLCBidG5FZGl0KTtcbiAgaXRlbUJvZHkuYXBwZW5kQ2hpbGQoZWRpdERlbGV0ZUl0ZW0pO1xuICBpdGVtRGV0YWlscy5hcHBlbmRDaGlsZChpdGVtQm9keSk7XG5cbiAgLy8gQXBwZW5kIGVsZW1lbnRzIHRvIGxpc3RcbiAgaXRlbS5hcHBlbmQoaGVhZGVyLCBpdGVtRGV0YWlscyk7XG4gIGxpc3QuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gIGlmIChpc0NoZWNrZWQob2JqKSkgYWRkQ2hlY2tlZChjaGVja2JveCwgYnRuSGVhZGVyLCBwcmlvcml0eSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFkZExpbmU7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tY3ljbGUgKi9cbmltcG9ydCB0b2RvTGlzdCBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgZGlzcGxheVByb2plY3QsIHNldEZpbHRlckxpc3QgfSBmcm9tICcuL3VpQ29tbW9uRnVuY3Rpb25zJztcbmltcG9ydCB1aUNvbnRyb2wgZnJvbSAnLi91aUNvbnRyb2xsZXInO1xuXG5mdW5jdGlvbiBjb25zdHJ1Y3RvclByb2plY3RMaXN0KCkge1xuICBjb25zdCBmaWx0ZXJlZFByb2plY3RzID0gc2V0RmlsdGVyTGlzdCh0b2RvTGlzdC5nZXRQcm9qZWN0cygpKTtcbiAgaWYgKGZpbHRlcmVkUHJvamVjdHMubGVuZ3RoICE9PSAwKSB7XG4gICAgZmlsdGVyZWRQcm9qZWN0cy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgY29uc3QgbGlzdEl0ZW0gPSBjcmVhdGVFbGVtZW50KCdsaScsIFsnZC1mbGV4JywgJ2FsaWduLWl0ZW1zLWNlbnRlciddKTtcbiAgICAgIGNvbnN0IGljb25JdGVtID0gY3JlYXRlRWxlbWVudCgnaScsIFsnYmknLCAnYmktaGFzaCcsICdmcy00J10pO1xuICAgICAgY29uc3QgbGluayA9IGNyZWF0ZUVsZW1lbnQoJ2EnLCBbXSwgeyAnZGF0YS12YWx1ZSc6IHZhbHVlIH0pO1xuXG4gICAgICBsaW5rLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdWlDb250cm9sLnVwZGF0ZSgncHJvamVjdCcsIGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJykpKTtcblxuICAgICAgbGlzdEl0ZW0uYXBwZW5kKGljb25JdGVtLCBsaW5rKTtcblxuICAgICAgZGlzcGxheVByb2plY3QuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuICAgIH0pO1xuICB9IGVsc2UgZGlzcGxheVByb2plY3QuaW5uZXJIVE1MID0gJzxsaSBjbGFzcz1cImQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXJcIj5ObyBwcm9qZWN0cyB5ZXQgOig8L2xpPic7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnN0cnVjdG9yUHJvamVjdExpc3Q7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xuaW1wb3J0IHsgcmVzdG9yZVN0b3JhZ2UgfSBmcm9tICcuL0pTT05GdW5jdGlvbnMnO1xuXG5pbXBvcnQge1xuICBjbGVhckNvbnRlbnQsXG4gIHNob3dQbHVzQnRuLFxuICBhZGRGaWVsZCxcbiAgYWRkVGFzayxcbiAgaW5wdXQsXG4gIGFkZE1vcmUsXG4gIHF1aWNrU2F2ZSxcbiAgbGlzdCxcbn0gZnJvbSAnLi91aUNvbW1vbkZ1bmN0aW9ucyc7XG5pbXBvcnQgdWlFZGl0SXRlbSBmcm9tICcuL2VkaXRDb25zdHJ1Y3Rvcic7XG5pbXBvcnQgdWlDb250cm9sIGZyb20gJy4vdWlDb250cm9sbGVyJztcbmltcG9ydCB0b2RvTGlzdCBmcm9tICcuL2NvcmUnO1xuXG5jb25zdCBob21lTGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2EjaG9tZScpO1xuY29uc3QgcHJvamVjdHNJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2I3Byb2plY3RzJyk7XG5jb25zdCBwcm9qZWN0c0Ryb3Bkb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2I3Byb2plY3RzIGRpdicpO1xuY29uc3QgbWFpbk1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2I2V4YW1wbGVNb2RhbCcpO1xuXG4vLyBzZXQgbWF4IGhlaWdodCBmb3IgbGlzdCBpdGVtc1xuZnVuY3Rpb24gc2V0TWF4SGVpZ2h0KCkge1xuICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAvLyBnZXQgcGFkZGluZyB0b3AgKyBib3R0b20gZm9ybSBtYWluIGVsZW1lbnRcbiAgICBsZXQgbWFpblBhZGRpbmcgPSBwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKSwgbnVsbClcbiAgICAgIC5nZXRQcm9wZXJ0eVZhbHVlKCdwYWRkaW5nLXRvcCcpLm1hdGNoKC9cXGQrKFxcLlxcZCspPy8pKTtcbiAgICBtYWluUGFkZGluZyArPSBwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKSwgbnVsbClcbiAgICAgIC5nZXRQcm9wZXJ0eVZhbHVlKCdwYWRkaW5nLWJvdHRvbScpLm1hdGNoKC9cXGQrKFxcLlxcZCspPy8pKTtcblxuICAgIC8vIGdldCBvdGhlciBlbGVtZW50cyBzaXplXG4gICAgY29uc3QgYm9keUhlaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5vZmZzZXRIZWlnaHQ7XG4gICAgY29uc3QgaW5zZXRJdGVtSGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbiA+IGRpdicpLm9mZnNldEhlaWdodDtcbiAgICBjb25zdCBoZWFkZXJIZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKS5vZmZzZXRIZWlnaHQ7XG4gICAgY29uc3QgYXNpZGVIZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhc2lkZScpLm9mZnNldEhlaWdodDtcbiAgICAvLyBjb25zdCBmb290ZXJIZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb290ZXInKS5vZmZzZXRIZWlnaHQ7XG5cbiAgICAvLyBzZXQgbWF4IHNpemUgZm9yIHRhc2sgbGlzdFxuICAgIGNvbnN0IG1heEhlaWdodCA9IGJvZHlIZWlnaHQgLSBoZWFkZXJIZWlnaHQgLSBpbnNldEl0ZW1IZWlnaHQgLSBhc2lkZUhlaWdodCAtIG1haW5QYWRkaW5nO1xuICAgIGxpc3Quc3R5bGUubWF4SGVpZ2h0ID0gYCR7bWF4SGVpZ2h0fXB4YDtcbiAgfSBlbHNlIGxpc3Quc3R5bGUubWF4SGVpZ2h0ID0gJ25vbmUnO1xufVxuXG4vLyBldmVudExpc3RlbmVyc1xuLy8gaG9tZSBwYWdlIGJ1dHRvbiBmdW5jdGlvbnNcbmhvbWVMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICB1aUNvbnRyb2wudXBkYXRlKCdjbGVhcicpO1xufSk7XG5hZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdWlFZGl0SXRlbSk7XG5hZGRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgc2hvd1BsdXNCdG4pO1xuYWRkRmllbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBzaG93UGx1c0J0bik7XG5hZGRNb3JlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdWlDb250cm9sLmhhbmRsZXJzLmVkaXRNb3JlKGlucHV0KSk7XG5xdWlja1NhdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB1aUNvbnRyb2wuaGFuZGxlcnMuZmFzdFNhdmUoaW5wdXQpKTtcbi8vIHNldCBoZWlnaHQgbGltaXQgZm9yIGxpc3QgaXRlbXNcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgc2V0TWF4SGVpZ2h0KTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzZXRNYXhIZWlnaHQpO1xuXG4vLyBhdXRvLXNhdmVcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gIHVpQ29udHJvbC51cGRhdGUoKTtcbiAgc2hvd1BsdXNCdG4oKTtcbn0pO1xuXG4vLyByZXN0b3JlIGRhdGEgd2hlbiBpdCdzIGxvYWRlZFxud2luZG93Lm9ubG9hZCA9IHJlc3RvcmVTdG9yYWdlKCk7XG5cbi8vIG1lbnUgZm9yIG1vYmlsZSB2ZXJzaW9uXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICBpZiAoIWV2ZW50LnRhcmdldC5jbG9zZXN0KCcjcHJvamVjdHMnKSkge1xuICAgIHByb2plY3RzRHJvcGRvd24uY2xhc3NMaXN0LmFkZCgnbWVudS1oaWRlJyk7XG4gIH1cbn0pO1xucHJvamVjdHNJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBpZiAocHJvamVjdHNEcm9wZG93bi5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtaGlkZScpKSB7XG4gICAgcHJvamVjdHNEcm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKCdtZW51LWhpZGUnKTtcbiAgfSBlbHNlIHtcbiAgICBwcm9qZWN0c0Ryb3Bkb3duLmNsYXNzTGlzdC5hZGQoJ21lbnUtaGlkZScpO1xuICB9XG59KTtcblxuLy8gY2xlYXIgbW9kYWwgY29udGVudCBldmVyeXRpbWUgaXQncyBjbG9zZWRcbm1haW5Nb2RhbC5hZGRFdmVudExpc3RlbmVyKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB7XG4gIGNsZWFyQ29udGVudChtYWluTW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWJvZHknKSk7XG59KTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGNvbnN0IHRvb2x0aXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpO1xuICB0b29sdGlwcy5mb3JFYWNoKCh0aXApID0+IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWYsIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgdGlwID0gbmV3IGJvb3RzdHJhcC5Ub29sdGlwKHRpcCk7XG4gIH0pO1xufSwgZmFsc2UpO1xuXG4vLyBzdGFydCBhcHBcbnVpQ29udHJvbC5sb2FkKCk7XG5cbihmdW5jdGlvbiBzdGFydERlbW8oKSB7XG4gIGlmICh0b2RvTGlzdC5nZXRMZW5ndGgoKSAhPT0gMCkgcmV0dXJuO1xuICB0b2RvTGlzdC5hZGRJdGVtKHsgdGl0bGU6ICdDbGVhbiB0aGUgaG91c2UnLCBwcmlvcml0eTogMSwgcHJvamVjdDogJ0hvdXNlJyB9KTtcbiAgdG9kb0xpc3QuYWRkSXRlbSh7IHRpdGxlOiAnU3VwZXJtYXJrZXQnLCBwcmlvcml0eTogMywgcHJvamVjdDogJ1Nob3BwaW5nJyB9KTtcbiAgdG9kb0xpc3QuYWRkSXRlbSh7IHRpdGxlOiAnRnJlZSBNYXJrZXQnLCBwcm9qZWN0OiAnU2hvcHBpbmcnIH0pO1xuICB0b2RvTGlzdC5hZGRJdGVtKHsgdGl0bGU6ICdQQyBNYWludGVuYW5jZScsIHByaW9yaXR5OiAyLCBwcm9qZWN0OiAnV29yaycgfSk7XG4gIHRvZG9MaXN0LmFkZE5vdGUoMiwgJ0JhbmFuYScpO1xuICB0b2RvTGlzdC5hZGROb3RlKDIsICdHcmVlbiBvbmlvbnMnKTtcbiAgdG9kb0xpc3QuYWRkTm90ZSgyLCAnUmFkaXNoJyk7XG4gIHRvZG9MaXN0LmFkZE5vdGUoMiwgJ1Bhc3RlbCBmb3IgbHVuY2ggOiknKTtcbiAgdWlDb250cm9sLnVwZGF0ZSgpO1xufSgpKTtcbiIsImltcG9ydCBmbGF0cGlja3IgZnJvbSAnZmxhdHBpY2tyJztcbmltcG9ydCB7IFBvcnR1Z3Vlc2UgfSBmcm9tICdmbGF0cGlja3IvZGlzdC9sMTBuL3B0JztcbmltcG9ydCBJTWFzayBmcm9tICdpbWFzayc7XG5pbXBvcnQgeyBtYXNrRGF0ZSB9IGZyb20gJy4vZGF0ZSc7XG5pbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcblxuZXhwb3J0IGNvbnN0IGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYjbGlzdCcpO1xuZXhwb3J0IGNvbnN0IGFkZEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQjaXRlbVRpdGxlJyk7XG5leHBvcnQgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuZXhwb3J0IGNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhI2FkZEl0ZW0nKTtcbmV4cG9ydCBjb25zdCBhZGRNb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uI2FkZE1vcmUnKTtcbmV4cG9ydCBjb25zdCBxdWlja1NhdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24jc2F2ZUl0ZW0nKTtcbmV4cG9ydCBjb25zdCBkaXNwbGF5UHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsI3Byb2plY3RzJyk7XG5cbmV4cG9ydCBjb25zdCBzZXRGaWx0ZXJMaXN0ID0gKGVsZW0pID0+IGVsZW0uZmlsdGVyKCh2YWx1ZSwgaW5kZXgsIHNlbGYpID0+IHZhbHVlICE9PSAnJyAmJiBzZWxmLmluZGV4T2YodmFsdWUpID09PSBpbmRleCk7XG5leHBvcnQgY29uc3QgaGFzTm90ZXMgPSAob2JqKSA9PiBvYmoubGVuZ3RoID4gMDtcbmV4cG9ydCBjb25zdCBsb2FkTGlzdCA9ICgpID0+IFsuLi50b2RvTGlzdC5hbGxUYXNrc0xpc3QoKV07XG5leHBvcnQgY29uc3Qgc29ydFBhcmFtID0gKGFyciwgcGFyYW0pID0+IFsuLi5hcnJdXG4gIC5zb3J0KChhLCBiKSA9PiAoKGFbcGFyYW1dIDwgYltwYXJhbV0pID8gLTEgOiAxKSk7XG5cbmNvbnN0IHNwZWNpYWxDaGFyc0VudHJpZXMgPSBbXG4gIFsnw4DDgcOCw4PDhMOFJywgJ0EnXSxcbiAgWyfDoMOhw6LDo8Okw6UnLCAnYSddLFxuICBbJ8OIw4nDisOLJywgJ0UnXSxcbiAgWyfDqMOpw6rDqycsICdlJ10sXG4gIFsnw4zDjcOOw48nLCAnSSddLFxuICBbJ8Osw63DrsOvJywgJ2knXSxcbiAgWyfDksOTw5XDlMOWJywgJ08nXSxcbiAgWyfDssOzw7XDtMO2JywgJ28nXSxcbiAgWyfDmcOaw5vDnCcsICdVJ10sXG4gIFsnw7nDusO7w7wnLCAndSddLFxuICBbJ8OHJywgJ0MnXSxcbiAgWyfDpycsICdjJ10sXG5dO1xuXG5jb25zdCBzcGVjaWFsQ2hhcnNNYXAgPSBPYmplY3QuZnJvbUVudHJpZXMoXG4gIHNwZWNpYWxDaGFyc0VudHJpZXMuZmxhdE1hcCgoW2NoYXJzLCB2YWx1ZV0pID0+IFsuLi5jaGFyc10ubWFwKChjaGFyKSA9PiBbY2hhciwgdmFsdWVdKSksXG4pO1xuXG4vLyBFTEVNRU5UIENSRUFUT1JTXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRBdHRycyhlbGVtLCBhdHRycykge1xuICBPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkICYmIGF0dHJzW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoa2V5LCAnJyk7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnLCBjbGFzc05hbWVzID0gW10sIGF0dHJpYnV0ZXMgPSB7fSkge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICBpZiAoY2xhc3NOYW1lcy5sZW5ndGgpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCguLi5jbGFzc05hbWVzKTtcbiAgc2V0QXR0cnMoZWxlbWVudCwgYXR0cmlidXRlcyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlT3B0aW9uKHZhbHVlLCB0ZXh0LCBzZWxlY3RlZCkge1xuICBjb25zdCBvcHRpb24gPSBjcmVhdGVFbGVtZW50KCdvcHRpb24nLCBbXSwgeyB2YWx1ZSB9KTtcbiAgb3B0aW9uLnRleHRDb250ZW50ID0gdGV4dDtcbiAgaWYgKHNlbGVjdGVkKSB7XG4gICAgb3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnJyk7XG4gIH1cbiAgcmV0dXJuIG9wdGlvbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByaW9yaXR5U2VsZWN0KG51bSA9IDApIHtcbiAgY29uc3Qgc2VsZWN0ID0gY3JlYXRlRWxlbWVudCgnc2VsZWN0JywgWydmb3JtLXNlbGVjdCddLCB7XG4gICAgJ2FyaWEtbGFiZWwnOiAnUHJpb3JpdHknLFxuICB9KTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpICs9IDEpIHtcbiAgICBjb25zdCB0ZXh0ID0gaSA9PT0gMCA/ICctLSBTZWxlY3QgUHJpb3JpdHknIDogYFByaW9yaXR5ICR7aX1gO1xuICAgIGNvbnN0IHNlbGVjdGVkID0gaSA9PT0gcGFyc2VJbnQobnVtLCAxMCk7XG4gICAgY29uc3Qgb3B0aW9uID0gY3JlYXRlT3B0aW9uKGksIHRleHQsIHNlbGVjdGVkKTtcbiAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgfVxuICByZXR1cm4gc2VsZWN0O1xufVxuXG4vLyBVSSBGVU5DVElPTlNcblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyQ29udGVudChlbGVtKSB7XG4gIHdoaWxlIChlbGVtLmZpcnN0Q2hpbGQpIHtcbiAgICBlbGVtLnJlbW92ZUNoaWxkKGVsZW0ubGFzdENoaWxkKTtcbiAgfVxufVxuXG4vLyBBREQvRURJVCBORVcgVEFTSyBTQ1JFRU4gRlVOQ1RJT05TXG5cbmZ1bmN0aW9uIHJlbW92ZVNwZWNpYWxzKHRleHQpIHtcbiAgbGV0IHNlYXJjaCA9IHRleHQ7XG4gIHNlYXJjaCA9IHNlYXJjaC5yZXBsYWNlKFxuICAgIC9bw4Atw5zDoC3DvF0vZyxcbiAgICAobWF0Y2gpID0+IHNwZWNpYWxDaGFyc01hcFttYXRjaF0gfHwgbWF0Y2gsXG4gICk7XG4gIHJldHVybiBzZWFyY2g7XG59XG4vLyBwcm9qZWN0cyBkYXRhbGlzdCBhdXRvY29tcGxldGVcbmNvbnN0IGF1dG9Db21wbGV0ZSA9IChzZWFyY2gpID0+IHRvZG9MaXN0LmdldFByb2plY3RzKCkuZmlsdGVyKCh2YWx1ZSkgPT4ge1xuICBjb25zdCB2YWx1ZUxvd2VyY2FzZSA9IHJlbW92ZVNwZWNpYWxzKHZhbHVlLnRvTG93ZXJDYXNlKCkpO1xuICBjb25zdCBzZWFyY2hMb3dlcmNhc2UgPSByZW1vdmVTcGVjaWFscyhzZWFyY2gudG9Mb3dlckNhc2UoKSk7XG4gIHJldHVybiB2YWx1ZUxvd2VyY2FzZS5pbmNsdWRlcyhzZWFyY2hMb3dlcmNhc2UpO1xufSk7XG5cbi8vIGNhbGxpbmcgZnVuY3Rpb25zIHRvIGF1dG9jb21wbGV0ZSBQcm9qZWN0IGZpZWxkXG5cbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hQcm9qZWN0cygpIHtcbiAgY29uc3QgaW5wdXRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VudGVyUHJvamVjdCcpO1xuICBjb25zdCBkYXRhbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RhdGFsaXN0Jyk7XG4gIGlucHV0UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICh7IHRhcmdldCB9KSA9PiB7XG4gICAgY29uc3QgaW5wdXREYXRhID0gdGFyZ2V0LnZhbHVlO1xuICAgIGlmIChpbnB1dERhdGEubGVuZ3RoKSB7XG4gICAgICBjb25zdCBhdXRvQ29tcGxldGVPcHRpb25zID0gYXV0b0NvbXBsZXRlKGlucHV0RGF0YSk7XG4gICAgICBkYXRhbGlzdC5pbm5lckhUTUwgPSBgJHthdXRvQ29tcGxldGVPcHRpb25zXG4gICAgICAgIC5tYXAoKHZhbHVlKSA9PiBgPG9wdGlvbiB2YWx1ZT1cIiR7dmFsdWV9XCIgLz5gKVxuICAgICAgICAuam9pbignJyl9YDtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBEQVRFUElDS0VSIEFORCBNQVNLIEZVTkNUSU9OU1xuZXhwb3J0IGZ1bmN0aW9uIGR1ZURhdGVNYXNrKCkge1xuICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2R1ZURhdGUnKTtcbiAgY29uc3QgZmxhdEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuZmxhdHBpY2tyJyk7XG5cbiAgLy8gYXBwbHkgbWFzayB0byBkdWVEYXRlRmllbGRcbiAgY29uc3QgbWFzayA9IElNYXNrKGR1ZURhdGUsIG1hc2tEYXRlKTtcblxuICAvLyBhcHBseSBmbGF0cGlja3IgZGF0ZXBpY2tlciB0byBhbGwgZWxlbWVudHMgaW4gYSBkaXZcbiAgLy8gKGljb24gdG9nZ2xlIGFuZCBpbnB1dCBkYXRlIHVzaW5nIGRhdGEtIGF0dHJpYnV0ZXMpXG4gIGZsYXRwaWNrcihmbGF0RWxlbSwge1xuICAgIGRhdGVGb3JtYXQ6ICdkL20vWScsXG4gICAgZGlzYWJsZU1vYmlsZTogJ3RydWUnLFxuICAgIGFsbG93SW5wdXQ6IHRydWUsXG4gICAgd3JhcDogdHJ1ZSxcbiAgICBsb2NhbGU6IFBvcnR1Z3Vlc2UsXG4gICAgb25DaGFuZ2Uoc2VsZWN0ZWREYXRlcywgZGF0ZVN0cikge1xuICAgICAgbWFzay51cGRhdGVWYWx1ZShkYXRlU3RyKTtcbiAgICB9LFxuICB9KTtcbn1cblxuLy8gbWFpbiBzY3JlZW4gaW50ZXJhY3Rpb25zXG5cbi8vIGNoZWNrIHZpc3VhbCBlZmZlY3RcbmV4cG9ydCBmdW5jdGlvbiBzaG93UGx1c0J0bigpIHtcbiAgLy8gRW5jb250cmEgbyBib3TDo28gK1xuICBjb25zdCBwbHVzQnRuID0gYWRkRmllbGQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICBjb25zdCBzYXZlQnRuID0gcGx1c0J0bi5uZXh0RWxlbWVudFNpYmxpbmc7XG4gIC8vIFNlIG8gdmFsb3IgZG8gY2FtcG8gdMOtdHVsbyBmb3IgZGlmZXJlbnRlIGRlIHZhemlvLFxuICAvLyBlbnTDo28gZWxlIHJldmVsYSBvIGJvdMOjbyArXG4gIGlmIChhZGRGaWVsZC52YWx1ZSAhPT0gJycpIHtcbiAgICBwbHVzQnRuLmNsYXNzTGlzdC5hZGQoJ3JldmVhbEl0ZW0nKTtcbiAgICBzYXZlQnRuLmNsYXNzTGlzdC5hZGQoJ3JldmVhbEl0ZW0nKTtcbiAgfVxuICAvLyBjYXNvIGNvbnRyw6FyaW8sIHNlIHZvY8OqIGFwYWdhciB0b2RvIG8gdMOtdHVsb1xuICAvLyBlbGUgZMOhIGRpc3BsYXk6IG5vbmUsIG5vIGJvdMOjbyArXG4gIGlmIChhZGRGaWVsZC52YWx1ZSA9PT0gJycgJiYgcGx1c0J0bi5jbGFzc0xpc3QuY29udGFpbnMoJ3JldmVhbEl0ZW0nKSkge1xuICAgIHBsdXNCdG4uY2xhc3NMaXN0LnJlbW92ZSgncmV2ZWFsSXRlbScpO1xuICAgIHNhdmVCdG4uY2xhc3NMaXN0LnJlbW92ZSgncmV2ZWFsSXRlbScpO1xuICB9XG59XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBmaW5kUGFyZW50Tm9kZShlbGVtZW50LCBhdHRyaWJ1dGVOYW1lKSB7XG4vLyAgIGxldCB7IHBhcmVudE5vZGUgfSA9IGVsZW1lbnQ7XG4vLyAgIHdoaWxlIChwYXJlbnROb2RlKSB7XG4vLyAgICAgaWYgKHBhcmVudE5vZGUuaGFzQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpKSB7XG4vLyAgICAgICByZXR1cm4gcGFyZW50Tm9kZTtcbi8vICAgICB9XG4vLyAgICAgcGFyZW50Tm9kZSA9IHBhcmVudE5vZGUucGFyZW50Tm9kZTtcbi8vICAgfVxuLy8gICByZXR1cm4gbnVsbDsgLy8gUmV0b3JuYSBudWxsIHNlIG7Do28gZW5jb250cm91IG5lbmh1bSBuw7MgcGFpIGNvbSBvIGF0cmlidXRvIGRlc2VqYWRvXG4vLyB9XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tY3ljbGUgKi9cbmltcG9ydCB7IHBvcHVsYXRlU3RvcmFnZSB9IGZyb20gJy4vSlNPTkZ1bmN0aW9ucyc7XG5pbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcbmltcG9ydCB1aUVkaXRJdGVtIGZyb20gJy4vZWRpdENvbnN0cnVjdG9yJztcbmltcG9ydCBhZGRMaW5lIGZyb20gJy4vbGlzdENvbnN0cnVjdG9yJztcbmltcG9ydCBjb25zdHJ1Y3RvclByb2plY3RMaXN0IGZyb20gJy4vcHJvamVjdExpc3RDb25zdHJ1Y3Rvcic7XG5pbXBvcnQge1xuICBjbGVhckNvbnRlbnQsIGxpc3QsIHNvcnRQYXJhbSwgbG9hZExpc3QsIGRpc3BsYXlQcm9qZWN0LFxufSBmcm9tICcuL3VpQ29tbW9uRnVuY3Rpb25zJztcblxuLy8gVUkgQ29udHJvbGxlclxuY29uc3QgdWlDb250cm9sID0gKCgpID0+IHtcbiAgbGV0IGN1cnJlbnRGaWx0ZXIgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIHNldEN1cnJlbnRGaWx0ZXIoa2V5LCB2YWx1ZSkge1xuICAgIGlmICh0eXBlb2Yga2V5ICE9PSAndW5kZWZpbmVkJykgY3VycmVudEZpbHRlciA9IHsga2V5LCB2YWx1ZSB9O1xuICAgIGVsc2UgY3VycmVudEZpbHRlciA9IG51bGw7XG4gIH1cblxuICBjb25zdCBmaWx0ZXJBcnJheSA9IChhcnIsIGZpbHRlciwgdmFsdWUpID0+IHtcbiAgICBpZiAoZmlsdGVyKSByZXR1cm4gWy4uLmFyci5maWx0ZXIoKG9iamV0bykgPT4gb2JqZXRvW2ZpbHRlcl0gPT09IHZhbHVlKV07XG4gICAgcmV0dXJuIGFycjtcbiAgfTtcblxuICBmdW5jdGlvbiBsb2FkKCkge1xuICAgIC8vIGFkZCBwcm9qZWN0IGxpc3RcbiAgICBjb25zdHJ1Y3RvclByb2plY3RMaXN0KCk7XG4gICAgY29uc3QgdWlMaXN0ID0gc29ydFBhcmFtKGxvYWRMaXN0KCksICdjaGVja2VkJyk7XG4gICAgaWYgKGN1cnJlbnRGaWx0ZXIgIT09IG51bGwpIHtcbiAgICAgIGZpbHRlckFycmF5KHVpTGlzdCwgY3VycmVudEZpbHRlci5rZXksIGN1cnJlbnRGaWx0ZXIudmFsdWUpLmZvckVhY2goKG9iaikgPT4gYWRkTGluZShvYmopKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdWlMaXN0LmZvckVhY2goKG9iaikgPT4gYWRkTGluZShvYmopKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoZmlsdGVyLCB2YWx1ZSkge1xuICAgIGNsZWFyQ29udGVudChsaXN0KTtcbiAgICBjbGVhckNvbnRlbnQoZGlzcGxheVByb2plY3QpO1xuICAgIGlmICh0eXBlb2YgZmlsdGVyICE9PSAndW5kZWZpbmVkJykgc2V0Q3VycmVudEZpbHRlcihmaWx0ZXIsIHZhbHVlKTtcbiAgICBpZiAoZmlsdGVyID09PSAnY2xlYXInKSBzZXRDdXJyZW50RmlsdGVyKCk7XG4gICAgbG9hZCgpO1xuICAgIHBvcHVsYXRlU3RvcmFnZSgpO1xuICAgIGNvbnNvbGUud2FybignVXBkYXRlZCEnKTtcbiAgfVxuXG4gIGNvbnN0IGhhbmRsZXJzID0gKCgpID0+IHtcbiAgICAvLyBob21lIGJ1dHRvbnNcbiAgICBmdW5jdGlvbiBlZGl0TW9yZSh0aXRsZSkge1xuICAgICAgdWlFZGl0SXRlbSh0aXRsZSk7XG4gICAgICB0aXRsZS52YWx1ZSA9ICcnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZhc3RTYXZlKHRpdGxlKSB7XG4gICAgICBjb25zdCBuZXdPYmogPSB7IHRpdGxlOiB0aXRsZS52YWx1ZSB9O1xuICAgICAgdG9kb0xpc3QuYWRkSXRlbShuZXdPYmopO1xuICAgICAgdGl0bGUudmFsdWUgPSAnJztcbiAgICAgIHVwZGF0ZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVkaXQoZWxlbSkge1xuICAgICAgZWxlbS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBlbGVtO1xuICAgICAgY29uc3Qgb2JqID0gdG9kb0xpc3QuZ2V0SXRlbSh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJykpO1xuICAgICAgdWlFZGl0SXRlbShcbiAgICAgICAgb2JqLnRpdGxlLFxuICAgICAgICBvYmouZHVlRGF0ZSxcbiAgICAgICAgb2JqLnByaW9yaXR5LFxuICAgICAgICBvYmoucHJvamVjdCxcbiAgICAgICAgb2JqLm5vdGVzLFxuICAgICAgICBvYmouaWQsXG4gICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlbGV0ZUl0ZW0oaXRlbSkge1xuICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGl0ZW07XG4gICAgICB0b2RvTGlzdC5kZWxldGVJdGVtKHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSk7XG4gICAgICB1cGRhdGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgZWRpdE1vcmUsXG4gICAgICBmYXN0U2F2ZSxcbiAgICAgIGVkaXQsXG4gICAgICBkZWxldGVJdGVtLFxuICAgIH07XG4gIH0pKCk7XG5cbiAgcmV0dXJuIHtcbiAgICBoYW5kbGVycyxcbiAgICBzZXRDdXJyZW50RmlsdGVyLFxuICAgIGxvYWQsXG4gICAgdXBkYXRlLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdWlDb250cm9sO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua3RvZG9fbGlzdFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt0b2RvX2xpc3RcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcIjNyZHBhcnRcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKDcyNzMpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=