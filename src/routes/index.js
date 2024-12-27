import express from "express";

import home from "../controllers/home_controllers.js";
import projects from "./projects.js";

// Creating a new instance of the Express Router
const router = express.Router();

// Home route to render the homepage
router.get("/", home);

// Use the projects router for any routes prefixed with "/projects"
router.use("/projects", projects);

console.log("router loaded");

// Export the router so it can be used in the main app
export default router;
