import todoList from './core';
// import addLine from './uiListGenerator';

export function populateStorage() {
  localStorage.setItem('data', todoList.toJSON());
}

export function restoreStorage() {
  if (localStorage.getItem('data') === null) return;
  todoList.restore(localStorage.getItem('data'));
}
