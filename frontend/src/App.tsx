import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Navbar from './components/Navbar'
import CreateSong from './pages/CreateSong'
import SongStatistics from "./pages/SongStatistics"

function App() {
  return (
    <>
     <Navbar/>
     <Routes>
       <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<CreateSong/>}/>
        <Route path='/stat' element={<SongStatistics/>}/>  
      </Routes>
    </>
  )
}

export default App