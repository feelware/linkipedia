import { create } from "zustand"
import wikipedia from 'wikipedia'
import wikidata from "../services/wikidata"
import attributesOf from "../utils/attributesOf"

const useActiveNode = create((set) => ({
  activeNode: null,
  attributes: null,
  articleSummary: null,
  isFetchingSummary: false,
  setActiveNode: async (activeNode) => {
    const attributes = attributesOf(activeNode)
    set ({ 
      activeNode,
      attributes,
      isFetchingSummary: true 
    })
    const articleName = await wikidata.getWikipediaArticleNameOf(activeNode.id)
    if (!articleName) {
      set({ 
        articleSummary: { pageid: null },
        isFetchingSummary: false
      })
      return
    }
    const articleSummary = await wikipedia.summary(articleName)
    set({ 
      articleSummary,
      isFetchingSummary: false 
    })
  },
  clearActiveNode: () => set({ 
    activeNode: null,
    articleSummary: null,
    articleImages: null,
    isFetchingSummary: false
  })
}))

export default useActiveNode