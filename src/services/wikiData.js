import axios from "axios"

const baseUrl = 'https://www.wikidata.org/w/api.php?&format=json&origin=*'
const headers = { 'User-Agent': 'Linkipedia/0.0 (https://linkipedia.vercel.app/; stevanpersonal@gmail.com' }

const searchUrl = (search) => baseUrl
  + '&language=en'
  + '&action=wbsearchentities'
  + '&type=item'
  + '&continue=0'
  + `&search=${search}`

const getUrl = (id) => baseUrl
  + '&action=wbgetentities'
  + `&ids=${id}`

const searchArticles = async (search, signal) => {
  const res = await axios.get(searchUrl(search), { signal, headers })
  return res.data.search
}

const getProperties = async (id) => {
  console.log(getUrl(id))
  const res = await axios.get(getUrl(id), { headers })
  return res.data.entities[id].claims
}

export default {
  searchArticles,
  getProperties
}