import ForceGraph2D from 'react-force-graph-2d'
import useData from '../../store/useData'
import { useViewportSize } from '@mantine/hooks'

const Graph = () => {
  const { graphData, expandItem, fetchState, expandedItems } = useData()
  const { width } = useViewportSize()

  const handleNodeClick = (node) => {
    if (fetchState === 'loading') {
      return
    }
    if (node.isProperty) {
      return
    }
    expandItem(node)
  }

  const assignNodeColor = (node) => {
    const luminence =  expandedItems.includes(node) ? 50 : 80
    if (node.isProperty) {
      return '#bbbbbb'
    }
    return `hsl(${node.__hue}, 70%, ${luminence}%)`
  }

  const assignNodeVal = ({ isProperty }) => isProperty ? 0.25 : 1.5

  return (
    <>
      <ForceGraph2D 
        graphData={graphData}
        width={width}
        onNodeClick={handleNodeClick}
        nodeColor={assignNodeColor}
        nodeVal={assignNodeVal}
        linkColor={() => '#bbbbbb'}
      />
    </>
  )
}

export default Graph