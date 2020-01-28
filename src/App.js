import React, { useEffect, useState } from 'react'
import api from './services/api'
import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'
import DevItem from './components/DevItem'
import DevForm from './components/DevForm'
//Component, Estado, Propriedade
//Component: Blobo isolado de HTML,CSS, JS o qual nao interfere no restante da aplicacão
//Propriedades: Informações que um componente pai passa para o filho
//Estado: Informações mantidas pelo compoente (Lembrar: imutabildiade)


function App() {
  const [ devs, setDevs ] = useState([])

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')
      setDevs(response.data)
    }
    loadDevs()
  }, [])

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)
    setDevs([ ...devs, response.data ])
  }




  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App
