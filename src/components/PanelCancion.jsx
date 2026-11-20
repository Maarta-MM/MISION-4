import FormularioFavorita from "./FormularioFavorita";

export default function PanelCancion({cancion, onCerrar, onGuardada}){
    const portada = cancion.imagen?.replace("100x100", "300x300");

    return (
        <aside id="panelCancion">
            <button type="button" onClick={onCerrar}>Cerrar</button>

            {portada && (<img src={portada} alt = {`Portada de ${cancion.titulo}`}/>)}
            <h2>{cancion.titulo}</h2>
            <p>{cancion.subtitulo}</p>

            {cancion.preview && <audio controls src={cancion.preview}/>}

            <FormularioFavorita 
                key = {cancion.id}
                cancion = {cancion}
                onGuardada = {onGuardada}
            />
        </aside>
    );
}