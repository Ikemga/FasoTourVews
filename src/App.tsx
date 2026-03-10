import { Routes, Route } from "react-router-dom"
import './App.css'
import Index from './pages/Index'
import Login from "./pages/Login"
import Register from "./pages/Register"
import IndexP from "./pages/IndexP"
import CircuitDetail from "./pages/mangers/circuits/CircuitDetail"
import SitesDetail from "./pages/mangers/sites/SitesDetail"

function App() {

  return (
    <div className="items-center text-center">
      <Routes>
        <Route path="/" element ={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/index" element={<IndexP />} />



        <Route path="/circuits" element={<CircuitDetail />} />
        <Route path="/sites" element={<SitesDetail />} />

        

    </Routes>
    </div>
  )
}

export default App
