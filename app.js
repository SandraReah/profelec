// Product data
const products = [
    { id: 1, name: "airpods.png", price: 120.00, image: "airpods.png" },
    { id: 2, name: "camera.jpeg", price: 60.00, image: "camera.jpeg" },
    { id: 3, name: "Galaxy-Z-Flip.jpg", price: 100.00, image: "Galaxy-Z-Flip.jpg" },
    { id: 4, name: "headphones.webp", price: 500.00, image: "headphones.webp" },
    { id: 5, name: "masid.jpeg", price: 500.00, image: "masid.jpeg" },
    { id: 6, name: "necklace.jpg", price: 500.00, image: "necklace.jpg" },
    { id: 7, name: "perfume.jpg", price: 500.00, image: "perfume.jpg" }
];

// Shopping cart array
let cart = [];

// Function to display product listings
function displayProducts() {
    const productListContainer = document.getElementById("product-list");
    productListContainer.innerHTML = ""; // Clear previous content

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="120">
            <h3>${product.name}</h3>
            <p class="price">$<span>${product.price.toFixed(2)}</span></p>
            <button class="add-to-cart" data-id="${product.id}">Add to cart</button>
        `;

        productListContainer.appendChild(productDiv);
    });

    // Attach event listeners to all "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", addToCart);
    });
}

// Function to add product to the cart
function addToCart(event) {
    const productId = parseInt(event.target.dataset.id);
    const product = products.find(p => p.id === productId);

    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Function to remove product from cart
function removeFromCart(event) {
    const productId = parseInt(event.target.dataset.id);
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Function to update cart display and total
function updateCart() {
    const cartListContainer = document.getElementById("cart-list");
    const cartTotalContainer = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    cartListContainer.innerHTML = ""; // Clear previous cart items
    let total = 0;
    let itemCount = 0;

    cart.forEach(item => {
        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");

        cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="40">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$<span>${(item.price * item.quantity).toFixed(2)}</span></p>
            </div>
            <button class="remove-from-cart" data-id="${item.id}">🗑️</button>
        `;

        cartListContainer.appendChild(cartItemDiv);
        total += item.price * item.quantity;
        itemCount += item.quantity;
    });

    cartTotalContainer.innerHTML = `$${total.toFixed(2)}`;
    cartCount.textContent = itemCount; // Update cart count badge

    // Attach event listeners to "Remove" buttons
    document.querySelectorAll(".remove-from-cart").forEach(button => {
        button.addEventListener("click", removeFromCart);
    });
}

// Initialize the page
displayProducts();
