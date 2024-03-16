import todoList from './core';
// import addLine from './uiListGenerator';

export async function connect() {
  const requestURL = './assets/data.json';
  const request = await fetch(requestURL);
  if (!request.ok) {
    throw new Error(`HTTP error! Status: ${request.status}`);
  }

  return request;
}

export async function populate() {
  const value = await connect();
  return value;
}

export function test() {
  todoList.restore(populate());
}
