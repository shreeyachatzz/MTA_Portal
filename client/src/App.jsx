import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import './App.css'
import Navbar from './Components/Navbar/Navbar'
import MainPage from './Pages/MainPage/Main'
import Announcements from './Pages/Announcements/Announcements'
import Deadline from './Pages/Deadlines/Deadline'
import ImpDates from './Pages/ImpDates/ImpDates'

function App() {

  return (
    <div className='app'>
    <Routes >
      <Route path="/" element={<MainPage/>}/>
      <Route path="/announcements" element={<Announcements/>}/>
      <Route path="/deadline" element={<Deadline />}/>
      <Route path="/impdates" element={ <ImpDates />}/>
    </Routes>
    </div>
  )
}

export default App
