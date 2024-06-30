import ForceGraph2D from 'react-force-graph-2d'
import useData from '../../store/useData'
import { useViewportSize } from '@mantine/hooks'
import { 
  useComputedColorScheme,
  useMantineTheme 
} from '@mantine/core'

const Graph = () => {
  const { graphData, expandItem, fetchState, expandedItems } = useData()
  const { width } = useViewportSize()
  const computedColorScheme = useComputedColorScheme('light')
  const theme = useMantineTheme()

  const assignLinkColor = () => computedColorScheme === 'light'
    ? theme.colors.dark[1]
    : theme.colors.dark[5]

  const assignNodeColor = (node) => {
    if (node.isProperty) {
      return assignLinkColor()
    }
    let luminance = 65
    let saturation = 85
    if (expandedItems.includes(node)) {
      luminance = 85
      saturation = 80
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
  }

  return (
    <>
      <ForceGraph2D 
        graphData={graphData}
        width={width}
        onNodeClick={handleNodeClick}
        nodeColor={assignNodeColor}
        nodeVal={assignNodeVal}
        linkColor={assignLinkColor}
      />
    </>
  )
}

export default Graph