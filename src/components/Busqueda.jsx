import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { esquemaBusqueda } from "../schemas/esquema";

export default function Busqueda({onBuscar}){
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(esquemaBusqueda),
        defaultValues: {termino: "", tipo: "cancion"},
        shouldFocusError: true,
    });

    function onSubmit({termino, tipo}){
        onBuscar({termino, tipo});
    }

    return (
        <form id="barraBusqueda" onSubmit={handleSubmit(onSubmit)} role="search" noValidate>
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
                aria-invalid={!!errors.termino}
                aria-describedby={errors.termino ? "error-termino": undefined} //Se lee: “si hay error, apunta a error-termino; si no, no pongas el atributo”.
                {...register("termino")}
            />

            <button id="botonBusqueda" type = "submit">Buscar</button>

            {errors.termino && (
                <p id="error-termino" role="alert" className="errorBusqueda">
                    {errors.termino.message}
                </p>
            )}
        </form>
    );
}