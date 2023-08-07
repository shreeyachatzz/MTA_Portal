import React from 'react'
import SideNav from '../../../../Components/Navbar/Navbar'
import StudyAddCard from './StudyAdd/StudyAdd'

const AddStudy = () => {
  return (
    <div className='fullmain'>
          <SideNav heading='ADD STUDY MATERIAL'/>
        <div className="containerr stud">
        <div className='heading'>ADD STUDY MATERIAL</div>
            <StudyAddCard/>
        </div>
     </div>
  )
}

export default AddStudy