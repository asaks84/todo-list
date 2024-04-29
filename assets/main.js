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
  function deleteNote(id, pos) {
    list[findObjPos(id)].deleteNote(pos);
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
    deleteNote,
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

function deleteNote(id, noteIndex) {
  console.log('ID:', id);
  console.log('Note Index:', noteIndex);
  _core__WEBPACK_IMPORTED_MODULE_0__["default"].deleteNote(id, noteIndex);
  (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.clearContent)(_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.mainModal.querySelector('.modal-body'));
  const obj = _core__WEBPACK_IMPORTED_MODULE_0__["default"].getItem(id);
  uiEditItem(
    obj.title,
    obj.dueDate,
    obj.priority,
    obj.project,
    obj.notes,
    obj.id,
  );
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
  const row2 = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)(
    'div',
    ['bg-gray', 'row', 'g-0', 'gap-2', 'flex-nowrap'],
  );

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
  const notesList = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('ul', ['list-unstyled']);

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
    notes.forEach((note, index) => {
      const listItem = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('li');
      const deleteLink = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('a');
      const deleteIcon = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('i', ['bi', 'bi-trash3']);
      const text = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_1__.createElement)('span');

      deleteLink.appendChild(deleteIcon);
      deleteLink.addEventListener('click', () => {
        deleteNote(id, index);
      });

      text.textContent = note;
      listItem.append(deleteLink, text);
      notesList.appendChild(listItem);
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
/* harmony export */   fastSave: () => (/* binding */ fastSave)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ 3317);
/* harmony import */ var _editConstructor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editConstructor */ 1444);
/* harmony import */ var _uiController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uiController */ 5168);
/* eslint-disable import/no-cycle */




// home buttons
function editMore(title) {
  (0,_editConstructor__WEBPACK_IMPORTED_MODULE_1__["default"])(title);
  title.value = '';
}

function fastSave(title) {
  const newObj = { title: title.value };
  _core__WEBPACK_IMPORTED_MODULE_0__["default"].addItem(newObj);
  title.value = '';
  _uiController__WEBPACK_IMPORTED_MODULE_2__["default"].update();
}

function edit(elem) {
  elem.stopImmediatePropagation();
  const { target } = elem;
  const obj = _core__WEBPACK_IMPORTED_MODULE_0__["default"].getItem(target.getAttribute('data-id'));
  (0,_editConstructor__WEBPACK_IMPORTED_MODULE_1__["default"])(
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
  _core__WEBPACK_IMPORTED_MODULE_0__["default"].deleteItem(target.getAttribute('data-id'));
  _uiController__WEBPACK_IMPORTED_MODULE_2__["default"].update();
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
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ 3317);
/* harmony import */ var _handlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handlers */ 7659);
/* harmony import */ var _uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uiCommonFunctions */ 4656);
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

  return (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('i', classes, attrs);
}

function addLine(obj) {
  // header
  const item = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', ['accordion-item']);
  const header = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.createElement)('div', ['accordion-header', 'p-1', 'd-flex', 'align-items-center', 'gap-1']);
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
  const priority = selectPriority(obj.priority, 10);
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

// set max height for list items
function setMaxHeight() {
  if (window.innerWidth < 768) {
    // get padding top + bottom form main element
    let mainPadding = parseFloat(window.getComputedStyle(document
      .querySelector('main'), null)
      .getPropertyValue('padding-top').match(/\d+(\.\d+)?/));

    mainPadding += parseFloat(window.getComputedStyle(document
      .querySelector('main'), null)
      .getPropertyValue('padding-bottom').match(/\d+(\.\d+)?/));

    // get other elements size
    const bodyHeight = document.querySelector('body').offsetHeight;
    const insetItemHeight = document.querySelector('main > div').offsetHeight;
    const headerHeight = document.querySelector('header').offsetHeight;
    const asideHeight = document.querySelector('aside').offsetHeight;
    // const footerHeight = document.querySelector('footer').offsetHeight;

    // set max size for task list
    const maxHeight = bodyHeight
      - headerHeight - insetItemHeight - asideHeight - mainPadding;
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
_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.mainModal.addEventListener('hidden.bs.modal', () => {
  (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.clearContent)(_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_2__.mainModal.querySelector('.modal-body'));
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
/* harmony export */   mainModal: () => (/* binding */ mainModal),
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
const mainModal = document.querySelector('div#exampleModal');

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
/* harmony import */ var _listConstructor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./listConstructor */ 2212);
/* harmony import */ var _projectListConstructor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projectListConstructor */ 7505);
/* harmony import */ var _uiCommonFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./uiCommonFunctions */ 4656);
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
    (0,_projectListConstructor__WEBPACK_IMPORTED_MODULE_2__["default"])();
    const uiList = (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_3__.sortParam)((0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_3__.loadList)(), 'checked');
    if (currentFilter !== null) {
      filterArray(uiList, currentFilter.key, currentFilter.value).forEach((obj) => (0,_listConstructor__WEBPACK_IMPORTED_MODULE_1__["default"])(obj));
    } else {
      uiList.forEach((obj) => (0,_listConstructor__WEBPACK_IMPORTED_MODULE_1__["default"])(obj));
    }
  }

  function update(filter, value) {
    (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_3__.clearContent)(_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_3__.list);
    (0,_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_3__.clearContent)(_uiCommonFunctions__WEBPACK_IMPORTED_MODULE_3__.displayProject);
    if (typeof filter !== 'undefined') setCurrentFilter(filter, value);
    if (filter === 'clear') setCurrentFilter();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9zdHlsZS5zY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvSlNPTkZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL2NvcmUuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9kYXRlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvZWRpdENvbnN0cnVjdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvaGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9saXN0Q29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9wcm9qZWN0TGlzdENvbnN0cnVjdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvc2NyaXB0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvdWlDb21tb25GdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy91aUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHRvZG9MaXN0IGZyb20gJy4vY29yZSc7XG4vLyBpbXBvcnQgYWRkTGluZSBmcm9tICcuL3VpTGlzdEdlbmVyYXRvcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBwb3B1bGF0ZVN0b3JhZ2UoKSB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXRhJywgdG9kb0xpc3QudG9KU09OKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzdG9yZVN0b3JhZ2UoKSB7XG4gIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGF0YScpID09PSBudWxsKSByZXR1cm47XG4gIHRvZG9MaXN0LnJlc3RvcmUobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhdGEnKSk7XG59XG4iLCJmdW5jdGlvbiBDcmVhdGVJdGVtKGlkLCB0aXRsZSwgZHVlRGF0ZSA9IDAsIHByaW9yaXR5ID0gMCwgcHJvamVjdCA9IG51bGwsIGNoZWNrZWQgPSBmYWxzZSkge1xuICBjb25zdCBub3RlcyA9IFtdO1xuXG4gIGZ1bmN0aW9uIGFkZE5vdGUodmFsKSB7IG5vdGVzLnB1c2godmFsKTsgfVxuICBmdW5jdGlvbiBkZWxldGVOb3RlKHBvcykgeyBub3Rlcy5zcGxpY2UocG9zLCAxKTsgfVxuICBmdW5jdGlvbiBlZGl0Tm90ZShwb3MsIHZhbCkgeyBub3Rlc1twb3NdID0gdmFsOyB9XG4gIGNvbnN0IGdldEFsbE5vdGVzID0gKCkgPT4gbm90ZXM7XG4gIGNvbnN0IGdldE5vdGUgPSAocG9zKSA9PiBub3Rlc1twb3NdO1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZUl0ZW0obmV3VmFsdWVzKSB7XG4gICAgY29uc3QgdXBkYXRlZFZhbHVlcyA9IHtcbiAgICAgIHRpdGxlOiAobmV3VmFsdWVzLnRpdGxlICE9PSB1bmRlZmluZWQgJiYgbmV3VmFsdWVzLnRpdGxlICE9PSB0aXRsZSlcbiAgICAgICAgPyBuZXdWYWx1ZXMudGl0bGUgOiB0aXRsZSxcbiAgICAgIGR1ZURhdGU6IChuZXdWYWx1ZXMuZHVlRGF0ZSAhPT0gdW5kZWZpbmVkICYmIG5ld1ZhbHVlcy5kdWVEYXRlICE9PSBkdWVEYXRlKVxuICAgICAgICA/IG5ld1ZhbHVlcy5kdWVEYXRlIDogZHVlRGF0ZSxcbiAgICAgIHByb2plY3Q6IChuZXdWYWx1ZXMucHJvamVjdCAhPT0gdW5kZWZpbmVkICYmIG5ld1ZhbHVlcy5wcm9qZWN0ICE9PSBwcm9qZWN0KVxuICAgICAgICA/IG5ld1ZhbHVlcy5wcm9qZWN0IDogcHJvamVjdCxcbiAgICAgIHByaW9yaXR5OiAobmV3VmFsdWVzLnByaW9yaXR5ICE9PSB1bmRlZmluZWQgJiYgbmV3VmFsdWVzLnByaW9yaXR5ICE9PSBwcmlvcml0eSlcbiAgICAgICAgPyBuZXdWYWx1ZXMucHJpb3JpdHkgOiBwcmlvcml0eSxcbiAgICAgIGNoZWNrZWQ6IChuZXdWYWx1ZXMuY2hlY2tlZCAhPT0gdW5kZWZpbmVkICYmIG5ld1ZhbHVlcy5jaGVja2VkICE9PSBjaGVja2VkKVxuICAgICAgICA/IG5ld1ZhbHVlcy5jaGVja2VkIDogY2hlY2tlZCxcbiAgICB9O1xuICAgIGNvbnN0IG5ld09iaiA9IENyZWF0ZUl0ZW0oXG4gICAgICBpZCxcbiAgICAgIHVwZGF0ZWRWYWx1ZXMudGl0bGUsXG4gICAgICB1cGRhdGVkVmFsdWVzLmR1ZURhdGUsXG4gICAgICB1cGRhdGVkVmFsdWVzLnByaW9yaXR5LFxuICAgICAgdXBkYXRlZFZhbHVlcy5wcm9qZWN0LFxuICAgICAgdXBkYXRlZFZhbHVlcy5jaGVja2VkLFxuICAgICk7XG4gICAgaWYgKG5vdGVzLmxlbmd0aCA+IDApIG5vdGVzLmZvckVhY2goKG5vdGUpID0+IG5ld09iai5hZGROb3RlKG5vdGUpKTtcbiAgICByZXR1cm4gbmV3T2JqO1xuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5mcmVlemUoe1xuICAgIGlkLFxuICAgIHRpdGxlLFxuICAgIGR1ZURhdGUsXG4gICAgcHJvamVjdCxcbiAgICBwcmlvcml0eSxcbiAgICBjaGVja2VkLFxuICAgIGFkZE5vdGUsXG4gICAgZWRpdE5vdGUsXG4gICAgZ2V0Tm90ZSxcbiAgICBkZWxldGVOb3RlLFxuICAgIGdldEFsbE5vdGVzLFxuICAgIHVwZGF0ZUl0ZW0sXG4gIH0pO1xufVxuXG5jb25zdCB0b2RvTGlzdCA9ICgoKSA9PiB7XG4gIGNvbnN0IGxpc3QgPSBbXTtcblxuICBmdW5jdGlvbiBmaW5kT2JqUG9zKGlkVmFsdWUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChsaXN0W2ldLmlkID09PSBwYXJzZUludChpZFZhbHVlLCAxMCkpIHJldHVybiBpO1xuICAgIH1cbiAgICB0aHJvdyBFcnJvcignT2JqZWN0IG5vdCBmb3VuZCcpO1xuICB9XG5cbiAgY29uc3QgcmV0dXJuT2JqID0gKGl0ZW0pID0+ICh7XG4gICAgdGl0bGU6IGl0ZW0udGl0bGUsXG4gICAgcHJvamVjdDogaXRlbS5wcm9qZWN0LFxuICAgIGR1ZURhdGU6IGl0ZW0uZHVlRGF0ZSxcbiAgICBwcmlvcml0eTogaXRlbS5wcmlvcml0eSxcbiAgICBjaGVja2VkOiBpdGVtLmNoZWNrZWQsXG4gICAgbm90ZXM6IGl0ZW0uZ2V0QWxsTm90ZXMoKSxcbiAgICBpZDogaXRlbS5pZCxcbiAgfSk7XG5cbiAgY29uc3QgZ2V0SXRlbSA9IChpZCkgPT4gcmV0dXJuT2JqKGxpc3RbZmluZE9ialBvcyhpZCldKTtcbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGlzdC5sZW5ndGg7XG4gIGNvbnN0IGFsbFRhc2tzTGlzdCA9ICgpID0+IGxpc3QubWFwKChvYmopID0+IChyZXR1cm5PYmoob2JqKSkpO1xuICBmdW5jdGlvbiByZXNldCgpIHsgbGlzdC5sZW5ndGggPSAwOyB9XG5cbiAgY29uc3QgZ2V0UHJvamVjdHMgPSAoKSA9PiBsaXN0Lm1hcCgoaXRlbSkgPT4gaXRlbS5wcm9qZWN0KVxuICAgIC5maWx0ZXIoKHZhbHVlLCBwb3MsIHNlbGYpID0+IHZhbHVlICE9PSBudWxsICYmIHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IHBvcyk7XG5cbiAgZnVuY3Rpb24gZ2V0QmlnZ2VySWQoKSB7XG4gICAgY29uc3QgbGF0ZXN0T2JqID0gbGlzdC5yZWR1Y2UoKG1heCwgb2JqKSA9PiAob2JqLmlkID4gbWF4LmlkID8gb2JqIDogbWF4KSwgeyBpZDogMCB9KTtcbiAgICByZXR1cm4gbGF0ZXN0T2JqLmlkO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkSXRlbShvYmopIHtcbiAgICBjb25zdCBpZCA9IGxpc3QubGVuZ3RoID09PSAwID8gMCA6IHBhcnNlSW50KGdldEJpZ2dlcklkKCksIDEwKSArIDE7XG4gICAgY29uc3QgbmV3SXRlbSA9IENyZWF0ZUl0ZW0oaWQsIG9iai50aXRsZSwgb2JqLmR1ZURhdGUsIG9iai5wcmlvcml0eSwgb2JqLnByb2plY3QsIG9iai5jaGVja2VkKTtcbiAgICBsaXN0LnB1c2gobmV3SXRlbSk7XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0SXRlbShvYmpJRCwgbmV3T2JqKSB7XG4gICAgY29uc3Qgb2JqVG9FZGl0ID0gbGlzdFtmaW5kT2JqUG9zKG9iaklEKV07XG4gICAgY29uc3QgcmVzdWx0ID0gb2JqVG9FZGl0LnVwZGF0ZUl0ZW0obmV3T2JqKTtcbiAgICBsaXN0W2ZpbmRPYmpQb3Mob2JqSUQpXSA9IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldENoZWNrZWQoaWQpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7IGNoZWNrZWQ6ICFsaXN0W2ZpbmRPYmpQb3MoaWQpXS5jaGVja2VkIH07XG4gICAgZWRpdEl0ZW0oaWQsIHJlc3VsdCk7XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0Tm90ZShpZCwgcG9zLCB2YWwpIHtcbiAgICBsaXN0W2ZpbmRPYmpQb3MoaWQpXS5lZGl0Tm90ZShwb3MsIHZhbCk7XG4gIH1cbiAgZnVuY3Rpb24gZGVsZXRlTm90ZShpZCwgcG9zKSB7XG4gICAgbGlzdFtmaW5kT2JqUG9zKGlkKV0uZGVsZXRlTm90ZShwb3MpO1xuICB9XG4gIGZ1bmN0aW9uIGFkZE5vdGUoaWQsIHZhbCkge1xuICAgIGxpc3RbZmluZE9ialBvcyhpZCldLmFkZE5vdGUodmFsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbGV0ZUl0ZW0oaWQpIHtcbiAgICBsaXN0LnNwbGljZShmaW5kT2JqUG9zKGlkKSwgMSk7XG4gIH1cblxuICBjb25zdCB0b0pTT04gPSAoKSA9PiBKU09OLnN0cmluZ2lmeShsaXN0Lm1hcCgoaXRlbSkgPT4gcmV0dXJuT2JqKGl0ZW0pKSk7XG5cbiAgY29uc3QgcmVzdG9yZSA9IChkYXRhKSA9PiB7XG4gICAgcmVzZXQoKTtcbiAgICBKU09OLnBhcnNlKGRhdGEpLmZvckVhY2goXG4gICAgICAoe1xuICAgICAgICBpZCwgdGl0bGUsIHByb2plY3QsIGR1ZURhdGUsIHByaW9yaXR5LCBjaGVja2VkLCBub3RlcyxcbiAgICAgIH0pID0+IHtcbiAgICAgICAgY29uc3QgbmV3SXRlbSA9IENyZWF0ZUl0ZW0oaWQsIHRpdGxlLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCwgY2hlY2tlZCk7XG4gICAgICAgIG5vdGVzLmZvckVhY2goKG5vdGUpID0+IG5ld0l0ZW0uYWRkTm90ZShub3RlKSk7XG4gICAgICAgIGxpc3QucHVzaChuZXdJdGVtKTtcbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGdldExlbmd0aCxcbiAgICBhZGROb3RlLFxuICAgIGVkaXROb3RlLFxuICAgIGRlbGV0ZU5vdGUsXG4gICAgZWRpdEl0ZW0sXG4gICAgYWRkSXRlbSxcbiAgICBkZWxldGVJdGVtLFxuICAgIHJlc3RvcmUsXG4gICAgdG9KU09OLFxuICAgIHNldENoZWNrZWQsXG4gICAgZ2V0UHJvamVjdHMsXG4gICAgcmVzZXQsXG4gICAgcmV0dXJuT2JqLFxuICAgIGFsbFRhc2tzTGlzdCxcbiAgICBnZXRJdGVtLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdG9kb0xpc3Q7XG4iLCIvLyBpbXBvcnQgeyBwdEJSIH0gZnJvbSAnZGF0ZS1mbnMvbG9jYWxlJztcbmltcG9ydCB7IGZvcm1hdCB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCBJTWFzayBmcm9tICdpbWFzayc7XG5cbmNvbnN0IHNwbGl0VG9Db2RlID0gKGRhdGUpID0+IGRhdGUuc3BsaXQoJy8nKS5yZXZlcnNlKCkuam9pbignLycpLnJlcGxhY2VBbGwoJy8nLCAnLCAnKTtcbmV4cG9ydCBjb25zdCB0b0lucHV0ID0gKGRhdGEpID0+IGZvcm1hdChuZXcgRGF0ZShzcGxpdFRvQ29kZShkYXRhKSksICdkZC9MTC95eXl5Jyk7XG4vLyBjb25zdCBnZXREYXRhID0gKGFycikgPT4gYXJyLmZvckVhY2goZWxlbWVudCA9PiB7XG5cbi8vIH0pO1xuXG5leHBvcnQgY29uc3QgbWFza0RhdGUgPSB7XG4gIG1hc2s6ICdkL2BtL2BZJyxcbiAgYmxvY2tzOiB7XG4gICAgZDoge1xuICAgICAgbWFzazogSU1hc2suTWFza2VkUmFuZ2UsXG4gICAgICBwbGFjZWhvbGRlckNoYXI6ICdkJyxcbiAgICAgIGZyb206IDEsXG4gICAgICB0bzogMzEsXG4gICAgICBtYXhMZW5ndGg6IDIsXG4gICAgfSxcbiAgICBtOiB7XG4gICAgICBtYXNrOiBJTWFzay5NYXNrZWRSYW5nZSxcbiAgICAgIHBsYWNlaG9sZGVyQ2hhcjogJ20nLFxuICAgICAgZnJvbTogMSxcbiAgICAgIHRvOiAxMixcbiAgICAgIG1heExlbmd0aDogMixcbiAgICB9LFxuICAgIFk6IHtcbiAgICAgIG1hc2s6IElNYXNrLk1hc2tlZFJhbmdlLFxuICAgICAgcGxhY2Vob2xkZXJDaGFyOiAnYScsXG4gICAgICBmcm9tOiAxMDAwLFxuICAgICAgdG86IDk5OTksXG4gICAgfSxcbiAgfSxcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tY3ljbGUgKi9cbmltcG9ydCB0b2RvTGlzdCBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IHtcbiAgY3JlYXRlRWxlbWVudCxcbiAgY3JlYXRlUHJpb3JpdHlTZWxlY3QsXG4gIGR1ZURhdGVNYXNrLFxuICBzZWFyY2hQcm9qZWN0cyxcbiAgbWFpbk1vZGFsLFxuICBjbGVhckNvbnRlbnQsXG59IGZyb20gJy4vdWlDb21tb25GdW5jdGlvbnMnO1xuaW1wb3J0IHVpQ29udHJvbCBmcm9tICcuL3VpQ29udHJvbGxlcic7XG5cbmZ1bmN0aW9uIHNhdmUodGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0LCBub3RlcywgaWQpIHtcbiAgY29uc3QgbmV3T2JqID0ge1xuICAgIHRpdGxlOiB0aXRsZS52YWx1ZSxcbiAgICBkdWVEYXRlOiBkdWVEYXRlLnZhbHVlLFxuICAgIHByaW9yaXR5OiBwcmlvcml0eS52YWx1ZSxcbiAgICBwcm9qZWN0OiBwcm9qZWN0LnZhbHVlLFxuICAgIG5vdGVzLFxuICB9O1xuICBpZiAoaWQgIT09IHVuZGVmaW5lZCkge1xuICAgIHRvZG9MaXN0LmVkaXRJdGVtKGlkLCBuZXdPYmopO1xuICB9IGVsc2Uge1xuICAgIHRvZG9MaXN0LmFkZEl0ZW0obmV3T2JqKTtcbiAgfVxuICB1aUNvbnRyb2wudXBkYXRlKCk7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZU5vdGUoaWQsIG5vdGVJbmRleCkge1xuICBjb25zb2xlLmxvZygnSUQ6JywgaWQpO1xuICBjb25zb2xlLmxvZygnTm90ZSBJbmRleDonLCBub3RlSW5kZXgpO1xuICB0b2RvTGlzdC5kZWxldGVOb3RlKGlkLCBub3RlSW5kZXgpO1xuICBjbGVhckNvbnRlbnQobWFpbk1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1ib2R5JykpO1xuICBjb25zdCBvYmogPSB0b2RvTGlzdC5nZXRJdGVtKGlkKTtcbiAgdWlFZGl0SXRlbShcbiAgICBvYmoudGl0bGUsXG4gICAgb2JqLmR1ZURhdGUsXG4gICAgb2JqLnByaW9yaXR5LFxuICAgIG9iai5wcm9qZWN0LFxuICAgIG9iai5ub3RlcyxcbiAgICBvYmouaWQsXG4gICk7XG59XG5cbmZ1bmN0aW9uIHVpRWRpdEl0ZW0odGl0bGUsIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0LCBub3RlcywgaWQpIHtcbiAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYubW9kYWwtYm9keScpO1xuICAvLyBjcmVhdGluZyBlbGVtZW50c1xuICBjb25zdCByb3cxID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnXSk7XG4gIGNvbnN0IHRpdGxlRGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydpbnB1dC1ncm91cCcsICdtYi0zJywgJ2dhcC0xJ10pO1xuICBjb25zdCB0aXRsZUlucHV0ID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBbJ2Zvcm0tY29udHJvbCddLCB7XG4gICAgaWQ6ICdpdGVtVGl0bGUnLFxuICAgIHR5cGU6ICd0ZXh0JyxcbiAgICBwbGFjZWhvbGRlcjogJ05vdmEgVGFyZWZhLi4uJyxcbiAgfSk7XG4gIGNvbnN0IHJvdzIgPSBjcmVhdGVFbGVtZW50KFxuICAgICdkaXYnLFxuICAgIFsnYmctZ3JheScsICdyb3cnLCAnZy0wJywgJ2dhcC0yJywgJ2ZsZXgtbm93cmFwJ10sXG4gICk7XG5cbiAgY29uc3QgZGF0ZURpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZGF0ZScsICdmbGF0cGlja3InLCAnY29sJ10pO1xuICBjb25zdCBkYXRlSW5wdXQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIFsnZm9ybS1jb250cm9sJywgJ2ZsYXRwaWNrci1pbnB1dCddLCB7XG4gICAgaWQ6ICdkdWVEYXRlJyxcbiAgICB0eXBlOiAndGV4dCcsXG4gICAgaW5wdXRtb2RlOiAnbnVtZXJpYycsXG4gICAgJ2RhdGEtaW5wdXQnOiB1bmRlZmluZWQsXG4gICAgYXV0b2NvbXBsZXRlOiAnb2ZmJyxcbiAgfSk7XG4gIGNvbnN0IGRhdGVwaWNrZXJUb2dnbGUgPSBjcmVhdGVFbGVtZW50KCdhJywgWydpbnB1dC1idXR0b24nXSwge1xuICAgIHRpdGxlOiAndG9nZ2xlJyxcbiAgICAnZGF0YS10b2dnbGUnOiB1bmRlZmluZWQsXG4gIH0pO1xuICBjb25zdCBkYXRlSWNvbiA9IGNyZWF0ZUVsZW1lbnQoJ2knLCBbJ3RleHQtd2FybmluZycsICdzbWFsbCcsICdiaScsICdiaS1jYWxlbmRhciddKTtcblxuICBjb25zdCBwcmlvcml0eURpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29sJ10pO1xuICBjb25zdCBwcmlvcml0eVNlbGVjdCA9IGNyZWF0ZVByaW9yaXR5U2VsZWN0KHByaW9yaXR5KTtcblxuICBjb25zdCBwcm9qZWN0RGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydjb2wnXSk7XG4gIGNvbnN0IHByb2plY3RJbnB1dCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgWydmb3JtLWNvbnRyb2wnXSwge1xuICAgIGlkOiAnZW50ZXJQcm9qZWN0JyxcbiAgICB0eXBlOiAndGV4dCcsXG4gICAgbGlzdDogJ2RhdGFsaXN0T3B0aW9ucycsXG4gICAgcGxhY2Vob2xkZXI6ICdQcm9qZXRvJyxcbiAgICBhdXRvY29tcGxldGU6ICdvZmYnLFxuICB9KTtcbiAgY29uc3QgcHJvamVjdERhdGFsaXN0ID0gY3JlYXRlRWxlbWVudCgnZGF0YWxpc3QnLCBbJ3N1Z2dlc3Rpb25zJywgJ2Zvcm0nXSwge1xuICAgIGlkOiAnZGF0YWxpc3RPcHRpb25zJyxcbiAgICBkcm9wem9uZTogJ3N0cmluZycsXG4gIH0pO1xuXG4gIGNvbnN0IHJvdzMgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3JvdycsICdwdC0yJ10pO1xuXG4gIGNvbnN0IG5vdGVzQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydjb250YWluZXInXSk7XG4gIGNvbnN0IG5vdGVzSGVhZGVyID0gY3JlYXRlRWxlbWVudCgnaDYnKTtcbiAgY29uc3Qgbm90ZXNSb3cgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3JvdycsICdnLTInXSk7XG4gIGNvbnN0IG5vdGVzTGlzdCA9IGNyZWF0ZUVsZW1lbnQoJ3VsJywgWydsaXN0LXVuc3R5bGVkJ10pO1xuXG4gIGNvbnN0IGFkZE5vdGVSb3cgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ3JvdycsICdwdC0yJywgJ2p1c3RpZnktY29udGVudC1lbmQnXSk7XG5cbiAgY29uc3QgYWRkTm90ZURpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29sLWF1dG8nLCAnc21hbGwnLCAndGV4dC1kYW5nZXInLCAndGV4dC13YXJuaW5nLWVtcGhhc2lzJ10pO1xuICBjb25zdCBhZGROb3RlTGluayA9IGNyZWF0ZUVsZW1lbnQoJ2EnLCBbXSwgeyBpZDogJ2FkZE5vdGUnIH0pO1xuICBjb25zdCBhZGROb3RlSWNvbiA9IGNyZWF0ZUVsZW1lbnQoJ2knLCBbJ2JpJywgJ2JpLXBsdXMtY2lyY2xlJ10pO1xuICBjb25zdCBhZGROb3RlVGV4dCA9IGNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICBjb25zdCByb3c0ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydyb3cnLCAnZy0yJywgJ3B0LTMnLCAnanVzdGlmeS1jb250ZW50LXN0YXJ0JywgJ2ZsZXgtcm93LXJldmVyc2UnXSk7XG5cbiAgY29uc3Qgc2F2ZURpdiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnY29sLWF1dG8nXSk7XG4gIGNvbnN0IHNhdmVCdG4gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2J0bicsICdidG4td2FybmluZyddLCB7XG4gICAgJ2RhdGEtYnMtZGlzbWlzcyc6ICdtb2RhbCcsXG4gIH0pO1xuICBjb25zdCBjYW5jZWxEaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2NvbC1hdXRvJ10pO1xuICBjb25zdCBjYW5jZWxCdG4gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2J0bicsICdidG4tc2Vjb25kYXJ5JywgJ3RleHQtbGlnaHQnXSwge1xuICAgICdkYXRhLWJzLWRpc21pc3MnOiAnbW9kYWwnLFxuICB9KTtcblxuICAvLyBhcHBlbmQgZWxlbWVudHNcblxuICAvLyByb3cgMSAodGl0bGUpXG4gIGlmICh0aXRsZSAmJiAodHlwZW9mIHRpdGxlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdGl0bGUudmFsdWUgIT09ICd1bmRlZmluZWQnKSkge1xuICAgIHRpdGxlSW5wdXQudmFsdWUgPSB0eXBlb2YgdGl0bGUgPT09ICdzdHJpbmcnID8gdGl0bGUgOiB0aXRsZS52YWx1ZTtcbiAgfVxuICB0aXRsZURpdi5hcHBlbmRDaGlsZCh0aXRsZUlucHV0KTtcblxuICByb3cxLmFwcGVuZENoaWxkKHRpdGxlRGl2KTtcblxuICAvLyByb3cgMiAoZGF0ZSwgcHJpb3JpdHksIHByb2plY3QpXG5cbiAgLy8gZGF0ZVxuICBpZiAoZHVlRGF0ZSAhPT0gdW5kZWZpbmVkICYmIGR1ZURhdGUgIT09IDApIHtcbiAgICBkYXRlSW5wdXQudmFsdWUgPSBkdWVEYXRlO1xuICB9XG4gIGRhdGVwaWNrZXJUb2dnbGUuYXBwZW5kQ2hpbGQoZGF0ZUljb24pO1xuICBkYXRlRGl2LmFwcGVuZChkYXRlSW5wdXQsIGRhdGVwaWNrZXJUb2dnbGUpO1xuXG4gIC8vIHByaW9yaXR5XG4gIHByaW9yaXR5RGl2LmFwcGVuZENoaWxkKHByaW9yaXR5U2VsZWN0KTtcblxuICAvLyBwcm9qZWN0XG4gIC8vIGNvbnNvbGUubG9nKHByb2plY3QpO1xuICBpZiAodHlwZW9mIHByb2plY3QgIT09ICd1bmRlZmluZWQnICYmIHByb2plY3QgIT09IDApIHByb2plY3RJbnB1dC52YWx1ZSA9IHByb2plY3Q7XG4gIHByb2plY3REaXYuYXBwZW5kKHByb2plY3RJbnB1dCwgcHJvamVjdERhdGFsaXN0KTtcblxuICByb3cyLmFwcGVuZChkYXRlRGl2LCBwcmlvcml0eURpdiwgcHJvamVjdERpdik7XG5cbiAgLy8gcm93MyAobm90ZXMgYXJlYSlcbiAgbm90ZXNIZWFkZXIudGV4dENvbnRlbnQgPSAnTm90YXMnO1xuICBhZGROb3RlVGV4dC50ZXh0Q29udGVudCA9ICdOb3ZhIG5vdGEnO1xuICBhZGROb3RlSWNvbi50ZXh0Q29udGVudCA9ICcgJzsgLy8gZml4aW5nIGEgcHJvYmxlbSBmb3IgdXNpbmcganNcblxuICBhZGROb3RlTGluay5hcHBlbmQoYWRkTm90ZUljb24sIGFkZE5vdGVUZXh0KTtcbiAgYWRkTm90ZURpdi5hcHBlbmRDaGlsZChhZGROb3RlTGluayk7XG4gIGFkZE5vdGVSb3cuYXBwZW5kQ2hpbGQoYWRkTm90ZURpdik7XG4gIGlmIChub3Rlcykge1xuICAgIG5vdGVzLmZvckVhY2goKG5vdGUsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBsaXN0SXRlbSA9IGNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICBjb25zdCBkZWxldGVMaW5rID0gY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgY29uc3QgZGVsZXRlSWNvbiA9IGNyZWF0ZUVsZW1lbnQoJ2knLCBbJ2JpJywgJ2JpLXRyYXNoMyddKTtcbiAgICAgIGNvbnN0IHRleHQgPSBjcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICAgIGRlbGV0ZUxpbmsuYXBwZW5kQ2hpbGQoZGVsZXRlSWNvbik7XG4gICAgICBkZWxldGVMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBkZWxldGVOb3RlKGlkLCBpbmRleCk7XG4gICAgICB9KTtcblxuICAgICAgdGV4dC50ZXh0Q29udGVudCA9IG5vdGU7XG4gICAgICBsaXN0SXRlbS5hcHBlbmQoZGVsZXRlTGluaywgdGV4dCk7XG4gICAgICBub3Rlc0xpc3QuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuICAgIH0pO1xuICB9XG4gIG5vdGVzUm93LmFwcGVuZChub3Rlc0xpc3QsIGFkZE5vdGVSb3cpO1xuICBub3Rlc0NvbnRhaW5lci5hcHBlbmQobm90ZXNIZWFkZXIsIG5vdGVzUm93KTtcblxuICByb3czLmFwcGVuZENoaWxkKG5vdGVzQ29udGFpbmVyKTtcblxuICAvLyByb3c0IChidXR0b25zKVxuICBjYW5jZWxCdG4udGV4dENvbnRlbnQgPSAnQ2FuY2VsJztcbiAgc2F2ZUJ0bi50ZXh0Q29udGVudCA9ICdTYXZlJztcbiAgaWYgKGlkICE9PSB1bmRlZmluZWQpIHNhdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzYXZlKHRpdGxlSW5wdXQsIGRhdGVJbnB1dCwgcHJpb3JpdHlTZWxlY3QsIHByb2plY3RJbnB1dCwgbm90ZXMsIGlkKSk7XG4gIGVsc2Ugc2F2ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNhdmUodGl0bGVJbnB1dCwgZGF0ZUlucHV0LCBwcmlvcml0eVNlbGVjdCwgcHJvamVjdElucHV0KSk7XG4gIHNhdmVEaXYuYXBwZW5kQ2hpbGQoc2F2ZUJ0bik7XG4gIGNhbmNlbERpdi5hcHBlbmRDaGlsZChjYW5jZWxCdG4pO1xuXG4gIHJvdzQuYXBwZW5kKHNhdmVEaXYsIGNhbmNlbERpdik7XG5cbiAgbW9kYWwuYXBwZW5kKHJvdzEsIHJvdzIsIHJvdzMsIHJvdzQpO1xuICBkdWVEYXRlTWFzaygpO1xuICBzZWFyY2hQcm9qZWN0cygpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB1aUVkaXRJdGVtO1xuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWN5Y2xlICovXG5pbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcbmltcG9ydCB1aUVkaXRJdGVtIGZyb20gJy4vZWRpdENvbnN0cnVjdG9yJztcbmltcG9ydCB1aUNvbnRyb2wgZnJvbSAnLi91aUNvbnRyb2xsZXInO1xuXG4vLyBob21lIGJ1dHRvbnNcbmV4cG9ydCBmdW5jdGlvbiBlZGl0TW9yZSh0aXRsZSkge1xuICB1aUVkaXRJdGVtKHRpdGxlKTtcbiAgdGl0bGUudmFsdWUgPSAnJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZhc3RTYXZlKHRpdGxlKSB7XG4gIGNvbnN0IG5ld09iaiA9IHsgdGl0bGU6IHRpdGxlLnZhbHVlIH07XG4gIHRvZG9MaXN0LmFkZEl0ZW0obmV3T2JqKTtcbiAgdGl0bGUudmFsdWUgPSAnJztcbiAgdWlDb250cm9sLnVwZGF0ZSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWRpdChlbGVtKSB7XG4gIGVsZW0uc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gIGNvbnN0IHsgdGFyZ2V0IH0gPSBlbGVtO1xuICBjb25zdCBvYmogPSB0b2RvTGlzdC5nZXRJdGVtKHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSk7XG4gIHVpRWRpdEl0ZW0oXG4gICAgb2JqLnRpdGxlLFxuICAgIG9iai5kdWVEYXRlLFxuICAgIG9iai5wcmlvcml0eSxcbiAgICBvYmoucHJvamVjdCxcbiAgICBvYmoubm90ZXMsXG4gICAgb2JqLmlkLFxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlSXRlbShpdGVtKSB7XG4gIGNvbnN0IHsgdGFyZ2V0IH0gPSBpdGVtO1xuICB0b2RvTGlzdC5kZWxldGVJdGVtKHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSk7XG4gIHVpQ29udHJvbC51cGRhdGUoKTtcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1jeWNsZSAqL1xuaW1wb3J0IHRvZG9MaXN0IGZyb20gJy4vY29yZSc7XG5pbXBvcnQgeyBkZWxldGVJdGVtLCBlZGl0IH0gZnJvbSAnLi9oYW5kbGVycyc7XG5pbXBvcnQge1xuICBjcmVhdGVFbGVtZW50LCBoYXNOb3RlcywgbGlzdCxcbn0gZnJvbSAnLi91aUNvbW1vbkZ1bmN0aW9ucyc7XG5cbmNvbnN0IGlzQ2hlY2tlZCA9IChlKSA9PiBlLmNoZWNrZWQgPT09IHRydWU7XG5cbmZ1bmN0aW9uIGluc2VydE5vdGUobm90ZXMsIGJvZHkpIHtcbiAgbm90ZXMuZm9yRWFjaCgoY29udGVudCkgPT4ge1xuICAgIGNvbnN0IGNvbnRlbnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250ZW50RGl2LmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgYm9keS5hcHBlbmRDaGlsZChjb250ZW50RGl2KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZENoZWNrZWQoY2hlY2tib3gsIGJ1dHRvbiwgcHJpb3JpdHkpIHtcbiAgY2hlY2tib3guY2hlY2tlZCA9IHRydWU7XG4gIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCd0ZXh0LWRlY29yYXRpb24tbGluZS10aHJvdWdoJywgJ29wYWNpdHktNTAnKTtcbiAgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgnb3BhY2l0eS01MCcpO1xufVxuXG5mdW5jdGlvbiBzZXRDaGVja2VkSGFuZGxlcihlKSB7XG4gIGNvbnN0IHsgdGFyZ2V0IH0gPSBlO1xuICBjb25zdCBpZCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcbiAgdG9kb0xpc3Quc2V0Q2hlY2tlZChpZCk7XG59XG5cbmNvbnN0IHByaW9yaXR5U2V0dGluZ3MgPSB7XG4gIDA6IHsgdGl0bGU6ICdObyBwcmlvcml0eScsIGFycmF5OiBbJ2JpLW9jdGFnb24nXSB9LFxuICAxOiB7IHRpdGxlOiAnUHJpb3JpdHkgMScsIGFycmF5OiBbJ2JpLWV4Y2xhbWF0aW9uLW9jdGFnb24tZmlsbCcsICd0ZXh0LXN1Y2Nlc3MnXSB9LFxuICAyOiB7IHRpdGxlOiAnUHJpb3JpdHkgMicsIGFycmF5OiBbJ2JpLWV4Y2xhbWF0aW9uLW9jdGFnb24tZmlsbCcsICd0ZXh0LXdhcm5pbmcnXSB9LFxuICAzOiB7IHRpdGxlOiAnUHJpb3JpdHkgMycsIGFycmF5OiBbJ2JpLWV4Y2xhbWF0aW9uLW9jdGFnb24tZmlsbCcsICd0ZXh0LWRhbmdlciddIH0sXG59O1xuXG5mdW5jdGlvbiBzZWxlY3RQcmlvcml0eShudW0pIHtcbiAgY29uc3Qgb2JqID0gcHJpb3JpdHlTZXR0aW5nc1tudW1dO1xuICBjb25zdCBzdGFuZGFyZENsYXNzZXMgPSBbJ3NtYWxsJywgJ21zLTInLCAnYmknXTtcbiAgY29uc3QgY2xhc3NlcyA9IHN0YW5kYXJkQ2xhc3Nlcy5jb25jYXQob2JqLmFycmF5KTtcbiAgY29uc3QgYXR0cnMgPSB7ICdkYXRhLXRvZ2dsZSc6ICd0b29sdGlwJywgJ2RhdGEtcGxhY2VtZW50JzogJ3RvcCcgfTtcbiAgYXR0cnMudGl0bGUgPSBvYmoudGl0bGU7XG5cbiAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoJ2knLCBjbGFzc2VzLCBhdHRycyk7XG59XG5cbmZ1bmN0aW9uIGFkZExpbmUob2JqKSB7XG4gIC8vIGhlYWRlclxuICBjb25zdCBpdGVtID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydhY2NvcmRpb24taXRlbSddKTtcbiAgY29uc3QgaGVhZGVyID0gY3JlYXRlRWxlbWVudCgnZGl2JywgWydhY2NvcmRpb24taGVhZGVyJywgJ3AtMScsICdkLWZsZXgnLCAnYWxpZ24taXRlbXMtY2VudGVyJywgJ2dhcC0xJ10pO1xuICBjb25zdCBjaGVja2JveCA9IGNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgWydmb3JtLWNoZWNrLWlucHV0JywgJ3RleHQtYmctd2FybmluZyddLCB7XG4gICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICAnZGF0YS1pZCc6IGAke29iai5pZH1gLFxuICB9KTtcbiAgY29uc3QgYnRuSGVhZGVyID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgWydhY2NvcmRpb24tYnV0dG9uJywgJ2NvbGxhcHNlZCcsICdmbGV4LWZpbGwnXSwge1xuICAgIHR5cGU6ICdidXR0b24nLFxuICAgICdkYXRhLWJzLXRvZ2dsZSc6ICdjb2xsYXBzZScsXG4gICAgJ2FyaWEtZXhwYW5kZWQnOiAnZmFsc2UnLFxuICAgICdkYXRhLWJzLXRhcmdldCc6IGAjaXRlbS0ke29iai5pZH1gLFxuICB9KTtcbiAgY29uc3QgcHJpb3JpdHkgPSBzZWxlY3RQcmlvcml0eShvYmoucHJpb3JpdHksIDEwKTtcbiAgY29uc3Qgc3BhbiA9IGNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCBbJ2ZsZXgtZmlsbCddKTtcbiAgY29uc3QgY29kZSA9IGNyZWF0ZUVsZW1lbnQoJ2NvZGUnLCBbJ3NtYWxsJywgJ3RleHQtbXV0ZWQnXSk7XG5cbiAgLy8gYm9keVxuICBjb25zdCBpdGVtRGV0YWlscyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnYWNjb3JkaW9uLWNvbGxhcHNlJywgJ2NvbGxhcHNlJ10sIHtcbiAgICBpZDogYGl0ZW0tJHtvYmouaWR9YCxcbiAgICAnZGF0YS1icy1wYXJlbnQnOiAnI2xpc3QnLFxuICB9KTtcbiAgY29uc3QgaXRlbUJvZHkgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBbJ2FjY29yZGlvbi1ib2R5J10pO1xuICBjb25zdCBlZGl0RGVsZXRlSXRlbSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFsnZC1mbGV4JywgJ2ZsZXgtcm93LXJldmVyc2UnLCAnY29sJywgJ2dhcC0yJ10pO1xuXG4gIGNvbnN0IGJ0bkVkaXQgPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2J0bicsICdidG4td2FybmluZyddLCB7XG4gICAgJ2RhdGEtaWQnOiBvYmouaWQsXG4gICAgJ2RhdGEtYnMtdGFyZ2V0JzogJyNleGFtcGxlTW9kYWwnLFxuICAgICdkYXRhLWJzLXRvZ2dsZSc6ICdtb2RhbCcsXG4gIH0pO1xuICBjb25zdCBidG5EZWxldGUgPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCBbJ2J0bicsICdidG4tZGFuZ2VyJ10sIHtcbiAgICAnZGF0YS1pZCc6IG9iai5pZCxcbiAgfSk7XG5cbiAgLy8gRVZFTlRMSVNUTkVSUyBPQkpFQ1RTXG4gIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHNldENoZWNrZWRIYW5kbGVyKTtcblxuICAvLyBGSUxMSU5HIENPTlRFTlRcbiAgLy8gaGVhZGVyXG4gIHNwYW4udGV4dENvbnRlbnQgPSBvYmoudGl0bGU7XG4gIGNvZGUudGV4dENvbnRlbnQgPSBvYmoucHJvamVjdDtcblxuICAvLyBib2R5XG4gIGJ0bkVkaXQudGV4dENvbnRlbnQgPSAnRWRpdCc7XG4gIGJ0bkRlbGV0ZS50ZXh0Q29udGVudCA9ICdEZWxldGUnO1xuXG4gIC8vIEFwcGVuZGluZyBjb250ZW50XG4gIGJ0bkhlYWRlci5hcHBlbmQoc3BhbiwgY29kZSk7XG4gIGhlYWRlci5hcHBlbmQoY2hlY2tib3gsIHByaW9yaXR5LCBidG5IZWFkZXIpO1xuXG4gIC8vIEJvZHkgY29udGVudFxuICBpZiAoaGFzTm90ZXMob2JqLm5vdGVzKSkge1xuICAgIGluc2VydE5vdGUob2JqLm5vdGVzLCBpdGVtQm9keSk7XG4gIH1cbiAgYnRuRWRpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlbGVtKSA9PiB7XG4gICAgZWRpdChlbGVtKTtcbiAgfSk7XG4gIGJ0bkRlbGV0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRlbGV0ZUl0ZW0pO1xuICBlZGl0RGVsZXRlSXRlbS5hcHBlbmQoYnRuRGVsZXRlLCBidG5FZGl0KTtcbiAgaXRlbUJvZHkuYXBwZW5kQ2hpbGQoZWRpdERlbGV0ZUl0ZW0pO1xuICBpdGVtRGV0YWlscy5hcHBlbmRDaGlsZChpdGVtQm9keSk7XG5cbiAgLy8gQXBwZW5kIGVsZW1lbnRzIHRvIGxpc3RcbiAgaXRlbS5hcHBlbmQoaGVhZGVyLCBpdGVtRGV0YWlscyk7XG4gIGxpc3QuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gIGlmIChpc0NoZWNrZWQob2JqKSkgYWRkQ2hlY2tlZChjaGVja2JveCwgYnRuSGVhZGVyLCBwcmlvcml0eSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFkZExpbmU7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tY3ljbGUgKi9cbmltcG9ydCB0b2RvTGlzdCBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgZGlzcGxheVByb2plY3QsIHNldEZpbHRlckxpc3QgfSBmcm9tICcuL3VpQ29tbW9uRnVuY3Rpb25zJztcbmltcG9ydCB1aUNvbnRyb2wgZnJvbSAnLi91aUNvbnRyb2xsZXInO1xuXG5mdW5jdGlvbiBjb25zdHJ1Y3RvclByb2plY3RMaXN0KCkge1xuICBjb25zdCBmaWx0ZXJlZFByb2plY3RzID0gc2V0RmlsdGVyTGlzdCh0b2RvTGlzdC5nZXRQcm9qZWN0cygpKTtcbiAgaWYgKGZpbHRlcmVkUHJvamVjdHMubGVuZ3RoICE9PSAwKSB7XG4gICAgZmlsdGVyZWRQcm9qZWN0cy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgY29uc3QgbGlzdEl0ZW0gPSBjcmVhdGVFbGVtZW50KCdsaScsIFsnZC1mbGV4JywgJ2FsaWduLWl0ZW1zLWNlbnRlciddKTtcbiAgICAgIGNvbnN0IGljb25JdGVtID0gY3JlYXRlRWxlbWVudCgnaScsIFsnYmknLCAnYmktaGFzaCcsICdmcy00J10pO1xuICAgICAgY29uc3QgbGluayA9IGNyZWF0ZUVsZW1lbnQoJ2EnLCBbXSwgeyAnZGF0YS12YWx1ZSc6IHZhbHVlIH0pO1xuXG4gICAgICBsaW5rLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdWlDb250cm9sLnVwZGF0ZSgncHJvamVjdCcsIGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJykpKTtcblxuICAgICAgbGlzdEl0ZW0uYXBwZW5kKGljb25JdGVtLCBsaW5rKTtcblxuICAgICAgZGlzcGxheVByb2plY3QuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuICAgIH0pO1xuICB9IGVsc2UgZGlzcGxheVByb2plY3QuaW5uZXJIVE1MID0gJzxsaSBjbGFzcz1cImQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXJcIj5ObyBwcm9qZWN0cyB5ZXQgOig8L2xpPic7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnN0cnVjdG9yUHJvamVjdExpc3Q7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xuaW1wb3J0IHsgcmVzdG9yZVN0b3JhZ2UgfSBmcm9tICcuL0pTT05GdW5jdGlvbnMnO1xuXG5pbXBvcnQge1xuICBjbGVhckNvbnRlbnQsXG4gIHNob3dQbHVzQnRuLFxuICBhZGRGaWVsZCxcbiAgYWRkVGFzayxcbiAgaW5wdXQsXG4gIGFkZE1vcmUsXG4gIHF1aWNrU2F2ZSxcbiAgbGlzdCxcbiAgbWFpbk1vZGFsLFxufSBmcm9tICcuL3VpQ29tbW9uRnVuY3Rpb25zJztcbmltcG9ydCB1aUVkaXRJdGVtIGZyb20gJy4vZWRpdENvbnN0cnVjdG9yJztcbmltcG9ydCB1aUNvbnRyb2wgZnJvbSAnLi91aUNvbnRyb2xsZXInO1xuaW1wb3J0IHRvZG9MaXN0IGZyb20gJy4vY29yZSc7XG5cbmNvbnN0IGhvbWVMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYSNob21lJyk7XG5jb25zdCBwcm9qZWN0c0ljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYjcHJvamVjdHMnKTtcbmNvbnN0IHByb2plY3RzRHJvcGRvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYjcHJvamVjdHMgZGl2Jyk7XG5cbi8vIHNldCBtYXggaGVpZ2h0IGZvciBsaXN0IGl0ZW1zXG5mdW5jdGlvbiBzZXRNYXhIZWlnaHQoKSB7XG4gIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkge1xuICAgIC8vIGdldCBwYWRkaW5nIHRvcCArIGJvdHRvbSBmb3JtIG1haW4gZWxlbWVudFxuICAgIGxldCBtYWluUGFkZGluZyA9IHBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKCdtYWluJyksIG51bGwpXG4gICAgICAuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy10b3AnKS5tYXRjaCgvXFxkKyhcXC5cXGQrKT8vKSk7XG5cbiAgICBtYWluUGFkZGluZyArPSBwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcignbWFpbicpLCBudWxsKVxuICAgICAgLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctYm90dG9tJykubWF0Y2goL1xcZCsoXFwuXFxkKyk/LykpO1xuXG4gICAgLy8gZ2V0IG90aGVyIGVsZW1lbnRzIHNpemVcbiAgICBjb25zdCBib2R5SGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLm9mZnNldEhlaWdodDtcbiAgICBjb25zdCBpbnNldEl0ZW1IZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluID4gZGl2Jykub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IGhlYWRlckhlaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpLm9mZnNldEhlaWdodDtcbiAgICBjb25zdCBhc2lkZUhlaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FzaWRlJykub2Zmc2V0SGVpZ2h0O1xuICAgIC8vIGNvbnN0IGZvb3RlckhlaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvb3RlcicpLm9mZnNldEhlaWdodDtcblxuICAgIC8vIHNldCBtYXggc2l6ZSBmb3IgdGFzayBsaXN0XG4gICAgY29uc3QgbWF4SGVpZ2h0ID0gYm9keUhlaWdodFxuICAgICAgLSBoZWFkZXJIZWlnaHQgLSBpbnNldEl0ZW1IZWlnaHQgLSBhc2lkZUhlaWdodCAtIG1haW5QYWRkaW5nO1xuICAgIGxpc3Quc3R5bGUubWF4SGVpZ2h0ID0gYCR7bWF4SGVpZ2h0fXB4YDtcbiAgfSBlbHNlIGxpc3Quc3R5bGUubWF4SGVpZ2h0ID0gJ25vbmUnO1xufVxuXG4vLyBldmVudExpc3RlbmVyc1xuLy8gaG9tZSBwYWdlIGJ1dHRvbiBmdW5jdGlvbnNcbmhvbWVMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICB1aUNvbnRyb2wudXBkYXRlKCdjbGVhcicpO1xufSk7XG5hZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdWlFZGl0SXRlbSk7XG5hZGRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgc2hvd1BsdXNCdG4pO1xuYWRkRmllbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBzaG93UGx1c0J0bik7XG5hZGRNb3JlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdWlDb250cm9sLmhhbmRsZXJzLmVkaXRNb3JlKGlucHV0KSk7XG5xdWlja1NhdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB1aUNvbnRyb2wuaGFuZGxlcnMuZmFzdFNhdmUoaW5wdXQpKTtcbi8vIHNldCBoZWlnaHQgbGltaXQgZm9yIGxpc3QgaXRlbXNcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgc2V0TWF4SGVpZ2h0KTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzZXRNYXhIZWlnaHQpO1xuXG4vLyBhdXRvLXNhdmVcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gIHVpQ29udHJvbC51cGRhdGUoKTtcbiAgc2hvd1BsdXNCdG4oKTtcbn0pO1xuXG4vLyByZXN0b3JlIGRhdGEgd2hlbiBpdCdzIGxvYWRlZFxud2luZG93Lm9ubG9hZCA9IHJlc3RvcmVTdG9yYWdlKCk7XG5cbi8vIG1lbnUgZm9yIG1vYmlsZSB2ZXJzaW9uXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICBpZiAoIWV2ZW50LnRhcmdldC5jbG9zZXN0KCcjcHJvamVjdHMnKSkge1xuICAgIHByb2plY3RzRHJvcGRvd24uY2xhc3NMaXN0LmFkZCgnbWVudS1oaWRlJyk7XG4gIH1cbn0pO1xucHJvamVjdHNJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBpZiAocHJvamVjdHNEcm9wZG93bi5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtaGlkZScpKSB7XG4gICAgcHJvamVjdHNEcm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKCdtZW51LWhpZGUnKTtcbiAgfSBlbHNlIHtcbiAgICBwcm9qZWN0c0Ryb3Bkb3duLmNsYXNzTGlzdC5hZGQoJ21lbnUtaGlkZScpO1xuICB9XG59KTtcblxuLy8gY2xlYXIgbW9kYWwgY29udGVudCBldmVyeXRpbWUgaXQncyBjbG9zZWRcbm1haW5Nb2RhbC5hZGRFdmVudExpc3RlbmVyKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB7XG4gIGNsZWFyQ29udGVudChtYWluTW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWJvZHknKSk7XG59KTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGNvbnN0IHRvb2x0aXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpO1xuICB0b29sdGlwcy5mb3JFYWNoKCh0aXApID0+IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWYsIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgdGlwID0gbmV3IGJvb3RzdHJhcC5Ub29sdGlwKHRpcCk7XG4gIH0pO1xufSwgZmFsc2UpO1xuXG4vLyBzdGFydCBhcHBcbnVpQ29udHJvbC5sb2FkKCk7XG5cbihmdW5jdGlvbiBzdGFydERlbW8oKSB7XG4gIGlmICh0b2RvTGlzdC5nZXRMZW5ndGgoKSAhPT0gMCkgcmV0dXJuO1xuICB0b2RvTGlzdC5hZGRJdGVtKHsgdGl0bGU6ICdDbGVhbiB0aGUgaG91c2UnLCBwcmlvcml0eTogMSwgcHJvamVjdDogJ0hvdXNlJyB9KTtcbiAgdG9kb0xpc3QuYWRkSXRlbSh7IHRpdGxlOiAnU3VwZXJtYXJrZXQnLCBwcmlvcml0eTogMywgcHJvamVjdDogJ1Nob3BwaW5nJyB9KTtcbiAgdG9kb0xpc3QuYWRkSXRlbSh7IHRpdGxlOiAnRnJlZSBNYXJrZXQnLCBwcm9qZWN0OiAnU2hvcHBpbmcnIH0pO1xuICB0b2RvTGlzdC5hZGRJdGVtKHsgdGl0bGU6ICdQQyBNYWludGVuYW5jZScsIHByaW9yaXR5OiAyLCBwcm9qZWN0OiAnV29yaycgfSk7XG4gIHRvZG9MaXN0LmFkZE5vdGUoMiwgJ0JhbmFuYScpO1xuICB0b2RvTGlzdC5hZGROb3RlKDIsICdHcmVlbiBvbmlvbnMnKTtcbiAgdG9kb0xpc3QuYWRkTm90ZSgyLCAnUmFkaXNoJyk7XG4gIHRvZG9MaXN0LmFkZE5vdGUoMiwgJ1Bhc3RlbCBmb3IgbHVuY2ggOiknKTtcbiAgdWlDb250cm9sLnVwZGF0ZSgpO1xufSgpKTtcbiIsImltcG9ydCBmbGF0cGlja3IgZnJvbSAnZmxhdHBpY2tyJztcbmltcG9ydCB7IFBvcnR1Z3Vlc2UgfSBmcm9tICdmbGF0cGlja3IvZGlzdC9sMTBuL3B0JztcbmltcG9ydCBJTWFzayBmcm9tICdpbWFzayc7XG5pbXBvcnQgeyBtYXNrRGF0ZSB9IGZyb20gJy4vZGF0ZSc7XG5pbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcblxuZXhwb3J0IGNvbnN0IGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYjbGlzdCcpO1xuZXhwb3J0IGNvbnN0IGFkZEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQjaXRlbVRpdGxlJyk7XG5leHBvcnQgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuZXhwb3J0IGNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhI2FkZEl0ZW0nKTtcbmV4cG9ydCBjb25zdCBhZGRNb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uI2FkZE1vcmUnKTtcbmV4cG9ydCBjb25zdCBxdWlja1NhdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24jc2F2ZUl0ZW0nKTtcbmV4cG9ydCBjb25zdCBkaXNwbGF5UHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsI3Byb2plY3RzJyk7XG5leHBvcnQgY29uc3QgbWFpbk1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2I2V4YW1wbGVNb2RhbCcpO1xuXG5leHBvcnQgY29uc3Qgc2V0RmlsdGVyTGlzdCA9IChlbGVtKSA9PiBlbGVtLmZpbHRlcigodmFsdWUsIGluZGV4LCBzZWxmKSA9PiB2YWx1ZSAhPT0gJycgJiYgc2VsZi5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXgpO1xuZXhwb3J0IGNvbnN0IGhhc05vdGVzID0gKG9iaikgPT4gb2JqLmxlbmd0aCA+IDA7XG5leHBvcnQgY29uc3QgbG9hZExpc3QgPSAoKSA9PiBbLi4udG9kb0xpc3QuYWxsVGFza3NMaXN0KCldO1xuZXhwb3J0IGNvbnN0IHNvcnRQYXJhbSA9IChhcnIsIHBhcmFtKSA9PiBbLi4uYXJyXVxuICAuc29ydCgoYSwgYikgPT4gKChhW3BhcmFtXSA8IGJbcGFyYW1dKSA/IC0xIDogMSkpO1xuXG5jb25zdCBzcGVjaWFsQ2hhcnNFbnRyaWVzID0gW1xuICBbJ8OAw4HDgsODw4TDhScsICdBJ10sXG4gIFsnw6DDocOiw6PDpMOlJywgJ2EnXSxcbiAgWyfDiMOJw4rDiycsICdFJ10sXG4gIFsnw6jDqcOqw6snLCAnZSddLFxuICBbJ8OMw43DjsOPJywgJ0knXSxcbiAgWyfDrMOtw67DrycsICdpJ10sXG4gIFsnw5LDk8OVw5TDlicsICdPJ10sXG4gIFsnw7LDs8O1w7TDticsICdvJ10sXG4gIFsnw5nDmsObw5wnLCAnVSddLFxuICBbJ8O5w7rDu8O8JywgJ3UnXSxcbiAgWyfDhycsICdDJ10sXG4gIFsnw6cnLCAnYyddLFxuXTtcblxuY29uc3Qgc3BlY2lhbENoYXJzTWFwID0gT2JqZWN0LmZyb21FbnRyaWVzKFxuICBzcGVjaWFsQ2hhcnNFbnRyaWVzLmZsYXRNYXAoKFtjaGFycywgdmFsdWVdKSA9PiBbLi4uY2hhcnNdLm1hcCgoY2hhcikgPT4gW2NoYXIsIHZhbHVlXSkpLFxuKTtcblxuLy8gRUxFTUVOVCBDUkVBVE9SU1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0QXR0cnMoZWxlbSwgYXR0cnMpIHtcbiAgT2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGlmIChrZXkgIT09IHVuZGVmaW5lZCAmJiBhdHRyc1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGtleSwgJycpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZywgY2xhc3NOYW1lcyA9IFtdLCBhdHRyaWJ1dGVzID0ge30pIHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgaWYgKGNsYXNzTmFtZXMubGVuZ3RoKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoLi4uY2xhc3NOYW1lcyk7XG4gIHNldEF0dHJzKGVsZW1lbnQsIGF0dHJpYnV0ZXMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU9wdGlvbih2YWx1ZSwgdGV4dCwgc2VsZWN0ZWQpIHtcbiAgY29uc3Qgb3B0aW9uID0gY3JlYXRlRWxlbWVudCgnb3B0aW9uJywgW10sIHsgdmFsdWUgfSk7XG4gIG9wdGlvbi50ZXh0Q29udGVudCA9IHRleHQ7XG4gIGlmIChzZWxlY3RlZCkge1xuICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJycpO1xuICB9XG4gIHJldHVybiBvcHRpb247XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcmlvcml0eVNlbGVjdChudW0gPSAwKSB7XG4gIGNvbnN0IHNlbGVjdCA9IGNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcsIFsnZm9ybS1zZWxlY3QnXSwge1xuICAgICdhcmlhLWxhYmVsJzogJ1ByaW9yaXR5JyxcbiAgfSk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSArPSAxKSB7XG4gICAgY29uc3QgdGV4dCA9IGkgPT09IDAgPyAnLS0gU2VsZWN0IFByaW9yaXR5JyA6IGBQcmlvcml0eSAke2l9YDtcbiAgICBjb25zdCBzZWxlY3RlZCA9IGkgPT09IHBhcnNlSW50KG51bSwgMTApO1xuICAgIGNvbnN0IG9wdGlvbiA9IGNyZWF0ZU9wdGlvbihpLCB0ZXh0LCBzZWxlY3RlZCk7XG4gICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gIH1cbiAgcmV0dXJuIHNlbGVjdDtcbn1cblxuLy8gVUkgRlVOQ1RJT05TXG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckNvbnRlbnQoZWxlbSkge1xuICB3aGlsZSAoZWxlbS5maXJzdENoaWxkKSB7XG4gICAgZWxlbS5yZW1vdmVDaGlsZChlbGVtLmxhc3RDaGlsZCk7XG4gIH1cbn1cblxuLy8gQUREL0VESVQgTkVXIFRBU0sgU0NSRUVOIEZVTkNUSU9OU1xuXG5mdW5jdGlvbiByZW1vdmVTcGVjaWFscyh0ZXh0KSB7XG4gIGxldCBzZWFyY2ggPSB0ZXh0O1xuICBzZWFyY2ggPSBzZWFyY2gucmVwbGFjZShcbiAgICAvW8OALcOcw6Atw7xdL2csXG4gICAgKG1hdGNoKSA9PiBzcGVjaWFsQ2hhcnNNYXBbbWF0Y2hdIHx8IG1hdGNoLFxuICApO1xuICByZXR1cm4gc2VhcmNoO1xufVxuLy8gcHJvamVjdHMgZGF0YWxpc3QgYXV0b2NvbXBsZXRlXG5jb25zdCBhdXRvQ29tcGxldGUgPSAoc2VhcmNoKSA9PiB0b2RvTGlzdC5nZXRQcm9qZWN0cygpLmZpbHRlcigodmFsdWUpID0+IHtcbiAgY29uc3QgdmFsdWVMb3dlcmNhc2UgPSByZW1vdmVTcGVjaWFscyh2YWx1ZS50b0xvd2VyQ2FzZSgpKTtcbiAgY29uc3Qgc2VhcmNoTG93ZXJjYXNlID0gcmVtb3ZlU3BlY2lhbHMoc2VhcmNoLnRvTG93ZXJDYXNlKCkpO1xuICByZXR1cm4gdmFsdWVMb3dlcmNhc2UuaW5jbHVkZXMoc2VhcmNoTG93ZXJjYXNlKTtcbn0pO1xuXG4vLyBjYWxsaW5nIGZ1bmN0aW9ucyB0byBhdXRvY29tcGxldGUgUHJvamVjdCBmaWVsZFxuXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoUHJvamVjdHMoKSB7XG4gIGNvbnN0IGlucHV0UHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbnRlclByb2plY3QnKTtcbiAgY29uc3QgZGF0YWxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkYXRhbGlzdCcpO1xuICBpbnB1dFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoeyB0YXJnZXQgfSkgPT4ge1xuICAgIGNvbnN0IGlucHV0RGF0YSA9IHRhcmdldC52YWx1ZTtcbiAgICBpZiAoaW5wdXREYXRhLmxlbmd0aCkge1xuICAgICAgY29uc3QgYXV0b0NvbXBsZXRlT3B0aW9ucyA9IGF1dG9Db21wbGV0ZShpbnB1dERhdGEpO1xuICAgICAgZGF0YWxpc3QuaW5uZXJIVE1MID0gYCR7YXV0b0NvbXBsZXRlT3B0aW9uc1xuICAgICAgICAubWFwKCh2YWx1ZSkgPT4gYDxvcHRpb24gdmFsdWU9XCIke3ZhbHVlfVwiIC8+YClcbiAgICAgICAgLmpvaW4oJycpfWA7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gREFURVBJQ0tFUiBBTkQgTUFTSyBGVU5DVElPTlNcbmV4cG9ydCBmdW5jdGlvbiBkdWVEYXRlTWFzaygpIHtcbiAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkdWVEYXRlJyk7XG4gIGNvbnN0IGZsYXRFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LmZsYXRwaWNrcicpO1xuXG4gIC8vIGFwcGx5IG1hc2sgdG8gZHVlRGF0ZUZpZWxkXG4gIGNvbnN0IG1hc2sgPSBJTWFzayhkdWVEYXRlLCBtYXNrRGF0ZSk7XG5cbiAgLy8gYXBwbHkgZmxhdHBpY2tyIGRhdGVwaWNrZXIgdG8gYWxsIGVsZW1lbnRzIGluIGEgZGl2XG4gIC8vIChpY29uIHRvZ2dsZSBhbmQgaW5wdXQgZGF0ZSB1c2luZyBkYXRhLSBhdHRyaWJ1dGVzKVxuICBmbGF0cGlja3IoZmxhdEVsZW0sIHtcbiAgICBkYXRlRm9ybWF0OiAnZC9tL1knLFxuICAgIGRpc2FibGVNb2JpbGU6ICd0cnVlJyxcbiAgICBhbGxvd0lucHV0OiB0cnVlLFxuICAgIHdyYXA6IHRydWUsXG4gICAgbG9jYWxlOiBQb3J0dWd1ZXNlLFxuICAgIG9uQ2hhbmdlKHNlbGVjdGVkRGF0ZXMsIGRhdGVTdHIpIHtcbiAgICAgIG1hc2sudXBkYXRlVmFsdWUoZGF0ZVN0cik7XG4gICAgfSxcbiAgfSk7XG59XG5cbi8vIG1haW4gc2NyZWVuIGludGVyYWN0aW9uc1xuXG4vLyBjaGVjayB2aXN1YWwgZWZmZWN0XG5leHBvcnQgZnVuY3Rpb24gc2hvd1BsdXNCdG4oKSB7XG4gIC8vIEVuY29udHJhIG8gYm90w6NvICtcbiAgY29uc3QgcGx1c0J0biA9IGFkZEZpZWxkLm5leHRFbGVtZW50U2libGluZztcbiAgY29uc3Qgc2F2ZUJ0biA9IHBsdXNCdG4ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAvLyBTZSBvIHZhbG9yIGRvIGNhbXBvIHTDrXR1bG8gZm9yIGRpZmVyZW50ZSBkZSB2YXppbyxcbiAgLy8gZW50w6NvIGVsZSByZXZlbGEgbyBib3TDo28gK1xuICBpZiAoYWRkRmllbGQudmFsdWUgIT09ICcnKSB7XG4gICAgcGx1c0J0bi5jbGFzc0xpc3QuYWRkKCdyZXZlYWxJdGVtJyk7XG4gICAgc2F2ZUJ0bi5jbGFzc0xpc3QuYWRkKCdyZXZlYWxJdGVtJyk7XG4gIH1cbiAgLy8gY2FzbyBjb250csOhcmlvLCBzZSB2b2PDqiBhcGFnYXIgdG9kbyBvIHTDrXR1bG9cbiAgLy8gZWxlIGTDoSBkaXNwbGF5OiBub25lLCBubyBib3TDo28gK1xuICBpZiAoYWRkRmllbGQudmFsdWUgPT09ICcnICYmIHBsdXNCdG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdyZXZlYWxJdGVtJykpIHtcbiAgICBwbHVzQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3JldmVhbEl0ZW0nKTtcbiAgICBzYXZlQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3JldmVhbEl0ZW0nKTtcbiAgfVxufVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gZmluZFBhcmVudE5vZGUoZWxlbWVudCwgYXR0cmlidXRlTmFtZSkge1xuLy8gICBsZXQgeyBwYXJlbnROb2RlIH0gPSBlbGVtZW50O1xuLy8gICB3aGlsZSAocGFyZW50Tm9kZSkge1xuLy8gICAgIGlmIChwYXJlbnROb2RlLmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKSkge1xuLy8gICAgICAgcmV0dXJuIHBhcmVudE5vZGU7XG4vLyAgICAgfVxuLy8gICAgIHBhcmVudE5vZGUgPSBwYXJlbnROb2RlLnBhcmVudE5vZGU7XG4vLyAgIH1cbi8vICAgcmV0dXJuIG51bGw7IC8vIFJldG9ybmEgbnVsbCBzZSBuw6NvIGVuY29udHJvdSBuZW5odW0gbsOzIHBhaSBjb20gbyBhdHJpYnV0byBkZXNlamFkb1xuLy8gfVxuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWN5Y2xlICovXG5pbXBvcnQgeyBwb3B1bGF0ZVN0b3JhZ2UgfSBmcm9tICcuL0pTT05GdW5jdGlvbnMnO1xuaW1wb3J0IGFkZExpbmUgZnJvbSAnLi9saXN0Q29uc3RydWN0b3InO1xuaW1wb3J0IGNvbnN0cnVjdG9yUHJvamVjdExpc3QgZnJvbSAnLi9wcm9qZWN0TGlzdENvbnN0cnVjdG9yJztcbmltcG9ydCB7XG4gIGNsZWFyQ29udGVudCwgbGlzdCwgc29ydFBhcmFtLCBsb2FkTGlzdCwgZGlzcGxheVByb2plY3QsXG59IGZyb20gJy4vdWlDb21tb25GdW5jdGlvbnMnO1xuXG4vLyBVSSBDb250cm9sbGVyXG5jb25zdCB1aUNvbnRyb2wgPSAoKCkgPT4ge1xuICBsZXQgY3VycmVudEZpbHRlciA9IG51bGw7XG5cbiAgZnVuY3Rpb24gc2V0Q3VycmVudEZpbHRlcihrZXksIHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBrZXkgIT09ICd1bmRlZmluZWQnKSBjdXJyZW50RmlsdGVyID0geyBrZXksIHZhbHVlIH07XG4gICAgZWxzZSBjdXJyZW50RmlsdGVyID0gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGZpbHRlckFycmF5ID0gKGFyciwgZmlsdGVyLCB2YWx1ZSkgPT4ge1xuICAgIGlmIChmaWx0ZXIpIHJldHVybiBbLi4uYXJyLmZpbHRlcigob2JqZXRvKSA9PiBvYmpldG9bZmlsdGVyXSA9PT0gdmFsdWUpXTtcbiAgICByZXR1cm4gYXJyO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGxvYWQoKSB7XG4gICAgLy8gYWRkIHByb2plY3QgbGlzdFxuICAgIGNvbnN0cnVjdG9yUHJvamVjdExpc3QoKTtcbiAgICBjb25zdCB1aUxpc3QgPSBzb3J0UGFyYW0obG9hZExpc3QoKSwgJ2NoZWNrZWQnKTtcbiAgICBpZiAoY3VycmVudEZpbHRlciAhPT0gbnVsbCkge1xuICAgICAgZmlsdGVyQXJyYXkodWlMaXN0LCBjdXJyZW50RmlsdGVyLmtleSwgY3VycmVudEZpbHRlci52YWx1ZSkuZm9yRWFjaCgob2JqKSA9PiBhZGRMaW5lKG9iaikpO1xuICAgIH0gZWxzZSB7XG4gICAgICB1aUxpc3QuZm9yRWFjaCgob2JqKSA9PiBhZGRMaW5lKG9iaikpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZShmaWx0ZXIsIHZhbHVlKSB7XG4gICAgY2xlYXJDb250ZW50KGxpc3QpO1xuICAgIGNsZWFyQ29udGVudChkaXNwbGF5UHJvamVjdCk7XG4gICAgaWYgKHR5cGVvZiBmaWx0ZXIgIT09ICd1bmRlZmluZWQnKSBzZXRDdXJyZW50RmlsdGVyKGZpbHRlciwgdmFsdWUpO1xuICAgIGlmIChmaWx0ZXIgPT09ICdjbGVhcicpIHNldEN1cnJlbnRGaWx0ZXIoKTtcbiAgICBsb2FkKCk7XG4gICAgcG9wdWxhdGVTdG9yYWdlKCk7XG4gICAgY29uc29sZS53YXJuKCdVcGRhdGVkIScpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzZXRDdXJyZW50RmlsdGVyLFxuICAgIGxvYWQsXG4gICAgdXBkYXRlLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdWlDb250cm9sO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua3RvZG9fbGlzdFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt0b2RvX2xpc3RcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcIjNyZHBhcnRcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKDcyNzMpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=