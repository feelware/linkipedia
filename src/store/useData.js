import { create } from "zustand"
import wikiData from "../services/wikiData"

const useData = create((set) => ({
  graphData: {
    nodes: [],
    links: []
  },

  mainArticle: '',

  setMainArticle: async (mainArticle) => {
    const allProperties = await wikiData.getProperties(mainArticle.id)

    const filteredProperties = Object.values(allProperties)
      .filter(prop => 
        prop.every(value => 
          value.mainsnak?.datatype === 'wikibase-item' 
          && value.mainsnak.datavalue
        )
      )
      .sort((a, b) =>
        // sort by property number
        a[0].mainsnak.property.substring(1) - b[0].mainsnak.property.substring(1)
      )
      
    const nodes = [mainArticle]
    const links = []

    filteredProperties.forEach(prop => {
      nodes.push({
        id: prop[0].mainsnak.property,
        name: prop[0].mainsnak.property
      })
      links.push({
        source: mainArticle.id,
        target: prop[0].mainsnak.property
      })

      prop.forEach(value => {
        nodes.push({
          id: value.mainsnak.datavalue.value.id,
          name: value.mainsnak.datavalue.value.id
        })
        links.push({
          source: value.mainsnak.property,
          target: value.mainsnak.datavalue.value.id
        })
      })
    })

    const graphData = { nodes, links }

    console.log(filteredProperties)
    set({ graphData, mainArticle })
  }
}))

export default useData