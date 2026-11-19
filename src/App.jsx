import { useState } from "react";
import Busqueda from "./components/Busqueda";
import Resultados from "./components/Resultados";

export default function App() {
    const [consulta, setConsulta] = useState(null);
    const [seleccionada, setSeleccionada] = useState(null);
    const [sonandoId, setSonandoId] = useState(null);

    return (
        <div id="app">
            <h1>Sonora</h1>
            <Busqueda onBuscar={setConsulta} />
            <Resultados
                consulta={consulta}
                sonandoId={sonandoId}
                onReproducir={setSonandoId}
                onElegir={setSeleccionada}
            />
            {seleccionada && <p>Has elegido: {seleccionada.titulo}</p>}
        </div>
    );
}