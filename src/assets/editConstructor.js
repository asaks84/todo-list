/* eslint-disable import/no-cycle */
import todoList from './core';
import {
  createElement,
  createPrioritySelect,
  dueDateMask,
  searchProjects,
  mainModal,
  clearContent,
} from './uiCommonFunctions';
import uiControl from './uiController';

function save(title, dueDate, priority, project, notes, id) {
  const newObj = {
    title: title.value,
    dueDate: dueDate.value,
    priority: priority.value,
    project: project.value,
    notes,
  };
  if (id !== undefined) {
    todoList.editItem(id, newObj);
  } else {
    todoList.addItem(newObj);
  }
  uiControl.update();
}

function deleteNote(id, noteIndex) {
  console.log('ID:', id);
  console.log('Note Index:', noteIndex);
  todoList.deleteNote(id, noteIndex);
  clearContent(mainModal.querySelector('.modal-body'));
  const obj = todoList.getItem(id);
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
  const row1 = createElement('div', ['row']);
  const titleDiv = createElement('div', ['input-group', 'mb-3', 'gap-1']);
  const titleInput = createElement('input', ['form-control'], {
    id: 'itemTitle',
    type: 'text',
    placeholder: 'Nova Tarefa...',
  });
  const row2 = createElement(
    'div',
    ['bg-gray', 'row', 'g-0', 'gap-2', 'flex-nowrap'],
  );

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
  const prioritySelect = createPrioritySelect(priority);

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
  const notesList = createElement('ul', ['list-unstyled']);

  const addNoteRow = createElement('div', ['row', 'pt-2', 'justify-content-end']);

  const addNoteDiv = createElement('div', ['col-auto', 'small', 'text-danger', 'text-warning-emphasis']);
  const addNoteLink = createElement('a', [], { id: 'addNote' });
  const addNoteIcon = createElement('i', ['bi', 'bi-plus-circle']);
  const addNoteText = createElement('span');

  const row4 = createElement('div', ['row', 'g-2', 'pt-3', 'justify-content-start', 'flex-row-reverse']);

  const saveDiv = createElement('div', ['col-auto']);
  const saveBtn = createElement('button', ['btn', 'btn-warning'], {
    'data-bs-dismiss': 'modal',
  });
  const cancelDiv = createElement('div', ['col-auto']);
  const cancelBtn = createElement('button', ['btn', 'btn-secondary', 'text-light'], {
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
      const listItem = createElement('li');
      const deleteLink = createElement('a');
      const deleteIcon = createElement('i', ['bi', 'bi-trash3']);
      const text = createElement('span');

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
  dueDateMask();
  searchProjects();
}

export default uiEditItem;
