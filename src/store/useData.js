import { create } from "zustand"

const useData = create((set) => ({
  graphData: {
    nodes: [],
    links: []
  },

  mainArticle: '',

  setMainArticle: async (mainArticle) => {
    set({
      graphData: {
        nodes: [{
          id: mainArticle
        }],
        links: []
      },

      mainArticle 
    })
  }
}))

export default useData