import app from "./index.js";
import {
  getFirestore,
  addDoc,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";
const db = getFirestore(app);

//Form Element
const taskForm = document.getElementById("task-form");
const taskContainer = document.getElementById("tasks-container");

let editStatus = false;
let id = "";

//Save Task
const saveTask = (title, description) =>
  addDoc(collection(db, "tasks"), {
    title,
    description
  });

//Obetener en un doc el task basado en el id
const getTask = (id) => getDoc(doc(db, "tasks", id));

//Lee el firebase
const onGetTasks = (callback) => onSnapshot(collection(db, "tasks"), callback);

//Eliminar tarea
const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

//Actualizar una tarea
const updateTask = (id, updatedTask) =>
  updateDoc(doc(db, "tasks", id), updatedTask);
//Ver las tareas en la página
window.addEventListener("DOMContentLoaded", async (e) => {
  onGetTasks((querySnapshot) => {
    taskContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const task = doc.data();
      task.id = doc.id;

      taskContainer.innerHTML += `<div class="card card-body mt-2 border-primary">
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <div>
          <button class="btn btn-primary btn-delete" data-id="${task.id}">Delete</button>
          <button class="btn btn-secondary btn-edit" data-id="${task.id}">Edit</button>
        </div>
      </div>`;
      const btnsDelete = document.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          await deleteTask(e.target.dataset.id);
        });
      });

      const btnsEdit = document.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();

          editStatus = true;
          id = doc.id;

          taskForm["task-title"].value = task.title;
          taskForm["task-description"].value = task.description;
          taskForm["btn-task-form"].innerText = "Update";
        });
      });
    });
  });
});

//Crear/guardar tareas
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = taskForm["task-title"];
  const description = taskForm["task-description"];

  if (!editStatus) {
    await saveTask(title.value, description.value);
  } else {
    await updateTask(id, {
      title: title.value,
      description: description.value
    });

    editStatus = false;
    id = "";
    taskForm["btn-task-form"].innerText = "Save";
  }

  taskForm.reset();
  title.focus();
});
