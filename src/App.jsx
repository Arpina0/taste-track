import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './pages/HomePage'
import { GlobalStoreContextProvider } from './store'

function App() {

  return (
    <>
    <GlobalStoreContextProvider>
     <HomePage></HomePage>
     </GlobalStoreContextProvider>
    </>
  )
}

export default App
