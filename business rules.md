# Generador de grafos de conocimiento utilizando relaciones semánticas de WikiData

### Reglas de negocio

#### Barra de búsqueda
La barra de búsqueda debe permitir al usuario introducir un término y mostrar los siete ítems de WikiData cuya etiqueta se aproxime más a este término.
La lista de resultados debe mostrar la etiqueta y descripción de cada ítem.
El usuario debe poder seleccionar un ítem de la lista, el cuál se convertirá en el ítem raíz del grafo.
La barra de búsqueda debe informar al usuario si no se han encontrado resultados para el término buscado.

#### Recolección de datos
La aplicación debe reaccionar a cambios en la barra de búsqueda, realizando una petición a la API de WikiData que obtenga los ítems que coincidan con el término buscado.
La aplicación debe reaccionar a cambios en el ítem seleccionado, realizando una petición a la API de WikiData que obtenga las propiedades de este ítem y sus valores.


#### Generación de estructuras
La estructura de datos consumida por el grafo renderizado debe ser un objeto almacenado en el estado global que contenga un arreglo de nodos y un arreglo de aristas.
Cada nodo debe tener un identificador único y una etiqueta, estos atributos deben corresponder a los del ítem o propiedad de WikiData que representa el nodo.
Cada arista debe tener los identificadores de los nodos de origen y destino.


#### Renderizado de estructuras

#### Capa de presentación

