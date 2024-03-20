/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import './style.scss';
import todoList from './core';
import { populateStorage, restoreStorage } from './JSONFunctions';
import uiEditItem, { editMore } from './uiAddItemConstructor';
import { fastSave, uiControl } from './uiControls';
import {
  clearContent,
  showPlusBtn,
  addField,
  addTask,
  input,
  addMore,
  quickSave,
} from './uiFunctions';

addTask.addEventListener('click', uiEditItem);

// adiciona evento pra quando se começa a digitar
// e quando se para de digitar o título do item.
addField.addEventListener('keydown', showPlusBtn);
addField.addEventListener('keyup', showPlusBtn);
addMore.addEventListener('click', () => editMore(input));
quickSave.addEventListener('click', () => fastSave(input));

input.addEventListener('change', populateStorage);
input.setAttribute('autocomplete', 'off');
// input.addEventListener('change', populateStorage);
// input.setAttribute('autocomplete', 'off');
window.onload = restoreStorage();

const mainModal = document.querySelector('div#exampleModal');
mainModal.addEventListener('hidden.bs.modal', () => {
  const modalBody = mainModal.querySelector('.modal-body');
  clearContent(modalBody);
});

// tests
// console.log(todoList.getLength());
// todoList.addItem('Item 1');
// todoList.addItem('item 2');
// todoList.addItem('item 3');
// todoList.addItem('Item 4');
// todoList.selectItem(0).editProject('Projeto 1');
// todoList.selectItem(1).editProject('Projeção');
// todoList.selectItem(2).editProject('Projota');
// todoList.selectItem(2).addNote(`
//   <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element.
//   These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables.
//   It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
// `);

// todoList.setChecked(2);
// todoList.selectItem(4).editProject('Projota');
uiControl.load();
