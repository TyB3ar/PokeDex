// Function to fetch Pokémon data from PokeAPI
async function fetchPokemonData(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!response.ok) {
        throw new Error(`Pokemon Not Found: ${pokemonName}`);
    }
    const pokemonData = await response.json();
    return pokemonData;
}

// Function to create and display Pokémon card
async function fetchAndDisplayPokemon(pokemonName) {
    const pokemonInfoElement = document.querySelector('.pokemon-info');
    pokemonInfoElement.innerHTML = ''; // Clear previous content

    try {
        const pokeData = await fetchPokemonData(pokemonName);

        pokemonInfoElement.innerHTML = `
        <div class="card shadow-md bg-light bg-gradient border text-center">
            <img class="card-img-top text-center" src="${pokeData.sprites.front_default}" alt="${pokeData.name}">
            <div class="card-body">
                <h5 class="card-title">${pokeData.name}</h5>
                <h6>Abilities:</h6>
                <ul class="list-group list-group-flush">
                    ${pokeData.abilities.map(ability => `<li class="list-group-item">${ability.ability.name}</li>`).join('')}
                </ul>
                <p><strong>Base Experience:</strong> ${pokeData.base_experience}</p>
                <h6>Types:</h6>
                <ul class="list-group list-group-flush">
                    ${pokeData.types.map(type => `<li class="list-group-item">${type.type.name}</li>`).join('')}
                </ul>
            </div>
        </div>
        `;
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
        pokemonInfoElement.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

// Event listener for the search button
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-btn').addEventListener('click', async () => {
        const pokemonName = document.getElementById('poke-name').value.trim().toLowerCase();

        // Handle empty input
        if (!pokemonName) {
            document.querySelector('.pokemon-info').innerHTML = `<p style="color: red;">Please enter a Pokémon name!</p>`;
            return;
        }

        await fetchAndDisplayPokemon(pokemonName);
    });
});