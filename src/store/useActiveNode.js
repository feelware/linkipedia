import { create } from "zustand"

const useActiveNode = create((set) => ({
  activeNode: null,
  setActiveNode: (node) => set({ activeNode: node }),
  clearActiveNode: () => set({ activeNode: null })
}))

export default useActiveNode