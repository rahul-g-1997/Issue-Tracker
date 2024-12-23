// Importing required modules
import express from "express";
import routes from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";

// This converts the file URL to a path and gets the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an Express application instance
const app = express();

// Setting up the template engine as EJS
app.set("view engine", "ejs");

// Setting the views directory for template files
app.set("views", path.join(__dirname, "views"));

// Serving static files from the "assets" directory
app.use(express.static(path.join(__dirname, "assets")));

// Defining routes for the application, with all routes starting from the root
app.use("/", routes);

// Exporting the app instance for use in other files
export { app };
