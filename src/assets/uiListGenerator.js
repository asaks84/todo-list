/* eslint-disable no-param-reassign */
import { populateStorage } from './JSONFunctions';
import {
  isChecked,
  createElement,
  setLineThrough,
} from './uiFunctions';

import todoList from './core';

const list = document.querySelector('div#list');
const hasNotes = (obj) => obj.length > 0;

function addChecked(checkbox, button) {
  checkbox.checked = true;
  button.classList.add('text-decoration-line-through');
}

function insertNote(notes, body) {
  notes.forEach((content) => {
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = content;
    body.appendChild(contentDiv);
  });
}

function setCheckedHandler(e) {
  const { target } = e;
  const id = target.getAttribute('data-id');
  console.log(id);
  todoList.setChecked(id);
  setLineThrough(target);
}

function addLine(obj) {
  // LIST ITEM ------

  // header
  const item = createElement('div', ['accordion-item']);
  const header = createElement('h2', ['accordion-header', 'p-1', 'd-flex', 'align-items-center', 'gap-1']);
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
  const span = createElement('span', ['flex-fill']);
  const code = createElement('code', ['small', 'text-muted']);

  // body
  const itemDetails = createElement('div', ['accordion-collapse', 'collapse'], {
    id: `item-${obj.id}`,
  });
  const itemBody = createElement('div', ['accordion-body']);

  const btnEdit = createElement('button', ['btn', 'btn-warning']);
  const btnDelete = createElement('button', ['btn', 'btn-danger']);

  // EVENTLISTNERS OBJECTS
  checkbox.addEventListener('change', setCheckedHandler);
  checkbox.addEventListener('change', populateStorage);

  // FILLING CONTENT
  // header
  span.textContent = obj.title;
  code.textContent = obj.project;

  // body
  btnEdit.textContent = 'Edit';
  btnDelete.textContent = 'Delete';

  // Appending content
  btnHeader.append(span, code);
  header.append(checkbox, btnHeader);

  // Body content
  if (hasNotes(obj.notes)) {
    insertNote(obj.notes, itemBody);
  }
  itemDetails.appendChild(itemBody);

  // Append elements to list
  item.append(header, itemDetails);
  list.appendChild(item);
  if (isChecked(obj)) addChecked(checkbox, btnHeader);
}
export default addLine;
