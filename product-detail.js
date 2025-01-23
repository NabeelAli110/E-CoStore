const API_URL = "https://fakestoreapi.com/products";
const productDetailContainer = document.getElementById("product-detail");

// Get the product ID from the URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Fetch product details based on ID
async function fetchProductDetails(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }
    const product = await response.json();
    displayProductDetails(product);
  } catch (error) {
    console.error(error);
    productDetailContainer.innerHTML =
      "<p>Error loading product details. Please try again later.</p>";
  }
}

// Display product details on the page
function displayProductDetails(product) {
  productDetailContainer.innerHTML = `
    <img src="${product.image}" alt="${product.title}">
    <h1>${product.title}</h1>
    <p>${product.description}</p>
    <p class="price">Price: $${product.price}</p>
    <button id="add-to-cart">Add to Cart</button>
  `;
}

// Add product to cart functionality
document.body.addEventListener("click", (e) => {
  if (e.target.id === "add-to-cart") {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productInCart = cart.find((item) => item.id === parseInt(productId));
    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.push({ id: parseInt(productId), quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  }
});

// Fetch and display the product details when the page loads
if (productId) {
  fetchProductDetails(productId);
} else {
  productDetailContainer.innerHTML = "<p>Invalid Product ID</p>";
}
