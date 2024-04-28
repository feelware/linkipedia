# Generador de grafos de conocimiento utilizando relaciones semánticas de WikiData

### Reglas de negocio

#### Barra de búsqueda
La barra de búsqueda debe permitir al usuario buscar un término y obtener los siete ítems de WikiData cuya etiqueta se aproxime más al término buscado.
La lista de resultados debe mostrar la etiqueta y descripción de cada ítem.
La lista de resultados debe permitir al usuario seleccionar un ítem, guardándolo en el estado global de la aplicación como ítem principal.
La barra de búsqueda debe informar a la aplicación sobre cambios en la entrada del usuario una vez este haya dejado de escribir durante medio segundo (input debouncing).
La barra de búsqueda debe informar al usuario si no se han encontrado resultados para el término buscado.

#### Recolección de datos
La aplicación debe reaccionar a cambios en la barra de búsqueda, realizando una petición a la API de WikiData que obtenga los ítems que coincidan con el término buscado.
Las solicitudes de búsqueda deben ser canceladas si el usuario realiza una nueva búsqueda antes de que la anterior haya finalizado (abort controller).
La aplicación debe reaccionar a cambios en el ítem seleccionado, realizando una petición a la API de WikiData que obtenga las propiedades de este ítem y sus valores.
La aplicación debe almacenar en el estado global sólo aquellas propiedades cuyos valores sean referencias a otros ítems de WikiData.

#### Generación de estructuras
La estructura de datos consumida por el grafo renderizado debe ser un objeto almacenado en el estado global que contenga un arreglo de nodos y un arreglo de aristas.
Cada nodo debe tener un identificador único y una etiqueta, estos atributos deben corresponder a los del ítem o propiedad de WikiData que representa el nodo.
Cada arista debe tener los identificadores de los nodos de origen y destino.


#### Renderizado de estructuras

#### Capa de presentación

