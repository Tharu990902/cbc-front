import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Loginpage from './pages/Loginpage.jsx'
import Signinpage from './pages/Signinpage.jsx'
import Adminhomepage from './pages/Adminhomepage.jsx'
import Homepage from './pages/Homepage.jsx'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
    <BrowserRouter>
    <div><Toaster /></div>
      <Routes path="/*">
        <Route path="/login" element={<Loginpage />} />
        <Route path='/signup' element={<Signinpage />} />
        <Route path="/admin/*" element={<Adminhomepage />} />
        <Route path="/*" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
    </>
    
  )
}

export default App
