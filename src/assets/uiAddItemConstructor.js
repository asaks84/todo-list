import { setAttrs } from './uiFunctions';

/* eslint-disable no-unused-vars */
const div = document.createElement('div');
const input = document.createElement('input');
const btn = document.createElement('button');
const aIcon = document.createElement('a');
const icon = document.createElement('i');
const span = document.createElement('span');
const select = document.createElement('select');
const option = document.createElement('option');
const h6 = document.createElement('h6');
const datalist = document.createElement('datalist');

function uiEditItem() {
  // lines

  // element groups
  const row1 = div; // title

  // Task title
  const titleDiv = div;
  const titleInput = input;

  const row2 = div; // dueDate, priority, propject

  // due date
  const divDate = div;
  const duedate = input;
  const aCalendar = aIcon;
  const iconCalendar = icon;

  // priority
  const priorityDiv = div;
  const selectPriority = select;
  for (let i = 0; i < 4; i += 1) {
    const priorItem = option;
    priorItem.setAttribute('value', i);
    if (i === 0) {
      priorItem.textContent = 'Prioridade';
      priorItem.setAttribute('selected');
    } else { priorItem.textContent = `Prioridade + ${i}`; }
    selectPriority.appendChild(priorItem);
  }

  // project
  const divProject = div;
  const inputProject = input;
  const datalistProject = datalist;

  // notes
  const container = div;
  const notesHeader = h6;

  const notesGroup = div;

  const row3 = div; // notes list

  // list notes items
  const noteBlock = div;
  const noteContent = div;
  const divEditNote = div;
  const editLink = aIcon;
  const editIcon = icon;
  const editText = span;

  // add new note
  const addNoteBlock = div;
  const addNoteContent = div;
  const addNoteLink = aIcon;
  const addNoteIcon = icon;
  const addNoteText = span;

  const row4 = div; // Save and Cancel

  // Buttons
  const saveBlock = div;
  const saveBtn = btn;
  const cancelBlock = div;
  const cancelBtn = btn;

  // STYLING ITEMS

  row1.classList.add('row');
  row2.classList.add('row', 'g-0', 'gap-2', 'bg-gray', 'flex-nowrap');
  row3.classList.add('row', 'pt-2');
  row4.classList.add('g-2', 'pt-3', 'justify-content-start', 'flex-row-reverse');

  titleDiv.classList.add('input-group', 'mb-3', 'gap-1');
  titleInput.classList.add('form-control');
  setAttrs(titleInput, {
    id: 'itemTitle',
    type: 'text',
    placeholder: 'Nova Tarefa...',
  });

  divDate.classList.add('date', 'flatpickr', 'col');
  duedate.classList.add('form-control');
  setAttrs(duedate, {
    id: 'dueDate',
    type: 'text',
    inputmode: 'numeric',
  });
  duedate.setAttribute('data-input');
  aCalendar.classList.add('input-button');
  aCalendar.setAttribute('data-toggle');
  aCalendar.setAttribute('title', 'toggle');
  iconCalendar.classList.add('text-warning', 'small', 'bi', 'bi-calendar');

  priorityDiv.classList.add('priority', 'col');
  selectPriority.classList.add('form-select');
  selectPriority.setAttribute('aria-label', 'Prioridade');

  divProject.classList.add('project', 'col');
  inputProject.classList.add('form-control');
  setAttrs(inputProject, {
    type: 'text',
    list: 'datalistOptions',
    placeholder: 'Projeto',
  });
  datalistProject.classList.add('suggestions', 'form');
  setAttrs(datalistProject, {
    id: 'datalistOptions',
    dropzone: 'string',
  });
}
