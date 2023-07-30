import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import './App.css'

import MainPage from './Pages/User/MainPage/Main'
import Login from './Pages/LoginPage/Login';

import Announcements from './Pages/User/Announcements/Announcements'
import Deadline from './Pages/User/Deadlines/Deadline'
import ImpDates from './Pages/User/ImpDates/ImpDates'
import Landing from './Pages/Landing/Landing';

import AddAnnouncement from './Pages/User/Announcements/AddAnnouncements/AddAnnouncement';


function App() {
  
  return (
    <>
    <div className='app'>
    <Routes >
      <Route path="/" element={<Landing/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/study" element={<MainPage/>}/>
      <Route path="/announcements" element={<Announcements/>}/>
      <Route path="/deadline" element={<Deadline />}/>
      <Route path="/impdates" element={ <ImpDates />}/>

      <Route path="/add/study" element={<MainPage/>}/>
      <Route path="/add/announcements" element={<AddAnnouncement/>}/>
      <Route path="/add/deadline" element={<Deadline />}/>
      <Route path="/add/impdates" element={ <ImpDates />}/>
    </Routes>
    </div>
    </>
  )
}

export default App
