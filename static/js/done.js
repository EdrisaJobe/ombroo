function done() {
  var completedContainer = document.querySelector(".completed-container");
  var completedItems = completedContainer.querySelectorAll(".completed-container > p");

  completedItems.forEach(function (item) {
    item.parentNode.removeChild(item);

    // Remove completed item from vertical-container1 localStorage
    var basicItems = document.querySelectorAll(".basic-container");
    basicItems.forEach(function (basicItem) {
      if (basicItem.textContent.trim() === item.textContent.trim()) {
        basicItem.style.display = "block";
      }
    });
  });

  // Remove completed items from localStorage
  localStorage.removeItem("completedPositions");

  // Save the updated positions to localStorage
  savePositions();
}
