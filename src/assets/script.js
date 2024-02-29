import './data.json'
import { populate } from "./getJSON";

export const todoList = [];
const listItems = document.querySelectorAll('#listItems > li');
const isChecked = (e) => e.checked === true;

export function editLine(e) {
  const { target } = e;
  const text = target.nextElementSibling;

  (isChecked(target)) ? text.classList.add('text-decoration-line-through') 
                      : text.classList.remove('text-decoration-line-through');
}

populate();

listItems.forEach((e) => e.addEventListener('change', editLine));
