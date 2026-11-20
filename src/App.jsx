import { useState } from "react";
import Busqueda from "./components/Busqueda";
import Resultados from "./components/Resultados";
import PanelCancion from "./components/PanelCancion";

export default function App() {
    const [consulta, setConsulta] = useState(null);
    const [seleccionada, setSeleccionada] = useState(null);
    const [sonandoId, setSonandoId] = useState(null);

    return (
        <div id="app">
            <h1>Sonora</h1>
            <Busqueda onBuscar={setConsulta} />

            <div className={seleccionada ? "pantallaPartida" : ""}>
                <Resultados
                    consulta={consulta}
                    sonandoId={sonandoId}
                    onReproducir={setSonandoId}
                    onElegir={setSeleccionada}
                />
                {seleccionada && (
                    <PanelCancion
                        cancion={seleccionada}
                        onCerrar={() => setSeleccionada(null)}
                    />
                )}
            </div>
        </div>
    );
}