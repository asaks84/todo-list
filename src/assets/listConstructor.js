/* eslint-disable import/no-cycle */
import todoList from './core';
import {
  createElement, hasNotes, isChecked, list,
} from './uiCommonFunctions';
import uiControl from './uiController';

function insertNote(notes, body) {
  notes.forEach((content) => {
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = content;
    body.appendChild(contentDiv);
  });
}

function addChecked(checkbox, button, priority) {
  checkbox.checked = true;
  button.classList.add('text-decoration-line-through', 'opacity-50');
  priority.classList.add('opacity-50');
}

function setCheckedHandler(e) {
  const { target } = e;
  const id = target.getAttribute('data-id');
  todoList.setChecked(id);
}

const prioritySettings = {
  0: { title: 'No priority', array: ['bi-octagon'] },
  1: { title: 'Priority 1', array: ['bi-exclamation-octagon-fill', 'text-success'] },
  2: { title: 'Priority 2', array: ['bi-exclamation-octagon-fill', 'text-warning'] },
  3: { title: 'Priority 3', array: ['bi-exclamation-octagon-fill', 'text-danger'] },
};

function selectPriority(num) {
  const obj = prioritySettings[num];
  const standardClasses = ['small', 'ms-2', 'bi'];
  const classes = standardClasses.concat(obj.array);
  const attrs = { 'data-toggle': 'tooltip', 'data-placement': 'top' };
  attrs.title = obj.title;

  return createElement('i', classes, attrs);
}

function addLine(obj) {
  // header
  const item = createElement('div', ['accordion-item']);
  const header = createElement('div', ['accordion-header', 'p-1', 'd-flex', 'align-items-center', 'gap-1']);
  const checkbox = createElement('input', ['form-check-input', 'text-bg-warning'], {
    type: 'checkbox',
    'data-id': `${obj.id}`,
  });
  const btnHeader = createElement('button', ['accordion-button', 'collapsed', 'flex-fill'], {
    type: 'button',
    'data-bs-toggle': 'collapse',
    'aria-expanded': 'false',
    'data-bs-target': `#item-${obj.id}`,
  });
  const priority = selectPriority(parseInt(obj.priority, 10));
  const span = createElement('span', ['flex-fill']);
  const code = createElement('code', ['small', 'text-muted']);

  // body
  const itemDetails = createElement('div', ['accordion-collapse', 'collapse'], {
    id: `item-${obj.id}`,
    'data-bs-parent': '#list',
  });
  const itemBody = createElement('div', ['accordion-body']);
  const editDeleteItem = createElement('div', ['d-flex', 'flex-row-reverse', 'col', 'gap-2']);

  const btnEdit = createElement('button', ['btn', 'btn-warning'], {
    'data-id': obj.id,
    'data-bs-target': '#exampleModal',
    'data-bs-toggle': 'modal',
  });
  const btnDelete = createElement('button', ['btn', 'btn-danger'], {
    'data-id': obj.id,
  });

  // EVENTLISTNERS OBJECTS
  checkbox.addEventListener('change', setCheckedHandler);

  // FILLING CONTENT
  // header
  span.textContent = obj.title;
  code.textContent = obj.project;

  // body
  btnEdit.textContent = 'Edit';
  btnDelete.textContent = 'Delete';

  // Appending content
  btnHeader.append(span, code);
  header.append(checkbox, priority, btnHeader);

  // Body content
  if (hasNotes(obj.notes)) {
    insertNote(obj.notes, itemBody);
  }
  btnEdit.addEventListener('click', (elem) => {
    uiControl.handlers.edit(elem);
  });
  btnDelete.addEventListener('click', uiControl.handlers.deleteItem);
  editDeleteItem.append(btnDelete, btnEdit);
  itemBody.appendChild(editDeleteItem);
  itemDetails.appendChild(itemBody);

  // Append elements to list
  item.append(header, itemDetails);
  list.appendChild(item);
  if (isChecked(obj)) addChecked(checkbox, btnHeader, priority);
}

export default addLine;
