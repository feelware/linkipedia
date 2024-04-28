import axios from "axios"

const baseUrl = 'https://www.wikidata.org/w/api.php?&format=json&origin=*'
const headers = { 'User-Agent': 'Linkipedia/0.0 (https://linkipedia.vercel.app/; stevanpersonal@gmail.com' }

const searchArticles = async (search, signal) => {
  const url = baseUrl
  + '&language=en'
  + '&action=wbsearchentities'
  + '&type=item'
  + '&continue=0'
  + `&search=${search}`
  const res = await axios.get(url, { signal, headers })
  return res.data.search
}

const getEntity = async (id, props) => {
  const url = baseUrl
  + '&languages=en'
  + '&action=wbgetentities'
  + (props && `&props=${props.join('|')}`)
  + `&ids=${id}`
  const res = await axios.get(url, { headers })
  return res.data.entities[id]
}

export default {
  searchArticles,
  getEntity
}