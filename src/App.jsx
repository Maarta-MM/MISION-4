import { useState } from "react";
import Busqueda from "./components/Busqueda";
import Resultados from "./components/Resultados";
import PanelCancion from "./components/PanelCancion";
import ListaFavoritas from "./components/ListaFavoritas";

export default function App() {
    const [consulta, setConsulta] = useState(null);
    const [seleccionada, setSeleccionada] = useState(null);
    const [sonandoId, setSonandoId] = useState(null);
    const [vista, setVista] = useState("busqueda");

    function buscar(nuevaConsulta) {
        setConsulta(nuevaConsulta);
        setVista("busqueda");
        setSeleccionada(null);
    }

    function cambiarVista(nuevaVista) {
        setVista(nuevaVista);
        setSeleccionada(null);
        setSonandoId(null);
    }

    return (
        <div id="app">
            <h1>Sonora</h1>

            <Busqueda onBuscar={buscar} />

            <nav id="pestanas">
                <button
                    type="button"
                    aria-current={vista === "busqueda" ? "page" : undefined}
                    onClick={() => cambiarVista("busqueda")}
                >
                    Buscar
                </button>
                <button
                    type="button"
                    aria-current={vista === "favoritas" ? "page" : undefined}
                    onClick={() => cambiarVista("favoritas")}
                >
                    Mis favoritas
                </button>
            </nav>

            {vista === "busqueda" ? (
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
            ) : (
                <ListaFavoritas
                    sonandoId={sonandoId}
                    onReproducir={setSonandoId}
                />
            )}
        </div>
    );
}