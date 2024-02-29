/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 408:
/*!***********************************!*\
  !*** ./src/assets/constructor.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addLine: () => (/* binding */ addLine)
/* harmony export */ });
/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./script */ 273);

const ul = document.querySelector('ul#listItems');

function addLine (obj) {
  
  // list items
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  const text = document.createElement('span');
  const code = document.createElement('code');
  const btnEdit = document.createElement('button');
  const btnDelete = document.createElement('button');

  //styling objects
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add('form-check-input', 'me-3');
  checkbox.addEventListener('change',_script__WEBPACK_IMPORTED_MODULE_0__.editLine);

  li.classList.add('list-group-item','d-flex','align-items-center', 'gap-1');
  text.classList.add('flex-fill');
  code.classList.add('small', 'text-muted');
  btnEdit.classList.add('btn', 'btn-warning');
  btnDelete.classList.add('btn', 'btn-danger');

  // filling elements content
  text.textContent = obj.text;
  code.textContent = obj.project;
  btnEdit.textContent = 'Edit';
  btnDelete.textContent = 'Delete';

  li.appendChild(checkbox);
  li.appendChild(text);
  li.appendChild(code);
  li.appendChild(btnEdit);
  li.appendChild(btnDelete);

  ul.appendChild(li);
}

/***/ }),

/***/ 986:
/*!*******************************!*\
  !*** ./src/assets/getJSON.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   populate: () => (/* binding */ populate)
/* harmony export */ });
/* harmony import */ var _constructor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constructor */ 408);
/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./script */ 273);



async function populate() {
  const requestURL = './assets/data.json';
  // const request = new Request(requestURL);

  fetch(requestURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((response) => {
      for (let i in response) {
        _script__WEBPACK_IMPORTED_MODULE_1__.todoList.push(response[i]);
        (0,_constructor__WEBPACK_IMPORTED_MODULE_0__.addLine)(_script__WEBPACK_IMPORTED_MODULE_1__.todoList[i]);
      }
      console.log(_script__WEBPACK_IMPORTED_MODULE_1__.todoList)
    })
}

/***/ }),

/***/ 273:
/*!******************************!*\
  !*** ./src/assets/script.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   editLine: () => (/* binding */ editLine),
/* harmony export */   todoList: () => (/* binding */ todoList)
/* harmony export */ });
/* harmony import */ var _data_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.json */ 421);
/* harmony import */ var _getJSON__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getJSON */ 986);



const todoList = [];
const listItems = document.querySelectorAll('#listItems > li');
const isChecked = (e) => e.checked === true;

function editLine(e) {
  const { target } = e;
  const text = target.nextElementSibling;

  (isChecked(target)) ? text.classList.add('text-decoration-line-through') 
                      : text.classList.remove('text-decoration-line-through');
}

(0,_getJSON__WEBPACK_IMPORTED_MODULE_1__.populate)();

listItems.forEach((e) => e.addEventListener('change', editLine));


/***/ }),

/***/ 421:
/*!******************************!*\
  !*** ./src/assets/data.json ***!
  \******************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('[{"text":"Todo 01","project":"Project 01","checked":true,"dueDate":"2024-03-30","priority":3,"notes":["note 01","note 03","01"]},{"text":"Todo 02","project":"Project 01","checked":true,"dueDate":"2024-03-30","priority":1,"notes":[]},{"text":"Todo 03","project":"Project 03","checked":true,"dueDate":"2024-03-30","priority":0,"notes":[]}]');

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(273);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hc3NldHMvbWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBb0M7QUFDcEM7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDZDQUFRO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3JDd0M7QUFDSjtBQUNwQztBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLGdCQUFnQjtBQUMvRDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxRQUFRLDZDQUFRO0FBQ2hCLFFBQVEscURBQU8sQ0FBQyw2Q0FBUTtBQUN4QjtBQUNBLGtCQUFrQiw2Q0FBUTtBQUMxQixLQUFLO0FBQ0w7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckJvQjtBQUNpQjs7QUFFOUI7QUFDUDtBQUNBOztBQUVPO0FBQ1AsVUFBVSxTQUFTO0FBQ25COztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrREFBUTs7QUFFUjs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNqQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL2NvbnN0cnVjdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvZ2V0SlNPTi5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXNzZXRzL3NjcmlwdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZWRpdExpbmUgfSBmcm9tIFwiLi9zY3JpcHRcIjtcclxuY29uc3QgdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd1bCNsaXN0SXRlbXMnKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRMaW5lIChvYmopIHtcclxuICBcclxuICAvLyBsaXN0IGl0ZW1zXHJcbiAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gIGNvbnN0IGNvZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjb2RlJyk7XHJcbiAgY29uc3QgYnRuRWRpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gIGNvbnN0IGJ0bkRlbGV0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5cclxuICAvL3N0eWxpbmcgb2JqZWN0c1xyXG4gIGNoZWNrYm94LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJjaGVja2JveFwiKTtcclxuICBjaGVja2JveC5jbGFzc0xpc3QuYWRkKCdmb3JtLWNoZWNrLWlucHV0JywgJ21lLTMnKTtcclxuICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLGVkaXRMaW5lKTtcclxuXHJcbiAgbGkuY2xhc3NMaXN0LmFkZCgnbGlzdC1ncm91cC1pdGVtJywnZC1mbGV4JywnYWxpZ24taXRlbXMtY2VudGVyJywgJ2dhcC0xJyk7XHJcbiAgdGV4dC5jbGFzc0xpc3QuYWRkKCdmbGV4LWZpbGwnKTtcclxuICBjb2RlLmNsYXNzTGlzdC5hZGQoJ3NtYWxsJywgJ3RleHQtbXV0ZWQnKTtcclxuICBidG5FZGl0LmNsYXNzTGlzdC5hZGQoJ2J0bicsICdidG4td2FybmluZycpO1xyXG4gIGJ0bkRlbGV0ZS5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLWRhbmdlcicpO1xyXG5cclxuICAvLyBmaWxsaW5nIGVsZW1lbnRzIGNvbnRlbnRcclxuICB0ZXh0LnRleHRDb250ZW50ID0gb2JqLnRleHQ7XHJcbiAgY29kZS50ZXh0Q29udGVudCA9IG9iai5wcm9qZWN0O1xyXG4gIGJ0bkVkaXQudGV4dENvbnRlbnQgPSAnRWRpdCc7XHJcbiAgYnRuRGVsZXRlLnRleHRDb250ZW50ID0gJ0RlbGV0ZSc7XHJcblxyXG4gIGxpLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcclxuICBsaS5hcHBlbmRDaGlsZCh0ZXh0KTtcclxuICBsaS5hcHBlbmRDaGlsZChjb2RlKTtcclxuICBsaS5hcHBlbmRDaGlsZChidG5FZGl0KTtcclxuICBsaS5hcHBlbmRDaGlsZChidG5EZWxldGUpO1xyXG5cclxuICB1bC5hcHBlbmRDaGlsZChsaSk7XHJcbn0iLCJpbXBvcnQgeyBhZGRMaW5lIH0gZnJvbSBcIi4vY29uc3RydWN0b3JcIjtcclxuaW1wb3J0IHsgdG9kb0xpc3QgfSBmcm9tIFwiLi9zY3JpcHRcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwb3B1bGF0ZSgpIHtcclxuICBjb25zdCByZXF1ZXN0VVJMID0gJy4vYXNzZXRzL2RhdGEuanNvbic7XHJcbiAgLy8gY29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHJlcXVlc3RVUkwpO1xyXG5cclxuICBmZXRjaChyZXF1ZXN0VVJMKVxyXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIFN0YXR1czogJHtyZXNwb25zZS5zdGF0dXN9YCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgIH0pXHJcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgZm9yIChsZXQgaSBpbiByZXNwb25zZSkge1xyXG4gICAgICAgIHRvZG9MaXN0LnB1c2gocmVzcG9uc2VbaV0pO1xyXG4gICAgICAgIGFkZExpbmUodG9kb0xpc3RbaV0pO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKHRvZG9MaXN0KVxyXG4gICAgfSlcclxufSIsImltcG9ydCAnLi9kYXRhLmpzb24nXG5pbXBvcnQgeyBwb3B1bGF0ZSB9IGZyb20gXCIuL2dldEpTT05cIjtcblxuZXhwb3J0IGNvbnN0IHRvZG9MaXN0ID0gW107XG5jb25zdCBsaXN0SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjbGlzdEl0ZW1zID4gbGknKTtcbmNvbnN0IGlzQ2hlY2tlZCA9IChlKSA9PiBlLmNoZWNrZWQgPT09IHRydWU7XG5cbmV4cG9ydCBmdW5jdGlvbiBlZGl0TGluZShlKSB7XG4gIGNvbnN0IHsgdGFyZ2V0IH0gPSBlO1xuICBjb25zdCB0ZXh0ID0gdGFyZ2V0Lm5leHRFbGVtZW50U2libGluZztcblxuICAoaXNDaGVja2VkKHRhcmdldCkpID8gdGV4dC5jbGFzc0xpc3QuYWRkKCd0ZXh0LWRlY29yYXRpb24tbGluZS10aHJvdWdoJykgXG4gICAgICAgICAgICAgICAgICAgICAgOiB0ZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ3RleHQtZGVjb3JhdGlvbi1saW5lLXRocm91Z2gnKTtcbn1cblxucG9wdWxhdGUoKTtcblxubGlzdEl0ZW1zLmZvckVhY2goKGUpID0+IGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZWRpdExpbmUpKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI3Myk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=