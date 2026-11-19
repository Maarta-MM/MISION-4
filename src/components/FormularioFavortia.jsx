import { useForm } from "react-hook-form"

export default function FormularioFavorita(){
    const {register, handleSubmit} = useForm();

    const enviar = (datos) => {console.log(datos)};

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