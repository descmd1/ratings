document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    // const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");
  
    // Mock credentials for demonstration
    const validUsername = "08033445566";
    // const validPassword = "password";
  
    // Check credentials
    // if (username === validUsername && password === validPassword) {
      if (username === validUsername) {
      // Store login status in localStorage
      localStorage.setItem("isLoggedIn", "true");
  
      // Redirect to the product page
      window.location.href = "ratings.html"; 
    } else {
      // Show error message
      errorMessage.textContent = "Please enter your mobile number with prefix '0'.";
    }
  });
  