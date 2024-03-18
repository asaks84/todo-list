import { createElement, createPrioritySelect } from './uiFunctions';
/* eslint-disable no-unused-vars */

function uiEditItem() {
  // creating elements
  const row1 = createElement('div', ['row']);

  const titleDiv = createElement('div', ['input-group', 'mb-3', 'gap-1']);
  const titleInput = createElement('input', ['form-control'], {
    id: 'itemTitle',
    type: 'text',
    placeholder: 'Nova Tarefa...',
  });

  const row2 = createElement('div', ['bg-gray', 'row', 'g-0', 'gap-2', 'flex-nowrap']);

  const dateDiv = createElement('div', 'flatpickr', 'col');
  const dateInput = createElement('div', ['form-control'], {
    id: 'duedate',
    type: 'text',
    inputmode: 'numeric',
  });
  const datepickerToggle = createElement('a', ['input-bottom'], {
    title: 'toggle',
    'data-toggle': undefined,
  });
  const iconDate = createElement('i', ['text-warning', 'small', 'bi', 'bi-calendar']);

  const priorityDiv = createElement('div', ['col']);
  const selectPriority = createPrioritySelect();

  const projectDiv = createElement('div', ['col']);
  const inputProject = createElement('input', ['form-control'], {
    type: 'text',
    list: 'datalistOptions',
    placeholder: 'Projeto',
  });
  const datalistProject = createElement('datalist', ['suggestions', 'form'], {
    id: 'datalistOptions',
    dropzone: 'string',
  });

  const row3 = createElement('div', ['row', 'pt-2']);

  const notesContainer = createElement('div', ['container']);
  const notesHeader = createElement('h6');
  const notesRow = createElement('div', ['row', 'g-2']);

  const row4 = createElement('div', ['row', 'pt-2', 'justify-content-end']);
  const addNoteDiv = createElement('div', ['col-auto', 'small', 'text-danger', 'text-warning-emphasis']);
  const addNoteLink = createElement('a', [], { id: 'addNote' });
  const addNoteIcon = createElement('i', ['bi', 'bi-plus-circle']);
  const addNoteText = createElement('span');

  const row5 = createElement('div', ['row', 'g-2', 'pt-3', 'justify-content-start', 'flex-row-reverse']);

  const saveDiv = createElement('div', ['col-auto']);
  const saveBtn = createElement('button', ['btn', 'btn-warning', 'text-light'], {
    id: 'saveItem',
    'data-bs-dismiss': 'modal',
  });
  const cancelDiv = createElement('div', ['col-auto']);
  const cancelBtn = createElement('button', ['btn', 'btn-warning', 'text-light'], {
    id: 'saveItem',
    'data-bs-dismiss': 'modal',
  });
}

export default uiEditItem;
