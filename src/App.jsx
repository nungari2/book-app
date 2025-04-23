import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './component/Layout'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Favourite from './component/Favourite';



function App() {
  

 

  return (
    
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='/favourite' element={<Favourite />}/>
        </Route>
      </Routes>
      
      
      </BrowserRouter>
      
      
    
  )
}

export default App
