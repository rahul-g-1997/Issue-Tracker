// Importing required modules
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname in ES6 modules (since it's not directly available in ES6)
// This converts the file URL to a path and gets the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an Express application instance
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
// This allows requests from a specified origin and includes credentials
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Middleware to parse JSON requests with a maximum body size of 21kb
app.use(express.json({ limit: "21kb" }));

// Middleware to parse URL-encoded data with extended syntax, also limited to 21kb
app.use(express.urlencoded({ extended: true, limit: "21kb" }));

// Middleware to parse cookies
app.use(cookieParser());

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
