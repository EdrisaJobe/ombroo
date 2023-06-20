function done() {
    var completedContainer = document.querySelector(".completed-container"); // Get the completed container
  
    if (completedContainer) {
      while (completedContainer.firstChild) {
        completedContainer.removeChild(completedContainer.firstChild); // Remove all child elements from the completed container
      }
    }
  
    // Save the updated positions to localStorage
    savePositions();
  
    // Reload the positions to update the view
    loadPositions();
  }
  