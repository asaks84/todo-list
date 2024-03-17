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

/***/ 875:
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
  console.log('populate');
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
function CreateItem(text, deadline = 0, project = null, priorityNum = 0) {
  let title = text;
  let dueDate = deadline;
  let projectName = project;
  let priority = priorityNum;
  let checked = false;
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
  };
}

const todoList = (() => {
  const list = [];
  const complete = [];

  const getLength = (data = list) => {
    if (typeof data === 'number') {
      return complete.length;
    }
    return data.length;
  };
  const selectItem = (pos, arr = list) => arr[pos];
  const getProjects = () => list.map((item) => item.getProject())
    .filter((value) => value !== null);

  function reset() {
    list.length = 0;
    complete.length = 0;
  }
  function addItem(text, deadline, project, priority) {
    const newItem = CreateItem(text, deadline, project, priority);
    list.push(newItem);
  }

  function returnObj(item) {
    const title = item.getTitle();
    const project = item.getProject();
    const dueDate = item.getDueDate();
    const priority = item.getPriority();
    const checked = item.getCheck();
    const notes = item.getAllNotes();

    return {
      title, project, dueDate, priority, checked, notes,
    };
  }

  const toJSON = () => {
    const listData = list.map((item) => ({
      title: item.getTitle(),
      project: item.getProject(),
      dueDate: item.getDueDate(),
      priority: item.getPriority(),
      checked: item.getCheck(),
      notes: item.getAllNotes(),
    }));

    const completeData = complete.map((item) => ({
      title: item.getTitle(),
      project: item.getProject(),
      dueDate: item.getDueDate(),
      priority: item.getPriority(),
      checked: item.getCheck(),
      notes: item.getAllNotes(),
    }));

    return JSON.stringify({ list: listData, complete: completeData }, '', 1);
  };

  const restore = (data) => {
    reset();
    const { list: listData, complete: completeData } = JSON.parse(data);

    listData.forEach(
      ({
        title, project, dueDate, priority, notes,
      }) => {
        const newItem = CreateItem(title, dueDate, project, priority);
        notes.forEach((note) => newItem.addNote(note));
        list.push(newItem);
      },
    );

    completeData.forEach(
      ({
        title, project, dueDate, priority, notes,
      }) => {
        const newItem = CreateItem(title, dueDate, project, priority);
        newItem.editCheck();
        notes.forEach((note) => newItem.addNote(note));
        complete.push(newItem);
      },
    );
  };

  function setChecked(pos) {
    list[pos].editCheck();
    const removed = list.splice(pos, 1);
    return complete.push(removed[0]);
  }
  function allTasksList(num) {
    if (num === 0) {
      return list.map((obj) => (returnObj(obj)));
    }
    return complete.map((obj) => (returnObj(obj)));
  }

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
  mask: [
    {
      mask: 'd/`m/`Y',
      blocks: {
        d: {
          mask: imask__WEBPACK_IMPORTED_MODULE_0__["default"].MaskedRange,
          from: 1,
          to: 31,
          maxLength: 2,
        },
        m: {
          mask: imask__WEBPACK_IMPORTED_MODULE_0__["default"].MaskedRange,
          from: 1,
          to: 12,
          maxLength: 2,
        },
        Y: {
          mask: imask__WEBPACK_IMPORTED_MODULE_0__["default"].MaskedRange,
          from: 1000,
          to: 9999,
        },
      },
    },
  ],
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
/* harmony import */ var _uiListGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uiListGenerator */ 179);
/* harmony import */ var _JSONFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./JSONFunctions */ 875);
/* harmony import */ var _uiFunctions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./uiFunctions */ 363);
/* eslint-disable max-len */






const input = document.querySelectorAll('input');
const addField = document.querySelector('input#itemTitle');

// Enquanto escreve o título, ele mostra um botão para adicionar mais opções, se assim desejar
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
// adiciona evento pra quando se começa a digitar
// e quando se para de digitar o título do item.
addField.addEventListener('keydown', showPlusBtn);
addField.addEventListener('keyup', showPlusBtn);

input.forEach((e) => e.addEventListener('change', _JSONFunctions__WEBPACK_IMPORTED_MODULE_3__.populateStorage));
input.forEach((e) => e.setAttribute('autocomplete', 'off'));
// input.addEventListener('change', populateStorage);
// input.setAttribute('autocomplete', 'off');
window.onload = (0,_JSONFunctions__WEBPACK_IMPORTED_MODULE_3__.restoreStorage)();

// tests

// filtering special characters

// todoList.addItem('Item 4');
// todoList.addItem('Item 5');
// todoList.addItem('Item 6');
// todoList.selectItem(0).editProject('Projeto 1');
// todoList.selectItem(1).editProject('Projeção');
// todoList.selectItem(2).editProject('Projota');
// todoList.selectItem(2).addNote(`
//   <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element.
//   These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables.
//   It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
// `);

(0,_uiFunctions__WEBPACK_IMPORTED_MODULE_4__.dueDateMask)();
(0,_uiFunctions__WEBPACK_IMPORTED_MODULE_4__.searchProjects)();

const allItems = _core__WEBPACK_IMPORTED_MODULE_1__["default"].allTasksList(0);
allItems.forEach((obj) => (0,_uiListGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(obj, allItems.indexOf(obj)));


/***/ }),

/***/ 363:
/*!***********************************!*\
  !*** ./src/assets/uiFunctions.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dueDateMask: () => (/* binding */ dueDateMask),
/* harmony export */   searchProjects: () => (/* binding */ searchProjects),
/* harmony export */   setAttrs: () => (/* binding */ setAttrs)
/* harmony export */ });
/* harmony import */ var flatpickr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flatpickr */ 5840);
/* harmony import */ var flatpickr_dist_l10n_pt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flatpickr/dist/l10n/pt */ 450);
/* harmony import */ var flatpickr_dist_l10n_pt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flatpickr_dist_l10n_pt__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var imask__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! imask */ 3303);
/* harmony import */ var _date__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./date */ 2782);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core */ 3317);






function setAttrs(elem, attrs) {
  Object.keys(attrs).forEach((key) => {
    elem.setAttribute(key, attrs[key]);
  });
}

// ADD/EDIT NEW TASK SCREEN

function removeSpecials(text) {
  let search = text;
  search = search.replace(/[ÀÁÂÃÄÅ]/, 'A');
  search = search.replace(/[àáâãäå]/, 'a');
  search = search.replace(/[ÈÉÊË]/, 'E');
  search = search.replace(/[èéêë]/, 'e');
  search = search.replace(/[ÌÍÏÎ]/, 'I');
  search = search.replace(/[ìíïî]/, 'i');
  search = search.replace(/[ÒÓÕÔÖ]/, 'O');
  search = search.replace(/[òóõôö]/, 'o');
  search = search.replace(/[ÙÚÛÜ]/, 'O');
  search = search.replace(/[ùúûü]/, 'u');
  search = search.replace(/[Ç]/, 'C');
  search = search.replace(/[ç]/, 'c');
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


/***/ }),

/***/ 179:
/*!***************************************!*\
  !*** ./src/assets/uiListGenerator.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _JSONFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JSONFunctions */ 875);
/* harmony import */ var _uiFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uiFunctions */ 363);



const list = document.querySelector('div#list');
const isChecked = (e) => e.checked === true;
const hasNotes = (obj) => obj.length > 0;

function setChecked(e) {
  const { target } = e;
  const text = target.nextElementSibling;
  if (isChecked(target)) {
    text.classList.add('text-decoration-line-through');
  } else {
    text.classList.remove('text-decoration-line-through');
  }
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
  const item = document.createElement('div');
  const header = document.createElement('h2');
  const checkbox = document.createElement('input');
  const btnHeader = document.createElement('button');
  const code = document.createElement('code');
  const span = document.createElement('span');

  // body
  const itemDetails = document.createElement('div');
  const itemBody = document.createElement('div');

  const btnEdit = document.createElement('button');
  const btnDelete = document.createElement('button');

  // STYLING OBJECTS

  // header
  checkbox.setAttribute('type', 'checkbox');
  checkbox.classList.add('form-check-input');
  checkbox.addEventListener('change', setChecked);
  checkbox.addEventListener('change', _JSONFunctions__WEBPACK_IMPORTED_MODULE_0__.populateStorage);

  item.classList.add('accordion-item');
  (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_1__.setAttrs)(item, {
    'data-position': `${num}`,
  });

  header.classList.add('accordion-header', 'p-1', 'd-flex', 'align-items-center', 'gap-1');
  btnHeader.classList.add('accordion-button', 'collapsed', 'flex-fill');
  span.classList.add('flex-fill');

  (0,_uiFunctions__WEBPACK_IMPORTED_MODULE_1__.setAttrs)(btnHeader, {
    // eslint-disable-next-line quote-props
    'type': 'button',
    'data-bs-toggle': 'collapse',
    'aria-expanded': 'false',
    'data-bs-target': `#item-${num}`,
  });
  code.classList.add('small', 'text-muted');

  // body
  itemDetails.classList.add('accordion-collapse', 'collapse');
  itemDetails.setAttribute('id', `item-${num}`);
  itemBody.classList.add('accordion-body');

  btnEdit.classList.add('btn', 'btn-warning');
  btnDelete.classList.add('btn', 'btn-danger');

  // FILLING CONTENT
  // header
  span.textContent = obj.title;
  code.textContent = obj.project;

  // body
  btnEdit.textContent = 'Edit';
  btnDelete.textContent = 'Delete';

  // Appending content
  btnHeader.appendChild(span);
  btnHeader.appendChild(code);
  header.appendChild(checkbox);
  header.appendChild(btnHeader);

  // body content
  if (hasNotes(obj.notes)) {
    insertNote(obj.notes, itemBody);
  }
  itemDetails.appendChild(itemBody);

  item.appendChild(header);
  item.appendChild(itemDetails);

  list.appendChild(item);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9KU09ORnVuY3Rpb25zLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvY29yZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL2RhdGUuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9zY3JpcHQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy91aUZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL3VpTGlzdEdlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcbi8vIGltcG9ydCBhZGRMaW5lIGZyb20gJy4vdWlMaXN0R2VuZXJhdG9yJztcblxuZXhwb3J0IGZ1bmN0aW9uIHBvcHVsYXRlU3RvcmFnZSgpIHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhdGEnLCB0b2RvTGlzdC50b0pTT04oKSk7XG4gIGNvbnNvbGUubG9nKCdwb3B1bGF0ZScpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzdG9yZVN0b3JhZ2UoKSB7XG4gIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGF0YScpID09PSBudWxsKSByZXR1cm47XG4gIHRvZG9MaXN0LnJlc3RvcmUobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhdGEnKSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25uZWN0KCkge1xuICBjb25zdCByZXF1ZXN0VVJMID0gJy4vYXNzZXRzL2RhdGEuanNvbic7XG4gIGNvbnN0IHJlcXVlc3QgPSBhd2FpdCBmZXRjaChyZXF1ZXN0VVJMKTtcbiAgaWYgKCFyZXF1ZXN0Lm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBIVFRQIGVycm9yISBTdGF0dXM6ICR7cmVxdWVzdC5zdGF0dXN9YCk7XG4gIH1cblxuICByZXR1cm4gcmVxdWVzdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBvcHVsYXRlKCkge1xuICBjb25zdCB2YWx1ZSA9IGF3YWl0IGNvbm5lY3QoKTtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGVzdCgpIHtcbiAgdG9kb0xpc3QucmVzdG9yZShwb3B1bGF0ZSgpKTtcbn1cbiIsImZ1bmN0aW9uIENyZWF0ZUl0ZW0odGV4dCwgZGVhZGxpbmUgPSAwLCBwcm9qZWN0ID0gbnVsbCwgcHJpb3JpdHlOdW0gPSAwKSB7XG4gIGxldCB0aXRsZSA9IHRleHQ7XG4gIGxldCBkdWVEYXRlID0gZGVhZGxpbmU7XG4gIGxldCBwcm9qZWN0TmFtZSA9IHByb2plY3Q7XG4gIGxldCBwcmlvcml0eSA9IHByaW9yaXR5TnVtO1xuICBsZXQgY2hlY2tlZCA9IGZhbHNlO1xuICBjb25zdCBub3RlcyA9IFtdO1xuXG4gIGZ1bmN0aW9uIGVkaXRUaXRsZSh2YWwpIHsgdGl0bGUgPSB2YWw7IH1cbiAgY29uc3QgZ2V0VGl0bGUgPSAoKSA9PiB0aXRsZTtcbiAgZnVuY3Rpb24gZWRpdFByaW9yaXR5KHZhbCkgeyBwcmlvcml0eSA9IHZhbDsgfVxuICBjb25zdCBnZXRQcmlvcml0eSA9ICgpID0+IHByaW9yaXR5O1xuICBmdW5jdGlvbiBkZWxldGVEdW9EYXRlKCkgeyBkdWVEYXRlID0gMDsgfVxuICBmdW5jdGlvbiBlZGl0RHVlRGF0ZSh2YWwpIHsgZHVlRGF0ZSA9IHZhbDsgfVxuICBjb25zdCBnZXREdWVEYXRlID0gKCkgPT4gZHVlRGF0ZTtcbiAgZnVuY3Rpb24gZWRpdFByb2plY3QodmFsKSB7IHByb2plY3ROYW1lID0gdmFsOyB9XG4gIGNvbnN0IGdldFByb2plY3QgPSAoKSA9PiBwcm9qZWN0TmFtZTtcbiAgZnVuY3Rpb24gZWRpdENoZWNrKCkgeyBjaGVja2VkID0gIWNoZWNrZWQ7IH1cbiAgY29uc3QgZ2V0Q2hlY2sgPSAoKSA9PiBjaGVja2VkO1xuICBmdW5jdGlvbiBhZGROb3RlKHZhbCkgeyBub3Rlcy5wdXNoKHZhbCk7IH1cbiAgZnVuY3Rpb24gZGVsZXRlTm90ZShwb3MpIHsgbm90ZXMuc3BsaWNlKHBvcywgMSk7IH1cbiAgZnVuY3Rpb24gZWRpdE5vdGUocG9zLCB2YWwpIHsgbm90ZXNbcG9zXSA9IHZhbDsgfVxuICBjb25zdCBnZXRBbGxOb3RlcyA9ICgpID0+IG5vdGVzO1xuICBjb25zdCBnZXROb3RlID0gKHBvcykgPT4gbm90ZXNbcG9zXTtcblxuICByZXR1cm4ge1xuICAgIGFkZE5vdGUsXG4gICAgZWRpdE5vdGUsXG4gICAgZ2V0Tm90ZSxcbiAgICBkZWxldGVOb3RlLFxuICAgIGdldEFsbE5vdGVzLFxuXG4gICAgZWRpdFRpdGxlLFxuICAgIGdldFRpdGxlLFxuXG4gICAgZWRpdER1ZURhdGUsXG4gICAgZGVsZXRlRHVvRGF0ZSxcbiAgICBnZXREdWVEYXRlLFxuXG4gICAgZWRpdFByb2plY3QsXG4gICAgZ2V0UHJvamVjdCxcblxuICAgIGVkaXRQcmlvcml0eSxcbiAgICBnZXRQcmlvcml0eSxcblxuICAgIGVkaXRDaGVjayxcbiAgICBnZXRDaGVjayxcbiAgfTtcbn1cblxuY29uc3QgdG9kb0xpc3QgPSAoKCkgPT4ge1xuICBjb25zdCBsaXN0ID0gW107XG4gIGNvbnN0IGNvbXBsZXRlID0gW107XG5cbiAgY29uc3QgZ2V0TGVuZ3RoID0gKGRhdGEgPSBsaXN0KSA9PiB7XG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuIGNvbXBsZXRlLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGEubGVuZ3RoO1xuICB9O1xuICBjb25zdCBzZWxlY3RJdGVtID0gKHBvcywgYXJyID0gbGlzdCkgPT4gYXJyW3Bvc107XG4gIGNvbnN0IGdldFByb2plY3RzID0gKCkgPT4gbGlzdC5tYXAoKGl0ZW0pID0+IGl0ZW0uZ2V0UHJvamVjdCgpKVxuICAgIC5maWx0ZXIoKHZhbHVlKSA9PiB2YWx1ZSAhPT0gbnVsbCk7XG5cbiAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgbGlzdC5sZW5ndGggPSAwO1xuICAgIGNvbXBsZXRlLmxlbmd0aCA9IDA7XG4gIH1cbiAgZnVuY3Rpb24gYWRkSXRlbSh0ZXh0LCBkZWFkbGluZSwgcHJvamVjdCwgcHJpb3JpdHkpIHtcbiAgICBjb25zdCBuZXdJdGVtID0gQ3JlYXRlSXRlbSh0ZXh0LCBkZWFkbGluZSwgcHJvamVjdCwgcHJpb3JpdHkpO1xuICAgIGxpc3QucHVzaChuZXdJdGVtKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJldHVybk9iaihpdGVtKSB7XG4gICAgY29uc3QgdGl0bGUgPSBpdGVtLmdldFRpdGxlKCk7XG4gICAgY29uc3QgcHJvamVjdCA9IGl0ZW0uZ2V0UHJvamVjdCgpO1xuICAgIGNvbnN0IGR1ZURhdGUgPSBpdGVtLmdldER1ZURhdGUoKTtcbiAgICBjb25zdCBwcmlvcml0eSA9IGl0ZW0uZ2V0UHJpb3JpdHkoKTtcbiAgICBjb25zdCBjaGVja2VkID0gaXRlbS5nZXRDaGVjaygpO1xuICAgIGNvbnN0IG5vdGVzID0gaXRlbS5nZXRBbGxOb3RlcygpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlLCBwcm9qZWN0LCBkdWVEYXRlLCBwcmlvcml0eSwgY2hlY2tlZCwgbm90ZXMsXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IHRvSlNPTiA9ICgpID0+IHtcbiAgICBjb25zdCBsaXN0RGF0YSA9IGxpc3QubWFwKChpdGVtKSA9PiAoe1xuICAgICAgdGl0bGU6IGl0ZW0uZ2V0VGl0bGUoKSxcbiAgICAgIHByb2plY3Q6IGl0ZW0uZ2V0UHJvamVjdCgpLFxuICAgICAgZHVlRGF0ZTogaXRlbS5nZXREdWVEYXRlKCksXG4gICAgICBwcmlvcml0eTogaXRlbS5nZXRQcmlvcml0eSgpLFxuICAgICAgY2hlY2tlZDogaXRlbS5nZXRDaGVjaygpLFxuICAgICAgbm90ZXM6IGl0ZW0uZ2V0QWxsTm90ZXMoKSxcbiAgICB9KSk7XG5cbiAgICBjb25zdCBjb21wbGV0ZURhdGEgPSBjb21wbGV0ZS5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICB0aXRsZTogaXRlbS5nZXRUaXRsZSgpLFxuICAgICAgcHJvamVjdDogaXRlbS5nZXRQcm9qZWN0KCksXG4gICAgICBkdWVEYXRlOiBpdGVtLmdldER1ZURhdGUoKSxcbiAgICAgIHByaW9yaXR5OiBpdGVtLmdldFByaW9yaXR5KCksXG4gICAgICBjaGVja2VkOiBpdGVtLmdldENoZWNrKCksXG4gICAgICBub3RlczogaXRlbS5nZXRBbGxOb3RlcygpLFxuICAgIH0pKTtcblxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7IGxpc3Q6IGxpc3REYXRhLCBjb21wbGV0ZTogY29tcGxldGVEYXRhIH0sICcnLCAxKTtcbiAgfTtcblxuICBjb25zdCByZXN0b3JlID0gKGRhdGEpID0+IHtcbiAgICByZXNldCgpO1xuICAgIGNvbnN0IHsgbGlzdDogbGlzdERhdGEsIGNvbXBsZXRlOiBjb21wbGV0ZURhdGEgfSA9IEpTT04ucGFyc2UoZGF0YSk7XG5cbiAgICBsaXN0RGF0YS5mb3JFYWNoKFxuICAgICAgKHtcbiAgICAgICAgdGl0bGUsIHByb2plY3QsIGR1ZURhdGUsIHByaW9yaXR5LCBub3RlcyxcbiAgICAgIH0pID0+IHtcbiAgICAgICAgY29uc3QgbmV3SXRlbSA9IENyZWF0ZUl0ZW0odGl0bGUsIGR1ZURhdGUsIHByb2plY3QsIHByaW9yaXR5KTtcbiAgICAgICAgbm90ZXMuZm9yRWFjaCgobm90ZSkgPT4gbmV3SXRlbS5hZGROb3RlKG5vdGUpKTtcbiAgICAgICAgbGlzdC5wdXNoKG5ld0l0ZW0pO1xuICAgICAgfSxcbiAgICApO1xuXG4gICAgY29tcGxldGVEYXRhLmZvckVhY2goXG4gICAgICAoe1xuICAgICAgICB0aXRsZSwgcHJvamVjdCwgZHVlRGF0ZSwgcHJpb3JpdHksIG5vdGVzLFxuICAgICAgfSkgPT4ge1xuICAgICAgICBjb25zdCBuZXdJdGVtID0gQ3JlYXRlSXRlbSh0aXRsZSwgZHVlRGF0ZSwgcHJvamVjdCwgcHJpb3JpdHkpO1xuICAgICAgICBuZXdJdGVtLmVkaXRDaGVjaygpO1xuICAgICAgICBub3Rlcy5mb3JFYWNoKChub3RlKSA9PiBuZXdJdGVtLmFkZE5vdGUobm90ZSkpO1xuICAgICAgICBjb21wbGV0ZS5wdXNoKG5ld0l0ZW0pO1xuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHNldENoZWNrZWQocG9zKSB7XG4gICAgbGlzdFtwb3NdLmVkaXRDaGVjaygpO1xuICAgIGNvbnN0IHJlbW92ZWQgPSBsaXN0LnNwbGljZShwb3MsIDEpO1xuICAgIHJldHVybiBjb21wbGV0ZS5wdXNoKHJlbW92ZWRbMF0pO1xuICB9XG4gIGZ1bmN0aW9uIGFsbFRhc2tzTGlzdChudW0pIHtcbiAgICBpZiAobnVtID09PSAwKSB7XG4gICAgICByZXR1cm4gbGlzdC5tYXAoKG9iaikgPT4gKHJldHVybk9iaihvYmopKSk7XG4gICAgfVxuICAgIHJldHVybiBjb21wbGV0ZS5tYXAoKG9iaikgPT4gKHJldHVybk9iaihvYmopKSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldExlbmd0aCxcbiAgICBzZWxlY3RJdGVtLFxuICAgIGFkZEl0ZW0sXG4gICAgcmVzdG9yZSxcbiAgICB0b0pTT04sXG4gICAgc2V0Q2hlY2tlZCxcbiAgICBnZXRQcm9qZWN0cyxcbiAgICByZXNldCxcbiAgICByZXR1cm5PYmosXG4gICAgYWxsVGFza3NMaXN0LFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdG9kb0xpc3Q7XG5cbi8qXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4jIyMjIyMjIyMjIyMjIyMjICAgICAgICAgICAjIyMjIyMjIyMjIyMjIyMjXG4jIyMjIyMjIyMjIyMjIyMjIFRFU1QgQVJFQSAjIyMjIyMjIyMjIyMjIyMjXG4jIyMjIyMjIyMjIyMjIyMjICAgICAgICAgICAjIyMjIyMjIyMjIyMjIyMjXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4qL1xuIiwiLy8gaW1wb3J0IHsgcHRCUiB9IGZyb20gJ2RhdGUtZm5zL2xvY2FsZSc7XG5pbXBvcnQgeyBmb3JtYXQgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQgSU1hc2sgZnJvbSAnaW1hc2snO1xuXG5jb25zdCBzcGxpdFRvQ29kZSA9IChkYXRlKSA9PiBkYXRlLnNwbGl0KCcvJykucmV2ZXJzZSgpLmpvaW4oJy8nKS5yZXBsYWNlQWxsKCcvJywgJywgJyk7XG5leHBvcnQgY29uc3QgdG9JbnB1dCA9IChkYXRhKSA9PiBmb3JtYXQobmV3IERhdGUoc3BsaXRUb0NvZGUoZGF0YSkpLCAnZGQvTEwveXl5eScpO1xuLy8gY29uc3QgZ2V0RGF0YSA9IChhcnIpID0+IGFyci5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4vLyB9KTtcblxuZXhwb3J0IGNvbnN0IG1hc2tEYXRlID0ge1xuICBtYXNrOiBbXG4gICAge1xuICAgICAgbWFzazogJ2QvYG0vYFknLFxuICAgICAgYmxvY2tzOiB7XG4gICAgICAgIGQ6IHtcbiAgICAgICAgICBtYXNrOiBJTWFzay5NYXNrZWRSYW5nZSxcbiAgICAgICAgICBmcm9tOiAxLFxuICAgICAgICAgIHRvOiAzMSxcbiAgICAgICAgICBtYXhMZW5ndGg6IDIsXG4gICAgICAgIH0sXG4gICAgICAgIG06IHtcbiAgICAgICAgICBtYXNrOiBJTWFzay5NYXNrZWRSYW5nZSxcbiAgICAgICAgICBmcm9tOiAxLFxuICAgICAgICAgIHRvOiAxMixcbiAgICAgICAgICBtYXhMZW5ndGg6IDIsXG4gICAgICAgIH0sXG4gICAgICAgIFk6IHtcbiAgICAgICAgICBtYXNrOiBJTWFzay5NYXNrZWRSYW5nZSxcbiAgICAgICAgICBmcm9tOiAxMDAwLFxuICAgICAgICAgIHRvOiA5OTk5LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICBdLFxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmltcG9ydCAnLi9zdHlsZS5zY3NzJztcbmltcG9ydCB0b2RvTGlzdCBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IGFkZExpbmUgZnJvbSAnLi91aUxpc3RHZW5lcmF0b3InO1xuaW1wb3J0IHsgcG9wdWxhdGVTdG9yYWdlLCByZXN0b3JlU3RvcmFnZSB9IGZyb20gJy4vSlNPTkZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBkdWVEYXRlTWFzaywgc2VhcmNoUHJvamVjdHMgfSBmcm9tICcuL3VpRnVuY3Rpb25zJztcblxuY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpO1xuY29uc3QgYWRkRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCNpdGVtVGl0bGUnKTtcblxuLy8gRW5xdWFudG8gZXNjcmV2ZSBvIHTDrXR1bG8sIGVsZSBtb3N0cmEgdW0gYm90w6NvIHBhcmEgYWRpY2lvbmFyIG1haXMgb3DDp8O1ZXMsIHNlIGFzc2ltIGRlc2VqYXJcbmZ1bmN0aW9uIHNob3dQbHVzQnRuKCkge1xuICAvLyBFbmNvbnRyYSBvIGJvdMOjbyArXG4gIGNvbnN0IHBsdXNCdG4gPSBhZGRGaWVsZC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gIGNvbnN0IHNhdmVCdG4gPSBwbHVzQnRuLm5leHRFbGVtZW50U2libGluZztcbiAgLy8gU2UgbyB2YWxvciBkbyBjYW1wbyB0w610dWxvIGZvciBkaWZlcmVudGUgZGUgdmF6aW8sXG4gIC8vIGVudMOjbyBlbGUgcmV2ZWxhIG8gYm90w6NvICtcbiAgaWYgKGFkZEZpZWxkLnZhbHVlICE9PSAnJykge1xuICAgIHBsdXNCdG4uY2xhc3NMaXN0LmFkZCgncmV2ZWFsSXRlbScpO1xuICAgIHNhdmVCdG4uY2xhc3NMaXN0LmFkZCgncmV2ZWFsSXRlbScpO1xuICB9XG4gIC8vIGNhc28gY29udHLDoXJpbywgc2Ugdm9jw6ogYXBhZ2FyIHRvZG8gbyB0w610dWxvXG4gIC8vIGVsZSBkw6EgZGlzcGxheTogbm9uZSwgbm8gYm90w6NvICtcbiAgaWYgKGFkZEZpZWxkLnZhbHVlID09PSAnJyAmJiBwbHVzQnRuLmNsYXNzTGlzdC5jb250YWlucygncmV2ZWFsSXRlbScpKSB7XG4gICAgcGx1c0J0bi5jbGFzc0xpc3QucmVtb3ZlKCdyZXZlYWxJdGVtJyk7XG4gICAgc2F2ZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdyZXZlYWxJdGVtJyk7XG4gIH1cbn1cbi8vIGFkaWNpb25hIGV2ZW50byBwcmEgcXVhbmRvIHNlIGNvbWXDp2EgYSBkaWdpdGFyXG4vLyBlIHF1YW5kbyBzZSBwYXJhIGRlIGRpZ2l0YXIgbyB0w610dWxvIGRvIGl0ZW0uXG5hZGRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgc2hvd1BsdXNCdG4pO1xuYWRkRmllbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBzaG93UGx1c0J0bik7XG5cbmlucHV0LmZvckVhY2goKGUpID0+IGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgcG9wdWxhdGVTdG9yYWdlKSk7XG5pbnB1dC5mb3JFYWNoKChlKSA9PiBlLnNldEF0dHJpYnV0ZSgnYXV0b2NvbXBsZXRlJywgJ29mZicpKTtcbi8vIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHBvcHVsYXRlU3RvcmFnZSk7XG4vLyBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2F1dG9jb21wbGV0ZScsICdvZmYnKTtcbndpbmRvdy5vbmxvYWQgPSByZXN0b3JlU3RvcmFnZSgpO1xuXG4vLyB0ZXN0c1xuXG4vLyBmaWx0ZXJpbmcgc3BlY2lhbCBjaGFyYWN0ZXJzXG5cbi8vIHRvZG9MaXN0LmFkZEl0ZW0oJ0l0ZW0gNCcpO1xuLy8gdG9kb0xpc3QuYWRkSXRlbSgnSXRlbSA1Jyk7XG4vLyB0b2RvTGlzdC5hZGRJdGVtKCdJdGVtIDYnKTtcbi8vIHRvZG9MaXN0LnNlbGVjdEl0ZW0oMCkuZWRpdFByb2plY3QoJ1Byb2pldG8gMScpO1xuLy8gdG9kb0xpc3Quc2VsZWN0SXRlbSgxKS5lZGl0UHJvamVjdCgnUHJvamXDp8OjbycpO1xuLy8gdG9kb0xpc3Quc2VsZWN0SXRlbSgyKS5lZGl0UHJvamVjdCgnUHJvam90YScpO1xuLy8gdG9kb0xpc3Quc2VsZWN0SXRlbSgyKS5hZGROb3RlKGBcbi8vICAgPHN0cm9uZz5UaGlzIGlzIHRoZSBmaXJzdCBpdGVtJ3MgYWNjb3JkaW9uIGJvZHkuPC9zdHJvbmc+IEl0IGlzIHNob3duIGJ5IGRlZmF1bHQsIHVudGlsIHRoZSBjb2xsYXBzZSBwbHVnaW4gYWRkcyB0aGUgYXBwcm9wcmlhdGUgY2xhc3NlcyB0aGF0IHdlIHVzZSB0byBzdHlsZSBlYWNoIGVsZW1lbnQuXG4vLyAgIFRoZXNlIGNsYXNzZXMgY29udHJvbCB0aGUgb3ZlcmFsbCBhcHBlYXJhbmNlLCBhcyB3ZWxsIGFzIHRoZSBzaG93aW5nIGFuZCBoaWRpbmcgdmlhIENTUyB0cmFuc2l0aW9ucy4gWW91IGNhbiBtb2RpZnkgYW55IG9mIHRoaXMgd2l0aCBjdXN0b20gQ1NTIG9yIG92ZXJyaWRpbmcgb3VyIGRlZmF1bHQgdmFyaWFibGVzLlxuLy8gICBJdCdzIGFsc28gd29ydGggbm90aW5nIHRoYXQganVzdCBhYm91dCBhbnkgSFRNTCBjYW4gZ28gd2l0aGluIHRoZSA8Y29kZT4uYWNjb3JkaW9uLWJvZHk8L2NvZGU+LCB0aG91Z2ggdGhlIHRyYW5zaXRpb24gZG9lcyBsaW1pdCBvdmVyZmxvdy5cbi8vIGApO1xuXG5kdWVEYXRlTWFzaygpO1xuc2VhcmNoUHJvamVjdHMoKTtcblxuY29uc3QgYWxsSXRlbXMgPSB0b2RvTGlzdC5hbGxUYXNrc0xpc3QoMCk7XG5hbGxJdGVtcy5mb3JFYWNoKChvYmopID0+IGFkZExpbmUob2JqLCBhbGxJdGVtcy5pbmRleE9mKG9iaikpKTtcbiIsImltcG9ydCBmbGF0cGlja3IgZnJvbSAnZmxhdHBpY2tyJztcbmltcG9ydCB7IFBvcnR1Z3Vlc2UgfSBmcm9tICdmbGF0cGlja3IvZGlzdC9sMTBuL3B0JztcbmltcG9ydCBJTWFzayBmcm9tICdpbWFzayc7XG5pbXBvcnQgeyBtYXNrRGF0ZSB9IGZyb20gJy4vZGF0ZSc7XG5pbXBvcnQgdG9kb0xpc3QgZnJvbSAnLi9jb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNldEF0dHJzKGVsZW0sIGF0dHJzKSB7XG4gIE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBlbGVtLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuICB9KTtcbn1cblxuLy8gQUREL0VESVQgTkVXIFRBU0sgU0NSRUVOXG5cbmZ1bmN0aW9uIHJlbW92ZVNwZWNpYWxzKHRleHQpIHtcbiAgbGV0IHNlYXJjaCA9IHRleHQ7XG4gIHNlYXJjaCA9IHNlYXJjaC5yZXBsYWNlKC9bw4DDgcOCw4PDhMOFXS8sICdBJyk7XG4gIHNlYXJjaCA9IHNlYXJjaC5yZXBsYWNlKC9bw6DDocOiw6PDpMOlXS8sICdhJyk7XG4gIHNlYXJjaCA9IHNlYXJjaC5yZXBsYWNlKC9bw4jDicOKw4tdLywgJ0UnKTtcbiAgc2VhcmNoID0gc2VhcmNoLnJlcGxhY2UoL1vDqMOpw6rDq10vLCAnZScpO1xuICBzZWFyY2ggPSBzZWFyY2gucmVwbGFjZSgvW8OMw43Dj8OOXS8sICdJJyk7XG4gIHNlYXJjaCA9IHNlYXJjaC5yZXBsYWNlKC9bw6zDrcOvw65dLywgJ2knKTtcbiAgc2VhcmNoID0gc2VhcmNoLnJlcGxhY2UoL1vDksOTw5XDlMOWXS8sICdPJyk7XG4gIHNlYXJjaCA9IHNlYXJjaC5yZXBsYWNlKC9bw7LDs8O1w7TDtl0vLCAnbycpO1xuICBzZWFyY2ggPSBzZWFyY2gucmVwbGFjZSgvW8OZw5rDm8OcXS8sICdPJyk7XG4gIHNlYXJjaCA9IHNlYXJjaC5yZXBsYWNlKC9bw7nDusO7w7xdLywgJ3UnKTtcbiAgc2VhcmNoID0gc2VhcmNoLnJlcGxhY2UoL1vDh10vLCAnQycpO1xuICBzZWFyY2ggPSBzZWFyY2gucmVwbGFjZSgvW8OnXS8sICdjJyk7XG4gIHJldHVybiBzZWFyY2g7XG59XG4vLyBwcm9qZWN0cyBkYXRhbGlzdCBhdXRvY29tcGxldGVcbmZ1bmN0aW9uIGF1dG9Db21wbGV0ZShzZWFyY2gpIHtcbiAgY29uc3QgcHJvamVjdHMgPSB0b2RvTGlzdC5nZXRQcm9qZWN0cygpO1xuICByZXR1cm4gcHJvamVjdHMuZmlsdGVyKCh2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHZhbHVlTG93ZXJjYXNlID0gcmVtb3ZlU3BlY2lhbHModmFsdWUudG9Mb3dlckNhc2UoKSk7XG4gICAgY29uc3Qgc2VhcmNoTG93ZXJjYXNlID0gcmVtb3ZlU3BlY2lhbHMoc2VhcmNoLnRvTG93ZXJDYXNlKCkpO1xuICAgIHJldHVybiB2YWx1ZUxvd2VyY2FzZS5pbmNsdWRlcyhzZWFyY2hMb3dlcmNhc2UpO1xuICB9KTtcbn1cblxuLy8gY2FsbGluZyBmdW5jdGlvbnMgdG8gYXV0b2NvbXBsZXRlIFByb2plY3QgZmllbGRcblxuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaFByb2plY3RzKCkge1xuICBjb25zdCBpbnB1dFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW50ZXJQcm9qZWN0Jyk7XG4gIGNvbnN0IGRhdGFsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGF0YWxpc3QnKTtcbiAgaW5wdXRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKHsgdGFyZ2V0IH0pID0+IHtcbiAgICBjb25zdCBpbnB1dERhdGEgPSB0YXJnZXQudmFsdWU7XG4gICAgaWYgKGlucHV0RGF0YS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGF1dG9Db21wbGV0ZU9wdGlvbnMgPSBhdXRvQ29tcGxldGUoaW5wdXREYXRhKTtcbiAgICAgIGRhdGFsaXN0LmlubmVySFRNTCA9IGAke2F1dG9Db21wbGV0ZU9wdGlvbnNcbiAgICAgICAgLm1hcCgodmFsdWUpID0+IGA8b3B0aW9uIHZhbHVlPVwiJHt2YWx1ZX1cIiAvPmApXG4gICAgICAgIC5qb2luKCcnKX1gO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIERBVEVQSUNLRVIgQU5EIE1BU0sgRlVOQ1RJT05TXG5cbmV4cG9ydCBmdW5jdGlvbiBkdWVEYXRlTWFzaygpIHtcbiAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkdWVEYXRlJyk7XG4gIGNvbnN0IGZsYXRFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LmZsYXRwaWNrcicpO1xuXG4gIC8vIGFwcGx5IG1hc2sgdG8gZHVlRGF0ZUZpZWxkXG4gIGNvbnN0IG1hc2sgPSBJTWFzayhkdWVEYXRlLCBtYXNrRGF0ZSk7XG5cbiAgLy8gYXBwbHkgZmxhdHBpY2tyIGRhdGVwaWNrZXIgdG8gYWxsIGVsZW1lbnRzIGluIGEgZGl2XG4gIC8vIChpY29uIHRvZ2dsZSBhbmQgaW5wdXQgZGF0ZSB1c2luZyBkYXRhLSBhdHRyaWJ1dGVzKVxuICBmbGF0cGlja3IoZmxhdEVsZW0sIHtcbiAgICBkYXRlRm9ybWF0OiAnZC9tL1knLFxuICAgIGRpc2FibGVNb2JpbGU6ICd0cnVlJyxcbiAgICBhbGxvd0lucHV0OiB0cnVlLFxuICAgIHdyYXA6IHRydWUsXG4gICAgbG9jYWxlOiBQb3J0dWd1ZXNlLFxuICAgIG9uQ2hhbmdlKHNlbGVjdGVkRGF0ZXMsIGRhdGVTdHIpIHtcbiAgICAgIG1hc2sudXBkYXRlVmFsdWUoZGF0ZVN0cik7XG4gICAgfSxcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBwb3B1bGF0ZVN0b3JhZ2UgfSBmcm9tICcuL0pTT05GdW5jdGlvbnMnO1xuaW1wb3J0IHsgc2V0QXR0cnMgfSBmcm9tICcuL3VpRnVuY3Rpb25zJztcblxuY29uc3QgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdiNsaXN0Jyk7XG5jb25zdCBpc0NoZWNrZWQgPSAoZSkgPT4gZS5jaGVja2VkID09PSB0cnVlO1xuY29uc3QgaGFzTm90ZXMgPSAob2JqKSA9PiBvYmoubGVuZ3RoID4gMDtcblxuZnVuY3Rpb24gc2V0Q2hlY2tlZChlKSB7XG4gIGNvbnN0IHsgdGFyZ2V0IH0gPSBlO1xuICBjb25zdCB0ZXh0ID0gdGFyZ2V0Lm5leHRFbGVtZW50U2libGluZztcbiAgaWYgKGlzQ2hlY2tlZCh0YXJnZXQpKSB7XG4gICAgdGV4dC5jbGFzc0xpc3QuYWRkKCd0ZXh0LWRlY29yYXRpb24tbGluZS10aHJvdWdoJyk7XG4gIH0gZWxzZSB7XG4gICAgdGV4dC5jbGFzc0xpc3QucmVtb3ZlKCd0ZXh0LWRlY29yYXRpb24tbGluZS10aHJvdWdoJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5zZXJ0Tm90ZShub3RlcywgYm9keSkge1xuICBub3Rlcy5mb3JFYWNoKChjb250ZW50KSA9PiB7XG4gICAgY29uc3QgY29udGVudERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnRlbnREaXYuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICBib2R5LmFwcGVuZENoaWxkKGNvbnRlbnREaXYpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkTGluZShvYmosIG51bSkge1xuICAvLyBMSVNUIElURU0gLS0tLS0tXG5cbiAgLy8gaGVhZGVyXG4gIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBjb25zdCBidG5IZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgY29uc3QgY29kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NvZGUnKTtcbiAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAvLyBib2R5XG4gIGNvbnN0IGl0ZW1EZXRhaWxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IGl0ZW1Cb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgY29uc3QgYnRuRWRpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBjb25zdCBidG5EZWxldGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblxuICAvLyBTVFlMSU5HIE9CSkVDVFNcblxuICAvLyBoZWFkZXJcbiAgY2hlY2tib3guc2V0QXR0cmlidXRlKCd0eXBlJywgJ2NoZWNrYm94Jyk7XG4gIGNoZWNrYm94LmNsYXNzTGlzdC5hZGQoJ2Zvcm0tY2hlY2staW5wdXQnKTtcbiAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgc2V0Q2hlY2tlZCk7XG4gIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHBvcHVsYXRlU3RvcmFnZSk7XG5cbiAgaXRlbS5jbGFzc0xpc3QuYWRkKCdhY2NvcmRpb24taXRlbScpO1xuICBzZXRBdHRycyhpdGVtLCB7XG4gICAgJ2RhdGEtcG9zaXRpb24nOiBgJHtudW19YCxcbiAgfSk7XG5cbiAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2FjY29yZGlvbi1oZWFkZXInLCAncC0xJywgJ2QtZmxleCcsICdhbGlnbi1pdGVtcy1jZW50ZXInLCAnZ2FwLTEnKTtcbiAgYnRuSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2FjY29yZGlvbi1idXR0b24nLCAnY29sbGFwc2VkJywgJ2ZsZXgtZmlsbCcpO1xuICBzcGFuLmNsYXNzTGlzdC5hZGQoJ2ZsZXgtZmlsbCcpO1xuXG4gIHNldEF0dHJzKGJ0bkhlYWRlciwge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBxdW90ZS1wcm9wc1xuICAgICd0eXBlJzogJ2J1dHRvbicsXG4gICAgJ2RhdGEtYnMtdG9nZ2xlJzogJ2NvbGxhcHNlJyxcbiAgICAnYXJpYS1leHBhbmRlZCc6ICdmYWxzZScsXG4gICAgJ2RhdGEtYnMtdGFyZ2V0JzogYCNpdGVtLSR7bnVtfWAsXG4gIH0pO1xuICBjb2RlLmNsYXNzTGlzdC5hZGQoJ3NtYWxsJywgJ3RleHQtbXV0ZWQnKTtcblxuICAvLyBib2R5XG4gIGl0ZW1EZXRhaWxzLmNsYXNzTGlzdC5hZGQoJ2FjY29yZGlvbi1jb2xsYXBzZScsICdjb2xsYXBzZScpO1xuICBpdGVtRGV0YWlscy5zZXRBdHRyaWJ1dGUoJ2lkJywgYGl0ZW0tJHtudW19YCk7XG4gIGl0ZW1Cb2R5LmNsYXNzTGlzdC5hZGQoJ2FjY29yZGlvbi1ib2R5Jyk7XG5cbiAgYnRuRWRpdC5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLXdhcm5pbmcnKTtcbiAgYnRuRGVsZXRlLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdidG4tZGFuZ2VyJyk7XG5cbiAgLy8gRklMTElORyBDT05URU5UXG4gIC8vIGhlYWRlclxuICBzcGFuLnRleHRDb250ZW50ID0gb2JqLnRpdGxlO1xuICBjb2RlLnRleHRDb250ZW50ID0gb2JqLnByb2plY3Q7XG5cbiAgLy8gYm9keVxuICBidG5FZGl0LnRleHRDb250ZW50ID0gJ0VkaXQnO1xuICBidG5EZWxldGUudGV4dENvbnRlbnQgPSAnRGVsZXRlJztcblxuICAvLyBBcHBlbmRpbmcgY29udGVudFxuICBidG5IZWFkZXIuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gIGJ0bkhlYWRlci5hcHBlbmRDaGlsZChjb2RlKTtcbiAgaGVhZGVyLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcbiAgaGVhZGVyLmFwcGVuZENoaWxkKGJ0bkhlYWRlcik7XG5cbiAgLy8gYm9keSBjb250ZW50XG4gIGlmIChoYXNOb3RlcyhvYmoubm90ZXMpKSB7XG4gICAgaW5zZXJ0Tm90ZShvYmoubm90ZXMsIGl0ZW1Cb2R5KTtcbiAgfVxuICBpdGVtRGV0YWlscy5hcHBlbmRDaGlsZChpdGVtQm9keSk7XG5cbiAgaXRlbS5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICBpdGVtLmFwcGVuZENoaWxkKGl0ZW1EZXRhaWxzKTtcblxuICBsaXN0LmFwcGVuZENoaWxkKGl0ZW0pO1xufVxuZXhwb3J0IGRlZmF1bHQgYWRkTGluZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt0b2RvX2xpc3RcIl0gPSBzZWxmW1wid2VicGFja0NodW5rdG9kb19saXN0XCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCIzcmRwYXJ0XCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyg3MjczKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9