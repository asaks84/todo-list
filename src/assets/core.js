const CreateItem = (text, deadline = 0, project = null, priorityNum = 0) => {
  let title = text;
  let dueDate = deadline;
  let projectName = project;
  let priority = priorityNum;
  let checked = false;
  const notes = [];

  function editTitle(val) { title = val; }
  const getTitle = () => title;

  function editPriority(val) { priority = val; }
  const getPriority = () => priority;

  function editDueDate(val) { dueDate = val; }
  function deleteDuoDate() { dueDate = 0; }
  const getDueDate = () => dueDate;

  function editProject(val) { projectName = val; }
  const getProject = () => projectName;

  function editCheck() { checked = !checked; }
  const getCheck = () => checked;

  function addNote(val) { notes.push(val); }
  function editNote(pos, val) { notes[pos] = val; }
  function deleteNote(pos) { notes.splice(pos, 1); }
  const getAllNotes = () => notes;
  const getNote = (pos) => notes[pos];

  return {
    addNote,
    editNote,
    getNote,
    deleteNote,
    getAllNotes,

    editTitle,
    getTitle,

    editDueDate,
    deleteDuoDate,
    getDueDate,

    editProject,
    getProject,

    editPriority,
    getPriority,

    editCheck,
    getCheck,
  };
};

const todoList = [];

const addItem = (text, deadline, project, priority) => {
  const newItem = CreateItem(text, deadline, project, priority);
  todoList.push(newItem);
};

const todoTitle = 'List item 01';
const deadline = '25/12/2020';
const todoItem02 = 'List Item 02';

addItem(todoTitle, deadline);
addItem(todoItem02);

todoList[0].addNote('Primera nota criada');
todoList[0].addNote('Segunda nota criada');
todoList[0].addNote('Terceira nota criada');

// console.log(`
//   Nome da lista: ${todoList[0].getTitle()}
//   Está marcado? ${todoList[0].getCheck()}
//   Todas as notas: ${todoList[0].getAllNotes()}
// `);

todoList[0].editCheck();
todoList[0].editNote(1, 'Segunda nota EDITADA');
// console.log(`
//   Nome da lista: ${todoList[0].getTitle()}
//   Está marcado? ${todoList[0].getCheck()}
//   Todas as notas: ${todoList[0].getAllNotes()}
// `);

const toJSON = () => {
  const toSave = [];

  function saveObject(pos) {
    const title = todoList[pos].getTitle();
    const project = todoList[pos].getProject();
    const dueDate = todoList[pos].getDueDate();
    const priority = todoList[pos].getPriority();
    const checked = todoList[pos].getCheck();
    const notes = [];
    todoList[pos].getAllNotes().forEach((e) => notes.push(e));

    return {
      title,
      checked,
      project,
      dueDate,
      priority,
      notes,
    };
  }
  todoList.forEach((e) => {
    toSave.push(saveObject(todoList.indexOf(e)));
  });
  // console.log(`
  //   toSave typeof: ${typeof toSave}
  // `);
  // console.log(toSave);

  return JSON.stringify(toSave, '', 1);
};
const restore = () => {
  const arr = JSON.parse(toJSON());
  todoList.length = 0;
  const eachKey = (pos, key) => arr[pos][key];

  arr.forEach((item) => {
    const title = eachKey(arr.indexOf(item), 'title');
    const dueDate = eachKey(arr.indexOf(item), 'dueDate');
    const project = eachKey(arr.indexOf(item), 'project');
    const priority = eachKey(arr.indexOf(item), 'priority');
    const checked = eachKey(arr.indexOf(item), 'checked');
    const notes = [];
    arr[arr.indexOf(item)].notes.forEach((note) => notes.push(note));

    addItem(title, dueDate, project, priority);
    if (checked === true) { todoList[arr.indexOf(item)].editCheck(); }
    if (notes.length > 0) { notes.forEach((note) => todoList[arr.indexOf(item)].addNote(note)); }
  });
};

restore();
console.log('after', todoList);
// const elem = toJSON();
