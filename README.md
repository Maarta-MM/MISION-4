# MISIÓN 3

## Uso de IA - Claude

prompt:
"estoy hacienod una aplicacion con react donde tengo dos tipos de tarjetas con información. necesito una forma de reuitilizar mi codigo de tarjetas donde pueda intercambiar un boton por texto dependiendo de la tarjeta que quiera."

Como bien dice el prompt buscaba la forma en la que desplegar el boton de puntuar en las tarjetas que se desplegaban en la pestaña de resultados y otras que desplegaran la nota y comentario que le pone el usuario a cada canción. Tras este prompt claude me dió tres opciones:

1. Prop action. 

Básicamente un parametro más de cada tarjeta donde introduciría el boton o el texto que quisiera.

2. Prop variant.

Menos flexible que el anterior, para las dos variables que le propuse. introduce un condicional en la función que devuelve la tarjeta donde si es indicado como botón pone dicho botón o el texto si no lo es.

3. children (con la que me quedé)

```javascript
function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

<Card title="Tarjeta">
  <p>Mi contenido</p>
  <button>Click</button>
</Card>
```

Me quede con esta porque indicaba que era la más útil si quería que el contenido interno sea personalizable, además de que esta con esta opción le puedo pasar más de un elemento a Tarjeta de forma mucho más intuitiva, lo cual hace que pudiera meter tanto la nota como el comentario y si en el futuro quisiera poner más cosas también podría.

A raíz de mi elección le pregunté a claude (prompt): "Que es children realmente? como funciona?"

Lo que yo entendí de lo que me respondió fue que es como un hueco que dejas en un componente para luego rellenarlo.

En mi Tarjeta finalmente se utiliza así, pasamos una variable onElegir y debajo de todo lo fijo:

```javascript
{children}

{onElegir && (
    <button type="button" onClick={() => onElegir(item)}>
        ★ Puntuar ★
    </button>
)}
```

Como ya he explicado, donde en la pestaña de busqueda pone el boton de puntuar, en favoritos se sustuye por la nota y el comentario, esto es porque en resultados pasamos onElegir y nada más y en listaFav no pasamos el parametro pero si que introducimos la nota y el comentario. 

El botón no lo paso como children porque este nunca cambia y en el caso de que en un futuro quisiera implementar un boton de repuntuar podría reutilizar el código sin cambiar mucho aparte de Tarjeta. 

## Autopsia

La decisión de usar children en vez de action también podria haber sido solucionado con dos componentes distintos para las tarjetas que salen en la busqueda y las que salen en favoritos. Esta hecho así porque ahora mismo no hacen mucho más que desplegar información y difieren únicamente en el botón y la nota con comentario, pero si quisiera añadir una función de eliminar una puntuación o editarla introduciría nuevos condicionales. 

Decidí rellenar automáticamente el campo de titulo y artista aunque estos siguieran siendo editables. Esto hace que si un usuario decidiera cambiar alguno de estos campos o los dos, los metadatos ya no coincidirían con lo guardado en la web. Lo dejé así para la validación de zod, aunque en un futuro no deberían ser variables. 