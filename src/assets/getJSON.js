import addLine from './constructor';

export const todoList = [];

async function connect() {
  const requestURL = './assets/data.json';
  const request = await fetch(requestURL);
  if (!request.ok) {
    throw new Error(`HTTP error! Status: ${request.status}`);
  }

  const response = await request.json();
  return response;
}

export async function populate() {
  const value = await connect();

  value.forEach((obj) => {
    todoList.push(obj);
  });

  todoList.forEach((obj) => {
    addLine(obj, todoList.indexOf(obj));
  });
}
