# Generador de grafos de conocimiento utilizando relaciones semánticas de WikiData

### Presentación del problema y objetivos del proyecto

En el contexto académico actual, los estudiantes a menudo se encuentran con la necesidad de buscar información sobre temas con los que no están familiarizados. En muchos casos, la comprensión de estos temas requiere un entendimiento previo de otros conceptos relacionados que, a su vez, pueden depender de otros conceptos. Recorrer esta red de dependencias puede causar que el estudiante se sienta abrumado por la cantidad de información que debe asimilar y pierda el enfoque de lo que realmente necesita aprender.

Herramientas para tomar apuntes como Obsidian han ganado popularidad en los últimos años por su capacidad de representar visualmente las relaciones entre distintos conceptos. Al tomar apuntes sobre un tema, los usuarios pueden incluir enlaces a otros apuntes relacionados. Obsidian se encarga de representar estas conexiones a través de un grafo interactivo, permitiendo a los usuarios entender la estructura del conocimiento que han generado.

En este sentido, nuestro objetivo es extrapolar esta funcionalidad a una aplicación web que trabaje con una base de conocimiento lo suficientemente grande y estructurada como para ser útil a estudiantes de distintas disciplinas, permitiendo explorar las relaciones semánticas entre cualquier concepto de interés.

Para ello, se plantea trabajar con WikiData, una base de conocimiento colaborativa que almacena información estructurada sobre una amplia variedad de temas. Esta información es almacenada en forma de ítems, que pueden ser entidades, conceptos, lugares, eventos, entre otros. Cada ítem tiene una serie de propiedades que describen sus características, y cada propiedad puede tener uno o más valores, que pueden ser otros ítems de WikiData.

Nuestra aplicación permitirá a los usuarios buscar un ítem de interés y visualizar un grafo interactivo que muestre sus relaciones con otros ítems en forma de nodos interconectados, permitiendo expandir cualquiera de estos nodos para obtener sus propias relaciones. De este modo, le ofreceremos a los estudiantes una forma de navegar por la vasta red del conocimiento humano sin perderse en el camino.

### Descripción de las funcionalidades del proyecto

#### Búsqueda de ítems
La aplicación contará con una barra de búsqueda donde podremos ingresar el concepto que nos interese explorar. En una lista desplegable, se mostrarán los resultados de nuestra búsqueda, incluyendo una pequeña descripción para cada ítem. Podemos elegir cualquiera de estos resultados al hacer clic en él.

#### Generación de grafo inicial
Al momento de seleccionar el ítem de interés, se renderizará un grafo en pantalla que represente sus relaciones con otros ítems de WikiData.

#### Expansión de ítems elegidos
Al hacer clic derecho sobre cualquier ítem y seleccionar la opción de expandir, se añadirán al grafo los nodos correspondientes a las relaciones de dicho ítem. De este modo, podremos profundizar en la red de conocimiento a partir de cualquier punto.

### Reglas de negocio

#### Barra de búsqueda
- La barra de búsqueda debe permitir al usuario introducir un término y mostrar los siete ítems de WikiData cuya etiqueta se aproxime más a este término.
- Los resultados de búsqueda deben mostrarse en una lista desplegable, mostrando la etiqueta y descripción de cada ítem.
- El usuario debe poder seleccionar un ítem de la lista, el cuál se convertirá en el ítem raíz del grafo.
- La barra de búsqueda debe informar al usuario si no se han encontrado resultados para el término buscado.

#### Recolección de datos
- La aplicación debe realizar una petición HTTP que obtenga los ítems que coincidan con el término buscado.
- La aplicación debe realizar una petición HTTP que obtenga las propiedades del ítem raíz.
- La aplicación debe realizar una petición HTTP que obtenga las propiedades de cada ítem del grafo que el usuario desee expandir.
Solo deben obtenerse las propiedades cuyos valores sean otros ítems de WikiData.

#### Generación de estructuras
- La aplicación debe generar proceduralmente una estructura de grafo a partir de los ítems y relaciones obtenidos de WikiData.
- La estructura debe ser almacenada en el estado global de la aplicación, para que sea consumida por los componentes que la renderizan.
- La estructura debe estar compuesta por dos arreglos: uno para los nodos y otro para las aristas.
- Cada nodo debe tener, como mínimo, un identificador único, una etiqueta y una descripción. Estos atributos deben corresponder a la información obtenida de WikiData.
- Cada arista debe tener, como mínimo, los identificadores de los nodos que conecta (orígen y destino).
- Al iniciar la aplicación, ambos arreglos deben estar vacíos.
- Tras elegir al ítem raíz, un primer nodo correspondiente a este ítem debe ser añadido al arreglo de nodos.
- Por cada propiedad obtenida del ítem raíz, un nodo correspondiente a dicha propiedad debe ser añadido al arreglo de nodos. De igual modo, una arista que conecta al nodo raíz con el nodo propiedad debe ser añadida al arreglo de aristas.
- Para cada valor de cada propiedad, un nodo correspondiente a dicho valor debe ser añadido al arreglo de nodos. De igual modo, una arista que conecta al nodo propiedad con el nodo valor debe ser añadida al arreglo de aristas.
- El usuario debe poder expandir un nodo del grafo para obtener más información sobre él. Al expandir un nodo, se deben añadir a los arreglos existentes los nodos y aristas correspondientes a las propiedades y valores del nodo expandido, siguiendo el mismo proceso descrito anteriormente.
- La aplicación debe evitar la creación de nodos duplicados. Si un nodo ya existe en el arreglo de nodos, solo se deben añadir las aristas correspondientes a dicho nodo.

#### Renderizado de estructuras
- El grafo debe ser renderizado como un grafo de fuerza dirigida, de modo que los nodos conectados se atraigan y los no conectados se repelan.
- El componente de renderizado debe reaccionar a cambios en la estructura almacenada en el estado global de la aplicación, volviendo a renderizar el grafo cada vez que se añadan nuevos nodos y aristas.
- El nodo raíz debe tener un color distinto al resto de los nodos. Lo mismo para cada nodo expandido por el usuario.
- Los nodos que representan valores deben verse más prominentes que los nodos que representan propiedades, tanto en color como en tamaño.
- Cada nodo debe tener un tooltip que muestre su etiqueta y descripción.
- Cada nodo debe ser clicable, de modo que al hacer clic derecho sobre él se despliegue un menú contextual con las opciones de expandir o contraer, así como de abrir su entrada de WikiData en una nueva pestaña, abrir su artículo en Wikipedia en una nueva pestaña, entre otras opciones.

#### Capa de presentación
- La aplicación debe tener tanto modo claro como oscuro, el cuál puede ser cambiado por el usuario en cualquier momento.
- La aplicación debe adaptarse a distintos tamaños de pantalla, de modo que pueda ser utilizada en dispositivos móviles y de escritorio.
- La barra de búsqueda debe ser relativamente pequeña y posicionarse en la esquina superior izquierda de la pantalla.
- La barra de búsqueda debe contener un pequeño ícono de carga que se muestre mientras se realizan las peticiones HTTP correspondientes a la búsqueda.
- Una notificación debe aparecer en la esquina inferior derecha de la pantalla mientras se realizan las peticiones HTTP correspondientes a la obtención de propiedades y valores de ítems. Esta notificación debe informar al usuario si la información está siendo cargada, si acaba de terminar de cargar o si ha ocurrido un error.
- El lienzo del grafo debe ocupar toda la pantalla, mientras que la barra de búsqueda y la notificación deben ser superpuestas sobre el lienzo.

### Definición de roles

#### Implementación de búsqueda
Encargada de implementar la barra de búsqueda con la que el usuario podrá elegir el ítem raíz del grafo. Deberá trabajar junto con el encargado de recolección de datos para asegurarse que los ítems sean obtenidos de forma correcta.

#### Recolección de datos
Encargado de desarrollar el servicio de peticiones HTTP: una serie de funciones que se comunicarán con la API de WikiData para obtener la información de búsqueda y las propiedades de los ítems. Estas funciones serán llamadas por distintos componentes de la aplicación según sea necesario.

#### Generación de estructuras
Encargado de desarrollar las funciones que generarán proceduralmente la estructura de grafo a partir de los ítems y relaciones obtenidos de WikiData. Deberá trabajar junto con el encargado de recolección de datos para asegurarse que la información sobre los ítems sea obtenida de forma correcta.

#### Renderizado de estructuras
Encargado de desarrollar el componente de renderizado que se encargará de mostrar el grafo en pantalla. Deberá trabajar junto con el encargado de generación de estructuras para asegurarse que la estructura consumida por el componente sea la correcta.

#### Capa de presentación
Encargada de desarrollar los estilos y la disposición de los elementos en pantalla. Deberá trabajar junto con todos los demás roles para asegurarse que la interfaz de usuario sea coherente e integrada.
