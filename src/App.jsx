import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar"
import CraetePost from "./Components/CraetePost"
import ShowData from "./Components/ShowData"
import Edit from "./Components/Edit"


function App() {
 

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route exact path="/create" element={<CraetePost/>} />
      <Route exact path="/" element={<ShowData/>} />
      <Route exact path="/edit/:id" element={<Edit/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
