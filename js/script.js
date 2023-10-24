const pokedex = document.getElementById("pokedex");
const apiUrl = "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20";

async function fetchPokemonData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Erro ao buscar dados dos Pokémon: " + error);
    }
}

async function displayPokemon() {
    const pokemonData = await fetchPokemonData(apiUrl);

    pokedex.innerHTML = "";

    for (const pokemon of pokemonData) {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/${pokemon.url}`);
        const data = await response.json();
        const name = data.name;
        const types = data.types.map(type => type.type.name);
        const imageUrl = data.sprites.front_default;

        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${imageUrl}" alt="${name}">
            <h2>${name}</h2>
            <p>Type: ${types.join(", ")}</p>
        `;

        pokedex.appendChild(card);
    }
}

displayPokemon();
