// Function to fetch Pokémon data from PokeAPI
async function fetchPokemonData(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    // Validate if pokemonName is in PokeAPI 
    if (!response.ok) {  
        throw new Error(`Pokémon Not Found`);  // If not in PokeAPI, show error message 
    }
    const pokemonData = await response.json();
    return pokemonData;
}

// Function to create and display Pokémon card
async function fetchAndDisplayPokemon(pokemonName) {
    const pokemonInfoElement = document.querySelector('.pokemon-info');
    pokemonInfoElement.innerHTML = ''; // Clear previous content

    try {
        const pokeData = await fetchPokemonData(pokemonName); // call pokemonData from pokemonName, form user input

        // Display HTML/BS for Pokemon Data:
        // Card for Clean Display: Image of Pokemon on top 
        // Data below, includes Name, Abilities, Base Experience, and Type(s) 
        pokemonInfoElement.innerHTML = `
        <div class="card mb-3 shadow-md bg-light bg-gradient border text-center">
            <img class="card-img-top w-50 img-fluid mx-auto d-block" src="${pokeData.sprites.front_default}" alt="${pokeData.name}"> 
            <div class="card-body">
                <h1 class="card-title text-warning">${pokeData.name}</h1>
                <h3 class="card-title text-primary">Types:</h3>
                <ul class="list-group list-group-flush">
                    ${pokeData.types.map(type => `<li class="list-group-item">${type.type.name}</li>`).join('')}
                </ul>
                <h3 class="card-title text-primary">Abilities:</h3>
                <ul class="list-group list-group-flush">
                    ${pokeData.abilities.map(ability => `<li class="list-group-item">${ability.ability.name}</li>`).join('')}
                </ul>
                <p class="p-2 mt-2 fs-5">Base Experience: ${pokeData.base_experience}</p>
            </div>
        </div>
        `;
    } catch (error) { // catch if pokemon is not found, prints error message 
        console.error("Error fetching Pokémon:", error);
        pokemonInfoElement.innerHTML = `<p>${error.message}</p>`;
    }
}

// Event listener for the search button
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-btn').addEventListener('click', async () => {
        const pokemonName = document.getElementById('poke-name').value.trim().toLowerCase();

        // Handle empty input
        if (!pokemonName) {
            document.querySelector('.pokemon-info').innerHTML = `<p class="text-danger">Please enter a Pokémon name!</p>`;
            return;
        }

        await fetchAndDisplayPokemon(pokemonName);
    });
});