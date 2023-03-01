import { useEffect, useState } from "react";

import "./App.css";
import Task from "./components/Task";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    setTasks(tasks);
  }, []);

  function addTask(name) {
    setTasks((prev) => {
      return [...prev, { name: name, done: false }];
    });
  }
  function updateTaskDone(taskIndex, newDone) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  function removeTask(indexToRemove) {
    setTasks((prev) =>
      prev.filter((taskObject, index) => index !== indexToRemove)
    );
  }

  function renameTask(index, newName) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    });
  }

  const doneTasks = tasks.filter((task) => task.done).length;
  const totalTasks = tasks.length;

  function getMessage() {
    const percentage = (doneTasks / totalTasks) * 100;
    if (percentage === 100) return "You did well! 🎉";
    if (percentage >= 75) return "You're almost there! 💪";
    if (percentage >= 50) return "You're half way there! 🏃";
    if (percentage >= 25) return "You're doing great! 🚀";
    if (percentage >= 0) return "You can do it! 🙌 ";
  }

  return (
    <main>
      <h1>
        {doneTasks} / {totalTasks} Complete
      </h1>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={addTask} />
      {tasks.map((task, index) => (
        <Task
          {...task}
          onDelete={() => removeTask(index)}
          onToggle={(done) => updateTaskDone(index, done)}
          onRename={(newName) => renameTask(index, newName)}
          key={index}
        />
      ))}
    </main>
  );
}

export default App;
