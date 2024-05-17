import { create } from "zustand"
import wikidata from "../services/wikidata"

const blacklist = [
  'P2184',  // history of topic
  'P5008',  // on focus list of Wikimedia project
  'P6104',  // maintained by WikiProject
  'P373',   // Commons category
  'P1151',  // topic's main Wikimedia portal
  'P1424',  // topic's main template
  'P910',   // topic's main category
  'P2959'   // permanent duplicated item
]

const useData = create((set) => ({
  graphData: {
    nodes: [],
    links: []
  },
  mainArticle: '',
  nodeMap: new Map(),
  fetch: 'idle',

  generateRelations: async (parent) => {
    try {
      const nodes = []
      const links = []
      const nodeMap = new Map()

      set((state) => {
        state.graphData.nodes.forEach(node => nodes.push(node))
        state.graphData.links.forEach(link => links.push(link))
        state.nodeMap.forEach((value, key) => nodeMap.set(key, value))
        return { graphData: { nodes, links }, nodeMap, fetch: 'loading' }
      })

      const allProperties = await wikidata.getEntity(parent.id, ['claims'])

      const filteredProperties = Object.values(allProperties.claims)
        .filter(prop =>
          blacklist.every(b => b != prop[0].mainsnak.property) &&
          prop.every(value =>
            value.mainsnak?.datatype === 'wikibase-item'
            && value.mainsnak.datavalue
          )
        )
        // .sort((a, b) =>
        //   // sort by property number
        //   a[0].mainsnak.property.substring(1) - b[0].mainsnak.property.substring(1)
        // )

        for (const prop of filteredProperties) {
          const propertyId = `${parent.id}:${prop[0].mainsnak.property}`
          
          // TODO: allow property nodes to be "duplicated"
          // namely, the same property for different items should be different nodes
          // make property node ids unique by appending the item id

          if (!(nodeMap.has(propertyId))) {
            const propertyInfo = await wikidata.getEntity(prop[0].mainsnak.property, ['labels'])
  
            const propertyNode = {
              id: propertyId,
              name: propertyInfo.labels.en.value,
              property: true
            }
      
            nodes.push(propertyNode)
            nodeMap.set(propertyId, propertyNode)
          }
          
          links.push({
            source: parent.id,
            target: propertyId
          })
  
          set({ graphData: { nodes, links }, parent, nodeMap })
      
          for (const value of prop) {
            const valueId = value.mainsnak.datavalue.value.id
  
            if (!(nodeMap.has(valueId))) {
              const valueInfo = await wikidata.getEntity(valueId, ['labels'])
  
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
  
            set({ graphData: { nodes, links }, parent, nodeMap })
          }
        }
  
        set({ fetch: 'success' })
  
        setTimeout(() => {
          set({ fetch: 'idle' })
        }, 5000)
    } catch (error) {
      console.error(error)
      if (error.code === 'ERR_NETWORK') {
        set({ fetch: 'network-error' })

        setTimeout(() => {
          set({ fetch: 'idle' })
        }, 5000);
      }
      else {
        set({ fetch: error.name })

        setTimeout(() => {
          set({ fetch: 'idle' })
        }, 5000);
      }
    }
  },

  setMainArticle: async (mainArticle) => {
    try {
      const nodes = [mainArticle]
      const links = []
      const nodeMap = new Map()
      
      set({
        graphData: { nodes, links }, 
        mainArticle, 
        nodeMap,
        fetch: 'loading' 
      })

      const allProperties = await wikidata.getEntity(mainArticle.id, ['claims'])

      const filteredProperties = Object.values(allProperties.claims)
        .filter(prop =>
          blacklist.every(b => b != prop[0].mainsnak.property) &&
          prop.every(value =>
            value.mainsnak?.datatype === 'wikibase-item' 
            && value.mainsnak.datavalue
          )
        )
        // .sort((a, b) =>
        //   // sort by property number
        //   a[0].mainsnak.property.substring(1) - b[0].mainsnak.property.substring(1)
        // )

      for (const prop of filteredProperties) {
        const propertyId = `${mainArticle.id}:${prop[0].mainsnak.property}`
    
        if (!(nodeMap.has(propertyId))) {
          const propertyInfo = await wikidata.getEntity(prop[0].mainsnak.property, ['labels'])

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
            const valueInfo = await wikidata.getEntity(valueId, ['labels'])

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

      set({ fetch: 'success' })

      setTimeout(() => {
        set({ fetch: 'idle' })
      }, 5000)
    } catch (error) {
      console.error(error)
      if (error.code === 'ERR_NETWORK') {
        set({ fetch: 'network-error' })

        setTimeout(() => {
          set({ fetch: 'idle' })
        }, 5000)
      }
      else {
        set({ fetch: error.name })

        setTimeout(() => {
          set({ fetch: 'idle' })
        }, 5000)
      }
    }
  }
}))

export default useData