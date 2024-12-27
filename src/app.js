// Importing required modules
import express from "express";
import routes from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";
import { attachRedirectBack } from "./middleware/redirectBack.js";

// This converts the file URL to a path and gets the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an Express application instance
const app = express();

// Middleware to parse JSON requests with a maximum body size of 21kb
app.use(express.json({ limit: "21kb" }));

// Middleware to parse URL-encoded data with extended syntax, also limited to 21kb
app.use(express.urlencoded({ extended: true, limit: "21kb" }));

// Setting up the template engine as EJS
app.set("view engine", "ejs");

app.use(attachRedirectBack);


// Setting the views directory for template files
app.set("views", path.join(__dirname, "views"));

// Serving static files from the "assets" directory
app.use(express.static(path.join(__dirname, "assets")));

// Defining routes for the application, with all routes starting from the root
app.use("/", routes);

// Exporting the app instance for use in other files
export { app };
