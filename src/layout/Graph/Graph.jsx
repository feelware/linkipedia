import {
  useComputedColorScheme,
  useMantineTheme,
} from '@mantine/core'

import { useViewportSize } from '@mantine/hooks'

import ForceGraph2D from 'react-force-graph-2d'

import useData from '../../store/useData'
import useActiveNode from '../../store/useActiveNode'

const Graph = () => {
  const { graphData, expandedItems } = useData()
  const {
    activeNode,
    setActiveNode,
    clearActiveNode
  } = useActiveNode()
  const { width } = useViewportSize()
  const isThemeDark = useComputedColorScheme('light') === 'dark'
  const theme = useMantineTheme()

  const assignLinkColor = () => isThemeDark
    ? theme.colors.dark[5]
    : theme.colors.dark[1]

  const assignNodeColor = (node) => {
    if (node.isProperty) {
      return assignLinkColor()
    }
    let luminance = isThemeDark ? 65 : 75
    let saturation = isThemeDark ? 85 : 100
    if (expandedItems.includes(node)) {
      luminance = isThemeDark ? 85 : 60
      saturation = isThemeDark ? 80 : 30
    }
    return `hsl(${node.__hue}, ${saturation}%, ${luminance}%)`
  }

  const assignNodeVal = ({ size, isProperty }) => isProperty 
    ? 0.1 
    : size

  const handleNodeClick = (node) => {
    if (activeNode?.id === node.id) {
      clearActiveNode()
      return
    }
    setActiveNode(node)
  }

  const assignArrowLength = (link) => (
    link.rootToProperty ? 0 : 5
  )

  return (
    <>
      <ForceGraph2D 
        graphData={graphData}
        width={width}
        onNodeClick={handleNodeClick}
        nodeColor={assignNodeColor}
        nodeVal={assignNodeVal}
        linkColor={assignLinkColor}
        linkDirectionalArrowLength={assignArrowLength}
        linkDirectionalParticleWidth={1}
        linkDirectionalArrowRelPos={1}
        // dagMode='td'
        // dagLevelDistance={50}
      />
    </>
  )
}

export default Graph