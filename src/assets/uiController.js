/* eslint-disable import/no-cycle */
import { populateStorage } from './JSONFunctions';
import todoList from './core';
import uiEditItem from './editConstructor';
import addLine from './listConstructor';
import {
  clearContent,
  list,
  sortParam,
  loadList,
  setLineThrough,
} from './uiCommonFunctions';

// UI Controller

const uiControl = (() => {
  let currentFilter = null;

  function setCurrentFilter(key, value) {
    if (typeof key !== 'undefined') currentFilter = { key, value };
    else currentFilter = null;
  }

  const filterArray = (arr, filter, value) => {
    if (filter) return [...arr.filter((objeto) => objeto[filter] === value)];
    return arr;
  };

  function load() {
    const uiList = sortParam(loadList(), 'checked');
    if (currentFilter !== null) {
      filterArray(uiList, currentFilter.key, currentFilter.value)
        .forEach((obj) => {
          const index = loadList().findIndex((item) => item.id === obj.id);
          addLine(obj, index);
        });
    } else {
      uiList.forEach((obj) => {
        const index = loadList().findIndex((item) => item.id === obj.id);
        addLine(obj, index);
      });
    }
  }

  function update(filter, value) {
    clearContent(list);
    if (typeof filter !== 'undefined') setCurrentFilter(filter, value);
    load();
    populateStorage();
    console.warn('Updated!');
  }

  const handlers = (() => {
    function setCheckedHandler(e) {
      const { target } = e;
      const id = target.getAttribute('data-id');
      todoList.setChecked(id);
      setLineThrough(target);
      update();
    }

    // home buttons
    function editMore(title) {
      uiEditItem(title);
      title.value = '';
    }

    function fastSave(title) {
      const newObj = { title: title.value };
      todoList.addItem(newObj);
      title.value = '';
      update();
    }

    function edit(elem) {
      elem.stopImmediatePropagation();
      const { target } = elem;
      const obj = todoList.getItem(target.getAttribute('data-id'));
      console.log(obj);
      uiEditItem(obj.title, obj.dueDate, obj.priority, obj.project, obj.notes, obj.id);
    }

    function deleteItem(item) {
      const { target } = item;
      todoList.deleteItem(target.getAttribute('data-id'));
      update();
    }

    return {
      setCheckedHandler,
      editMore,
      fastSave,
      edit,
      deleteItem,
    };
  })();

  return {
    handlers,
    setCurrentFilter,
    load,
    update,
  };
})();

// ADD/EDIT ITEMS
export default uiControl;
