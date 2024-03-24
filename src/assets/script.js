/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import './style.scss';
import { populateStorage, restoreStorage } from './JSONFunctions';

import {
  clearContent,
  showPlusBtn,
  addField,
  addTask,
  input,
  addMore,
  quickSave,
  list,
} from './uiCommonFunctions';
import uiEditItem from './editConstructor';
import { editMore, fastSave } from './handlers';
import uiControl from './uiController';

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
    list.style.maxHeight = `${maxHeight}px`;
  } else list.style.maxHeight = 'none';
}

// eventListeners

// home page button functions
addTask.addEventListener('click', uiEditItem);
addField.addEventListener('keydown', showPlusBtn);
addField.addEventListener('keyup', showPlusBtn);
addMore.addEventListener('click', () => editMore(input));
quickSave.addEventListener('click', () => fastSave(input));

// set height limit for list items
window.addEventListener('load', setMaxHeight);
window.addEventListener('resize', setMaxHeight);

// auto-save
window.addEventListener('change', () => {
  uiControl.update();
});

// restore data when it's loaded
window.onload = restoreStorage();

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
  clearContent(mainModal.querySelector('.modal-body'));
});

// start app
uiControl.load();
