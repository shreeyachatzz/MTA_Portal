import { useState } from 'react'

import './App.css'
import Navbar from './Components/Navbar/Navbar'
import MainPage from './Pages/MainPage/Main'
import Announcements from './Pages/Announcements/Announcements'
import Deadline from './Pages/Deadlines/Deadline'
import ImpDates from './Pages/ImpDates/ImpDates'

function App() {

  return (
    <div className='app'>
      {/* <MainPage/> */}
      {/* <Announcements /> */}
      {/* <Deadline /> */}
      <ImpDates />
    </div>
  )
}

export default App
