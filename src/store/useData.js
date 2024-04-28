import { create } from "zustand"
import wikiData from "../services/wikiData"

const useData = create((set) => ({
  graphData: {
    nodes: [],
    links: []
  },

  nodeMap: new Map(),

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
    const nodeMap = new Map()

    filteredProperties.forEach(prop => {
      const propertyId = prop[0].mainsnak.property

      const propertyNode = {
        id: propertyId,
        name: propertyId,
        nodeVisibility: false
      }

      nodes.push(propertyNode)
      nodeMap.set(propertyId, propertyNode)

      links.push({
        source: mainArticle.id,
        target: propertyId
      })

      prop.forEach(value => {
        const valueId = value.mainsnak.datavalue.value.id

        if (!(nodeMap.has(valueId))) {
          const valueNode = {
            id: valueId,
            name: valueId
          }
  
          nodes.push(valueNode)
          nodeMap.set(valueId, valueNode)
        }

        links.push({
          source: propertyId,
          target: valueId
        })
      })
    })

    const graphData = { nodes, links }

    set({ 
      graphData, 
      mainArticle,
      nodeMap
    })
  }
}))

export default useData