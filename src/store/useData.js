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
    const allProperties = await wikiData.getEntity(mainArticle.id, ['claims'])

    const filteredProperties = Object.values(allProperties.claims)
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

    set({ graphData: { nodes, links }, mainArticle, nodeMap })

    for (const prop of filteredProperties) {
      const propertyId = prop[0].mainsnak.property
  
      if (!(nodeMap.has(propertyId))) {
        const propertyInfo = await wikiData.getEntity(propertyId, ['labels'])

        const propertyNode = {
          id: propertyId,
          name: propertyInfo.labels.en.value,
          property: true
        }
  
        nodes.push(propertyNode)
        nodeMap.set(propertyId, propertyNode)
      }
      
      links.push({
        source: mainArticle.id,
        target: propertyId
      })

      set({ graphData: { nodes, links }, mainArticle, nodeMap })
  
      for (const value of prop) {
        const valueId = value.mainsnak.datavalue.value.id

        if (!(nodeMap.has(valueId))) {
          const valueInfo = await wikiData.getEntity(valueId, ['labels'])

          const valueNode = {
            id: valueId,
            name: valueInfo.labels.en.value,
          }
  
          nodes.push(valueNode)
          nodeMap.set(valueId, valueNode)
        }
  
        links.push({
          source: propertyId,
          target: valueId
        })

        set({ graphData: { nodes, links }, mainArticle, nodeMap })
      }
    }

    // set({ graphData, mainArticle, nodeMap })
  }
}))

export default useData