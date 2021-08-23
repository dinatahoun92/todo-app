//"use strict";
let tasks = [];

const getPriorityName = function (priority) {
  switch (priority) {
    case "1":
      return "High";
    case "2":
      return "Medium";
    case "3":
      return "Low";
    default:
      return "";
  }
};

const deleteTask = function (i) {
  if (!confirm("Are you sure ?")) return;
  tasks.splice(i, 1);
  renderTable();
};
const editTask = function (i) {
  let rows = tasks_tbody.children;
  cancelTask();
  rows[i].style.backgroundColor = "yellow";
  var input = document.createElement("input");
  input.id = `input${i}`;
  var select = `<select id=select${i} class="form-control">
  <option value="1">High</option>
  <option value="2">Medium</option>
  <option value="3">Low</option>
</select>`;
  input.value = tasks[i].name;
  rows[i].children[1].innerText = "";
  rows[i].children[1].appendChild(input);
  rows[i].children[2].innerHTML = select;
  rows[i].children[4].children[0].style.display = "none";
  rows[i].children[4].children[1].style.display = "inline";
  rows[i].children[4].children[2].style.display = "inline";
};

const cancelTask = function (rows) {
  [...tasks_tbody.children].map((row, i) => {
    row.style.backgroundColor = "transparent";
    var text = tasks[i].name;
    row.children[1].innerHTML = text;
    var selectText = getPriorityName(tasks[i].priority);
    row.children[2].innerHTML = selectText;
    row.children[4].children[0].style.display = "inline";
    row.children[4].children[1].style.display = "none";
    row.children[4].children[2].style.display = "none";
  });
};
const saveTask = function (i) {
  tasks[i].name = document.getElementById(`input${i}`).value;
  tasks[i].priority = document.getElementById(`select${i}`).value;
  cancelTask();
};
const moveUp = function (i) {
  if (i == 0) return;
  const oldTask = tasks[i];
  tasks[i] = tasks[i - 1];
  tasks[i - 1] = oldTask;
  renderTable();
};
const moveDown = function (i) {
  if (i == tasks.length - 1) return;
  const oldTask = tasks[i];
  tasks[i] = tasks[i + 1];
  tasks[i + 1] = oldTask;
  renderTable();
};

const renderTable = function () {
  const tbody = document.querySelector("#tasks_tbody");
  tbody.innerHTML = "";
  tasks.forEach((t, i) => {
    const row = `
        <tr>
        <td>${i + 1}</td>
        <td>${t.name}</td>
        <td>${getPriorityName(t.priority)}</td>
        <td>
        ${
          i > 0
            ? `<button class="btn btn-sm btn-secondary" onclick="moveUp(${i})">Up</button>`
            : ``
        }
        ${
          i < tasks.length - 1
            ? `<button class="btn btn-sm btn-secondary" onclick="moveDown(${i})">Down</button>`
            : ``
        }
        </td>
        <td>
        <button class="btn btn-primary btn-sm" onclick="editTask(${i})" id="edit">Edit</button>
        <button class="btn btn-success btn-sm" style="display:none;" id="save"onclick="saveTask(${i})">Save</button>
        <button class="btn btn-danger btn-sm" style="display:none;" onclick="cancelTask()" id="cancel">Cancel</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTask(${i})">Delete</button></td>
        </tr>
        `;
    tbody.insertAdjacentHTML("beforeEnd", row);
  });
};
const addTask = function () {
  console.log(this);
  const taskName = document.querySelector("#task_name").value;
  const priority = document.querySelector("#task_priority").value;
  if (taskName !== "" && priority > 0) {
    tasks.push({
      name: taskName,
      priority: priority,
    });
    renderTable();
  }
};

document.querySelector("#add").addEventListener("click", addTask);
