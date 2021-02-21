// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  pendingList = document.querySelector(".js-pendingList"),
  finishedList = document.querySelector(".js-finishedList");

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

let pendingToDos = [];
let finToDos = [];

//*Move Section *//
const undoFinished = (event) => {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const moveToDos = finToDos.filter(function (toDo) {
    return toDo.id === parseInt(li.id);
  });
  const cleanToDos = finToDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  const currentValue = moveToDos[0].text;
  const currentId = moveToDos[0].id;
  paintPending(currentValue, currentId);
  finToDos = cleanToDos;
  saveFinished();
};

const moveFinishToDo = (event) => {
  const btn = event.target;
  const li = btn.parentNode;
  pendingList.removeChild(li);
  const moveToDos = pendingToDos.filter(function (toDo) {
    return toDo.id === parseInt(li.id);
  });
  const cleanToDos = pendingToDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  const currentValue = moveToDos[0].text;
  const currentId = moveToDos[0].id;
  paintFinished(currentValue, currentId);
  pendingToDos = cleanToDos;
  savePendings();
};
//*Move Section *//

//! Delete Section !//
const deletePendingToDo = (event) => {
  const btn = event.target;
  const li = btn.parentNode;
  pendingList.removeChild(li);
  const cleanToDos = pendingToDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  pendingToDos = cleanToDos;
  savePendings();
};

const deleteFinishedToDo = (event) => {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanToDos = finToDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  finToDos = cleanToDos;
  saveFinished();
};
//! Delete Section !//

//* Save Section !//
const savePendings = () => {
  localStorage.setItem(PENDING_LS, JSON.stringify(pendingToDos));
};

const saveFinished = () => {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finToDos));
};
//* Save Section !//

//! Load Section !//
const loadToDos = () => {
  const loadedPendingToDos = localStorage.getItem(PENDING_LS);
  const loadedFinishedToDos = localStorage.getItem(FINISHED_LS);
  if (loadedPendingToDos !== null) {
    const parsedToDos = JSON.parse(loadedPendingToDos);
    parsedToDos.forEach(function (toDo) {
      paintPending(toDo.text);
    });
  }
  if (loadedFinishedToDos !== null) {
    const parsedToDos = JSON.parse(loadedFinishedToDos);
    parsedToDos.forEach(function (toDo) {
      paintFinished(toDo.text, toDo.id);
    });
  }
};
//! Load Section !//

//* Paint Section *//
const paintPending = (text) => {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = Math.floor(Math.random() * 1000000000);
  delBtn.innerText = "🙅🏻‍♂️";
  finBtn.innerText = "🙆🏻‍♂️";
  delBtn.classList.add("del-btn");
  finBtn.classList.add("fin-btn");
  finBtn.addEventListener("click", moveFinishToDo);
  delBtn.addEventListener("click", deletePendingToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(finBtn);
  li.appendChild(delBtn);
  li.id = newId;
  pendingList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  pendingToDos.push(toDoObj);
  savePendings();
};

const paintFinished = (text, id) => {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const undoBtn = document.createElement("button");
  const span = document.createElement("span");
  // const newId = Math.floor(Math.random() * 1000000000);
  delBtn.innerText = "🙅🏻‍♂️";
  undoBtn.innerText = "🤦🏻‍♂️";
  delBtn.classList.add("del-btn");
  undoBtn.classList.add("undo-btn");
  delBtn.addEventListener("click", deleteFinishedToDo);
  undoBtn.addEventListener("click", undoFinished);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(undoBtn);
  li.appendChild(delBtn);
  li.id = id;
  finishedList.appendChild(li);
  const toDoObj = {
    text: text,
    id: id,
  };
  finToDos.push(toDoObj);
  saveFinished();
};

//* Paint Section *//

const handleToDoSubmit = (event) => {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintPending(currentValue);
  toDoInput.value = "";
};

const initial = () => {
  loadToDos();
  toDoForm.addEventListener("submit", handleToDoSubmit);
};

initial();
