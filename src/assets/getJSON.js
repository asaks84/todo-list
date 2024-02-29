import { addLine } from "./constructor";
import { todoList } from "./script";

export async function populate() {
  const requestURL = './assets/data.json';
  // const request = new Request(requestURL);

  fetch(requestURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((response) => {
      for (let i in response) {
        todoList.push(response[i]);
        addLine(todoList[i]);
      }
      console.log(todoList)
    })
}