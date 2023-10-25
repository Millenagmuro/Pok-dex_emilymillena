document.addEventListener("DOMContentLoaded", function() {
    const pokedex = document.getElementById("pokedex");
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");
    const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
    let pokemonData = [];

    async function fetchPokemonData(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error("Erro ao buscar dados dos Pokémon: " + error);
        }
    }

    async function displayPokemon(pokemonData) {
        pokedex.innerHTML = "";

        for (const pokemon of pokemonData) {
            const response = await fetch(pokemon.url);
            const data = await response.json();
            const name = data.name;
            const imageUrl = data.sprites.front_default;

            const card = document.createElement("button");
            card.classList.add("card");
            card.innerHTML = `
                <img src="${imageUrl}" alt="${name}">
                <h2>${name}</h2>
            `;

            pokedex.appendChild(card);
        }
    }

    // Função para buscar Pokémon por nome
    function searchPokemonByName() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredPokemon = pokemonData.filter(pokemon => pokemon.name.includes(searchTerm));
        displayPokemon(filteredPokemon);
    }

    // Função para carregar todos os Pokémon iniciais
    async function loadInitialPokemon() {
        pokemonData = await fetchPokemonData(apiUrl);
        displayPokemon(pokemonData);
    }

    // Carregar todos os Pokémon iniciais ao carregar a página
    loadInitialPokemon();

    // Adicionar evento de clique ao botão de pesquisa
    searchButton.addEventListener("click", searchPokemonByName);
});
