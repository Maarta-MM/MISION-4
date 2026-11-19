const URL_FAVORITAS = "http://localhost:3001/favoritas"

export async function guardarFavoritas(datos) {
    const respuesta = await fetch(URL_FAVORITAS, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(datos)
    });

    if(!respuesta.ok){
        throw new Error("No se pudo guardar la canción");
    }

    return await respuesta.json();
}

export async function obtenerFavoritas() {
    const respuesta = await fetch(URL_FAVORITAS);
    if (!respuesta.ok) throw new Error("No se pudieron cargar las favoritas");
    return await respuesta.json();
}