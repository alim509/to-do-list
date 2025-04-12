async function fetchTasks() {
    const res = await fetch("http://localhost:3001/tasks");
    const tasks = await res.json();
    document.getElementById("taskList").innerHTML = tasks.map(task =>
        <li>${task.title} <button onclick="deleteTask('${task._id}')">X</button></li>
    ).join("");
}

async function addTask() {
    const title = document.getElementById("taskInput").value;
    await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
    });
    fetchTasks();
}

async function deleteTask(id) {
    await fetch('http://localhost:5000/tasks/${id}', { method: "DELETE" });
    fetchTasks();
}

fetchTasks();