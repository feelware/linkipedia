import { create } from "zustand"
import wikidata from "../services/wikidata"
import randomColor from "randomcolor"
import Color from "color"

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
      const childColor = randomColor({hue:'random', luminosity: 'light'})
      const rootColor = Color(childColor).darken(0.5).hex()
      root.__color = rootColor
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
          item.__color = childColor
          nodes.push(item)
          nodeMap.set(item.id, item)
        } else {
          if(!(expandedItems.some(expandedItem => expandedItem.id === item.id))) {
            const existingNode = state.nodeMap.get(item.id)
            if(existingNode) {
              const combinedColor = Color(existingNode.__color).mix(Color(childColor), 0.5).hex()
              existingNode.__color = combinedColor
            }
          }
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
  resetGraph: () => {
    set({ 
      graphData: { nodes: [], links: [] },
      expandedItems: [],
      nodeMap: new Map(),
      fetchState: null
    })
  }
}))

export default useData