/* eslint-disable import/no-cycle */
import { populateStorage } from './JSONFunctions';
import addLine from './listConstructor';
import constructorProjectList from './projectListConstructor';
import {
  clearContent, list, sortParam, loadList, displayProject,
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
    // add project list
    constructorProjectList();
    const uiList = sortParam(loadList(), 'checked');
    if (currentFilter !== null) {
      filterArray(uiList, currentFilter.key, currentFilter.value).forEach((obj) => addLine(obj));
    } else {
      uiList.forEach((obj) => addLine(obj));
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

  return {
    setCurrentFilter,
    load,
    update,
  };
})();

export default uiControl;
