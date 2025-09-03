function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
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
        price.textContent = `$${product.price}`;

        item.appendChild(img);
        item.appendChild(title);
        item.appendChild(price);

        cartContainer.appendChild(item);

        total += product.price;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

renderCart();