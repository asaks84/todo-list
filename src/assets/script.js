/* eslint-disable max-len */
import './style.scss';
import todoList from './core';
import addLine from './uiListGenerator';
import { populateStorage, restoreStorage } from './JSONFunctions';
import { dueDateMask, searchProjects } from './uiFunctions';

const input = document.querySelectorAll('input');
const addField = document.querySelector('input#itemTitle');

// Enquanto escreve o título, ele mostra um botão para adicionar mais opções, se assim desejar
function showPlusBtn() {
  // Encontra o botão +
  const plusBtn = addField.nextElementSibling;
  const saveBtn = plusBtn.nextElementSibling;
  // Se o valor do campo título for diferente de vazio,
  // então ele revela o botão +
  if (addField.value !== '') {
    plusBtn.classList.add('revealItem');
    saveBtn.classList.add('revealItem');
  }
  // caso contrário, se você apagar todo o título
  // ele dá display: none, no botão +
  if (addField.value === '' && plusBtn.classList.contains('revealItem')) {
    plusBtn.classList.remove('revealItem');
    saveBtn.classList.remove('revealItem');
  }
}
// adiciona evento pra quando se começa a digitar
// e quando se para de digitar o título do item.
addField.addEventListener('keydown', showPlusBtn);
addField.addEventListener('keyup', showPlusBtn);

input.forEach((e) => e.addEventListener('change', populateStorage));
input.forEach((e) => e.setAttribute('autocomplete', 'off'));
// input.addEventListener('change', populateStorage);
// input.setAttribute('autocomplete', 'off');
window.onload = restoreStorage();

// tests

// filtering special characters

// todoList.selectItem(0).editProject('Projeto 1');
// todoList.selectItem(1).editProject('Projeção');
// todoList.selectItem(2).editProject('Projota');
// todoList.selectItem(2).addNote(`
//   <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element.
//   These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables.
//   It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
// `);

// todoList.setChecked(2);
todoList.selectItem(4).editProject('Projota');

dueDateMask();
searchProjects();

function loadList() {
  const allItems = todoList.allTasksList();
  const uiList = [...allItems];
  uiList.sort((a, b) => ((a.checked < b.checked) ? -1 : 1));
  uiList.forEach((obj) => addLine(obj, allItems.indexOf(obj)));
}
loadList();
