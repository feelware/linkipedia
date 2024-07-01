import { create } from 'zustand'

const useGraphInteraction = create((set) => ({
  hoveredNode: null,
  setHoveredNode: (hoveredNode) => set({ hoveredNode }),
}))

export default useGraphInteraction