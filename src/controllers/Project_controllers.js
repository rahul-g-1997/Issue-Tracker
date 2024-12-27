// Import the Project and Issue models for database interaction
import Project from "../models/projects.js";
import Issue from "../models/issue.js";

// Function to create a new project
export const createProject = async (req, res) => {
  try {
    // Using Project.create() to add a new project document to the database
    await Project.create({
      name: req.body.name,
      description: req.body.description,
      author: req.body.author,
    });

    // Redirect to the previous page upon successful creation
    res.redirectBack();
  } catch (error) {
    console.log(`Error in creating project: ${error}`);
    return res.redirectBack();
  }
};

// Function to create a new issue in the database
export const Isuues = async (req, res) => {
  try {
    const { title, description, author, labels } = req.body;
    console.log(
      `Title: ${title}, Description: ${description}, Author: ${author}, Labels: ${labels}`
    );

    // Create and save a new issue document
    const issues = new Issue({ title, description, author, labels });
    await issues.save();

    res.redirectBack();
  } catch (error) {
    console.log(`Error in getting project issues: ${error}`);
    return res.redirectBack();
  }
};

// Function to retrieve project details, including issues
export const projectDetails = async (req, res) => {
  try {
    // Fetch project by ID and populate its issues
    const project = await Project.findById(req.params.id).populate({
      path: "issues",
    });

    // Render the 'projectDetails' view if project exists
    if (project) {
      return res.render("projectDetails", {
        title: "Project Details",
        project,
        req: req,
      });
    }
    return res.redirectBack();
  } catch (error) {
    console.log(`Error in getting project details: ${error}`);
    return res.redirectBack();
  }
};

// Function to create an issue and associate it with a specific project
export const createIssue = async (req, res) => {
  try {
    // Find project by ID to which the issue will be added
    let project = await Project.findById(req.params.id);

    if (project) {
      // Create a new issue document and save it
      let issue = await Issue.create({
        title: req.body.title,
        description: req.body.description,
        labels: req.body.labels,
        author: req.body.author,
      });

      // Add the issue to the project's issues array
      project.issues.push(issue);

      // If labels are provided as an array, iterate over each label
      if (!(typeof req.body.labels === "string")) {
        for (let label of req.body.labels) {
          // Add unique labels to the project
          let isPresent = project.labels.includes(label);
          if (!isPresent) {
            project.labels.push(label);
          }
        }
      } else {
        // Handle case where only one label is provided as a string
        let isPresent = project.labels.includes(req.body.labels);
        if (!isPresent) {
          project.labels.push(req.body.labels);
        }
      }

      // Save the updated project document
      await project.save();

      return res.redirectBack();
    } else {
      return res.redirectBack();
    }
  } catch (error) {
    console.log(`Error in getting project issues: ${error}`);
    return res.redirectBack();
  }
};
