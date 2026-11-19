import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { buscarContenido } from "./api/api-itunes";
import Busqueda from "./components/busqueda";

export default function App() {
  const [consulta, setConsulta] = useState(null);

  //consulta?.tipo: si consulta es null, devuelve undefined en vez de dar error
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["itunes", consulta?.tipo, consulta?.termino],
    queryFn: ({ signal }) => 
      buscarContenido(consulta?.termino, consulta?.tipo, signal),
    enabled: !!consulta,
  });

  return (
    <div>
      <Busqueda onBuscar={setConsulta}/>

      {isLoading && <p>Cargando...</p>}
      {isError && <p role = "alert">Error: {error.message}</p>}
      {data && (
        <ul>
          {data.map((c) => (
            <li key = {c.trackId}> {c.trackName} - {c.artistName}</li>
          ))}
        </ul>
      )}
    </div>
  );
}