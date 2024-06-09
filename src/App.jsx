import { HashRouter , Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar"
import CraetePost from "./Components/CraetePost"
import ShowData from "./Components/ShowData"
import Edit from "./Components/Edit"


function App() {
 

  return (
    <>
    <HashRouter >
   <div className="mb-28">
   <Navbar/>
   </div>
    <Routes>
      <Route exact path="/create" element={<CraetePost/>} />
      <Route exact path="/" element={<ShowData/>} />
      <Route exact path="/edit/:id" element={<Edit/>} />
    </Routes>
    </HashRouter>
    </>
  )
}

export default App
