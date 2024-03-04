import './style.scss';
import { populate } from "./getJSON";

export const todoList = [];
const listItems = document.querySelector('.accordion-header > input[type=checkbox]');
const isChecked = (e) => e.checked === true;

export function editLine(e) {
  const { target } = e;
  const text = target.nextElementSibling;
  (isChecked(target)) ? text.classList.add('text-decoration-line-through') 
                      : text.classList.remove('text-decoration-line-through');

  e.stopPropagation();
}

// populate();

listItems.addEventListener('change', editLine);
