var draggedElement = null;
var initialPositions = null;

function allowDrop(event) {
  event.preventDefault();
}

function dragStart(event) {
  draggedElement = event.target;
  event.dataTransfer.setData("text/html", draggedElement.outerHTML);
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text/html");
  var implementContainer = document.querySelector(".implement-container");

  // Check if the dragged element is already within the implementContainer
  if (implementContainer.contains(draggedElement)) {
    // Do nothing if the dragged element is already within the same container
    return;
  }

  // Remove the dragged element from its current container (if any)
  if (draggedElement && draggedElement.parentNode) {
    draggedElement.parentNode.removeChild(draggedElement);
  }

  // Insert the dragged element into the implementContainer
  implementContainer.insertAdjacentHTML("beforeend", data);

  // Save the new positions to localStorage
  savePositions();
}

function savePositions() {
  var implementContainer = document.querySelector(".implement-container");
  var tasks = implementContainer.querySelectorAll(".implement-container > p");
  var positions = [];
  tasks.forEach(function (task) {
    positions.push(task.outerHTML);
  });
  localStorage.setItem("implementPositions", JSON.stringify(positions));
}

function loadPositions() {
  var implementContainer = document.querySelector(".implement-container");
  var basicItems = document.querySelectorAll(".basic-container");

  // Remove existing items from the "implement-container"
  implementContainer.innerHTML = "";

  var savedPositions = localStorage.getItem("implementPositions");
  if (savedPositions) {
    var positions = JSON.parse(savedPositions);
    implementContainer.innerHTML = positions.join("");

    // Hide corresponding items in the "basic-container"
    positions.forEach(function (position) {
      var itemContent = document.createElement("div");
      itemContent.innerHTML = position;

      basicItems.forEach(function (basicItem) {
        if (basicItem.textContent.trim() === itemContent.textContent.trim()) {
          basicItem.style.display = "none";
        }
      });
    });
  }
}

// Load positions when the page loads
window.addEventListener("DOMContentLoaded", function () {
  loadPositions();
});
