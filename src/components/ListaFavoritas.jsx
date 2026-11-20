import {useQuery} from "@tanstack/react-query";
import {obtenerFavoritas} from "../api/api-favoritas";
import Mensaje from "./Mensaje";
import Tarjeta from "./Tarjeta";

export default function ListaFavoritas(sonandoId, onReproducir){
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["favoritas"],
        queryFn: obtenerFavoritas,
        select: (lista) => 
            lista.map((f) => ({
                id: f.trackId,
                titulo: f.titulo,
                subtitulo: f.artista,
                imagen: f.portada,
                preview: f.preview,
                nota: f.nota,
                comentario: f.comentario,
        }))
    });

    if (isLoading) return <Mensaje>Cargando...</Mensaje>;
    if (isError) return <Mensaje clase = "error">{error.message}</Mensaje>;
    if (data.length === 0) return <Mensaje>Aún no has puntuado ninguna canción</Mensaje>;

    //el repeat con las estrellas hace que se ponga asi ★★★☆☆ por ejemplo para un 3/5
    return (
        <section id="resultado">
            {data.map((item) => (
                <Tarjeta
                    key={item.id}
                    item={item}
                    sonando={sonandoId === item.id}
                    onReproducir={onReproducir}
                >
                    <p className="notaFav" aria-label={`Nota: ${item.nota} de 5`}>
                        {"★".repeat(item.nota)}{"☆".repeat(5 - item.nota)}
                        <span> {item.nota}/5</span>
                    </p>
                    {item.comentario && <p className="comentarioFav">{item.comentario}</p>}
                </Tarjeta>
            ))}
        </section>
    )
}