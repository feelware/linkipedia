import {
  useComputedColorScheme,
  useMantineTheme,
} from '@mantine/core'

import { useViewportSize } from '@mantine/hooks'

import ForceGraph2D from 'react-force-graph-2d'

import useData from '../../store/useData'
import useActiveNode from '../../store/useActiveNode'
import useGraphInteraction from '../../store/useGraphInteraction'

const Graph = () => {
  const { graphData } = useData()
  const {
    activeNode,
    setActiveNode,
    clearActiveNode
  } = useActiveNode()

  const { width } = useViewportSize()
  
  const {
    hoveredNode
  } = useGraphInteraction()

  const isThemeDark = useComputedColorScheme('light') === 'dark'
  const theme = useMantineTheme()

  const assignLinkColor = () => isThemeDark
    ? theme.colors.dark[5]
    : theme.colors.dark[1]

  const assignNodeColor = ({
    __hue,
    isProperty,
    children,
    id,
  }) => {
    if (isProperty) {
      return assignLinkColor()
    }
    const hovered = hoveredNode === id
    let luminance, saturation
    if (isThemeDark) {
      if (children) {
        luminance = 85
        saturation = 80
      }
      else {
        luminance = hovered ? 85 : 65 
        saturation = 85
      }
    }
    else {
      if (children) {
        luminance = 80
        saturation = 60
      }
      else {
        luminance = 75
        saturation = 100
      }
    }
    return `hsl(${__hue}, ${saturation}%, ${luminance}%)`
  }

  const assignNodeVal = ({ size, isProperty }) => isProperty 
    ? 0.1 
    : size

  const handleNodeClick = (node) => {
    if (node.isProperty) {
      return
    }
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