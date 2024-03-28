function CreateItem(id, title, dueDate = 0, priority = 0, project = null, checked = false) {
  const notes = [];

  function addNote(val) { notes.push(val); }
  function deleteNote(pos) { notes.splice(pos, 1); }
  function editNote(pos, val) { notes[pos] = val; }
  const getAllNotes = () => notes;
  const getNote = (pos) => notes[pos];

  function updateItem(newValues) {
    const updatedValues = {
      title: (newValues.title !== undefined && newValues.title !== title)
        ? newValues.title : title,
      dueDate: (newValues.dueDate !== undefined && newValues.dueDate !== dueDate)
        ? newValues.dueDate : dueDate,
      project: (newValues.project !== undefined && newValues.project !== project)
        ? newValues.project : project,
      priority: (newValues.priority !== undefined && newValues.priority !== priority)
        ? newValues.priority : priority,
      checked: (newValues.checked !== undefined && newValues.checked !== checked)
        ? newValues.checked : checked,
    };
    return CreateItem(
      id,
      updatedValues.title,
      updatedValues.dueDate,
      updatedValues.priority,
      updatedValues.project,
      updatedValues.checked,
    );
  }

  return Object.freeze({
    id,
    title,
    dueDate,
    project,
    priority,
    checked,
    addNote,
    editNote,
    getNote,
    deleteNote,
    getAllNotes,
    updateItem,
  });
}

const todoList = (() => {
  const list = [];

  function findObjPos(idValue) {
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].id === parseInt(idValue, 10)) return i;
    }
    throw Error('Object not found');
  }

  const returnObj = (item) => ({
    title: item.title,
    project: item.project,
    dueDate: item.dueDate,
    priority: item.priority,
    checked: item.checked,
    notes: item.getAllNotes(),
    id: item.id,
  });

  const getItem = (id) => returnObj(list[findObjPos(id)]);
  const getLength = () => list.length;
  const allTasksList = () => list.map((obj) => (returnObj(obj)));
  function reset() { list.length = 0; }

  const getProjects = () => list.map((item) => item.project)
    .filter((value, pos, self) => value !== null && self.indexOf(value) === pos);

  function getBiggerId() {
    const latestObj = list.reduce((max, obj) => (obj.id > max.id ? obj : max), { id: 0 });
    return latestObj.id;
  }

  function addItem(obj) {
    const id = list.length === 0 ? 0 : parseInt(getBiggerId(), 10) + 1;
    const newItem = CreateItem(id, obj.title, obj.dueDate, obj.priority, obj.project, obj.checked);
    list.push(newItem);
  }

  function editItem(objID, newObj) {
    const objToEdit = list[findObjPos(objID)];
    const result = objToEdit.updateItem(newObj);
    list[findObjPos(objID)] = result;
  }

  function setChecked(id) {
    const result = { checked: !list[findObjPos(id)].checked };
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

  const toJSON = () => JSON.stringify(list.map((item) => returnObj(item)));

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
