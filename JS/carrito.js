
function renderCart() {
    const cart = getCart();
    const cartContainer = document.getElementById("cartContainer");
    const cartTotal = document.getElementById("cartTotal");

    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach(product => {
        const item = document.createElement("div");
        item.classList.add("cart-item");

        const img = document.createElement("img");
        img.src = product.image;

        const title = document.createElement("h4");
        title.textContent = product.title;

        const price = document.createElement("p");
        price.textContent = `$${product.price} x ${product.quantity}`;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Delete";
        removeBtn.addEventListener("click", () => {
            removeFromCart(product.id);
        });

        item.append(img, title, price, removeBtn);
        cartContainer.appendChild(item);

        total += product.price * product.quantity;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    renderCart();
    updateCartCount();
}

renderCart();
updateCartCount();