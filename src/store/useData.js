import { create } from "zustand"

const useData = create((set) => ({
  graphData: {
    nodes: [],
    links: []
  },

  mainArticle: '',

  setMainArticle: async (mainArticle) => {
    
    
    set({ 
      mainArticle 
    })
  }
}))

export default useData