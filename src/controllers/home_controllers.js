// Import the Project model to interact with the 'projects' collection in the database
import Project from "../models/projects.js";

// Define the home controller function as an asynchronous function
const home = async (req, res) => {
  try {
    // Retrieve all projects from the database and sort them by 'createdAt' in descending order
    const projects = await Project.find().sort({ createdAt: -1 });

    // Render the 'home' view template with the retrieved projects and a page title
    return res.render("home", {
      title: "Issue-Tracker", 
      projects, 
    });
  } catch (err) {
    // Log any error encountered during the database query or rendering
    console.log("Error", err);

    // Redirect the user to the home route if an error occurs
    return res.redirect("/");
  }
};

// Export the home function for use in other parts of the application
export default home;
