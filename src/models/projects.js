import mongoose from "mongoose";

// Define the schema for a project, with references to issues and labels
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, 
    },
    description: {
      type: String,
      required: true, 
    },
    author: {
      type: String,
      required: true, 
    },
    issues: [
      {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Issue", 
      },
    ],
    labels: [
      {
        type: String, 
      },
    ],
  },
  {
    timestamps: true, 
  }
);

// Create the Project model based on the schema
const Project = mongoose.model("Project", projectSchema);

// Export the Project model for use in other parts of the application
export default Project;
