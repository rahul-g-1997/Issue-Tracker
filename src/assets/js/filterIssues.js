// Get the form element by its ID
let filterIssueForm = document.getElementById("filter-issue-form");

// Get the issue data in JSON format from a custom data attribute
let issuesJson = document.getElementById("issue-data").getAttribute("data");

// Parse the JSON data into a JavaScript object
let issues = JSON.parse(issuesJson);

// Get the element where the filtered issues will be displayed
let issueList = document.getElementById("issues-list");

// Add an event listener to handle form submission
filterIssueForm.addEventListener("submit", function (e) {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Create an empty array to store the filtered issues
  let filteredIssues = [];

  // Get all label checkboxes in the form and filter to find checked ones
  let labelsList = filterIssueForm.querySelectorAll("input[type=checkbox]");
  let labelsElements = [...labelsList].filter((Element) => Element.checked);

  // Get the selected radio button value for the issue author
  let authorVal = filterIssueForm.querySelector(
    "input[type=radio][name=author]:checked"
  ).value;

  // Map checked label elements to an array of their values
  let [...labelsArr] = labelsElements.map((Element) => Element.value);

  // Iterate over each issue to check if it matches the filter criteria
  issues.map((el) => {
    // Check if the issue author matches the selected author value
    if (el.author == authorVal) {
      // Add to filtered issues array if it meets author criteria and isn’t already included
      if (!filteredIssues.includes(el)) {
        filteredIssues.push(el);
      }
    }
    // Check if the issue has any of the selected labels
    labelsArr.map((label) => {
      if (el.labels.includes(label)) {
        // Add to filtered issues array if it meets label criteria and isn’t already included
        if (!filteredIssues.includes(el)) {
          filteredIssues.push(el);
        }
      }
    });
  });

  // Clear the previous filtered issues display
  issueList.innerHTML = "";

  // Display the filtered issues in the issueList element
  for (let issue of filteredIssues) {
    // Create a new div element for each issue
    let Div = document.createElement("div");
    Div.style = "none";

    // Populate the div with issue details using HTML template
    Div.innerHTML = `
      <div class="card w-100">
        <div class="card-body">
          <h4 class="card-title">Title : ${issue.title}</h4>
          <h5 class="card-title">Author : ${issue.author}</h5>
          <h6 class="card-subtitle mb-2 text-muted">
            Description : ${issue.description}
          </h6>
        </div>
      </div>
    `;
    // Append the created div to the issueList container
    issueList.appendChild(Div);
  }
});
