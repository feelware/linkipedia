import ForceGraph2D from 'react-force-graph-2d'
import useData from '../../store/useData'

const Graph = () => {
  const { graphData } = useData()

  const handleNodeClick = (id) => {
    console.log(id)
  }

  return (
    <>
      <ForceGraph2D 
        graphData={graphData}
        onNodeClick={handleNodeClick}
      />
    </>
  )
}

export default Graph