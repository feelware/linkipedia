import Graph from './layout/Graph'
import SearchBar from './components/SearchBar'
import Notif from './components/Notif'
import ResetButton from './components/ResetButton'

const App = () => {
  return (
    <>
      <SearchBar />
      <ResetButton />
      <Graph />
      <Notif />
    </>
  )
}

export default App
