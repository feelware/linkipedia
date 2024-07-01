import axios from "axios"

const wikidata_base_url = 'https://www.wikidata.org/w/api.php?&format=json&origin=*'
const sparql_base_url = 'https://query.wikidata.org/sparql'
const headers = { 'User-Agent': 'Linkipedia/0.0 (https://linkipedia.vercel.app/; stevanpersonal@gmail.com' }

const makeQueryFor = (id) => encodeURIComponent(`
  SELECT 
  ?prop              # id propiedad
  ?propId            # explicit prop id
  ?propLabel         # nombre propiedad
  ?ps_               # id valor
  ?ps_Id             # explicit ps_ id
  ?ps_Label          # nombre valor
  ?ps_Description    # descripcion valor
  WHERE {
    # valor asignado para trabajar
    VALUES ?item { wd:${id} }
    
    # config para obtencion de columnas deseadas
    ?item ?a ?value.
    ?value ?ps ?ps_.
    
    ?prop wikibase:claim ?a.
    ?prop wikibase:statementProperty ?ps.
    ?prop wikibase:propertyType wikibase:WikibaseItem.
    
    # lista negra
    FILTER(?prop NOT IN(wd:P2184, wd:P5008, wd:P6104, wd:P373, wd:P1151, wd:P1424, wd:P910, wd:P2959))
    
    # explicit id de prop y ps_
    BIND(SUBSTR(STR(?prop), 32 ) AS ?propId)
    BIND(SUBSTR(STR(?ps_), 32 ) AS ?ps_Id)
    
    # config para que ordenar por property sea posible
    BIND(xsd:integer(SUBSTR(STR(?prop), 33 )) AS ?propNumber)
    BIND(DATATYPE(?propNumber) AS ?propNumberType)  
    
    # obtencion de labels en ingles
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  }
  # ordenado por importancia de property (de menor a mayor)
  ORDER BY (?propNumber)
`)

const searchArticles = async (search, signal) => {
  const url = wikidata_base_url
  + '&language=en'
  + '&action=wbsearchentities'
  + '&type=item'
  + '&continue=0'
  + '&limit=8'
  + `&search=${search}`
  const res = await axios.get(url, { signal, headers })
  return res.data.search
}

const getBindingsOf = async (itemId) => {
  const url = sparql_base_url + '?query=' + makeQueryFor(itemId)
  const res = await axios.get(url, {
    Accept: 'application/sparql-results+json',
    ...headers
  })
  const bindings = res.data.results.bindings
  return bindings.map(p => ({
    property: {
      id: itemId + ':' + p.propId.value,
      name: p.propLabel.value,
      isProperty: true
    },
    item: {
      id: p.ps_Id.value,
      name: p.ps_Label.value,
      desc: p.ps_Description?.value || 'No description available.'
    }
  }))
}

const getWikipediaArticleNameOf = async (itemId) => {
  const url = wikidata_base_url
  + '&action=wbgetentities'
  + `&ids=${itemId}`
  + '&props=sitelinks'
  + '&sitefilter=enwiki'
  const res = await axios.get(url, { headers })
  const siteLinks = res.data.entities[itemId].sitelinks
  if (!siteLinks.enwiki) {
    return null
  }
  const articleName = res.data.entities[itemId].sitelinks.enwiki.title
  return articleName
}

export default {
  searchArticles,
  getWikipediaArticleNameOf,
  getBindingsOf
}