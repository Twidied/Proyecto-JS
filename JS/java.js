const apiUrl = "https://fakestoreapi.com/products";

// los aja
function mainCard(product) {
    const { id, image, price, title } = product;
    const container1 = document.querySelector(".container1");

    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = image;
    img.alt = title;

    const name = document.createElement("h4");
    name.textContent = title;

    const cost = document.createElement("p");
    cost.textContent = `$${price}`;

    const addButton = document.createElement("button");
    addButton.textContent = "Agregar al carrito";
    addButton.classList.add("btn-add");

    addButton.addEventListener("click", () => {
        addToCart({ id, title, price, image });
    });

    card.append(img, name, cost, addButton);
    container1.appendChild(card);
}

// guarda carrito
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("✅ Producto agregado al carrito");
}

// numero de carrito
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cuenta-carrito").textContent = cart.length;
}

// EL API llamar 
async function getProducts() {
    try {
        const response = await fetch(apiUrl);
        const products = await response.json();
        products.forEach(product => mainCard(product));
    } catch (error) {
        console.error(error);
    }
}

getProducts();
updateCartCount();
