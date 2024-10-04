import { useState } from "react";

export function useTodoList() {
  
  const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem("list")) || []);

  const toggleItem = (itemId) => {
    const newList = todoList.map((listItem) => {
      if(listItem.id === itemId) {
        const newStatus = !listItem.done;
        return { ...listItem, done: newStatus };
      } else {
        return listItem;
      }
    });
    setTodoList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
  }

  const addItem = (item) => {
    const newItem = {
      id: Math.random(),
      content: item,
      done: false,
    }
    const newList = [...todoList, newItem];
    setTodoList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
  }

  const deleteItem = (itemId) => {
    const newList = todoList.filter((listItem) => listItem.id !== itemId);
    setTodoList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
  };

  return { todoList, toggleItem, addItem, deleteItem };
}
