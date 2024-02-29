import { editLine } from "./script";
const ul = document.querySelector('ul#listItems');

export function addLine (obj) {
  // list items
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  const text = document.createElement('span');
  const code = document.createElement('code');
  const btnEdit = document.createElement('button');
  const btnDelete = document.createElement('button');

  //styling objects
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add('form-check-input', 'me-3');
  checkbox.addEventListener('change',editLine);

  li.classList.add('list-group-item','d-flex','align-items-center', 'gap-1');
  text.classList.add('flex-fill');
  code.classList.add('small', 'text-muted');
  btnEdit.classList.add('btn', 'btn-warning');
  btnDelete.classList.add('btn', 'btn-danger');

  // filling elements content
  text.textContent = obj.text;
  code.textContent = obj.project;
  btnEdit.textContent = 'Edit';
  btnDelete.textContent = 'Delete';

  li.appendChild(checkbox);
  li.appendChild(text);
  li.appendChild(code);
  li.appendChild(btnEdit);
  li.appendChild(btnDelete);

  ul.appendChild(li);
}