import Menu from './layout/Menu'
import SearchBar from './layout/SearchBar'
import Graph from './layout/Graph'
import Notif from './layout/Notif'

const App = () => {
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

      <Graph />

      <Notif />
    </>
  )
}

export default App
