import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Loginpage from './pages/Loginpage.jsx'
import Signinpage from './pages/Signinpage.jsx'
import Adminhomepage from './pages/Adminhomepage.jsx'
import Homepage from './pages/Homepage.jsx'
import Productinfo from './pages/home/Productinfo.jsx'
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {

  return (
    <>
    <BrowserRouter>
    <div><Toaster /></div>
    <GoogleOAuthProvider clientId='732946156780-643os6nlku8q4o74kclq65u9gjf1kegb.apps.googleusercontent.com'>
      <Routes path="/*">
        <Route path="/login" element={<Loginpage />} />
        <Route path='/signup' element={<Signinpage />} />
        <Route path="/admin/*" element={<Adminhomepage />} />
        <Route path="/*" element={<Homepage />} />
      </Routes>
      </GoogleOAuthProvider>
    </BrowserRouter>
    </>
    
  )
}

export default App
