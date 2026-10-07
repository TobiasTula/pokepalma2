const API_URL = "https://pokeapi.co/api/v2/pokemon/";

async function obtenerPokemon(idONombre) {

    const response = await fetch(API_URL + idONombre);

    if (!response.ok) {
        throw new Error("No se pudo obtener el Pokémon");
    }

    return await response.json();
}


async function obtenerPokemonLista(cantidad, inicio = 1) {

    const pokemon = [];

    for (let i = inicio; i < inicio + cantidad; i++) {

        try {

            const data = await obtenerPokemon(i);

            pokemon.push(data);

        } catch (error) {

            console.error("Error obteniendo Pokémon:", i);

        }
    }

    pokemon.sort((a, b) => a.id - b.id);

    return pokemon;
}