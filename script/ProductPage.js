 
// Check login status
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html"; // Redirect to login page if not logged in
}

// Sample products
const mockProducts = [
    { id: 1, name: "Product A", description: "A high-quality product A" },
    { id: 2, name: "Product B", description: "A high-quality product B" },
    { id: 3, name: "Product C", description: "A high-quality product C" },
];
  
// Function to display products 
function displayProducts() {
    const productList = document.getElementById("productList");
    productList.innerHTML = ""; // Clear existing content
  
    mockProducts.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
  
      productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <button onclick="rateProduct(${product.id})">Rate This Product</button>
      `;
      productList.appendChild(productDiv);
    });
}

// Function to navigate to the rating page 
function rateProduct(productId) {
    const selectedProduct = mockProducts.find(product => product.id === productId);
    if (selectedProduct) {
      // Store the selected product in localStorage 
      localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
      
      // Redirect to the rating page
      window.location.href = "Ratings.html"; 
    }
}
  
// Initial render
displayProducts();
 
