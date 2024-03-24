/* eslint-disable import/no-cycle */
import {
  addChecked, createElement, hasNotes, isChecked, list,
} from './uiCommonFunctions';
import uiControl from './uiController';

function insertNote(notes, body) {
  notes.forEach((content) => {
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = content;
    body.appendChild(contentDiv);
  });
}

function addLine(obj) {
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
  const priority = (() => {
    switch (parseInt(obj.priority, 10)) {
      case 1:
        return createElement('i', ['me-2', 'bi', 'bi-flag-fill', 'text-success'], {
          'data-toggle': 'tooltip',
          'data-placement': 'top',
          title: 'Priority 1',
        });
      case 2:
        return createElement('i', ['me-2', 'bi', 'bi-flag-fill', 'text-warning'], {
          'data-toggle': 'tooltip',
          'data-placement': 'top',
          title: 'Priority 2',
        });
      case 3:
        return createElement('i', ['me-2', 'bi', 'bi-flag-fill', 'text-danger'], {
          'data-toggle': 'tooltip',
          'data-placement': 'top',
          title: 'Priority 3',
        });
      default:
        return createElement('i', ['me-2', 'bi', 'bi-flag'], {
          'data-toggle': 'tooltip',
          'data-placement': 'top',
          title: 'Priority 0',
        });
    }
  })();
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
  checkbox.addEventListener('change', uiControl.handlers.setCheckedHandler);

  // FILLING CONTENT
  // header
  span.textContent = obj.title;
  code.textContent = obj.project;

  // body
  btnEdit.textContent = 'Edit';
  btnDelete.textContent = 'Delete';

  // Appending content
  btnHeader.append(span, priority, code);
  header.append(checkbox, btnHeader);

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
  if (isChecked(obj)) addChecked(checkbox, btnHeader);
}

export default addLine;
