function done() {
  var completedContainer = document.querySelector(".completed-container");
  var completedItems = completedContainer.querySelectorAll(".completed-container > p");
  var basicItems = document.querySelectorAll(".basic-container");

  completedItems.forEach(function (item) {
    item.parentNode.removeChild(item);
  });

  basicItems.forEach(function (basicItem) {
    basicItem.style.display = "block";
  });

  // Remove completed items from localStorage
  localStorage.removeItem("completedPositions");

  // Save the updated positions to localStorage
  savePositions();
}
