import axios from "axios"

const getUrl = (input) => `https://en.wikipedia.org/w/rest.php/v1/search/page?q=${input}&limit=5`


const searchArticles = async (input, signal) => {
  const res = await axios.get(getUrl(input), { 
    signal,
    headers: { 'User-Agent': 'Linkipedia/0.0 (https://linkipedia.vercel.app/; stevanpersonal@gmail.com' } 
  })
  // console.log(res)
  return res.data.pages.map(r => r.title)
}

export default {
  searchArticles
}