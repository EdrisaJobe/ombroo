function resetLast() {
  var implementContainer = document.querySelector(".implement-container");
  var basicItems = document.querySelectorAll(".basic-container");

  // Check if there are items in the "implementContainer"
  if (implementContainer.children.length > 0) {
    // Get the last item in the "implementContainer"
    var lastItem = implementContainer.lastElementChild;

    // Show the corresponding item in the "basic-container"
    basicItems.forEach(function (basicItem) {
      if (basicItem.textContent.trim() === lastItem.textContent.trim()) {
        basicItem.style.display = "";
      }
    });

    // Remove the last item from the "implementContainer"
    lastItem.remove();

    // Save the updated positions to localStorage
    savePositions();
  }
}
