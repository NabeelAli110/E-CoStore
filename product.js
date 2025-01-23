const API_URL = "https://fakestoreapi.com/products"; // API endpoint
const productListContainer = document.getElementById("product-list");

// Function to fetch products from the API
async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const products = await response.json();
    displayProducts(products); // Pass the products to the display function
  } catch (error) {
    console.error(error);
    productListContainer.innerHTML =
      "<p>Error loading products. Please try again later.</p>";
  }
}

// Function to display products on the page
function displayProducts(products) {
  productListContainer.innerHTML = ""; // Clear any existing content

  products.forEach((product) => {
    // Create a product card
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.description.substring(0, 100)}...</p>
      <p class="price">$${product.price}</p>
      <a href="product-detail.html?id=${product.id}">View Details</a>
    `;
    productListContainer.appendChild(productCard);
  });
}

// Fetch and display products when the page loads
fetchProducts();
