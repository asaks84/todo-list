/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import './style.scss';
import todoList from './core';
import { populateStorage, restoreStorage } from './JSONFunctions';
import uiEditItem from './uiAddItemConstructor';
import uiControl from './uiControls';
import {
  clearContent,
  showPlusBtn,
  addField,
  addTask,
  input,
  addMore,
  quickSave,
} from './uiFunctions';

const mainContent = document.querySelector('body');

function editMore(title) {
  uiEditItem(title);
  title.value = '';
}
function fastSave(title) {
  todoList.addItem(title.value);
  uiControl.update();
  populateStorage();
}

addTask.addEventListener('click', uiEditItem);

// adiciona evento pra quando se começa a digitar
// e quando se para de digitar o título do item.
addField.addEventListener('keydown', showPlusBtn);
addField.addEventListener('keyup', showPlusBtn);
addMore.addEventListener('click', () => editMore(input));
quickSave.addEventListener('click', () => fastSave(input));

window.addEventListener('change', () => {
  populateStorage();
  uiControl.update();
  console.log('atualizou');
});
input.setAttribute('autocomplete', 'off');
window.onload = restoreStorage();

const mainModal = document.querySelector('div#exampleModal');
mainModal.addEventListener('hidden.bs.modal', () => {
  const modalBody = mainModal.querySelector('.modal-body');
  clearContent(modalBody);
});
uiControl.load();
