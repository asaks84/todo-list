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

function editMore(title) {
  uiEditItem(title);
  title.value = '';
}
function fastSave(title) {
  todoList.addItem(title.value);
  uiControl.update();
  populateStorage();
}

function setMaxHeight() {
  const list = document.getElementById('list');
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
    list.style.maxHeight = `${maxHeight}px`;
  } else list.style.maxHeight = 'none';
}

const projectsIcon = document.querySelector('div#projects');
const projectsDropdown = document.querySelector('div#projects div');

projectsIcon.addEventListener('click', (event) => {
  // event.stopPropagation();

  if (projectsDropdown.classList.contains('menu-hide')) {
    projectsDropdown.classList.remove('menu-hide');
  } else {
    projectsDropdown.classList.add('menu-hide');
  }
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('#projects')) {
    projectsDropdown.classList.add('menu-hide');
  }
});

addTask.addEventListener('click', uiEditItem);
addField.addEventListener('keydown', showPlusBtn);
addField.addEventListener('keyup', showPlusBtn);
addMore.addEventListener('click', () => editMore(input));
quickSave.addEventListener('click', () => fastSave(input));

window.addEventListener('change', () => {
  populateStorage();
  uiControl.update();
  console.log('atualizou');
});
window.onload = restoreStorage();

const mainModal = document.querySelector('div#exampleModal');
mainModal.addEventListener('hidden.bs.modal', () => {
  const modalBody = mainModal.querySelector('.modal-body');
  clearContent(modalBody);
});

window.addEventListener('load', setMaxHeight);
window.addEventListener('resize', setMaxHeight);

uiControl.load();
