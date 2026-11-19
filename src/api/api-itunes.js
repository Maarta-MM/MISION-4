const URL_API = "https://itunes.apple.com/search";
const LIMITE = "20";
const PAIS = "ES";

export async function buscarContenido(termino, tipo, signal){
    const url = new URL(URL_API);

    const parametros = ({
        term: termino,
        media: "music",
        entity: "song",
        limit: LIMITE,
        country: PAIS
    });
    
    if(tipo === "artista") parametros.attribute = "artistTerm";

    url.search = new URLSearchParams(parametros);

    const respuesta = await fetch(url, {signal});

    if(!respuesta.ok){
        throw new Error("No se pudo obtener las canciones");
    }

    const datos = await respuesta.json();

    if (!Array.isArray(datos.results)) {
        throw new Error("Respuesta de la API con formato inesperado");
    }

    return datos.results;
}