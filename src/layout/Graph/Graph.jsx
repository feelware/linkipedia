import ForceGraph2D from 'react-force-graph-2d'
import useData from '../../store/useData'
import { useViewportSize } from '@mantine/hooks'

const Graph = () => {
  const { graphData } = useData()
  const { width } = useViewportSize()

  const handleNodeClick = (id) => {
    console.log(id)
  }

  return (
    <>
      <ForceGraph2D 
        graphData={graphData}
        width={width}
        onNodeClick={handleNodeClick}
        nodeLabel={'id'}
      />
    </>
  )
}

export default Graph