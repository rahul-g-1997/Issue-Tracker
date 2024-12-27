import express from "express"; 

const app = express.Router(); 

import {
  createProject,
  projectDetails,
  createIssue,
} from "../controllers/Project_controllers.js"; 

// Route to create a new project
app.post("/create", createProject);

// Route to get the details of a specific project
app.get("/:id", projectDetails);

// Route to create an issue for a specific project
app.post("/:id", createIssue);

console.log("project router loaded"); 

// Exporting the router so it can be used in the main app file
export default app;
