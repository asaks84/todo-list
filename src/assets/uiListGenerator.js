const list = document.querySelector('div#list');
const isChecked = (e) => e.checked === true;
const hasNotes = (obj) => obj.length > 0;

function setChecked(e) {
  const { target } = e;
  const text = target.nextElementSibling;
  if (isChecked(target)) {
    text.classList.add('text-decoration-line-through');
  } else {
    text.classList.remove('text-decoration-line-through');
  }
}

function insertNote(notes, body) {
  notes.forEach((content) => {
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = content;
    body.appendChild(contentDiv);
  });
}

function setAttrs(elem, attrs) {
  Object.keys(attrs).forEach((key) => {
    elem.setAttribute(key, attrs[key]);
  });
}

function addLine(obj, num) {
  // LIST ITEM ------

  // header
  const item = document.createElement('div');
  const header = document.createElement('h2');
  const checkbox = document.createElement('input');
  const btnHeader = document.createElement('button');
  const code = document.createElement('code');
  const span = document.createElement('span');

  // body
  const itemDetails = document.createElement('div');
  const itemBody = document.createElement('div');

  const btnEdit = document.createElement('button');
  const btnDelete = document.createElement('button');

  // STYLING OBJECTS

  // header
  checkbox.setAttribute('type', 'checkbox');
  checkbox.classList.add('form-check-input');
  checkbox.addEventListener('change', setChecked);

  item.classList.add('accordion-item');
  setAttrs(item, {
    'data-position': `${num}`,
  });

  header.classList.add('accordion-header', 'p-1', 'd-flex', 'align-items-center', 'gap-1');
  btnHeader.classList.add('accordion-button', 'collapsed', 'flex-fill');
  span.classList.add('flex-fill');

  setAttrs(btnHeader, {
    // eslint-disable-next-line quote-props
    'type': 'button',
    'data-bs-toggle': 'collapse',
    'aria-expanded': 'false',
    'data-bs-target': `#item-${num}`,
  });
  code.classList.add('small', 'text-muted');

  // body
  itemDetails.classList.add('accordion-collapse', 'collapse');
  itemDetails.setAttribute('id', `item-${num}`);
  itemBody.classList.add('accordion-body');

  btnEdit.classList.add('btn', 'btn-warning');
  btnDelete.classList.add('btn', 'btn-danger');

  // FILLING CONTENT
  // header
  span.textContent = obj.text;
  code.textContent = obj.project;

  // body
  btnEdit.textContent = 'Edit';
  btnDelete.textContent = 'Delete';

  // Appending content
  btnHeader.appendChild(span);
  btnHeader.appendChild(code);
  header.appendChild(checkbox);
  header.appendChild(btnHeader);

  // body content
  if (hasNotes(obj.notes)) {
    insertNote(obj.notes, itemBody);
  }
  itemDetails.appendChild(itemBody);

  item.appendChild(header);
  item.appendChild(itemDetails);

  list.appendChild(item);
}
export default addLine;
