import React from 'react'
import SideNav from '../../../../Components/Navbar/Navbar'
import ImpAddCard from './ImpAddCard/ImpAddCard'

const AddImp = () => {
  return (
    <div className='fullmain'>
          <SideNav heading='ADD IMPORTANT DATES'/>
        <div className="containerr">
        <div className='heading'>ADD IMPORTANT DATE</div>
            <ImpAddCard />
        </div>
     </div>
  )
}

export default AddImp