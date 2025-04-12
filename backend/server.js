const express = require("express"); // Framework for building the server
const path = require('path'); // Utilities for handling and transforming file paths
const mongoose = require("mongoose"); // MongoDB ODM to interact with the database
const cors = require("cors"); // Middleware to allow Cross-Origin Resource Sharing
require("dotenv").config(); // Loads environment variables from a .env file into process.env

const app = express(); // Initialize app

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Handle the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Middleware to log all incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const corsOptions = {
    origin: "*", // Allow all domains
    methods: "GET,POST,DELETE", // Allow these HTTP methods
    allowedHeaders: "Content-Type", // Allow content type headers
};

app.use(express.json());
app.use(cors(corsOptions));

const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.log("MongoDB Connection Error:", err);
  });

app.listen(3001, () => console.log("Server running on port 3001"));