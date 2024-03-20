import todoList from './core';
import { uiControl } from './uiControls';
import {
  dueDateMask,
  searchProjects,
  createElement,
  createPrioritySelect,
} from './uiFunctions';
/* eslint-disable no-unused-vars */

function save(title, dueDate, priority, project) {
  todoList.addItem(title.value, dueDate.value, priority.value, project.value);
  uiControl.update();
}
function uiEditItem() {
  const modal = document.querySelector('div.modal-body');
  // creating elements
  const row1 = createElement('div', ['row']);
  const titleDiv = createElement('div', ['input-group', 'mb-3', 'gap-1']);
  const titleInput = createElement('input', ['form-control'], {
    id: 'itemTitle',
    type: 'text',
    placeholder: 'Nova Tarefa...',
  });
  const row2 = createElement('div', ['bg-gray', 'row', 'g-0', 'gap-2', 'flex-nowrap']);

  const dateDiv = createElement('div', ['date', 'flatpickr', 'col']);
  const dateInput = createElement('input', ['form-control', 'flatpickr-input'], {
    id: 'dueDate',
    type: 'text',
    inputmode: 'numeric',
    'data-input': undefined,
    autocomplete: 'off',
  });
  const datepickerToggle = createElement('a', ['input-button'], {
    title: 'toggle',
    'data-toggle': undefined,
  });
  const dateIcon = createElement('i', ['text-warning', 'small', 'bi', 'bi-calendar']);

  const priorityDiv = createElement('div', ['col']);
  const selectPriority = createPrioritySelect();

  const projectDiv = createElement('div', ['col']);
  const projectInput = createElement('input', ['form-control'], {
    id: 'enterProject',
    type: 'text',
    list: 'datalistOptions',
    placeholder: 'Projeto',
    autocomplete: 'off',
  });
  const projectDatalist = createElement('datalist', ['suggestions', 'form'], {
    id: 'datalistOptions',
    dropzone: 'string',
  });

  const row3 = createElement('div', ['row', 'pt-2']);

  const notesContainer = createElement('div', ['container']);
  const notesHeader = createElement('h6');
  const notesRow = createElement('div', ['row', 'g-2']);

  const addNoteRow = createElement('div', ['row', 'pt-2', 'justify-content-end']);

  const addNoteDiv = createElement('div', ['col-auto', 'small', 'text-danger', 'text-warning-emphasis']);
  const addNoteLink = createElement('a', [], { id: 'addNote' });
  const addNoteIcon = createElement('i', ['bi', 'bi-plus-circle']);
  const addNoteText = createElement('span');

  const row4 = createElement('div', ['row', 'g-2', 'pt-3', 'justify-content-start', 'flex-row-reverse']);

  const saveDiv = createElement('div', ['col-auto']);
  const saveBtn = createElement('button', ['btn', 'btn-warning', 'text-light'], {
    'data-bs-dismiss': 'modal',
  });
  const cancelDiv = createElement('div', ['col-auto']);
  const cancelBtn = createElement('button', ['btn', 'btn-secondary', 'text-light'], {
    'data-bs-dismiss': 'modal',
  });

  // append elements

  // row 1 (title)
  titleDiv.appendChild(titleInput);

  row1.appendChild(titleDiv);

  // row 2 (date, priority, project)

  // date
  datepickerToggle.appendChild(dateIcon);
  dateDiv.append(dateInput, datepickerToggle);

  // priority
  priorityDiv.appendChild(selectPriority);

  // project
  projectDiv.append(projectInput, projectDatalist);

  row2.append(dateDiv, priorityDiv, projectDiv);

  // row3 (notes area)
  notesHeader.textContent = 'Notas';
  addNoteText.textContent = 'Nova nota';
  addNoteIcon.textContent = ' '; // fixing a problem for using js

  addNoteLink.append(addNoteIcon, addNoteText);
  addNoteDiv.appendChild(addNoteLink);
  addNoteRow.appendChild(addNoteDiv);
  notesRow.appendChild(addNoteRow);
  notesContainer.append(notesHeader, notesRow);

  row3.appendChild(notesContainer);

  // row4 (buttons)
  cancelBtn.textContent = 'Cancel';
  saveBtn.textContent = 'Save';
  saveBtn.addEventListener('click', () => save(titleInput, dateInput, projectInput, projectInput));
  saveDiv.appendChild(saveBtn);
  cancelDiv.appendChild(cancelBtn);

  row4.append(saveDiv, cancelDiv);

  modal.append(row1, row2, row3, row4);
  dueDateMask();
  searchProjects();
}

export default uiEditItem;
