function openTab(event, tabId) {
    // Get all elements with class="tab-panel" and hide them
    const tabPanels = document.querySelectorAll(".tab-panel");
    tabPanels.forEach(panel => panel.classList.remove("active"));
  
    // Get all elements with class="tab-link" and remove the class "active"
    const tabLinks = document.querySelectorAll(".tab-link");
    tabLinks.forEach(link => link.classList.remove("active"));
  
    // Show the current tab's content and add "active" class to the button
    document.getElementById(tabId).classList.add("active");
    event.currentTarget.classList.add("active");
  }
  