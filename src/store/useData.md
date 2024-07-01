```
funcion expandir(raiz):
  si nodo ya fue expandido
    retornar

  si raiz aun no ha sido agregada
    agregar raiz

  esperamos a obtener pares (propiedad, item) de raiz

  para cada par (propiedad, item):
    si propiedad aún no ha sido agregada 
      agregar propiedad
      agregar enlace (raiz -> propiedad)
      agregar propiedad a hijos de raiz
    sino
      propiedad = propiedad ya existente

    si item aún no ha sido agregado
      agregar item

    agregar enlace (propiedad -> item)
    agregar item a hijos de propiedad

  retornar nodos y enlaces
```