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
import DeadAdd from './Pages/User/Deadlines/AddDead/DeadAdd';
import AddImp from './Pages/User/ImpDates/AddImp/AddImp';
import AddStudy from './Pages/User/MainPage/AddStudy/AddStudy';


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

      <Route path="/add/study" element={<AddStudy/>}/>
      <Route path="/add/announcements" element={<AddAnnouncement/>}/>
      <Route path="/add/deadline" element={<DeadAdd />}/>
      <Route path="/add/impdates" element={ <AddImp />}/>
    </Routes>
    </div>
    </>
  )
}

export default App
