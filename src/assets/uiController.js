/* eslint-disable import/no-cycle */
import { populateStorage } from './JSONFunctions';
import todoList from './core';
import uiEditItem from './editConstructor';
import addLine from './listConstructor';
import {
  clearContent, list, sortParam, loadList, createElement,
} from './uiCommonFunctions';

const displayProject = document.querySelector('ul#projects');

const filterProjects = () => todoList.getProjects()
  .filter((value, index, self) => value !== '' && self.indexOf(value) === index);

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
    // add project list
    constructorProjectList();
    const uiList = sortParam(loadList(), 'checked');
    if (currentFilter !== null) {
      filterArray(uiList, currentFilter.key, currentFilter.value).forEach(
        (obj) => {
          const index = loadList().findIndex((item) => item.id === obj.id);
          addLine(obj, index);
        },
      );
    } else {
      uiList.forEach((obj) => {
        const index = loadList().findIndex((item) => item.id === obj.id);
        addLine(obj, index);
      });
    }
  }

  function update(filter, value) {
    clearContent(list);
    clearContent(displayProject);
    if (typeof filter !== 'undefined') setCurrentFilter(filter, value);
    if (filter === 'clear') setCurrentFilter();
    load();
    populateStorage();
    console.warn('Updated!');
  }

  function constructorProjectList() {
    const projects = filterProjects();
    if (projects.length !== 0) {
      projects.forEach((value) => {
        const listItem = createElement('li', ['d-flex', 'align-items-center']);
        const iconItem = createElement('i', ['bi', 'bi-hash', 'fs-4']);
        const link = createElement('a', [], { 'data-value': value });

        link.textContent = value;
        link.addEventListener('click', () => update('project', link.getAttribute('data-value')));

        listItem.append(iconItem, link);

        displayProject.appendChild(listItem);
      });
    } else displayProject.innerHTML = '<li class="d-flex align-items-center">No projects yet :(</li>';
  }

  const handlers = (() => {
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
      uiEditItem(
        obj.title,
        obj.dueDate,
        obj.priority,
        obj.project,
        obj.notes,
        obj.id,
      );
    }

    function deleteItem(item) {
      const { target } = item;
      todoList.deleteItem(target.getAttribute('data-id'));
      update();
    }

    return {
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
