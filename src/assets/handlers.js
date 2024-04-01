/* eslint-disable import/no-cycle */
import todoList from './core';
import uiEditItem from './editConstructor';
import uiControl from './uiController';

// home buttons
export function editMore(title) {
  uiEditItem(title);
  title.value = '';
}

export function fastSave(title) {
  const newObj = { title: title.value };
  todoList.addItem(newObj);
  title.value = '';
  uiControl.update();
}

export function edit(elem) {
  elem.stopImmediatePropagation();
  const { target } = elem;
  const obj = todoList.getItem(target.getAttribute('data-id'));
  uiEditItem(
    obj.title,
    obj.dueDate,
    obj.priority,
    obj.project,
    obj.notes,
    obj.id,
  );
}

export function deleteItem(item) {
  const { target } = item;
  todoList.deleteItem(target.getAttribute('data-id'));
  uiControl.update();
}
