function clearLocalStorage() {
  var implementContainer = document.querySelector(".implement-container");
  var basicItems = document.querySelectorAll(".basic-container");

  // Remove items from the "implement-container"
  implementContainer.innerHTML = "";

  // Show all items in the "basic-container"
  basicItems.forEach(function (basicItem) {
    basicItem.style.display = "block";
  });

  // Clear the "implementPositions" key from localStorage
  localStorage.removeItem("implementPositions");
}

// Load positions when the page loads
window.addEventListener("DOMContentLoaded", function () {
  loadPositions();
});
