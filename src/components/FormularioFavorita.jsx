import { useForm } from "react-hook-form";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// reglas
// coerce cambia a lo que quieras que sea, si mete string saca numero
const esquemaFavorita = z.object({
    titulo: z.string().min(1, "El título es obligatorio"),
    artista: z.string().min(1, "El artista es obligatorio"),
    nota: z.coerce.number().min(1, "Mínimo 1").max(1, "Máximo 5"),
    comentario: z.string().max(350, "Máximo 350 caracteres"),
});

export default function FormularioFavorita(){
    const {register, handleSubmit} = useForm({resolver: zodResolver(esquemaFavorita)});

    const enviar = (datos) => {console.log(datos)};

    // guarda en "titulo", RHF lo leerá cuando haga falta
    return (
        <form onSubmit={handleSubmit(enviar)}>
            <input placeholder="Título" {...register("titulo")}/> //guarda en "titulo", RHF lo leerá cuando haga falta
            <input placeholder="Artista" {...register("artista")}/>
            <input type="number" placeholder="Nota (1-5)" {...register("nota")}/>
            <textarea placeholder="Comentario" {...register("comentario")}></textarea>
            <button type="submit">Guardar</button>
        </form>
    );
}