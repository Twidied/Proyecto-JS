const apiUrl = "https://fakestoreapi.com/products";

function mainCard(character) {
    const { image, price } = character;
    const container1 = document.querySelector(".container1");

    // Imagen del producto
    const characterImage = document.createElement("img");
    characterImage.src = image;
    characterImage.width =180;

    // Precio del producto
    const characterPrice = document.createElement("p");
    characterPrice.textContent = `$${price}`;

    // Contenedor de cada tarjeta
    const card = document.createElement("div");
    card.appendChild(characterImage);
    card.appendChild(characterPrice);
    card.style.backgroundColor = "grey";
    card.style.padding = "50px";
    card.style.margin = "5px";


    
    container1.appendChild(card);
}

async function getCharacters() {
    try {
        const response = await fetch(apiUrl);
        const results = await response.json();

        for (let i = 0; i < results.length; i++) {
            mainCard(results[i]);
        }
    } catch (error) {
        console.error(error);
    }
}

getCharacters();