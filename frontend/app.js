const API_URL = process.env.API_URL;

async function fetchTasks() {
    const res = await fetch("${API_URL}/tasks/");
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

    await fetch("${API_URL}/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
    });

    document.getElementById("taskInput").value = ""; // Clear input
    fetchTasks(); // Refresh list
}

async function deleteTask(id) {
    await fetch('${API_URL}/tasks/${id}', { method: "DELETE" }); // Note the backticks here too!
    fetchTasks();
}

// Load tasks when page opens
fetchTasks();
