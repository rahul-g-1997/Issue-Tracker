// Get the search form element by its ID
let searchIssueForm = document.getElementById("search-issue-form");

// Get the issue data in JSON format from a custom data attribute
let searchJson = document.getElementById("issue-data").getAttribute("data");

// Parse the JSON data into a JavaScript object
let searchIssues = JSON.parse(searchJson);

// Get the element where the search results will be displayed
let searchList = document.getElementById("issues-list");

// Add an event listener to handle form submission
searchIssueForm.addEventListener("submit", function (e) {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Create an empty array to store the search results
  let searchedIssues = [];

  // Get the values entered in the search form for title and description
  let titleValue = searchIssueForm.querySelector('input[name="tie"]').value;
  let descriptionValue =
    searchIssueForm.querySelector('input[name="des"]').value;

  // Iterate over each issue to check if it matches the search criteria
  searchIssues.map((el) => {
    // Check if the issue title or description matches the search values
    if (el.title == titleValue || el.description == descriptionValue) {
      // Add the issue to the search results array if it’s not already included
      if (!searchedIssues.includes(el)) {
        searchedIssues.push(el);
      }
    }
  });

  // Clear the previous search results from the searchList container
  searchList.innerHTML = "";

  // Display each matched issue in the searchList element
  for (let issue of searchedIssues) {
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

    // Append the created div to the searchList container
    searchList.appendChild(Div);
  }
});
