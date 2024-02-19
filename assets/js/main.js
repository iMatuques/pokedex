const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 8;
let offset = 0;
const maxRecords = 200;


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHTML = pokemons.map((pokemon) => `
                <li class="pokemon ${pokemon.type}">
                            <span class="number">#${pokemon.number}</span>
                            <span class="name">${pokemon.name}</span>
            
                            <div class="details">
                                <ol class="types">
                                    ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
                                </ol>
            
                                <img src="${pokemon.photo}"
                                    alt="${pokemon.name}">
                            </div>
                        </li>
                `
        ).join('');
        pokemonList.innerHTML += newHTML;
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qntRecordNextPg = offset + limit

    if (qntRecordNextPg >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }

})



