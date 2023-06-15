function resetLast() {
  var implementContainer = document.querySelector(".implement-container");
  var verticalContainers = document.querySelectorAll(".vertical-container1");

  // Check if the implementContainer has any child elements
  if (implementContainer.children.length > 0) {
    // Get the last item in the implementContainer
    var lastItem = implementContainer.lastElementChild;

    // Find the last vertical container
    var lastVerticalContainer =
      verticalContainers[verticalContainers.length - 1];

    // Move the last item back to the last vertical container
    lastVerticalContainer.appendChild(lastItem);

    // Show the moved item in the last vertical container
    lastItem.style.display = "block";

    // Save the updated positions to localStorage
    savePositions();

    // Refresh the page
    location.reload();
  }
}
