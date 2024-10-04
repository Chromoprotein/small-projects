import { useState } from "react";
import { useTodoList } from "./useToDoList";

export default function TodoList() {
  
  const { todoList, toggleItem, addItem, deleteItem } = useTodoList();

  const [text, setText] = useState("");

  const handleInputChange = (e) => {
    setText(e.target.value);
  }

  const submitItem = (e) => {
    e.preventDefault();
    if (text.trim() === "") return; // Prevent sumbitting empty items
    addItem(text);
    setText("");
  }

  return (
    <div style={{padding: 20}}>
      <h1>My to-do list</h1>
      <div>
        {todoList.length > 0 ? todoList.map((item, index) => 
          <div key={index}>
            <input 
              type="checkbox"
              checked={item.done}
              id={item.id} 
              onChange={() => toggleItem(item.id)} 
            />
            <label 
              htmlFor={item.id} 
              style={{cursor: "pointer", textDecoration: item.done ? "line-through" : "none"}}
            >
              {item.content}
            </label>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </div>
        ) : "No items"}
      </div>

      <div>
        <h2>Add an item</h2>
        <form>
          <input type="text" value={text} onChange={handleInputChange} />
          <button type="submit" onClick={submitItem}>Submit</button>
        </form>
      </div>
    </div>
  )
}
