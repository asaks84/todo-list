/* eslint-disable no-unused-vars */
const div = document.createElement('div');
const input = document.createElement('input');
const btn = document.createElement('button');
const aIcon = document.createElement('a');
const icon = document.createElement('i');
const select = document.createElement('select');
const option = document.createElement('option');

function uiEditItem(title, dueDate, priority, notes) {
  // linhas
  const row1 = div;
  const row2 = div;

  // Botão para salvar
  const saveBtn = btn;

  // divs dos grupos de elementos
  const inputGroup = div;
  const divDate = div;
  const priorityDiv = div;

  // elementos do titulo
  const titleInput = input;

  // elementos da data de entrega
  const duedate = input;
  const aCalendar = aIcon;
  const iconCalendar = icon;

  // elementos da prioridade
  const selectPriority = select;
  for (let i = 0; i < 4; i += 1) {
    const priorItem = option;
    priorItem.setAttribute('value', i);
    if (i === 0) {
      priorItem.textContent = 'Prioridade';
      priorItem.setAttribute('selected');
    } else { priorItem.textContent = `Prioridade + ${i}`; }
    selectPriority.appendChild(priorItem);
  }

  row1.classList.add('row');
  row2.classList.add('row', 'g-0', 'gap-2');
}
