import { useForm } from "react-hook-form";

export default function Busqueda({onBuscar}){
    const {register, handleSubmit} = useForm({
        defaultValues: {termino: "", tipo: "cancion"}
    });

    function onSubmit({termino, tipo}){
        if (termino.trim()) onBuscar({termino: termino.trim(), tipo})
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="termino">Buscar</label>
            <input id="termino" {...register("termino")}/>

            <select aria-label="Tipo de búsqueda" {...register("tipo")}>
                <option value="cancion">Canción</option>
                <option value="artista">Artista</option>
            </select>

            <button type="submit">Buscar</button>
        </form>
    );
}