async function fetchTasks() {
    const res = await fetch("http://localhost:3001/tasks");
    const tasks = await res.json();

    // Generate list items and inject into DOM
    document.getElementById("taskList").innerHTML = tasks.map(task =>
        `<li>${task.title} 
            <button onclick="deleteTask('${task._id}')">X</button>
        </li>`
    ).join("");
}

async function addTask() {
    const title = document.getElementById("taskInput").value;
    if (!title.trim()) return; // Prevent empty tasks

    await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
    });

    document.getElementById("taskInput").value = ""; // Clear input
    fetchTasks(); // Refresh list
}

async function deleteTask(id) {
    await fetch(`http://localhost:3001/tasks/${id}`, { method: "DELETE" }); // Note the backticks here too!
    fetchTasks();
}

// Load tasks when page opens
fetchTasks();
