import ForceGraph2D from 'react-force-graph-2d'
import useData from '../../store/useData'
import { useViewportSize } from '@mantine/hooks'

const Graph = () => {
  const { graphData, generateRelations } = useData()
  const { width } = useViewportSize()

  const handleNodeClick = (node) => {
    console.log(node)
    generateRelations(node)
  }

  const assignNodeColor = ({ property }) => property ? '#bbbbbb' : '#707070'

  const assignNodeVal = ({ property }) => property ? 0.25 : 1.5

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