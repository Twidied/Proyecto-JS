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
    addButton.textContent = "Add to cart";
    addButton.classList.add("btn-add");

    const adda = document.createElement("a");
    adda.textContent = "fav";
    adda.classList.add("btn-add");

    addButton.addEventListener("click", () => {
        addToCart({ id, title, price, image });
    });

    card.append(img, name, cost, addButton, adda,);
    container1.appendChild(card);
    }

/*aqi ya*/

function renderProducts(products) {
    const container1 = document.querySelector(".container1");
    container1.innerHTML = ""; 
    products.forEach(product => mainCard(product));
}

async function getProducts(category = "") {
    try {
        let url = apiUrl;
        if (category) {
            url = `${apiUrl}/category/${category}`;
        }
        const response = await fetch(url);
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}

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

document.addEventListener("DOMContentLoaded", () => {
    getProducts();
    updateCartCount();

    document.querySelectorAll("a").forEach(link => {
        const text = link.textContent.trim().toUpperCase();

        if (text === "WOMAN") {
            link.addEventListener("click", e => {
                e.preventDefault();
                getProducts("women's clothing");
            });
        }

        if (text === "MEN") {
            link.addEventListener("click", e => {
                e.preventDefault();
                getProducts("men's clothing");
            });
        }

        if (text === "ACCESSORIES") {
            link.addEventListener("click", e => {
                e.preventDefault();
                getProducts("jewelery");
            });
        }

        if (text === "TECHNOLOGY") {
            link.addEventListener("click", e => {
                e.preventDefault();
                getProducts("electronics");
            });
        }

        if (text === "ALL") {
            link.addEventListener("click", e => {
                e.preventDefault();
                getProducts();
            });
        }
    });
});
