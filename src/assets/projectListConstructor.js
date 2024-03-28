/* eslint-disable import/no-cycle */
import todoList from './core';
import { createElement, displayProject, setFilterList } from './uiCommonFunctions';
import uiControl from './uiController';

function constructorProjectList() {
  const filteredProjects = setFilterList(todoList.getProjects());
  if (filteredProjects.length !== 0) {
    filteredProjects.forEach((value) => {
      const listItem = createElement('li', ['d-flex', 'align-items-center']);
      const iconItem = createElement('i', ['bi', 'bi-hash', 'fs-4']);
      const link = createElement('a', [], { 'data-value': value });

      link.textContent = value;
      link.addEventListener('click', () => uiControl.update('project', link.getAttribute('data-value')));

      listItem.append(iconItem, link);

      displayProject.appendChild(listItem);
    });
  } else displayProject.innerHTML = '<li class="d-flex align-items-center">No projects yet :(</li>';
}

export default constructorProjectList;
