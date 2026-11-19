import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { guardarFavoritas } from "../api/api-favoritas";

// reglas
// coerce cambia a lo que quieras que sea, si mete string saca numero
const esquemaFavorita = z.object({
    titulo: z.string().min(1, "El título es obligatorio"),
    artista: z.string().min(1, "El artista es obligatorio"),
    nota: z.coerce.number().min(1, "Mínimo 1").max(5, "Máximo 5"),
    comentario: z.string().max(350, "Máximo 350 caracteres"),
});

export default function FormularioFavorita(){
    const {register, handleSubmit, reset, formState: {errors, isSubmitting}} = useForm({
        resolver: zodResolver(esquemaFavorita),
        defaultValues: {titulo: "", artista: "", nota: "", comentario: ""},
    });

    async function onSubmit(datos) {
        try{
            await guardarFavoritas(datos);
            console.log("Canción guardada correctamente");
            reset();
        }catch (error){
            console.error("Error al guardar: ", error);
        }
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
            
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando" : "Guardar"}
            </button>
        </form>
    );
}