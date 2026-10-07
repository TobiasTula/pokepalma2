const listapokemon = document.querySelector("#lista-pokemon");

const botonesheader = document.querySelectorAll(".btn-header");

const buscador = document.querySelector("#buscador-pokemon");

const btnBuscar = document.querySelector("#btn-buscar");

const cargarMas = document.querySelector("#cargar-mas");

const miEquipo = document.querySelector("#mi-equipo");

const contadorEquipo = document.querySelector("#contador-equipo");

const mensajeEstado = document.querySelector("#mensaje-estado");

const modal = document.querySelector("#modal");

const detallePokemon = document.querySelector("#detalle-pokemon");

const cerrarModal = document.querySelector("#cerrar-modal");


let todosLosPokemon = [];

let equipo = obtenerEquipoGuardado();

let cantidadCargada = 20;


async function cargarPokemonIniciales() {

    mostrarMensaje("Cargando Pokémon...");

    try {

        todosLosPokemon = await obtenerPokemonLista(
            cantidadCargada,
            1
        );

        mostrarListaPokemon(
            todosLosPokemon,
            equipo
        );

    } catch (error) {

        mostrarMensaje(
            "Ocurrió un error al cargar los Pokémon.",
            "error"
        );
    }
}


async function cargarMasPokemon() {

    mostrarMensaje("Cargando más Pokémon...");

    try {

        const nuevosPokemon = await obtenerPokemonLista(
            20,
            cantidadCargada + 1
        );

        todosLosPokemon = [
            ...todosLosPokemon,
            ...nuevosPokemon
        ];

        todosLosPokemon.sort(
            (a, b) => a.id - b.id
        );

        cantidadCargada += 20;

        mostrarListaPokemon(
            todosLosPokemon,
            equipo
        );

    } catch (error) {

        mostrarMensaje(
            "No se pudieron cargar más Pokémon.",
            "error"
        );
    }
}


botonesheader.forEach(boton => {

    boton.addEventListener("click", () => {

        const tipoSeleccionado = boton.id;

        if (tipoSeleccionado === "ver-todos") {

            mostrarListaPokemon(
                todosLosPokemon,
                equipo
            );

            return;
        }

        const filtrados = todosLosPokemon.filter(
            pokemon => {

                return pokemon.types.some(
                    tipo => tipo.type.name === tipoSeleccionado
                );

            }
        );

        mostrarListaPokemon(
            filtrados,
            equipo
        );

    });

});


function buscarPokemon() {

    const texto = buscador.value
        .trim()
        .toLowerCase();

    if (texto === "") {

        mostrarListaPokemon(
            todosLosPokemon,
            equipo
        );

        return;
    }

    const resultados = todosLosPokemon.filter(
        pokemon => {

            return pokemon.name.includes(texto);

        }
    );

    mostrarListaPokemon(
        resultados,
        equipo
    );
}


btnBuscar.addEventListener(
    "click",
    buscarPokemon
);


buscador.addEventListener(
    "keyup",
    event => {

        if (event.key === "Enter") {
            buscarPokemon();
        }

    }
);


listapokemon.addEventListener(
    "click",
    async event => {

        const boton = event.target.closest("button");

        if (!boton) {
            return;
        }

        const id = Number(boton.dataset.id);


        if (boton.classList.contains("btn-detalle")) {

            try {

                const pokemon = await obtenerPokemon(id);

                mostrarDetalle(pokemon);

            } catch (error) {

                mostrarMensaje(
                    "No se pudo obtener el detalle del Pokémon.",
                    "error"
                );

            }

        }


        if (boton.classList.contains("btn-equipo")) {

            agregarAlEquipo(id);

        }

    }
);


async function agregarAlEquipo(id) {

    const yaExiste = equipo.some(
        pokemon => pokemon.id === id
    );

    if (yaExiste) {

        mostrarMensaje(
            "Ese Pokémon ya está en tu equipo.",
            "error"
        );

        return;
    }


    if (equipo.length >= 6) {

        mostrarMensaje(
            "No podés tener más de 6 Pokémon en tu equipo.",
            "error"
        );

        return;
    }


    try {

        const pokemon = await obtenerPokemon(id);

        const nuevoMiembro = {

            id: pokemon.id,

            nombre: pokemon.name,

            imagen:
                pokemon.sprites.other[
                    "official-artwork"
                ].front_default

        };

        equipo.push(nuevoMiembro);

        guardarEquipo(equipo);

        mostrarEquipo(equipo);

        mostrarMensaje(
            `${pokemon.name} fue agregado a tu equipo.`,
            "exito"
        );

        mostrarListaPokemon(
            todosLosPokemon,
            equipo
        );

    } catch (error) {

        mostrarMensaje(
            "No se pudo agregar el Pokémon.",
            "error"
        );
    }
}


miEquipo.addEventListener(
    "click",
    event => {

        const boton = event.target.closest(
            ".btn-eliminar"
        );

        if (!boton) {
            return;
        }

        const id = Number(
            boton.dataset.id
        );

        equipo = equipo.filter(
            pokemon => pokemon.id !== id
        );

        guardarEquipo(equipo);

        mostrarEquipo(equipo);

        mostrarListaPokemon(
            todosLosPokemon,
            equipo
        );

    }
);


cerrarModal.addEventListener(
    "click",
    cerrarDetalle
);


modal.addEventListener(
    "click",
    event => {

        if (event.target === modal) {
            cerrarDetalle();
        }

    }
);


cargarMas.addEventListener(
    "click",
    cargarMasPokemon
);


mostrarEquipo(equipo);

cargarPokemonIniciales();