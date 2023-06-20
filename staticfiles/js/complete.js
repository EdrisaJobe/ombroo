function complete() {
    var testingContainer = document.querySelector(".testing-container");
    var completedContainer = document.querySelector(".completed-container");
  
    var testingItems = testingContainer.querySelectorAll(".testing-container > p");
  
    testingItems.forEach(function (item) {
      var newItem = document.createElement("p");
      newItem.className = "completed-container";
      newItem.draggable = true;
      newItem.setAttribute("ondragstart", "dragStart(event)");
      newItem.innerHTML = item.innerHTML;
      completedContainer.appendChild(newItem);
    });
  
    testingContainer.innerHTML = "";
  
    // Save the new positions to localStorage
    savePositions();
  }
  