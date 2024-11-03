document.addEventListener("DOMContentLoaded", function () {
  const groups = document.querySelectorAll(".group");
  let currentGroupIndex = 0;

  function showNextGroup() {
    groups[currentGroupIndex].classList.remove("active"); // Hide current group
    currentGroupIndex = (currentGroupIndex + 1) % groups.length; // Move to next group
    groups[currentGroupIndex].classList.add("active"); // Show the next group
  }

  groups[currentGroupIndex].classList.add("active"); // Show the first group initially
  setInterval(showNextGroup, 5000); // Change group every 5 seconds
});
