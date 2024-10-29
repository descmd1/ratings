document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");
  
    // Mock credentials for demonstration
    const validUsername = "user";
    const validPassword = "password";
  
    // Check credentials
    if (username === validUsername && password === validPassword) {
      // Store login status in localStorage
      localStorage.setItem("isLoggedIn", "true");
  
      // Redirect to the product page
      window.location.href = "product.html"; 
    } else {
      // Show error message
      errorMessage.textContent = "Invalid username or password. Please try again.";
    }
  });
  