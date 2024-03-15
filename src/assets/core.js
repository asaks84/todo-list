function CreateItem(text, deadline = 0, project = null, priorityNum = 0) {
  let title = text;
  let dueDate = deadline;
  let projectName = project;
  let priority = priorityNum;
  let checked = false;
  const notes = [];

  function editTitle(val) {
    title = val;
  }
  const getTitle = () => title;
  function editPriority(val) {
    priority = val;
  }
  const getPriority = () => priority;
  function deleteDuoDate() {
    dueDate = 0;
  }
  function editDueDate(val) {
    dueDate = val;
  }
  const getDueDate = () => dueDate;
  function editProject(val) {
    projectName = val;
  }
  const getProject = () => projectName;
  function editCheck() {
    checked = !checked;
  }
  const getCheck = () => checked;
  function addNote(val) {
    notes.push(val);
  }
  function deleteNote(pos) {
    notes.splice(pos, 1);
  }
  function editNote(pos, val) {
    notes[pos] = val;
  }
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
}

const todoList = (() => {
  const list = [];
  const complete = [];

  const getLength = (data = list) => {
    if (typeof data === 'number') {
      return complete.length;
    }
    return data.length;
  };
  const selectItem = (pos, arr = list) => arr[pos];
  const getProjects = () => list.map((item) => item.getProject())
    .filter((value) => value !== null);

  function reset() {
    list.length = 0;
    complete.length = 0;
  }
  function addItem(text, deadline, project, priority) {
    const newItem = CreateItem(text, deadline, project, priority);
    list.push(newItem);
  }

  const toJSON = () => {
    const listData = list.map((item) => ({
      title: item.getTitle(),
      project: item.getProject(),
      dueDate: item.getDueDate(),
      priority: item.getPriority(),
      checked: item.getCheck(),
      notes: item.getAllNotes(),
    }));

    const completeData = complete.map((item) => ({
      title: item.getTitle(),
      project: item.getProject(),
      dueDate: item.getDueDate(),
      priority: item.getPriority(),
      checked: item.getCheck(),
      notes: item.getAllNotes(),
    }));

    return JSON.stringify({ list: listData, complete: completeData }, '', 1);
  };

  const restore = (data) => {
    reset();
    const { list: listData, complete: completeData } = JSON.parse(data);

    listData.forEach(
      ({
        title, project, dueDate, priority, notes,
      }) => {
        const newItem = CreateItem(title, dueDate, project, priority);
        notes.forEach((note) => newItem.addNote(note));
        list.push(newItem);
      },
    );

    completeData.forEach(
      ({
        title, project, dueDate, priority, notes,
      }) => {
        const newItem = CreateItem(title, dueDate, project, priority);
        newItem.editCheck();
        notes.forEach((note) => newItem.addNote(note));
        complete.push(newItem);
      },
    );
  };

  function setChecked(pos) {
    list[pos].editCheck();
    const removed = list.splice(pos, 1);
    return complete.push(removed[0]);
  }

  // ############
  // CONSOLE LOG
  // ############

  // function readLog() {
  //   for (let i = 0; i < list.length; i += 1) {
  //     console.log(`${list[i].getTitle()}`);
  //   }
  //   console.log(`Tasks done: ${getLength(complete)}
  //   `);
  // }

  return {
    getLength,
    selectItem,
    addItem,
    restore,
    toJSON,
    setChecked,
    getProjects,
    reset,
  };
})();

export default todoList;

/*
###########################################
################           ################
################ TEST AREA ################
################           ################
###########################################
*/
