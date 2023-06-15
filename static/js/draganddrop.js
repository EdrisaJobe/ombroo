var draggedElement = null;
var initialPositions = null;

function allowDrop(event) {
  event.preventDefault();
}

function dragStart(event) {
  draggedElement = event.target;
  // Check if the dragged element is any of the following and prevent it
  if (draggedElement.classList.contains("implement-container") 
  || (draggedElement.classList.contains("testing-container")
  || (draggedElement.classList.contains("completed-container")))) {
    event.preventDefault();
    return;
  } 
  event.dataTransfer.setData("text/html", draggedElement.outerHTML);
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text/html");
  var implementContainer = document.querySelector(".implement-container");
  var testingContainer = document.querySelector(".testing-container");

  // Check if the dragged element is a .basic-container within the implementContainer
  if (
    draggedElement.classList.contains("basic-container") &&
    implementContainer.contains(draggedElement)
  ) {
    // Move the dragged element to the testingContainer
    testingContainer.insertAdjacentHTML("beforeend", data);

    // Remove the dragged element from its current container (implementContainer)
    draggedElement.parentNode.removeChild(draggedElement);
  } else {
    // Remove the dragged element from its current container (if any)
    if (draggedElement && draggedElement.parentNode) {
      draggedElement.parentNode.removeChild(draggedElement);
    }

    // Insert the dragged element into the implementContainer
    implementContainer.insertAdjacentHTML("beforeend", data);
  }

  // Save the new positions to localStorage
  savePositions();
}

function savePositions() {
  var implementContainer = document.querySelector(".implement-container");
  var testingContainer = document.querySelector(".testing-container");

  var implementItems = implementContainer.querySelectorAll(".implement-container > p");
  var testingItems = testingContainer.querySelectorAll(".testing-container > p");

  var implementPositions = [];
  implementItems.forEach(function (item) {
    implementPositions.push(item.outerHTML);
  });

  var testingPositions = [];
  testingItems.forEach(function (item) {
    testingPositions.push(item.outerHTML);
  });

  localStorage.setItem("implementPositions", JSON.stringify(implementPositions));
  localStorage.setItem("testingPositions", JSON.stringify(testingPositions));

  // Redirect to a different URL after form submission
  window.location.href = window.location.href;
}

function loadPositions() {
  var implementContainer = document.querySelector(".implement-container");
  var testingContainer = document.querySelector(".testing-container");
  var basicItems = document.querySelectorAll(".basic-container");

  implementContainer.innerHTML = "";
  testingContainer.innerHTML = "";

  var savedImplementPositions = localStorage.getItem("implementPositions");
  if (savedImplementPositions) {
    var implementPositions = JSON.parse(savedImplementPositions);
    implementPositions.forEach(function (position) {
      implementContainer.insertAdjacentHTML("beforeend", position);
    });
  }

  var savedTestingPositions = localStorage.getItem("testingPositions");
  if (savedTestingPositions) {
    var testingPositions = JSON.parse(savedTestingPositions);
    testingPositions.forEach(function (position) {
      testingContainer.insertAdjacentHTML("beforeend", position);
    });
  }

  var allPositions = Array.from(implementContainer.querySelectorAll("p")).concat(Array.from(testingContainer.querySelectorAll("p")));

  allPositions.forEach(function (position) {
    var itemContent = document.createElement("div");
    itemContent.innerHTML = position.innerHTML;

    basicItems.forEach(function (basicItem) {
      if (basicItem.textContent.trim() === itemContent.textContent.trim()) {
        basicItem.style.display = "none";
        basicItem.parentNode.removeChild(basicItem);
      }
    });
  });
}

// Load positions when the page loads
window.addEventListener("DOMContentLoaded", function () {
  loadPositions();
});