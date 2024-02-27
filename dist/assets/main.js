/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./src/assets/script.js ***!
  \******************************/
const listItems = document.querySelectorAll('#listItems > li');
const isChecked = (e) => e.checked === true;

function editLine(e) {
  const { target } = e;
  const text = target.nextElementSibling;

  (isChecked(target)) ? text.classList.add('text-decoration-line-through') 
                      : text.classList.remove('text-decoration-line-through');
}

listItems.forEach((e) => e.addEventListener('change', editLine));

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL21haW4uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBOztBQUVBO0FBQ0EsVUFBVSxTQUFTO0FBQ25COztBQUVBO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hc3NldHMvc2NyaXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGxpc3RJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNsaXN0SXRlbXMgPiBsaScpO1xuY29uc3QgaXNDaGVja2VkID0gKGUpID0+IGUuY2hlY2tlZCA9PT0gdHJ1ZTtcblxuZnVuY3Rpb24gZWRpdExpbmUoZSkge1xuICBjb25zdCB7IHRhcmdldCB9ID0gZTtcbiAgY29uc3QgdGV4dCA9IHRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgKGlzQ2hlY2tlZCh0YXJnZXQpKSA/IHRleHQuY2xhc3NMaXN0LmFkZCgndGV4dC1kZWNvcmF0aW9uLWxpbmUtdGhyb3VnaCcpIFxuICAgICAgICAgICAgICAgICAgICAgIDogdGV4dC5jbGFzc0xpc3QucmVtb3ZlKCd0ZXh0LWRlY29yYXRpb24tbGluZS10aHJvdWdoJyk7XG59XG5cbmxpc3RJdGVtcy5mb3JFYWNoKChlKSA9PiBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGVkaXRMaW5lKSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=