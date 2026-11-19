import { useQuery } from "@tanstack/react-query";
import { buscarContenido, normalizarCancion } from "../api/api-itunes";
import Mensaje from "./Mensaje"
import Tarjeta from "./Tarjeta"

export default function Resultados({consulta, sonandoId, onReproducir, onElegir}) {
    const {data, isLoading, isError} = useQuery({
        queryKey: ["itunes", consulta?.tipo, consulta?.termino], //si algo cambia tanstack entiende que es otra busqueda y vuelve a pedir
        queryFn: ({ signal }) => 
            buscarContenido(consulta?.termino, consulta?.tipo, signal), //llama a buscarContenido, cancela peticiones viejas con signal
        enabled: !!consulta,
        select: (resultados) =>resultados.map(normalizarCancion) //transforma los datos antes de darlos 
    });

    if (!consulta) return <Mensaje>Busca algo para empezar</Mensaje>
    if(isLoading) return <Mensaje>Cargando...</Mensaje>
    if (isError) return <Mensaje clase = "error">No se pudo buscar, buélvelo a intentar</Mensaje>
    if (data.length === 0) return <Mensaje>No encontramos resultados</Mensaje>

    return (
        <section id = "resultado">
            {data.map((item) => (
                <Tarjeta
                    key={item.id}
                    item = {item}
                    sonando={sonandoId === item.id}
                    onReproducir={onReproducir}
                    onElegir = {onElegir}
                />
            )) }
        </section>       
    ); 
}

    