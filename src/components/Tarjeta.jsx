import { useState, useRef, useEffect} from "react";

export default function Tarjeta({item, sonando, onReproducir, onElegir, children}) {
    const [imagenRota, setImagenRota] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        if (!sonando) audioRef.current?.pause();
    }, [sonando]);

    /*
        Children: es como un hueco que dejas en un componente para luego rellenarlo
        aqui donde en la pestaña de busqueda pone el boton de puntuar, 
        en favoritos se sustuuye por la nota y el comentario
        Esto es porque en resultadoos pasamos onElegir y nada más 
        y en listaFav no pasamos el parametro pero si que introducimos la nota y el comentario 
    */ 
    return (
        <article className="tarjeta">
            {item.imagen && !imagenRota && (
                <img 
                    src = {item.imagen} 
                    alt = {`Portada de ${item.titulo}`} 
                    onError={() => setImagenRota(true)}
                />
            )}

            <div className="tarjetaCuerpo">
                <h3>
                    {item.url ? (
                        <a href={item.url} target="_blank" rel="noopener noreferrer">{item.titulo}</a>
                    ) : (
                        item.titulo
                    )}
                </h3>
                
                <p>{item.subtitulo}</p>

                {item.preview && 
                    <audio 
                        ref = {audioRef} 
                        controls 
                        src = {item.preview}
                        onPlay={() => onReproducir(item.id)}
                    />
                }
                
                {children}

                {onElegir && (
                    <button type="button" onClick={() => onElegir(item)}>
                        ★ Puntuar ★
                    </button>
                )}
            </div>
        </article>
    );
}


