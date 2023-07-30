import React from 'react'
import SideNav from '../../../../Components/Navbar/Navbar'
import StudyAddCard from './StudyAdd/StudyAdd'

const AddStudy = () => {
  return (
    <div className='fullmain'>
          <SideNav />
        <div className="containerr">
        <div className='heading'>ADD STUDY MATERIALS</div>
            <StudyAddCard/>
        </div>
     </div>
  )
}

export default AddStudy