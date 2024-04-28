# Generador de grafos de conocimiento utilizando relaciones semánticas de WikiData

### Reglas de negocio

#### Barra de búsqueda
La barra de búsqueda debe permitir al usuario introducir un término y mostrar los siete ítems de WikiData cuya etiqueta se aproxime más a este término.
Los resultados de búsqueda deben mostrarse en una lista desplegable, mostrando la etiqueta y descripción de cada ítem.
El usuario debe poder seleccionar un ítem de la lista, el cuál se convertirá en el ítem raíz del grafo.
La barra de búsqueda debe informar al usuario si no se han encontrado resultados para el término buscado.

#### Recolección de datos
La aplicación debe realizar una petición HTTP que obtenga los ítems que coincidan con el término buscado.
La aplicación debe realizar una petición HTTP que obtenga las relaciones del ítem raíz.
La aplicación debe realizar una petición HTTP que obtenga las relaciones de cada ítem del grafo que el usuario desee expandir.

#### Generación de estructuras
La aplicación debe generar una estructura de grafo a partir de los ítems y relaciones que el usuario desea visualizar.
La estructura debe estar compuesta por dos arreglos: uno para los nodos y otro para las aristas.
Cada nodo debe tener como mínimo un identificador único y una etiqueta.
Cada arista debe tener como mínimo los identificadores de los nodos que conecta (orígen y destino).
Al iniciar la aplicación, ambos arreglos deben estar vacíos.
Tras elegir al ítem raíz, el arreglo de nodos debe contener un solo elemento, el ítem raíz, y el arreglo de aristas debe estar vacío.
Tras devolver las relaciones del ítem raíz, el arreglo de nodos debe contener los ítems relacionados y el arreglo de aristas debe contener las relaciones entre el ítem raíz y los ítems relacionados.

#### Renderizado de estructuras

#### Capa de presentación

