
import React, { useState, useEffect } from "react"
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToDoList() {

  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });


  const [newTask, setNewTasks] = useState("");

  const [editIndex, setEditIndex] = useState(null);


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);



  function handleInputChange(event) {
    setNewTasks(event.target.value)
  }



  function addTask() {
    if (newTask.trim('') !== "") {
      setTasks(t => [...t,{task:newTask,completed:false}])
      setNewTasks("")
    } else {
      toast.error("Empty Input", {
        position: "top-right"
      });
    }

  }



  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index))
  }


  function moveTaskUp(index) {

    if (index > 0) {
      const updatedTask = [...tasks];

      [updatedTask[index], updatedTask[index - 1]] = [updatedTask[index - 1], updatedTask[index]];
      setTasks(updatedTask);
    }

  }
  function moveTaskDown(index) {

    if (index < tasks.length - 1) {
      const updatedTask = [...tasks];

      [updatedTask[index], updatedTask[index + 1]] = [updatedTask[index + 1], updatedTask[index]];
      setTasks(updatedTask);
    }
  }



  function editTask(index) {
    setEditIndex(index);
    setNewTasks(tasks[index]);
  }


  function saveEditedTask(index) {
    const updatedTasks = [...tasks];

    if (newTask.trim('') !== "") {
      
      updatedTasks[index].task = newTask

      console.log("updatedTasks[index]",updatedTasks[index]);
      setTasks(updatedTasks);
      setEditIndex(null);
      setNewTasks("");
    } else {
      toast.error("Empty Input", {
        position: "top-right"
      });
    }

  }

function toggleEvent(index){

const updatedTasks=[...tasks]
updatedTasks[index].completed=!updatedTasks[index].completed
setTasks(updatedTasks)
}



 



  return (<>
    {/* //////////////////////////////////////////////////////// */}
    <div className="to-do-list">
      <h2>To-Do-List</h2>

      <input type="text"
        className="add-text"
        placeholder="Enter a task..."
        value={editIndex === null ? newTask : ""}
        onChange={handleInputChange} />

      <button className="add-button" onClick={addTask}>Add</button>
    </div>

    {/* ////////////////////////////////////////////////////// */}


    <ol>
      {tasks.map((task, index) => (
        <li key={index}>
          <div className="task-container">
            {editIndex === index ? (
              <>
                <div className="edit-task-container">
                  <textarea
                    className="edit-text"
                    type="text"
                    value={newTask.task}
                    placeholder="Enter a task"
                    onChange={handleInputChange}

                  />
                  <button
                    className="save-button"
                    onClick={() => saveEditedTask(index)}
                  >
                    Save
                  </button>



                </div>
              </>

            ) : (
              <>
<input  type="checkbox"checked={task.completed}
onChange={()=>toggleEvent(index)}
/>

                <span className="text" >{task.completed?<del>
                  {task.task}
                </del>:task.task}</span>

              </>
            )}

          </div>

          <div className="button-container">
            <button className="edit-button" onClick={() => editTask(index)}>
              Edit
            </button>

            <button className="delete-button" onClick={() => deleteTask(index)}>
              ❌
          
            </button>
          
            <button className="move-button" onClick={() => moveTaskUp(index)}>
              ⬆️
            </button>
          
            <button className="move-button" onClick={() => moveTaskDown(index)}>
              ⬇️
            </button>
          </div>
        </li>
      ))}
    </ol>

  </>)

}

export default ToDoList