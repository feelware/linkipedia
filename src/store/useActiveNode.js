import { create } from "zustand"
import wikipedia from 'wikipedia'
import wikidata from "../services/wikidata"

const useActiveNode = create((set) => ({
  activeNode: null,
  articleSummary: null,
  articleImages: null,
  isFetching: false,
  setActiveNode: async (activeNode) => {
    set ({ activeNode, isFetching: true })
    const articleName = await wikidata.getWikipediaArticleNameOf(activeNode.id)
    if (!articleName) {
      set({ 
        articleSummary: { pageid: null },
        isFetching: false
      })
      return
    }
    const articleSummary = await wikipedia.summary(articleName)
    set({ 
      articleSummary,
      isFetching: false 
    })
  },
  clearActiveNode: () => set({ 
    activeNode: null,
    articleSummary: null,
    articleImages: null,
    isFetching: false
  })
}))

export default useActiveNode