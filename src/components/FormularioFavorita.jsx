import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { guardarFavoritas } from "../api/api-favoritas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { esquemaFavorita } from "../schemas/esquema";

// reglas

export default function FormularioFavorita({cancion, onGuardada}){
    const queryClient = useQueryClient();

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(esquemaFavorita),
        defaultValues: {
            titulo: cancion.titulo, 
            artista: cancion.subtitulo, 
            nota: "", 
            comentario: ""},
    });

    const mutacion = useMutation({
        mutationFn: guardarFavoritas,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["favoritas"]});
            onGuardada();
        },
    });

    async function onSubmit(datos) {
        mutacion.mutate({
            ...datos,
            trackId: cancion.id,
            portada: cancion.imagen,
            preview: cancion.preview,
        });
    }

    // guarda en "titulo", RHF lo leerá cuando haga falta
    // noValidate hace que le diga al nav q deja a RHF y a Zod hacer las validaciones
    // !! convierte a bool
    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
                <label htmlFor="titulo">Título</label>
                <input 
                    id="titulo"
                    aria-invalid={!!errors.titulo}
                    aria-describedby={errors.titulo ? "error-titulo": undefined}
                    placeholder="Nombre de la canción" 
                    {...register("titulo")}
                /> 
                {errors.titulo && (
                    <p id="error-titulo" role="alert">{errors.titulo.message}</p>
                )}
            </div>
            <div>
                <label htmlFor="artista">Artista</label>
                <input 
                    id="artista"
                    aria-invalid={!!errors.artista}
                    aria-describedby={errors.artista ? "error-artista": undefined}
                    placeholder="Nombre del artista" 
                    {...register("artista")}
                />
                {errors.artista && (
                    <p id="error-artista" role="alert">{errors.artista.message}</p>
                )}
            </div>
            <div>
                <label htmlFor="nota">Nota (1-5)</label>
                <input 
                    id="nota"
                    type="number"
                    aria-invalid={!!errors.nota}
                    aria-describedby={errors.nota ? "error-nota": undefined}
                    {...register("nota")}
                />
                {errors.nota && (
                    <p id="error-nota" role="alert">{errors.nota.message}</p>
                )}
            </div>
            <div>
                <label htmlFor="comentario">Comentario (opcional)</label>
                <textarea 
                    id="comentario"
                    aria-invalid={!!errors.comentario}
                    aria-describedby={errors.comentario ? "error-comentario": undefined} 
                    {...register("comentario")}
                />
                {errors.comentario && (
                    <p id="error-comentario" role="alert">{errors.comentario.message}</p>
                )}
            </div>
            
            <button type="submit" disabled={mutacion.isPending}>
                {mutacion.isPending ? "Guardando…" : "Guardar"}
            </button>

            {mutacion.isError && (
                <p role="alert">{mutacion.error.message}</p>
            )}
        </form>
    );
}