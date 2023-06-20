
function clearLocalStorageTest() {
    var testingContainer = document.querySelector(".testing-container");
    var verticalContainers = document.querySelectorAll(".vertical-container2");
  
    // Move items from the "implement-container" back to the last "vertical-container1"
    while (testingContainer.firstChild) {
      var item = testingContainer.firstChild;
  
      // Find the last vertical container
      var lastVerticalContainer =
        verticalContainers[verticalContainers.length - 1];
  
      // Move the item to the last vertical container
      lastVerticalContainer.appendChild(item);
    }
  
    // Show all items in the "vertical-container1"
    verticalContainers.forEach(function (container) {
      var items = container.querySelectorAll(".testing-container > p");
      items.forEach(function (item) {
        item.style.display = "block";
      });
    });
  
    // Clear the "implementPositions" key from localStorage
    localStorage.removeItem("testingPositions");
  
    // Refresh the page
    location.reload();
  }
  