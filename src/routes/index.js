import express from "express";

import home from "../controllers/home_controllers.js";
import projects from "./projects.js";

const router = express.Router(); // Creating a new instance of the Express Router

// Home route to render the homepage
router.get("/", home);

// Use the projects router for any routes prefixed with "/projects"
router.use("/projects", projects);

console.log("router loaded"); // Log message to confirm router is loaded

// Export the router so it can be used in the main app
export default router;
