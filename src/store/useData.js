import { create } from "zustand"
import wikidata from "../services/wikidata"

const useData = create((set, get) => ({
  graphData: {
    nodes: [],
    links: []
  },
  expandedItems: [],
  nodeMap: new Map(),
  fetchState: null,

  expandItem: async (root) => {
    try {
      const nodes = []
      const links = []
      const nodeMap = new Map()
      const expandedItems = []

      const state = get()
      state.expandedItems.forEach(item => expandedItems.push(item))
      if (expandedItems.includes(root)) {
        return
      }
      expandedItems.push(root)
      state.graphData.nodes.forEach(node => nodes.push(node))
      state.graphData.links.forEach(link => links.push(link))
      state.nodeMap.forEach((value, key) => nodeMap.set(key, value))
      
      if (!(nodeMap.has(root.id))) {
        nodes.push(root)
        nodeMap.set(root.id, root)
      }

      set({ fetchState: 'loading' })
      const bindings = await wikidata.getBindingsOf(root.id)

      bindings.forEach(({ property, item }) => {
        if (!(nodeMap.has(property.id))) {
          nodes.push(property)
          nodeMap.set(property.id, property)
  
          links.push({
            source: root.id,
            target: property.id
          })
        }

        if (!(nodeMap.has(item.id))) {
          nodes.push(item)
          nodeMap.set(item.id, item)
        }

        links.push({
          source: property.id,
          target: item.id
        })
      })

      set({ 
        graphData: { nodes, links }, 
        expandedItems,
        nodeMap,
        fetchState: 'success'
      })

      setTimeout(() => {
        set({ fetchState: null })
      }, 2500);
    }
    catch (error) {
      set({ fetchState: error.message })
    }
  },
}))

export default useData