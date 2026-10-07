function formatearId(id) {

    const idTexto = id.toString();

    if (idTexto.length === 1) {
        return "00" + idTexto;
    }

    if (idTexto.length === 2) {
        return "0" + idTexto;
    }

    return idTexto;
}


function crearTiposHTML(pokemon) {

    return pokemon.types
        .map(tipo => {

            return `
                <p class="tipo ${tipo.type.name}">
                    ${tipo.type.name}
                </p>
            `;

        })
        .join("");
}


function crearCardPokemon(pokemon, equipo) {

    const div = document.createElement("div");

    div.classList.add("pokemon");

    const yaEstaEnEquipo = equipo.some(
        miembro => miembro.id === pokemon.id
    );

    div.innerHTML = `
        <p class="pokemon-id-back">
            ${formatearId(pokemon.id)}
        </p>

        <div class="pokemon-imagen">

            <img
                src="${pokemon.sprites.other["official-artwork"].front_default}"
                alt="${pokemon.name}"
            >

        </div>

        <div class="pokemon-info">

            <div class="nombre-contenedor">

                <p class="pokemon-id">
                    ${formatearId(pokemon.id)}
                </p>

                <h2 class="pokemon-nombre">
                    ${pokemon.name}
                </h2>

            </div>

            <div class="pokemon-tipo">
                ${crearTiposHTML(pokemon)}
            </div>

            <div class="pokemon-stats">

                <p class="stat">
                    Altura: ${pokemon.height / 10}m
                </p>

                <p class="stat">
                    Peso: ${pokemon.weight / 10}kg
                </p>

            </div>

            <div class="botones-pokemon">

                <button
                    class="btn-detalle"
                    data-id="${pokemon.id}"
                >
                    Ver detalle
                </button>

                <button
                    class="btn-equipo"
                    data-id="${pokemon.id}"
                >
                    ${yaEstaEnEquipo ? "Ya está en equipo" : "Agregar al equipo"}
                </button>

            </div>

        </div>
    `;

    return div;
}


function mostrarPokemon(pokemon, equipo) {

    const card = crearCardPokemon(pokemon, equipo);

    listapokemon.append(card);
}


function mostrarListaPokemon(lista, equipo) {

    listapokemon.innerHTML = "";

    if (lista.length === 0) {

        mostrarMensaje("No se encontraron Pokémon.", "error");

        return;
    }

    ocultarMensaje();

    lista.forEach(pokemon => {
        mostrarPokemon(pokemon, equipo);
    });
}


function mostrarEquipo(equipo) {

    miEquipo.innerHTML = "";

    contadorEquipo.textContent = `${equipo.length} / 6`;

    if (equipo.length === 0) {

        miEquipo.innerHTML = `
            <p class="equipo-vacio">
                Todavía no agregaste ningún Pokémon.
            </p>
        `;

        return;
    }

    equipo.forEach(pokemon => {

        const card = document.createElement("div");

        card.classList.add("equipo-card");

        card.innerHTML = `

            <img
                src="${pokemon.imagen}"
                alt="${pokemon.nombre}"
            >

            <div class="equipo-info">

                <p class="equipo-nombre">
                    #${formatearId(pokemon.id)}
                    ${pokemon.nombre}
                </p>

            </div>

            <button
                class="btn-eliminar"
                data-id="${pokemon.id}"
            >
                Eliminar
            </button>

        `;

        miEquipo.append(card);
    });
}


function mostrarMensaje(mensaje, tipo = "") {

    mensajeEstado.textContent = mensaje;

    mensajeEstado.className = "mensaje-estado";

    if (tipo === "error") {
        mensajeEstado.classList.add("mensaje-error");
    }

    if (tipo === "exito") {
        mensajeEstado.classList.add("mensaje-exito");
    }
}


function ocultarMensaje() {

    mensajeEstado.textContent = "";

    mensajeEstado.className = "mensaje-estado";
}


function mostrarDetalle(pokemon) {

    const estadisticas = pokemon.stats
        .map(stat => {

            const nombre = stat.stat.name;
            const valor = stat.base_stat;

            return `
                <div class="stat-barra">

                    <span>
                        ${nombre}
                    </span>

                    <span>
                        ${valor}
                    </span>

                    <div class="barra">

                        <div
                            class="barra-relleno"
                            style="width: ${Math.min(valor, 100)}%"
                        ></div>

                    </div>

                </div>
            `;

        })
        .join("");

    detallePokemon.innerHTML = `

        <div class="detalle">

            <img
                src="${pokemon.sprites.other["official-artwork"].front_default}"
                alt="${pokemon.name}"
            >

            <h2>
                #${formatearId(pokemon.id)}
                ${pokemon.name}
            </h2>

            <div class="pokemon-tipo">
                ${crearTiposHTML(pokemon)}
            </div>

            <div class="detalle-datos">

                <span class="detalle-dato">
                    Altura: ${pokemon.height / 10} m
                </span>

                <span class="detalle-dato">
                    Peso: ${pokemon.weight / 10} kg
                </span>

            </div>

            <h3>
                Estadísticas base
            </h3>

            <div class="estadisticas">

                ${estadisticas}

            </div>

        </div>
    `;

    modal.classList.add("activo");
}


function cerrarDetalle() {

    modal.classList.remove("activo");
}