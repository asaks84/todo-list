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

function addLine () {
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
  text.textContent = 'Todo 4';
  code.textContent = 'Project 5';
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

/***/ 273:
/*!******************************!*\
  !*** ./src/assets/script.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   editLine: () => (/* binding */ editLine)
/* harmony export */ });
/* harmony import */ var _constructor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constructor */ 408);

const listItems = document.querySelectorAll('#listItems > li');
const isChecked = (e) => e.checked === true;

function editLine(e) {
  const { target } = e;
  const text = target.nextElementSibling;

  (isChecked(target)) ? text.classList.add('text-decoration-line-through') 
                      : text.classList.remove('text-decoration-line-through');
}

for (let i = 0; i < 4; i++) {
  (0,_constructor__WEBPACK_IMPORTED_MODULE_0__.addLine)();
};

listItems.forEach((e) => e.addEventListener('change', editLine));


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL21haW4uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQW9DO0FBQ3BDO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsNkNBQVE7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNwQ3dDO0FBQ3hDO0FBQ0E7O0FBRU87QUFDUCxVQUFVLFNBQVM7QUFDbkI7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixPQUFPO0FBQ3ZCLEVBQUUscURBQU87QUFDVDs7QUFFQTs7Ozs7OztVQ2hCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2Fzc2V0cy9zY3JpcHQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGVkaXRMaW5lIH0gZnJvbSBcIi4vc2NyaXB0XCI7XHJcbmNvbnN0IHVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndWwjbGlzdEl0ZW1zJyk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkTGluZSAoKSB7XHJcbiAgLy8gbGlzdCBpdGVtc1xyXG4gIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICBjb25zdCBjb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY29kZScpO1xyXG4gIGNvbnN0IGJ0bkVkaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICBjb25zdCBidG5EZWxldGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcbiAgLy9zdHlsaW5nIG9iamVjdHNcclxuICBjaGVja2JveC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XHJcbiAgY2hlY2tib3guY2xhc3NMaXN0LmFkZCgnZm9ybS1jaGVjay1pbnB1dCcsICdtZS0zJyk7XHJcbiAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJyxlZGl0TGluZSk7XHJcblxyXG4gIGxpLmNsYXNzTGlzdC5hZGQoJ2xpc3QtZ3JvdXAtaXRlbScsJ2QtZmxleCcsJ2FsaWduLWl0ZW1zLWNlbnRlcicsICdnYXAtMScpO1xyXG4gIHRleHQuY2xhc3NMaXN0LmFkZCgnZmxleC1maWxsJyk7XHJcbiAgY29kZS5jbGFzc0xpc3QuYWRkKCdzbWFsbCcsICd0ZXh0LW11dGVkJyk7XHJcbiAgYnRuRWRpdC5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLXdhcm5pbmcnKTtcclxuICBidG5EZWxldGUuY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2J0bi1kYW5nZXInKTtcclxuXHJcbiAgLy8gZmlsbGluZyBlbGVtZW50cyBjb250ZW50XHJcbiAgdGV4dC50ZXh0Q29udGVudCA9ICdUb2RvIDQnO1xyXG4gIGNvZGUudGV4dENvbnRlbnQgPSAnUHJvamVjdCA1JztcclxuICBidG5FZGl0LnRleHRDb250ZW50ID0gJ0VkaXQnO1xyXG4gIGJ0bkRlbGV0ZS50ZXh0Q29udGVudCA9ICdEZWxldGUnO1xyXG5cclxuICBsaS5hcHBlbmRDaGlsZChjaGVja2JveCk7XHJcbiAgbGkuYXBwZW5kQ2hpbGQodGV4dCk7XHJcbiAgbGkuYXBwZW5kQ2hpbGQoY29kZSk7XHJcbiAgbGkuYXBwZW5kQ2hpbGQoYnRuRWRpdCk7XHJcbiAgbGkuYXBwZW5kQ2hpbGQoYnRuRGVsZXRlKTtcclxuXHJcbiAgdWwuYXBwZW5kQ2hpbGQobGkpO1xyXG59IiwiaW1wb3J0IHsgYWRkTGluZSB9IGZyb20gXCIuL2NvbnN0cnVjdG9yXCI7XG5jb25zdCBsaXN0SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjbGlzdEl0ZW1zID4gbGknKTtcbmNvbnN0IGlzQ2hlY2tlZCA9IChlKSA9PiBlLmNoZWNrZWQgPT09IHRydWU7XG5cbmV4cG9ydCBmdW5jdGlvbiBlZGl0TGluZShlKSB7XG4gIGNvbnN0IHsgdGFyZ2V0IH0gPSBlO1xuICBjb25zdCB0ZXh0ID0gdGFyZ2V0Lm5leHRFbGVtZW50U2libGluZztcblxuICAoaXNDaGVja2VkKHRhcmdldCkpID8gdGV4dC5jbGFzc0xpc3QuYWRkKCd0ZXh0LWRlY29yYXRpb24tbGluZS10aHJvdWdoJykgXG4gICAgICAgICAgICAgICAgICAgICAgOiB0ZXh0LmNsYXNzTGlzdC5yZW1vdmUoJ3RleHQtZGVjb3JhdGlvbi1saW5lLXRocm91Z2gnKTtcbn1cblxuZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgYWRkTGluZSgpO1xufTtcblxubGlzdEl0ZW1zLmZvckVhY2goKGUpID0+IGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZWRpdExpbmUpKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI3Myk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=