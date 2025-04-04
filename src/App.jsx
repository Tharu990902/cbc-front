import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Loginpage from './pages/Loginpage.jsx'
import Homepage from './pages/Homepage.jsx'
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes path="/*">
        <Route path="/" element={<Loginpage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/*" element={<h1>404 Error</h1>} />
      </Routes>
    </BrowserRouter>
    </>
    
  )
}

export default App
