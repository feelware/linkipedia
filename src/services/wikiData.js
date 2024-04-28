import axios from "axios"

const baseUrl = 'https://www.wikidata.org/w/api.php?&format=json&origin=*'
const headers = { 'User-Agent': 'Linkipedia/0.0 (https://linkipedia.vercel.app/; stevanpersonal@gmail.com' }

const searchUrl = (search) => baseUrl
  + '&language=en'
  + '&action=wbsearchentities'
  + '&type=item'
  + '&continue=0'
  + `&search=${search}`

const getEntityUrl = (id, props) => baseUrl
  + '&action=wbgetentities'
  + (props && `&props=${props.join('|')}`)
  + `&ids=${id}`

const searchArticles = async (search, signal) => {
  const res = await axios.get(searchUrl(search), { signal, headers })
  return res.data.search
}

const getEntity = async (id, props) => {
  const res = await axios.get(getEntityUrl(id, props), { headers })
  return res.data.entities[id]
}

export default {
  searchArticles,
  getEntity
}