```
filtrar(atributos, query):
  para cada atributo:
    atributo_filtrado = copia sin hijos de atributo

    para cada hijo de atributo:
      si hijo cumple con query
        agregar hijo a hijos de atributo_filtrado

    si atributo_filtrado tiene hijos
      agregar atributo_filtrado a atributos_filtrados

  retornar atributos_filtrados
```