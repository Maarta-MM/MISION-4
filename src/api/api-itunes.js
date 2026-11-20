import { esquemaResupuestaItunes } from "../schemas/esquema";

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

    //datos.results[0].trackName = 12345;
    const resultado = esquemaResupuestaItunes.safeParse(datos.results);

    if (!resultado.success) {
        console.error("Respuesta de iTunes no válida: ", resultado.error);
        throw new Error("Respuesta de iTunes con formato inesperado");
    }

    return datos.results;
}

export function normalizarCancion(c){
    return {
        id: c.trackId,
        titulo: c.trackName,
        subtitulo: c.artistName,
        imagen: c.artworkUrl100,
        preview: c.previewUrl,
        url:c.trackViewUrl,
    };
}