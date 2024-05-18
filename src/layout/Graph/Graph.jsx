import ForceGraph2D from 'react-force-graph-2d'
import useData from '../../store/useData'
import { useViewportSize } from '@mantine/hooks'

const Graph = () => {
  const { graphData, expandItem, fetchState } = useData()
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

  const assignNodeColor = ({ isProperty }) => isProperty ? '#bbbbbb' : '#707070'

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