import { useForm } from "react-hook-form";

export default function Busqueda({onBuscar}){
    const {register, handleSubmit} = useForm({
        defaultValues: {termino: "", tipo: "cancion"}
    });

    function onSubmit({termino, tipo}){
        const termino_limpio = termino.trim();
        if (termino_limpio) onBuscar({termino: termino_limpio, tipo})
    }

    return (
        <form id="barraBusqueda" onSubmit={handleSubmit(onSubmit)}>
            <select 
                id="tipoBusqueda" 
                aria-label="Tipo de búsqueda"
                {...register("tipo")}
            >
                <option value="cancion">Canción</option>
                <option value="artista">Artista</option>
            </select>

            <input 
                id="contenidoBusqueda"
                type="search" 
                aria-label="Buscar canción o artista"
                placeholder="Buscar canción o artista"
                {...register("termino")}
            />

            <button id="botonBusqueda" type = "submit">Buscar</button>
        </form>
    );
}