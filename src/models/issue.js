import mongoose from "mongoose";

// Define the schema for issues with relevant fields and options
const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    labels: [
      {
        type: String,
        trim: true,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create the Issue model based on the schema
const Issue = mongoose.model("Issue", issueSchema);

// Export the model to use it in other parts of the application
export default Issue;
