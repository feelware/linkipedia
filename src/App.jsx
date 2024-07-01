import Menu from './layout/Menu'
import SearchBar from './layout/SearchBar'
import Info from './layout/Info'
import Notif from './layout/Notif'
import Graph from './layout/Graph'

import useActiveNode from './store/useActiveNode'

const App = () => {
  const { activeNode } = useActiveNode()
  
  return (
    <>
      <Menu 
        position={{ 
          top: 20, 
          left: 20 
        }} 
      />
      
      <SearchBar 
        position={{ 
          top: 20, 
          left: 70 
        }}
      />

      {
        activeNode &&
        <Info 
          position={{ 
            top: 20, 
            right: 20 
          }}
        />
      }

      <Notif 
        position={{ 
          bottom: 20, 
          left: 20 
        }}
      />

      <Graph />
    </>
  )
}

export default App
