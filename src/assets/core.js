function CreateItem(num, text, deadline = 0, priorityNum = 0, projectName = null, check = false) {
  const title = text;
  const dueDate = deadline;
  const project = projectName;
  const priority = priorityNum;
  const checked = check;
  const id = num.toString();
  const notes = [];

  const getTitle = () => title;
  const getPriority = () => priority;
  const getDueDate = () => dueDate;
  const getProject = () => project;
  const getCheck = () => checked;
  function addNote(val) { notes.push(val); }
  function deleteNote(pos) { notes.splice(pos, 1); }
  function editNote(pos, val) { notes[pos] = val; }
  const getAllNotes = () => notes;
  const getNote = (pos) => notes[pos];
  const getId = () => id;

  function updateItem(newValues) {
    const updatedValues = {
      title: (newValues.title !== undefined && newValues.title !== getTitle())
        ? newValues.title : getTitle(),
      dueDate: (newValues.dueDate !== undefined && newValues.dueDate !== getDueDate())
        ? newValues.dueDate : getDueDate(),
      project: (newValues.project !== undefined
        && newValues.project !== getProject())
        ? newValues.project : getProject(),
      priority: (newValues.priority !== undefined
        && newValues.priority !== getPriority())
        ? newValues.priority : getPriority(),
      checked: (newValues.checked !== undefined && newValues.checked !== getCheck())
        ? newValues.checked : getCheck(),
    };
    return CreateItem(
      getId(),
      updatedValues.title,
      updatedValues.dueDate,
      updatedValues.priority,
      updatedValues.project,
      updatedValues.checked,
    );
  }

  return {
    addNote,
    editNote,
    getNote,
    deleteNote,
    getAllNotes,
    getTitle,
    getDueDate,
    getProject,
    getPriority,
    getCheck,
    getId,
    updateItem,
  };
}

const todoList = (() => {
  const list = [];

  function findObjPos(idValue) {
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].getId() === idValue) return i;
    }
    throw Error('Object not found');
  }

  function returnObj(item) {
    const title = item.getTitle();
    const project = item.getProject();
    const dueDate = item.getDueDate();
    const priority = item.getPriority();
    const checked = item.getCheck();
    const notes = item.getAllNotes();
    const id = item.getId();

    return {
      id, title, project, dueDate, priority, checked, notes,
    };
  }
  const getItem = (id) => returnObj(list[findObjPos(id)]);
  const getLength = () => list.length;
  const allTasksList = () => list.map((obj) => (returnObj(obj)));
  function reset() { list.length = 0; }

  const getProjects = () => list.map((item) => item.getProject())
    .filter((value, pos, self) => value !== null && self.indexOf(value) === pos);

  function getBiggerId() {
    if (list.length === 0) return 0;
    const latestObj = list.reduce((max, obj) => (obj.getId() > max.getId() ? obj : max));
    return latestObj.getId();
  }

  function addItem(obj) {
    const id = getBiggerId() === 0 ? 0 : parseInt(getBiggerId(), 10) + 1;
    const newItem = CreateItem(id, obj.title, obj.dueDate, obj.priority, obj.project, obj.checked);
    list.push(newItem);
  }

  function editItem(objID, newObj) {
    const objToEdit = list[findObjPos(objID)];
    const result = objToEdit.updateItem(newObj);
    list[findObjPos(objID)] = result;
  }

  function setChecked(id) {
    const result = { checked: !list[findObjPos(id)].getCheck() };
    editItem(id, result);
  }

  function editNote(id, pos, val) {
    list[findObjPos(id)].editNote(pos, val);
  }
  function addNote(id, val) {
    list[findObjPos(id)].addNote(val);
  }

  function deleteItem(id) {
    list.splice(findObjPos(id), 1);
  }

  const toJSON = () => JSON.stringify(list.map((item) => returnObj(item)), '', 1);

  const restore = (data) => {
    reset();
    JSON.parse(data).forEach(
      ({
        id, title, project, dueDate, priority, checked, notes,
      }) => {
        const newItem = CreateItem(id, title, dueDate, priority, project, checked);
        notes.forEach((note) => newItem.addNote(note));
        list.push(newItem);
      },
    );
  };

  return {
    getLength,
    addNote,
    editNote,
    editItem,
    addItem,
    deleteItem,
    restore,
    toJSON,
    setChecked,
    getProjects,
    reset,
    returnObj,
    allTasksList,
    getItem,
  };
})();

export default todoList;
