import Project from "../models/projects.js";

const home = async (req, res) => {
  try {
    // Correctly applying sort as an object
    const projects = await Project.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order
    return res.render("home", {
      title: "Issue-Tracker",
      projects,
    });
  } catch (err) {
    console.log("Error", err);
    return res.redirect("/");
  }
};

export default home;
