const CLAVE_EQUIPO = "pokedex-equipo";

function guardarEquipo(equipo) {

    localStorage.setItem(
        CLAVE_EQUIPO,
        JSON.stringify(equipo)
    );
}


function obtenerEquipoGuardado() {

    const equipoGuardado = localStorage.getItem(CLAVE_EQUIPO);

    if (!equipoGuardado) {
        return [];
    }

    return JSON.parse(equipoGuardado);
}


function eliminarEquipoGuardado() {

    localStorage.removeItem(CLAVE_EQUIPO);
}