import {
  useComputedColorScheme,
  useMantineTheme,
  Popover,
} from '@mantine/core'

import { useViewportSize } from '@mantine/hooks'

import ForceGraph2D from 'react-force-graph-2d'

import useData from '../../store/useData'

const Graph = () => {
  const { graphData, expandItem, fetchState, expandedItems } = useData()
  const { width } = useViewportSize()
  const computedColorScheme = useComputedColorScheme('light')
  const theme = useMantineTheme()

  const isThemeDark = computedColorScheme === 'dark'

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

  const assignNodeVal = ({ isProperty }) => isProperty 
    ? 0.25 
    : 1.5

  const handleNodeClick = (node) => {
    if (fetchState === 'loading') {
      return
    }
    if (node.isProperty) {
      return
    }
    expandItem(node)
    console.log(node.x, node.y)
  }

  const assignArrowLength = (link) => (
    link.rootToProperty ? 0 : 4
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
      />
    </>
  )
}

export default Graph