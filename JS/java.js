const apiUrl = "https://fakestoreapi.com/products";

/*aqi lo del dom*/
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

/*aqi ya*/

function addToCart(product) {
    let cart = getCart();

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    document.getElementById("cuenta-carrito").textContent = cart.length;
}

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