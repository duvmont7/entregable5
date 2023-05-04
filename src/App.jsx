import { Routes, Route } from 'react-router-dom'
import './App.css'
import ProtectedAuth from './components/auth/ProtectedAuth'
import Home from './Pages/Home'
import Pokedex from './Pages/Pokedex'
import PokemonId from './Pages/PokemonId'

function App() {


  return (
    <section>
      <Routes>
        <Route path="/" element={<Home/>} />


        <Route element={<ProtectedAuth/>}>
          
          <Route path='/pokedex' element ={<Pokedex/>}/>
          
          <Route path='/pokedex/:id' element={<PokemonId /> } />

        </Route>
      </Routes>
    </section>
  )
}

export default App
