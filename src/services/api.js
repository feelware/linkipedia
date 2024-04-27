import axios from "axios"

const getUrl = (input) => `https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&language=en&type=item&continue=0&origin=*&search=${input}`


const searchArticles = async (input, signal) => {
  const res = await axios.get(getUrl(input), { 
    signal,
    headers: { 'User-Agent': 'Linkipedia/0.0 (https://linkipedia.vercel.app/; stevanpersonal@gmail.com' } 
  })
  // console.log(res)
  return res.data.search
}

export default {
  searchArticles
}